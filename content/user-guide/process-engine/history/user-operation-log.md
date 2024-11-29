---

title: 'User operation log'
weight: 20

menu:
  main:
    identifier: "user-guide-process-engine-user-operation-log"
    parent: "user-guide-process-engine-history"

---


The user operation log contains entries for many API operations and can be used for auditing purposes. It provides data on what kind of operations are performed as well as details on the changes involved in the operation. Operations are logged when the operation is performed in the context of a logged in user. To use the operation log, the process engine history level must be set to `FULL`.

## Write log entries regardless of user authentication context

If it is desired that operations are logged regardless whether they are performed in the context of a logged in user or not, then the process engine configuration flag named `restrictUserOperationLogToAuthenticatedUsers` can be set to `false`.

## Access the user operation log

The user operation log can be accessed via the Java API. The history service can be used to execute a `UserOperationLogQuery` by calling `historyService.createUserOperationLogQuery().execute()`. The query can be restricted with various filtering options. The query is also {{< restref page="queryUserOperationEntries" text="exposed in the REST API" tag="Historic-User-Operation-Log" >}}.


## User operation log entries

The log consists of *operations* and *entries*. An operation corresponds to one performed action and consists of multiple entries, at least one. Entries contain the detailed changes being part of the operation. When making a user operation log query, the returned entities are of type `UserOperationLogEntry`, corresponding to entries. All entries of one operation are linked by an operation id.

A user operation log entry has the following properties:

