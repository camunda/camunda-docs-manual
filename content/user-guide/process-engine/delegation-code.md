---

title: 'Delegation Code'
weight: 60

menu:
  main:
    identifier: "user-guide-process-engine-delegation-code"
    parent: "user-guide-process-engine"

---


Delegation Code allows you to execute external Java code, scripts or evaluate expressions when
certain events occur during process execution.

There are different types of Delegation Code:

* **Java Delegates** can be attached to a [BPMN Service Task]({{< relref "reference/bpmn20/tasks/service-task.md" >}}).
* **Delegate Variable Mapping** can be attached to a [Call Activity]({{< relref "reference/bpmn20/subprocesses/call-activity.md" >}}).
* **Execution Listeners** can be attached to any event within the normal token flow, e.g., starting a process instance or entering an activity.
* **Task Listeners** can be attached to events within the user task lifecycle, e.g., creation or completion of a user task.

You can create generic Delegation Code and configure this via the BPMN 2.0 XML using so called Field Injection.


# Java Delegate

To implement a class that can be called during process execution, this class needs to implement the `org.camunda.bpm.engine.delegate.JavaDelegate`
interface and provide the required logic in the `execute`
method. When process execution arrives at this particular step, it
will execute this logic defined in that method and leave the activity
in the default BPMN 2.0 way.

As an example let's create a Java class that can be used to change a
process variable String to uppercase. This class needs to implement
the `org.camunda.bpm.engine.delegate.JavaDelegate`
interface, which requires us to implement the `execute(DelegateExecution)`
method. It's this operation that will be called by the engine and
which needs to contain the business logic. Process instance
information such as process variables and other information can be accessed and
manipulated through the {{< javadocref page="?org/camunda/bpm/engine/delegate/DelegateExecution.html" text="DelegateExecution" >}} interface (click on the link for a detailed Javadoc of its operations).

```java
  public class ToUppercase implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {
      String var = (String) execution.getVariable("input");
      var = var.toUpperCase();
      execution.setVariable("input", var);
    }

}
```

{{< note title="Note!" class="info" >}}
Each time a delegation class referencing activity is executed, a separate instance of this class will be created. This means that each time an activity is executed there will be used another instance of the class to call `execute(DelegateExecution)`.
{{< /note >}}

The classes that are referenced in the process definition (i.e., by using
`camunda:class`  ) are **NOT instantiated during deployment**.
Only when a process execution arrives at the point in the process where the class is used for the
first time, an instance of that class will be created. If the class cannot be found,
a `ProcessEngineException` will be thrown. The reason for this is that the environment (and
more specifically the classpath) when you are deploying is often different than the actual runtime
environment.


# Activity Behavior

Instead of writing a Java Delegate, it is also possible to provide a class that implements the `org.camunda.bpm.engine.impl.pvm.delegate.ActivityBehavior`
interface. Implementations then have access to the more powerful `ActivityExecution` that for example also allows to influence the control flow of the process. However, note that this is not a very good practice and should be avoided as much as possible. So, it is advised to only use the `ActivityBehavior` interface for advanced use cases and if you know exactly what you're doing.


# Field Injection

It is possible to inject values into the fields of the delegated classes. The following types of injection are supported:

* Fixed string values
* Expressions

If available, the value is injected through a public setter method on
your delegated class, following the Java Bean naming conventions (e.g.,
field `firstName` has setter `setFirstName(...)`).
If no setter is available for that field, the value of private
member will be set on the delegate (but using private fields is **not** recommended - see warning below).

**Regardless of the type of value declared in the process-definition, the type of the
setter/private field on the injection target should always be `org.camunda.bpm.engine.delegate.Expression`**.

{{< note title="" class="warning" >}}
  Private fields cannot always be modified! It does **not work** with e.g.,
  CDI beans (because you have proxies instead of real objects) or with some SecurityManager configurations.
  Please always use a public setter-method for the fields you want to have injected!
{{< /note >}}

The following code snippet shows how to inject a constant value into a field.
Field Injection is supported when using the `class` or `delegateExpression` attribute. Note that we need
to declare a `extensionElements` XML element before the actual field injection
declarations, which is a requirement of the BPMN 2.0 XML Schema.

```xml
  <serviceTask id="javaService"
               name="Java service invocation"
               camunda:class="org.camunda.bpm.examples.bpmn.servicetask.ToUpperCaseFieldInjected">
    <extensionElements>
        <camunda:field name="text" stringValue="Hello World" />
    </extensionElements>
  </serviceTask>
```

