---

title: 'Auditing of Cockpit Operations'
weight: 45

menu:
  main:
    identifier: "user-guide-cockpit-operations"
    parent: "user-guide-cockpit"
    name: "Auditing"
    pre: "Audit operations performed in Cockpit"

---


Since Cockpit is a very powerful tool, it is often desired to inspect which user performed which operation for auditing purposes. Cockpit operations that change state are logged in the BPM platform's [user operation log]({{< ref "/user-guide/process-engine/history.md#user-operation-log" >}}) that is part of the process engine history. The log allows to understand

* which user performed an operation
* which operation was performed
* when the operation was performed
* which entities (process instances, tasks, etc.) were involved
* which changes were made

To get a more detailed explanation about the Java and REST API methods to get user operations, check out [this url]({{< ref "/user-guide/process-engine/history.md#accessing-the-user-operation-log" >}}).

# Operation Log in Cockpit
{{< img src="../img/cockpit-operation-log.png" title="Operation Log" >}}

Cockpit provides the possibility to audit the activities which each user performs. You can find the Operation Log in the top menu bar under the `more` option. The table is a representation of the history of various user operations, and it provides information about changes performed in the past. The rows are grouped by an operation to provide clear insights on the changes produced by each operation. Results can be filtered using the search bar at the top. You can add columns using the dropdown in the top right. They can be removed by clicking the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> next to the corresponding table header.

## Operations by a specific User
To only display Operations performed by a specific User, click in the Search field and select `User ID` from the dropdown and enter the ID of the desired user. The user ID can be copied from a log entry by hovering over the name and clicking on the clipboard Icon.

## Operations in a specific Timespan
You can limit Results the time the operation occurred. Click in the Search field and select `Timestamp` from the dropdown. You can now specify the date and time at which you want to cut off results. By clicking on the operator, you can select if you want results `before` or `after` the specified time. Add another `Timestamp` filter to specify a period.
{{< img src="../img/cockpit-audit-timestamp.png" title="Filter by Timestamp" >}}

## Operations of a specific Type
If you are only interested in a specific operation, for example, every time a process instance was manually modified, you can use the `operation` filter. Select the desired operation from the dropdown or start to type the name to filter through the list. For a complete list of logged operations, check out [History and Audit Event Log](/user-guide/process-engine/history/#glossary-of-operations-logged-in-the-user-operation-log).
{{< img src="../img/cockpit-audit-type.png" title="Filter by Type" >}}

# User Operation Log per Process
{{< img src="../img/cockpit-user-operation-log.png" title="Batch View Page" >}}

Every Process Instance offers a User Operations table. It displays all User Operation affecting the particular process. The table can be found in both the process definition and instance history views.

# Cockpit Operation Log Entries

The following table serves as an index that relates operations in the Cockpit user interface to operations in the user operation log. Whenever a listed operation is performed in Cockpit, entries for the corresponding user operations are created in the user operation log. The following list relates UI operations to the operation and entity types in the operation log. See the [user operation log documentation]({{< ref "/user-guide/process-engine/history.md#glossary-of-operations-logged-in-the-user-operation-log" >}}) for details on these types.

<table class="table table-striped">
  <tr>
    <th>UI Operation</th>
    <th>Operation Type</th>
    <th>Entity Type</th>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#process-definition-suspension" >}}">Activate a Process Definition</a></td>
    <td>ActivateProcessDefinition</td>
    <td>ProcessDefinition</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#process-definition-suspension" >}}">Suspend a Process Definition</a></td>
    <td>SuspendProcessDefinition</td>
    <td>ProcessDefinition</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#process-instance-suspension" >}}">Activate a Process Instance</a></td>
    <td>Activate</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#process-instance-suspension" >}}">Suspend a Process Instance</a></td>
    <td>Suspend</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#job-definition-suspension" >}}">Activate a Job Definition</a></td>
    <td>ActivateJobDefinition</td>
    <td>JobDefinition</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/suspension.md#job-definition-suspension" >}}">Suspend a Job Definition</a></td>
    <td>SuspendJobDefinition</td>
    <td>JobDefinition</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/process-instance-view.md#cancel-a-process-instance" >}}">Cancel a Process Instance</a></td>
    <td>Delete</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/process-definition-view.md#cancel-multiple-process-instances" >}}">Cancel Multiple Process Instances</a></td>
    <td>Delete</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/process-instance-view.md#adding-variables" >}}">Add Process Instance Variables</a></td>
    <td>SetVariable</td>
    <td>Variable</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/process-instance-view.md#editing-variables" >}}">Edit Process Instance Variables</a></td>
    <td>ModifyVariable</td>
    <td>Variable</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/failed-jobs.md#retry-a-failed-job" >}}">Retry a Failed Job</a></td>
    <td>SetJobRetries</td>
    <td>Job</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/failed-jobs.md#batch-retry" >}}">Batch Retry of Failed Jobs</a></td>
    <td>SetJobRetries</td>
    <td>Job</td>
  </tr>
  <tr>
    <td><a href="{{< ref "/webapps/cockpit/bpmn/process-instance-modification.md" >}}">Process Instance Modification</a></td>
    <td>ModifyProcessInstance</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td>Set Task Assignee</td>
    <td>Assign</td>
    <td>Task</td>
  </tr>
  <tr>
    <td>Add Task Candidate Group</td>
    <td>AddGroupLink</td>
    <td>IdentityLink</td>
  </tr>
  <tr>
    <td>Remove Task Candidate Group</td>
    <td>DeleteGroupLink</td>
    <td>IdentityLink</td>
  </tr>
</table>
