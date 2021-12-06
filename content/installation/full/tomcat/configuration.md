---

title: 'Configure the Full Distribution for Tomcat'
weight: 30

menu:
  main:
    name: "Configuration"
    identifier: "installation-guide-full-tomcat-configuration"
    parent: "installation-guide-full-tomcat"
    pre: "Configure the installation."

---


This page explains how to configure the full distribution for Tomcat Application Server.

## LDAP

In order to setup LDAP for the Tomcat distribution, you have to perform the following steps:


### Add the LDAP Library

Make sure the `camunda-identity-ldap-$PLATFORM_VERSION.jar` is present in the
`$TOMCAT_DISTRIBUTION/lib/` folder.

{{< note title="Pre packaged distribution" class="info" >}}
Note: If you use the pre-packaged distribution, the ldap plugin is already present and you can skip this step.
{{< /note >}}

### Adjust the Process Engine Configuration

Edit the file `bpm-platform.xml` located inside the folder `$TOMCAT_HOME/conf` and add the [LDAP Identity Provider Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">
  ...
  <process-engine name="default"> ...
    <properties>...</properties>
    <plugins>
      <plugin>
        <class>org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin</class>
        <properties>

          <property name="serverUrl">ldap://localhost:4334/</property>
          <property name="managerDn">uid=jonny,ou=office-berlin,o=camunda,c=org</property>
          <property name="managerPassword">s3cr3t</property>

          <property name="baseDn">o=camunda,c=org</property>

          <property name="userSearchBase"></property>
          <property name="userSearchFilter">(objectclass=person)</property>

          <property name="userIdAttribute">uid</property>
          <property name="userFirstnameAttribute">cn</property>
          <property name="userLastnameAttribute">sn</property>
          <property name="userEmailAttribute">mail</property>
          <property name="userPasswordAttribute">userpassword</property>

          <property name="groupSearchBase"></property>
          <property name="groupSearchFilter">(objectclass=groupOfNames)</property>
          <property name="groupIdAttribute">ou</property>
          <property name="groupNameAttribute">cn</property>

          <property name="groupMemberAttribute">member</property>

        </properties>
      </plugin>
      <plugin>
        <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
        <properties>
          <property name="administratorUserName">admin</property>
        </properties>
      </plugin>
    </plugins>
  </process-engine>
</bpm-platform>
```

The `administratorUserName` property should contain the user id of the LDAP user you want to grant administrator authorizations to. You can then use this user to log in to the web application and grant authorizations to additional users.

See our user guide for complete documentation on the [LDAP Identity Provider Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).


## HAL Resource Caching

If you use LDAP as Indentity Provider, you should consider [activating caching]({{< ref "/reference/rest/overview/hal.md#caching-of-hal-relations" >}}) of
Users and Groups in the Camunda webapplication. In order to activate this, add the following
configuration to the `web.xml` file of Camunda webapplication
(`camunda-webapp-tomcat-$PLATFORM_VERSION.war/WEB-INF/web.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

  <!-- ... -->

  <listener>
    <listener-class>org.camunda.bpm.engine.rest.hal.cache.HalRelationCacheBootstrap</listener-class>
  </listener>

  <context-param>
    <param-name>org.camunda.bpm.engine.rest.hal.cache.config</param-name>
    <param-value>
      {
        "cacheImplementation": "org.camunda.bpm.engine.rest.hal.cache.DefaultHalResourceCache",
        "caches": {
          "org.camunda.bpm.engine.rest.hal.user.HalUser": {
            "capacity": 100,
            "secondsToLive": 900
          },
          "org.camunda.bpm.engine.rest.hal.group.HalGroup": {
            "capacity": 100,
            "secondsToLive": 900
          }
        }
      }
    </param-value>
  </context-param>

  <!-- ... -->

</web-app>
```

## Session Cookie in Webapps

To configure the **Session Cookie**, you can adjust the deployment descriptor of the Web applications.
You can find it in the `WEB-INF/web.xml` in the following section:

```xml
...
<session-config>
  <cookie-config>
    <secure>false</secure>
    <http-only>true</http-only>
  </cookie-config>
</session-config>
...
```

Please note that security-related configurations for the **Session Cookie** can only be applied with the Deployment Descriptor (`web.xml`) version set to 3.0.

To customize the `SameSite` attribute of the session cookie, you can adjust the `SessionCookieFilter`.
You can find it in the `WEB-INF/web.xml` as well in the following section:

```xml
...
<filter>
  <filter-name>SessionCookieFilter</filter-name>
  <filter-class>org.camunda.bpm.webapp.impl.security.filter.SessionCookieFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>SessionCookieFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
...
```

By default, the `SameSite` flag will be set to `LAX` by the filter.
You can change the default behavior by adding configuration parameters to the servlet filter configuration:

```xml
...
<filter>
  <filter-name>SessionCookieFilter</filter-name>
  <filter-class>org.camunda.bpm.webapp.impl.security.filter.SessionCookieFilter</filter-class>
  <init-param>
    <param-name>sameSiteCookieValue</param-name>
    <param-value>Strict</param-value>
  </init-param>
</filter>
...
```

Note that the filter only adds the `SameSite` attribute to the cookie if this attribute is not present yet. 
It does not alter any existing value that has been set prior to the filter execution.

The servlet filter accepts several initialization parameters besides the one describes above.
The following list describes all possible parameters you can use for the filter configuration:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
  <tr>
    <td>enableSecureCookie</td>
    <td>
      If set to <code>true</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#secure" >}}">Secure</a> is enabled for the 
      <a href="{{< ref "/webapps/shared-options/cookie-security.md" >}}">Session Cookie</a>.<br><br>
      <strong>Note:</strong> If the <code>Secure</code> flag is set in the cookie by any other means already, this property will not remove it by setting it to <code>false</code>.
    </td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>enableSameSiteCookie</td>
    <td>
      If set to <code>false</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#samesite" >}}">SameSite</a> is disabled. The default value of the <code>SameSite</code> cookie is <code>LAX</code> and it can be changed via <code>same-site-cookie-option</code> configuration property.<br><br>
      <strong>Note:</strong> If the <code>SameSite</code> flag is set in the cookie by any other means already, this property will not adjust or remove it.
    </td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>sameSiteCookieOption</td>
    <td>
      Can be configured either to <code>STRICT</code> or <code>LAX</code>.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
        <li>Cannot be set in conjunction with <code>same-site-cookie-value</code></li>
        <li>Will not change the value of the <code>SameSite</code> flag if it is set already by any other means</li>
      </ul>
    </td>
    <td><i>Not set</i></td>
  </tr>
  <tr>
    <td>sameSiteCookieValue</td>
    <td>
      A custom value for the cookie property.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
        <li>Cannot be set in conjunction with <code>same-site-cookie-option</code></li>
        <li>Will not change the value of the <code>SameSite</code> flag if it is set already by any other means</li>
      </ul>
    </td>
    <td><i>Not set</i></td>
  </tr>
  <tr id="cookie-name">
    <td>cookieName</td>
    <td>
      A custom value to configure the name of the session cookie to adjust.
    </td>
    <td><code>JSESSIONID</code></td>
  </tr>
</table>

Please also see the detailed overview about the [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}).

## Security-related HTTP headers in Webapps

To customize the configuration of security-related HTTP headers in the web applications its deployment descriptor needs 
to be adjusted. You can find it under `WEB-INF/web.xml`.

Please watch out for the following section:
```xml
...
<filter>
  <filter-name>HttpHeaderSecurity</filter-name>
  <filter-class>
    org.camunda.bpm.webapp.impl.security.filter.headersec.HttpHeaderSecurityFilter
  </filter-class>
</filter>

<filter-mapping>
  <filter-name>HttpHeaderSecurity</filter-name>
  <url-pattern>/*</url-pattern>
  <dispatcher>REQUEST</dispatcher>
</filter-mapping>
...
```

You can change the default behavior by adding configuration parameters to the servlet filter configuration:
```xml
...
<filter>
  <filter-name>HttpHeaderSecurity</filter-name>
  <filter-class>
    org.camunda.bpm.webapp.impl.security.filter.headersec.HttpHeaderSecurityFilter
  </filter-class>
  
  <init-param>
    <param-name>contentSecurityPolicyValue</param-name>
    <param-value>
      base-uri 'self';
      default-src 'self' 'unsafe-inline'
    </param-value>
  </init-param>
  
</filter>
...
```

Please also see the detailed overview about the 
[HTTP Header Security configuration settings]({{< ref "/webapps/shared-options/header-security.md#how-to-configure" >}}).