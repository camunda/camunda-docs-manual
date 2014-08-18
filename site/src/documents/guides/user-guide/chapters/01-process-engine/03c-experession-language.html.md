---

title: 'Expression Language'
category: 'Process Engine'

---

camunda BPM supports Unified Expression Language (EL), specified as part of the JSP 2.1 standard
([JSR-245][]). It therefore uses the open source [JUEL][] implementation. To get more general
information about the usage of Expression Language please read the [official documentation][].
Especially the provided [examples][examples] give a good overview of the syntax of expressions.

Within camunda BPM EL can be used in many circumstances to evaluate small script like
expression. The following table provides an overview of the BPMN elements which support
usage of EL.

<table class="table desc-table">
  <tr>
    <th>BPMN element</th>
    <th>EL support</th>
  </tr>
  <tr>
    <td>
      <a href="#process-engine-expression-language-use-expression-language-as-delegation-code">
        Service Task, Business Rule Task, Send Task,
        Message Intermediate Throwing Event, Message End Event, Execution Listener and
        Task Listener
      </a>
    </td>
    <td>Expression language as delegation code</td>
  </tr>
  <tr>
    <td>
      <a href="#process-engine-expression-language-use-expression-language-as-condition">
        Sequence Flows
      </a>
    </td>
    <td>Expression language as condition expression of a sequence flow</td>
  </tr>
  <tr>
    <td>
        <a href="#process-engine-use-expression-language-as-inputoutput-parameters">
          All Tasks, All Events, Transaction, Subprocess and Connector
        </a>
    </td>
    <td>Expression language inside a inputOutput parameter mapping</td>
  </tr>
  <tr>
    <td>
        <a href="#process-engine-expression-language-use-expression-language-as-value">
          Different Elements
        </a>
    </td>
    <td>Exression language as the value of an attribute or element</td>
  </tr>
</table>


### Use Expression Language as Delegation Code

Besides Java code, camunda BPM also supports the evaluation of expressions as delegation code.  For
general information about delegation code see the corresponding
[section](ref:#process-engine-delegation-code).

Two types of expressions are currently supported: `camunda:expression` and
`camunda:delegateExpression`.

With `camunda:expression` it is possible to evaluate a value expression or to invoke
a method expression. You can use special variables which are available inside an expression or
Spring and CDI beans. For more information about [variables][] and [Spring][] resp. [CDI][] beans
please see the corresponding sections.

```xml
<process id="process">
  <extensionElements>
    <!-- execution listener which uses an expression to set a process variable -->
    <camunda:executionListener event="start" expression="${execution.setVariable('test', 'foo')}" />
  </extensionElements>

  <!-- ... -->

  <userTask id="userTask">
    <extensionElements>
      <!-- task listener which calls a method of a bean with current task as parameter -->
      <camunda:taskListener event="complete" expression="${myBean.taskDone(task)}" />
    </extensionElements>
  </userTask>

  <!-- ... -->

  <!-- service task which evaluates an expression and saves it in a result variable -->
  <serviceTask id="serviceTask"
      camunda:expression="${myBean.ready}" camunda:resultVariable="myVar" />

  <!-- ... -->

</process>
```

The attribute `camunda:delegateExpression` is used for expressions which evaluates to an delegate
object. This delegate object must implement either the `JavaDelegate` or `ActivityBehavior`
interface.

```xml
<!-- service task which calles a bean implementing the JavaDelegate interface -->
<serviceTask id="task1" camunda:delegateExpression="${myBean}" />

<!-- service task which calles a method which returns delegate object -->
<serviceTask id="task2" camunda:delegateExpression="${myBean.createDelegate()}" />
```


### Use Expression Language as Conditions

To use conditional sequence flows usually expression language is used. Therefore a
`conditionExpression` element of a sequence flow has to be used of the type `tFormalExpression`.
The text content of the element is the expression to be evaluated.

Inside the expression some special variables are available which enable the access of the current
context. To find more information about the available variables please see the [corresponding
section][variables].

The following example show the usage of expression language as condition of a sequence flow:

```xml
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${test == 'foo'}
  </conditionExpression>
</sequenceFlow>
```


### Use Expression Language as inputOutput Parameters

With the camunda `inputOutput` extension element you can map an `inputParameter` or `outputParameter`
with expression language.

Inside the expression some special variables are available which enable the access of the current
context. To find more information about the available variables please see the [corresponding
section][variables].

The following example show a `inputParameter` which uses expression language to call a method of
a bean.

```xml
<serviceTask id="task" camunda:class="org.camunda.bpm.example.SumDelegate">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="x">
        ${myBean.calculateX()}
      </camunda:inputParameter>
    </camunda:inputOutput>
  </extensionElements>
</serviceTask>
```


### Use Expression Language as Value

Different BPMN and CMMN elements allow to specify their content or an attribute value by an
expression. Please see the corresponding section for [BPMN][] and [CMMN][] in the references
for more detailed examples.


## Variables available inside expression language

Depending on the current execution context different variables are available inside expression
language.

In an execution context like a service task, execution listener or sequence flow the variable
`execution` is available. In a task context like a task listener the variable `task` exists. And in
a CMMN context also the variable `caseExecution` exists. They correspond to the interfaces
`DelegateExecution`, `DelegateTask` resp. `DelegateCaseExecution`.

With the variable `authenticatedUserId` the id of the current authenticated user can be accessed.

The following example shows an expression which sets the variable `test` to the current
event name of an execution listener.

```xml
<camunda:executionListener event="start"
  expression="${execution.setVariable('test', execution.eventName)}" />
```

Also all process variables of the current scope are directly available inside an
expression. So a conditional sequence flow can directly check a variable.

```xml
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${test == 'start'}
  </conditionExpression>
</sequenceFlow>
```

Additionally it is possible to use Spring and CDI beans inside of expressions. Please see
the corresponding sections for [Spring][] and [CDI][] for more information. The following
example shows the usage of a bean which implements the JavaDelegate interface as delegateExecution.
With the expression attribute any method of a bean can be called.

```xml
<serviceTask id="task1" camunda:delegateExpression="${myBean}" />

<serviceTask id="task2" camunda:delegateExpression="${myBean.myMethod(execution)}" />
```

If camunda Spin is available in the classpath of the engine also the special Spin methods `S`,
`XML` and `JSON` are available inside of an expression.

```xml
<serviceTask id="task" camunda:expression="${XML(xml).attr('test').value()}" resultVariable="test" />
```


[JSR-245]: http://jcp.org/aboutJava/communityprocess/final/jsr245/
[JUEL]: http://juel.sourceforge.net/
[official documentation]: http://docs.oracle.com/javaee/5/tutorial/doc/bnahq.html
[examples]: http://docs.oracle.com/javaee/5/tutorial/doc/bnahq.html#bnain
[variables]: #process-engine-expression-language-variables-available-inside-expression-language
[Spring]: #spring-framework-integration-expression-resolving
[CDI]: #cdi-and-java-ee-integration-expression-resolving
[BPMN]: ref:/api-references/bpmn20/
[CMMN]: ref:/api-references/cmmn10/
