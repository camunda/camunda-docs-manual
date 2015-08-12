---

title: "Update from 7.2 to 7.3"
weight: 100

menu:
  main:
    name: "7.2 to 7.3"
    identifier: "migration-guide-72"
    parent: "migration-guide-minor"
    pre: "Update from `7.2.x` to `7.3.0`."

---

This document guides you through the update from Camunda BPM `7.2.x` to `7.3.0`. It covers these use cases:

1. For administrators and developers: [Database Updates]({{< relref "#update-the-database" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
3. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})
4. For developers: [Migrating a Cockpit plugin]({{< relref "#cockpit-plugins" >}})
5. For administrators: [Migrating a Tasklist translation file]({{< relref "#tasklist-translation-file" >}})
6. For administrators and developers: [Checking authorizations for newly introduced authorization resources]({{< relref "#notewothy-new-features" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.3.

Noteworthy new Features in 7.3:

* **Authorization:** With [Authorization]({{< relref "#notewothy-new-features" >}}) being used for restricting access to applications and identity-related data in Camunda BPM 7.2, 7.3 extends authorization checks to execution-related concepts like process instances and task

{{< note title="No Rolling Upgrades" class="warning" >}}
It is not possible to migrate process engines from Camunda 7.2 to 7.3 in a rolling fashion. This means, it is not possible to run process engines of version 7.2 and 7.3 in parallel with the same database configuration. The reason is that a 7.2 engine may not be able to execute process instances that have been previously executed by a 7.3 engine, as these may use features that were not available yet in 7.2.
{{< /note >}}

# Database Updates

The first step consists in updating the database.

## Basic Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#patching-the-database" >}}) for your database that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before upgrading. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.2_patch_?.sql`.

2. Execute the corresponding upgrade scripts named

    * `$DATABASENAME_engine_7.2_to_7.3.sql`
    * `$DATABASENAME_identity_7.2_to_7.3.sql`
 
    The scripts update the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.2.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## Special considerations

### Microsoft SQL Server

If you update from a version < 7.2.5 and use DB2 or Microsoft SQL Server, you have to execute the SQL script `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`, where `$DATABASE` corresponds to the database platform you use.

### Patch Scripts

If you previously migrated from 7.1 to 7.2 you may have already executed the patch script `$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql`.
This script is the same as patch `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql` which need not be executed then.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "user-guide/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Upgrade Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.3 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/72-to-73/tomcat.md" >}})
* [JBoss/Wildfly]({{< relref "update/minor/72-to-73/jboss.md" >}})
* [Glassfish]({{< relref "update/minor/72-to-73/glassfish.md" >}})
* [IBM WebSphere]({{< relref "update/minor/72-to-73/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/72-to-73/wls.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies have to be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded** process engine.

Updating an application with embedded process engineUpgrade the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

# Cockpit Plugins

Migrating a Cockpit Plugin from Camunda BPM 7.2 to 7.3 consists of the following steps:

Client side:

* [Replacing ngDefine with requireJS]({{< relref "#replacing-ngdefine-with-requirejs" >}})
* [Reviewing usage of angular-ui]({{< relref "#reviewing-usage-of-angular-ui" >}})
* [Reviewing usage of bootstrap]({{< relref "#reviewing-usage-of-bootstrap" >}})

Server side:

* [Replacing Jackson 1 with Jackson 2]({{< relref "#replacing-jackson-1-with-jackson-2" >}})

## Replace ngDefine with requireJS

As of version 7.3, the use of [ngDefine][ng-define] in Cockpit and Admin Plugins is deprecated. You are encouraged to use [requireJS][requirejs] instead.

ngDefine remains part of the Cockpit and Admin app for backwards compatability, but may be removed in the future. ngDefine is not part of the Tasklist app. Tasklist plugins must be written using requireJS.

With ngDefine, you could create an angular module with its dependencies using the ngDefine call:

```javascript
ngDefine('cockpit.plugin.myPlugin', [
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  'module:some.other.angularModule:./someOtherModule.js'
], function(ngModule, $, angular) {
  // ...
});
```

From 7.3 onwards, you have to load dependencies using a define call and create and return the angular module in the callback:

```javascript
define([
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  './someOtherModule.js'
], function($, angular) {

  var ngModule = angular.module('cockpit.plugin.myPlugin', ['some.other.angularModule']);

  // ...

  return ngModule;
});
```


## Review usage of angular-ui

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, the [angular-ui][angular-ui], which is __not supported anymore__ has been partially replaced by [angular-bootstrap][angular-bootstrap].

Custom Cockpit plugins might have used directives or filters provided by [angular-ui][angular-ui] and therefore need to be reviewed.

### Hints

Typically, you can skip this if you do not have custom plugins, otherwise you might want to have a look at the templates of your custom plugins (because it is where filters and directives are expected to be used).

Directives which are __not available anymore__:

- `ui-animate`
- `ui-calendar`
- `ui-codemirror`
- `ui-currency`
- `ui-date`
- `ui-event`
- `ui-if`
- `ui-jq`
- `ui-keypress`
- `ui-map`
- `ui-mask`
- `ui-reset`
- `ui-route`
- `ui-scrollfix`
- `ui-select2`
- `ui-showhide`
- `ui-sortable`
- `ui-tinymce`
- `ui-validate`

Filters which are __not availabe anymore__:

- `format`
- `highlight`
- `inflector`
- `unique`

## Review usage of bootstrap

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, [bootstrap](http://getbootstrap.com/) has been upgraded from version 3.1.1 to 3.3.1. You have to make sure that your plugin works with this [new version of bootstrap][bootstrap-changenotes].

## Replace Jackson 1 with Jackson 2

Beginning with 7.3, the REST API, as well as Cockpit, Tasklist and Admin use Jackson 2 instead of Jackson 1 for object mapping to and from JSON. Plugins explicitly using Jackson need to be migrated. In general, this consists of replacing the Jackson 1 packages `org.codehaus.jackson` with Jackson 2 packages `com.fasterxml.jackson`. Depending on the Jackson features used, further [Jackson-specific migration](http://www.cowtowncoder.com/blog/archives/2012/04/entry_469.html) may be required.

The Jackson 2 JAX-RS provider changes serialization of polymorphic types. Let's assume that your plugin's REST resource has a JAX-RS GET method with return type `List<A>`. `A` is an interface class with two implementing classes, `B` and `C`. With Jackson 2, the response JSON only contains properties defined in `A`. If your REST resource should dynamically include the properties of objects dependent on their actual class, consider adding the annotations `com.fasterxml.jackson.annotation.JsonSubTypes` and `com.fasterxml.jackson.annotation.JsonTypeInfo` to the superclass. See the [Jackson Javadocs][jackson-jsontypeinfo] for details.

# Tasklist Translation File

The following labels must be added to the Tasklist locale file:

* `PROCESS_VARIABLE`
* `TASK_VARIABLE`
* `CASE_VARIABLE`
* `CREATE_TASK`
* `NEW_TASK_NAME`
* `NEW_TASK_ASSIGNEE`
* `NEW_TASK_DESCRIPTION`
* `TASK_SAVE_ERROR`
* `CHANGE`
* `ASC`
* `DESC`
* `BOOLEAN`
* `SHORT`
* `INTEGER`
* `LONG`
* `DOUBLE`
* `DATE`
* `STRING`
* `FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS`
* `FILTER_CRITERIA_INCLUDE_ASSIGNED_TASKS_HINT`
* `ADD_PERMISSION`
* `FILTER_FORM_PERMISSION_GROUP_USER`
* `FILTER_FORM_PERMISSION_IDENTIFIER`
* `BUSINESS_KEY`
* `ADD_SORT_BY`
* `REMOVE_SORTING`
* `EXECUTION_VARIABLE`
* `CASE_EXECUTION_VARIABLE`
* `CASE_INSTANCE_VARIABLE`
* `PROCESS_INSTANCE_ID`
* `PROCESS_INSTANCE_BUSINESS_KEY`
* `PROCESS_DEFINITION_ID`
* `PROCESS_DEFINITION_KEY`
* `PROCESS_DEFINITION_NAME`
* `EXECUTION_ID`
* `CASE_INSTANCE_ID`
* `CASE_INSTANCE_BUSINESS_KEY`
* `CASE_DEFINITION_ID`
* `CASE_DEFINITION_KEY`
* `CASE_DEFINITION_NAME`
* `CASE_EXECUTION_ID`
* `CANDIDATE_GROUP`
* `CANDIDATE_USER`
* `INVOLVED_USER`
* `TASK_DEFINITION_KEY`
* `DELEGATION_STATE`
* `LIKE`

Have a look at the [english translation file](https://github.com/camunda/camunda-tasklist-translations/blob/master/locales/en.json) for a basis to translate.

# Notewothy new Features

This section contains details and  considerations about new features which are noteworthy in the context of updates

## Authorizations

As of version 7.3, it is possible to authorize access to process-related resources such as

* `Deployment`
* `Process Definition`
* `Process Instance`
* `Task`

so that an authenticated user can only see, modify, and delete those process definitions, process instances, and tasks for which the user is authorized to do so (for further details please read the [User Guide](ref:/guides/user-guide/#process-engine-authorization-service)).

The upgrade script `$DATABASE_engine_7.2_to_7.3.sql` contains `INSERT`-statements that create a new `GLOBAL` authorization and a new `GRANT` authorization for the group `camunda-admin` for each new authorization resource. These authorizations ensure that all users are able to access above-mentioned resources so that the process engine behaves the same way after the upgrade as it did before the upgrade.

If these authorizations are not desired and you want to restrict access to the listed resources, you have the following options:

* Before executing the upgrade script `$DATABASE_engine_7.2_to_7.3.sql` remove the corresponding `INSERT`-statements inside the script.
* Use the [Camunda Admin application](ref:/guides/user-guide/#admin-authorization-management-authorizations) to delete the created authorizations.
* Use the [Camunda Admin application](ref:/guides/user-guide/#admin-authorization-management-authorizations) to add authorizations that restrict access.

<div class="alert alert-warning">
  <strong>Note:</strong> If you use custom authorization resources with 7.2, make sure to check that they have a different id than the newly introduced resources (listed above). Otherwise, granted/restricted authorizations apply to both resources which may result in undesired behavior.
</div>

[ng-define]: http://nikku.github.io/requirejs-angular-define
[requirejs]: http://requirejs.org
[admin]: https://github.com/camunda/camunda-admin-ui
[cockpit]: https://github.com/camunda/camunda-cockpit-ui
[angular-ui]: https://github.com/angular-ui/angular-ui-OLDREPO
[angular-bootstrap]: https://github.com/angular-ui/bootstrap
[bootstrap]: http://getbootstrap.com/
[bootstrap-changenotes]: https://github.com/twbs/bootstrap/releases/tag/v3.3.1
