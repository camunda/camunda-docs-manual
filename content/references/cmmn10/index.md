---

title: 'CMMN 1.0 Implementation Reference'
weight: 40

menu:
  main:
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
        <a href="ref:#grouping-tasks-stage">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/case-plan-model-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <a href="ref:#grouping-tasks-stage">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/stage-collapsed-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/plan-fragment.png"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Tasks</h3>
      <div class="bpmn-symbol-container">
        <a href="#tasks-human-task">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/human-task-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/manual-task.png"/>
      </div>
      <div class="bpmn-symbol-container">
        <a href="#tasks-process-task">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/process-task-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <a href="#tasks-case-task">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/case-task-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/task.png"/>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/discretionary-task.png"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-9">
      <h3>Event-Triggered Elements</h3>
      <div class="bpmn-symbol-container">
        <a href="ref:#milestones-milestone">
          <div id="1" title="since 7.2">
            <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/milestone-colored.png"/>
          </div>
        </a>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/event-listener.png"/>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/event-listener-timer.png"/>
      </div>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/event-listener-user.png"/>
      </div>
    </div>
    <div class="col-md-3">
      <h3>CaseFileItem</h3>
      <div class="bpmn-symbol-container">
        <img class="img-responsive" src="ref:asset:/assets/cmmn/overview/case-file-item.png"/>
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
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-planning-table.png"/></center>
        </th>
        <th>
          <p><a href="ref:#sentries-sentry">Entry Criterion</a></p>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-entry-criterion.png"/></center>
        </th>
        <th>
          <p><a href="ref:#sentries-sentry">Exit Criterion</a></p>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-exit-criterion.png"/></center>
        </th>
        <th>
          <p><a href="ref:#markers-auto-complete">AutoComplete</a></p>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-auto-complete.png"/></center>
        </th>
        <th>
          <p><a href="ref:#markers-manual-activation-rule">Manual Activation</a></p>
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-manual-activation.png"/></center>
          </th>
        <th>
          <p><a href="ref:#markers-required-rule">Required</a></p>
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-required.png"/></center>
          </th>
        <th>
          <p>Repetition</p>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/marker-repetition.png"/></center>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="ref:#grouping-tasks-stage">Case Plan Model</a></td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
        </td>
        <td>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td><a href="ref:#grouping-tasks-stage">Stage</a></td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
        </td>
      </tr>
      <tr>
        <td><a href="ref:#tasks">Task</a></td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td></td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <div id="1" title="since 7.3">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
        </td>
      </tr>
      <tr>
        <td><a href="ref:#milestones-milestone">Milestone</a></td>
        <td></td>
        <td>
          <div id="1" title="since 7.2">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div id="1" title="since 7.3">
            <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/supported.png"/></center>
          </div>
        </td>
        <td>
          <center><img class="img-responsive" src="ref:asset:/assets/cmmn/overview/unsupported.png"/></center>
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
