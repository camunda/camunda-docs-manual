---

title: 'Dashboard'
category: 'Tasklist'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-dashboard-detail.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      On the dashboard of Tasklist you see an overview of pending tasks. On the left side of the screen, an overview of the <a href="ref:#tasklist-filters">filters</a> is displayed. On the top right side of the screen, you can set a follow-up or due date and you can claim and unclaim tasks. Underneath that section, the embedded form is displayed (please note that external task forms cannot be displayed here), you can switch to the task history, you can see the diagram view or you can view the description of the user task.
    </p>
    <p>
      Tasklist offers you the option of toggling the view options on the dashboard. You can select to have a focus on the <a href="ref:#tasklist-dashboard-filter-results">filter results</a>, the <a href="ref:#tasklist-dashboard-task-view">task view</a> or to display the full dashboard.
  </div>
</div>

## Start a process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-start-process.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      To start a process instance via Tasklist, hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-list-alt"></i></button> button and select a process out of the displayed list of process definitions. If no process definitions are listed here, please verify that your process application is deployed correctly.
    </p>
    <p>
      Depending on whether you have defined a <a href="ref:#task-forms">start form</a> for your process it will be displayed now. Otherwise you get a notification that no form has been defined for starting the process. In this case, a <a href="ref:#task-forms-generic-task-forms">generic</a> start form will be displayed and Tasklist will offer the option of adding variables to the process instance.
    </p>
  </div>
</div>

## Filter Results

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-overview.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Here you can see an overview of all tasks for the selected <a href="ref:#tasklist-filters">filter</a>. By default the filter with the lowest priority is displayed first. After selecting the appropriate filter, you will see an overview of all tasks, sorted by a specified criteria (by default <i>Priority</i>). You can change the sorting of the tasks by clicking on <i>Sort by Priority</i> and selecting one of the options <i>Created (sort by time and date of creation)</i>, <i>Due date</i>, <i>Follow-up date</i>, <i>Task name</i> or <i>Assignee</i>. You can toggle between ascending and descending order by clicking on the arrow (<button class="btn btn-xs"><i class="glyphicon glyphicon-chevron-up"></i></button>, respectively <button class="btn btn-xs"><i class="glyphicon glyphicon-chevron-down"></i></button>). To start working on the task, simply select the task.
    </p>
  </div>
</div>

### Search for Tasks by variable

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-variable-filter.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Above the filter results, you have the option of searching for user tasks by variable within the selected filter results. To do so, click in the search box and select which variables to search for, either a Process Variable, a Task Variable or a Case Variable. Next you need to insert both a Property and a Value for the variable. By default the operator is <i>equal to</i> (=). You can toggle the operator and select <i>not equal to</i> (!=), <i>greater than</i> (>), <i>lower than</i> (<), <i>equal to or greater than</i> (>=) or <i>equal to or lower than</i> (<=). Depending on the data type of your search, the operators can vary slightly. If you change the filter selection, the search will be performed on the selected filter and the results will be updated accordingly.
    </p>
  </div>
</div>

## Task view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      On the right section of the <a href="ref:#tasklist-dashboard">dashboard</a>, you can see the task view. Here you can work on tasks and perform the following operational actions.
    </p>
  </div>
</div>

### Set Due dates and follow-up dates

In the upper section of the task view, you can set a due date and follow-up date for the selected task. A due date can be set to determine when the task needs to be completed and a follow-up date can be set as a reminder or for monitoring purposes.

### Claim, unclaim and reassign Tasks

Within the task view, you can claim, unclaim and reassign tasks. To claim a task, simply select _Claim_. Unclaim a task by hitting the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> button next to the username of a claimed task and reassign a task to a different user by clicking on the username and inserting the username of the user you want to assign the task to. You can also assign tasks to user groups by clicking on _Add Groups_.

### Comments

In Tasklist you can add and view comments on specific tasks. After selecting a task from the [filter results](ref:#tasklist-dashboard-filter-results), click on _Add Comment_ at the top of the [task view section](ref:#tasklist-dashboard-task-view) to add a comment to the selected task. The comments of a task can be viewed in the task history.

## Task Detail Tabs

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>In the lower section of the task view there are several tabs which can be selected to display both the task form itself and additional information related to this user task.
      <ul>
        <li><strong>Task form view</strong> - The <i>Form</i> tab, which is selected by default, displays the task form (provided that the task form is an embedded, generated or generic task form). Here you can work on and complete the task.</li>
        <li><strong>Task history</strong> - The <i>History</i> tab displays the history of this user task. Here you can see detailed information, such as the assignment history, updates to the due date and follow-up dates and claiming and unclaiming of tasks.</li>
        <li><strong>Diagram view</strong> - The <i>Diagram</i> tab shows the diagram of the process definition. The current user task is highlighted in this diagram.</li>
        <li><strong>Task description</strong> - Open the <i>Description</i> tab to see the description of the user task. See <a href="ref:/api-references/bpmn20/#tasks-user-task-description">this section</a> for more information about description of tasks.</li>
      </ul>
    </p>
  </div>
</div>
