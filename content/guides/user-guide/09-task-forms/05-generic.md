---

title: 'Generic Task Forms'
weight: 40

menu:
  main:
    identifier: "user-guide-forms-generic"
    parent: "user-guide-forms"

---

The generic form will be used whenever you have not added a dedicated form for a [User Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start Event](ref:/api-references/bpmn20/#events-start-events).

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-generic-form.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    Hit the <code>Add a variable</code> button to add a variable that will be passed to the process instance upon task completion. State a variable name, select the type and enter the desired value. Enter as many variables as you need.
    After hitting the <code>Complete</code> button the process instance contains the entered values. Generic Task Forms can be very helpful during the development stage, so you do not need to implement all Task Forms before you can run a workflow. For debugging and testing this concept has many benefits as well.
  </div>
</div>

You can also retrieve already existing variables of the process instance by clicking the <code>Load Variables</code> button.
