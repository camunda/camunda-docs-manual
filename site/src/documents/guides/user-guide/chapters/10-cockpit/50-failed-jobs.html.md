---

title: 'Failed Jobs'
category: 'Cockpit'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-failed-job-drill-down.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Unresolved incidents of a process instance or a sub process instance are indicated by Cockpit as failed jobs. To localize which instance of a process failed, Cockpit allows you to drill down to the unresolved incident by using the process status dots. Hit a red status dot of the affected instance in the Process Definition View to get an overview of all incidents. The <code>Incidents</code> tab in the <a href="ref:#cockpit-process-instance-detail-view-detailed-information-panel">Detailed Information Panel</a> lists the failed activities with additional information. Furthermore, you have the possibility of going down to the failing instance of a sub process.</p>
  </div>
</div>

## Retry a Failed Job

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-failed-job-retry.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    To resolve a failed job you can use the <button class="btn btn-xs dropdown-toggle"><i class="glyphicon glyphicon-repeat"></i> </button> button on the right hand side. Select the corresponding instance in the confirmation dialog so the engine will re-trigger this job and increment its retry value in the database.
  </div>
</div>

## Bulk Retry

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that the following feature is only included in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com">camunda</a> product homepage for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-bulk-retry.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
You can also perform a bulk Retry of failed jobs. This feature is available in the <a href="ref:#cockpit-process-definition-view">Process Definition View</a> in the Job Definitions tab. If you hit this button, you will increment the number of retries for all of the defined jobs of the process definition.
</div>
