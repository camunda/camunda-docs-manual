---

title: "Update from 7.15 to 7.16"
weight: 8
layout: "single"

menu:
  main:
    name: "7.15 to 7.16"
    identifier: "migration-guide-716"
    parent: "migration-guide-minor"
    pre: "Update from `7.15.x` to `7.16.0`."

---

This document guides you through the update from Camunda Platform `7.15.x` to `7.16.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For administrators: [Set Variables on Process Instance Migration](#set-variables-on-process-instance-migration)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda Platform 7.16.

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.15_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.15_to_7.16.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda Platform, e.g., `7.16.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda Platform 7.16 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/715-to-716/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/715-to-716/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/715-to-716/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/715-to-716/was.md" >}})

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

# Set Variables on Process Instance Migration

We have extended the [Process Instance Migration Batch Operation]({{< ref "/user-guide/process-engine/process-instance-migration.md#set-variables-to-process-instances" >}}) to set variables into the process instances' scope.
Please bear in mind that the [usage of new features]({{< ref "/rolling-update.md#usage-of-new-features" >}}) during a rolling update 
leads to unexpected behavior and therefore must be avoided: When a migration batch with variables is 
created during a rolling update, variables might or might not be set depending on the executing engine (old/new engine), 
and batch variables might not be removed when an old engine executes the monitor job.