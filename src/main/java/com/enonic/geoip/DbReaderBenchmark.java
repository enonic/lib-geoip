package com.enonic.geoip;

/**
 * Created by mla on 3/11/16.
 */

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.maxmind.db.CHMCache;
import com.maxmind.db.InvalidDatabaseException;
import com.maxmind.db.NoCache;
import com.maxmind.db.NodeCache;
import com.maxmind.db.Reader;
import com.maxmind.db.Reader.FileMode;


public class DbReaderBenchmark
{
    private final static int COUNT = 1000000;
    private final static int WARMUPS = 2;
    private final static int BENCHMARKS = 3;
    private final static boolean TRACE = false;
    private final static Logger LOG = LoggerFactory.getLogger( DbReaderBenchmark.class );

    public String test() throws IOException, InvalidDatabaseException {

        File file = new File("GeoLite2-City.mmdb");
        LOG.info( "No caching" );
        loop("Warming up", file, WARMUPS, NoCache.getInstance());
        loop("Benchmarking", file, BENCHMARKS, NoCache.getInstance());

        LOG.info( "with caching" );
        loop("Warming up", file, WARMUPS, new CHMCache());
        loop("Benchmarking", file, BENCHMARKS, new CHMCache());
        return "Done with geoLite benchmarks.";
    }

    private static void loop(String msg, File file, int loops, NodeCache cache) throws IOException {
        LOG.info( msg );
        for (int i = 0; i < loops; i++) {
            Reader r = new Reader(file, FileMode.MEMORY_MAPPED, cache);
            bench(r, COUNT, i);
        }
        LOG.info( " - " );
    }

    private static void bench(Reader r, int count, int seed) throws IOException {
        Random random = new Random(seed);
        long startTime = System.nanoTime();
        byte[] address = new byte[4];
        for (int i = 0; i < count; i++) {
            random.nextBytes(address);
            InetAddress ip = InetAddress.getByAddress(address);
            JsonNode t = r.get(ip);
            if (TRACE) {
                if (i % 50000 == 0) {
                    LOG.info( i + " " + ip );
                    //LOG.info( t.toString() );
                }
            }
        }
        long endTime = System.nanoTime();

        long duration = endTime - startTime;
        long qps = count * 1000000000L / duration;
        LOG.info( "Requests per second: " + qps );
    }
}
