---

title: "Update from 7.11 to 7.12"
weight: 30
layout: "single"

menu:
  main:
    name: "7.11 to 7.12"
    identifier: "migration-guide-712"
    parent: "migration-guide-minor"
    pre: "Update from `7.11.x` to `7.12.0`."

---

This document guides you through the update from Camunda `7.11.x` to `7.12.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Security-related HTTP Headers (Webapps)](#security-related-http-headers-webapps)
1. For developers: [Camunda Commons Typed Values Migration](#camunda-commons-typed-values-migration)
1. For developers: [Camunda DMN Engine Migration](#camunda-dmn-engine-migration)
1. For developers: [Task Lifecycle State and Task Events](#task-lifecycle-state-and-task-events)
1. For administrators and developers: [PostgreSQL Support Clarification](#postgresql-support-clarification)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda 7.12.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Artifact Repository](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.11_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.11_to_7.12.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of Camunda 7, e.g., `7.12.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda 7.12 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/711-to-712/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/711-to-712/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/711-to-712/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/711-to-712/was.md" >}})

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

# Spring Boot Starter Update

If you are using Camunda Spring Boot Starter within you Spring Boot application, then you need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Update the Camunda 7 version in your `pom.xml` in case you override it before (e.g., when using the enterprise version or a patch releases)

# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# Security-related HTTP Headers (Webapps)

In this release, we introduced the following HTTP response headers in the web applications which are available by default:

* Content Security Policy (`Content-Security-Policy`)
* Content-Type Options (`X-Content-Type-Options`)

Please see the documentation about the [HTTP Header Security]({{< ref "/webapps/shared-options/header-security.md" >}}) 
to learn more about the several headers, the defaults, and how to configure or even disable them according to your needs.

# Camunda Commons Typed Values Migration

Starting with version 7.12, the **`camunda-commons-typed-values`** library has been migrated into the `camunda-bpm-platform` repository.

The changes include:

  * The library version has changed from Camunda Commons (currently at 1.8.0) to Camunda 7 version (7.12.0). You can find the new Maven coordinates below:
  
```xml
<dependency>
  <groupId>org.camunda.commons</groupId>
  <artifactId>camunda-commons-typed-values</artifactId>
  <version>7.12.0</version>
</dependency>
```
  * The library isn't part of the `camunda-commons-bom` anymore. Now, it is directly part of the `camunda-bom`. Users that are importing the `camunda-commons-bom` now need to either replace the import with the `camunda-bom`, or, explicitly declare the library version as described above.
  * When updating the `camunda-commons-typed-values` library on a Container-Managed Process Engine, the new `camunda-commons-typed-values` artifact name contains the Camunda 7 version.
  
# Camunda DMN Engine Migration

The **Camunda DMN Engine** is another migration to the `camunda-bpm-platform` repository happening in version 7.12.0. The DMN Engine migration doesn't require any adjustments. However, any contributions to the DMN Engine needs to be addressed to the [camunda-bpm-platform repository](https://github.com/camunda/camunda-bpm-platform/tree/master/engine-dmn).

# Task Lifecycle State and Task Events

The 7.12.0 release provides a more defined User Task lifecycle. This impacts the order in which Task
events are fired. Previously, when the process execution arrived in a User Task, the assignment event
was fired **before** the create event (if an assignee was set). With the new Task lifecycle, **if**
an assignee is explicitly set on the User Task an assignment event is fired **after** the
create event is fired.

Any `create` Task Listeners that depend on the execution of an `assignment` Task Listener need to be adjusted. The same goes for `assignment` Task Listeners that hold the assumption that
they are the first to execute. They need to be adjusted to consider that `create` Task Listeners are executed before them.

Furthermore, `assignment` Task Listeners will no longer be triggered through an assignment within
another Task Listener. Those that hold this assumption need to be adjusted, with this
limitation in mind, by explicitly performing an assignment through the `TaskService`.

# PostgreSQL Support Clarification

According to the [PostgreSQL versioning documentation][postgresql-versioning], the PostgreSQL versioning
scheme changed from PostgreSQL 10. For versions before PostgreSQL 10, a major version was marked by the first two
version numbers, e.g. `9.4`, `9.6`. From PostgreSQL 10, a major version is marked by a single version number, e.g. `10`,
`11`.

As this was only a change to the versioning scheme, the content of the minor releases (e.g. `9.4.6`,
`9.6.18`, `10.13`, `11.2`, etc.) didn't change. Therefore, we have updated the [Camunda Supported Environments][supported-environments],
to reflect that Camunda supports all the minor version updates of a major PostgreSQL version.

Note that this adjustment doesn't change the supported versions of Amazon Aurora PostgreSQL. This is a database
service built on top of PostgreSQL, and as such, needs to be tested for support separately from PostgreSQL.

[postgresql-versioning]: https://www.postgresql.org/support/versioning/
[supported-environments]: {{< ref "/introduction/supported-environments.md#supported-database-products" >}}