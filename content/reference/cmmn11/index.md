---

title: 'CMMN 1.1 Implementation Reference'
weight: 40

menu:
  main:
    name: "CMMN 1.1"
    identifier: "cmmn-ref"
    parent: "references"

---

This page provides an overview of the CMMN 1.1 elements and the current coverage of the process engine.

# Coverage

The elements marked in <span class="label label-warning">orange</span> are supported.

## Definitions

<div class="cmmn-symbols">
  <div class="row">
    <div class="col-md-12">
      <h3>Grouping</h3>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/grouping-tasks/stage.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="case-plan-model-colored" >}}
      </div>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/grouping-tasks/stage.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="stage-collapsed-colored" >}}            
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="plan-fragment" >}}
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Tasks</h3>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="human-task-colored" >}} 
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="manual-task" >}}
      </div>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/tasks/process-task.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="process-task-colored" >}}
      </div>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/tasks/case-task.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="case-task-colored" >}}
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="task" >}}
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="discretionary-task" >}}
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-9">
      <h3>Event-Triggered Elements</h3>
      <div class="bpmn-symbol-container implemented">
        <a href="{{< relref "reference/cmmn11/milestone.md" >}}"><span class="glyphicon glyphicon-eye-open"></span></a>
        {{< cmmn-symbol type="milestone-colored" >}}
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="event-listener" >}}
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="event-listener-timer" >}}
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="event-listener-user" >}}
      </div>
    </div>
    <div class="col-md-3">
      <h3>CaseFileItem</h3>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="case-file-item" >}}
      </div>
    </div>
  </div>
</div>

## Markers


<table class="table table-bordered table-responsive table-cmmn-events">
  <thead>
    <tr>
      <td>Type</td>
      <td colspan="7">Marker</td>
    </tr>
    <tr class="collapse-bottom">
      <td></td>
      <td>
        <span class="text">Planning Table</span>
        {{< cmmn-symbol type="marker-planning-table" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/sentry.md" >}}">Entry Criterion</a>
        {{< cmmn-symbol type="marker-entry-criterion" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/sentry.md" >}}">Exit Criterion</a>
        {{< cmmn-symbol type="marker-exit-criterion" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/markers/auto-complete.md" >}}">AutoComplete</a>
        {{< cmmn-symbol type="marker-auto-complete" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/markers/manual-activation-rule.md" >}}">Manual Activation</a>
        {{< cmmn-symbol type="marker-manual-activation" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/markers/required-rule.md" >}}">Required</a>
        {{< cmmn-symbol type="marker-required" >}}
      </td>
      <td>
        <a class="text" href="{{< relref "reference/cmmn11/markers/required-rule.md" >}}">Repetition</a>
        {{< cmmn-symbol type="marker-repetition" >}}
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="{{< relref "reference/cmmn11/grouping-tasks/stage.md" >}}">Case Plan Model</a></td>
      <td>
        <span class="glyphicon glyphicon-remove"></span>
      </td>
      <td>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="{{< relref "reference/cmmn11/grouping-tasks/stage.md" >}}">Stage</a></td>
      <td>
        <span class="glyphicon glyphicon-remove"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
    </tr>
    <tr>
      <td><a href="{{< relref "reference/cmmn11/tasks/index.md" >}}">Task</a></td>
      <td>
        <span class="glyphicon glyphicon-remove"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td></td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
    </tr>
    <tr>
      <td><a href="{{< relref "reference/cmmn11/milestone.md" >}}">Milestone</a></td>
      <td></td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
      <td>
        <span class="glyphicon glyphicon-ok"></span>
      </td>
    </tr>
    <tr>
      <td>EventListener</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>CaseFileItem</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>PlanFragment</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
