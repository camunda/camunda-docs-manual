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
  </div>
</div>

## Toggle view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-toggle-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Tasklist offers you the option of toggling the view options on the dashboard. You can select to have a focus on the <a href="ref:#tasklist-filters">filters</a>, the <a href="ref:#tasklist-dashboard-filter-results">filter results</a>, the <a href="ref:#tasklist-dashboard-task-view">task view</a> or to display the full dashboard. To do so, hit the respective <img src="ref:asset:/assets/img/implementation-tasklist/tasklist-toggle-view-button.png"></img> button (see the image on the left). At any time, you can also choose to instantly set full focus on the task view by hitting the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button.
    </p>
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
      Here you can see an overview of all tasks for the selected <a href="ref:#tasklist-filters">filter</a>. By default the filter with the lowest priority is displayed first. After selecting the appropriate filter, you will see an overview of all tasks, sorted by a specified criteria (by default it is sorted by the creation date). You can change the sorting of the tasks by clicking on the name of the sorting property. You can toggle between ascending and descending order by clicking on the arrow (<button class="btn btn-xs"><i class="glyphicon glyphicon-chevron-up"></i></button>, respectively <button class="btn btn-xs"><i class="glyphicon glyphicon-chevron-down"></i></button>).
    </p>
    <p>
      You can sort by more than one property by adding more properties with the <a><span class="glyphicon glyphicon-plus-sign"></span></a> button. You can also sort by the value of variables, which allows for use cases like sorting invoices by the value of their amount.</a> To remove a sort parameter you can click on the <a><span class="glyphicon glyphicon-minus-sign"></span></a>.
    </p>
    <p>
       To start working on the task, simply select the task.
    </p>
  </div>
</div>

### Search for Tasks

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-variable-filter.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Above the filter results, you have the option of searching for user tasks within the selected filter results. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g., 'like', which allows to search for a task where the entered value is a substring of the property value. If you are searching for variables, you also have to enter the variable name you want to search for. If the filter you have selected has defined labels for variables, you can select the label of the variable as variable name. Otherwise (if there is no label definition for a variable), you have to enter the variable name to search for it. If you change the filter selection, the search will be performed on the selected filter and the results will be updated accordingly.
    </p>
    <p>
      If you are searching for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g., <code>'93288'</code> or <code>'NULL'</code>).
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
