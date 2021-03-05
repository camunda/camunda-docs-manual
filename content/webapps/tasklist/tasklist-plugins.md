---

title: 'Plugins'
weight: 60

menu:
  main:
    identifier: "webapps-tasklist-plugins"
    parent: "webapps-tasklist"

---

{{< note title="Plugin Compatibility" class="info" >}}
  Please note that the code of Tasklist plugins might need to be migrated when updating Camunda Platform to a higher version (e.g. CSS styles).
{{< /note >}}

Tasklist uses the concept of plugins to add own functionality without having to extend or hack the Tasklist web application.

For further details about the concepts behind plugins, please read the [Cockpit plugins section]({{< ref "/webapps/cockpit/extend/plugins.md" >}}).

{{< note title="Difference between Cockpit and Tasklist plugins:" class="warning">}}
  * To publish the plugin with Tasklist, its class name must be put into a file called ```org.camunda.bpm.tasklist.plugin.spi.TasklistPlugin``` that resides in the directory ```META-INF/services```.
  * The plugin mechanism of Tasklist does not allow to provide additional SQL queries by using [MyBatis](http://www.mybatis.org/) mappings.
{{< /note >}}

# Plugin Points

Here you can see the various points at which you are able to add your own plugins.


**Name:** `tasklist.navbar.action`.

{{< img src="../img/plugin-points/tasklist-plugin-navbar-action.png" title="Plugin Point" >}}

---

**Name:** `tasklist.task.action`.

{{< img src="../img/plugin-points/tasklist-plugin-task-action.png" title="Plugin Point" >}}

---

**Name:** `tasklist.header`.

{{< img src="../img/plugin-points/tasklist-plugin-tasklist-header.png" title="Plugin Point" >}}

---

**Name:** `tasklist.task.detail`.

{{< img src="../img/plugin-points/tasklist-plugin-task-detail.png" title="Plugin Point" >}}

This plugin points properties contain the attribute `label`, which will be rendered in the navigation even when the plugin is not selected.

```Javascript
properties: {
  label: "My Plugin"
}
```

This additional data is passed into the render function:

  * `taskId`

---

**Name:** `tasklist.list`.

{{< img src="../img/plugin-points/tasklist-plugin-list.png" title="Plugin Point" >}}

---

**Name:** `tasklist.card`.

{{< img src="../img/plugin-points/tasklist-plugin-card.png" title="Plugin Point" >}}

This additional data is passed into the render function:

  * `taskId`

---

Configure where to place your plugin as shown in the following example:

```html
var ViewConfig = [ 'ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('tasklist.task.detail', {
    id: 'sub-tasks',
    priority: 20,
    label: 'Sub Tasks'
  });
}];
```

For more information on creating and configuring your own plugin, please have a look at the following examples:

* [How to build the server side](https://github.com/camunda/camunda-bpm-platform/tree/master/webapps/src/main/java/org/camunda/bpm/tasklist/impl/plugin)
* [How to build the client side](https://github.com/camunda/camunda-bpm-platform/tree/master/webapps/ui/tasklist/plugins/standaloneTask/app)
