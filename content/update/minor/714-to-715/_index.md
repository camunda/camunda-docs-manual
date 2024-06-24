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

This document guides you through the update from Camunda `7.14.x` to `7.15.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Exception Handling in Task API](#exception-handling-in-task-api)
1. For administrators and developers: [Update of MySQL JDBC Driver in Camunda Docker Images](#update-of-mysql-jdbc-driver-in-camunda-docker-images)
1. For developers: [Adjustments in Metrics](#adjustments-in-metrics)
1. For developers: [DMN Model API generates DMN 1.3 diagrams](#dmn-model-api-generates-dmn-1-3-diagrams)
1. [Changes in Webapps](#changes-in-webapps)
   - For administrators and developers: [Changed filter criterion label in Cockpit](#changed-filter-criterion-label-in-cockpit)
   - For administrators and developers: [Embedded Forms Preview in Cockpit](#embedded-forms-preview-in-cockpit)
   - For developers: [Changes to the Webapp Config Files](#changes-to-the-webapp-config-files)
   - For developers: [New Frontend Plugin System for all Webapps](#new-frontend-plugin-system-for-all-webapps)
1. For administrators and developers: [PostgreSQL Support Clarification](#postgresql-support-clarification)
1. For administrators and developers: [Changes to Camunda 7 Run Start Script](#changes-to-camunda-platform-run-start-script)
1. For administrators and developers: [Java External Task Client: New Version Handling](#java-external-task-client-new-version-handling)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda 7.15.

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Artifact Repository](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.14_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.14_to_7.15.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of Camunda 7, e.g., `7.15.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda 7.15 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

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

With this release, the implementation of [`TaskService#handleBpmnError`][javadocs-taskservice-handleBpmnError] now throws a 
`NotFoundException` instead of a `NullValueException` in case no task with the given id exists. If the provided task id or 
error code are null or empty, a `BadUserRequestException` is thrown. 

Additionally, the implementation of [`TaskService#handleEscalation`][javadocs-taskservice-handleEscalation] was changed, too.
It now also throws a `NotFoundException` instead of a `NullValueException` in case no task with the given id exists. If the provided task id or
escalation code were null or empty, a `BadUserRequestException` is thrown.

Code that consumes these APIs might need to adapt its error handling.

For more information about the reporting of Bpmn Errors and BPMN Escalations in Tasks, please check the  User Task documentation
[here][user-task-reference-error] and [here][user-task-reference-escalation].

[javadocs-taskservice-handleBpmnError]:https://docs.camunda.org/javadoc/camunda-bpm-platform/7.15/org/camunda/bpm/engine/TaskService.html#handleBpmnError-java.lang.String-java.lang.String-
[javadocs-taskservice-handleEscalation]:https://docs.camunda.org/javadoc/camunda-bpm-platform/7.15/org/camunda/bpm/engine/TaskService.html#handleEscalation-java.lang.String-java.lang.String-
[user-task-reference-error]: {{< ref "/reference/bpmn20/tasks/user-task.md#reporting-bpmn-error" >}}
[user-task-reference-escalation]: {{< ref "/reference/bpmn20/tasks/user-task.md#reporting-bpmn-escalation" >}}

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

# Adjustments in Metrics

There are two major changes with regards to metrics:

* Task Metrics are now tracked in a separate table
* The manual deletion of metrics through the Java API can only be executed by users of the `camunda-admin` group

## Task Metrics

Previously, the number of unique task workers has been aggregated from historic task instance data.
Starting with this release, the data necessary to track this metric will be kept in a separate table `ACT_RU_TASK_METER_LOG`.
This will make the metric independent from engine history data, allowing you to handle history and its cleanup as implied by your use case, 
regardless of the metrics you might be required to report as an enterprise customer.

You can read more about the metrics in our [Metrics Guide]({{< ref "/user-guide/process-engine/metrics.md" >}}).

Since the metrics data accumulated over time can become substantial, it is possible to

* configure a history time live for the task metrics data so it is picked up by [History Cleanup]({{< ref "/user-guide/process-engine/history/history-configuration.md#task-metrics" >}})
* manually clean up the task metrics data through API

Manually deleting task metrics data can be done via {{< restref page="deleteTaskMetrics" text="REST API" tag="Metrics" >}} or Java API by using the `deleteTaskMetrics` method provided by the `ManagementService`.
Both APIs allow to provide a date, prior to which all task metrics data will be deleted. Please note that only users of the `camunda-admin` group can manually delete task metrics.

