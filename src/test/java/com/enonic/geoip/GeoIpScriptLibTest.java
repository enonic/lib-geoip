package com.enonic.geoip;

import com.enonic.xp.testing.ScriptRunnerSupport;

public class GeoIpScriptLibTest
    extends ScriptRunnerSupport
{
    @Override
    protected void initialize()
        throws Exception
    {
        super.initialize();
        addService( DbReaderRegistry.class, new DbReaderRegistry() );
    }

    @Override
    public String getScriptTestFile()
    {
        return "/lib/geoip-test.js";
    }
}
