---

title: 'Dashboard'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-bpmn-dashboard"
    parent: "user-guide-cockpit-bpmn"
    pre: "Entry point for processes monitoring."
    name: "Dashboard"

---

The processes dashboard of Cockpit is the entry point for process monitoring. It comes with a pre-installed plugin, which lets you see deployed process definitions. Additional [plugins]({{< ref "/webapps/cockpit/extend/plugins.md" >}}) can be added to the processes dashboard.


# Deployed Processes

{{< img src="../../img/cockpit-process-definition-state.png" title="Deployed Processes" >}}

With this plugin you can easily observe the state of a process definition. Green and red dots signalize running and [failed jobs][failed-jobs]. At this observing level a red dot signifies that there is at least one process instance or a sub process instance which has an unresolved incident. You can localize the problem by using the [process definition view][process-definition-view].

{{< img src="../../img/cockpit-deployed-processes-search.png" title="cockpit Search" >}}

With the search component above the table, you can search for deployed processes by their name or key.
To do so, click in the search box and select the property.
Both of these search properties support the 'like' operator, which allows searching for process definitions where the entered value is a substring of the property value.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on
the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can
save search queries to your local browser storage by clicking on
the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and
inserting a name in the drop-down menu that appears. You can then retrieve the search query by
clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button>
button and selecting the chosen name in the drop-down menu.

{{< img src="../../img/cockpit-deployed-processes.png" title="Rendered Process Preview" >}}

You can also switch to the preview tab which displays the rendered process model of each deployed process. Additionally, you get information about how many instances of the process are currently running and about the process state. Green and red dots signalize running and [failed jobs][failed-jobs]. Click on the model to go to the [process definition view][process-definition-view].

[process-definition-view]: {{< ref "/webapps/cockpit/bpmn/process-definition-view.md" >}}
[failed-jobs]: {{< ref "/webapps/cockpit/bpmn/failed-jobs.md" >}}

# Process Instances Search

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-search.png" title="cockpit Search" >}}

At the top of the dashboard, you can search for process instances and incidents which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g., 'like', which allows searching for process instances where the entered value is a substring of the property value. To search for process variables, you also have to enter the variable name you want to search for. You can search for variable values with the type `String`, `Number`, or `Boolean`. To search for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g., `'93288'` or `'NULL'`). You can combine multiple search pills to narrow down the search results.

To add additional columns to the details of the search results, click on the 'Add column' button and select the desired details in the drop down menu that appears.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

You can always either search for process instances or for incidents. When you add a parameter for an incident search, you can not add a second parameter which would search for a process instance and vice versa.

You can perform batch operation on process instances matching search criteria by clicking "Batch operation" button.

{{< note title="Heads-up!" class="info" >}}
  The process instance search operates on the history endpoint of the engine. In case the requested historic data is not persisted to the database, then the search does not deliver the desired results.
{{< /note >}}

## CSV Export for Process Instances

Sometimes incidents make it necessary for the Operations Engineer to intervene manually. However, these incidents might
not always be solvable from Cockpit if other services or systems are involved. For this case, Cockpit provides a feature
to export affected process instances and their process variable values as CSV spreadsheets. The export feature helps to
communicate efficiently with other system owners.

{{< img src="../../img/cockpit-export.png" title="CSV Export for Process Instances" >}}

To trigger the CSV export, search for process instances and customize what properties you want to export by adding or removing columns. Suppose you are only interested in selecting
specific process instances; you can checkmark the process instances of interest on the left side or select the whole page by checkmarking
the box on the left side in the table header. You can select process instances across multiple pages. In the next step, you can choose a more coarse-grained process instance selection approach.

When you are satisfied with your configuration of columns, query criteria, and selection of process instances, click <button class="btn btn-xs"><i class="glyphicon glyphicon-save"></i></button>.

{{< img src="../../img/cockpit-export-modal-dialog.png" title="CSV Export for Process Instances: Modal Dialog" >}}

Clicking the button opens a modal dialog. You can define if you want to export your previous selection of process instances,
the currently displayed page, or all pages.

Additionally, you can specify process variables by name to enrich the export result with the values of these variables.

