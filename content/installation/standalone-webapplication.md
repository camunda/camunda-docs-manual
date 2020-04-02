---

title: "Install the Standalone Webapplication (.war)"
weight: 20

menu:
  main:
    name: "Standalone Webapplication (.war)"
    identifier: "installation-guide-standalone"
    parent: "installation-guide"
    pre: "Install the Standalone Webapplication (bundling an embedded Process Engine) inside an Application Server like Wildfly or Tomcat."

---


This document will guide you through the installation and configuration of the Camunda standalone web application.
The Camunda web application combines [Cockpit]({{< ref "/webapps/cockpit/_index.md" >}}) and [Tasklist]({{< ref "/webapps/tasklist/_index.md" >}}). The web application is self-contained and includes
an [embedded process engine]({{< ref "/introduction/architecture.md#embedded-process-engine" >}}), which is configured inside the application. The process engine is configured using the
Spring Framework and will automatically start when the application is deployed. The process engine must be configured
to connect to a database (see the [database configuration]({{< relref "#database-configuration" >}}) section). By default the process engine will use a built-in
identity service, which can be replaced with LDAP (see the [LDAP configuration]({{< relref "#ldap-configuration" >}}) section).

{{< note title="Embedded vs. Shared Process Engine" >}}
Note: Since the Camunda standalone web application uses an [embedded process engine]({{< ref "/introduction/architecture.md#embedded-process-engine" >}}) it must not be installed to an application server from a Camunda distribution download. Application servers contained in Camunda distributions already provide a [shared process engine]({{< ref "/introduction/architecture.md#shared-container-managed-process-engine" >}})
{{< /note >}}


# Download

If you are an **Enterprise Edition** Customer, please use the [enterprise download page](/enterprise/download/#full-distributions-and-standalone-web-applications).

As a **Community Edition** user you can download the Camunda standalone webapp matching your application server here:

<table class="table">
  <thead>
    <tr>
      <th>Application Server</th>
      <th>Link</th>
    </tr>      
  </thead>
  <tbody>
    <tr>
      <td>Apache Tomcat</td>
      <td>
        <a href="//downloads.camunda.cloud/release/camunda-bpm/tomcat/7.12/camunda-webapp-tomcat-standalone-7.12.0.war">
          camunda-webapp-tomcat-standalone-7.12.0.war
        </a>
      </td>
    </tr>
    <tr>
      <td>WildFly</td>
      <td>
        <a href="//downloads.camunda.cloud/release/camunda-bpm/jboss/7.12/camunda-webapp-jboss-standalone-7.12.0.war">
          camunda-webapp-jboss-standalone-7.12.0.war
        </a>
      </td>
    </tr>
  </tbody>
</table>


# Deploy

Once you downloaded the `camunda-webapp-SERVER-standalone-VERSION.war` file you
must deploy it to your application server.<br>
**Note:** Make sure to use a vanilla distribution of your application server, not an application server downloaded
from Camunda.<br>
The exact deployment procedure for web applications depends on
your application server. In case you aren't sure how to install the application, please refer to your application server documentation.


The default context path for the Camunda web application is `/camunda`.<br>
**Note:** If you install the Camunda standalone web application on Apache Tomcat by dropping
it in the `webapps` folder, Tomcat will assign the filename of the war file as
the context path. If you want the context path to be `/camunda`, rename the war
file to `camunda.war`.

Given that your application is binding to localhost, is running on port 8080
and the context path is `/camunda`, you can then access the Camunda standalone
web application by using the following url:

[http://localhost:8080/camunda/](http://localhost:8080/camunda/)


# Database Configuration

The Camunda standalone webapp is initially configured using a file-based `H2` database
and an Apache Commons DBCP datasource. The `h2` database is only useful for demo purposes.
If you want to use the standalone webapp in production we recommend using a different database.

In order to configure another database, edit the file named `WEB-INF/applicationContext.xml` inside the
`camunda-webapp-SERVER-standalone-VERSION.war`. Edit the following section with the appropriate configuration values for your database.

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy">
  <property name="targetDataSource">
    <bean class="org.apache.commons.dbcp.BasicDataSource">
      <property name="driverClassName" value="org.h2.Driver" />
      <property name="url" value="jdbc:h2:./camunda-h2-dbs/process-engine;MVCC=TRUE;TRACE_LEVEL_FILE=0;DB_CLOSE_ON_EXIT=FALSE" />
      <property name="username" value="sa" />
      <property name="password" value="" />
    </bean>
  </property>
</bean>
```

> Note: If you configure a different database do not forget to add the corresponding database driver to the classpath of the web application.

As an alternative you can also configure a datasource inside your application server and look it up from the web application.


# LDAP Configuration

## Adjust the Process Engine Configuration

Initially the Camunda standalone webapp is configured to use a built-in database identity service.
If you want to use LDAP instead you have to activate the Camunda LDAP identity service. The file
`WEB-INF/applicationContext.xml` already contains a configuration example which is deactivated. In
order to activate it, simply uncomment the lines shown below:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <!-- ... -->
  <property name="processEnginePlugins">
    <list>
      <!-- Uncomment the following next two lines to activate LDAP -->
      <!--<ref bean="ldapIdentityProviderPlugin" />-->
      <!--<ref bean="administratorAuthorizationPlugin" />-->
    </list>
  </property>
</bean>
```

To configure the LDAP service please adjust the values of the bean named `ldapIdentityProviderPlugin` as described in the [user guide]({{< ref "/user-guide/process-engine/identity-service.md#configuration-properties-of-the-ldap-plugin" >}}).
Do not forget to configure the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}) as well.


# HAL Resource Caching

If you use LDAP as Indentity Provider, you should consider [activating caching]({{< ref "/reference/rest/overview/hal.md#caching-of-hal-relations" >}}) of Users and Groups in the Camunda webapplication. In order to activate this, add the following configuration to the `web.xml` file of Camunda webapplication:

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