Reporting task metrics can also be explicitly disabled via engine configuration by either adding a `taskMetricsEnabled` property with value `false` to the configuration or by setting the flag`isTaskMetricsEnabled` to `false` via Java API.

# DMN Model API generates DMN 1.3 diagrams

As of version `7.13.0`, the DMN Model API supported the DMN 1.3 specification. However, any generated/exported DMN
diagrams still used the DMN 1.1 specification. As of this version, the DMN Model API now [generates DMN diagrams][create-dmn-diagram]
with the DMN 1.3 specification. Users that rely on the DMN 1.1 specification from diagrams generated by the DMN Model
API should adjust their logic to use the DMN 1.3 specification.

[create-dmn-diagram]: {{< ref "/user-guide/model-api/dmn-model-api/create-a-model.md" >}}

# Changes in Webapps

## Changed filter criterion label in Cockpit

On the process definition history view in the process instances tab, the filter criterion `Completed` changed to `Finished`.
Only the wording changed – the behavior is still the same: the criterion filters for all historical process instances where the
end time is not null. This includes regularly completed as well as internally and externally canceled process instances.

## Embedded Forms Preview in Cockpit
Deployed Forms now show a preview in the Cockpit deployment view. If the HTML has embedded `<script>` tags, they will be executed, which may have unintended side-effects.
You can disable this preview feature in the [Cockpit configuration]({{< ref "/webapps/cockpit/extend/configuration.md#preview-deployed-embedded-forms" >}}) to prevent script execution. Check out our [security instructions]({{< ref "/user-guide/security.md#forms" >}}) for more information on how to secure your Camunda installation.


## Changes to the Webapp Config Files

The structure of the `config.js` file, located in the `app/{admin|tasklist|welcome}/scripts/` directory of the webapps, changed slightly. It is now a Javascript module. If you have customized the config file, replace the line 
```javascript
window.camAdminConf = {
  // ...
}
```
with
```javascript
export default {
  // ...
}
```

The `customScripts` and `bpmnJs.additionalModules` attributes changed as well. Both are now arrays of paths to your Javascript files. You can check the default `config.js` for an example structure:
```Javascript
export default {
  customScripts: [
    // If you have a folder called 'my-custom-script'
    // with a file called 'customScript.js' in it
    'my-custom-script/customScript'
  ],
  bpmnJs: {
    additionalModules: [
      // If you have a folder called 'my-custom-module'
      // with a file called 'module.js' in it
      'my-custom-module/module'
    ],
  }
}
```
If you do not have custom scripts or plugins, you are good to go. Otherwise, continue reading to find out how to migrate your plugins.
 
## New Frontend Plugin System for all Webapps

With the 7.15.0 release, we updated all our Webapps frontend plugin system. They now use the same plugin system that we introduced to cockpit in the 7.14 release. Check out the [7.13 to 7.14 update guide]({{< ref "/update/minor/713-to-714/_index.md#migrate-existing-angularjs-plugins" >}}) for more details on how to migrate your plugins.

You can still use your old plugins if you include them as legacy plugins:

### Legacy Custom Scripts

