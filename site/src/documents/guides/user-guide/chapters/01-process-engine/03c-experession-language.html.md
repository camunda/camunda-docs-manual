---

title: 'Expression Language'
category: 'Process Engine'

---

camunda BPM supports Unified Expression Language (EL), specified as part of the JSP 2.1 standard
([JSR-245][]). It therefore uses the open source [JUEL][] implementation. To get more general
information about the usage of Expression Language please read the [official documentation][].
Especially the provided [examples][examples] give a good overview of the syntax of expressions.

Within Camunda BPM, EL can be used in many circumstances to evaluate small script-like
expressions. The following table provides an overview of the BPMN elements which support
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
      <a href="#process-engine-expression-language-use-expression-language-as-conditions">
        Sequence Flows
      </a>
    </td>
    <td>Expression language as condition expression of a sequence flow</td>
  </tr>
  <tr>
    <td>
        <a href="#process-engine-expression-language-use-expression-language-as-inputoutput-parameters">
          All Tasks, All Events, Transaction, Subprocess and Connector
        </a>
    </td>
    <td>Expression language inside an inputOutput parameter mapping</td>
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

Besides Java code, Camunda BPM also supports the evaluation of expressions as delegation code.  For
general information about delegation code, see the corresponding
[section](ref:#process-engine-delegation-code).

Two types of expressions are currently supported: `camunda:expression` and
`camunda:delegateExpression`.

With `camunda:expression` it is possible to evaluate a value expression or to invoke
a method expression. You can use special variables which are available inside an expression or
Spring and CDI beans. For more information about [variables][] and [Spring][], respectively [CDI][] beans,
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

The attribute `camunda:delegateExpression` is used for expressions which evaluate to a delegate
object. This delegate object must implement either the `JavaDelegate` or `ActivityBehavior`
interface.

```xml
<!-- service task which calles a bean implementing the JavaDelegate interface -->
<serviceTask id="task1" camunda:delegateExpression="${myBean}" />

<!-- service task which calles a method which returns delegate object -->
<serviceTask id="task2" camunda:delegateExpression="${myBean.createDelegate()}" />
```


### Use Expression Language as Conditions

To use conditional sequence flows, expression language is usually used. Therefore, a
`conditionExpression` element of a sequence flow of the type `tFormalExpression` has to be used.
The text content of the element is the expression to be evaluated.

Inside the expression some special variables are available which enable the access of the current
context. To find more information about the available variables please see the [corresponding 
section][variables].

The following example shows the usage of expression language as condition of a sequence flow:

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

The following example shows an `inputParameter` which uses expression language to call a method of
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
expression. Please see the corresponding sections for [BPMN][] and [CMMN][] in the references
for more detailed examples.


## Variables and functions available inside expression language

### Process variables

All process variables of the current scope are directly available inside an expression. So a 
conditional sequence flow can directly check a variable value:

```xml
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${test == 'start'}
  </conditionExpression>
</sequenceFlow>
```

### Internal context variables

Depending on the current execution context, special built-in context variables are available while
evaluating expressions:

<table class="table">
  <thead>
    <tr>
      <th>Variable</th>
      <th>Java Type</th>
      <th>Context</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>execution</code></td>
      <td><code>DelegateExecution</code></td>
      <td>
        Available in a BPMN execution context like a service task, execution listener or sequence 
        flow.
      </td>
    </tr>
    <tr>
      <td><code>task</code></td>
      <td><code>DelegateTask</code></td>
      <td>Available in a task context like a task listener.</td>
    </tr>
    <tr>
      <td><code>caseExecution</code></td>
      <td><code>DelegateCaseExecution</code></td>
      <td>Available in a CMMN execution context.</td>
    </tr>
    <tr>
      <td><code>authenticatedUserId</code></td>
      <td><code>String</code></td>
      <td>
        The id of the currently authenticated user. Only returns a value if the id of the currently
        authenticated user has been set through the corresponding methods of the
        <code>IdentityService</code>. Otherwise it returns <code>null</code>.
      </td>
    </tr>
  </tbody>
</table>

The following example shows an expression which sets the variable `test` to the current
event name of an execution listener.

```xml
<camunda:executionListener event="start"
  expression="${execution.setVariable('test', execution.eventName)}" />
```

### External context variables with Spring and CDI

If the process engine is integrated with Spring or CDI, it is possible to access Spring and CDI
beans inside of expressions. Please see the corresponding sections for [Spring][] and [CDI][]
for more information. The following example shows the usage of a bean which implements the 
`JavaDelegate` interface as delegateExecution.

```xml
<serviceTask id="task1" camunda:delegateExpression="${myBean}" />
```

With the expression attribute any method of a bean can be called.

```xml
<serviceTask id="task2" camunda:delegateExpression="${myBean.myMethod(execution)}" />
```

### Built-in Camunda Spin functions

If Camunda Spin is available in the classpath of the engine, the special Spin functions `S`,
`XML` and `JSON` are also available inside of an expression.

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
