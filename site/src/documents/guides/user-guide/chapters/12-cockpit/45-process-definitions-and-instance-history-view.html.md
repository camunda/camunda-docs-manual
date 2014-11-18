---

title: 'History view'
category: 'Cockpit'

---

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that this feature is only included in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

At the top right of the Process Definition View and the Process Instance View, you can hit the History Button to access the historical view.

## Process definition historical view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-history-view-process-definition-history.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>In the historical view of the Process Definition you see an overview of all of the running and completed process instances. On the left side of the screen, a <a href="ref:#cockpit-process-definition-view-filter">Filter</a> can be applied and you have the option of selecting to only see process instances in a specific state. Running and completed instances can be selected.</p>
  </div>
</div>


## Process instance historical view

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-history-view-process-instance-history.png" />
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-history-view-process-instance-detail.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>In the historical view of the process instance you see instance-specific information. On the left side of the screen, a <a href="ref:#cockpit-process-definition-view-filter">Filter</a> can be applied and you have the option of selecting to only see process instances in specific states. Running, completed and canceled process instances can be viewed as well as task-specific activity states. </p>

    <p>You can access various information regarding the specific instance by selecting the applicable tab at the bottom of the screen. Among other details, you can view the Audit Log of an instance, which includes detailed information about the activities that took place within the process instance. In the Action column of the Variables tab, you can see a log of the variables which were used in the instance and in the User Tasks tab you can see a log of the User Tasks of the instance.
    </p>
  </div>
</div>
