---

title: 'Auditing'
weight: 50

menu:
  main:
    identifier: "user-guide-admin-auditing"
    parent: "user-guide-admin"

---
{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

It is often desired to inspect which user performed which operation for auditing purposes. Admin operations are logged in the [user operation log]({{< ref "/user-guide/process-engine/history/user-operation-log.md" >}}) that is part of the process engine's history. The log allows to understand

* which operation was performed
* which user performed an operation
* when the operation was performed
* which entities (process instances, tasks, etc.) were involved
* which changes were made

Please see the [complete table]({{< ref "/user-guide/process-engine/history/user-operation-log.md#accessing-the-user-operation-log" >}}) of APIs that produce User Operation Logs.

# Operation Log in Admin
{{< img src="../img/admin-system-audit.png" title="Operation Log" >}}

Admin provides the possibility to audit the activities which each user performs. You can find the Operation Log in the `System` submenu. The table is a representation of the history of various user operations, and it provides information about changes performed in the past. The rows are grouped by an operation to provide clear insights on the changes produced by each operation. Results can be filtered using the search bar at the top. You can add columns using the dropdown in the top right. They can be removed by clicking the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> next to the corresponding table header.

## Operations by a specific User
To only display Operations performed by a specific User, click in the Search field and select `User ID` from the dropdown and enter the ID of the desired user. The user ID can be copied from a log entry by hovering over the Name and clicking on the clipboard Icon.

## Operations in a specific Timespan
You can filter the results by a timespan in which the operation occurred. Click in the Search field and select `Timestamp` from the dropdown. By clicking on the operator, you can select if you want to see results `before` or `after` the specified time.

## Operations of a specific Entity
If you are only interested in operations concerning Authorizations, you can use the `Entity Type` filter. For a complete list of logged operations, check out [History and Audit Event Log](/user-guide/process-engine/history/#glossary-of-operations-logged-in-the-user-operation-log).
{{< img src="../img/admin-audit-entity.png" title="Filter by Type" >}}