Custom Scripts created for Camunda 7.13 or earlier can be included using the `requireJsConfig` property to the `app/{appName}/scripts/config.js`. You can include these custom scripts using the custom [requireJS configuration](https://requirejs.org/docs/api.html#config).
If you are upgrading and have a modified `config.js` file, you can simply rename the `customScripts` attribute to `requireJsConfig`.


### Legacy Plugins

Plugins created for Camunda 7.13 or earlier can be included for compatibility. To achieve this, simply prefix your Plugin ID with `legacy-`. The AngularJS module name for the entry module will be `{appName}.plugin.legacy-*`. There are 3 Steps you can follow to adjust your existing plugin to work with Camunda 7.15. We will show the changes with the [Cockpit Failed Jobs Plugin](https://github.com/camunda/camunda-bpm-examples/tree/7.13/cockpit/cockpit-failed-jobs-plugin), but the steps are the same for all webapp plugins.

  1. Prefix the Plugin ID with `legacy-`.  

        --- a/src/main/java/org/camunda/bpm/cockpit/plugin/failedjobs/FailedJobsPlugin.java
        +++ b/src/main/java/org/camunda/bpm/cockpit/plugin/failedjobs/FailedJobsPlugin.java
        @@ -24,7 +24,7 @@ import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;
        
        public class FailedJobsPlugin extends AbstractCockpitPlugin {
        
        -  public static final String ID = "failed-jobs-plugin";
        +  public static final String ID = "legacy-failed-jobs-plugin";
        
        public String getId() {
            return ID;

2. Rename the webapp resources folder.

            src/main/resources/plugin-webapp/failed-jobs-plugin 
        --> src/main/resources/plugin-webapp/legacy-failed-jobs-plugin

3. Adjust the Plugin ID and paths in the frontend files. This includes custom API calls, resources and the module name.
    
        --- a/src/main/resources/plugin-webapp/failed-jobs-plugin/app/plugin.js
        +++ b/src/main/resources/plugin-webapp/legacy-failed-jobs-plugin/app/plugin.js
        @@ -67,14 +67,14 @@ define(['angular'], function(angular) {
            ViewsProvider.registerDefaultView('cockpit.dashboard', {
            id : 'failed-jobs',
            label : 'Failed Jobs',
        -      url: 'plugin://failed-jobs-plugin/static/app/failed-jobs-table.html',
        +      url: 'plugin://legacy-failed-jobs-plugin/static/app/failed-jobs-table.html',
            dashboardMenuLabel: 'Failed Jobs',
            controller : FailedJobsController,
            priority : 15
            });
        }];
        
        -  var ngModule = angular.module('cockpit.plugin.failed-jobs-plugin', []);
        +  var ngModule = angular.module('cockpit.plugin.legacy-failed-jobs-plugin', []);
                ngModule.config(Configuration);

Please note that all Plugins with this prefix will be included using the 7.13 plugin mechanism. You cannot create new Plugins with IDs starting with `legacy`.

# PostgreSQL Support Clarification

According to the [PostgreSQL versioning documentation][postgresql-versioning], the PostgreSQL versioning
scheme changed from PostgreSQL 10. For versions before PostgreSQL 10, a major version was marked by the first two 
version numbers, e.g. `9.4`, `9.6`. From PostgreSQL 10, a major version is marked by a single version number, e.g. `10`,
`11`, `12`. 

As this was only a change to the versioning scheme, the content of the minor releases (e.g. `9.4.6`, 
`9.6.18`, `10.13`, `11.2`, etc.) didn't change. Therefore, we have updated the [Camunda Supported Environments][supported-environments], 
to reflect that Camunda supports all the minor version updates of a major PostgreSQL version.

Note that this adjustment doesn't change the supported versions of Amazon Aurora PostgreSQL. This is a database
service built on top of PostgreSQL, and as such, needs to be tested for support separately from PostgreSQL.

[postgresql-versioning]: https://www.postgresql.org/support/versioning/
[supported-environments]: {{< ref "/introduction/supported-environments.md#supported-database-products" >}}

# Changes to Camunda 7 Run Start Script
With 7.15, we have introduced Swagger UI as an additional module of the Camunda 7 Run distro. This brings changes to the 
default startup behavior of Run and the default serving of static resources through Spring WebMVC.

## New default Behavior of Start Script 
If no arguments are provided to the Run start script, Swagger UI is now started alongside the WebApps and REST API. To get the old behavior, 
launch Run like this:
```bash
./start.sh --rest --webapps
```
The same applies for the Run Docker Container:
```bash
docker run camunda/camunda-bpm-platform:run ./camunda.sh --rest --webapps
```
However, if the `--production` argument is provided Swagger UI is disabled by default.
You can read more on the configuration of Camunda 7 Run [here][run-documentation].

## Static file serving through Spring Web MVC disabled by default
By default, Spring Boot serves static content through Spring Web MVC from any directories called `/static`, `/public`, `/resources` or
`/META-INF/resources` on the classpath. To prevent users from accidentally serving files, we disable this in configuration files `default.yml` and `production.yml` 
respectively, by setting `spring.web.resources.static-locations` to `NULL`. If you want serve static files, you can add paths there.

[run-documentation]: {{< ref "/user-guide/camunda-bpm-run.md" >}}

# Java External Task Client: New Version Handling

Starting with version 7.15.0, Camunda 7 Runtime and its compatible Java External Task Client 
artifact will share the same version.
