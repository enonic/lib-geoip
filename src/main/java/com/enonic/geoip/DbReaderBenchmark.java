package com.enonic.geoip;

/**
 * Created by Michael Lazell on 3/11/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.maxmind.db.CHMCache;
import com.maxmind.db.InvalidDatabaseException;
import com.maxmind.db.NoCache;
import com.maxmind.db.NodeCache;
import com.maxmind.db.Reader;


public class DbReaderBenchmark
{
    private final static int COUNT = 1000000;
    private final static int WARMUPS = 2;
    private final static int BENCHMARKS = 3;
    private boolean trace;
    private final File db = new File( System.getenv( "XP_HOME") + "/config/GeoLite2-City.mmdb" );
    private final static Logger LOG = LoggerFactory.getLogger( DbReaderBenchmark.class );

    public String test() throws IOException, InvalidDatabaseException
    {
        LOG.info( "No caching" );
        loop("Warming up", WARMUPS, NoCache.getInstance());
        loop("Benchmarking", BENCHMARKS, NoCache.getInstance());

        LOG.info( "with caching" );
        loop("Warming up", WARMUPS, new CHMCache());
        loop("Benchmarking", BENCHMARKS, new CHMCache());
        LOG.info( "Benchmarking complete" );
        return "Done with geoLite benchmarks. See log for results.";
    }

    private void loop(String msg, int loops, NodeCache cache) throws IOException
    {
        LOG.info( msg );
        for (int i = 0; i < loops; i++) {
            //Reader r = new Reader( db, Reader.FileMode.MEMORY_MAPPED, new CHMCache() );
            Reader r = new Reader( db, Reader.FileMode.MEMORY_MAPPED, cache );
            bench(r, COUNT, i);
        }
        LOG.info( " - " );
    }

    private void bench(Reader r, int count, int seed) throws IOException
    {
        Random random = new Random(seed);
        long startTime = System.nanoTime();
        byte[] address = new byte[4];
        for (int i = 0; i < count; i++) {
            random.nextBytes(address);
            InetAddress ip = InetAddress.getByAddress(address);
            Map<?,?> t = r.get(ip, Map.class);
            if (trace) {
                if (i % 100000 == 0) {
                    ObjectMapper mapper = new ObjectMapper( );
                    LOG.info( i + " " + ip.getHostAddress() );
                    LOG.info( mapper.writerWithDefaultPrettyPrinter().writeValueAsString( t ) );
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
}
