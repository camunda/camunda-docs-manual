---

title: 'Process Task'
weight: 20

menu:
  main:
    identifier: "cmmn-ref-tasks-process"
    parent: "cmmn-ref-tasks"
    pre: "Allows invoking a BPMN 2.0 Process."

---

A *process task* can be used to invoke a BPMN 2.0 process from a case.

{{< cmmn-symbol type="process-task" >}}

A process task is a regular task that requires an attribute `processRef` which references a process definition by its key. Such a process task can be defined as follows:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess" />
```

The referenced process definition is resolved at runtime. This means that the process can be deployed independently from the calling case, if needed.

A process task in state `ENABLED` can be started manually using the `CaseService` as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the process task instance becomes `ACTIVE`, a new process instance is launched. In the above example a new process instance of the process `checkCreditProcess` is created.

If a process task is *blocking* (i.e., the attribute `isBlocking` is set to `true`), the process task remains `ACTIVE` until the process instance associated with the process task is completed. After a successful completion of the called process instance, the corresponding process task completes automatically. It is not possible to complete a blocking process task manually.

In case of a *non-blocking* (the attribute `isBlocking` is set to `false`) task, the process task is not waiting for the process instance to complete and completes immediately after its activation and calling its associated process.

Note: The default value for the attribute `isBlocking` is `true`. To define a `non-blocking` process task the attribute `isBlocking` must be set to `false` as follows:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess" isBlocking="false" />
```

# Transactional Behavior

The activation of the process task as well as the creation and execution of the process instance are performed in the same transaction. The transaction is executed until a wait state or an asynchronous continuation is reached inside the called process instance (for further details read the [Transactions in Processes]({{< relref "user-guide/process-engine/transactions-in-processes.md" >}}) section of the user guide). To launch a process instance asynchronously it is possible to declare the process' start event as asynchronous with the XML attribute `asyncBefore="true"`  (see [Asynchronous Instantiation]({{< relref "reference/bpmn20/events/start-events.md" >}})).

# Process Binding

By default, the process task creates a new process instance of the latest process definition with the specified key. In order to specify a different version of a process, it is possible to define a binding with the Camunda custom attribute `processBinding`. The following values are allowed for the attribute `processBinding`:

* `latest`: use the latest process definition version (which is also the default behavior if the attribute is not defined)
* `deployment`: use the process definition version that is part of the calling case definition's deployment (note: this requires that a process with the specified key is deployed along with the case definition)
* `version`: use a fixed version of the process definition, in this case the attribute `processVersion` is required

The following is an example of a process task that calls the `checkCreditProcess` process with version 3.

```xml
<processTask id="checkCreditProcess" processRef="checkCreditProcess"
  camunda:processBinding="version"
  camunda:processVersion="3">
</processTask>
```

Note: It is also possible to use an expression for the attribute `processVersion` that must resolve to an integer when the task is executed.

# Exchange Variables

The Camunda custom extensions elements `in` and `out` allow to exchange variables between the process task (in a case instance) and the process instance that it creates: `in` elements of a process task map case variables to input variables of the launched process instance and `out` mappings of a process task map output variables of the process instance to case variables, e.g.,

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in source="aCaseVariable" target="aProcessVariable" />
    <camunda:out source="aProcessVariable" target="anotherCaseVariable" />
  </extensionElements>
</processTask>
```

In the above example, the value of the input variable `aCaseVariable` is passed to the newly created process instance. Inside the process instance, the value of the input variable `aCaseVariable` is available as `aProcessVariable`. After successful completion of the called process instance, the value of the output variable `aProcessVariable` is passed back to the calling process task where it can be accessed by the name `anotherCaseVariable`.

In addition, it is possible to use expressions:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out sourceExpression="${y+5}" target="z" />
  </extensionElements>
</processTask>
```

Assuming `y` is not updated by the process instance, the following holds after the process task completes: `z = y+5 = x+5+5`.

Source expressions are evaluated in the context of the called process instance. That means, in cases where calling and called case/process definitions belong to different process applications, context like Java classes, Spring or CDI beans are resolved from the process application the called process definition belongs to.

Furthermore, the process task can be configured to pass all variables to the called process instance and to pass all variables of the process instance back to the associated process task:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</processTask>
```

Note: The variables keep their names.

It is possible to decide at runtime which variables are mapped into the called process instance. This can be declared with the `local` attribute on the `camunda:in` element as follows:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in variables="all" local="true"/>
  </extensionElements>
</processTask>
```

With this setting, only local variables are going to be mapped. These can be set via the `CaseService` before starting the process instance. Consider the following code to manually start a process task:

```
caseService
  .withCaseExecution(processTaskExecutionId)
  .setVariable("var1", "abc")
  .setVariableLocal("var2", "def")
  .manualStart();
```

With `local="true"` for the `in` mapping, only `var2` is mapped into the called process instance.

# Pass a Business Key

In addition to [exchanging variables]({{< relref "reference/cmmn10/tasks/process-task.md#exchange-variables" >}}), it is possible to pass a business key to the called process instance. Since a business key is immutable, this is one way mapping. It is not possible to have output mapping for a business key.

The following example shows how the business key of the calling case instance can be passed to the called process instance. In this case, the calling case instance and the called process instance end up with the same business key.

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in businessKey="#{caseExecution.caseBusinessKey}" />
  </extensionElements>
</processTask>
```

If the business key of the called process instance should be different than the business key of the calling case instance, it is possible to use an expression that, for example, references a variable:

```xml
<processTask id="checkCreditProcess" name="Check credit" processRef="checkCreditProcess">
  <extensionElements>
    <camunda:in businessKey="#{customerId}" />
  </extensionElements>
</processTask>
```

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#processbinding" >}}">camunda:processBinding</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#processversion" >}}">camunda:processVersion</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#in" >}}">camunda:in</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#out" >}}">camunda:out</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#caseexecutionlistener" >}}">camunda:caseExecutionListener</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>
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
