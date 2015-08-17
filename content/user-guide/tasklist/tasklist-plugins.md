---

title: 'Plugins'
weight: 60

menu:
  main:
    identifier: "user-guide-tasklist-plugins"
    parent: "user-guide-tasklist"

---


Tasklist uses the concept of plugins to add own functionality without being forced to extend or hack the Tasklist web application.

For further details about the concepts behind plugins please read the [Cockpit plugins section]({{< relref "user-guide/cockpit/cockpit-plugins.md" >}}).

{{< note title="Difference between Cockpit and Tasklist plugins:" class="warning">}}
  * To publish the plugin with Tasklist, its class name must be put into a file called ```org.camunda.bpm.tasklist.plugin.spi.TasklistPlugin``` that resides in the directory ```META-INF/services```.
  * The plugin mechanism of Tasklist does not allow to provide additinal SQL queries by using [MyBatis](http://www.mybatis.org/) mappings.
{{< /note >}}


# Plugin Points

Here you can see the various points at which you are able to add your own plugins.


**Name:** ```tasklist.navbar.action```.

{{< img src="../img/plugin-points/tasklist-plugin-navbar-action.png" title="Plugin Point" >}}

---

**Name:** ```tasklist.task.action```.

{{< img src="../img/plugin-points/tasklist-plugin-task-action.png" title="Plugin Point" >}}

---

**Name:** ```tasklist.task.detail```.

{{< img src="../img/plugin-points/tasklist-plugin-task-detail.png" title="Plugin Point" >}}

---

**Name:** ```tasklist.list```.

{{< img src="../img/plugin-points/tasklist-plugin-list.png" title="Plugin Point" >}}

---

Place your plugin as shown in the following example:

```html
var ViewConfig = [ 'ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('tasklist.task.detail', {
    id: 'sub-tasks',
    priority: 20,
    label: 'Sub Tasks'
  });
}];
```

For more information on creating and configuring your own plugin, please have a look into the followings examples:

* [How to build the server side](https://github.com/camunda/camunda-bpm-webapp/tree/master/webapp/src/main/java/org/camunda/bpm/tasklist/impl/plugin/standalonetask)
* [How to build the client side](https://github.com/camunda/camunda-bpm-webapp/tree/master/webapp/src/main/resources-plugin/standaloneTask/app)
