---

title: 'Case Task'
category: 'Tasks'

keywords: 'case task businesskey variables pass'

---

A `case task` can be used to call another CMMN 1.0 case.

<img class="img-responsive" src="ref:asset:/assets/cmmn/case-task.png"/>

A case task is a regular task that requires a `caseRef` which references a case definition by its key. In practice, this means that the id of the case is used in the `caseRef`. Such a case task can be defined as follows:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase" />
```

The referenced case definition is resolved at runtime. This means that the referenced case can be deployed independently from the calling case, if needed.

An `ENABLED` case task can be started manually using the `CaseService` as follows:

```java
caseService
  .withCaseExecution("aCaseExecutionId")
  .manualStart();
```

When the case task instance becomes `ACTIVE`, a new case instance will be launched. In the above example a new case instance of the case `checkCreditCase` will be created.

If a case task is `blocking` (the attribute `isBlocking` is set to `true`), the case task remains `ACTIVE` until the case instance associated with the case task is completed. After a completion of the called case instance the corresponding case task will be completed automatically. It is not possible to complete a `blocking` case task manually.

In case of a `non-blocking` (the attribute `isBlocking` is set to `false`) task, the case task is not waiting for the case instance to complete, and completes immediately, upon its activation and calling its associated case.

Note: The default value for the attribute `isBlocking` is `true`. To define a `non-blocking` case task the attribute `isBlocking` must be set to `false` as follows:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase" isBlocking="false" />
```

## Transactional Behavior

The activation of the case task, the call and the execution of a case instance will be performed in the same transaction.

## Case Binding

As per default it will always launched a new case instance of the latest case definition. In order to call another version of a case it is possible to define a binding to specify of which case definition version a new case instance must be started. Therefore there exists a camunda custom attribute `caseBinding`. The following values are allowed for the attribute `caseBinding`:

*   latest: always call the latest case definition version (which is also the default behavior if the attribute is not defined)
*   deployment: if the case associated with the case task is part of the same deployment as the calling case, use the version from deployment
*   version: call a fixed version of the case definition, in this case `caseVersion` is required

```xml
<caseTask id="checkCreditCase" caseRef="checkCreditCase"
  camunda:caseBinding="latest|deployment|version"
  camunda:caseVersion="3">
</caseTask>
```

Note: It is also possible to use an expression for the attribute `caseVersion`, which will be resolved at runtime to an integer.

## Exchange variables

The camunda custom extensions elements `in` and `out` offers the possibility to exchange variables between the case task (in a case instance) and the called case instance to which it refers: `in` elements of the case task are mapped to input variables of the launched case instance, and `out` mappings of the case task are mapped to output variables of the called case instance, e.g.

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in source="aCaseVariable" target="aSubCaseVariable" />
    <camunda:out source="aSubCaseVariable" target="anotherCaseVariable" />
  </extensionElements>
</caseTask>
```

In the above example the value of the input variable `aCaseVariable` will be passed to the launched case instance. Inside the case instance the value of the input variable `aCaseVariable` is available as `aSubCaseVariable`. After a successful completion of the called case instance the value of the output variable `aSubCaseVariable` will be passed back to the calling case task, and there it is available as `anotherCaseVariable`.

Additionally it is possible to use expressions as well:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out sourceExpression="${y+5}" target="z" />
  </extensionElements>
</caseTask>
```

So, in the end `z = y+5 = x+5+5`

Furthermore, the case task can be configured to pass all variables into the called case instance, and to pass all variables of the case instance back to the associated case task:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</caseTask>
```

Note: The variables keeps their name.


## Pass Business Key

In addition to [exchange variables](#tasks-case-task-exchange-variables) it is possible to pass a business key to the called case instance as well. But be aware that a business key cannot be changed, so that it is not possible to return back a business key from a called case instance to the calling case instance.

The following example shows how the business key of the calling case instance can be passed to the called case instance. In that case the calling case instance and the called case instance would have the same business key.

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in businessKey="#{caseExecution.caseBusinessKey}" />
  </extensionElements>
</caseTask>
```

If the business key of the called case instance should be different than the business key of the calling case instance, it is also possible to use an expression which for example references to a variable:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in businessKey="#{customerId}" />
  </extensionElements>
</caseTask>
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacasebinding">camunda:caseBinding</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacaseversion">camunda:caseVersion</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundain">camunda:in</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaout">camunda:out</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The attribute <code>camunda:caseVersion</code> should only be set if
      the attribute <code>camunda:caseBinding</code> equals <code>version</code>
    </td>
  </tr>
</table>
