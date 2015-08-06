---

title: "Migration from Camunda BPM 7.2"
weight: 40

menu:
  main:
    identifier: "migration-guide-72"
    parent: "migration-guide"

---

The following guide covers these use cases:

1. For administrators and developers: [Migrate the database](ref:#migrate-from-camunda-bpm-72-to-73-migrate-your-database)
2. For administrators and developers: [Migrating a shared process engine setting](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-shared-process-engine-setting)
3. For administrators and developers: [Migrating an embedded process engine setting](ref:#migrate-from-camunda-bpm-72-to-73-migrating-an-embedded-process-engine-setting)
4. For developers: [Migrating a Cockpit plugin](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin)
5. For administrators: [Migrating a Tasklist translation file](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-tasklist-translation-file)
6. For administrators and developers: [Checking authorizations for newly introduced authorization resources](ref:#migrate-from-camunda-bpm-72-to-73-authorization)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.3. The following concepts were introduced with Camunda BPM 7.3 and are relevant for migration:

* **Authorization:** With [Authorization](ref:/guides/user-guide/#admin-authorization-management-authorizations) being used for restricting access to applications and identity-related data in Camunda BPM 7.2, 7.3 extends authorization checks to execution-related concepts like process instances and task


# Migrate your Database

For migration from **Camunda BPM 7.2** to **Camunda BPM 7.3**, the provided upgrade scripts that match your database have to be executed. With a pre-built distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

If you migrate from a version < 7.2.5 and use DB2 or Microsoft SQL Server, you have to execute the SQL script `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`, where `$DATABASE` corresponds to the database platform you use.

<div class="alert alert-warning">
<strong>Note</strong>: If you previously migrated from 7.1 to 7.2 you may have already executed the patch script <code>$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql</code>. This script is the same as patch <code>$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql</code> which need not be executed then.
</div>

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.2_to_7.3.sql` and has to be executed next.


# Migrating a Shared Process Engine Setting

When migrating a Camunda BPM shared engine installation, i.e., a scenario in which the process engine is configured as a central service on the application server, the following steps are required:

1. Upgrade of the Camunda libraries on the application server
2. Migrate process applications

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.3 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

<div class="alert alert-warning">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-11">
      <p><strong>No Rolling Upgrades</strong></p>
      <p>It is not possible to migrate process engines from Camunda 7.2 to 7.3 in a rolling fashion. This means, it is not possible to run process engines of version 7.2 and 7.3 in parallel with the same database configuration. The reason is that a 7.2 engine may not be able to execute process instances that have been previously executed by a 7.3 engine, as these may use features that were not available yet in 7.2.</p>
    </div>
  </div>
</div>

## 1. Upgrade of the Camunda Libraries on the Application Server and Optional Configuration

Please choose the application server you are working with from the following list. You will be redirected to Camunda's installation guide.

* [Apache Tomcat][tomcat-migration]
* [JBoss/Wildfly][jboss-migration]
* [Glassfish][glassfish-migration]
* [IBM WebSphere][websphere-migration]
* [Oracle WebLogic][weblogic-migration]

## 2. Migration Process Applications

For every process application, the Camunda dependencies should be upgraded to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

[tomcat-migration]: ref:/guides/installation-guide/tomcat/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[jboss-migration]: ref:/guides/installation-guide/jboss/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[glassfish-migration]: ref:/guides/installation-guide/glassfish/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[websphere-migration]: ref:/guides/installation-guide/was/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[weblogic-migration]: ref:/guides/installation-guide/wls/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73


# Migrating an Embedded Process Engine Setting

When migrating a Camunda BPM embedded engine, i.e., a process engine that is managed entirely within an application and bound to that application's lifecycle, the following steps are required:

1. Upgrade Camunda dependencies

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.3 distribution for the application server you use. It contains the SQL scripts required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

<div class="alert alert-warning">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-11">
      <p><strong>No Rolling Upgrades</strong></p>
      <p>It is not possible to migrate process engines from Camunda 7.2 to 7.3 in a rolling fashion. This means, it is not possible to run process engines of version 7.2 and 7.3 in parallel with the same database configuration. The reason is that a 7.2 engine may not be able to execute process instances that have been previously executed by a 7.3 engine, as these may use features that were not available yet in 7.2.</p>
    </div>
  </div>
</div>

## 1. Upgrade Camunda Dependencies

Upgrade the dependencies declared in your application's `pom.xml` file to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.


# Migrating a Cockpit Plugin

Migrating a Cockpit Plugin from Camunda BPM 7.2 to 7.3 consists of the following steps:

Client side:

* [Replacing ngDefine with requireJS](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-replacing-ngdefine-with-requirejs)
* [Reviewing usage of angular-ui](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-reviewing-usage-of-angular-ui)
* [Reviewing usage of bootstrap](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-reviewing-usage-of-bootstrap)

Server side:

* [Replacing Jackson 1 with Jackson 2](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-replacing-jackson-1-with-jackson-2)

### Replacing ngDefine with requireJS

As of version 7.3, the use of [ngDefine][ng-define] in Cockpit and Admin Plugins is deprecated. You are encouraged to use [requireJS][requirejs] instead. For information about the use of requireJS in plugins, see the [How to develop a Cockpit Plugin][howto-cockpit-plugin] Tutorial or the migration information below.

ngDefine remains part of the Cockpit and Admin app for backwards compatability, but may be removed in the future. ngDefine is not part of the Tasklist app. Tasklist plugins must be written using requireJS.


#### Replace ngDefine with define call

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


### Reviewing usage of angular-ui

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, the [angular-ui][angular-ui], which is __not supported anymore__ has been partially replaced by [angular-bootstrap][angular-bootstrap].

Custom Cockpit plugins might have used directives or filters provided by [angular-ui][angular-ui] and therefore need to be reviewed.

#### Hints

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

### Reviewing usage of bootstrap

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, [bootstrap](http://getbootstrap.com/) has been upgraded from version 3.1.1 to 3.3.1. You have to make sure that your plugin works with this [new version of bootstrap][bootstrap-changenotes].

### Replacing Jackson 1 with Jackson 2

Beginning with 7.3, the REST API, as well as Cockpit, Tasklist and Admin use Jackson 2 instead of Jackson 1 for object mapping to and from JSON. Plugins explicitly using Jackson need to be migrated. In general, this consists of replacing the Jackson 1 packages `org.codehaus.jackson` with Jackson 2 packages `com.fasterxml.jackson`. Depending on the Jackson features used, further [Jackson-specific migration](http://www.cowtowncoder.com/blog/archives/2012/04/entry_469.html) may be required.

#### Jackson 2 JAX-RS polymorphic response

The Jackson 2 JAX-RS provider changes serialization of polymorphic types. Let's assume that your plugin's REST resource has a JAX-RS GET method with return type `List<A>`. `A` is an interface class with two implementing classes, `B` and `C`. With Jackson 2, the response JSON only contains properties defined in `A`. If your REST resource should dynamically include the properties of objects dependent on their actual class, consider adding the annotations `com.fasterxml.jackson.annotation.JsonSubTypes` and `com.fasterxml.jackson.annotation.JsonTypeInfo` to the superclass. See the [Jackson Javadocs][jackson-jsontypeinfo] for details.

[ng-define]: http://nikku.github.io/requirejs-angular-define
[requirejs]: http://requirejs.org
[howto-cockpit-plugin]: ref:/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin
[admin]: https://github.com/camunda/camunda-admin-ui
[cockpit]: https://github.com/camunda/camunda-cockpit-ui
[angular-ui]: https://github.com/angular-ui/angular-ui-OLDREPO
[angular-bootstrap]: https://github.com/angular-ui/bootstrap
[bootstrap]: http://getbootstrap.com/
[bootstrap-changenotes]: https://github.com/twbs/bootstrap/releases/tag/v3.3.1
[jackson-jsontypeinfo]: https://fasterxml.github.io/jackson-annotations/javadoc/2.4/com/fasterxml/jackson/annotation/JsonTypeInfo.html


# Migrating a Tasklist Translation File

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


# Authorization

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