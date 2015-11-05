---

title: "Update from 7.3 to 7.4"
weight: 90

menu:
  main:
    name: "7.3 to 7.4"
    identifier: "migration-guide-73"
    parent: "migration-guide-minor"
    pre: "Update from `7.3.x` to `7.4.0`."

---

This document guides you through the update from Camunda BPM `7.3.x` to `7.4.0`. It covers these use cases:

1. For administrators and developers: [Database Updates]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
3. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.4.

Noteworthy new Features in 7.4:

...

<!-- TODO: add list of noteworthy new features, especially when they are relevant for upgrading (e.g. DMN that requires new artifacts) -->

{{< note title="No Rolling Upgrades" class="warning" >}}
It is not possible to migrate process engines from Camunda 7.3 to 7.4 in a rolling fashion. This means, it is not possible to run process engines of version 7.3 and 7.4 in parallel with the same database configuration. The reason is that a 7.3 engine may not be able to execute process instances that have been previously executed by a 7.4 engine, as these may use features that were not available yet in 7.3.
{{< /note >}}

# Database Updates

The first step deals with upgrading the database schema.

## Basic Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before upgrading. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.3_patch_?.sql`.

2. Execute the corresponding upgrade scripts named

    * `$DATABASENAME_engine_7.3_to_7.4.sql`

    The scripts update the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.4.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## Special Considerations

<!-- TODO: anything to consider? e.g. patch scripts that a user may or may not have already executed (compare to 7.2 to 7.3 upgrade)? -->



# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Upgrade Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.4 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/73-to-74/tomcat.md" >}})
* [JBoss/Wildfly]({{< relref "update/minor/73-to-74/jboss.md" >}})
* [Glassfish]({{< relref "update/minor/73-to-74/glassfish.md" >}})
* [IBM WebSphere]({{< relref "update/minor/73-to-74/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/73-to-74/wls.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies have to be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

...

<!-- TODO: are there any new dependencies? If yes, mention here -->

# Application with Embedded Process Engine

...

## Special Considerations

This section describes changes in the engine's default behavior. While the changes are reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful upgrade.

### Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

[ng-define]: http://nikku.github.io/requirejs-angular-define
[requirejs]: http://requirejs.org
[admin]: https://github.com/camunda/camunda-admin-ui
[cockpit]: https://github.com/camunda/camunda-cockpit-ui
[angular-ui]: https://github.com/angular-ui/angular-ui-OLDREPO
[angular-bootstrap]: https://github.com/angular-ui/bootstrap
[bootstrap]: http://getbootstrap.com/
[bootstrap-changenotes]: https://github.com/twbs/bootstrap/releases/tag/v3.3.1

### User Operation Log

The behavior of the [user operation log]({{< relref "user-guide/process-engine/history.md#user-operation-log" >}}) has changed, so that operations are only logged if they are performed in the context of a logged in user. This behavior can be toggled in the process engine configuration using the property `restrictUserOperationLogToAuthenticatedUsers` (default `true`). To restore the engine's prior behavior, i.e. to write log entries regardless of user context, set the flag to `false`.

Furthermore, with 7.4 task events are only logged when they occur in the context of a logged in user. Task events are accessible via the deprecated API `TaskService#getTaskEvents`. If you rely on this API method, the previous behavior can be restored by setting the flag `restrictUserOperationLogToAuthenticatedUsers` to `false`.