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

# The Nature of an Admin Plugin


## Dashboard

**Name:** `admin.dashboard.section`

{{< img src="../../img/admin-start-page-view.png" title="Dashboard" >}}

With Camunda BPM 7.5, the Admin webapp gets a dashboard based on plugins similar to the [Cockpit dashboard ones]({{< relref "webapps/cockpit/extend/plugins.md" >}}#dashboard).

You can find examples of [Admin dashboard plugins here](https://github.com/camunda/camunda-bpm-webapp/tree/master/ui/admin/plugins/base/app/views/dashboard).
