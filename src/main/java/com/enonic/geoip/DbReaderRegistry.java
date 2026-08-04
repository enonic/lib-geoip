package com.enonic.geoip;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;

import com.enonic.xp.home.HomeDir;

import static java.util.Objects.requireNonNull;
import static java.util.Objects.requireNonNullElse;

@Component(immediate = true, service = DbReaderRegistry.class)
public class DbReaderRegistry
{
    private static final Logger LOG = LoggerFactory.getLogger( DbReaderRegistry.class );

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private volatile Reader reader;

    private File database;

    private volatile long lastModified;

    private Reader previousReader;

    public synchronized void init( final String databaseFilePath )
        throws IOException
    {
        if ( this.reader != null )
        {
            return;
        }
        this.database = new File( requireNonNullElse( databaseFilePath, HomeDir.get() + "/config/GeoLite2-City.mmdb" ) );
        this.lastModified = this.database.lastModified();
        this.reader = new Reader( this.database, FileMode.MEMORY_MAPPED, new CHMCache() );
    }

    public JsonNode getLocationData( final String ip )
        throws IOException
    {
        checkAndReload();

        final Reader localReader = requireNonNull( reader );

        final InetAddress ipa = InetAddress.getByName( ip );

        return OBJECT_MAPPER.valueToTree( localReader.get( ipa, Map.class ) );
    }

    private synchronized void checkAndReload()
        throws IOException
    {
        if ( database == null )
        {
            return;
        }
        final long currentModified = database.lastModified();
        if ( currentModified == 0 )
        {
            LOG.debug( "GeoIP database file is inaccessible: {}", database.getAbsolutePath() );
            return;
        }
        if ( currentModified != lastModified )
        {
            final Reader newReader = new Reader( database, FileMode.MEMORY_MAPPED, new CHMCache() );
            final Reader toClose = previousReader;
            previousReader = reader;
            this.lastModified = currentModified;
            this.reader = newReader;
            LOG.info( "GeoIP database reloaded from {}", database.getAbsolutePath() );
            if ( toClose != null )
            {
                toClose.close();
            }
        }
    }

    @Deactivate
    public void dispose()
        throws IOException
    {
        Reader local = reader;
        if ( local != null )
        {
            local.close();
        }
        Reader prev = previousReader;
        if ( prev != null )
        {
            prev.close();
        }
    }
}
