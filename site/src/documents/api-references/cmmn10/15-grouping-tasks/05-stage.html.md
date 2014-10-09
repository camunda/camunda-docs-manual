---

title: 'Stage'
category: 'Grouping Tasks'

keywords: 'stage'

---

A `stage` can contain other planned items like a `human task`, `process task`, `case task` or `stage`. Stages may be considered 'episodes' of a case, though case models allow definition of stages that can also be planned in parallel.

If the stage is collapsed, only the name and a plus-sign are displayed:

<img class="img-responsive" src="ref:asset:/assets/cmmn/stage-collapsed.png"/>

If the stage is expanded, the planned items of the stage are displayed within its boundaries:

<img class="img-responsive" src="ref:asset:/assets/cmmn/stage-expanded.png"/>

A stage is defined in XML as follows:

```xml
<stage id="checkCredit">

  <!-- plan items -->

  <planItem id="PI_checkSolvency" definitionRef="checkSolvency" />

  <planItem id="PI_calculateCredit" definitionRef="calculateCredit" />

  <planItem id="PI_calculateHousekeepingBill" definitionRef="calculateHousekeepingBill" />

</stage>
```

Furthermore, the case refers to a stage as its `casePlanModel`. This defines the `outermost` stage of the case. This `outermost` stage also contains the definitions of the planned items that are used in the case.

```xml
<case>

  <casePlanModel>

    <!-- plan items -->

    <planItem id="PI_checkCredit" definitionRef="checkCredit" />

    <!-- plan item definitions -->
    
    <humanTask id="checkSolvency" name="Check Solvency" />

    <humanTask id="calcualteCredit" name="Calculate Credit" />

    <humanTask id="calculateHousekeepingBill" name="Calculate Hausekeeping Bill" />

    <stage id="checkCredit">

      <!-- plan items -->

      <planItem id="PI_checkSolvency" definitionRef="checkSolvency" />

      <planItem id="PI_calculateCredit" definitionRef="calculateCredit" />

      <planItem id="PI_calculateHousekeepingBill" definitionRef="calculateHousekeepingBill" />

    </stage>

  </casePlanModel>

</case>
```
Note: The listed plan item definitions inside the `casePlanModel` are available in the case plan model itself (i.e. stage), and its nested stages. But the plan item definitions must not be contained by any other stage than the `casePlanModel` of the case.

An `ENABLED` stage can be started manually using the CaseService as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the stage becomes `ACTIVE`, the contained planned items will be instantiated. And a stage in this state contains at least one stage or task instance in the `AVAILABLE`, `ENABLED` or `ACTIVE` state. In other words, a stage will complete if a user has no option to do further work with the stage instance. This also means that if a contained planned item (e.g. a stage or a human task) of a stage will be completed or disabled, the stage will be notified about that state transition of the child and will check if it is able to complete itself. A stage instance can only complete if there are no `ACTIVE` children, and all children are `DISABLED` or `COMPLETED`. If the completion criteria is fulfilled the corresponding stage completes automatically.

