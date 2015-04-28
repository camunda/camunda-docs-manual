---

title: 'Plugins'
category: 'Tasklist'

---

Tasklist uses the concept of plugins to add own functionality without being forced to extend or hack the Tasklist web application.

For further details about the concepts behind plugins please read the [plugins section](ref:#cockpit-plugins) inside the [cockpit chapter](ref:#cockpit).

<div class="alert alert-warning">
  <p><strong>Difference between Cockpit and Tasklist plugins:</strong></p>
  <ul>
    <li>To publish the plugin with Tasklist, its class name must be put into a file called <code>org.camunda.bpm.tasklist.plugin.spi.TasklistPlugin</code> that resides in the directory <code>META-INF/services</code>.</li>
    <li>The plugin mechanism of Tasklist does not allow to provide additinal SQL queries by using <a href="http://www.mybatis.org/">MyBatis</a> mappings.</li>
  </ul>
</div>

### Plugin points

Here you can see the various points at which you are able to add your own plugins.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/plugin-points/tasklist-plugin-navbar-action.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>tasklist.navbar.action</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/plugin-points/tasklist-plugin-task-action.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>tasklist.task.action</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/plugin-points/tasklist-plugin-task-detail.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>tasklist.task.detail</code>.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/plugin-points/tasklist-plugin-list.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    The plugin point that you can see highlighted in the image on the left is called <code>tasklist.list</code>.
  </div>
</div>


Here is an example of how to configure where you place your plugin:

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
