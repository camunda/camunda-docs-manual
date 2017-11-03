---

title: 'Instance Restart'
weight: 50

menu:
  main:
    name: "Instant Restart"
    identifier: "user-guide-cockpit-pi-restart"
    parent: "user-guide-cockpit-bpmn"
    pre: "Restart process instances after termination."
    name: "Instance Restart"

---
{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}


In the history view, you can restart process instances individually or by a batch operation. A restart can consist of one or multiple of the following operations:

* Restart before an activity
* Restart after an activity, on its single outgoing sequence flow


# Perform Restart 


{{< img src="../../img/cockpit-restart.png" title="Process Instance Restart" >}}


A restart of a terminated process instance includes instructions which are displayed in the bottom of the screen, after you have selected the restart tab in the history view (1).  

To add an instruction, hover over an activity in the process diagram. By using the modification button (2), you can select the instruction to be performed with this activity.

In the top-left corner of the activity, a badge will appear, indicating the restart (3).

At any point during the creation of the restart, you can show the payload by clicking the {{< glyphicon name="eye-open" >}} button. This will show the request payload that will be sent via the [REST API]({{< relref "reference/rest/index.md" >}}).


## Restart Instructions 

When restarting a process instance, you have the option to *start before* or *start after* the activity. Using *start before*, the activity will be executed. *start after* is only possible if there is only one sequence flow going out of the activity.

## Instance selection  

{{< img src="../../img/cockpit-restart-instance-selection.png" title="Instance Selection" >}}

When you click on *Select Instances* a modal opens which allows you to select a single or a batch of process instances which should be restarted. Note, in order to find the relevant instances, you can apply filters. When you have made your selection you can proceed by clicking the red button. This leads you to the *Confirm Restart* modal.  


## Confirm Restart 

{{< img src="../../img/cockpit-restart-confirm.png" title="Confirm Restart" >}}

Here you see two sections. The option section allows you to specify options related to the execution of the restart.

*Asynchronous* is recommended to keep ticked when you want to process a large number of instances. Otherwise, unchecking the box allows you to process the batch in a synchronous manner.

*Initial Variables* allows you to set the initial set of variables. By default is is the last set of variables used.  

*Without Business Key* offers the option to avoid taking over the business key of the historic process instance to the new instance. 

*Skip Custom Listeners* and *Skip IO Mappings* make it possible to skip invocations of execution and task listeners as well as input/output mappings for the transaction that performs the restart. This can be useful when the restart is executed on a system that has no access to the involved process application deployments and their contained classes.
 
The second section shows an summary over the operations and number of instances you have specified before.
 


