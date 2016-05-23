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

_Old_ plugins will still be visible on the dashboard until you change their namespace (from `cockpit.dasboard` to `cockpit.dashboard.section`).

Read more about [cockpit dashboard plugins][cockpit-dashboard-plugins].

[cockpit-dashboard-plugins]: {{< relref "webapps/cockpit/extend/plugins.md" >}}#dashboard
