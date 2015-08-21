---

title: 'Process Instance View'
weight: 30

menu:
  main:
    identifier: "user-guide-cockpit-pi-view"
    parent: "user-guide-cockpit"

---

{{< img src="../img/cockpit-process-instances-view.png" title="Process Instance View" >}}

Open the Process Instance View by selecting a process instance from the [Process Definition View][process-definition-view] instance list. This view allows you to drill down into a single process instance and explore its running activities as well as the variables, tasks, jobs, etc.
Beside the diagram view the process will be displayed as an [Activity Instance Tree View]({{< relref "#activity-instance-tree" >}}). Variables that belong to the instance will be listed in a variables table of the [Detailed Information Panel]({{< relref "#detailed-information-panel" >}}). Now you can select single or multiple ('ctrl + click') flow nodes in the interactive BPMN 2.0 diagram or you can select an activity instance within the activity tree view. As diagram, tree view and variables table correspond with each other the selected flow node will also be selected in the tree and the associated variables will be shown and vice versa.

[process-definition-view]: {{< relref "user-guide/cockpit/process-definition-view.md" >}}


# Activity Instance Tree

{{< img src="../img/cockpit-activity-instance-tree-view.png" title="Activity Instance Tree" >}}

The activity instance tree contains a node for each activity that is currently active in the process instance. It allows you to select activity instances to explore their details. Concurrently the selected instance will be marked in the rendered process diagram and the corresponding variables will be listed in the Detailed Information Panel.


# Detailed Information Panel

{{< img src="../img/cockpit-detailed-information-view.png" title="Detailed Information Panel" >}}

Use the Detailed Information Panel to get an overview of the variables, incidents, called process instances and user tasks that the process instance contains. Depending on the selected activity instance in the rendered diagram, the panel lists the corresponding information. You can also focus on the activity instance via a scope link in the table.

In addition to the instance information you can [edit variables]({{< relref "#edit-variables" >}}) or change the assignees of user tasks.

In the Incidents tab you can click on the Incident message name, which will open the stacktrace of the selected incident. Furthermore you can also increment the number of retries for a failed job by hitting the {{< glyphicon name="repeat" >}} button.

The User Tasks tab allows to manage groups for selected user tasks. Hit the {{< glyphicon name="user" >}} button to open the corresponding menu.


# Add Variables

{{< img src="../img/cockpit-add-variables.png" title="Add Variables" >}}

Hit the {{< glyphicon name="plus" >}} button on the right hand side to add variables to a process instance. You can choose between different data types. Please note that variables will be overwritten if you add a new variable with an existing name.


# Edit Variables

{{< img src="../img/cockpit-edit-variables.png" title="Edit Variables" >}}

Edit variables in the list of variables by using the {{< glyphicon name="pencil" >}} symbol. This feature allows you to change the value of variables as well as the type. A validation of the date format and for the value of integers happens on client side. If you enter NULL the variable will be converted to a string type.


# Cancel a Process Instance

{{< img src="../img/cockpit-cancel-process-instance.png" title="Cancel Instances" >}}

When you select a single process instance you can cancel it in the Process Instance View.
Hit the {{< glyphicon name="remove-circle" >}} button on the right hand side. After you have confirmed this step the runtime data of the canceled instance will be deleted.
