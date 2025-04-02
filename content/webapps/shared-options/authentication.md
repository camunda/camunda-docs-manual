---

title: 'Authentication'
weight: 10

menu:
  main:
    identifier: "webapps-authentication"
    parent: "webapps-shared-options"
    pre: "Get more insights on authentication"
---

Authentication means verifying a user's identity against the Camunda web apps. 

A user authenticates against the web apps on the login page by providing a username and password. If the 
authentication is successful, the user gets access to the web apps and can work on tasks 
in Tasklist or perform operations in Cockpit, for example.

The authentication information consists of the following:

* Process engine name
* Username
* Group memberships
* Tenant memberships 
* Authorized applications (Tasklist, Cockpit, Admin) 

The Camunda web apps correlate the authentication information against [authorizations]({{< ref "/user-guide/process-engine/authorization-service.md" >}}) to determine 
what data the user can query for and which operations the user can perform.

We implemented authentication with the help of a Java EE/Jakarta `ServletFilter`.

## Cache

By default, after a successful login, the web apps keep a copy of the authentication information in memory for five minutes. This information is cached, and therefore we call this behavior **authentication cache**. 

The authentication cache is a performance optimization to prevent performing for each REST API request 
multiple database queries that potentially retrieve the same authentication information repeatedly
given it didn't change.

Read the security implications of the authentication cache in our [Security Instructions]({{< ref "/user-guide/security.md#authentication-cache" >}}).

### Time to live

The time to live defines how long the cache is used for an HTTP session by the web apps before 
they recreate it and query for the authentication information again from the database.

You can change the `cacheTimeToLive` configuration property with the following allowed values:

* Set the parameter value to a time duration in milliseconds between `1` and <code>2<sup>63</sup>-1</code>.
* Set the parameter value to `0`, effectively leading to querying for the authentication information on each REST API request. 
* Remove the `<init-param>...</init-param>` entirely or change the parameter value to `<param-value/>` to keep the cache for the lifetime of the HTTP session.

#### Configuration

This section describes how to configure the authentication cache time to live.

##### Spring Boot

You can find the configuration properties for the Spring Boot Starter in the [User Guide]({{< ref "/user-guide/spring-boot-integration/configuration.md#auth-cache" >}}).

##### Java EE/Jakarta Servlet Application Servers/Runtimes

This is what the `web.xml`-based configuration looks like:

```xml
<!-- Authentication filter -->
<filter>
  <filter-name>Authentication Filter</filter-name>
  <filter-class>org.camunda.bpm.webapp.impl.security.auth.AuthenticationFilter</filter-class>
  <init-param>
    <param-name>cacheTimeToLive</param-name>
    <param-value>0</param-value> <!-- cache disabled -->
  </init-param>
</filter>
<filter-mapping>
  <filter-name>Authentication Filter</filter-name>
  <url-pattern>/*</url-pattern>
  <dispatcher>REQUEST</dispatcher>
</filter-mapping>
```

## Container-Based Authentication

Camunda supports a broad range of containers, including Tomcat and Wildfly. Using Container-Based Authentication, it is possible to move the authentication action to the container level, which will then make the authentication result available to the Camunda Web Applications.

{{< note title="Heads-up!" class="info" >}}
Please provide an implementation for the `ReadOnlyIdentityProvider` interface so that queries return the results of your identity provider to make **Container-Based Authentication** work.
{{< /note >}}

### Enabling Container-Based Authentication

The Container-Based Authentication implementation for the Web Applications is switched off by default, but can be activated by adding a servlet filter in the `web.xml` as follows:

```xml
  <!-- Container Based Authentication filter -->
  <filter>
    <filter-name>Container Based Authentication Filter</filter-name>
    <filter-class>org.camunda.bpm.webapp.impl.security.auth.ContainerBasedAuthenticationFilter</filter-class>
    <init-param>
      <param-name>authentication-provider</param-name>
      <param-value>org.camunda.bpm.engine.rest.security.auth.impl.ContainerBasedAuthenticationProvider</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>Container Based Authentication Filter</filter-name>
    <url-pattern>/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>
  </filter-mapping>
```

### Container-Based Authentication for Single Sign-On

The Camunda Web Applications can also integrate with a [Single Sign-On implementation](https://en.wikipedia.org/wiki/List_of_single_sign-on_implementations) when the Container-Based Authentication servlet filter is enabled.
