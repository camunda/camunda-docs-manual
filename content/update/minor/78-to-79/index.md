---

title: "Update from 7.8 to 7.9"
weight: 50
menu:
  main:
    name: "7.8 to 7.9"
    identifier: "migration-guide-78"
    parent: "migration-guide-minor"
    pre: "Update from `7.8.x` to `7.9.0`."

---

This document guides you through the update from Camunda BPM `7.8.x` to `7.9.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
2. For administrators and developers: [Full Distribution Update](#full-distribution)
3. For administrators: [Standalone Web Application](#standalone-web-application)
5. For developers: [Base Delegate Execution](#base-delegate-execution)
6. For developers: [Java serialized objects](#java-serialized-objects)
7. For administrators: [Groovy version](#groovy-version)
8. For administrators: [Adjustable Time Period for Historic Activity Instances](#adjustable-time-period-for-historic-activity-instances)
9. For administrators: [Throttle login attempts](#throttle-login-attempts)
9. For administrators and developers: [Jackson version update](#jackson-version-update)
9. For administrators and developers: [History cleanup can be parallelized](#history-cleanup-can-be-parallelized)


This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.8.

Noteworthy new Features and Changes in 7.9:

* [Transient Variables]({{< relref "user-guide/process-engine/variables.md#transient-variables" >}})
* [Long Polling for Fetch and Lock External Tasks]({{< relref "user-guide/process-engine/external-tasks.md#long-polling-to-fetch-and-lock-external-tasks" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.8_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.8_to_7.9.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.7.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.9 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/78-to-79/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/78-to-79/jboss.md" >}})
* [IBM WebSphere]({{< relref "update/minor/78-to-79/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/78-to-79/wls.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications.

# Standalone Web Application

If the standalone web application is in use, the current `war` artifact must be replaced by its new version.

If a database other than the default H2 database is used, the following steps must be taken:

1. Undeploy the current version of the standalone web application
2. Update the database to the new schema as described in the [database update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< relref "installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server

# Base Delegate Execution

This section concerns the Java API and the interface `org.camunda.bpm.engine.delegate.BaseDelegateExecution`.

The behaviour of `BaseDelegateExecution#getBusinessKey` has been changed. It now returns a business key of the root execution, e.g. process instance and is equivalent to `DelegateExecution#getProcessBusinessKey`.

Please note this change can influence your custom implementations of `Execution Listener`.

# Java serialized objects

Starting from version 7.9 setting object variables, serialized with Java serialization, is forbidden by default. You can be affected by this change, if you are using such kind of REST requests:

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

or via Java:

```java
runtimeService.setVariable(processInstanceId, "varName",
        Variables
          .serializedObjectValue("ab")
          .serializationDataFormat("application/x-java-serialized-object")
          .objectTypeName("com.example.MyObject")
          .create());
```
In this case you will need to use another serialization format (JSON or XML) or to explicitly enable Java serialization with the help of [this configuration parameter]({{< relref "reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}):

```xml
<property name="javaSerializationFormatEnabled">true</property>
```

# Groovy version

The pre-built Camunda distributions of versions 7.6.10, 7.7.5 and 7.8.0 ship with Groovy library of version 2.4.5, whereas newer versions come with Groovy 2.4.13. 
Please update the library `groovy-all-$GROOVY_VERSION.jar` in the `lib` folder of your application server.


# Adjustable Time Period for Historic Activity Instances   

In the historic process definition diagram it is possible to select time periods for which activity instance badges are displayed.

By default the displayed timer period is set to 'today' but can be extended to show badges of 'this week', 'this month' or the 'complete' history.

This feature can be configured in two ways:

1. The default timer period can be changed to 'this week', 'this month' or 'complete'
2. The manual selection of the time period within Cockpit can be disabled.

These attributes can be modifed in the [configuration file]({{< relref "webapps/cockpit/extend/configuration.md#historic-activity-instance-metrics" >}})

# Throttle login attempts

We introduce a special mechanism for consecutive unsuccessful login attempts.
A user will be delayed in trying to login after an unsuccessful login attempt for a certain amount of time (in seconds). This delay is calculated through a formula, and the contributing values are configurable. Please read more in the [Identity service]({{< relref "user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) section.

The default values are:
```java
loginMaxAttempts = 10;
loginDelayFactor = 2;
loginDelayMaxTime = 60;
loginDelayBase = 3;
```

# Jackson version update

Jackson version in Spin project was updated from version 2.6.3 to 2.9.5, but Spin is still compatible with older version (2.6.3). To switch back on older version you can just replace `jackson-*-2.9.5.jar` 
libraries by `jackson-*-2.6.3.jar` in your application server folder (also check environment specific update guides). Or, in case you're using Camunda as a part of your Maven application, configure appropriate dependencies in your `pom.xml`:

```xml
  <dependency>
      <groupId>org.camunda.spin</groupId>
      <artifactId>camunda-spin-core</artifactId>
      <!-- exclude 2.9.5 dependencies -->
      <exclusions>
        <exclusion>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-core</artifactId>
        </exclusion>
        <exclusion>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-databind</artifactId>
        </exclusion>
      </exclusions>
    </dependency>

    <!-- include 2.6.3 dependencies -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-core</artifactId>
      <version>2.6.3</version>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.6.3</version>
    </dependency>
``` 

In case you were using `camunda-spin-dataformat-all` dependency, you would need to downgrade the whole Spin and use `camunda-spin-dataformat-all-1.4.2.jar`.

You may consider downgrading back to older version of Jackson in case you use Spin project for JSON variables and serialization and:

1. You run your application on Java 6 (Jackson is not compatible with Java 6 anymore).
2. You use older Jackson version in other parts of your application and have some reasons to stick to this version so far.

# History cleanup can be parallelized

As of v. 7.9.0, history cleanup can be parallelized, which leads to creation of several jobs in the database. For this reason:

* call to `HistoryService#cleanupHistoryAsync` does not guarantee to return correct Job object in return and you should not rely on the returned value any more.
 The same valid for REST call `POST /history/cleanup`
* `HistoryService#findHistoryCleanupJob` is deprecated (as well as `GET /history/cleanup/job`), one should use `HistoryService#findHistoryCleanupJobs` instead.

# Webjar structure changed

Structure of `webjar` and `webjar-ee` artifacts has changed. Now all Web resources are stored under directory `META-INF/resources` to conform the standard way 
of packaging the Webjars.
