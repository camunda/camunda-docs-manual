---

title: "Upgrade Web Application Plugins from 7.5 to 7.6"

menu:
  main:
    name: "Web Application Plugins"
    identifier: "migration-guide-75-webapp"
    parent: "migration-guide-75"

---

This page describes the changes in web application plugins.

# Cockpit Dashboard

With Camunda BPM 7.6, the dashboard and sections of Cockpit have been re-organized and new names have been
given to the plugin points.

The `cockpit.dashboard` plugin point will allow to add your custom views at the bottom of the dashboard.

## Metrics


Read more about [cockpit dashboard plugins][cockpit-dashboard-plugins].

[cockpit-dashboard-plugins]: {{< relref "webapps/cockpit/extend/plugins.md" >}}#dashboard

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
    <td>bpmn-js</td>    
    <td>0.14.1</td>
    <td>0.18.1</td>
  </tr>
  <tr>
    <td>dmn-js</td>    
    <td>0.5.0</td>
    <td>0.8.1</td>
  </tr>
  <tr>
    <td>cmmn-js</td>
    <td>-</td>
    <td>0.5.3</td>
  </tr>
  </tbody>
</table>
