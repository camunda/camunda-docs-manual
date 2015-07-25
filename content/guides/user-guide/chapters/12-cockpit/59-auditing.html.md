---

title: 'Auditing of Cockpit Operations'
category: 'Cockpit'

---

Since Cockpit is a very powerful tool, it is often desired to inspect which user performed which operation for auditing purposes. Cockpit operations that change state are logged in the BPM platform's [user operation log](ref:#process-engine-history-and-audit-event-log-user-operation-log) that is part of the process engine history. The log allows to understand

* which user performed an operation
* which operation was performed
* when the operation was performed
* which entities (process instances, tasks, etc.) were involved
* which changes were made

While this log can currently not be viewed in Cockpit's UI, there exist [Java and REST API methods](ref:#process-engine-history-and-audit-event-log-accessing-the-user-operation-log) to perform this task.

## Cockpit Operation Log Entries

The following table serves as an index that relates operations in the Cockpit user interface to operations in the user operation log. Whenever a listed operation is performed in Cockpit, entries for the corresponding user operations are created in the user operation log. The following list relates UI operations to the operation and entity types in the operation log. See the [user operation log documentation](ref:#process-engine-history-and-audit-event-log-glossary-of-operations-logged-in-the-user-operation-log) for details on these types.

<table class="table table-striped">
  <tr>
    <th>UI Operation</th>
    <th>Operation Type</th>
    <th>Entity Type</th>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-process-definition-suspension">Activate a Process Definition</a></td>
    <td>ActivateProcessDefinition</td>
    <td>ProcessDefinition</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-process-definition-suspension">Suspend a Process Definition</a></td>
    <td>SuspendProcessDefinition</td>
    <td>ProcessDefinition</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-process-instance-suspension">Activate a Process Instance</a></td>
    <td>Activate</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-process-instance-suspension">Suspend a Process Instance</a></td>
    <td>Suspend</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-job-definition-suspension">Activate a Job Definition</a></td>
    <td>ActivateJobDefinition</td>
    <td>JobDefinition</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-suspension-job-definition-suspension">Suspend a Job Definition</a></td>
    <td>SuspendJobDefinition</td>
    <td>JobDefinition</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-process-instance-detail-view-cancel-a-process-instance">Cancel a Process Instance</a></td>
    <td>Delete</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-process-definition-view-cancel-multiple-process-instances">Cancel Multiple Process Instances</a></td>
    <td>Delete</td>
    <td>ProcessInstance</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-process-instance-detail-view-adding-variables">Add Process Instance Variables</a></td>
    <td>SetVariable</td>
    <td>Variable</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-process-instance-detail-view-editing-variables">Edit Process Instance Variables</a></td>
    <td>ModifyVariable</td>
    <td>Variable</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-failed-jobs-retry-a-failed-job">Retry a Failed Job</a></td>
    <td>SetJobRetries</td>
    <td>Job</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-failed-jobs-bulk-retry">Bulk Retry of Failed Jobs</a></td>
    <td>SetJobRetries</td>
    <td>Job</td>
  </tr>
  <tr>
    <td><a href="ref:#cockpit-process-instance-modification">Process Instance Modification</a></td>
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

