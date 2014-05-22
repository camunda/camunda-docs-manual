---

title: 'Human Workflow Management'
category: 'Tasklist'

---

In the following example we walk through a typical human workflow scenario. The Tasklist has four demo users which belong to different user groups. Sign in with the user _demo_ and start a process instance.

## Start a Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-start-process.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      To start a process instance via the Tasklist hit the <button class="btn btn-xs"><i class="caret"></i> Start a Process </button> dropdown button and select a process. If there is no process listed please verify that your process is deployed correctly.
    </p>
    <p>
      Depending on whether you have defined a <a href="ref:#tasklist-task-forms">start form</a> for your process it will be displayed now. Otherwise you get the notification that no form has been defined for starting the process. In this case click <code>Start process using generic form</code>. The <a href="ref:#tasklist-task-forms-generic-task-forms">generic task form</a> allows you to enter variables for your process.
    </p>
    <p>
      In our example you have to insert the desired values and hit <code>Start Process</code> to continue to the next step.
    </p>
  </div>
</div>

## Working on Tasks / Task Completion

Tasks that are assigned to you are listed on the Tasklist main page where you can hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-play"></i> </button> button to start working on a task.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-form-assign-approver.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>In our example <a href="ref:#tasklist-task-forms">task form</a> you are asked to assign an approver for your invoice. Enter a colleague's name who should be assigned to approve the task. Have a look at the <a href="ref:#tasklist-human-workflow-management-user-and-group-task-overview">Task Overview</a>. The assigned task is now in your colleague's folder.</p>
     <p>If no task form is defined for a <a href="ref:/api-references/bpmn20/#events-start-events">Start Event</a> you will be forwarded to a <a href="ref:#tasklist-task-forms-generic-task-forms">generic form</a>. In a generic form you can define the input data yourself.</p>
  </div>
</div>

When you complete a task by submitting the task form, the task is completed and the process continues in the engine.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-diagram.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    Furthermore, you can visualize the process model by clicking on the <button class="btn btn-xs" title="Display BPMN Diagram"><i class="glyphicon glyphicon-search"></i></button> symbol. By highlighting the current task the visualization gives you also information your task on the context of the whole process.
  </div>
</div>

## User and Group Task Overview

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-main-info.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>In the User and Group Task overview you can see how many tasks are assigned to you, the different groups and your colleagues. Have a look in your colleagues' folder. You will see that you can see their tasks but you are not able to work on them.</p>
    <p>The folder <code>Inbox</code> contains all tasks that are assigned to the user groups. Like tasks of a group they are ready to be <a href="ref:#tasklist-human-workflow-management-un-claim-a-task">claimed</a>.</p>
  </div>  
</div>

## (Un-)Claim a Task

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-claim.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>If tasks are assigned to a group, they are visible to more than one person. In order to avoid different people working on it at the same time, the task first needs to be claimed. By claiming a task you become the assignee and the task is moved to your personal tasks folder ("My Tasks"). Hit the <button class="btn btn-xs dropdown-toggle"><i class="caret"></i> </button> button and select <code>claim</code>.</p>
    <p>User can also unclaim a task by selecting <code>unclaim</code>. The task will go back to the associated user group.</p>
  </div>
</div>

You can bulk (un-)claim tasks after selecting multiple tasks via `Ctrl + click`.

## Delegate a Task

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-delegate.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    When you delegate a task to one of your colleagues he has the possibility to take a look at your task and give it back to you. This can be helpful if you want to get help from a colleague or you need feedback. To delegate a task doesn’t mean that you assign it to someone else. After delegation, you are still the assignee of the task. If you do not want to be the assignee of a task, use the <a href="ref:#tasklist-human-workflow-management-un-claim-a-task">(un-)claim function</a>. 
  </div>  
</div>

You can bulk delegate tasks after selecting multiple tasks via `Ctrl + click`.