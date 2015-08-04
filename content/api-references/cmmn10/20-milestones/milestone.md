---

title: "Milestones"
weight: 50

menu:
  main:
    identifier: "cmmn-ref-milestones"
    parent: "cmmn-ref"

---

A *milestone* is used to represent achievable targets within the case. It is not associated with any work but rather marks that certain conditions have been reached within the case. As a milestone is a regular plan item definition, a milestone's completion may be used as entry criteria for other tasks and stages. This way, a milestone can be used to bring logical stages within a case into order.

<img class="img-responsive" src="ref:asset:/assets/cmmn/milestone.png"/>

In XML, a milestone is defined as follows:

```xml
<milestone id="theMilestone" name="A Milestone"/>
```

When referenced in a case plan, a milestone gets completed as soon as its entry criteria are fulfilled. This requires no human interaction. A more complete example of a milestone depending on the completion of a human task is the following:

```xml
<definitions>
  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">
      <planItem id="PlanItem_HumanTask" definitionRef="HumanTask_1"/>
      <planItem id="PlanItem_Milestone" definitionRef="Milestone_1" entryCriteriaRefs="Sentry_1"/>

      <sentry id="Sentry_1">
        <planItemOnPart sourceRef="PlanItem_HumanTask">
          <standardEvent>complete</standardEvent>
        </planItemOnPart>
      </sentry>

      <humanTask id="HumanTask_1" />
      <milestone id="Milestone_1" name="A Milestone" />
    </casePlanModel>
  </case>
</defintions>
```

In this case, the milestone will complete as soon as as the human task completes.

A milestone cannot have exit criteria.

<div class="alert alert-info">
  <p><strong>Always define Milestones with Entry Criteria</strong></p>
  <p>
    A milestone without entry criteria is fulfilled as soon as the stage it is contained in becomes active. For example, a milestone item that is defined on the case definition level is completed as soon as the case is instantiated. It is therefore advisable to define at least one entry criterion for a milestone plan item.
  </p>
</div>

## Checking Milestones

In order to check whether a milestone has occurred, the history service can be used. The following checks the state of a milestone instance:

```java
HistoricCaseActivityInstance milestoneInstance = historyService
  .createHistoricCaseActivityInstanceQuery()
  .caseInstanceId("aCaseInstanceId")
  .caseActivityId("theMilestone")
  .singleResult();

milestoneInstance.isCompleted(); // true if milestone occurred
```

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundacaseexecutionlistener">camunda:caseExecutionListener</a>
    </td>
  </tr>
</table>
