---

title: 'Configure the Full Distribution for JBoss/Wildfly'
weight: 30

menu:
  main:
    name: "Configuration"
    identifier: "installation-guide-full-jboss-ldap"
    parent: "installation-guide-full-jboss"
    pre: "Configure the installation."

---


This page explains how to configure the full distribution for the JBoss/Wildfly application server.


## LDAP

In order to setup LDAP for the JBoss/Wildfly Application Server distribution, you have to perform the following steps:


### Adjust the Process Engine Configuration

Edit the file `standalone.xml` (or `domain.xml`) provided by the JBoss/Wildfly Application Server and add the [LDAP Identity Provider Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  <process-engines>
    <process-engine name="default" default="true"> ...
      <properties>...</properties>
      <plugins>
        <plugin>
          <class>org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin</class>
          <properties>

            <property name="serverUrl">ldap://localhost:4334/</property>
            <property name="managerDn">uid=jonny,ou=office-berlin,o=camunda,c=org</property>
            <property name="managerPassword">s3cr3t</property>

            <property name="baseDn">o=camunda,c=org</property>

            <property name="userSearchBase">ou=employees</property>
            <property name="userSearchFilter">(objectclass=person)</property>

            <property name="userIdAttribute">uid</property>
            <property name="userFirstnameAttribute">cn</property>
            <property name="userLastnameAttribute">sn</property>
            <property name="userEmailAttribute">mail</property>
            <property name="userPasswordAttribute">userpassword</property>

            <property name="groupSearchBase">ou=roles</property>
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
  </process-engines> ...
</subsystem>
```


The `administratorUserName` property should contain the user id of the LDAP user you want to grant administrator authorizations to. You can then use this user to log in to the web application and grant authorizations to additional users.

See our user guide for complete documentation on the [LDAP Identity Provider Plugin]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).


## HAL Resource Caching

If you use LDAP as Indentity Provider, you should consider [activating caching]({{< ref "/reference/rest/overview/hal.md#caching-of-hal-relations" >}}) of
Users and Groups in the Camunda webapplication. In order to activate this, add the following
configuration to the `web.xml` file of Camunda webapplication
(`camunda-webapp-jboss-$PLATFORM_VERSION.war/WEB-INF/lib`):

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

## Add Custom Engine Plugins
 
1.  Add an additional engine plugin as a module to the folder $JBOSS_HOME/modules/
2.  Add the module dependency to the file `$JBOSS_HOME/modules/org/camunda/bpm/camunda-engine-plugins/main/module.xml` and set the attribute `export="true"` to make sure that the module is visible in the classpath of Camunda's subsystem
      ```xml
    <module xmlns="urn:jboss:module:1.0"
            name="org.camunda.bpm.camunda-engine-plugins">
      <dependencies>
        <!-- ... -->
        <module name="org.camunda.bpm.camunda-custom-engine-plugin" export="true" />
      </dependencies>
    </module>
      ```
      
    The `module.xml` file is included in the Camunda Platform distribution. If you install Camunda Platform on a vanilla JBoss/Wildfly container, this file needs to be created manually.
3. [Configure the process engine plugin]({{< ref "/user-guide/runtime-container-integration/jboss.md#extend-a-process-engine-using-process-engine-plugins" >}}) in the standalone.xml/domain.xml configuration file

## Session Cookie in Webapps

The deployment descriptor of the Web applications needs to be adjusted to configure the **Session Cookie**.

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