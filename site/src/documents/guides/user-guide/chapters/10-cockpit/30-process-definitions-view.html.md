---

title: 'Process Definitions View'
category: 'Cockpit'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-process-definitions-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Process Definitions View provides you with information about the definition and the status of a process. On the left hand side you can easily survey the versions of the process and how many instances of the version are running. Incidents of all running process instances are displayed together with an instances counter label in the corresponding rendered diagram. So it is easy to locate <a href="ref:#cockpit-failed-jobs">failed activities</a> in the process. Use the mouse to navigate through the diagram. By turning the mouse wheel you can zoom in out. Hold the left mouse button pressed to slide the diagram in the desired direction.</p>
    <p>In the tab `Process Instaces` all running instances are listed in a table view. Beside information about start time, business key and state you can select an instance by ID and go down to the <a href="ref:#cockpit-process-instance-detail-view">Process Instance View</a>.<br>
    The tab `Called Process Definitions` displays the called child processes. In the column <em>Called Process Definition</em> the name of the called sub processes is listed. Click on the name to display the process in the Process Definitions View. Please note that a filter called Parent is automaticaly set for the process so that you see only the instences that belongs to the parent process. In the column <em>Activity</em> you can select the instance that is calling the child process.</p>
  </div>
</div>

## Filter

The filter function on the left hand side of the Process Definitions View allows you to find certain instances by filtering for variables, business keys or by selecting the version of a process. Beyond that you can combine different filters as logical _AND_ relation. Filter expressions on variables must be specified as `variableName OPERATOR value` where the _operator_ my be one of the following terms `=`, `!=`, `>`, `>=`, `<`, `<=`, `like`. Apart from the `like` operator the operator expressions does not have to be seperated by spaces.
The `like` operator is for string variables only. You can use `%` as wildcard in the _value_ expression. String values must be properly enclosed in `""`.
