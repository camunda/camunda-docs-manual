---

title: 'Case Instance View'
weight: 20

menu:
  main:
    identifier: "user-guide-cockpit-cmmn-instance"
    parent: "user-guide-cockpit-cmmn"
    pre: "Inspect an executed case instance"

---

{{< img src="../../img/cmmn/case-instance-view.png" title="Case Instance View" >}}

Open the case instance view by selecting a case instance from the [case definition view][case-definition-view] instance list. This view allows you to drill down into a single case instance and explore its activities as well as the variables, tasks, etc.

Furthermore, you can maximize the diagram view or the detailed information panel by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button, respectively the <button class="btn btn-xs"><i class="glyphicon glyphicon-menu-up"></i></button> button, at the bottom left of the diagram view.

# Detailed Information Panel

{{< img src="../../img/cmmn/detailed-information-view.png" title="Detailed Information Panel" >}}

You can access various information regarding the specific instance by selecting the applicable tab at the bottom of the screen:

**Audit Log**  
In the Audit Log you find a detailed overview of the activities that took place within the case instance, including start time, end time, activity instance ID and the current state.

**Variables**  
In the Variables tab you see an overview of the variables used within the case instances, including the name, last value, variable type and scope. Additionally, you can [edit variables]({{< relref "#edit-variables" >}}).

**User Tasks**  
In the User Tasks tab you find an overview of all the user tasks related to this case instance and the details of the specific user tasks, such as the activity, the assignee, owner, creation date, completion date, the duration, due date, follow up date, priority of the user task and the unique task ID.

**Called Process Instances**  
In the Called Process Instances tab you find an overview of all process instances which were called in this case instance. Clicking on the ID of the process instance will take you to the process instance view page of the respective instance. Clicking on the process definition key will take you to the process definition page of the definition for the respective process instance.

**Called Case Instances**  
In the Called Case Instances tab you find an overview of all case instances which were called in this case instance. Clicking on the ID of the case instance will take you to the case instance view page of the respective instance. Clicking on the case definition key will take you to the case definition page of the definition for the respective case instance.

**Executed Decision Instances**  
In the Executed Decision Instances tab you find an overview of all decision instances which were evaluated in this case instance. Clicking on the ID of the decision instance will take you to the decision instance view page of the respective instance. Clicking on the decision definition key will take you to the decision definition page of the definition for the respective decision instance.

# Add Variables

{{< img src="../../img/cmmn/add-variables.png" title="Add Variables" >}}

Hit the {{< glyphicon name="plus" >}} button on the right side to add variables to a case instance. You can choose between different data types. Please note that variables will be overwritten if you add a new variable with an existing name.


# Edit Variables

{{< img src="../../img/cmmn/edit-variables.png" title="Edit Variables" >}}

Edit variables in the list of variables by using the {{< glyphicon name="pencil" >}} symbol. This feature allows you to change the value of variables as well as the type. A validation of the date format and for the value of integers happens on client side. If you enter NULL, the variable will be converted to a string type.


# Terminate a Case Instance

{{< img src="../../img/cmmn/terminate-case.png" title="Terminate Case Instance" >}}

In the case instance view you can terminate a single case instance. Hit the {{< glyphicon name="remove" >}} button on the right side.


[case-definition-view]: {{< ref "/webapps/cockpit/cmmn/case-definition-view.md" >}}
[case-instance-view]: {{< ref "/webapps/cockpit/cmmn/case-instance-view.md" >}}