The class `ToUpperCaseFieldInjected` has a field
`text` which is of type `org.camunda.bpm.engine.delegate.Expression`.
When calling `text.getValue(execution)`, the configured string value
`Hello World` will be returned.

Alternatively, for longs texts (e.g., an inline e-mail) the `camunda:string` sub element can be
used:

```xml
  <serviceTask id="javaService"
               name="Java service invocation"
               camunda:class="org.camunda.bpm.examples.bpmn.servicetask.ToUpperCaseFieldInjected">
    <extensionElements>
      <camunda:field name="text">
          <camunda:string>
            Hello World
        </camunda:string>
      </camunda:field>
    </extensionElements>
  </serviceTask>
```

To inject values that are dynamically resolved at runtime, expressions
can be used. Those expressions can use process variables, CDI or Spring
beans. As already noted, a separate instance of the Java class will be created
each time the service task is executed. To have dynamic injection of
values in fields, you can inject value and method expressions in an
`org.camunda.bpm.engine.delegate.Expression`
which can be evaluated/invoked using the `DelegateExecution`
passed in the `execute` method.

```xml
  <serviceTask id="javaService" name="Java service invocation"
               camunda:class="org.camunda.bpm.examples.bpmn.servicetask.ReverseStringsFieldInjected">

    <extensionElements>
      <camunda:field name="text1">
        <camunda:expression>${genderBean.getGenderString(gender)}</camunda:expression>
      </camunda:field>
      <camunda:field name="text2">
         <camunda:expression>Hello ${gender == 'male' ? 'Mr.' : 'Mrs.'} ${name}</camunda:expression>
      </camunda:field>
    </extensionElements>
  </serviceTask>
```

The example class below uses the injected expressions and resolves
them using the current `DelegateExecution`.

```java
  public class ReverseStringsFieldInjected implements JavaDelegate {

    private Expression text1;
    private Expression text2;

    public void execute(DelegateExecution execution) {
      String value1 = (String) text1.getValue(execution);
      execution.setVariable("var1", new StringBuffer(value1).reverse().toString());

      String value2 = (String) text2.getValue(execution);
      execution.setVariable("var2", new StringBuffer(value2).reverse().toString());
    }
  }
```

Alternatively, you can also set the expressions as an attribute instead of a child-element, to make the XML less verbose.

```xml
  <camunda:field name="text1" expression="${genderBean.getGenderString(gender)}" />
  <camunda:field name="text2" expression="Hello ${gender == 'male' ? 'Mr.' : 'Mrs.'} ${name}" />
```

{{< note title="Note!" class="info" >}}
  The injection happens each time the service task is called since a separate instance of the class will be created. When the fields are altered by your code, the values will be re-injected when the activity is executed next time.
{{< /note >}}

{{< note title="" class="warning" >}}
  For the same reasons as mentioned above, field injection should not be (usually) used which Spring beans, which are singletons by default. Otherwise you may run into incostistencies due to concurrent modification of the bean fields.
{{< /note >}}

# Delegate Variable Mapping

To implement a class that delegates the input and output variable mapping for a call activity, this class needs to implement the `org.camunda.bpm.engine.delegate.DelegateVariableMapping`
interface. The implementation must provide the methods `mapInputVariables(DelegateExecution, VariableMap)` and `mapOutputVariables(DelegateExecution, VariableScope)`.
See the following example:

```java
public class DelegatedVarMapping implements DelegateVariableMapping {

  @Override
  public void mapInputVariables(DelegateExecution execution, VariableMap variables) {
    variables.putValue("inputVar", "inValue");
  }

  @Override
  public void mapOutputVariables(DelegateExecution execution, VariableScope subInstance) {
    execution.setVariable("outputVar", "outValue");
  }
}
```

The `mapInputVariables` method is called before the call activity is executed, to map the input variables.
The input variables should be put into the given variables map.
The `mapOutputVariables` method is called after the call activity was executed, to map the output variables.
The output variables can be directly set into the caller execution.
The behavior of the class loading is similar to the class loading on [Java Delegates]({{< relref "user-guide/process-engine/delegation-code.md#java-delegate" >}}).


# Execution Listener

Execution listeners allow you to execute external Java code or evaluate an expression when certain events occur during process execution. The events that can be captured are:

* Start and end of a process instance.
* Taking a transition.
* Start and end of an activity.
* Start and end of a gateway.
* Start and end of intermediate events.
* Ending a start event or starting an end event.

The following process definition contains 3 execution listeners:

