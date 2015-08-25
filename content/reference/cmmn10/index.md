---

title: 'CMMN 1.0 Implementation Reference'
weight: 40

menu:
  main:
    name: "CMMN 1.0"
    identifier: "cmmn-ref"
    parent: "references"

---

This page provides an overview of the CMMN 1.0 elements and the current coverage of the process engine.

# Coverage

The elements marked in <span class="label label-warning">orange</span> are supported.

## Definitions

Hover over the element to see since which version of the Camunda BPM platform they are supported.

<div>
  <div class="row">
    <div class="col-md-12">
      <h3>Grouping</h3>
      <div class="bpmn-symbol-container">
        <a href="{{< relref "reference/cmmn10/grouping-tasks/stage.md" >}}">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="case-plan-model" >}}
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <a href="{{< relref "reference/cmmn10/grouping-tasks/stage.md" >}}">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="stage-collapsed" >}}            
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="plan-fragment" >}}
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Tasks</h3>
      <div class="bpmn-symbol-container">
        <a href="{{< relref "reference/cmmn10/tasks/human-task.md" >}}">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="human-task" >}}            
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        {{< cmmn-symbol type="manual-task" >}}
      </div>
      <div class="bpmn-symbol-container">
        <a href="{{< relref "reference/cmmn10/tasks/process-task.md" >}}">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="process-task" >}}
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <a href="#tasks-case-task">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="case-task" >}}
          </div>
        </a>
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
      <div class="bpmn-symbol-container">
        <a href="{{< relref "reference/cmmn10/milestone.md" >}}">
          <div id="1" title="since 7.2">
            {{< cmmn-symbol type="milestone" >}}
          </div>
        </a>
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

<div class="table-responsive">
  <table class="table table-bordered table-bpmn-events">
    <thead>
      <tr>
        <th>Type</th>
        <th colspan="7">Marker</th>
      </tr>
      <tr>
        <th></th>
        <th>
          <p>Planning Table</p>
          {{< cmmn-symbol type="marker-planning-table" >}}
        </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/sentry.md" >}}">Entry Criterion</a></p>
          {{< cmmn-symbol type="marker-entry-criterion" >}}
        </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/sentry.md" >}}">Exit Criterion</a></p>
          {{< cmmn-symbol type="marker-exit-criterion" >}}
        </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/markers/auto-complete.md" >}}">AutoComplete</a></p>
          {{< cmmn-symbol type="marker-auto-complete" >}}
        </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/markers/manual-activation-rule.md" >}}">Manual Activation</a></p>
          {{< cmmn-symbol type="marker-manual-activation" >}}
          </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/markers/required-rule.md" >}}">Required</a></p>
          {{< cmmn-symbol type="marker-required" >}}
          </th>
        <th>
          <p><a href="{{< relref "reference/cmmn10/markers/required-rule.md" >}}">Repetition</a></p>
          {{< cmmn-symbol type="marker-repetition" >}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="{{< relref "reference/cmmn10/grouping-tasks/stage.md" >}}">Case Plan Model</a></td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
        </td>
        <td>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><a href="{{< relref "reference/cmmn10/grouping-tasks/stage.md" >}}">Stage</a></td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
        </td>
      </tr>
      <tr>
        <td><a href="{{< relref "reference/cmmn10/tasks/index.md" >}}">Task</a></td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td></td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
        </td>
      </tr>
      <tr>
        <td><a href="{{< relref "reference/cmmn10/milestone.md" >}}">Milestone</a></td>
        <td></td>
        <td>
          <div id="1" title="since 7.2">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div id="1" title="since 7.3">
            <center>{{< cmmn-symbol type="overview/supported" >}}</center>
          </div>
        </td>
        <td>
          <center>{{< cmmn-symbol type="overview/unsupported" >}}</center>
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
</div>
