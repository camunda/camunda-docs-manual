---

title: 'Dashboard'
category: 'Cockpit'

---

The dashboard of Cockpit is your entry point for process monitoring. It comes with a pre-installed plugin, which lets you see deployed process defintions. Additional plugins can be added to the dashboard.

## Deployed Processes

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-process-definition-state.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>With this plugin you can easily observe the state of a processes definition. Green and red dots signalize running and <a href="ref:#cockpit-failed-jobs">failed jobs</a>. At this observing level a red dot signifies that there is at least one process instance or a sub process instance which has an unresolved incident. You can localize the problem by using the <a href="ref:#cockpit-process-definition-view">Process Definition View</a>.</p>

  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-deployed-processes.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>You can also switch to the preview tab which includes the rendered process model of each deployed process. Additionally, you get information about how many instances of the process are currently running and about the process state. Green and red dots signalize running and <a href="ref:#cockpit-failed-jobs">failed jobs</a>. Click on the model to get to the <a href="ref:#cockpit-process-definition-view">Process Definition View</a>.</p>
  </div>
</div>

## Multi Tenancy

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-multi-engine.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    If you are working with more than one engine you can select the desired engine via a dropdown selection. Cockpit provides all information of the selected engine.
  </div>
</div>

## Search

<div class="alert alert-warning">
  <p><strong>Enterprise Feature</strong></p>
  Please note that this feature is only included in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
  <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-search.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      At the top of the dashboard page, you can search for process instances and incidents which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g. 'like', which allows to search for process instances where the entered value is a substring of the property value. If you are searching for process variables, you also have to enter the variable name you want to search for.
    </p>
    <p>
      If you are searching for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g. <code>'93288'</code> or <code>'NULL'</code>).
    </p>
    <p>
      You can always either search for process instances or for incidents. When you add a parameter for an incidents search, you can not add a second parameter which would search for a process instance and vice versa.
    </p>
  </div>
</div>
