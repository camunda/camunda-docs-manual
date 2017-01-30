---

title: 'Failed Jobs'
weight: 60

menu:
  main:
    identifier: "user-guide-cockpit-failed-jobs"
    parent: "user-guide-cockpit-bpmn"
    pre: "Find and operate on failed Jobs."

---


{{< img src="../../img/cockpit-failed-job-drill-down.png" title="Failed Job Drill Down" >}}

Unresolved incidents of a process instance or a sub process instance are indicated by Cockpit as failed jobs. To localize which instance of a process failed, Cockpit allows you to drill down to the unresolved incident by using the process status dots. Hit a red status dot of the affected instance in the Process Definition View to get an overview of all incidents. The *Incidents* tab in the [Detailed Information Panel]({{< relref "webapps/cockpit/bpmn/process-instance-view.md#detailed-information-panel" >}}) lists the failed activities with additional information. Furthermore, you have the possibility of going down to the failing instance of a sub process.


# Retry a Failed Job

To resolve a failed job you can use the {{< glyphicon name="repeat" >}} button on the right side. Select the corresponding instance in the confirmation dialog so the engine will re-trigger this job and increment its retry value in the database.


# Batch Retry

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-bulk-retry.png" title="Batch Retry" >}}

You can also perform a batch retry of failed jobs. This feature is available in the [process definition view]({{< relref "webapps/cockpit/bpmn/process-definition-view.md" >}}) in the Job Definitions tab. If you hit this button, you will increment the number of retries for all of the defined jobs of the process definition.
