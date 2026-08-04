package com.enonic.geoip;

import java.io.IOException;
import java.util.function.Supplier;

import com.fasterxml.jackson.databind.JsonNode;

import com.enonic.xp.portal.PortalRequest;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

import static java.util.Objects.requireNonNull;
import static java.util.Objects.requireNonNullElseGet;

public class DbReader
    implements ScriptBean
{
    private Supplier<PortalRequest> portalRequestSupplier;

    private DbReaderRegistry registry;

    public void init( final String databaseFilePath )
        throws IOException
    {
        this.registry.init( databaseFilePath );
    }

    public JsonNode getLocationDataFromFile( final String ip )
        throws IOException
    {
        final String address = requireNonNullElseGet( ip, () -> portalRequestSupplier.get().getRemoteAddress() );

        return this.registry.getLocationData( address );
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.portalRequestSupplier = context.getBinding( PortalRequest.class );
        this.registry = requireNonNull( context.getService( DbReaderRegistry.class ).get() );
    }
}
