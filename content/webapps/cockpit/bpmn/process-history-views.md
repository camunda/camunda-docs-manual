---

title: 'History in Cockpit'
weight: 40

menu:
  main:
    identifier: "user-guide-cockpit-history-view"
    parent: "user-guide-cockpit-bpmn"
    name: "History"
    pre: "Audit ended process instances."

---


{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

At the top left of the process definition view and the process instance view, you can hit the _History_ button to access the history view.


# Process Definition History View

{{< img src="../../img/cockpit-history-view-process-definition-history.png" title="Process Definition History" >}}

In the history view of the process definition you see an overview of all of the running and completed process instances. On the bottom of the screen, a [filter][process-definition-view-filter] can be applied and you have the option of selecting to only see process instances in a specific state. Running and completed instances can be selected.

At the bottom of the screen you can also select the _Job Log_ tab to see all job related events of this process instance, including state, time, the corresponding activity and job ID, the type, configuration and message. You can also access the stacktrace of a failed job.

## Heatmap

{{< img src="../../img/cockpit-heatmap.png" title="Process Definition Heatmap" >}}

The history view of a process definition contains a `Heat` button in the top-right corner of the process diagram. Clicking this button activates the heatmap view. In this view, a heatmap is overlayed on the BPMN diagram showing which nodes and sequence flows have the most activity. Activity is measured by the number of tokens which have been processed by the node or sequence flow.

It is still possible to interact with the diagram while the heatmap is shown (e.g., to select activities).


# Process Instance History View

{{< img src="../../img/cockpit-history-view-process-instance-history.png" title="Process Instance History" >}}

In the history view of the process instance you see instance-specific information. On the left side of the screen, a [filter][process-definition-view-filter] can be applied and you have the option of selecting to only see process instances in specific states. Running, completed and canceled process instances can be viewed as well as task-specific activity states.

You can access various information regarding the specific instance by selecting the applicable tab at the bottom of the screen:

**Audit Log**
In the Audit Log you can find a detailed overview of the activities that took place within the process instance, including start time, end time, activity instance ID and the current state.

**Variables**
In the Variables tab you can see an overview of the variables used within the process instances, including the name, last value, variable type, scope as well as a variable log, which shows the changes of the selected variable over time.

**Called Process Instances**
In the Called Process Instances tab you can find an overview of other process instances which were called by this specific process instance. You can see the name of the called process instances, the process definitions and the activity.

**Executed Decision Instances**
In the Executed Decision Instances tab you can find an overview of all decision instances which were evaluated in this process instance. You can filter the listing by selecting business rule tasks. It then only shows decisions of the currently selected task. Clicking on the id of the decision instance will take you to the decision instance view page of this instance. Clicking on the decision definition key will take you to the decision definition page of the definition for this decision instance.

**Incidents**
In the Incidents tab you can find a listing of all incidents related to this process instance and the details thereof. This includes the message type, the time the incident was created, the end time, the actual activity, the cause process instance ID, the root cause process instance ID, the incident type and the current state.

**User Tasks**
In the User Tasks tab you can find an overview of all the user tasks related to this process instance and the details of the specific user tasks, such as the activity, the assignee, owner, creation date, completion date, the duration, due date, follow up date, the priority of the user task and the unique task ID. You can also see the user task log for each specific user task.

**Job Log**
In the Job Log tab you can find an overview of all job related events of this process instance and the details of the specific jobs, such as state, time, the corresponding activity and job ID, the type, configuration and message. You can also access the stacktrace of a failed job.


[process-definition-view-filter]: {{< relref "webapps/cockpit/bpmn/process-definition-view.md#filter" >}}
