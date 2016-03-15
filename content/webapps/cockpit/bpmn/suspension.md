---

title: 'Suspension'
weight: 70

menu:
  main:
    identifier: "user-guide-cockpit-suspension"
    parent: "user-guide-cockpit-bpmn"
    pre: "Suspend and activate processes and jobs."

---

In the process definition view and in the process instance view you can suspend the selected process definition or process instance by using the {{< glyphicon name="pause" >}} button on the right side.

# Process Definition Suspension

If you suspend the process definition, you prevent the process definition from being instantiated. No further operations can be done while the process definition is in the suspended state. You can simply re-activate the process definition by using the {{< glyphicon name="play" >}} button on the right side. You have the option of suspending/reactivating all process instances of the process definition as well as defining if the process definition (and process instances) should instantly be suspended/reactivated or at a specific time in a confirmation dialog. Find more information about this functionality in the [suspending process definitions]({{< relref "user-guide/process-engine/process-engine-concepts.md#suspending-process-definitions" >}}) section of the process engine chapter.


# Process Instance Suspension

If you suspend the process instance, you can prevent the process instance from being executed any further. This includes suspending all tasks included in the process instance. You can simply re-activate the process instance by using the {{< glyphicon name="play" >}} button on the right side. Find more information about this functionality in the [suspending process instances]({{< relref "user-guide/process-engine/process-engine-concepts.md#suspending-process-instances" >}}) section of the process engine chapter.


# Job Definition Suspension

In the Process Definition View you have the option of suspending a job definition. This can be done by using the {{< glyphicon name="pause" >}} button displayed in the Action column of the Job Definitions tab at the bottom of the screen. By doing this, you can prevent this job definition from being processed in all process instances of the selected process definition. You can simply re-activate the job definition by using the {{< glyphicon name="play" >}} button in the same Action column. Find more information about this functionality in the suspending and [activating job execution]({{< relref "user-guide/process-engine/process-engine-concepts.md#suspending-and-activating-job-execution" >}}) section of the user guide.
