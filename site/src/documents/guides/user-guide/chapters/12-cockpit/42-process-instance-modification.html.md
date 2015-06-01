---

title: 'Process Instance Modification'
category: 'Cockpit'

---

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that this feature is only included in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-modification.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    In the detail view, you have the ability to modify the process instance's execution state. A modification can be one or multiple of the following operations:
    <ul>
      <li>Starting execution before an activity</li>
      <li>Starting execution after an activity on its single outgoing sequence flow</li>
      <li>Cancelling an activity instance or all instances of an activity</li>
    </ul>
  </div>
</div>

<div class="alert alert-info">
  <strong>Semantics of Process Instance Modification</strong>
  <p>The exact semantics of process instance modification as well as the underlying REST and Java API can be read about in the <a href="ref:#process-engine-process-instance-modification">Process Instance Modification section</a> of this guide.</p>
</div>

## Perform a Modification

A modification consists of multiple instructions, which are displayed in the modification tab at the bottom half of the screen (1). To add an instruction to the modification, hover over an activity of the process instance diagram. Using the <button class="btn btn-xs dropdown-toggle"><i class="glyphicon glyphicon-wrench"></i> </button> button (2), you can select the operation to be performed with this activity. In the top-left corner of the activity, a modification badge will appear, indicating how many new instances of this activity will be created and how many activity instances will be canceled when applying this modification (3). This number represents the directly created/canceled instances only. Instances created during the modification (e.g. by service tasks) are not counted.

The option to cancel an activity or activity instance is only available if there are running instances of this activity.

You can also drag an instance badge (4) from one activity to another to create a "move token" operation which is represented by start and cancel operations.

When executing a modification, the instructions are applied in the specified order. You can change the order of instructions by using the up- and down-arrows on the left (5). You can also remove an instruction from the modification (6).

In the modification tab you can then configure the specification of the instruction depending on its type:

### Cancel Running Activity Instances

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-modification-cancel.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>When canceling activity instances you can select the instances of the activity you want to cancel. You can select them by their instance ID using the Select Instances button on the right. To better distinguish between activity instances, you can also show variables assigned to this instance using the <a class="btn btn-link"><span class="glyphicon glyphicon-eye-open"></span></a> button.</p>

    <p>When canceling all instances of an activity using the <a class="btn btn-link"><span class="glyphicon glyphicon-plus-sign"></span> All</a> button, all instances which exists at the moment this instruction is executed will be cancelled. This will also cancel instances which were created in the same modification (e.g. using a startBefore instruction before the cancel instruction). In most cases, you probably want to explicitely state the instances to cancel.</p>
  </div>
</div>

### Start New Activity Instances

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-modification-start.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>When starting a new activity instance, you have the option to start before or start after the activity. Using startBefore, the activity will be executed. StartAfter is only possible if there is only one sequence flow going out of the activity. In both cases you have the option to create new variables which are created or updated with the creation of the activity. Starting an activity instantiates all parent scopes (e.g. sub processes) that are not instantiated yet before the actual activity is executed.</p>

    <p>Additionally you can specify the ancestor of the new activity instance if it is created in a nested sub-process or part of a multi-instance scenario. For every ancestor, the variables are displayed. When an activity is instantiated with a specific ancestor activity instance, all scopes <i>between</i> the ancestor's activity and the target activity are instantiated.</p>

    <p>When starting activities with a multi-instance flag, there is the option to either start a new multi-instance body of the activity (which executes the entire multi-instance construct and therefore creates the number of child activities specified in the multi-instance configuration for this task) or a new single instance of the activity in an already existing multi-instance body.</p>
  </div>
</div>

## Review Modification Instructions

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-cockpit/cockpit-modification-review.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>At any point during the creation of the modification, you can show the payload of the modification by clicking the <button class="btn btn-xs dropdown-toggle"><i class="glyphicon glyphicon-eye-open"></i> </button> button. This will show the request payload that will be sent via the <a href="ref:/api-references/rest/#process-instance-modify-process-instance-execution-state">REST API</a>.</p>

    <p>To perform the modification, you have to click on the *Apply modifications* button. Then you have a last chance to review the changes you are about to make and also review the request payload. After confirming the change, the modification is executed and the page is updated with the new execution state of the process instance.</p>
  </div>
</div>
