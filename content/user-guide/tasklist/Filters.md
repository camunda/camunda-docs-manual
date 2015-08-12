---

title: 'Filters'
weight: 30

menu:
  main:
    identifier: "user-guide-tasklist-filters"
    parent: "user-guide-tasklist"

---


{{< img src="../img/tasklist-create-filter.png" title="Create Filter" >}}


In the Tasklist, you can create and select Filters. You can use these Filters to create lists of tasks, sorted by specified criteria. To create a filter, select *Create a Filter*. You will then see a screen as depicted in the image to the left. You have several options to configure your filter:

* **General** - Specify the name and description of the filter as well as assigning a color. Assign a priority to determine the order in which the filters are displayed on the dashboard. You can choose to have the filter automatically refresh the filter results by selecting the checkbox * Auto-Refresh*.
* **Permissions** - Specify which users or groups can see the filter. You can set the filter as globally accessible by selecting the checkbox *Accessible by all users*. A permission that is set here is equivalent to a *READ* permission which can also be set in <a href="ref:#admin">Camunda Admin</a>. In case you want to assign other permissions, you can do so in the <a href="ref:#admin-authorization-management-authorizations">Authorizations</a> tab in Camunda Admin.
* **Criteria** - Specify which tasks will be displayed when selecting the filter. A Key and a Value must be inserted. There are various Keys which can be selected from the categories *Process Instance (ID, Business Key)*, *Process Definition (ID, Key, Name)*, *Case Instance (ID, Business Key)*, *Case Definition (ID, Key, Name)*, *Other (Process Instance state, Activity instance ID, Execution ID)*, *User/Group (Assignee, Owner, Candidate User or Group, Involved user, Unassigned, Delegation State)*, *Task (Definition Key, Name, Description, Priority)* and *Dates (Created date, Due date, Follow up date)*. Keys marked with a * accept expressions as value.
* **Variables** - Specify which variables are displayed in the [filter results]({{< relref "user-guide/tasklist/dashboard.md#filter-results" >}}) section of the [dashboard]({{< relref "user-guide/tasklist/dashboard.md" >}}). Setting variables here has no influence on which tasks are displayed. To set the variables, you need to insert a *Name*, which is the coded name of the variable, and a *Label*, which defines what the variable will be named in the [filter results]({{< relref "user-guide/tasklist/dashboard.md#filter-results" >}}).


# Expressions in Filters

Several of the filter criteria accept expressions as values. These expressions are in the [JUEL](http://juel.sourceforge.net/) language. In filters which are related to times and dates, you can use the dateTime class, which returns a [Joda-Time](http://www.joda.org/joda-time/) DateTime object.


# Common Filters

{{< img src="../img/tasklist-filter-detail.png" title="Filter Details" >}}

In the table below we list some of the more common and useful filters that you can create in Camunda Tasklist and how to set them up.


<section class="row">
  <div class="col-md-12">
    <table class="table table-responsive">
      <thead>
        <tr>
        <th class="table-condensed-column">
         Filter name
        </th>
        <th>
          Description
        </th>
        <th>
          Criterion<br>
          Key
        </th>
        <th>
          Criterion<br>
          Value
        </th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            All my tasks
          </td>
          <td>
            Displays all tasks assigned to the currently logged in user
          </td>
          <td>
            Assignee
          </td>
          <td>
            <code>$ { currentUser() }</code>
          </td>
        </tr>
        <tr>
          <td>
            Tasks of a specific user
          </td>
          <td>
            Displays all tasks assigned to a specified user
          </td>
          <td>
            Assignee
          </td>
          <td>
            User ID of the user (e.g., <code>demo</code>)
          </td>
        </tr>
        <tr>
          <td>
            All my groups
          </td>
          <td>
            Displays all tasks assigned to a user group of which the currently logged on user is a member
          </td>
          <td>
            Candidate Groups
          </td>
          <td>
           <code>${ currentUserGroups() }</code>
          </td>
        </tr>
        <tr>
          <td>
            Tasks of a specific group
          </td>
          <td>
            Displays all tasks assigned to a specific user group
          </td>
          <td>
            Candidate Groups
          </td>
          <td>
           Group name (e.g., <code>accounting</code>)
          </td>
        </tr>
        <tr>
          <td>
            Unclaimed tasks of a specific group
          </td>
          <td>
            Displays all tasks assigned to a specific user group which have not been claimed yet
          </td>
          <td>
            Candidate Groups,<br>
            Unassigned
          </td>
          <td>
           Group name (e.g., <code>accounting</code>),<br>
           N/A
          </td>
        </tr>
        <tr>
          <td>
            Unassigned tasks
          </td>
          <td>
            Displays all tasks that have not yet been claimed
          </td>
          <td>
            Unassigned
          </td>
          <td>
            N/A
          </td>
        </tr>
        <tr>
          <td>
            Overdue tasks
          </td>
          <td>
            Displays all tasks that have a due date set in the past
          </td>
          <td>
            Due Before
          </td>
          <td>
            <code>${ now() }</code>
          </td>
        </tr>
        <tr>
          <td>
            Tasks due today
          </td>
          <td>
            Displays all tasks that have a due date set for the current date
          </td>
          <td>
            Due After, <br>
            Due Before
          </td>
          <td>
            <code>${ dateTime().withTimeAtStartOfDay() }</code>,<br>
            <code>${ dateTime().withTimeAtStartOfDay()<br>
            .plusDays(1).minusSeconds(1) }</code>
          </td>
        </tr>
        <tr>
          <td>
            Tasks due after a specific date
          </td>
          <td>
            Displays all tasks that have a due date set after a specified date
          </td>
          <td>
            Due After
          </td>
          <td>
            The specified date in accordance with <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> (e.g., <code>2015-01-01T00:00:01</code>)
          </td>
        </tr>
        <tr>
          <td>
            Tasks due within a specific timespan
          </td>
          <td>
            Displays all tasks that have a due date set within a specified timespan (in this example, within 2 days)
          </td>
          <td>
            Due After, <br>
            Due Before
          </td>
          <td>
            Expressions specifying the timespans<br>
            (e.g., <code>${ now() }</code>, <br>
            <code>${ dateTime().plusDays(2) }</code>)
          </td>
        </tr>
        <tr>
        <tr>
          <td>
            Tasks due after a specific timespan
          </td>
          <td>
            Displays all tasks that have a due date set after a specified timespan (in this example, after 2 days)
          </td>
          <td>
            Due After
          </td>
          <td>
            An expression specifying the timespan<br>
            (e.g.,<code>${ dateTime().plusDays(2) }</code>)
          </td>
        </tr>
        <tr>
          <td>
            Tasks with a certain priority
          </td>
          <td>
            Displays all tasks that are marked with a specified priority (in this example, priority 10)
          </td>
          <td>
            Priority
          </td>
          <td>
            <code>10</code>
          </td>
        </tr>
        <tr>
          <td>
            Follow-up tasks
          </td>
          <td>
            Displays all tasks that have a follow-up date set in the past
          </td>
          <td>
            Follow Up Before
          </td>
          <td>
            <code>${ now() }</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
