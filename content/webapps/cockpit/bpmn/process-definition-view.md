---

title: 'Process Definition View'
weight: 20

menu:
  main:
    identifier: "user-guide-cockpit-pd-view"
    parent: "user-guide-cockpit-bpmn"
    pre: "Gain an aggregated overview over all instances of a given process definition and perform batch operations."

---

{{< img src="../../img/cockpit-process-definitions-view.png" title="Process Definition View" >}}

The process definition view provides you with information about the definition and the status of a process. On the left side you can easily survey the versions of the process and how many instances of the versions are running. Incidents of all running process instances are displayed together with an instance counter label in the corresponding rendered diagram. So it is easy to locate [failed activities][failed-activities] in the process. Use the mouse to navigate through the diagram. By pressing the CTRL key while turning the mouse wheel you can zoom in and out. Hold the left mouse button to pan the diagram in the desired direction. Furthermore, you can maximize the diagram view or the detailed information panel by clicking on, respectively, the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button or the <button class="btn btn-xs"><i class="glyphicon glyphicon-menu-up"></i></button> button, at the bottom left of the diagram view.

In the `Process Instances` tab all running instances are listed in a tabular view. Besides information about start time, business key and state you can select an instance by ID and go down to the [process instance view][process-instance-view].

The `Called Process Definitions` tab displays the called child processes. 
You can learn more about navigating called process definitions and this tab in the section about [Call Activity Navigation][call-activity-navigation]. 
In the column *Called Process Definition* the names of the called sub processes are listed. 
Click on the name to display the process in the process definition view. 
Please note that a filter called Parent is automatically set for the process so that you only see the instances that belong to the parent process. 
In the *Activity* column you can select the instance that is calling the child process.

The `Job Definitions` tab displays the job definitions that are linked to this process definition. Observe the name of the activity, the type of job, the configuration and the state thereof. You can also suspend and re-activate the job definition (see [Job Definition Suspension][job-definition-suspension] for more information). It is also possible to [set the priority of jobs]({{< ref "/webapps/cockpit/bpmn/process-definition-view.md#set-job-priority">}}).

[call-activity-navigation]: {{< ref "/webapps/cockpit/bpmn/process-definition-view.md#call-activity-navigation" >}}
[failed-activities]: {{< ref "/webapps/cockpit/bpmn/failed-jobs.md" >}}
[process-instance-view]: {{< ref "/webapps/cockpit/bpmn/process-instance-view.md" >}}
[job-definition-suspension]: {{< ref "/webapps/cockpit/bpmn/suspension.md#job-definition-suspension" >}}


# Filter

The filter function on the bottom of the Process Definition View in the `Process Instances` tab allows you to find certain instances by filtering for variables, business keys, activity IDs or date and time. In addition, you can filter for the process definition version by selecting the version of a process on the left side of the Process Definition View. Beyond that you can combine different filters as logical *AND* relation. Filter expressions on variables must be specified as `variableName OPERATOR value` where the *operator* may be one of the following terms: `=`, `!=`, `>`, `>=`, `<`, `<=`, `like`. Apart from the `like` operator, the operator expressions do not have to be separated by spaces.
The `like` operator is for string variables only. You can use `%` as wildcard in the *value* expression. String and date values must be properly enclosed in quotes `" "`.

{{< note title="Complex Data Types" class="info" >}}
  Please be aware that this feature does not support complex data types.
{{< /note >}}

Furthermore, you can copy a link to the current filter query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save filter queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the filter query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

## Runtime View

{{< img src="../../img/filter-examples/add-filter.png" title="Filter Example" >}}

Add a filter to the process definition view. Select a filter for variables, the start date and time, activity ID or the business key of process instances.


**Business Key**

{{< img src="../../img/filter-examples/business-key.png" title="Filter Example" >}}

Add a filter for process instances by business key.


**Start Date and Time**

{{< img src="../../img/filter-examples/start-date.png" title="Filter Example" >}}

Add a filter for process instances by start date. Please note that the date must be set in accordance to the [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) standard.

{{< img src="../../img/filter-examples/start-date-before-after.png" title="Filter Example" >}}

Choose between `before` and `after` to filter for instances that were started before or after the given date. For example, click on `before` to obtain the selection.


**String variable**

{{< img src="../../img/filter-examples/var-string.png" title="Filter Example" >}}

Add a filter for process instances by filtering for a `string` value. Please note that you should **not** encase the value in quotation marks.


**Boolean variable**

{{< img src="../../img/filter-examples/var-boolean.png" title="Filter Example" >}}

