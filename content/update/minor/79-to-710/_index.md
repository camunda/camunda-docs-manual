---

title: "Update from 7.9 to 7.10"
weight: 47
layout: "single"

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
4. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
5. For developers: [External Task Client Update](#external-task-client-update)
6. For administrators: [CSRF Prevention in the Webapps](#csrf-prevention-in-the-webapps)
7. For administrators: [Whitelist Pattern for User, Group and Tenant IDs](#whitelist-pattern-for-user-group-and-tenant-ids)
8. For administrators and developers: [Support for JDK 9 / 10 / 11](#support-for-jdk-9-10-11)
9. For administrators: [History Related Changes](#history-related-changes)
10. For developers: [Changed Webjar Structure](#webjar-structure-changed)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.10.

Noteworthy new Features and Changes in 7.10:

* [Startable in Tasklist]({{< ref "/user-guide/process-engine/process-engine-concepts.md#start-process-instances-via-tasklist" >}})
* [Set Business Key from Delegation Code]({{< ref "/user-guide/process-engine/delegation-code.md#set-business-key-from-delegation-code" >}})
* [Extending the BPMN Viewer in Cockpit]({{< ref "/webapps/cockpit/extend/configuration.md#bpmn-diagram-viewer-bpmn-js" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.9_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.9_to_7.10.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.9.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## DB2 Specifics

Due to problems with DB2 databases the `ACT_IDX_JOB_HANDLER` index has been removed. When applying the upgrade scripts 
it might happen, that an error message occurs which points out, that the removed index is missing. If you should face this 
error message, please ignore it and continue with the upgrade procedure.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.10 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Wildfly distribution

Starting from Camunda BPM 7.10, only a single WildFly distribution, packaged with the latest version of the WildFly application server will be provided. For WildFly 10+, the update process remains the same.

For **WildFly 8** users, separate **`camunda-wildfly8-modules`** and **`camunda-wildfly8-subsystem`** archives have been provided.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< ref "/update/minor/79-to-710/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< ref "/update/minor/79-to-710/jboss.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/79-to-710/was.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/79-to-710/wls.md" >}})

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

If you are using Camunda Spring Boot Starter within you Spring Boot application, then you would need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Update the Camunda BPM version in your `pom.xml` in case you override it before (e.g. when using the enterprise version or a patch releases)

# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# CSRF Prevention in the Webapps

This release secures the Webapps with CSRF Prevention. If you want to make use of the newly introduced security enhancement, 
please make sure to enable the `CsrfPreventionFilter` when migrating to 7.10 by adjusting the `web.xml` file of Camunda BPM Webapps.

Please also see the documentation about [CSRF Prevention]({{< ref "/user-guide/process-engine/csrf-prevention.md" >}}).

# Whitelist Pattern for User, Group and Tenant IDs

With Camunda BPM 7.10 a whitelist pattern of User, Group and Tenant IDs has been introduced. By default, on creating or 
updating users, groups or tenants the ID is matched against the pattern **"[a-zA-Z0-9]+|camunda-admin"**. To disable or 
adjust the default pattern, please see the documentation under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#custom-whitelist-for-user-group-and-tenant-ids" >}}) in the User Guide.

# Support for JDK 9 / 10 / 11
This release introduces support for JDK 9 / 10 / 11.

## JRuby

The Camunda BPM Platform [supports scripting]({{< ref "/user-guide/process-engine/scripting.md" >}}) with JSR-223 compatible 
script engine implementations. 

If the optional JRuby script engine implementation is used, the respective dependency needs to be updated to 
[version 9.1.14.0](http://jruby.org/2017/11/08/jruby-9-1-14-0.html) or higher to work properly in conjunction with the 
newly supported JDK versions.

{{< note title="Heads Up!" class="info" >}}
Please bear in mind, that the default language level of JRuby 9 is Ruby 2, whereas the default language level of the 
previous version (JRuby 1.7) is Ruby 1.9. Updating the JRuby version might break your scripts.
{{< /note >}}

# History Related Changes

## Skipped Optimistic Locking Exceptions

Starting with 7.10, by default the occurrence of [`OptimisticLockingException`s]({{< ref "/user-guide/process-engine/transactions-in-processes.md#optimistic-locking-in-camunda" >}}) 
on UPDATE/DELETE operations for historic data is prevented. This allows to successfully complete process instances even 
if the associated historic instances have been removed during execution.

There exist a [process engine configuration flag]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#skipHistoryOptimisticLockingExceptions" >}}) 
to preserve the previous behavior.

## Changed Default Cleanup Strategy

The default strategy of the [History Cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}}) feature 
has been changed. From now on, each historic instance related to processes, decisions or batches needs a 
[removal time]({{< ref "/user-guide/process-engine/history.md#removal-time">}}) to be cleaned-up.

Historic instances which (1) have been produced by a Camunda BPM version prior to 7.10 and (2) belong to a top-level instance 
which has been completed already cannot be cleaned-up after the migration took place. This is due to the reason, that a 
removal time is missing for these historic instances. If you want to get rid of them anyway, please add a removal time 
or switch the `historyCleanupStrategy` to the `endTimeBased` cleanup strategy via a 
[process engine configuration property]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#historyCleanupStrategy" >}}).

To gain a better understanding of the new cleanup strategy, please see the updated documentation about the 
[History Cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}}) feature. 

### Custom History Level
If you have implemented a [Custom History Level]({{< ref "/user-guide/process-engine/history.md#implement-a-custom-history-level">}}) 
and you want to use it in conjunction with the removal time based cleanup strategy, please also see the documentation about 
[Removal Time Inheritance]({{< ref "/user-guide/process-engine/history.md#removal-time-inheritance">}}).

# Changed Webjar Structure

Structure of `webjar` and `webjar-ee` artifacts has changed related to adjustment of index.html path. The new structure is as follows:
```
/META-INF/resources
    |--/plugin
    |   |--/admin
    |   |--/cockpit
    |   |--/tasklist
    |--/webjars/camunda
        |--/app
        |--/lib
        |--index.html
        |--securityFilterRules.json
```

