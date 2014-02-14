---

title: 'Failed Jobs'
category: 'Cockpit'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-failed-job-drill-down.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Unresolved incidents of a process instance or a sub process instance are indicated by Cockpit as failed jobs. To localize which instance of a process failed cockpit allows you to drill down to the unresolved incident by using the process status dots. Hit a red status dot of the affected instance in the Process Definitions View to get an overview about all incidents. The <code>incidents</code> tab in the <a href="ref:#cockpit-process-instance-detail-view">Detailed Information Panel</a> lists the failed activities with additional information. Furthermore you have the chance to go down the failing instance of a sub process.</p>
  </div>
</div>

## Retry a Failed Job

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-failed-job-retry.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    To resolve a failed job you can use the <button class="btn btn-xs dropdown-toggle"><i class="glyphicon glyphicon-repeat"></i> </button> button on the right hand side. Select the corresponding instance in the confirmation dialog so the engine will re-trigger this jobs and incerement it's retry value in the database.
  </div>
</div>
