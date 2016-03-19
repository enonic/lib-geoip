package com.enonic.maxmind;

/**
 * Created by mla on 3/18/16.
 */

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.SyncFailedException;
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

import com.enonic.xp.content.ContentPath;
import com.enonic.xp.content.ContentQuery;
import com.enonic.xp.lib.content.GetContentHandler;

public class DbReadContent
{
    private final static Logger LOG = LoggerFactory.getLogger( DbReader.class );
    //private final File db = new File( "GeoLite2-City.mmdb" );
    public String dbName;

    //private File db;
    public InputStream is;

    public String getFilePath() {
        String path = ContentPath.from( this.dbName ).toString();
        return path;
    }

    public JsonNode cityInfo(String ip) throws IOException, InvalidDatabaseException {

        //File db =
        //File db = new File( path );

        //Reader r = new Reader( db, FileMode.MEMORY_MAPPED, NoCache.getInstance() );
        //Reader r = new Reader( db, FileMode.MEMORY_MAPPED, new CHMCache() );
        Reader r = new Reader( is, new CHMCache() );

        InetAddress ipa = InetAddress.getByName( ip );

        JsonNode t = r.get( ipa );
        return t;
    }
}
