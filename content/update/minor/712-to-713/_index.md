---

title: "Update from 7.12 to 7.13"
weight: 20
layout: "single"

menu:
  main:
    name: "7.12 to 7.13"
    identifier: "migration-guide-713"
    parent: "migration-guide-minor"
    pre: "Update from `7.12.x` to `7.13.0`."

---

This document guides you through the update from Camunda BPM `7.12.x` to `7.13.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Identity Service Queries](#identity-service-queries)
1. For developers: [MetricsReporterIdProvider interface Deprecation](#metricsreporteridprovider-interface-deprecation)
1. For administrators and developers: [New Version of Templating Engines (Freemarker, Velocity)](#new-version-of-templating-engines-freemarker-velocity)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda BPM 7.13.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.12_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.12_to_7.13.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.13.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.13 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

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

Starting with version 7.13, the **`camunda-bpm-spring-boot-starter`** library has been migrated into the `camunda-bpm-platform` repository.
The library version has therefore changed from Camunda Spring Boot Starter (currently at 3.4.x) to the Camunda BPM Platform version (7.13.0).
The Maven coordinates have not changed otherwise.

Overriding the Camunda version used by the Spring Boot Starter is not necessary anymore. 
Pick the version of the Starter that resembles the version of Camunda BPM you would like to use.

If you are using Camunda Spring Boot Starter within your Spring Boot application, then you need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Remove the Camunda BPM version from your `pom.xml` in case you overrode it before (e.g. when using the enterprise version or a patch release).

# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# Identity Service Queries

When you provide ...

1. a custom identity provider implementation by implementing the interface `ReadOnlyIdentityProvider` or `WritableIdentityProvider`
2. **AND** a dedicated implementation of Identity Service Queries (e. g. `GroupQuery`, `TenantQuery`, `UserQuery`)

With this release, you need to implement a new API method <code>[Query#unlimitedList][javadocs-query-unlimited-list]</code>
so that the REST API works appropriately.

Please read more about it in the [User Guide]({{< ref "/user-guide/process-engine/process-engine-api.md#custom-identity-service-queries" >}}).

[javadocs-query-unlimited-list]: https://docs.camunda.org/javadoc/camunda-bpm-platform/7.13/org/camunda/bpm/engine/query/Query.html#unlimitedList--

# MetricsReporterIdProvider interface Deprecation

As of version 7.13, the `MetricsReporterIdProvider` interface has been deprecated. By default, the
Metrics Reporter identifier now uses the `SimpleIpBasedProvider` class, which was ported to
implement the new `HostnameProvider` interface. The `HostnameProvider` interface, and it's default
`SimpleIpBasedProvider` implementation, are used to generate `hostname` information for the Historic
Job Logs as well.

In case a custom implementation of the `MetricsReporterIdProvider` interface is used, it is
recommended to port it to the new `HostnameProvider` interface and set it to the appropriate Process
Engine Configuration property (read more about it [here]({{< ref "/user-guide/process-engine/metrics.md#reporter-identifier" >}})).
Otherwise, different values will be provided for the Metrics Reporter identifier and the Historic
Job Logs hostname information.

# New Version of Templating Engines (Freemarker, Velocity)

Camunda 7.13 includes version 2.0.0 of the `org.camunda.template-engines` artifacts, in particular `camunda-template-engines-freemarker`, `camunda-template-engines-velocity` and `camunda-template-engines-xquery-saxon`.

This updates the following template engine versions:

* Apache Freemarker
  * Old version: 2.3.20 (Release date: June 2013)
  * New version: 2.3.29 (Release date: August 2019)
  * Change log: https://freemarker.apache.org/docs/api/freemarker/template/Configuration.html#Configuration-freemarker.template.Version-
* Apache Velocity
  * Old version: 1.7 (Release date: November 2010)
  * New version: 2.2 (Release date: January 2020)
  * Change log: https://velocity.apache.org/engine/2.2/upgrading.html

Please note that the new versions of Freemarker and Velocity contain changes that are not compatible with the previous versions. We strongly recommend to test the execution of your templates before applying the update. In addition, you can replace the artifacts of version 2.0.0 by the old artifacts in version 1.1.0 to continue using the old versions of Freemarker and Velocity.
