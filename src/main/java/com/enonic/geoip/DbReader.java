package com.enonic.geoip;

/**
 * Created by Michael Lazell on 3/16/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;
import java.util.Objects;
import java.util.function.Supplier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;

import com.enonic.xp.home.HomeDir;
import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public class DbReader
    implements ScriptBean
{
    private static final Logger LOG = LoggerFactory.getLogger( DbReader.class );

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private Supplier<PortalRequest> portalRequestSupplier;

    private volatile Reader reader;

    private File database;

    private volatile long lastModified;

    private Reader previousReader;

    public void init( final String databaseFilePath )
        throws IOException
    {
        this.database =
            new File( Objects.requireNonNullElse( databaseFilePath, HomeDir.get() + "/config/GeoLite2-City.mmdb" ) );

        this.lastModified = this.database.lastModified();
        this.reader = new Reader( this.database, FileMode.MEMORY_MAPPED, new CHMCache() );
    }

    public JsonNode getLocationDataFromFile( final String ip )
        throws IOException
    {
        checkAndReload();

        Reader localReader = Objects.requireNonNull( reader );

        InetAddress ipa =
            InetAddress.getByName( Objects.requireNonNullElseGet( ip, () -> portalRequestSupplier.get().getRemoteAddress() ) );

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

    @Override
    public void initialize( final BeanContext context )
    {
        this.portalRequestSupplier = context.getBinding( PortalRequest.class );
    }
}
