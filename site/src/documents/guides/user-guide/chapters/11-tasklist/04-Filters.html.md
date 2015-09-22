---

title: 'Filters'
category: 'Tasklist'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-create-filter.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      In the Tasklist, you can create and select Filters. You can use these Filters to create lists of tasks, sorted by specified criteria. To create a filter, select <i>Create a Filter</i>. You will then see a screen as depicted in the image to the left. You have several options to configure your filter:
        <ul>
          <li><strong>General</strong> - Here you can specify the name and description of the filter as well as assigning a color. Assign a priority to determine the order in which the filters are displayed on the dashboard. You can choose to have the filter automatically refresh the filter results by selecting the checkbox <i> Auto-Refresh</i>.</li>
          <li><strong>Permissions</strong> - Here you can specify which users or groups can see the filter. You can set the filter as globally accessible by selecting the checkbox <i>Accessible by all users</i>. A permission that is set here is equivalent to a <i>READ</i> permission which can also be set in <a href="ref:#admin">Camunda Admin</a>. In case you want to assign other permissions, you can do so in the <a href="ref:#admin-administrator-account-authorizations">Authorizations</a> tab in Camunda Admin.</li>
          <li><strong>Criteria</strong> - Here you can specify which tasks will be displayed when selecting the filter. A Key and a Value must be inserted. There are various Keys which can be selected from the categories <i>Process Instance (ID, Business Key)</i>, <i>Process Definition (ID, Key, Name)</i>, <i>Case Instance (ID, Business Key)</i>, <i>Case Definition (ID, Key, Name)</i>, <i>Other (Process Instance state, Activity instance ID, Execution ID)</i>, <i>User/Group (Assignee, Owner, Candidate User or Group, Involved user, Unassigned, Delegation State)</i>, <i>Task (Definition Key, Name, Description, Priority)</i> and <i>Dates (Created date, Due date, Follow up date)</i>. Keys marked with a * accept expressions as value.</li>
          <li><strong>Variables</strong> - Here you can specify which variables are displayed in the <a href="ref:#tasklist-dashboard-filter-results">filter results</a> section of the <a href="ref:#tasklist-dashboard">dashboard</a>. Setting variables here has no influence on which tasks are displayed. To set the variables, you need to insert a <i>Name</i>, which is the coded name of the variable, and a <i>Label</i>, which defines what the variable will be named in the <a href="ref:#tasklist-dashboard-filter-results">filter results</a>.</li>
        </ul>
    </p>
  </div>
</div>

### Expressions in Filters

Several of the filter criteria accept expressions as values. These expressions are in the [JUEL](http://juel.sourceforge.net/) language. In filters which are related to times and dates, you can use the dateTime class, which returns a [Joda-Time](http://www.joda.org/joda-time/) DateTime object.

<div class="alert alert-warning">
  <strong>Security Consideration</strong>
  <p>Filter expressions can be abused to execute arbitrary code when the query is evaluated. It is therefore required that any user authorized to create filters is trusted in this respect. The default behavior of evaluating filter expressions can be deactivated in the process engine configuration. See the section on <a href="ref:/guides/user-guide/#process-engine-custom-code-and-security">security considerations for custom code</a> for details.</p>
</div>

### Common Filters

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-filter-detail.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Here we will show you some of the more common and useful filters that you can create in Camunda Tasklist and how to set them up.
    </p>
  </div>
</div>
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
           <code>true</code>
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
            <code>true</code>
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
