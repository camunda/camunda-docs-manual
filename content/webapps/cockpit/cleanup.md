---

title: 'Cleanup View'
weight: 40

menu:
  main:
    name: "Cleanup"
    identifier: "user-guide-cockpit-cleanup"
    parent: "user-guide-cockpit"
    pre: "Get more insights about the history cleanup and all related statistics"

---
{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../img/cockpit-cleanup-page.png" title="Cockpit Cleanup View" >}}

The cleanup view in Cockpit provides information about the history cleanup state and statistics about the cleanable and deleted data.
Moreover, the page allows to manually perform various operations related to the history cleanup.


# Cleanup State

Information and operations related to the history cleanup vary on its state. 

If a history cleanup window is configured and scheduled, you can check out the remaining time for its start. Whether a window is scheduled or not, it is always possible to manually trigger a cleanup job.

Furthermore, you can always be aware of any incident that occurred to the cleanup job, see its related stacktrace and retry it manually.

{{< img src="../img/cockpit-cleanup-state-incident.png" title="Cockpit Cleanup Job Incident" >}}


# Cleanable Data Statistics

You can get more insights on the effectiveness of your configuration by checking statistics about the cleanable process/decision/case instances as well as batch operations. Data are filtered and sorted in a way to only show
the most relevant data to history cleanup first, i.e. the rows with the most finished instances first.

{{< img src="../img/cockpit-cleanup-ttl.png" title="Cockpit History Time To Live Modification in Cleanup Page" >}}

Moreover, it's also possible to modify the history time to live directly from the table for a specific definition version.
 

# Deleted Data Metrics

The metrics in the bottom of the cleanup page give an overview about the cleaned up data. You can select to display the details for the current day, the current week or the current month.