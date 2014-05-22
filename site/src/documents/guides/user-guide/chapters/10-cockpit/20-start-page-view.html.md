---

title: 'Start Page View'
category: 'Cockpit'

---

On the start page of Cockpit you get an overview of the installed plugins - you will see at least two pre-installed plugins. Additionally installed plugins will automatically be added below the existing ones.

## Deployed Processes (List)

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-process-definition-state.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    With this plugin you can easily observe the state of a processes definition. Green and red dots signalize running and <a href="ref:#cockpit-failed-jobs">failed jobs</a>. At this observing level a red dot signifies that there is at least one process instance or a sub process instance which has an unresolved incident. You can localize the problem by using the <a href="ref:#cockpit-process-definition-view">Process Definition View</a>.
  </div>
</div>

## Deployed Processes (Icons)

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-deployed-processes.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    This plugin gives you an overview of all deployed processes on the engine and displays them as rendered process models. Additionally, you get information about how many instances of the process are currently running and about the process state. Green and red dots signalize running and <a href="ref:#cockpit-failed-jobs">failed jobs</a>. Click on the model to get to the <a href="ref:#cockpit-process-definition-view">Process Definition View</a>.
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
