---

title: 'Working with Tasklist'
category: 'Tasklist'

---

In the following example we will walk through a typical human workflow scenario. Tasklist has four demo users which belong to different user groups. Sign in with the user _demo_.

### Start a Process

To start a process instance via Tasklist, hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-list-alt"></i></button> button on the [dashboard](ref:#tasklist-dashboard) and select a process out of the displayed list of process definitions. If no process definitions are listed here, please verify that your process application is deployed correctly. For our example, start the _invoice receipt_ process.
After selecting the process to start, you have to insert the desired values in the start form and hit <code>Start</code> to continue to the next step in our example.


### Create a Filter

On the [dashboard](ref:#tasklist-dashboard) you can now create a filter which displays this task. For our example, we will create a filter to display all tasks assigned to the currently signed in user and which belong to the process definition _invoice receipt_. To do so, click on _Create a Filter_ and insert a name for the filter, e.g., _My invoice tasks_. Then click on _Criteria_ and on _Add Criterion_. Next, click on the empty _Key_ field, select _Name_ in the _Process Definition_ submenu and insert _invoice receipt_ into the _Value_ field. Click on _Add Criterion_ again, select _Assignee_ in the _User/Group_ submenu of the key field and insert _${ currentUser() }_ into the value field. We want to publish this filter to our colleagues as well. To do this, click on _Authorizations_ and on _Add Rule_. Here we will add a * as a wildcard into the User/Group field to make the filter visible to all users. As a final step, click on _Save_ to create the filter.

Now you can see the filter on the left side of the dashboard. Click on the filter to display the user tasks.

See [this section](ref:#tasklist-filters) for more information about Filters in Tasklist.

### Working on Tasks

After creating the filter, we now want to start working on a task. We can do so by selecting the task in the [filter results](#tasklist-dashboard-filter-results). On the right side, you will see the task form to work on as an embedded form.

In our example [task form](ref:#tasklist-task-forms) you are asked to assign an approver for your invoice. In our example, select the _demo_ user from the dropdown menu and 
complete the task. Then have a look at the [dashboard](ref:#tasklist-dashboard). Now you will see that the _Assign Approver_ task has been completed and a new task, _Approve Invoice_ has been created and assigned to the _demo_ user.

When you submit the task form, the task is completed and the process continues in the engine. Furthermore, you can visualize the process model by clicking on the _Diagram_ tab in the [task view](ref:#tasklist-dashboard-task-view) section of the dashboard.

See [this section](ref:#tasklist-task-forms) for more information about task forms.


### Set Follow-Up Date

Let's assume that this task was assigned to us just before the end of our shift. Because we want to hurry out and go to the pub, we will set a follow-up date (reminder) for this task so that we don't forget about it when we get back to the office. To do so, click on _Set follow-up date_ in the [task view section](ref:#tasklist-dashboard-task-view) and select a date in the calendar that is displayed. We can also set an exact time for the follow-up.

See [this section](ref:#tasklist-dashboard-set-due-dates-and-follow-up-dates) for more information about setting follow-up dates.

### Reassign tasks

Next we will reassign this task to another user (e.g., _Mary_) for further handling. To do so, click on the user name _demo_ in the [task view section](ref:#tasklist-dashboard-task-view) and select the user that this task should be assigned to, e.g., _Mary_.

See [this section](ref:#tasklist-dashboard-claim-unclaim-and-reassign-tasks) for more information about claiming, unclaiming and reassigning tasks.

### Comment a task

Now that we have assigned the task to _Mary_, we want to add a comment for her to see. To do so, click on _Add Comment_ at the top of the [task view section](ref:#tasklist-dashboard-task-view) and insert the comment, e.g., "Hi Mary, please handle this task". The comment can now be seen in the task history.

See [this section](ref:#tasklist-dashboard-comments) for more information about comments in tasks.

### Set Due Date

Last but not least, we want to set a due date for this task, to ensure that the task is handled on time. To do so, click on _Set due date_ in the [task view section](ref:#tasklist-dashboard-task-view) and select a date in the calendar that is displayed. You can also set an exact time.

See [this section](ref:#tasklist-dashboard-set-due-dates-and-follow-up-dates) for more information about setting due dates.   




This concludes our example task. Now we will elaborate on the functions that Tasklist offers.
