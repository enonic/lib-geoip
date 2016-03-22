package com.enonic.geoip;

/**
 * Created by Michael Lazell on 3/16/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;

public class DbReader
{
    private final static Logger LOG = LoggerFactory.getLogger( DbReader.class );
    private final File db = new File( System.getenv("XP_HOME") + "/config/GeoLite2-City.mmdb" );
    private String ip;

    public JsonNode execute() throws IOException
    {

        //Reader r = new Reader( db, FileMode.MEMORY_MAPPED, NoCache.getInstance() );
        Reader r = new Reader( db, FileMode.MEMORY_MAPPED, new CHMCache() );

        InetAddress ipa = InetAddress.getByName( this.ip );

        JsonNode t = r.get( ipa );
        return t;
    }

    public void setIp( final String ip )
    {
        this.ip = ip;
    }
}
