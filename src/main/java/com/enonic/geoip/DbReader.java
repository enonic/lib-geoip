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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;

import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public class DbReader
    implements ScriptBean
{
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private Supplier<PortalRequest> portalRequestSupplier;

    private volatile Reader reader;

    public void init( final String databaseFilePath )
        throws IOException
    {
        final File database =
            new File( Objects.requireNonNullElse( databaseFilePath, System.getenv( "XP_HOME" ) + "/config/GeoLite2-City.mmdb" ) );

        this.reader = new Reader( database, FileMode.MEMORY_MAPPED, new CHMCache() );
    }

    public JsonNode getLocationDataFromFile( final String ip )
        throws IOException
    {
        Reader localReader = Objects.requireNonNull( reader );

        InetAddress ipa =
            InetAddress.getByName( Objects.requireNonNullElseGet( ip, () -> portalRequestSupplier.get().getRemoteAddress() ) );

        return OBJECT_MAPPER.valueToTree( localReader.get( ipa, Map.class ) );
    }

    public void dispose()
        throws IOException
    {
        Reader local = reader;
        if ( local != null )
        {
            local.close();
        }
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.portalRequestSupplier = context.getBinding( PortalRequest.class );
    }
}
