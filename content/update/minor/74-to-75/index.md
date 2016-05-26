---

title: "Update from 7.4 to 7.5"
weight: 80

menu:
  main:
    name: "7.4 to 7.5"
    identifier: "migration-guide-74"
    parent: "migration-guide-minor"
    pre: "Update from `7.4.x` to `7.5.0`."

---

This document guides you through the update from Camunda BPM `7.4.x` to `7.5.0`. It covers these use cases:

1. For administrators and developers: [Database Updates]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
2. For administrators: [Standalone Web Application]({{< relref "#standalone-web-application" >}})
3. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.5.

Noteworthy new Features and Changes in 7.5:

* **Multi-Tenancy:** In addition to the existing approach for [multi-tenancy]({{< relref "user-guide/process-engine/multi-tenancy.md" >}}) with multiple process engines and database, schema or table isolation, Camunda 7.5 offers a new approach using a single process engine. The engine stores the data of all tenants in one table and separates them by a tenant-identifier which makes it easier to manage a large tenant base.

{{< note title="No Rolling Upgrades" class="warning" >}}
It is not possible to migrate process engines from Camunda 7.4 to 7.5 in a rolling fashion. This means, it is not possible to run process engines of version 7.4 and 7.5 in parallel with the same database configuration. The reason is that a 7.4 engine may not be able to execute process instances that have been previously executed by a 7.5 engine, as these may use features that were not available yet in 7.4.
{{< /note >}}

# Database Updates

Every Camunda installation requires a database schema upgrade.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before upgrading. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.4_patch_?.sql`.

2. Execute the corresponding upgrade scripts named

    * `$DATABASENAME_engine_7.4_to_7.5.sql`

    The scripts update the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.5.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## Special Considerations

### MariaDB

Since 7.5.0 there are separate SQL scripts for MariaDB. If you use MariaDB and update from a version < 7.5.0, you have to execute the script `mariadb_engine_7.4_to_7.5.sql`.

### Wildfly 10

The pre-built Camunda 7.5 distribution ships with Wildfly 10, whereas 7.4 comes with Wildfly 8. Camunda 7.5 is supported on Wildfly 8.2 and 10.0 such that a Wildfly upgrade is not required when migrating from 7.4 to 7.5.

### Oracle WebLogic Server 12c R2

Since 7.4.2, the second release (R2) of Oracle WebLogic Server 12c is also a supported application server.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Upgrade Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.5 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/74-to-75/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/74-to-75/jboss.md" >}})
* [Glassfish]({{< relref "update/minor/74-to-75/glassfish.md" >}})
* [IBM WebSphere]({{< relref "update/minor/74-to-75/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/74-to-75/wls.md" >}})

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
2. Upgrade the database to the new schema as described in the [database
   update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< relref "installation/standalone-webapplication.md#database-configuration" >}})
   section
4. **Important:** The configured history level of the embedded process engine
   was changed to `full` with 7.5.0.
   In order to restore the previous default configuration,
   the `historyLevel` property of the embedded process engine must be set to `audit`
   in the process engine configuration found in

    ```
    WEB-INF/applicationContext.xml
    ```

    of the new version of the standalone web application file

    ```
    camunda-webapp-SERVER-standalone-VERSION.war
    ```
5. Deploy the new and configured standalone web application to the server


# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded process engine**.

Upgrade the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

## Special Considerations

This section describes changes in the internal API of the engine. If you have implemented one of the APIs and replaced the default implementation then you have to adjust your custom implementation. Otherwise, you can skip this section.

### Incident Handler

The interface of an {{< javadocref page="?org/camunda/bpm/engine/impl/incident/IncidentHandler.html" text="Incident Handler" >}} has changed. Instead of a long parameter list, the methods pass a context object which bundles all required informations, like process definition id, execution id and tenant id.

### Correlation Handler

A new method has been added to the interface of a {{< javadocref page="?org/camunda/bpm/engine/impl/runtime/CorrelationHandler.html" text="Correlation Handler" >}}. The new method `correlateStartMessage()` allows to explicit trigger a message start event of a process definition.

### Job Handler

The interface of a {{< javadocref page="?org/camunda/bpm/engine/impl/jobexecutor/JobHandler.html" text="Job Handler" >}} has changed to support multi-tenancy and separate the parsing of the configuration.

### Authorizations

7.5.0 introduces a new authorization check algorithm which scales a lot better than the algorithm used before. The new algorithm can only be used if no Revoke authorizations are used. Consider refraining from the use of Revoke authorizations and adjust the process engine configuration as explained in the Authorization Section:

* [New authorization related Configuration Options]({{< relref "user-guide/process-engine/authorization-service.md#configuration-options" >}})
* [Authorization related  Performance Considerations]({{< relref "user-guide/process-engine/authorization-service.md#performance-considerations" >}})

# Custom styles

The HTML markup of the front-ends changed and some adjustments may be needed.
Read the [customization section]({{< relref "webapps/tasklist/configuration.md" >}}#logo-and-header-color) for more information.
