---

title: 'Process Task'
category: 'Tasks'

keywords: 'process task businesskey variables pass'

---

A `process task` can be used to call a BPMN 2.0 process.

<img class="img-responsive" src="ref:asset:/assets/cmmn/process-task.png"/>

A process task is a regular task that requires a `processRef` which references a process definition by its key. In practice, this means that the id of the process is used in the `processRef`. Such a process task can be defined as follows:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess" />
```

The referenced process definition is resolved at runtime. This means that the process can be deployed independently from the calling case, if needed.

An `ENABLED` process task can be started manually using the `CaseService` as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the process task instance becomes `ACTIVE`, a new process instance will be launched. In the above example a new process instance of the process `checkCreditProcess` will be created.

If a process task is `blocking` (the attribute `isBlocking` is set to `true`), the process task remains `ACTIVE` until the process instance associated with the process task is completed. After a successful completion of the called process instance the corresponding process task will be completed automatically. It is not possible to complete a `blocking` process task manually.

In case of a `non-blocking` (the attribute `isBlocking` is set to `false`) task, the process task is not waiting for the process instance to complete, and completes immediately, upon its activation and calling its associated process.

Note: The default value for the attribute `isBlocking` is `true`. To define a `non-blocking` process task the attribute `isBlocking` must be set to `false` as follows:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess" isBlocking="false" />
```

## Transactional Behavior

The activation of the process task, the call and the execution of a process instance will be performed in the same transaction. The transaction is executed until a wait state or an asynchronous continuation is reached inside the called process instance (for further details read the [Transaction in Processes](ref:/guides/user-guide/#process-engine-transactions-in-processes) section). To launch a process instance asynchronously it is possible to declare a start event asynchronous with `asyncBefore="true"` inside the process (see [Asynchronous Instantiation](ref:/api-references/bpmn20/#events-start-events-asynchronous-instantiation)).

## Process Binding

By default it will always launch a new process instance of the latest process definition. In order to call another version of a process it is possible to define a binding to specify of which process definition version a new process instance must be started. For that there is a camunda custom attribute `processBinding`. The following values are allowed for the attribute `processBinding`:

*   latest: always call the latest process definition version (which is also the default behavior if the attribute is not defined)
* 	deployment: if the process associated with the process task is part of the same deployment as the calling case, use the version from the deployment
*   version: call a fixed version of the process definition, in this case `processVersion` is required

```xml
<processTask id="checkCreditProcess" processRef="checkCreditProcess"
  camunda:processBinding="latest|deployment|version"
  camunda:processVersion="3">
</processTask>
```

Note: It is also possible to use an expression for the attribute `processVersion`, which will be resolved to an integer at runtime.

## Exchange variables

The camunda custom extensions elements `in` and `out` offer the possibility to exchange variables between the process task (in a case instance) and the process instance to which it refers: `in` elements of the process task are mapped to input variables of the launched process instance and `out` mappings of the process task are mapped to output variables of the process instance, e.g.

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in source="aCaseVariable" target="aProcessVariable" />
    <camunda:out source="aProcessVariable" target="anotherCaseVariable" />
  </extensionElements>
</processTask>
```

In the above example, the value of the input variable `aCaseVariable` will be passed to the launched process instance. Inside the process instance the value of the input variable `aCaseVariable` is available as `aProcessVariable`. After successful completion of the called process instanc, the value of the output variable `aProcessVariable` will be passed back to the calling process task, and there it will be available as `anotherCaseVariable`.

Additionally, it is also possible to use expressions:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out sourceExpression="${y+5}" target="z" />
  </extensionElements>
</processTask>
```

So, in the end `z = y+5 = x+5+5`

Furthermore, the process task can be configured to pass all variables into the called process instance and to pass all variables of the process instance back to the associated process task:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</processTask>
```

Note: The variables keep their names.


## Pass Business Key

In addition to [exchange variables](#tasks-process-task-exchange-variables) it is possible to pass a business key to the called process instance as well. But be aware that a business key cannot be changed, so it is not possible to return a business key back from a called process instance to the calling case instance.

The following example shows how the business key of the calling case instance can be passed to the called process instance. In this case the calling case instance and the called process instance would have the same business key.

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in businessKey="#{caseExecution.caseBusinessKey}" />
  </extensionElements>
</processTask>
```

If the business key of the called process instance should be different than the business key of the calling case instance, it is also possible to use an expression which, for example, references to a variable:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in businessKey="#{customerId}" />
  </extensionElements>
</processTask>
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaprocessbinding">camunda:processBinding</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaprocessversion">camunda:processVersion</a>
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
      The attribute <code>camunda:processVersion</code> should only be set if
      the attribute <code>camunda:processBinding</code> is equal to <code>version</code>
    </td>
  </tr>
</table>
