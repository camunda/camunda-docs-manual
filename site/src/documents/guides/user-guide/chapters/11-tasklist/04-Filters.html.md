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
