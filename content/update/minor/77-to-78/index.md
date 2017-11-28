---

title: "Update from 7.7 to 7.8"
weight: 55

menu:
  main:
    name: "7.7 to 7.8"
    identifier: "migration-guide-77"
    parent: "migration-guide-minor"
    pre: "Update from `7.7.x` to `7.8.0`."

---

This document guides you through the update from Camunda BPM `7.7.x` to `7.8.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
2. For administrators and developers: [Full Distribution Update](#full-distribution)
3. For administrators: [Standalone Web Application](#standalone-web-application)
4. For administrators and developers: [REST API Date Format]({{< relref "#rest-api-date-format" >}})
5. For administrators and developers: [Failed Jobs Retry Configuration](#failed-jobs-retry-configuration)
6. For developers: [Incident Handler](#incident-handler)
7. For administrators: [Batch processing for database operations](#batch-processing-for-database-operations)


This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.8.

Noteworthy new Features and Changes in 7.8:

* [Perform a batch modification in Cockpit]({{< relref "webapps/cockpit/bpmn/process-instance-modification.md#perform-a-batch-modification" >}})
* [Instance Restart in Cockpit]({{< relref "webapps/cockpit/bpmn/process-instance-restart.md" >}})
* [History Cleanup View in Cockpit]({{< relref "webapps/cockpit/cleanup.md" >}})
* [Extending of Locks on External Tasks]({{< relref "user-guide/process-engine/external-tasks.md#extending-of-locks-on-external-tasks" >}})
* [Full Timezone Support for Webapps]({{< relref "user-guide/process-engine/time-zones.md" >}})
* [Default Retry Time Cycle Configuration]({{< relref "user-guide/process-engine/the-job-executor.md#retry-time-cycle-configuration" >}}) and [Retry Intervals]({{< relref "user-guide/process-engine/the-job-executor.md#retry-intervals" >}})
* [Improved performance for database operations]({{< relref "user-guide/process-engine/database.md#jdbcBatchProcessing" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.7_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.7_to_7.8.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.7.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.8 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.


## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/77-to-78/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/77-to-78/jboss.md" >}})
* [IBM WebSphere]({{< relref "update/minor/77-to-78/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/77-to-78/wls.md" >}})

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

# REST API Date Format

This section is applicable if you use the Camunda engine REST API.

The default date format used in the REST API requests and responses has changed from `yyyy-MM-dd'T'HH:mm:ss` to `yyyy-MM-dd'T'HH:mm:ss.SSSZ` (now includes second fractions and timezone). 
The Camunda webapps support the new format by default.

In case some custom REST clients rely on the old date format, choose one of the two following options:

1. Update REST clients to use the new format.
2. Configure custom date format for Camunda REST API (explained in detail in the [Custom Date Format]({{< relref "reference/rest/overview/date-format.md" >}})) section.

# Failed Jobs Retry Configuration

It's no longer necessary to enable the retry time cycle configuration for failed jobs. This is the default behaviour from now on.

You should clean up the following lines from the process engine configuration file to be consistent with this behaviour:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
  ...
  <!-- remove these properties -->
  <property name="customPostBPMNParseListeners">
    <list>
      <bean class="org.camunda.bpm.engine.impl.bpmn.parser.FoxFailedJobParseListener" />
    </list>
  </property>
  
  <property name="failedJobCommandFactory" ref="foxFailedJobCommandFactory" />
  ...
</bean>
<!-- remove this bean -->
<bean id="foxFailedJobCommandFactory" class="org.camunda.bpm.engine.impl.jobexecutor.FoxFailedJobCommandFactory" />
```

# Incident Handler

This section concerns the Java API and the interface `org.camunda.bpm.engine.impl.incident.IncidentHandler`, that is a part of the internal API.

The return type of `IncidentHandler#handleIncident` has been changed from `void` to `Incident`. The API expects that, in case an incident was created, it is returned by the method, 
otherwise the method can return a `null` value.

In case there are custom incident handlers implementing that interface, the method `handleIncident(...)` should be adjusted. 

# Batch processing for database operations

Starting with version 7.8, Camunda uses batch processing to execute SQL statements over the database. The old (not batch) processing mode can be configured like this:
```xml
 <property name="jdbcBatchProcessing" value="false"/>
```

You might consider disabling the batch mode in the following cases:

1. Batch processing is not working for Oracle versions earlier than 12. If you're using one of these versions you would need to disable batch processing
 in Camunda configuration to switch back to the old simple mode.

2. Statement timeout (configured by `jdbcStatementTimeout` parameter) is not working in combination with batch mode on MariaDB and DB2 databases.
So if you're using `jdbcStatementTimeout` configuration on the listed databases, consider disabling the batch mode.
