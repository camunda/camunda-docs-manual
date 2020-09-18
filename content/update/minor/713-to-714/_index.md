---

title: "Update from 7.13 to 7.14"
weight: 10
layout: "single"

menu:
  main:
    name: "7.13 to 7.14"
    identifier: "migration-guide-714"
    parent: "migration-guide-minor"
    pre: "Update from `7.13.x` to `7.14.0`."

---

This document guides you through the update from Camunda BPM `7.13.x` to `7.14.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Update to JQuery 3.5](#update-to-jquery-3-5)
1. For developers: [Changes to Task Query and Historic Task Query behavior](#changes-to-task-query-and-historic-task-query-behavior)
1. For developers: [New Engine Dependency - Connect](#new-engine-dependency-connect)
1. For developers: [Changes to the Cockpit Config File](#cockpit-config-file)
1. For developers: [New Frontend Plugin System for Cockpit](#cockpit-plugins)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda BPM 7.14.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.13_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.13_to_7.14.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.14.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.14 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/713-to-714/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/713-to-714/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/713-to-714/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/713-to-714/was.md" >}})

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


# Update to JQuery 3.5

The Update to JQuery 3.5 changes the parsing of HTML. In some cases, this can lead to Tasklist forms or webapp plugins breaking.

Code which uses a self-closing HTML Tag as a parent for generated DOM-nodes will no longer work as expected.

```html
<div>
  <span ng-bind-html="myHtml" />
  My Other Content <!-- is not displayed -->
</div>
```

You can enable the old behavior by overriding the JQuery `htmlPrefilter` function using a custom script. We provide an example for Tasklist [here](https://github.com/camunda/camunda-bpm-examples/tree/7.14/tasklist/jquery-34-behavior). Please keep in mind that this will reintroduce a security vulnerability that was fixed by this update.

You can read more about the update in the [JQuery release blog](https://blog.jquery.com/2020/04/10/jquery-3-5-0-released/)


# Changes to Task Query and Historic Task Query behavior

As of version `7.14.0`, when using the `TaskService`, or the `HistoryService` to execute a Task query or 
a Historic Task Instance query (or use the  appropriate Rest API endpoints), the following methods now 
perform a case-insensitive comparison:

* `TaskQuery#taskDescription(String description);`
* `TaskQuery#taskDescriptionLike(String descriptionLike);`
* `HistoricTaskInstanceQuery#taskName(String taskName);`
* `HistoricTaskInstanceQuery#taskNameLike(String taskNameLike);`
* `HistoricTaskInstanceQuery#taskDescription(String taskDescription);`
* `HistoricTaskInstanceQuery#taskDescriptionLike(String taskDescriptionLike);`

This was done to make the remaining methods consistent with the behavior in: 

* `TaskQuery#taskName(String name)` 
* `TaskQuery#taskNameLike(String nameLike)`
* `TaskQuery#taskNameNotLike(String nameNotLike)`
* `TaskQuery#taskNameNotEqual(String nameNotEqual)`
 
where the behavior was already present.

Users that expect a case-sensitive result, will need to adjust their logic, or Task names and descriptions, 
for this change of behavior.


# New Engine Dependency - Connect

Camunda Connect dependency has been added to the process engine (`camunda-engine`) artifact, allowing usage of simple [connectors]({{< ref "/user-guide/process-engine/connectors.md" >}}) in the context of the new [telemetry]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#initializeTelemetry" >}}) feature. And changes the status of the dependency from optional to required. See below the details:

-- In a case of **Embedded engine** scenario (includes **Spring Boot Starter** setups), there are two new dependencies added to the `camunda-engine`:

* `camunda-connect-core` dependency is required from 7.14.0 version and on.
* `camunda-connect-connectors-all` dependency also comes by default. It can be replaced by the `camunda-connect-http-client`. The difference is that `camunda-connect-connectors-all` doesn't have dependencies and contains the HTTP and SOAP connectors, as long as `camunda-connect-http-client` brings a `http-client` dependency. You can see an example below how to exchange the dependencies.

```
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.camunda.connect</groupId>
      <artifactId>camunda-connect-connectors-all</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>org.camunda.connect</groupId>
  <artifactId>camunda-connect-http-client</artifactId>
  <scope>runtime</scope>
</dependency>
```

-- In a case of **Shared engine** scenario, you will need to add the connect modules if they are not present yet to the setup. The respective update guides for the application servers contain the necessary steps to do this.