{{< note title="Heads-up!" class="info" >}}
* Exporting all pages is more inefficient than exporting a selection or a single page of process instances and can cause extra load on the database and application server. Also, a more complex query that runs against an unbounded number of rows affects the execution time negatively.
* For security reasons, you can limit the maximum number of process instances that can be exported via the [Query Maximum Results Limit]({{< ref "/user-guide/process-engine/process-engine-api.md#query-maximum-results-limit" >}}).
{{< /note >}}

When clicking **Export CSV**, the backend crunches the requested data and creates a CSV file. This could take a while, depending on the amounts of process instances you want to export.

{{< img src="../../img/cockpit-export-download-as-csv.png" title="CSV Export for Process Instances: Modal Dialog – Download as CSV" >}}

As soon as the request succeeds, you should see a notification that the CSV creation was successful, and the button changes to **Download as CSV**. When you click the button, the download of the CSV file starts.

### Export Result

The format of the export result is a file of [Comma-separated values (CSV)](https://en.wikipedia.org/wiki/Comma-separated_values) (opens an external link to Wikipedia).

#### Structure of the Spreadsheet

* Each row in the spreadsheet represents a process instance, while each property has its dedicated column.
* The spreadsheet has a dedicated column for each variable property and displays its value in the respective row that matches with the process instance.
* The spreadsheet displays:
  * A `null` value as `<<NULL>>`
  * An unsupported variable value type as `<<UNSUPPORTED TYPE>>`
  * A non-existing variable as empty cell.

#### Example

{{< img src="../../img/cockpit-export-result.png" title="CSV Export for Process Instances: Export Result" >}}

### Limitations

* You can only export variables with the following value types:
  * `boolean`
  * `string`
  * `date`
  * `double`, `integer`, `long`, `short` (number types)
* You can only export the value property of a variable.

## Copy the IDs of selected Process Instances

Sometimes incidents make it necessary for the Operations Engineer to intervene manually. To make it easier to work with a subset of Process Instances it is possible to copy the IDs of the selected Process Instances using the `Copy selected Process Instances IDs` button:

{{< img src="../../img/cockpit-copy-process-instance-ids.png" title="Copy selected IDs button" >}}

The selected Process Instance IDs then can be used for example to filter process instances using the [`IN` filter operator](##in-operator) or the [`Not In` filter operator](#not-in-operator).

## `IN` operator

{{< img src="../../img/cockpit-in-operator.png" title="IN Operator" >}}

Cockpit provides `IN` operator support when filtering for process instances for the following query criteria:

* Process instance ID
* Business key
* Process definition key
* Variable value

By default, the criteria defined in the search are linked together with a logical `AND` ([conjunctive normal form](https://en.wikipedia.org/wiki/Conjunctive_normal_form)).
Occasionally, you may search for multiple query criterion values. The `IN` operator allows searching for multiple values where any of the values match.

To use the `IN` operator, select a query criterion that supports the `IN` operator, and provide the values as a comma-separated list. To adjust the comma-separated list of values,
start editing by clicking on the value. You can expand the value in a modal dialog for easier editing by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button.

{{< img src="../../img/cockpit-in-operator-modal.png" title="IN Operator Modal" >}}

## `NOT IN` operator

{{< img src="../../img/cockpit-not-in-operator.png" title="NOT IN Operator" >}}
Cockpit provides `NOT IN` operator support when filtering for process instances for the following query criteria:

* Process instance ID
* Process definition key

Use the `NOT IN` operator to exclude any results matching one of the specified values.  

By default, all search criteria are combined with a logical `AND` ([conjunctive normal form](https://en.wikipedia.org/wiki/Conjunctive_normal_form)). If you need to exclude multiple values, select a criterion that supports the `NOT IN` operator and provide them as a comma-separated list. To edit the list, click the value. For more extensive editing, click the 
<button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button>
button to open a modal dialog.

{{< img src="../../img/cockpit-edit-not-in-criterion-modal.png" title="IN Operator Modal" >}}

# Delete process definitions

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-delete-process-definition.png" title="Delete Process Definition" >}}

Each process definition in the dashboard has a delete action. This action allows to delete all versions of a process definition.
When proceeding with this action, you can always choose to enable/disable skipping custom listeners. However, if the process definition has process instances running, enabling the cascading flag becomes mandatory.

