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

Unresolved incidents of a process instance or a sub process instance are indicated by Cockpit as failed jobs. To localize which instance of a process failed, Cockpit allows you to drill down to the unresolved incident by using the process status dots. Hit a red status dot of the affected instance in the Process Definition View to get an overview of all incidents. The *Incidents* tab in the [Detailed Information Panel]({{< ref "/webapps/cockpit/bpmn/process-instance-view.md#detailed-information-panel" >}}) lists the failed activities with additional information. Furthermore, you have the possibility of going down to the failing instance of a sub process.


# Retry a Failed Job

On the [process instance view]({{< ref "/webapps/cockpit/bpmn/process-instance-view.md" >}}), you can use the {{< glyphicon name="repeat" >}} button on the right side to resolve a failed job.

A modal dialog opens where you can: 

1. Choose whether the previous due date should be kept or set to an absolute date/time of your choice.
2. Select the failed jobs to be retried.

After clicking on **Retry**, the engine will re-trigger the jobs and increment their retry values in the database so the Job Executor can acquire and execute the jobs again.

{{< img src="../../img/cockpit-instance-job-retry.png" title="Process instance job retry" >}}

Alternatively, you can change the retries of jobs asynchronously via the [Batch Operation]({{< ref "/webapps/cockpit/batch/batch-operation.md" >}}) "Set retries of Jobs belonging to process instances".

# Bulk Retry

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-bulk-retry.png" title="Batch Retry" >}}

You can also perform a synchronous bulk retry of failed jobs. This feature is available in the [process definition view]({{< ref "/webapps/cockpit/bpmn/process-definition-view.md" >}}) in the Job Definitions tab. If you hit this button, you will increment the number of retries for all the defined jobs of the process definition.