```xml
  <process id="executionListenersProcess">
    <extensionElements>
      <camunda:executionListener
          event="start"
          class="org.camunda.bpm.examples.bpmn.executionlistener.ExampleExecutionListenerOne" />
    </extensionElements>

    <startEvent id="theStart" />

    <sequenceFlow sourceRef="theStart" targetRef="firstTask" />

    <userTask id="firstTask" />

    <sequenceFlow sourceRef="firstTask" targetRef="secondTask">
      <extensionElements>
        <camunda:executionListener>
          <camunda:script scriptFormat="groovy">
            println execution.eventName
          </camunda:script>
        </camunda:executionListener>
      </extensionElements>
    </sequenceFlow>

    <userTask id="secondTask">
      <extensionElements>
        <camunda:executionListener expression="${myPojo.myMethod(execution.eventName)}" event="end" />
      </extensionElements>
    </userTask>

    <sequenceFlow sourceRef="secondTask" targetRef="thirdTask" />

    <userTask id="thirdTask" />

    <sequenceFlow sourceRef="thirdTask" targetRef="theEnd" />

    <endEvent id="theEnd" />
  </process>
```

The first execution listener is notified when the process starts. The listener is an external Java-class (like ExampleExecutionListenerOne) and should implement the `org.camunda.bpm.engine.delegate.ExecutionListener` interface. When the event occurs (in this case end event) the method `notify(DelegateExecution execution)` is called.

```java
  public class ExampleExecutionListenerOne implements ExecutionListener {

    public void notify(DelegateExecution execution) throws Exception {
      execution.setVariable("variableSetInExecutionListener", "firstValue");
      execution.setVariable("eventReceived", execution.getEventName());
    }
  }
```

It is also possible to use a delegation class that implements the `org.camunda.bpm.engine.delegate.JavaDelegate` interface. These delegation classes can then be reused in other constructs, such as a delegation for a service task.

The second execution listener is called when the transition is taken. Note that the listener element
doesn't define an event, since only take events are fired on transitions. Values in the event
attribute are ignored when a listener is defined on a transition. Also it contains a
[camunda:script][camunda-script] child element which defines a script which
will be executed as execution listener. Alternatively it is possible to specify the script source
code as external resources (see the documenation about [script sources][script-sources] of script
tasks).

The last execution listener is called when activity secondTask ends. Instead of using the class on the listener declaration, a expression is defined instead which is evaluated/invoked when the event is fired.

```xml
  <camunda:executionListener expression="${myPojo.myMethod(execution.eventName)}" event="end" />
```

As with other expressions, execution variables are resolved and can be used. Because the execution implementation object has a property that exposes the event name, it's possible to pass the event-name to your methods using execution.eventName.

Execution listeners also support using a delegateExpression, similar to a service task.

```xml
  <camunda:executionListener event="start" delegateExpression="${myExecutionListenerBean}" />
```


# Task Listener

A task listener is used to execute custom Java logic or an expression upon the occurrence of a certain task-related event. It can only be added in the process definition as a child element of a user task. Note that this also must happen as a child of the BPMN 2.0 extensionElements and in the Camunda namespace, since a task listener is a construct specifically for the Camunda engine.

```xml
  <userTask id="myTask" name="My Task" >
    <extensionElements>
      <camunda:taskListener event="create" class="org.camunda.bpm.MyTaskCreateListener" />
    </extensionElements>
  </userTask>
```

A task listener supports following attributes:

* **event (required)**: the type of task event on which the task listener will be invoked. Possible events are:
    * **create**: occurs when the task has been created and all task properties are set.
    * **assignment**: occurs when the task is assigned to somebody. Note: when process execution arrives in a userTask, an assignment event will be fired first, before the create event is fired. This might seem like an unnatural order but the reason is pragmatic: when receiving the create event, we usually want to inspect all properties of the task, including the assignee.
    * **complete**: occurs when the task is completed and just before the task is deleted from the runtime data.
    * **delete**: occurs just before the task is deleted from the runtime data.


* **class**: the delegation class that must be called. This class must implement the `org.camunda.bpm.engine.impl.pvm.delegate.TaskListener` interface.

    ```java
    public class MyTaskCreateListener implements TaskListener {

      public void notify(DelegateTask delegateTask) {
        // Custom logic goes here
      }

    }
    ```

    It is also possible to use Field Injection to pass process variables or the execution to the delegation class. Note that each time a delegation class referencing activity is executed, a separate instance of this class will be created.

