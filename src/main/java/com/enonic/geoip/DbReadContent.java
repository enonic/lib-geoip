package com.enonic.geoip;

/**
 * Created by Michael Lazell on 3/18/16.
 */

import java.io.IOException;
import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.ByteSource;
import com.maxmind.db.CHMCache;
import com.maxmind.db.Reader;

import com.enonic.xp.portal.PortalRequestAccessor;

public class DbReadContent
{
    private final static Logger LOG = LoggerFactory.getLogger( DbReader.class );

    private String ip;
    private ByteSource is;
    private String remoteAddr = PortalRequestAccessor.get().getRawRequest().getRemoteAddr();

    public JsonNode getLocationData() throws IOException
    {

        Reader r = new Reader( is.openBufferedStream(), new CHMCache() );

        InetAddress ipa = InetAddress.getByName( this.ip != null ? this.ip : this.remoteAddr );

        JsonNode t = r.get( ipa );
        return t;
    }

    public void setIp( final String ip )
    {
        this.ip = ip;
    }

    public void setIs( final ByteSource is )
    {
        this.is = is;
    }
}