In case you already have a [Connect]({{< ref "/reference/connect/_index.md#maven-coordinates" >}}) dependencies to some of your projects, please consider consolidating the version of them with one that comes as dependency with the engine. That will prevent inconsistencies on the system. Please note that the Connect process engine plugin is still an optional dependency.


# Cockpit Config File
The structure of the `config.js` file, located in the `app/cockpit/scripts/` directory of the webapps, changed slightly. It is now a Javascript module. If you have customized the config file, replace the line 
```javascript
window.camCockpitConf = {
  // ...
}
```
with
```javascript
export default {
  // ...
}
```

The `customScripts` attribute changed as well. It is now an array of paths to your Javascript files. If you do not have custom scripts or Cockpit plugins, you are good to go. Otherwise, continue reading to find out how to migrate your plugins.
 
# Cockpit Plugins
With the 7.14.0 release, we updated the Cockpit frontend plugin system. If you have deployed custom scripts or Cockpit plugins, you need to migrate them if you want to use them in future releases. Cockpit plugins from 7.13 will no longer work in 7.14.

Only Cockpit plugins are affected by this update; Admin and Tasklist plugins will work like before. Changes apply only to the frontend part of your plugins that rely on AngularJS. Custom Rest API, myBatis, and Java classes do not require changes.

## Migrate existing AngularJS plugins
The new plugin system is framework agnostic, so you are free to use any frontend framework you want. In this guide, we will focus on changes you will have to make in your AngularJS plugins. Keep in mind that AngularJS is currently in [long term support](https://docs.angularjs.org/misc/version-support-status) and will not be receiving security updates after December 31, 2021.

To continue using AngularJS plugins, you have to change your plugin to use the new interface and bootstrap an AngularJS application. You will also have to bundle AngularJS into your plugins. This is explained in detail in more detail in the [AngularJS example plugin](https://github.com/camunda/camunda-bpm-examples/tree/7.14/cockpit/cockpit-angularjs-search-processes).

As your plugin is now displayed in your own AngularJS app and is decoupled from the Cockpit application, Camunda directives and services are no longer available. If you use one of the following in your plugin, you will have to migrate it.

### Directives 
<!-- If you used directives prefixed with CAM- -->
Camunda directives, such as search widgets (`cam-widget-search`) or variable tables (`cam-variable-table`) can no longer be used. You can still include and use UI frameworks such as [UI Bootstrap](https://angular-ui.github.io/bootstrap/), if you also bundle them with your plugin. As a rule of thumb, all widgets prefixed with `cam-` will be unavailable.

### Services
<!-- If you used Angular services -->
As with directives, services you could inject into your AngularJS component are no longer available. Only the services included in documented in the [AngularJS documentation](https://docs.angularjs.org/api) are available by default. Services such as `camAPI` and `Uri` can no longer be injected. You can still make request against the Rest Api using the [$http service](https://docs.angularjs.org/api/ng/service/$http) and the Api Urls that get passed into the render function. Check out the [documentation]({{< ref "/webapps/cockpit/extend/plugins.md#attributes-in-detail" >}}) for more details.

### Diagram Interaction
<!-- If you used `DataDepend` for your diagram Interactions -->
Previously, there was no documented way to create interactions with the diagram. We recommend to use 2 plugins to achieve diagram interaction - one [diagram overlay]({{< ref "/webapps/cockpit/extend/plugins.md#process-definition-diagram-overlay" >}}) to capture click events and highlight tasks and one [tab plugin]({{< ref "/webapps/cockpit/extend/plugins.md#process-definition-runtime-tab" >}}) which displays information related to the selection.

Diagram plugin points are available for all views with a BPMN viewer. We created an [example](https://github.com/camunda/camunda-bpm-examples/tree/7.14/cockpit/cockpit-diagram-interactions) to show you how the interaction can look like.

### New Routes
<!-- If you used the `routeProvider` -->
If you used the `routeProvider` to create new routes, you can simply use the new [`Route` plugin point]({{< ref "/webapps/cockpit/extend/plugins.md#route" >}}). The same principles for migrating plugins also apply to migrating routes.

# End of Spring 3 Support

Spring Framework version 3 has been end of life as of December 31st, 2016. The [official guide](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions#supported-versions) recommends to upgrade to versions 4 or 5 of the framework respectively. With version `7.14.0`, official support for Spring 3 ends as well. Applications using this version of Spring might still work as expected but are recommended to be upgraded to versions 4 or 5, which the engine is tested against and can be safely used with.
