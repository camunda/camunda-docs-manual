---

title: 'Cockpit Plugins'
weight: 20

menu:
  main:
    name: "Plugins"
    identifier: "user-guide-cockpit-plugins"
    parent: "user-guide-cockpit-extend"

---

{{< note title="Plugin Compatibility" class="info" >}}
  Please note that the code of Cockpit plugins might need to be migrated when updating Camunda BPM to a higher version (e.g. CSS styles).
{{< /note >}}

Cockpit defines a plugin concept to add own functionality without being forced to extend or hack the Cockpit web application. You can add plugins at various plugin points, e.g., the processes dashboard as shown in the following example:

{{< img src="../../img/cockpit-plugin.png" title="Cockpit Plugin" >}}


# The Nature of a Cockpit Plugin

A cockpit plugin is a maven jar project that is included in the cockpit webapplication as a library dependency. It provides a server-side and a client-side extension to cockpit.

The integration of a plugin into the overall cockpit architecture is depicted in the following figure.

{{< img src="../../img/cockpit-plugins/architecture.png" title="Plugin Architecture" >}}

On the server-side, it can extend cockpit with custom SQL queries and JAX-RS resource classes. Queries (defined via [MyBatis](http://www.mybatis.org/)) may be used to squeeze additional intel out of an engine database or to execute custom engine operations. JAX-RS resources on the other hand extend the cockpit API and expose data to the client-side part of the plugin.

On the client-side a plugin may include [AngularJS](http://angularjs.org/) modules to extend the cockpit webapplication. Via those modules a plugin provides custom views and services.


## File structure

The basic skeleton of a cockpit plugin looks as follows:

    cockpit-plugin/
    ├── src/
    |   ├── main/
    |   |   ├── java/
    |   |   |   └── org/my/plugin/
    |   |   |       ├── db/
    |   |   |       |   └── MyDto.java                                    (5)
    |   |   |       ├── resource/
    |   |   |       |   ├── MyPluginRootResource.java                     (3)
    |   |   |       |   └── ...                                           (4)
    |   |   |       └── MyPlugin.java                                     (1)
    |   |   └── resources/
    |   |       ├── META-INF/services/
    |   |       |   └── org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin  (2)
    |   |       └── org/my/plugin/
    |   |           ├── queries/
    |   |           |   └── sample.xml                                    (6)
    |   |           └── assets/app/                                       (7)
    |   |               └── app/
    |   |                   ├── plugin.js                                 (8)
    |   |                   ├── plugin.css                                (9)
    |   |                   ├── view.html
    |   |                   └── ...
    |   └── test/
    |       ├── java/
    |       |   └── org/my/plugin/
    |       |       └── MyPluginTest.java
    |       └── resources/
    |           └── camunda.cfg.xml
    └── pom.xml

As runtime relevant resource it defines

1. a plugin main class
2. a `META-INF/services` entry that publishes the plugin to Cockpit
3. a plugin root [JAX-RS](https://jax-rs-spec.java.net/) resource that wires the server-side API
4. other resources that are part of the server-side API
5. data transfer objects used by the resources
6. mapping files that provide additional cockpit queries as [MyBatis](http://www.mybatis.org/) mappings
7. resource directory from which client-side plugin assets are served as static files
8. a js file that bootstraps the client-side plugin in a [AngularJS](http://angularjs.org/) / [RequireJS](http://requirejs.org) environment. This file must be named `plugin.js` and be located in the `app` directory of the plugin asset directory
9. a css file that contains the style definitions for the client-side plugin. This file must be named `plugin.css` and be located in the `app` directory of the plugin asset directory

{{< note title="Related Example" class="info">}}
  [How to develop a cockpit plugin]({{< relref "examples/tutorials/develop-cockpit-plugin.md" >}})
{{< /note >}}


# Plugin Exclusion (Client Side)

You can exclude some plugins from the interface by adding a `cam-exclude-plugins`
attribute to the HTML `base` tag of the page loading the interface.
The content of the attribute is a comma separated list formatted like: `<plugin.key>:<feature.id>`.
If the feature ID is not provided, the whole plugin will be excluded.


## Excluding a Complete Plugin

This example will completely deactivate the action buttons on the right side of the process instance view.

```html
<base href="/"
      cam-exclude-plugins="cockpit.processInstance.runtime.action" />
```


## Excluding a Plugin Feature

In this example we deactivate the cancel action in the cockpit process instance view and disable the job retry action button:

```html
<base href="/"
      cam-exclude-plugins="cockpit.processInstance.runtime.action:cancel-process-instance-action,
                           cockpit.processInstance.runtime.action:job-retry-action" />
```


# Plugin points

In this section you will find all Cockpit plugin points.
To configure where you place your plugin have look at the following exampe:

```javascript
var ViewConfig = [ 'ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('cockpit.processDefinition.view', {
    id: 'runtime',
    priority: 20,
    label: 'Runtime'
  });
}];
```

For more information on creating and configuring your own plugin, please see [How to develop a Cockpit plugin]({{< relref "examples/tutorials/develop-cockpit-plugin.md" >}}).


## Navigation

{{< img src="../../img/plugin-points/plugin-point-navigation.png" title="Navigation" >}}

**Name:** `cockpit.navigation`


### Setup

The dashboard navigation plugins can be used to define custom menu entries.

#### `weight`

Takes a number and will defined where the plugin should be placed.  
The bigger the value is the most left it will be placed.  
A value smaller than 0 will put the menu point within the dropdown.

#### `pagePath`

A menu link will be shown in the header of the Cockpit if you set this property.
The `label` property of the plugin is used as the "text".

#### `checkActive`

This property can be used to control when the menu link is set to be _active_.
You can set a function in order to set the `active` CSS class properly.

#### `noDashboardSection`

You can set this property to `true` on your plugin if you do not want it to be shown
on the dashboard (but still want a menu point in the header).

#### `access`

You can dynamically determine if a section is accessible using the following notation

```js
// …
access: ['angularDependency', function (angularDependency) {
  return function (callback) {
    var bool = angularDependency.something; // would hide the dashboard section / header link if `bool` is false
    cb(null, bool);
  };
}]
// …
```
You can see a [working example](https://github.com/camunda/camunda-bpm-webapp/blob/f270dee14046448ad0d2afb44eef75aabc82e15b/ui/cockpit/plugins/base/app/views/dashboard/reports.js#L21-L32) in which the plugin is hidden when no report types are found.



## Dashboard

**Name:** `cockpit.dashboard`

{{< img src="../../img/plugin-points/plugin-point-dashboard-custom.png" title="Dashboard" >}}

With Camunda BPM 7.6, the dashboard plugins of Cockpit have been re-organized and new names have been
given to the plugin points.

The `cockpit.dashboard` plugin point will allow to add your custom views at the bottom of the dashboard.

## Metrics

**Name:** `cockpit.dashboard.metrics`

{{< img src="../../img/plugin-points/plugin-point-dashboard-metrics-view.png" title="Dashboard" >}}

## Processes Dashboard

**Name:** `cockpit.processes.dashboard`

{{< img src="../../img/plugin-points/plugin-point-cockpit-processes-dashboard.png" title="Dashboard" >}}

## Decisions Dashboard

**Name:** `cockpit.decisions.dashboard`

{{< img src="../../img/plugin-points/plugin-point-cockpit-decisions-dashboard.png" title="Dashboard" >}}

## Cases Dashboard

**Name:** `cockpit.cases.dashboard`

{{< img src="../../img/plugin-points/plugin-point-cockpit-cases-dashboard.png" title="Dashboard" >}}

## Process Definition Runtime Tab

**Name:** `cockpit.processDefinition.runtime.tab`

{{< img src="../../img/plugin-points/plugin-point-process-definition-details.png" title="Process Definition Runtime Tab" >}}

## Process Instance Runtime Tab

**Name:** `cockpit.processInstance.runtime.tab`

{{< img src="../../img/plugin-points/plugin-point-process-instance-details.png" title="Process Instance Runtime Tab" >}}

## Process Definition Runtime Action

**Name:** `cockpit.processDefinition.runtime.action`

{{< img src="../../img/plugin-points/plugin-point-process-definition-runtime-action.png" title="Process Definition Runtime Action" >}}

## Process Instance Runtime Action

**Name:** `cockpit.processInstance.runtime.action`

{{< img src="../../img/plugin-points/plugin-point-process-instance-runtime-action.png" title="Process Instance Runtime Action" >}}


## Process Definition View

**Name:** `cockpit.processDefinition.view`

{{< img src="../../img/plugin-points/plugin-point-cockpit-process-definition-view.png" title="Process Definition View" >}}


## Process Instance View

**Name:** `cockpit.processInstance.view`

{{< img src="../../img/plugin-points/plugin-point-cockpit-process-instance-view.png" title="Process Instance View" >}}


## Process Definition Diagram Overlay

**Name:** `cockpit.processDefinition.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-definition-diagram-overlay.png" title="Definition Diagram Overlay" >}}


## Process Instance Diagram Overlay

**Name:** `cockpit.processInstance.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-instance-diagram-overlay.png" title="Instance Diagram Overlay" >}}


## Job Definition Action

**Name:** `cockpit.jobDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-job-definition-action.png" title="Job Definition Action" >}}


## Decision Definition Tab

**Name:** `cockpit.decisionDefinition.tab`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-tab.png" title="Decision Definition Tab" >}}


## Decision Definition Action

**Name:** `cockpit.decisionDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-action.png" title="Decision Definition Action" >}}


## Decision Definition Table

**Name:** `cockpit.decisionDefinition.table`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-table.png" title="Decision Definition Table" >}}

This plugin should contain an initialize function recieving a data object with the following fields:

* `decisionDefinition`: The data about the decision definition corresponding to the [REST response]({{< relref "reference/rest/decision-definition/get.md#result" >}})
* `decisionData`: The data-depend object for the decision definition
* `tableControl`: Control object for the rendered dmn-table corresponding to the [dmn-table widget](http://camunda.github.io/camunda-commons-ui/cam-widget-dmn-viewer.html)

Example:

```
ViewsProvider.registerDefaultView('cockpit.decisionDefinition.table', {
  id: 'my-plugin',
  initialize: function(data) {
    var viewer = data.tableControl.getViewer();
    // ...
  }
});
```

## Decision Instance Tab

**Name:** `cockpit.decisionInstance.tab`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-tab.png" title="Decision Instance Tab" >}}


## Decision Instance Action

**Name:** `cockpit.decisionInstance.action`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-action.png" title="Decision Instance Action" >}}


## Decision Instance Table

**Name:** `cockpit.decisionInstance.table`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-table.png" title="Decision Instance Table" >}}


## Case Definition Tab

**Name:** `cockpit.caseDefinition.tab`

{{< img src="../../img/plugin-points/plugin-point-case-definition-tab.png" title="Case Definition Tab" >}}


## Case Definition Action

**Name:** `cockpit.caseDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-case-definition-action.png" title="Case Definition Action" >}}


## Case Definition Diagram Overlay

**Name:** `cockpit.caseDefinition.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-case-definition-diagram-overlay.png" title="Case Definition Diagram Overlay" >}}


## Case Instance Tab

**Name:** `cockpit.caseInstance.tab`

{{< img src="../../img/plugin-points/plugin-point-case-instance-tab.png" title="Case Instance Tab" >}}


## Case Instance Action

**Name:** `cockpit.caseInstance.action`

{{< img src="../../img/plugin-points/plugin-point-case-instance-action.png" title="Case Instance Action" >}}


## Case Instance Diagram Overlay

**Name:** `cockpit.caseInstance.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-case-instance-diagram-overlay.png" title="Case Instance Diagram Overlay" >}}


## Repository Resource Action

**Name:** `cockpit.repository.resource.action`

{{< img src="../../img/plugin-points/plugin-point-repository-resource-action.png" title="Repository Resource Action" >}}


## Repository Resource Detail

**Name:** `cockpit.repository.resource.detail`

{{< img src="../../img/plugin-points/plugin-point-repository-resource-detail.png" title="Repository Resource Detail" >}}


## Open Task Dashboard

**Name:** `cockpit.tasks.dashboard`

{{< img src="../../img/plugin-points/plugin-point-task-dashboard.png" title="Open Task Dashboard" >}}

See the [Open Tasks Dashboard]({{< relref "webapps/cockpit/tasks-dashboard.md" >}}) section for an example open task
dashboard plugin.


## Report View

**Name:** `cockpit.report`

See the [Reports]({{< relref "webapps/cockpit/reporting.md" >}}) section for an example report plugin.

## Incident Action

**Name:** `cockpit.incident.action`

{{< img src="../../img/plugin-points/plugin-point-incident-action.png" title="Incident Action" >}}

