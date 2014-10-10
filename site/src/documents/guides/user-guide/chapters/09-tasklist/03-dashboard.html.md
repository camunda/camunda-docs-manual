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
      On the dashboard of Tasklist you can see an overview of pending tasks. On the left side of the screen, you can see an overview of the <a href="ref:#tasklist-filters">filters</a>. On the top right side of the screen, you can set a follow-up or due date and you can claim and unclaim tasks. On the bottom right of the screen, you can see the embedded form (please note that external task forms cannot be displayed here), you can switch to the <a href="ref:#tasklist-dashboard-task-history">task history</a> or you can see the <a href="ref:#tasklist-dashboard-diagram-view">diagram view</a>.
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
      Here you can see an overview of all tasks for the selected <a href="ref:#tasklist-filters">filter</a>. By default the filter with the lowest priority is displayed first. After selecting the appropriate filter, you will see an overview of all tasks, sorted by a specified criteria (by default <i>Priority</i>). You can change the sorting of the tasks by clicking on <i>Sort by Priority</i> and selecting one of the options <i>Created (sort by time and date of creation)</i>, <i>Due date</i>, <i>Follow-up date</i>, <i>Task name</i> or <i>Assignee</i>. To start working on the task, simply select the task.
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
      On the right half of the screen, you can see the task view. This view has several components, which offer you the option of changing a few settings and also offers several operational functions.
    </p>
  </div>
</div>

### Due date and follow-up date

In the top right section of the task view, you can set a due date and follow-up date for the selected task. A due date can be set to determine when the task needs to be completed and a follow-up date can be set for monitoring purposes.

### Claim, unclaim and reassign Tasks

Within the task view, you can claim, unclaim and reassign tasks. To claim a task, simply select _Claim_. You can unclaim a task by hitting the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> button next to the username of a claimed task and you can reassign a task to a different user by clicking on the username and inserting the username of the user you want to assign the task to.

### Comments
In Tasklist you can add and view comments on specific tasks. After selecting a task from the [filter results](ref:#tasklist-dashboard-filter-results) At the top right of the screen, you can click on _Add Comment_ to add a comment to the selected task. The comments of a task can be viewed in the [task history](ref:#tasklist-dashboard-task-history).

### Task Form view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-form.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      At the bottom right of the dashboard, you can see the task form (provided that the task form is an embedded, generated or generic task form). Here you can work on and complete the task. Alternatively, you can hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-fullscreen"></i></button> button to expand the task form to work on.
    </p>
  </div>
</div>

### Task history

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-history.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      At the bottom right of the dashboard, you can select the <i>History</i> tab to see the history of this user task. Here you can see detailed information, such as the assignment history, updates to the due date and follow-up dates and claimung and unclaiming of tasks.
    </p>
  </div>
</div>


### Diagram view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-task-diagram.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      At the bottom right of the dashboard, you can select the <i>Diagram</i> tab to see the diagram of the process definition. The current user task is highlighted in this diagram.
    </p>
  </div>
</div>
