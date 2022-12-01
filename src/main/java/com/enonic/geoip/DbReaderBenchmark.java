package com.enonic.geoip;

/**
 * Created by Michael Lazell on 3/11/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maxmind.db.CHMCache;
import com.maxmind.db.NoCache;
import com.maxmind.db.NodeCache;
import com.maxmind.db.Reader;

import com.enonic.xp.home.HomeDir;


public class DbReaderBenchmark
{
    private static final Logger LOG = LoggerFactory.getLogger( DbReaderBenchmark.class );

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final int COUNT = 1000000;

    private static final int WARMUPS = 2;

    private static final int BENCHMARKS = 3;

    private boolean trace;

    private String databaseFilePath;

    public String test()
        throws IOException
    {
        final File database =
            new File( Objects.requireNonNullElse( databaseFilePath, HomeDir.get() + "/config/GeoLite2-City.mmdb" ) );

        LOG.info( "No caching" );
        loop( database, "Warming up", WARMUPS, NoCache.getInstance() );
        loop( database, "Benchmarking", BENCHMARKS, NoCache.getInstance() );

        LOG.info( "with caching" );
        loop( database, "Warming up", WARMUPS, new CHMCache() );
        loop( database, "Benchmarking", BENCHMARKS, new CHMCache() );
        LOG.info( "Benchmarking complete" );
        return "Done with geoLite benchmarks. See log for results.";
    }

    private void loop( File database, String msg, int loops, NodeCache cache )
        throws IOException
    {
        LOG.info( msg );
        try (Reader r = new Reader( database, Reader.FileMode.MEMORY_MAPPED, cache ))
        {
            for ( int i = 0; i < loops; i++ )
            {
                bench( r, COUNT, i );
            }
        }
        LOG.info( " - " );
    }

    private void bench( Reader reader, int count, int seed )
        throws IOException
    {
        Random random = new Random( seed );
        long startTime = System.nanoTime();
        byte[] address = new byte[4];
        for ( int i = 0; i < count; i++ )
        {
            random.nextBytes( address );
            InetAddress ip = InetAddress.getByAddress( address );
            Map<?, ?> t = reader.get( ip, Map.class );
            if ( trace )
            {
                if ( i % 100000 == 0 )
                {
                    LOG.info( i + " " + ip.getHostAddress() );
                    LOG.info( MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString( t ) );
                }
            }
        }
        long endTime = System.nanoTime();

        long duration = endTime - startTime;
        long qps = count * 1000000000L / duration;
        LOG.info( "Requests per second: " + qps );
    }

    public void setTrace( final boolean trace )
    {
        this.trace = trace;
    }

    public void setDatabaseFilePath( final String databaseFilePath )
    {
        this.databaseFilePath = databaseFilePath;
    }
}
