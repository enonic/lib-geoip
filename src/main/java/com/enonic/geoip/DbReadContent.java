package com.enonic.geoip;

/**
 * Created by mla on 3/18/16.
 */

import java.io.IOException;
import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.ByteSource;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;

public class DbReadContent
{
    private final static Logger LOG = LoggerFactory.getLogger( DbReader.class );

    public String ip;
    public ByteSource is;

    public JsonNode execute() throws IOException
    {

        Reader r = new Reader( is.openBufferedStream(), new CHMCache() );

        InetAddress ipa = InetAddress.getByName( this.ip );

        JsonNode t = r.get( ipa );
        return t;
    }

    public void setIp( final String ip )
    {
        this.ip = ip;
    }
}
