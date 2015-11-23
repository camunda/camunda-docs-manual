---

title: "Update from CMMN 1.0 to CMMN 1.1"
weight: 100

menu:
  main:
    identifier: "cmmn-update-from-10-to-11"
    parent: "cmmn-ref"

---

In order to update existing CMMN 1.0 XMLs to valid CMMN 1.1 the following adjustments must be done.

* The namespace must be updated as follows:
<table class="table table-striped">
  <tr>
    <th>CMMN 1.0</th>
    <td><code>&lt;definitions xmlns="http://www.omg.org/spec/CMMN/20131201/MODEL"&gt;</code></td>
  </tr>
  <tr>
    <th>CMMN 1.1</th>
    <td><code>&lt;definitions xmlns="http://www.omg.org/spec/CMMN/20151109/MODEL"&gt;</code></td>
  </tr>
</table>

* The `<body/>` element from expressions must be removed:
<table class="table table-striped">
  <tr>
    <th>CMMN 1.0</th>
    <td>
      <code>&lt;condition&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;body&gt;${any-expression}&lt;body&gt;</code>
      <br>
      <code>&lt;/condition&gt;</code>
    </td>
  </tr>
  <tr>
    <th>CMMN 1.1</th>
    <td>
      <code>&lt;condition&gt;${any-expression}&lt;/condition&gt;</code>
    </td>
  </tr>
</table>
This is relevant for all elements containing a condition or an expression like `IfPart`, `ManualActivationRule` and `RequiredRule`

* The attributes `entryCriteriaRefs` and `exitCriteriaRefs` are dropped, so that the following adjustments must be done:
<table class="table table-striped">
  <tr>
    <th>CMMN 1.0</th>
    <td>
      <code>&lt;planItem id="A_PLAN_ITEM_ID"</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <code>entryCriteriaRefs="Sentry_1 Sentry_2"</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <code>exitCriteriaRefs="Sentry_3 Sentry4" /&gt;</code>
    </td>
  </tr>
  <tr>
    <th>CMMN 1.1</th>
    <td>
      <code>&lt;planItem id="A_PLAN_ITEM_ID"&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;entryCriterion sentryRef="Sentry_1" /&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;entryCriterion sentryRef="Sentry_2" /&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;exitCriterion sentryRef="Sentry_3" /&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;exitCriterion sentryRef="Sentry_4" /&gt;</code>
      <br>
      <code>&lt;/planItem&gt;</code>
    </td>
  </tr>
</table>
If the `CasePlanModel` has any exit criteria defined, then this must be changed as follows:
<table class="table table-striped">
  <tr>
    <th>CMMN 1.0</th>
    <td>
      <code>&lt;casePlanModel id="CASE_PLAN_MODEL_ID"</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <code>exitCriteriaRefs="Sentry_2 Sentry3"&gt;</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;...
      <br>
      <code>&lt;/casePlanModel&gt;</code>
    </td>
  </tr>
  <tr>
    <th>CMMN 1.1</th>
    <td>
      <code>&lt;casePlanModel id="CASE_PLAN_MODEL_ID"&gt;</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;...
      <br>&nbsp;&nbsp;
      <code>&lt;exitCriterion sentryRef="Sentry_2" /&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;exitCriterion sentryRef="Sentry_3" /&gt;</code>
      <br>
      <code>&lt;/casePlanModel&gt;</code>
    </td>
  </tr>
</table>

* The attribute `description` is not available anymore. Instead of the `description` attribute use the `<documentation/>` element:
<table class="table table-striped">
  <tr>
    <th>CMMN 1.0</th>
    <td>
      <code>&lt;planItem id="A_PLAN_ITEM_ID"</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <code>description="This is a description of the plan item..." /&gt;</code>
    </td>
  </tr>
  <tr>
    <th>CMMN 1.1</th>
    <td>
      <code>&lt;planItem id="A_PLAN_ITEM_ID"&gt;</code>
      <br>&nbsp;&nbsp;
      <code>&lt;documentation&gt;</code>
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <code>This is a description of the plan item...</code>
      <br>&nbsp;&nbsp;
      <code>&lt;/documentation&gt;</code>
      <br>
      <code>&lt;/planItem&gt;</code>
    </td>
  </tr>
</table>