* **expression**: (cannot be used together with the class attribute): specifies an expression that will be executed when the event happens. It is possible to pass the DelegateTask object and the name of the event (using task.eventName) to the called object as parameters.

    ```xml
    <camunda:taskListener event="create" expression="${myObject.callMethod(task, task.eventName)}" />
    ```

* **delegateExpression**: allows to specify an expression that resolves to an object implementing the TaskListener interface, similar to a service task.

    ```xml
    <camunda:taskListener event="create" delegateExpression="${myTaskListenerBean}" />
    ```

Besides the `class`, `expression` and `delegateExpression` attributes, a
[camunda:script][camunda-script] child element can be used to specify a script as task listener.
An external script resource can also be declared with the resource attribute of the
`camunda:script` element (see the documenation about [script sources][script-sources] of script
tasks).

```xml
  <userTask id="task">
    <extensionElements>
      <camunda:taskListener event="create">
        <camunda:script scriptFormat="groovy">
          println task.eventName
        </camunda:script>
      </camunda:taskListener>
    </extensionElements>
  </userTask>
```


# Field Injection on Listener

When using listeners configured with the class attribute, Field Injection can be applied. This is exactly the same mechanism as described for Java Delegates, which contains an overview of the possibilities provided by field injection.

The fragment below shows a simple example process with an execution listener with fields injected:

```xml
  <process id="executionListenersProcess">
    <extensionElements>
      <camunda:executionListener class="org.camunda.bpm.examples.bpmn.executionListener.ExampleFieldInjectedExecutionListener" event="start">
        <camunda:field name="fixedValue" stringValue="Yes, I am " />
        <camunda:field name="dynamicValue" expression="${myVar}" />
      </camunda:executionListener>
    </extensionElements>

    <startEvent id="theStart" />
    <sequenceFlow sourceRef="theStart" targetRef="firstTask" />

    <userTask id="firstTask" />
    <sequenceFlow sourceRef="firstTask" targetRef="theEnd" />

    <endEvent id="theEnd" />
  </process>
```

The actual listener implementation may look as follows:

```java
  public class ExampleFieldInjectedExecutionListener implements ExecutionListener {

    private Expression fixedValue;

    private Expression dynamicValue;

    public void notify(DelegateExecution execution) throws Exception {
      String value =
        fixedValue.getValue(execution).toString() +
        dynamicValue.getValue(execution).toString();

      execution.setVariable("var", value);
    }
  }
```

The class `ExampleFieldInjectedExecutionListener` concatenates the 2 injected fields (one fixed and the other dynamic) and stores this in the process variable _var_.

```java
  @Deployment(resources = {
    "org/camunda/bpm/examples/bpmn/executionListener/ExecutionListenersFieldInjectionProcess.bpmn20.xml"
  })
  public void testExecutionListenerFieldInjection() {
    Map<String, Object> variables = new HashMap<String, Object>();
    variables.put("myVar", "listening!");

    ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("executionListenersProcess", variables);

    Object varSetByListener = runtimeService.getVariable(processInstance.getId(), "var");
    assertNotNull(varSetByListener);
    assertTrue(varSetByListener instanceof String);

    // Result is a concatenation of fixed injected field and injected expression
    assertEquals("Yes, I am listening!", varSetByListener);
  }
```


# Access Process Engine Services

It is possible to access the public API services (`RuntimeService`, `TaskService`, `RepositoryService` ...) from the Delegation Code. The following is an example showing
how to access the `TaskService` from a `JavaDelegate` implementation.

```java
  public class DelegateExample implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {
      TaskService taskService = execution.getProcessEngineServices().taskService();
      taskService.createTaskQuery()...;
    }

  }
```


# Throw BPMN Errors from Delegation Code

In the above example the error event is attached to a service task. In order to get this to work the service task has to throw the corresponding error. This is done by using a provided Java exception class from within your Java code (e.g., in the JavaDelegate):

```java
public class BookOutGoodsDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    try {
        ...
    } catch (NotOnStockException ex) {
        throw new BpmnError(NOT_ON_STOCK_ERROR);
    }
  }

}
```

{{< note title="Note!" class="info" >}}

Throwing a `BpmnError` in the delegation code behaves like modeling an error end event. See the [reference guide]({{< relref "reference/bpmn20/events/error-events.md#error-boundary-event" >}}) about the details on the behavior, especially the error boundary event. If no error boundary event is found on the scope, the execution is ended.

{{< /note >}}

[script-sources]: {{< relref "user-guide/process-engine/scripting.md#script-source" >}}
[camunda-script]: {{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-script" >}}
