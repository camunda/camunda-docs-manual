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
Please note that we updated the frontend plugin interface with Camunda Runtime 7.14. Plugins written for Camunda Runtime 7.13 and earlier might no longer work with Camunda Runtime 7.14. Checkout the [update guide]({{< ref "/update/minor/713-to-714" >}}) for more details.
{{< /note >}}

Cockpit defines a plugin concept to add own functionality without being forced to extend or hack the Cockpit web application. You can add plugins at various plugin points, e.g., the processes dashboard as shown in the following example:

{{< img src="../../img/cockpit-plugin.png" title="Cockpit Plugin" >}}


# The Nature of a Cockpit Plugin

A Cockpit plugin is a maven jar project that is included in the Cockpit webapplication as a library dependency. It provides a server-side and a client-side extension to Cockpit.

On the server-side, it can extend Cockpit with custom SQL queries and JAX-RS resource classes. Queries (defined via [MyBatis](http://www.mybatis.org/)) may be used to squeeze additional intel out of an engine database or to execute custom engine operations. JAX-RS resources on the other hand extend the Cockpit API and expose data to the client-side part of the plugin.

On the client-side a plugin may include Javascript modules to extend the Cockpit webapplication. Via those modules a plugin provides custom views.

## File structure

The basic skeleton of a Cockpit plugin looks as follows:

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
    |   |       ├── org/my/plugin/queries/                                (6)
    |   |       |   └── sample.xml
    |   |       └── plugin-webapp/MyPlugin/                               (7)
    |   |           └── app/
    |   |               ├── plugin.js                                     (8)
    |   |               ├── plugin.css                                    (9)
    |   |               └── ...
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
3. a plugin root [JAX-RS](https://jax-rs-spec.java.net/) resource that wires the server-side API.
   When you want to include a frontend module in your plugin, you can use `AbstractCockpitPluginRootResource` as the plug-in resources base class.
   This allows you to serve static client-side resources under the `/static` path.
   Per convention, these resources must reside in a `/plugin-webapp/$plugin_id` directory absolute to the classpath root.
   - the plugin root resource has to explicitly declare the assets that are allowed to be served via the REST API.
     You can declare your assets by overriding the `AbstractAppPluginRootResource#getAllowedAssets()` method in your root resource.
     Undeclared assets won't be served.
     The default implementation contains two predefined assets: `app/plugin.js` and `app/plugin.css`.
4. other resources that are part of the server-side API
5. data transfer objects used by the resources
6. mapping files that provide additional Cockpit queries as [MyBatis](http://www.mybatis.org/) mappings
7. resource directory from which client-side plugin assets are served as static files
8. a js file that exports a frontend module. This file must be named `plugin.js` and be located in the `app` directory of the plugin asset directory
9. a css file that contains the style definitions for the client-side plugin. This file must be named `plugin.css` and be located in the `app` directory of the plugin asset directory

{{< note title="Related Example" class="info">}}
  [How to develop a Cockpit plugin](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/cockpit-fullstack-count-processes)
{{< /note >}}

## Structure of a Frontend Module
A frontend module always follows the same structure. This is how a sample `plugin.js` could look like:

```Javascript
export default {
  id: "customPlugin",
  pluginPoint: "cockpit.dashboard",
  priority: 5,
  render: container => {
    container.innerHTML = "Hello World!";
  }
};
```
This file can also be included standalone as a [custom script]({{< ref "/webapps/cockpit/extend/configuration.md#custom-scripts" >}}).

{{< note title="Important notes about the structure" class="info" >}}
 1. The default export is either one plugin or an array of plugins. Only the default export will be considered in Cockpit.
 2. The render function must not have a return value.
{{< /note >}}

### Attributes in Detail

* `id`: A string which defines this plugin. Should be unique across the application. This can be used to exclude plugins, see [Plugin exclusion](#plugin-exclusion-client-side).

* `pluginPoint`: A string which describes where the plugin is rendered. This also defines which parameters are passed into the render function, see the [plugin point reference](#plugin-points)

* `priority`: Number, describes in which order the plugins at the same pluginPoint will be mounted. For certain Plugin points (like `cockpit.navigation`), a negative priority hides the entry in a dropdown. How this is handled depends on the Plugin Point.

* `render`: Function, the heart of your Plugin. Arguments are (`DOMNode`|`BPMNioViewerInstance`, additionalData (`Object`)). Using the DOM node, you can render your plugin into the DOM.  
The second argument contains API endpoints and CSRF cookie information, as well as constants like a `processDefinitionId`. The `api` key is always present and contains  
  * `engine`: the engine name
  * `CSRFToken`: the current CSRF token for your requests
  * `baseApi`, `adminApi`, `cockpitApi`, `engineApi`: The paths to different API endpoints. The engineApi corresponds to the [Rest Api]({{< ref "/reference/rest" >}})
The details of which data is passed into the plugin can be found at the [plugin point reference](#plugin-points).

* `result`: Function, only available in data plugins. Argument is a (`Promise`). 

* `unmount`: Optional function which is called when the Plugin is unmounted. Use this to cleanup any listeners you or your Framework might have registered.

* `properties`: Optional object which contains all additional configuration for the plugin point, such as labels.

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

In this example we deactivate the cancel action in the Cockpit process instance view and disable the job retry action button:

```html
<base href="/"
      cam-exclude-plugins="cockpit.processInstance.runtime.action:cancel-process-instance-action,
                           cockpit.processInstance.runtime.action:job-retry-action" />
```

# Legacy Plugins
Plugins created for Camunda 7.13 or earlier can be included for compatibility. To achieve this, simply prefix your Plugin ID with `legacy-`. The AngularJS module name for the entry module will be `cockpit.plugin.legacy-*`.

Please note that all Plugins with this prefix will be included using the 7.13 plugin mechanism. You cannot create new Plugins with IDs starting with `legacy`.

For more details about legacy Plugins, check out the legacy [Plugin documentation](https://docs.camunda.org/manual/7.13/webapps/cockpit/extend/plugins/). Please note that this link will take you to the documentation of Camunda **7.13** .

# Plugin points

In this section you will find all Cockpit plugin points.
To configure where you place your plugin, enter the ID into the `pluginPoint` attribute of you frontend module.

Plugin Points describe where a Plugin will be rendered and define which additional data is passed into the second argument of the render function.

For more information on creating and configuring your own plugin, please see [How to develop a Cockpit plugin](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/cockpit-fullstack-count-processes).

## Data

**Data Plugin Points** have a `#result` function that gets the response data as a promise of a called REST endpoint passed. 
The `#result` function is called when the respective HTTP request is performed.
The first argument of the `#result` function is a (`Promise`).

### Login Data

**Name:** `cockit.login.data`\
**REST Endpoint:** `POST /camunda/api/admin/auth/user/default/login/cockpit`

When a user clicks on the **Login** button of the login form, the plugin points `#result` function is called.
Your [Login Plugin](#login) can react to the data that this data plugin will retrieve.

This plugin point is available for all web apps. Just change the canonical app name for the respective webapp (`tasklist.login.data`, `admin.login.data`, `welcome.login.data`).

## Route

**Name:** `cockpit.route`

This plugin points properties contain the attribute `path`, which stands for the hashRoute for this page. This will be rendered when the user navigates in the browser to the url, e.g. `#/my-path`.

```Javascript
properties: {
  path: "/my-path"
}
```

## Navigation

{{< img src="../../img/plugin-points/plugin-point-navigation.png" title="Navigation" >}}

**Name:** `cockpit.navigation`

This plugin point can be used in conjunction with a `cockpit.route` plugin or for shortcuts to existing pages. Negative priority will hide the entry in a drop-down.

This plugin points properties contain the attribute `path`, which matches the location to highlight the active menu entry when the user is on a certain page. The value can be a regex. If no `path` is set, the menu entry will never be highlighted.

```Javascript
properties: {
  path: "/my-path"
}
```

## Login

**Name:** `cockpit.login`

{{< img src="../../img/plugin-points/plugin-point-login-custom.png" title="Login" >}}

The `cockpit.login` plugin point allows to add your custom views at the place where the web app renders the login form.

This plugin point is available for all web apps. Just change the canonical app name for the respective webapp (`tasklist.login`, `admin.login`, `welcome.login`).

## Dashboard

**Name:** `cockpit.dashboard`

{{< img src="../../img/plugin-points/plugin-point-dashboard-custom.png" title="Dashboard" >}}

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

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `processDefinitionId`

## Process Instance Runtime Tab

**Name:** `cockpit.processInstance.runtime.tab`

{{< img src="../../img/plugin-points/plugin-point-process-instance-details.png" title="Process Instance Runtime Tab" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `processInstanceId`

## Process Definition Runtime Action

**Name:** `cockpit.processDefinition.runtime.action`

{{< img src="../../img/plugin-points/plugin-point-process-definition-runtime-action.png" title="Process Definition Runtime Action" >}}

This additional data is passed into the render function:

  * `processDefinitionId`

## Process Instance Runtime Action

**Name:** `cockpit.processInstance.runtime.action`

{{< img src="../../img/plugin-points/plugin-point-process-instance-runtime-action.png" title="Process Instance Runtime Action" >}}

This additional data is passed into the render function:

  * `processInstanceId`

## Process Definition View

**Name:** `cockpit.processDefinition.view`

{{< img src="../../img/plugin-points/plugin-point-cockpit-process-definition-view.png" title="Process Definition View" >}}

## Process Instance View

**Name:** `cockpit.processInstance.view`

{{< img src="../../img/plugin-points/plugin-point-cockpit-process-instance-view.png" title="Process Instance View" >}}

## Process Definition Diagram Overlay

**Name:** `cockpit.processDefinition.diagram.plugin`

{{< img src="../../img/plugin-points/plugin-point-definition-diagram-overlay.png" title="Definition Diagram Overlay" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay.

```Javascript
export default {
  id: "myOverlay",
  pluginPoint: "cockpit.processDefinition.diagram.plugin",
  priority: 0,
  render: (viewer, {processDefinitionId}) => {
    viewer.get("overlays").add(
      // ...
    )
  }
};
```

This additional data is passed into the render function:

  * `processDefinitionId`

## Process Instance Diagram Overlay

**Name:** `cockpit.processInstance.diagram.plugin`

{{< img src="../../img/plugin-points/plugin-point-instance-diagram-overlay.png" title="Instance Diagram Overlay" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay. See [Process Definition Diagram Overlay](#process-definition-diagram-overlay) for an example.


This additional data is passed into the render function:

  * `processInstanceId`

## Job Definition Action

**Name:** `cockpit.jobDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-job-definition-action.png" title="Job Definition Action" >}}

This additional data is passed into the render function:

  * `jobDefinitionId`

## Decision Definition Tab

**Name:** `cockpit.decisionDefinition.tab`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-tab.png" title="Decision Definition Tab" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `decisionDefinitionId`

## Decision Definition Action

**Name:** `cockpit.decisionDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-action.png" title="Decision Definition Action" >}}

This additional data is passed into the render function:

  * `decisionDefinitionId`

## Decision Definition Table

**Name:** `cockpit.decisionDefinition.table`

{{< img src="../../img/plugin-points/plugin-point-decision-definition-table.png" title="Decision Definition Table" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay. See [Process Definition Diagram Overlay](#process-definition-diagram-overlay) for an example.

This additional data is passed into the render function:

  * `decisionDefinitionId`

## Decision Instance Tab

**Name:** `cockpit.decisionInstance.tab`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-tab.png" title="Decision Instance Tab" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `decisionInstanceId`

## Decision Instance Action

**Name:** `cockpit.decisionInstance.action`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-action.png" title="Decision Instance Action" >}}

This additional data is passed into the render function:

  * `decisionInstanceId`

## Decision Instance Table

**Name:** `cockpit.decisionInstance.table`

{{< img src="../../img/plugin-points/plugin-point-decision-instance-table.png" title="Decision Instance Table" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay. See [Process Definition Diagram Overlay](#process-definition-diagram-overlay) for an example.

This additional data is passed into the render function:

  * `decisionInstanceId`

## Case Definition Tab

**Name:** `cockpit.caseDefinition.tab`

{{< img src="../../img/plugin-points/plugin-point-case-definition-tab.png" title="Case Definition Tab" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `decisionInstanceId`

## Case Definition Action

**Name:** `cockpit.caseDefinition.action`

{{< img src="../../img/plugin-points/plugin-point-case-definition-action.png" title="Case Definition Action" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `caseDefinitionId`

## Case Definition Diagram Overlay

**Name:** `cockpit.caseDefinition.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-case-definition-diagram-overlay.png" title="Case Definition Diagram Overlay" >}}

## Case Definition Diagram Plugin

**Name:** `cockpit.caseDefinition.diagram.plugin`

{{< img src="../../img/plugin-points/plugin-point-case-definition-diagram-overlay.png" title="Case Definition Diagram Overlay" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay. See [Process Definition Diagram Overlay](#process-definition-diagram-overlay) for an example.

This additional data is passed into the render function:

  * `caseDefinitionId`

## Case Instance Tab

**Name:** `cockpit.caseInstance.tab`

{{< img src="../../img/plugin-points/plugin-point-case-instance-tab.png" title="Case Instance Tab" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `caseInstanceId`

## Case Instance Action

**Name:** `cockpit.caseInstance.action`

{{< img src="../../img/plugin-points/plugin-point-case-instance-action.png" title="Case Instance Action" >}}

This additional data is passed into the render function:

  * `caseInstanceId`

## Case Instance Diagram Overlay

**Name:** `cockpit.caseInstance.diagram.overlay`

{{< img src="../../img/plugin-points/plugin-point-case-instance-diagram-overlay.png" title="Case Instance Diagram Overlay" >}}

## Case Instance Diagram Plugin

**Name:** `cockpit.caseInstance.diagram.plugin`

{{< img src="../../img/plugin-points/plugin-point-case-instance-diagram-overlay.png" title="Case Instance Diagram Overlay" >}}

Diagram overlay plugins are a little different from other plugins.
This plugin point does not receive a DOM node to render into but an instance of the Diagram viewer to create an overlay. See [Process Definition Diagram Overlay](#process-definition-diagram-overlay) for an example.

This additional data is passed into the render function:

  * `caseDefinitionId`
  * `caseInstanceId`

## Repository Resource Action

**Name:** `cockpit.repository.resource.action`

{{< img src="../../img/plugin-points/plugin-point-repository-resource-action.png" title="Repository Resource Action" >}}

This additional data is passed into the render function:

  * `deploymentId`
  * `resourceId`

## Repository Resource Detail

**Name:** `cockpit.repository.resource.detail`

{{< img src="../../img/plugin-points/plugin-point-repository-resource-detail.png" title="Repository Resource Detail" >}}

This additional data is passed into the render function:

  * `deploymentId`
  * `resourceId`

## Open Task Dashboard

**Name:** `cockpit.tasks.dashboard`

{{< img src="../../img/plugin-points/plugin-point-task-dashboard.png" title="Open Task Dashboard" >}}

## Report View

**Name:** `cockpit.report`

See the [Reports]({{< ref "/webapps/cockpit/reporting.md" >}}) section for an example report plugin.

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

## Batch Operation

**Name:** `cockpit.batch.operation`

{{< img src="../../img/plugin-points/plugin-point-batch-operation.png" title="Custom Plugin" >}}

The render function can be used to create a form for custom payloads to your batch operation.

A simple batch operation without a payload could look like this:

```javascript
export default {
  id: "my-batch-plugin",
  pluginPoint: "cockpit.batch.operation",
  priority: 0,
  render: () => {},

  properties: {
    // Defines which instances the search field will be showing
    searchType: "process" || "decision" || "batch",

    // A function which returns the endpoint and the payload of the batch operation. The argument contains either the search query or the selected IDs.
    // 'api' contains the engine API endpoints. See "Attributes in Detail" for more information.
    onSubmit: function({ query, ids, api }) {
      // The return value must contain the endpoint and the payload object.
      return {
        endpoint: "/my/custom/batch/endpoint",
        payload: {}
      };
    },

    // These labels are required
    labels: {
      dropdownLabel: "Title in the Dropdown menu",
      sentenceLabel: "e.g. 'modify'",
      passiveLabel: "e.g. 'modified'",
      searchHtml: "an <b>HTML</b> string to be displayed over the search bar"
    }
  }
};
```

## Incident Action

**Name:** `cockpit.incident.action`

{{< img src="../../img/plugin-points/plugin-point-incident-action.png" title="Incident Action" >}}

This additional data is passed into the render function:

  * `incidentId`
