---

title: 'Admin Plugins'
weight: 20

menu:
  main:
    name: "Plugins"
    identifier: "user-guide-admin-plugins"
    parent: "user-guide-admin-extend"

---

{{< note title="Plugin Compatibility" class="info" >}}
  Please note that the code of Admin plugins might need to be migrated when updating Camunda BPM to a higher version (e.g. CSS styles).
{{< /note >}}

Admin uses the concept of plugins to add own functionality without having to extend or hack the Admin web application.

For further details about the concepts behind plugins, please read the [Cockpit plugins section]({{< ref "/webapps/cockpit/extend/plugins.md" >}}).

{{< note title="Difference between Cockpit and Admin plugins:" class="warning">}}
  * To publish the plugin with Admin, its class name must be put into a file called ```org.camunda.bpm.admin.plugin.spi.AdminPlugin``` that resides in the directory ```META-INF/services```.
  * The plugin mechanism of Admin does not allow to provide additional SQL queries by using [MyBatis](http://www.mybatis.org/) mappings.
{{< /note >}}


# Plugin Points

Here you can see the various points at which you are able to add your own plugins.

## Dashboard

**Name:** `admin.dashboard.section`

{{< img src="../../img/admin-start-page-view.png" title="Dashboard" >}}

With Camunda BPM 7.5, the Admin webapp gets a dashboard based on plugins similar to the [Cockpit dashboard ones]({{< ref "/webapps/cockpit/extend/plugins.md" >}}#dashboard).

You can find examples of [Admin dashboard plugins here](https://github.com/camunda/camunda-bpm-webapp/tree/master/ui/admin/plugins/base/app/views/dashboard).
