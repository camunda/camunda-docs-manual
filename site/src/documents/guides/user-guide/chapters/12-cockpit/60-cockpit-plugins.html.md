---

title: 'Plugins'
category: 'Cockpit'

---

Cockpit defines a plugin concept to add own functionality without being forced to extend or hack the Cockpit web application. You can add plugins at various plugin points, e.g., the dashboard as shown in the following example:

<center><img src="ref:asset:/assets/img/implementation-cockpit/cockpit-plugin.png" class="img-responsive"/></center>

The nature of a cockpit plugin
------------------------------

A cockpit plugin is a maven jar project that is included in the cockpit webapplication as a library dependency. It provides a server-side and a client-side extension to cockpit.

The integration of a plugin into the overall cockpit architecture is depicted in the following figure.

<center><img src="ref:asset:/assets/img/real-life/cockpit-plugins/architecture.png" class="img-responsive"/></center>

On the server-side, it can extend cockpit with custom SQL queries and JAX-RS resource classes. Queries (defined via [MyBatis](http://www.mybatis.org/)) may be used to squeeze additional intel out of an engine database or to execute custom engine operations. JAX-RS resources on the other hand extend the cockpit API and expose data to the client-side part of the plugin.

On the client-side a plugin may include [AngularJS](http://angularjs.org/) modules to extend the cockpit webapplication. Via those modules a plugin provides custom views and services.


### File structure

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
8. a main file that bootstraps the client-side plugin in a [AngularJS](http://angularjs.org/) / [RequireJS](http://requirejs.org) environment

<div class="alert alert-info">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-8">
      <strong>Related How-To</strong>
      <p><a href="ref:/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin">How to develop a cockpit plugin</a></p>
    </div>
  </div>
</div>


### Plugin exclusion (Client Side)

You can exclude some plugins from the interface by adding a `cam-exclude-plugins`
attribute to the HTML `base` tag of the page loading the interface.
The content of the attribute is a comma separated list formatted like: `<plugin.key>:<feature.id>`.
If the feature ID is not provided, the whole plugin will be excluded.

#### Excluding a complete plugin

This example will completely deactivate the action buttons on the right side of the process instance view.

```html
<base href="/"
      cam-exclude-plugins="cockpit.processInstance.runtime.action" />
```

#### Excluding a plugin feature

In this example we deactivate the cancel action in the cockpit process instance view and disable the job retry action button:

```html
<base href="/"
      cam-exclude-plugins="cockpit.processInstance.runtime.action:cancel-process-instance-action,
                           cockpit.processInstance.runtime.action:job-retry-action" />
```


### Plugin points

Here you can see the various points at which you are able to add your own plugins.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-cockpit-dashboard.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.dashboard</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-process-definition-details.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processDefinition.runtime.tab</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-process-instance-details.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processInstance.runtime.tab</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-process-definition-runtime-action.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processDefinition.runtime.action</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-process-instance-runtime-action.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processInstance.runtime.action</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-cockpit-process-definition-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processDefinition.view</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-cockpit-process-instance-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processInstance.view</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-definition-diagram-overlay.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processDefinition.diagram.overlay</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-instance-diagram-overlay.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.processInstance.diagram.overlay</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/plugin-points/plugin-point-job-definition-action.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>cockpit.jobDefinition.action</code>.
  </div>
</div>


Here is an example of how to configure where you place your plugin:

```html
var ViewConfig = [ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.processDefinition.view', {
      id: 'runtime',
      priority: 20,
      label: 'Runtime'
    });
  }];
```

For more information on creating and configuring your own plugin, please see <a href="ref:/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin">How to develop a Cockpit plugin</a>.
