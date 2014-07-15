---

title: 'Process Definition View'
category: 'Cockpit'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-process-definitions-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Process Definition View provides you with information about the definition and the status of a process. On the left hand side you can easily survey the versions of the process and how many instances of the version are running. Incidents of all running process instances are displayed together with an instances counter label in the corresponding rendered diagram. So it is easy to locate <a href="ref:#cockpit-failed-jobs">failed activities</a> in the process. Use the mouse to navigate through the diagram. By turning the mouse wheel you can zoom in out. Hold the left mouse button pressed to pan the diagram in the desired direction.</p>
    <p>In the tab <code>Process Instances</code> all running instances are listed in a tabular view. Besides information about start time, business key and state you can select an instance by ID and go down to the <a href="ref:#cockpit-process-instance-detail-view">Process Instance View</a>.<br>
    The tab <code>Called Process Definitions</code> displays the called child processes. In the column <em>Called Process Definition</em> the names of the called sub processes are listed. Click on the name to display the process in the Process Definition View. Please note that a filter called Parent is automatically set for the process so that you only see the instances that belong to the parent process. In the column <em>Activity</em> you can select the instance that is calling the child process.<br>
    The tab <code>Job Definitions</code> displays the Job Definitions that are linked to this Process Definition. You can see the name of the activity, the type of job, the configuration thereof and the state thereof. You can also suspend and re-activate the job definition (see <a href="ref:#cockpit-suspension-job-definition-suspension">Job Definition Suspension</a> for more information).</p>
  </div>
</div>

## Filter
The filter function on the left hand side of the Process Definition View allows you to find certain instances by filtering for variables, business keys, start time and date, end time and date (enterprise edition) or by selecting the version of a process. Beyond that you can combine different filters as logical _AND_ relation. Filter expressions on variables must be specified as `variableName OPERATOR value` where the _operator_ my be one of the following terms `=`, `!=`, `>`, `>=`, `<`, `<=`, `like`. Apart from the `like` operator, the operator expressions do not have to be separated by spaces.
 The `like` operator is for string variables only. You can use `%` as wildcard in the _value_ expression. String and date values must be properly enclosed in `" "`.
<br>
<br>
 <strong>Note:</strong> Please be aware that complex data types are not supported in this feature.
<br>
<br>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/add-filter.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <br>
       <strong>Filtering for process instances</strong><br>
       In the image on the left you can see how to add a filter to the Process Definition View. You can select to add a filter for variables, the start date and time or the business key of process instances.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/business-key.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Business Key</strong><br>
       Here you can filter for process instances by <a href="ref:/guides/user-guide/#process-engine-database-configuration-business-key">Business Key</a>.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/start-date.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Start Date</strong><br>
       Here you can filter for process instances by start date. Please note that the date must be set in accordance to the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> standard.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-string.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>String variable</strong><br>
       Here you can filter for process instances by filtering for a 'string' value. Please note that you need to encase the value in quotation marks.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-boolean.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Boolean variable</strong><br>
       Here you can filter for process instances by filtering for a 'boolean' value.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-date.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Date variable</strong><br>
       Here you can filter for process instances by filtering for a 'date' value. Please note that the date value must be set in accordance to the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> standard and that you need to encase the value in quotation marks.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-double.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Double variable</strong><br>
       Here you can filter for process instances by filtering for a 'double' value.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-integer.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Integer variable</strong><br>
       Here you can filter for process instances by filtering for an 'integer' value.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-long.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Long variable</strong><br>
       Here you can filter for process instances by filtering for a 'long' value.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/var-short.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>Short variable</strong><br>
       Here you can filter for process instances by filtering for a 'short' value.
     </p>
  </div>
</div>

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that the following feature is only included in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/history-filter.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <br>
       <strong>Filtering for completed and running process instances</strong><br>
       In the image on the left you can see how to add a filter to the <a href="#cockpit-history-view-process-definition-historical-view">Process Definition Historical View</a>. You can select to add a filter for variables, the start date and time, the end date and time or the business key of process instances.
     </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/filter-examples/end-date.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>
       <strong>End Date</strong><br>
       Here you can filter for process instances by end date. Please note that the date must be set in accordance to the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> standard and that this option is only available in the <a href="#cockpit-history-view-process-definition-historical-view">Process Definition Historical View</a>.
     </p>
  </div>
</div>