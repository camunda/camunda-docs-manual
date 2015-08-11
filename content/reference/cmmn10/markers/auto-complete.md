---

title: 'Auto Complete'
weight: 30

menu:
  main:
    identifier: "cmmn-ref-markers-auto-complete"
    parent: "cmmn-ref-markers"

---

**Can be used with**: [Stage](ref:#grouping-tasks-stage), CasePlanModel

<img class="img-responsive" src="ref:asset:/assets/cmmn/auto-complete-marker.png"/>

The attribute `autoComplete` controls the completion of a stage instance. The following table describes the completion criteria of a stage instance based on the `autoComplete` property.

<table class="table table-bordered">
  <thead>
    <tr>
      <th>
        <code>autoComplete = true</code>
      </th>
      <th>
        <code>autoComplete = false</code>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        There are no children in the <code>ACTIVE</code> state, and all required (<a href="ref:#markers-required-rule">see Required Rule</a>) children are <code>COMPLETED</code>, <code>DISABLED</code> or <code>TERMINATED</code>.
      </td>
      <td>
        There are no children in the <code>ACTIVE</code> state, and
        <ul>
          <li>all children are <code>COMPLETED</code>, <code>DISABLED</code> or <code>TERMINATED</code>, or</li>
          <li>on manual completion using <code>CaseService#completeCaseExecution</code>, all required (<a href="ref:#markers-required-rule">see Required Rule</a>) children are <code>COMPLETED</code>, <code>DISABLED</code> or <code>TERMINATED</code>.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

For a CasePlanModel the property `autoComplete` can be set as follows:

```xml
<case id="case">
  <casePlanModel id="CasePlanModel_1" autoComplete="true">

    ...

  </casePlanModel>
</case>
```

For a Stage, the following XML can be used:

```xml
<case id="case">
  <casePlanModel id="CasePlanModel_1" autoComplete="true">

    <planItem id="PI_Stage_1" definitionRef="Stage_1" />

    <stage id="Stage_1" autoComplete="true"/>

  </casePlanModel>
</case>
```

