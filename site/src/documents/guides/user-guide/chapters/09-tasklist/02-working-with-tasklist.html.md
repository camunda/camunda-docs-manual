---

title: 'Working with Tasklist'
category: 'Tasklist'

---

In the following example we will walk through a typical human workflow scenario. For an explanation of the dashboard, see <a href="ref:#tasklist-dashboard">this section</a>. The Tasklist has four demo users which belong to different user groups. Sign in with the user _demo_ and start a process instance.

## Start a Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-start-process.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      To start a process instance via the Tasklist hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-list-alt"></i></button> button and select a process out of the displayed list of process definitions. If no process definitions are listed, please verify that your process application is deployed correctly.
    </p>
    <p>
      Depending on whether you have defined a <a href="ref:#tasklist-task-forms">start form</a> for your process it will be displayed now. Otherwise you get the notification that no form has been defined for starting the process. In this case, a generic start form will be displayed. The <a href="ref:#tasklist-task-forms-generic-task-forms">generic task form</a> allows you to enter variables for your process.
    </p>
    <p>
      In our example you have to insert the desired values and hit <code>Start</code> to continue to the next step.
    </p>
  </div>
</div>

## Working on Tasks / Task Completion

Tasks that are assigned to you are listed on the dashboard in the filter <i>My Tasks</i>. This is one of the predefined filters that are delivered with Tasklist. You can start working on a task by selecting the task in the <a href="ref:#tasklist-dashboard">Task Overview</a>. On the right side, you will see the task form to work on as an embedded form. Please note that external forms cannot be displayed here.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-form-assign-approver.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>In our example <a href="ref:#tasklist-task-forms">task form</a> you are asked to assign an approver for your invoice. To do this, select a user from the dropdown menu. Then have a look at the  <a href="ref:#tasklist-dashboard">dashboard</a>. You can now see the task in the <i>All Tasks</i> filter. Please note that this filter is only provided with the prepackaged distribution of Tasklist and we do not recommend to set this filter for productive use.</p>
     <p>If no task form is defined for a <a href="ref:/api-references/bpmn20/#events-start-events">Start Event</a>, a <a href="ref:#tasklist-task-forms-generic-task-forms">generic form</a> will be created and Tasklist will offer the option of adding variables to the process instance.</p>
     <p>When you complete a task by submitting the task form, the task is completed and the process continues in the engine. Furthermore, you can visualize the process model by clicking on the <i>Diagram</i> tab in the <a href="ref:#tasklist-dashboard-task-form-and-diagram-view">preview</a> section of the dashboard.  </p>
  </div>
</div>


## (Un-)Claim a Task

<p>You can claim and unclaim tasks in the <a href="ref:#tasklist-dashboard-task-settings">Task settings</a>. To claim a task, simply select <i>Claim</i>. You can unclaim a task by hitting the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> button next to the username of a claimed task.</p>
