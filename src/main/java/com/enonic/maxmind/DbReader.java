package com.enonic.maxmind;

/**
 * Created by mla on 3/16/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.maxmind.db.CHMCache;
import com.maxmind.db.InvalidDatabaseException;
import com.maxmind.db.NoCache;
import com.maxmind.db.NodeCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;

public class DbReader
{
    private final static Logger LOG = LoggerFactory.getLogger( DbReaderBenchmark.class );
    private final File db = new File( "GeoLite2-City.mmdb" );

    public JsonNode cityInfo(String ip) throws IOException, InvalidDatabaseException {
        Reader r = new Reader( db, FileMode.MEMORY_MAPPED, NoCache.getInstance() );

        InetAddress ipa = InetAddress.getByName( ip );

        JsonNode t = r.get( ipa );
        return t;
    }

}
