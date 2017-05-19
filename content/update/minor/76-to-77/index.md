---

title: "Update from 7.6 to 7.7"
weight: 60

menu:
  main:
    name: "7.6 to 7.7"
    identifier: "migration-guide-76"
    parent: "migration-guide-minor"
    pre: "Update from `7.6.x` to `7.7.0`."

---

This document guides you through the update from Camunda BPM `7.6.x` to `7.7.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
2. For administrators and developers: [Rolling Update](#rolling-update)
3. For administrators and developers: [Full Distribution Update](#full-distribution)
4. For administrators: [Standalone Web Application](#standalone-web-application)
5. For administrators and developers: [Application with Embedded Process Engine Update](#application-with-embedded-process-engine)


This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.7.

Noteworthy new Features and Changes in 7.7:

* [New Batch API for multiple process instances modification]({{< relref "user-guide/process-engine/process-instance-modification.md#modification-of-multiple-process-instances" >}})
* [New Batch API for restart of multiple process instances]({{< relref "user-guide/process-engine/process-instance-restart.md" >}})
* [History cleanup]({{< relref "user-guide/process-engine/history.md#history-cleanup" >}})
* [New cryptographic hash function with salt] ({{< relref "user-guide/process-engine/password-hashing.md" >}})
* [External tasks history]({{< relref "reference/rest/history/external-task-log/index.md" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.6_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.6_to_7.7.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there will be any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.6.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Rolling Update

If you do not know what a rolling update in the context of Camunda means, please refer to the [Rolling Update documentation](../../rolling-update/).

In the context of a rolling update, a user created with an engine `A` of Camunda version >= 7.7 cannot be authenticated with an engine `B` of Camunda version <= 7.6. The reason is that the Camunda version 7.7 adds [salt to password hashing](../../../user-guide/process-engine/password-hashing/), thus, the older engine `B` is not aware of salt and unable to create the same hashed password as engine `A`.	

To circumvent that problem you can either update all engines to the version >= 7.7 or create all users exclusively in the engine with version <= 7.6.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.7 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.


## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/76-to-77/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/76-to-77/jboss.md" >}})
* [IBM WebSphere]({{< relref "update/minor/76-to-77/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/76-to-77/wls.md" >}})

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

# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded process engine**.

Update the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies. That means, updating the version should suffice to migrate a process application in terms of dependencies.


