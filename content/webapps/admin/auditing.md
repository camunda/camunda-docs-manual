Since Admin manages who has access the information in the processes, it is often desired to inspect which user performed which operation for auditing purposes. Admin operations that change Authorization are logged in the BPM platform's [user operation log]({{< ref "/user-guide/process-engine/history.md#user-operation-log" >}}) that is part of the process engine history. The log allows to understand

* which user performed an operation
* which operation was performed
* when the operation was performed
* which entities (process instances, tasks, etc.) were involved
* which changes were made

To get a more detailed explanation about the Java and REST API methods to get user operations, check out [this url]({{< ref "/user-guide/process-engine/history.md#accessing-the-user-operation-log" >}}).

# Operation Log in Admin
{{< img src="../img/admin-system-audit.png" title="Operation Log" >}}

Admin provides the possibility to audit the activities which each user performs. You can find the Operation Log in the `System` submenu. The table is a representation of the history of various user operations, and it provides information about changes performed in the past. The rows are grouped by an operation to provide clear insights on the changes produced by each operation. Results can be filtered using the search bar at the top. You can add columns using the dropdown in the top right. They can be removed by clicking the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> next to the corresponding table header.

## Operations by a specific User
To only display Operations performed by a specific User, click in the Search field and select `User ID` from the dropdown and enter the ID of the desired user. The user ID can be copied from a log entry by hovering over the Name and clicking on the clipboard Icon.

## Operations in a specific Timespan
You can limit Results the time the operation occurred. Click in the Search field and select `Timestamp` from the dropdown. You can now specify the date and time at which you want to cut off results. By clicking on the operator, you can select if you want to see results `before` or `after` the specified time. Add another `Timestamp` filter to define a period.

## Operations of a specific Entity
If you are only interested in operations concerning Authorizations, you can use the `Entity Type` filter. For a complete list of logged operations, check out [History and Audit Event Log](/user-guide/process-engine/history/#glossary-of-operations-logged-in-the-user-operation-log).
{{< img src="../img/admin-audit-entity.png" title="Filter by Type" >}}
