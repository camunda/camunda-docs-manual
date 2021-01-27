---

title: "Update from 7.14 to 7.15"
weight: 9
layout: "single"

menu:
  main:
    name: "7.14 to 7.15"
    identifier: "migration-guide-715"
    parent: "migration-guide-minor"
    pre: "Update from `7.14.x` to `7.15.0`."

---

This document guides you through the update from Camunda BPM `7.14.x` to `7.15.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Exception Handling in Task API](#exception-handling-in-task-api)
1. For administrators and developers: [Update of MySQL JDBC Driver in Camunda Docker Images](#update-of-mysql-jdbc-driver-in-camunda-docker-images)
1. For administrators and developers: [Changed filter criterion label in Cockpit](#changed-filter-criterion-label-in-cockpit)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda BPM 7.15.

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.14_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.14_to_7.15.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.15.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.15 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/714-to-715/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/714-to-715/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/714-to-715/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/714-to-715/was.md" >}})

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
3. Reconfigure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server

# Exception Handling in Task API
With this release, the implementation of <code>[TaskService#handleBpmnError][javadocs-taskservice-handleBpmnError]</code> now throws a `NotFoundException` instead of a `NullValueException` in case no task with the given id exists. If the provided task id or error code were null or empty, a `BadUserRequestException` is thrown. Code that consumes this API might need to adapt its error handling. For more information about the reporting Bpmn Error in Task, please check the [User Task][user-task-reference] documentation.

[javadocs-taskservice-handleBpmnError]:https://docs.camunda.org/javadoc/camunda-bpm-platform/7.15/org/camunda/bpm/engine/TaskService.html#handleBpmnError-java.lang.String-java.lang.String-
[user-task-reference]: {{< ref "/reference/bpmn20/tasks/user-task.md#reporting-bpmn-error" >}}

# Update of MySQL JDBC Driver in Camunda Docker Images

With this release, the docker images contain a new version of the MySQL JDBC Driver.

Old Version: 5.1.21\
New Version: 8.0.23

## Behavior Changes

The driver's new version has two significant behavioral changes you should take care of when migrating 
your Docker-based Camunda Runtime installation.

### Downgrade to 5.1.21

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

### 1) Milliseconds Precision for Date/Time values

The new version of the Driver changes how a date/time value is handled. Please make sure to configure 
the Driver as described in [MySQL Database Configuration]({{< ref "/user-guide/process-engine/database/mysql-configuration.md" >}})
to avoid breaking behavior.

### 2) Changed Time Zone Handling

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

## Further Reading

* [Change Docker Environment Variables](https://github.com/camunda/docker-camunda-bpm-platform/tree/7.15#database-environment-variables)
* [MySQL Connector/J 8.0 Migration Guide](https://dev.mysql.com/doc/connectors/en/connector-j-upgrading-to-8.0.html)

# Changed filter criterion label in Cockpit

On the process definition history view in the process instances tab, the filter criterion `Completed` changed to `Finished`.
Only the wording changed – the behavior is still the same: the criterion filters for all historical process instances where the
end time is not null. This includes regularly completed as well as internally and externally canceled process instances.
