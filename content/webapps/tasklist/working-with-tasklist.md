---

title: 'Working with Tasklist'
weight: 10

menu:
  main:
    identifier: "webapps-tasklist-working"
    parent: "webapps-tasklist"

---


In the following example we will walk through a typical human workflow scenario. In our prepackaged distribution, Tasklist has four demo users which belong to different user groups. Sign in with the user *demo*.


# Start a Process

To start a process instance via Tasklist, click on *Start process* in the header menu of the [dashboard][tasklist-dashboard] and select a process out of the displayed list of process definitions. If no process definitions are listed here, please verify that your process application is deployed correctly. For our example, start the *Invoice Receipt* process.
After selecting the process to start, complete the start form. Hit `Start` to continue to the next step in our example.


# Create a Filter

On the [dashboard][tasklist-dashboard] you can now create a filter which displays this task. For our example, we will create a filter to display all tasks assigned to the currently signed in user and which belong to the process definition *Invoice Receipt*. To do so, click on *Create a Filter* and insert a name for the filter, e.g., *My invoice tasks*. Then click on *Criteria* and on *Add Criterion*. Next, click on the empty *Key* field, select *Name* in the *Process Definition* submenu and insert *Invoice Receipt* into the *Value* field. Click on *Add Criterion* again, select *Assignee* in the *User/Group* submenu of the key field and insert *${ currentUser() }* into the value field. We want to publish this filter to our colleagues as well. To do this, click on *Permissions* and tick the box at *Accessible by all users*. As a final step, click on `Save` to create the filter.

Now you can see the filter on the left side of the dashboard. Click on the filter to display the user tasks.

See the [Filters][tasklist-filters] section for more information.

# Claim Tasks

First we need to claim this task to be able to work on it. To do so, click on *Claim* in the [task view section][tasklist-dashboard-task-view]. You can also reassign the task to another user by clicking on *Demo Demo*. A text field will appear into which you can insert the user that you want to assign this task to.

See the [Claiming, unclaiming and reassigning tasks]({{< ref "/webapps/tasklist/dashboard.md#claim-unclaim-and-reassign-tasks" >}}) section for more information.

# Working on Tasks

After creating the filter, we now want to start working on a task. We can do so by selecting the task in the [filter results]({{< ref "/webapps/tasklist/dashboard.md#filter-results" >}}). On the right side, you will see the task form to work on as an embedded form.

In our example task form you are asked to approve an invoice (or not). To complete the task, either tick the checkbox at *Do you approve?* or not and click on `Complete`. For our example, tick the checkbox and complete the task. Then have a look at the [filter results]({{< ref "/webapps/tasklist/dashboard.md#filter-results" >}}). Now you will see that the *Prepare Bank Transfer* task has been created.

When you submit the task form, the task is completed and the process continues in the engine. Furthermore, you can visualize the process model by clicking on the *Diagram* tab in the [task view][tasklist-dashboard-task-view] section of the dashboard.

See the [Task Forms]({{< ref "/user-guide/task-forms/_index.md" >}}) section for more information.


# Set Follow-Up Date

Let's assume that this task was assigned to the user just before the end of his working day. Because we want to hurry out, we will set a follow-up date (reminder) for this task so that we don't forget about it when we get back to the office. To do so, click on *Set follow-up date* in the [task view section][tasklist-dashboard-task-view] and select a date in the calendar that is displayed. We can also set an exact time for the follow-up.

See the [Follow-Up][tasklist-dashboard-follow-up] section for more information.


# Comment a Task

Now we want to add a comment for other Tasklist users to see. To do so, click on *Add Comment* at the top of the [task view section][tasklist-dashboard-task-view] and insert the comment, e.g., "Hi Mary, please review this task". The comment can now be seen in the task history.

See the [Comments]({{< ref "/webapps/tasklist/dashboard.md#comments" >}}) section for more information.


# Set Due Date

Last but not least, we want to set a due date for this task, to ensure that the task is handled on time. To do so, click on *Set due date* in the [task view section][tasklist-dashboard-task-view] and select a date in the calendar that is displayed. You can also set an exact time.

See the [Due Dates][tasklist-dashboard-follow-up] section for more information.

This concludes our example task. Now we will elaborate on the functions that Tasklist offers.


[tasklist-dashboard]: {{< ref "/webapps/tasklist/dashboard.md" >}}
[tasklist-dashboard-task-view]: {{< ref "/webapps/tasklist/dashboard.md#task-view" >}}
[tasklist-dashboard-follow-up]: {{< ref "/webapps/tasklist/dashboard.md#set-due-dates-and-follow-up-dates" >}}
[tasklist-filters]: {{< ref "/webapps/tasklist/filters.md" >}}
