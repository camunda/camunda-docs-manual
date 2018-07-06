---

title: "Update from 7.9 to 7.10"
weight: 47
menu:
  main:
    name: "7.9 to 7.10"
    identifier: "migration-guide-79"
    parent: "migration-guide-minor"
    pre: "Update from `7.9.x` to `7.10.0`."

---

This document guides you through the update from Camunda BPM `7.9.x` to `7.10.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
2. For administrators and developers: [Full Distribution Update](#full-distribution)
3. For administrators: [Standalone Web Application](#standalone-web-application)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.10.

Noteworthy new Features and Changes in 7.10:

* [Custom Whitelist for User, Group and Tenant IDs]({{< relref "#custom-whitelist-for-user-group-and-tenant-ids" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.9_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.9_to_7.10.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.9.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## DB2 Specifics

Within this release the `ACT_IDX_JOB_HANDLER` index is removed because causes problems on db2 databases. It could happen during applying the upgrade scripts an error message to occur which states that the index does not exist. This is not a real problem and you can continue with the upgrade procedure.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.9 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]
* [JBoss AS/Wildfly]
* [IBM WebSphere]
* [Oracle WebLogic]

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

# Custom Whitelist for User, Group and Tenant IDs

From version 7.10, User, Group and Tenant IDs can be matched against a Whitelist Pattern to determine if the provided ID is acceptable or not. The default (global) Regular Expression pattern to match against is **"[a-zA-Z0-9]+|camunda-admin"** i.e. any combination of alphanumeric values or _'camunda-admin'_.

If your organisation allows the usage of additional characters (ex.: special characters), the ProcessEngineConfiguartion propery `generalResourceWhitelistPattern` should be set with the appropriate pattern in the engine's configuration file. Standard [Java Regular Expression](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html) syntax can be used. For example, to accept any character, the following property value can be used:

```xml
<property name="generalResourceWhitelistPattern" value=".+"/>
```

The definition of different patterns for User, Group and Tenant IDs is possible by using the appropriate configuration propery:

```xml
<property name="userResourceWhitelistPattern" value="[a-zA-Z0-9-]+" />
<property name="groupResourceWhitelistPattern" value="[a-zA-Z]+" />
<property name="tenantResourceWhitelistPattern" value=".+" />
```

Note that if a certain pattern isn't defined (ex. the tenant whitelist pattern), the general pattern will be used, either the default one (`"[a-zA-Z0-9]+|camunda-admin"`) or one defined in the configuration file.


