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

This document guides you through the update from Camunda BPM `7.11.x` to `7.12.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Security-related HTTP Headers (Webapps)](#security-related-http-headers-webapps)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.12.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.11_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.11_to_7.12.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.12.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.12 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< ref "/update/minor/710-to-711/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< ref "/update/minor/710-to-711/jboss.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/710-to-711/was.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/710-to-711/wls.md" >}})

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
3. Update the Camunda BPM version in your `pom.xml` in case you override it before (e.g. when using the enterprise version or a patch releases)

# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# Security-related HTTP Headers (Webapps)

In this release, we introduced the following HTTP response headers in the web applications which are available by default:

* Content Security Policy (`Content-Security-Policy`)
* Content-Type Options (`X-Content-Type-Options`)

Please see the documentation about the [HTTP Header Security]({{< ref "/webapps/shared-options/header-security.md" >}}) 
to learn more about the several headers, the defaults and how to configure or even disable them according to your needs.

# Camunda DMN Engine and Commons Typed Values Migration

Starting with version 7.12, the **Camunda DMN Engine** and **Camunda Commons Typed Values** library have been migrated into the `camunda-bpm-platform` repository.

While the DMN Engine migration doesn't require any adjustments, users of the Typed Values library will need to adjust the library version. From now on, the Typed Values library will use the Process Engine version. You can find the current Maven coordinates below:
```xml
<dependency>
  <groupId>org.camunda.commons</groupId>
  <artifactId>camunda-commons-typed-values</artifactId>
  <version>7.12.0</version>
</dependency>
```
The above is also true when updating the `camunda-commons-typed-values` library on a Container-Managed Process Engine. The new artifact name will contain the Process Engine version (currently, 7.12.0).