* **Operation ID**: A generated id that uniquely identifies a performed operation. Multiple log entries that are part of one operation reference the same operation ID.
* **Operation Type**: The name of the performed operation. Available operation types are listed in the interface {{< javadocref page="org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="org.camunda.bpm.engine.history.UserOperationLogEntry" >}}. Note that one operation can consist of multiple types, for example a cascading API operation is one user operation, but is split into multiple types of operations.
* **Entity Type**: An identifier of the type of the entity that was addressed by the operation. Available entity types are listed in the class {{< javadocref page="org/camunda/bpm/engine/EntityTypes.html" text="org.camunda.bpm.engine.EntityTypes" >}}. Like the operation type, one operation may address more than one type of entity.
* **Category**: The name of the category the operation is associated with. Available categories are listed in the interface {{< javadocref page="org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="org.camunda.bpm.engine.history.UserOperationLogEntry" >}}. For example, all task related runtime operations like claiming and completing tasks fall into the category {{< javadocref page="org/camunda/bpm/engine/history/UserOperationLogEntry.html#CATEGORY_TASK_WORKER" text="TaskWorker" >}}.
* **Annotation**: An arbitrary text annotation set by a user for auditing reasons. Multiple log entries that belong to an operation have the same annotation.
* **Entity IDs**: A job log entry contains the entity IDs that serve to identify the entities addressed by the operation. For example, an operation log entry on a task contains the id of the task as well as the id of the process instance the task belongs to. As a second example, a log entry for suspending all process instances of a process definition does not contain individual process instance IDs but only the process definition ID.
* **User ID**: The ID of the user who performed the operation.
* **Timestamp**: The time at which the operation was performed.
* **Changed Property**: A user operation may change multiple properties. For example, suspension of a process instance changes the suspension state property. A log entry is created for each changed property involved in an operation.
* **Old Property Value**: The previous value of the changed property. A  `null` value either indicates that the property was previously `null` or is not known.
* **New Property Value**: The new value of the changed property.

## Annotation of user operation logs

User Operation Logs are helpful to audit manual operations. To make it obvious why a certain 
operation was performed, sometimes it is not enough to only log technical information (e. g. 
timestamp, operation type, etc.) but also add an annotation that puts the operation in the right 
business context.

You can directly pass an annotation for the following operations:

* [Process Instance Modification][op-log-set-annotation-instance-mod]

You can also set an annotation to an operation log which is already present:

An annotation can be set and cleared via Java API:

```java
String operationId = historyService.createUserOperationLogQuery()
    .singleResult()
    .getOperationId();

String annotation = "Instances restarted due to wrong turn";
historyService.setAnnotationForOperationLogById(operationId, annotation);

historyService.clearAnnotationForOperationLogById(operationId);
```

**Please note:** Annotations are present on all entries that belong to an operation log.

Please also see the REST API reference for {{< restref page="setAnnotationUserOperationLog" text="setting" tag="Historic-User-Operation-Log" >}} and 
{{< restref page="clearAnnotationUserOperationLog" text="clearing" tag="Historic-User-Operation-Log" >}} annotations.

## Glossary of operations logged in the user operation log

The following describes the operations logged in the user operation log and the entries that are created as part of it:

<table class="table table-striped">
  <tr>
    <th>Entity Type</th>
    <th>Operation Type</th>
	<th>Category</th>
    <th>Properties</th>
  </tr>
  <tr>
  <td>Task</td>
    <td>Assign</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who was assigned to the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Claim</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who claimed the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Complete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Create</td>
	<td>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Delegate</td>
	<td>TaskWorker</td>
    <td>
      When delegating a task, three log entries are created, containing one of the following properties:
      <ul>
        <li><strong>delegation</strong>: The resulting delegation state, <code>PENDING</code></li>
        <li><strong>owner</strong>: The original owner of the task</li>
        <li><strong>assignee</strong>: The user this task has been assigned to</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
      <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Resolve</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>delegation</strong>: The resulting delegation state, <code>RESOLVED</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetOwner</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>owner</strong>: The new owner of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>priority</strong>: The new priority of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>TaskWorker</td>
    <td>
      The manually changed property of a task, where manually means that a property got directly changed. Claiming a task via the TaskService wouldn't be logged with an update entry, but setting the assignee directly would be. One of the following is possible:
      <ul>
        <li><strong>description</strong>: The new description of the task</li>
        <li><strong>owner</strong>: The new owner of the task</li>
        <li><strong>assignee</strong>: The new assignee to the task</li>
        <li><strong>dueDate</strong>: The new due date of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of decision instances that were deleted</li>
        <li><strong>async</strong>: by default <code>false</code> since the operation can only be performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ProcessInstance</td>
    <td>Create</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Activate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      In case of regular operation:
      <ul><i>No additional property is logged</i></ul>
      In case of batch operation:
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of process instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion</li>
        <li><strong>type</strong>: <code>history</code> in case of deletion of historic process instances</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>ModifyProcessInstance</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of process instances modified</li>
        <li><strong>async</strong>: <code>true</code> if modification was performed asynchronously as a batch, <code>false</code> if modification was performed synchronously</li>
        <li><strong>processDefinitionVersion</strong>: The version of the process definition</li>
      </ul>
	</td>
  </tr>
  <tr>
    <td></td>
    <td>Suspend</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Migrate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>processDefinitionId</strong>: The id of the process definition that instances are migrated to</li>
        <li><strong>nrOfInstances</strong>: The amount of process instances migrated</li>
        <li><strong>nrOfVariables</strong>: The amount of set variables. Only present when variables were set</li>
        <li><strong>async</strong>: <code>true</code> if migration was performed asynchronously as a batch, <code>false</code> if migration was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>RestartProcessInstance</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of process instances restarted</li>
        <li><strong>async</strong>: <code>true</code> if restart was performed asynchronously as a batch, <code>false</code> if restart was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
  	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of process instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion. This property exists only if the operation was performed asynchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>CreateIncident</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentType</strong>: The type of incident that was created</li>
		<li><strong>configuration</strong>: The configuration of the incident that was created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Resolve</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentId</strong>: The id of the incident that was resolved</li>
      </ul>
    </td>
  </tr> 
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
        <li>
          <strong>hierarchical</strong>: <code>true</code> if the removal time was set across the hiearchy,
          <code>false</code> if the hierarchy was neglected
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetVariables</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of affected instances</li>
        <li><strong>nrOfVariables</strong>: The amount of set variables</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>CorrelateMessage</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of affected instances</li>
        <li><strong>nrOfVariables</strong>: The amount of set variables</li>
        <li><strong>messageName</strong>: The name of the correlated message</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Incident</td>
    <td>SetAnnotation</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentId</strong>: the id of the annotated incident</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>ClearAnnotation</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentId</strong>: the id of the annotated incident</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IdentityLink</td>
    <td>AddUserLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new candidate user associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteUserLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The previously associated user</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>AddGroupLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new group associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteGroupLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
      <li><strong>candidate</strong>: The previously associated group</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Attachment</td>
    <td>AddAttachment</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the added attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteAttachment</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the deleted attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>JobDefinition</td>
    <td>ActivateJobDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>overridingPriority</strong>: the new overriding job priority. Is <code>null</code>, if the priority was cleared.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJobDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ProcessDefinition</td>
    <td>ActivateProcessDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendProcessDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
   <tr>
    <td></td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>DecisionDefinition</td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
        <li><strong>decisionDefinitionId</strong>: the id of the decision definition whose history time to live is updated.</li>
        <li><strong>decisionDefinitionKey</strong>: the key of the decision definition whose history time to live is updated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Evaluate</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>decisionDefinitionId</strong>: the id of the decision definition that was evaluated.</li>
        <li><strong>decisionDefinitionKey</strong>: the key of the decision definition that was evaluated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>CaseDefinition</td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
        <li><strong>caseDefinitionKey</strong>: the key of the case definition whose history time to live is updated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Job</td>
    <td>ActivateJob</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>priority</strong>: the new priority of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetJobRetries</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>retries</strong>: the new number of retries</li>
        <li><strong>nrOfInstances</strong>: the number of jobs that were updated.</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJob</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Execute</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetDueDate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>duedate</strong>: the new due date of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>RecalculateDueDate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>creationDateBased</strong>: if the value is set to <code>true</code>, the new due date was calculated based on the creation date of the job. Otherwise, it was calculated using the date the recalcuation took place.</li>
		<li><strong>duedate</strong>: the new due date of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>CreateHistoryCleanupJobs</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>immediatelyDue</strong>: <code>true</code> if the operation was performed immediately, <code>false</code> if the operation was scheduled regularly</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Variable</td>
    <td>ModifyVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>RemoveVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      In case of single operation:
      <ul>
        <li><strong>name</strong>: the name of the variable whose history was deleted</li>
      </ul>
      In case of list operation by process instance:
      <ul><i>No additional property is logged</i></ul>
    </td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>Create</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>duplicateFilterEnabled</strong>: if the value is set to <code>true</code>, then during the creation of the deployment the given resources have been checked for duplicates in the set of previous deployments. Otherwise, the duplicate filtering has been not executed.</li>
        <li><strong>deployChangedOnly</strong>: this property is only logged when <code>duplicateFilterEnabled</code> is set to <code>true</code>. If the property value is set to <code>true</code> then only changed resources have been deployed. Otherwise, all resources are redeployed if any resource has changed.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Batch</td>
    <td>ActivateBatch</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendBatch</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascadeToHistory</strong>: <code>true</code> if historic data related to the batch job is deleted as well, <code>false</code> if only the runtime data is deleted.</li>
      </ul>
    </td>    
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
      </ul>
    </td>
    </tr>
  <tr>
    <td>ExternalTask</td>
    <td>SetExternalTaskRetries</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>retries</strong>: the new number of retries</li>
        <li><strong>nrOfInstances</strong>: the amount of external tasks that were updated</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>priority</strong>: the new priority</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Unlock</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td>DecisionInstance</td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of decision instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion. This property exists only if operation was performed asynchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
        <li>
          <strong>hierarchical</strong>: <code>true</code> if the removal time was set across the hiearchy,
          <code>false</code> if the hierarchy was neglected
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>CaseInstance</td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of case instances that were deleted. Only present if executed in bulk delete.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Metrics</td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>timestamp</strong>: The date for which all metrics older than that have been deleted. Only present if specified by the user.</li>
        <li><strong>reporter</strong>: The reporter for which all metrics reported by it have been deleted. Only present if specified by the user.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>TaskMetrics</td>
    <td>Delete</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>timestamp</strong>: The date for which all task metrics older than that have been deleted. Only present if specified by the user.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>OperationLog</td>
    <td>SetAnnotation</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>operationId</strong>: the id of the annotated operation log</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>ClearAnnotation</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>operationId</strong>: the id of the annotated operation log</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Filter</td>
    <td>Create</td>
    <td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Comment</td>
    <td>Update</td>
    <td>TaskWorker</td>
    <td>
      <ul>
        <li><i>No additional property is logged</i></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
    <td>TaskWorker</td>
    <td>
      <ul>
        <li><i>No additional property is logged</i></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>User</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Unlock</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been unlocked</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Group</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tenant</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Group membership</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been added to the group</li>
		<li><strong>groupId</strong>: the id of the group that the user has been added to</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been deleted from the group</li>
		<li><strong>groupId</strong>: the id of the group that the user has been deleted from</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>TenantMembership</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that the group or user was associated with</li>
		<li><strong>userId</strong>: the id of the user that has been associated with the tenant. Is not present if the <code>groupId</code> is set</li>
		<li><strong>groupId</strong>: the id of the group that has been associated with the tenant. Is not present if the <code>userId</code> is set</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that the group or user has been deleted from</li>
		<li><strong>userId</strong>: the id of the user that has been deleted from the tenant. Is not present if the <code>groupId</code> is set</li>
		<li><strong>groupId</strong>: the id of the group that has been deleted from the tenant. Is not present if the <code>userId</code> is set</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Property</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was deleted</li>
      </ul>
    </td>
  </tr>
</table>


[op-log-set-annotation-instance-mod]: {{< ref "/user-guide/process-engine/process-instance-modification.md#annotation" >}}