Add a filter for process instances by filtering for a `boolean` value.


**Numeric variable**

{{< img src="../../img/filter-examples/var-numeric.png" title="Filter Example" >}}

Add a filter for process instances by filtering for a `numeric` (double, integer, long or short) value.


## History View

Add a filter to the [process definition history view][process-definition-history-view]. Select filters for variables, the start date and time, the activity ID or the business key of process instances as in [the runtime view](#runtime-view). In addition, select filters for completed, running or process instances with a certain end date and time.

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

**Filtering for completed and running process instances**

{{< img src="../../img/filter-examples/history-completed.png" title="Filter Example" >}}
{{< img src="../../img/filter-examples/history-running.png" title="Filter Example" >}}

Add a filter for process instances by filtering for already completed or still running process instances.


**End Date and Time**

{{< img src="../../img/filter-examples/history-end-date.png" title="Filter Example" >}}

Add a filter for process instances by end date. Please note that the date must be set in accordance to the [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) standard and that this option is only available in the [process definition history view][process-definition-history-view]. Again choose between `before` and `after` to filter for instances that were ended before or after the given date. For example, click on `before` to obtain the selection..


[process-definition-history-view]: {{< ref "/webapps/cockpit/bpmn/process-history-views.md#process-definition-history-view" >}}


# Delete Multiple Running Process Instances

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-bulk-delete.png" title="Batch Delete Running Process Instances" >}}

Delete multiple running process instances at once by using this feature. In the process definition view, hit the {{< glyphicon name="remove-circle" >}} button on the right side. This opens a confirmation screen in which you can select which process instances to delete. You can apply [filters](#filter) to make it easier to find the desired process instances. In addition, it is possible to provide a reason for the delete. After you have selected which instances to delete and confirmed the delete, the runtime data of the deleted instances will be removed.

# Delete A Process Definition Version

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

Delete the current process definition version by using this feature. In the process definition view, hit the {{< glyphicon name="trash" >}} button on the right side. This opens a confirmation screen in which you can select flags to apply to the delete. You can always choose to enable/disable skipping custom listeners. However, if the process definition version has process instances running, enabling the cascading flag becomes mandatory.

# BPMN Documentation

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-documentation.png" title="Set Job Priority" >}}

This feature allows you to inspect documentation added in the Camunda Modeler. To do so, open the Documentation tab. Elements with a documentation are indicated with a {{< glyphicon name="info-sign" >}} in the diagram. The documentation table lists all documented elements. Click on a table row to highlight the element in the diagram.

To view long documentations, click on the {{< glyphicon name="info-sign" >}} on the element or the documentation link in the table. This opens a modal which displays the formated documentation in a textbox. To copy the documentation to the clipboard, click on {{< glyphicon name="copy" >}} button.

# Set Job priority

{{< img src="../../img/cockpit-set-job-priority.png" title="Set Job Priority" >}}

You can change the job priority by overriding the priority specified in the BPMN 2.0 XML. To do so, click on the {{< glyphicon name="cog">}} icon in the `Job Definitions` tab. In the opened dialog you can override the job priority. If an overridden priority is already set, you can clear it to use the priority specified in the XML again. It is also possible to include existing jobs when changing the priority.

By using the {{< glyphicon name="cog">}} button to the right of the process diagram, you can set the job priority of all jobs contained in the process definition at once.

# Call Activity Navigation

You can navigate from a process that contains Call Activities to its respectively called process definitions. 
Hover over a Call Activity in the BPMN diagram to display a link in the upper right corner of the Call Activity.

{{< note title="Limitation" class="info" >}}
When a to be called process is referenced via a process variable or an expression, the called process 
can only be determined at runtime. For these types of call activities, the diagram shows a greyed out overlay, unless
there is currently a process instance running at that call activity.
{{< /note >}}

Additionally, you can use the called process definitions tab to get an overview of which call activity 
calls which process definition.
We differentiate between three states:

  * *Referenced*: the called process definition can be derived without any runtime information.
  * *Running and referenced*: the called process definition can be derived without any runtime 
information and a call activity in this process is currently calling it.
  * *Running*: There is currently a process instance calling this process definition. 
However, the called process definition can only be resolved at runtime and is only valid for a particular process instance.

{{< img src="../../img/cockpit-call-activity-definition-navigation.png" title="Navigate to called processes definition" >}}

For more drill down options on call activities you can check out the [process instance view][process-instance-view] 
and the [process history views][process-history-views].


[process-history-views]: {{< ref "/webapps/cockpit/bpmn/process-history-views.md" >}}