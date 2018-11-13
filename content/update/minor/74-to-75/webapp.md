---

title: "Update Web Application Plugins from 7.4 to 7.5"

menu:
  main:
    name: "Web Application Plugins"
    identifier: "migration-guide-74-webapp"
    parent: "migration-guide-74"

---

This page describes the changes in web application plugins.

# Cockpit Dashboard

Since 7.5, the dashboard and sections of the Cockpit have been re-organized and new names have been given to the plugin points.

_Old_ plugins will still be visible on the dashboard until you change their namespace (from `cockpit.dashboard` to `cockpit.dashboard.section`).

Read more about [cockpit dashboard plugins][cockpit-dashboard-plugins].

[cockpit-dashboard-plugins]: {{< ref "/webapps/cockpit/extend/plugins.md" >}}#dashboard


# Available modules

Since 7.5, the availability of modules in plugins has been changed. The following matrix shows availability of modules for plugins in the Camunda web applications:

<table class="table table-bordered">
  <thead>
  <tr>
    <th>Module</th>
    <th>Cockpit</th>
    <th>Tasklist</th>
    <th>Admin</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>angular</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
  </tr>
  <tr>
    <td>jquery</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
  </tr>
  <tr>
    <td>camunda-commons-ui</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
  </tr>
  <tr>
    <td>camunda-bpm-sdk-js</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
  </tr>
  <tr>
    <td>ngDefine</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
  </tr>
  <tr>
    <td>angular-data-depend</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td></td>
  </tr>
  <tr>
    <td>moment</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>events</td>
    <td><span class="glyphicon glyphicon-ok"></span></td>
    <td></td>
    <td></td>
  </tr>
  </tbody>
</table>

You can use these modules by including them in the define call of your plugin:

```javascript
define(['angular', 'jquery', 'moment'], function(angular, $, moment) {
  var ngModule = angular.module('cockpit.plugin.sample-plugin', []);
  // ...
  return ngModule;
});
```

# Version changes

The following modules have been upgraded to a newer version:

<table class="table table-bordered">
  <thead>
  <tr>
    <th>Module</th>
    <th>Old Version</th>
    <th>New Version</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>angular</td>
    <td>1.2.16</td>
    <td>1.2.29</td>
  </tr>
  <tr>
    <td>bootstrap</td>
    <td>3.3.1</td>
    <td>3.3.6</td>
  </tr>
  <tr>
    <td>bpmn-js</td>
    <td>0.9.2</td>
    <td>0.14.1</td>
  </tr>
  <tr>
    <td>dmn-js</td>
    <td>0.3.1</td>
    <td>0.5.0</td>
  </tr>
  </tbody>
</table>

# Maven Dependency

The dependency to the Camunda webapp core with the maven coordinates `org.camunda.bpm.webapp:camunda-webapp-core` has been renamed. Please use the following snippet in your `pom.xml`:

```xml
<dependency>
  <groupId>org.camunda.bpm.webapp</groupId>
  <artifactId>camunda-webapp</artifactId>
  <classifier>classes</classifier>
  <version>${camunda.version}</version>
</dependency>
```
