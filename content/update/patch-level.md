---

title: "Patch Level Update"
weight: 20

menu:
  main:
    name: "Patch Level Update"
    identifier: "migration-guide-patch"
    parent: "migration-guide"
    pre: "Guides you through a patch level update (Example: `7.14.2` to `7.14.3`)."

---

This guide explains how to perform a patch level update. The *patch level* is the version number "after the second dot". Example: update from `7.14.2` to `7.14.3`.

{{< enterprise >}}
Please note that Patch Level Updates are only provided to enterprise customers, they are not available in the community edition.
{{< /enterprise >}}

# Database Patches

Between patch levels, the structure of the database schema is not changed. The database structure of all patch releases is backward compatible with the corresponding minor version. Our [database schema update guide]({{< ref "/installation/database-schema.md#patch-level-update" >}}) provides details on the update procedure as well as available database patches.

# Special Considerations

This section describes noteworthy changes between individual patch levels.

## 7.3.2 to 7.3.3

By default it is not possible anymore to pass arbitrary expressions as parameters of task queries.

Reason: Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated.

The process engine no longer evaluates these expressions by default and throws an exception instead. The previous behavior can be re-enabled by setting the process configuration `enableExpressionsInAdhocQueries` to true.

See the user guide on [security considerations for custom code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}) for details.


## 7.6.10 to 7.6.11 / 7.7.5 to 7.7.6 / 7.8.0 to 7.8.1

### Java serialization format

You can now configure, if you forbid the usage of Java serialization format, when passing object variables in their Java serialized representation.

The new [configuration parameter `javaSerializationFormatEnabled`]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}) 
defaults to `true`, but can be configured to `false` in Camunda engine configuration.

Following use cases are affected:

* REST API:

```json
PUT /process-instance/{id}/variables/{varName}

{
  "value" : "ab",
  "type" : "Object",
  "valueInfo" : {
    "objectTypeName": "com.example.MyObject",
    "serializationDataFormat": "application/x-java-serialized-object"
  }
}
``` 

* Java API:

```java
runtimeService.setVariable(processInstanceId, "varName",
        Variables
          .serializedObjectValue("ab")
          .serializationDataFormat("application/x-java-serialized-object")
          .objectTypeName("com.example.MyObject")
          .create());
```

You can disable Java serialization usage with the help of [this configuration parameter]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}):

```xml
<property name="javaSerializationFormatEnabled">false</property>
```

### Groovy version

The pre-built Camunda distributions of versions 7.6.10, 7.7.5 and 7.8.0 ship with Groovy library of version 2.4.5, whereas newer versions come with Groovy 2.4.13.

Update the library `groovy-all-$GROOVY_VERSION.jar` in the `lib` folder of your application server.


## 7.8.1. to 7.8.2 

### Restrict heatmap/statistics by time period  

In the historic process definition diagram it is possible to select time periods for which activity instance badges are displayed.

By default the displayed timer period is set to 'today' but can be extended to show badges of 'this week', 'this month' or the 'complete' history.   

This feature can be configured in two ways:

1. The default timer period can be changed to 'this week', 'this month' or 'complete'
2. The manual selection of the time period within cockpit can be disabled.   

These attributes can be modified in the [configuration file]({{< ref "/webapps/cockpit/extend/configuration.md#historic-activity-instance-metrics" >}})

## 7.8.6 to 7.8.7

### History cleanup can be parallelized

As of v. 7.8.7, history cleanup can be parallelized, which leads to creation of several jobs in the database. For this reason:

* call to `HistoryService#cleanupHistoryAsync` does not guarantee to return correct Job object in return and you should not rely on the returned value any more.
 The same valid for REST call `POST /history/cleanup`
* `HistoryService#findHistoryCleanupJob` is deprecated (as well as `GET /history/cleanup/job`), one should use `HistoryService#findHistoryCleanupJobs` instead.

## 7.10.16 to 7.10.17 / 7.11.10 to 7.11.11 / 7.12.3 to 7.12.4

### DMN 1.3 Support in Cockpit

With this release, cockpit adds support for DMN 1.3, the next version of the DMN standard. If you edit and deploy DMN diagrams in Cockpit, which use earlier versions of DMN, they will automatically be migrated to DMN 1.3.

