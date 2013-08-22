Configuring Authentication
==========================

The REST API ships with an implementation of [Http Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). By default it is switched off, but can be activated by adding a servlet filter as follows:

    <filter>
      <filter-name>camunda-auth</filter-name>
      <filter-class>
        org.camunda.bpm.engine.rest.security.auth.ProcessEngineAuthenticationFilter
      </filter-class>
      <init-param>
        <param-name>authentication-provider</param-name>
        <param-value>org.camunda.bpm.engine.rest.security.auth.impl.HttpBasicAuthenticationProvider</param-value>
      </init-param>
    </filter>
        
    <filter-mapping>
      <filter-name>camunda-auth</filter-name>
      <url-pattern>/*</url-pattern>
    </filter-mapping>
    
Any engine-specific request will then be authenticated against that engine's identity service. The GET `/engine` request that supplies a list of all avaialable process engines is the only request that does not require authentication. Any request that does not address a specific engine (i.e. it is not of the form `/engine/{name}/...`) will be authenticated against the default engine.

In the pre-built distributions, the engine authentication is switched off by default. You may have a look at the distribution's `web.xml` file and remove the comment markers from the above mentioned filter declaration to activate authentication.

Note that Http Basic Authentication *does not provide encryption* and should be secured by an SSL connection.

The authentication provider is exchangeable. You can implement the interface `org.camunda.bpm.engine.rest.security.auth.AuthenticationProvider` to provide another authentication method and change the filter's initialization parameter accordingly.

Resteasy Specifics
------------------

The authentication filter works fine whenever the JAX-RS application containing the REST API is deployed as a servlet. This is not neccessarily the case. One such case we are aware of is with some types of Resteasy deployments:

Resteasy allows to deploy a JAX-RS application as a servlet filter (see the [Resteasy docs](http://docs.jboss.org/resteasy/docs/2.3.5.Final/userguide/html/Installation_Configuration.html#filter)). If you choose this method to deploy the REST API application, which we also do in the Tomcat distro, the authentication filter requires an extra init-param named `rest-url-pattern-prefix`. The value has to correspond to the servlet path (see [HttpServletRequest#getServletPath()](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getServletPath%28%29)) as in the case that the JAX-RS application are deployed as a servlet.

Example: If the Resteasy configuration is

    <filter>
      <filter-name>Resteasy</filter-name>
      <filter-class>
          org.jboss.resteasy.plugins.server.servlet.FilterDispatcher
      </filter-class>
      <init-param>
          <param-name>javax.ws.rs.Application</param-name>
          <param-value>org.camunda.bpm.engine.rest.impl.application.DefaultApplication</param-value>
      </init-param>
    </filter>

    <filter-mapping>
      <filter-name>Resteasy</filter-name>
      <url-pattern>/*</url-pattern>
    </filter-mapping>
    
the following init-param has to be set:

    <init-param>
      <param-name>rest-url-pattern-prefix</param-name>
      <param-value></param-value>
    </init-param>
    
In the example above the value is empty, because the Resteasy filter mapping is `/\*` and a servlet with that mapping would have an empty servlet path. Similarly, the filter mapping url `/rest/\*` maps to the init-param `/rest` and so on.