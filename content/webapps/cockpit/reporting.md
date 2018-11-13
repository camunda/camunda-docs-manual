---

title: 'Reports'
weight: 60

menu:
  main:
    name: "Reports"
    identifier: "user-guide-cockpit-reports"
    parent: "user-guide-cockpit"
    pre: "Display statistics and reports."

---

You can use the reports section of cockpit to display custom statistics and reports. Please note that this section is not visible if no report is available. Refer to the [Cockpit Plugins]({{< ref "/webapps/cockpit/extend/plugins.md" >}}) section for adding a custom reporting plugin.


# Instance Duration Report

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../img/duration-report.png" title="Instance Duration Report" >}}

This report shows the average, minimum and maximum duration for a selected process definition and version for a given timeframe. Monthly and quarterly aggregation of the duration times are supported. You can hover over a bar in the bars chart to see the exact values below the chart. You can also switch to the table view to see the exact values for every month or quarter.

Pressing the download buttons above the chart triggers the export of the results in CSV or JSON format. Please note that CSV export is not available in Internet Explorer.