The Camunda engine already supports the DMN 1.3 namespace by default, so there are no more steps required to migrate.
Make sure you have the latest version of [Camunda Modeler](https://camunda.com/download/modeler/) installed to edit DMN 1.3 files locally.

## 7.12.5 to 7.12.6

### Oracle JDBC Driver Removed from Camunda Docker Images

The Docker images for Camunda 7.13 no longer provide an Oracle JDBC driver out of the box. If you relied on this, apply the strategy outlined in https://github.com/camunda/docker-camunda-bpm-platform#database-environment-variables: Add the driver to the container and configure the database settings manually by linking the configuration file into the container.

## 7.13.6 to 7.13.7 / 7.12.11 to 7.12.12 / 7.11.18 to 7.11.19

### [Legal Note] Telemetry 

In the mentioned patches above, a telemetry functionality is introduced. For more information please visit the [telemetry][] page.
Before you upgrade to a Camunda Platform Runtime version >= 7.14.0-alpha1, 7.13.7+, 7.12.12+, and 7.11.19+, or activate the telemetry functionality, please make sure that you are authorized to take this step, and that the installation or activation of the [telemetry functionality][engine-config-initializeTelemetry] is not in conflict with any company-internal policies, compliance guidelines, any contractual or other provisions or obligations of your company.

Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.

[engine-config-initializeTelemetry]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#initializeTelemetry" >}}
[telemetry]: {{< ref "/introduction/telemetry.md" >}}

### Custom REST API

In case you are deploying a custom REST API that builds upon the one provided by Camunda, please make sure to add the following listener to the `web.xml`:

```xml
<web-app ...>
  ...
  <listener>
    <listener-class>org.camunda.bpm.engine.rest.impl.web.bootstrap.RestContainerBootstrap</listener-class>
  </listener>
  ...
</web-app>
```

This servlet context listener is used for bootstrapping the REST API and should therefore be included in your custom application setup.

## 7.14.0 to 7.14.1 / 7.13.6 to 7.13.7

### FEEL Engine: Changed Module Structure

With the above-mentioned patch releases, the module structure has changed in conjunction with the [FEEL Engine]. 
From now on, the FEEL Engine will be delivered as a dedicated module `feel-engine`. It is no longer part of 
the `camunda-engine-feel-scala` module. The FEEL Engine module follows its own versioning.

The following modules are dependent on the newly introduced `feel-engine` module:

* `camunda-engine-plugin-spin`
* `camunda-engine-feel-scala`

[FEEL Engine]: {{<ref "/user-guide/dmn-engine/feel/_index.md" >}}

## 7.14.3 to 7.14.4 / 7.13.9 to 7.13.10 / 7.12.15 to 7.12.16

### Update of MySQL JDBC Driver in Camunda Docker Images

With this release, the docker images contain a new version of the MySQL JDBC Driver.

Old Version: 5.1.21\
New Version: 8.0.23

#### Behavior Changes

The driver's new version has two significant behavioral changes you should take care of when migrating 
your Docker-based Camunda Runtime installation.

##### Downgrade to 5.1.21

You don't want to migrate to the new version? You can replace the new MySQL JDBC Driver with the old one
to restore the previous behavior. To do so, you can create a new `Dockerfile` based on one of our official 
docker images and add your custom commands to replace the MySQL JDBC Driver.

For the Wildfly image, additionally make sure to adjust the data source class in the `standalone.xml` 
file located under `/camunda/standalone/configuration/` from `com.mysql.cj.jdbc.MysqlXADataSource` back to 
`com.mysql.jdbc.jdbc2.optional.MysqlXADataSource`:

```xml
<!-- ... -->
<driver name="mysql" module="mysql.mysql-connector-java">
    <xa-datasource-class>com.mysql.jdbc.jdbc2.optional.MysqlXADataSource</xa-datasource-class>
</driver>
<!-- ... -->
```

##### 1) Milliseconds Precision for Date/Time values

The new version of the Driver changes how a date/time value is handled. Please make sure to configure 
the Driver as described in [MySQL Database Configuration]({{< ref "/user-guide/process-engine/database/mysql-configuration.md" >}})
to avoid breaking behavior.

##### 2) Changed Time Zone Handling

In case the process engine and the MySQL Server operate in different time zones, and you use the 
MySQL JDBC Driver's default configuration, migrating to the new release leads to a wrong conversion of 
date values (e.g., the due date of a task can change).

You can configure the driver to convert date values from and to the MySQL Server into the time zone 
in which the process engine/JVM operates. This ensures that values that were stored before the migration 
are returned correctly after the migration and date values are stored correctly after the migration. 
You can achieve this by specifying the correct time zone via the property [`serverTimeZone`](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-connp-props-datetime-types-processing.html#cj-conn-prop_serverTimezone) in your JDBC connection URL.\
For instance, if your process engine operates in CET but your MySQL Server does not, set the property to `serverTimeZone=CET`.

{{< note title="Heads-up!" class="info" >}}
Changing the time zone of the MySQL Server to the one the process engine operates in can have unwanted side-effects 
to date values that are stored in columns of type `TIMESTAMP`: MySQL converts `TIMESTAMP` values from the server time zone 
to UTC for storage, and back from UTC to the current time zone for retrieval. Read more about it in the 
[MySQL Docs](https://dev.mysql.com/doc/refman/5.6/en/datetime.html).
{{< /note >}}

#### Further Reading

* [Change Docker Environment Variables](https://github.com/camunda/docker-camunda-bpm-platform/tree/7.15#database-environment-variables)
* [MySQL Connector/J 8.0 Migration Guide](https://dev.mysql.com/doc/connectors/en/connector-j-upgrading-to-8.0.html)

## 7.15.3 to 7.15.4 / 7.14.9 to 7.14.10 / 7.13.15 to 7.13.16

### Spin: updated dependencies

With this release, the following dependencies of Spin have been updated:

* json-path from 2.4.0 to 2.6.0
* accessors-smart from 1.2 to 2.4.7
* json-smart from 2.3 to 2.4.7

### Standalone Webapplication: HikariCP replaces Commons DBCP

The standalone web applications now use HikariCP for data source configuration instead of Apache Commons DBCP. Replace
the `org.apache.commons.dbcp.BasicDataSource` class in your `applicationContext.xml` with a
`com.zaxxer.hikari.HikariDataSource`. The HikariCP data source expects the JDBC URL on a property called `jdbcUrl` 
instead of `url`. Thus, you need to rename the `url` property. Your data source description should look similar to 
this, with `DB-DRIVER-CLASS`, `JDBC-URL`, `DB-USER`, and `DB-PASSWORD` replaced by values related to your database:

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy">
  <property name="targetDataSource">
    <bean class="com.zaxxer.hikari.HikariDataSource">
      <property name="driverClassName" value="DB-DRIVER-CLASS" />
      <property name="jdbcUrl" value="JDBC-URL" />
      <property name="username" value="DB-USER" />
      <property name="password" value="DB-PASSWORD" />
    </bean>
  </property>
</bean>
```

## 7.15.5 to 7.15.6 / 7.14.11 to 7.14.12 / 7.13.17 to 7.13.18

The patches include version 2.1.0 of the `org.camunda.template-engines` artifacts, in particular `camunda-template-engines-freemarker`, `camunda-template-engines-velocity`, and `camunda-template-engines-xquery-saxon`.

This updates the following template engine versions:

* Apache Freemarker
  * Old version: 2.3.29 (Release date: August 2019)
  * New version: 2.3.31 (Release date: February 2021)
  * Change log: https://freemarker.apache.org/docs/api/freemarker/template/Configuration.html#Configuration-freemarker.template.Version-
* Apache Velocity
  * Old version: 2.2 (Release date: January 2020)
  * New version: 2.3 (Release date: March 2021)
  * Change log: https://velocity.apache.org/engine/2.3/upgrading.html
  
Please note that the new version of Freemarker contains changes that are not compatible with the previous version. We strongly recommend to test the execution of your templates before applying the update. In addition, you can replace the artifacts of version 2.1.0 by the old artifacts in version 2.0.0 to continue using the old versions of Freemarker and Velocity.

## 7.16.1 to 7.16.2 / 7.15.7 to 7.15.8

### REST API and web applications: new dependency Jackson JSR310

The patches introduce the [Jackson JSR310 artifact](https://search.maven.org/artifact/com.fasterxml.jackson.datatype/jackson-datatype-jsr310/2.12.1/bundle) to the REST API and web applications by default.
This artifact enables those modules to handle [Java 8 Date & Time API](https://jcp.org/en/jsr/detail?id=310) data types.

Be aware that the serialized data of values of such data types can change with the usage of this artifact. 
Prior to version 2.12, the serialization library Jackson defaulted to a fallback serialization mechanism if no artifact was available for those data types.
Starting with version 2.12.0, Jackson [throws an exception](https://github.com/FasterXML/jackson-databind/issues/2683) in such cases. 
Therefore, the REST API and web applications now register an appropriate module.
This allows you to keep using Java 8 date and time data types when updating to a newer Jackson version. 
However, this can also lead to changed serialized data for such values.

## 7.16.3 to 7.16.4 / 7.15.9 to 7.15.10 / 7.14.15 to 7.14.16

### Spin configuration properties

This set of patches introduce configuration properties for the Spin `DomXmlDataFormat` module. The `DomXmlDataFormat`
configuration properties provide options to toggle **External XML Entity (XXE)** processing, as well as secure processing
for the Spin XML parser.

By default, we disabled XXE processing, and enabled secure processing of XML documents to protect the Spin XML 
parser against [XXE attacks](https://en.wikipedia.org/wiki/XML_external_entity_attack) and 
[Billion laughs attacks](https://en.wikipedia.org/wiki/Billion_laughs_attack).

You can restore the old behavior by passing the appropriate [configuration properties to the Spin process engine plugin][spin-config].

[spin-config]: {{< ref "/user-guide/data-formats/configuring-spin-integration.md#configuration-properties-of-the-spin-plugin" >}}

## 7.16.5 to 7.16.6 / 7.15.11 to 7.15.12 / 7.14.17 to 7.14.18

This set of patches deactivates remote access to the H2 console application in the Tomcat and Wildfly distributions. The H2 application accepts only localhost connections moving forward.

To restore remote access, add the following initialization parameter to the `org.h2.server.web.WebServlet` servlet defined in the `web.xml` file of the h2 web application:

```
<init-param>
  <param-name>webAllowOthers</param-name>
  <param-value>true</param-value>
</init-param>
```

You can find the `web.xml` at the following paths:

* Tomcat distribution: `server/apache-tomcat-${TOMCAT_VERSION}/webapps/h2/WEB-INF`
* Wildfly distribution: `server/wildfly-${WILDFLY_VERSION}/standalone/deployments/camunda-h2-webapp-${CAMUNDA_VERSION}.war/WEB-INF`
* Docker container Tomcat: `/camunda/webapps/h2/WEB-INF`
* Docker container Wildfly: `/camunda/standalone/deployments/camunda-h2-webapp-${CAMUNDA_VERSION}.war/WEB-INF`

Please note that we strongly discourage enabling remote access because it creates a security risk.

## 7.17.1 to 7.17.2 / 7.16.8 to 7.16.9 / 7.15.14 to 7.15.15

### Groovy version

The pre-built Camunda distributions of versions `7.15.14`, `7.16.8`, and `7.17.1` provide version `2.4.13` of the Groovy 
library, whereas newer versions come with Groovy `2.4.21`.

Update the library `groovy-all-$GROOVY_VERSION.jar` in the `lib` folder of your application server.

### Camunda Docker Images: Base image updated to Alpine 3.15

With 7.17.2, 7.16.9, and 7.15.15, Alpine, the base image in Camunda’s Docker images, has been updated from version 3.13 to 3.15.

We went through the release notes to identify breaking changes and could identify the following:

> The faccessat2 syscall has been enabled in musl. This can result in issues on docker hosts with older versions of docker (<20.10.0) and libseccomp (<2.4.4), which blocks this syscall.

Besides Docker runtime versions < 20.10.0, alternative docker runtimes like containerd.io are also affected by this. 
Read more about it in the [Alpine 3.14 Release Notes](https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.14.0#faccessat2).

If you have extended the Camunda docker images yourself, please read the release notes of Alpine 3.14 and 3.15 carefully:

* https://alpinelinux.org/posts/Alpine-3.14.0-released.html
* https://alpinelinux.org/posts/Alpine-3.15.0-released.html

### XLTS for AngularJS

These patches replace the AngularJS libraries with XLTS for AngularJS. Where AngularJS was licensed entirely under the MIT license, XLTS for AngularJS licenses additional parts under the XLTS for AngularJS – EULA. By downloading and using Camunda with XLTS for AngularJS, you agree to the terms of the XLTS for AngularJS – EULA. Please see our [third-Party libraries documentation]({{< ref "/introduction/third-party-libraries/_index.md#xlts-for-angularjs" >}}) for details and the terms of the EULA.

## 7.17.3 to 7.17.4 / 7.17.5

The 7.17.4 release contains a regression in Cockpit where DMN diagrams are not or only partially rendered. Please don't use this patch release unless you know what you are doing. The 7.17.5 release contains a fix for this regression.

For more information, please see the ticket: [CAM-14858](https://jira.camunda.com/browse/CAM-14858).

## 7.17.5 to 7.17.6

### Discontinue Camunda H2 console web app

The Camunda Platform 7.17.6 release removes the H2 console application from the Tomcat and WildFly distributions. There will not be any further releases of the Camunda H2 console web app going forward.

#### Removed the H2 console app from Camunda distributions

The H2 console web app was included in all Camunda Tomcat and WildFly distributions. Considering H2 is widely discouraged for use in production, this web app was only ever meant as a development and debugging tool.
Including it in a ready-to-use distribution means an additional step for end users since the app should be removed before using the Camunda distribution in production.

#### End of life for the Camunda H2 console web app project

Going forward we will not further develop the Camunda H2 console app. This also means there will not be any more releases for this project.
If you need to connect to the default file-based H2 database during development, we encourage you to use third-party tools like [DBeaver](https://dbeaver.io/).

## 7.17.7 to 7.17.8

### Job executor priority range properties type changed

The two dedicated job executor priority range properties [jobExecutorPriorityRangeMin]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMin" >}}) and [jobExecutorPriorityRangeMax]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMax" >}}) have been change to primitive type <code>long</code>. That allows for the properties to be configured for every process engine configuration. Respectively their default values changed to <code>0</code> and <code>2<sup>63</sup>-1</code> (`Long.MAX_VALUE`).
Note: this behavior is slightly changed with the [next patch]({{< ref "#job-executor-priority-range-properties-default-changed" >}}).

## 7.17.8 to 7.17.9

### Job executor priority range properties default changed

The default value for the job executor priority range property [jobExecutorPriorityRangeMin]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMin" >}}) has changed from 0 to <code>-2<sup>63</sup></code> (`Long.MIN_VALUE`). This property and its counterpart ([jobExecutorPriorityRangeMax]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMax" >}})) only have an effect if [jobExecutorAcquireByPriority]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorAcquireByPriority" >}}) is set to true.

## 7.17.10 to 7.17.11 / 7.16.17 to 7.16.18

### Web apps revalidate authentications every five minutes

Previously, after a user logged into the web apps, the [authentication cache]({{< ref "/webapps/shared-options/authentication.md#cache" >}})
was valid for the lifetime of the HTTP session, which has [security implications]({{< ref "/user-guide/security.md#authentication-cache" >}}).

With this release, we introduced a time to live for the authentication cache, configured to five minutes by default.
This new default might lead to a higher load on your database.

You can read how to configure the time to live to a smaller interval or restore the legacy behavior (disable the authentication cache time to live) in the documentation about [Web Applications]({{< ref "/webapps/shared-options/authentication.md#time-to-live" >}}).

## 7.17.12 to 7.17.13

### Bean method resolution from JUEL expressions

Calling bean methods from JUEL expressions now works more reliably and supports overloaded methods. As a result, the behavior of calling overloaded methods from such expressions changes.

Previoulsy, overloaded methods couldn't be determined reliably and were chosen based on the order of the underlying JDK's result of the call to `Class#getMethods` for a specific method name. As a result, the expected method might have been chosen for the expression evaluation but this could not be guaranteed.

Now, the most specific version according to the provided number and types of method parameters is chosen consistently. For example, method `myMethod` expecting an `Integer` is chosen over method `myMethod` expecting an `Object` if the provided parameter is an `Integer` or can be coerced into one.

Ideally, you shouldn't notice any difference in method invocation from JUEL expressions. However, we recommend testing your existing expressions thoroughly before using this patch version in production.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**. In this case you need to update the libraries and applications installed inside the application server.

Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down the server
* Exchange Camunda Platform libraries, tools and webapps (EAR, RAR, Subsystem (Wildfly), Shared Libs) - essentially, follow the [installation guide]({{< ref "/installation/full/_index.md" >}}) for your server.
* Restart the server

# Application With Embedded Process Engine

In case you use an embedded process engine inside your Java Application, you need to

1. update the Process Engine library in your dependency management (Apache Maven, Gradle ...),
2. re-package the application,
3. deploy the new version of the application.

# Standalone Webapplication Distribution

In case you installed the [Standalone Webapplication Distribution]({{< ref "/introduction/downloading-camunda.md#download-the-runtime" >}}) you need to

1. undeploy the previous version of the webapplication,
2. deploy the new version of the webapplication.

# Applying Multiple Patches at Once

It is possible to apply multiple patches in one go (e.g., updating from `7.1.0` to `7.1.4`).
