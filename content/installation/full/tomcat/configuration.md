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

The deployment descriptor of the Web applications needs to be adjusted, to configure the **Session Cookie**.

You can find it under `WEB-INF/web.xml`. Please watch out for the following section:
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
    <param-name>xssProtectionOption</param-name>
    <param-value>SANITIZE</param-value>
  </init-param>
  
</filter>
...
```

Please also see the detailed overview about the 
[HTTP Header Security configuration settings]({{< ref "/webapps/shared-options/header-security.md#how-to-configure" >}}).