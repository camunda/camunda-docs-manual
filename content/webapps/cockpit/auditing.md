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
{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

Since Cockpit is a very powerful tool, it is often desired to inspect which user performed which operation for auditing purposes. Cockpit operations that change state are logged in Camunda 7's [user operation log]({{< ref "/user-guide/process-engine/history/user-operation-log.md" >}}) that is part of the process engine history. The log allows to understand

* which user performed an operation
* which operation was performed
* when the operation was performed
* which entities (process instances, tasks, etc.) were involved
* which changes were made

To get a more detailed explanation about the Java and REST API methods to get user operations, check out [this url]({{< ref "/user-guide/process-engine/history/user-operation-log.md#accessing-the-user-operation-log" >}}).

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

## Annotating Operation Logs
For each operation, an annotation can be added to provide context. To do this, click on the <button class="btn btn-xs"><i class="glyphicon glyphicon-pencil"></i></button> for the operation you want to annotate. The maximum length of the annotation is limited by your database. The length can be configured in the [Cockpit Configuration]({{<ref "/webapps/cockpit/extend/configuration.md#user-operation-log-annotation-length" >}}).

{{< img src="../img/cockpit-audit-annotation.png" title="Annotation edit" >}}

# User Operation Log per Process
{{< img src="../img/cockpit-user-operation-log.png" title="Batch View Page" >}}

Every Process Instance offers a User Operations table. It displays all User Operation affecting the particular process. The table can be found in both the process definition and instance history views.