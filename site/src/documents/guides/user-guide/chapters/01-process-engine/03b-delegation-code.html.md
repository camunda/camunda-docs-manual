---

title: 'Delegation Code'
category: 'Process Engine'

---

Delegation Code allows you to execute external Java code, evaluate expressions or scripts when
certain events occur during process execution.

There are different types of Delegation Code:

* __Java Delegates__ can be attached to a [BPMN ServiceTask](ref:/api-references/bpmn20/#tasks-service-task).
* __Execution Listeners__ can be attached to any event within the normal token flow, e.g. starting a process instance or entering an activity.
* __Task Listeners__ can be attached to events within the user task lifecycle, e.g. creation or completion of a user task.

You can create generic delegation code and configure this via the BPMN 2.0 XML using so called Field Injection.


## Java Delegate

To implement a class that can be called during process execution, this class needs to implement the <code>org.camunda.bpm.engine.delegate.JavaDelegate</code>
interface and provide the required logic in the <code>execute</code>
method. When process execution arrives at this particular step, it
will execute this logic defined in that method and leave the activity
in the default BPMN 2.0 way.

As an example let's create a Java class that can be used to change a
process variable String to uppercase. This class needs to implement
the <code>org.camunda.bpm.engine.delegate.JavaDelegate</code>
interface, which requires us to implement the <code>execute(DelegateExecution)</code>
method. It's this operation that will be called by the engine and
which needs to contain the business logic. Process instance
information such as process variables and other information can be accessed and
manipulated through the <a href="ref:/api-references/javadoc/?org/camunda/bpm/engine/delegate/DelegateExecution.html">DelegateExecution</a> interface (click on the link for
a detailed Javadoc of its operations).


    public class ToUppercase implements JavaDelegate {

      public void execute(DelegateExecution execution) throws Exception {
        String var = (String) execution.getVariable("input");
        var = var.toUpperCase();
        execution.setVariable("input", var);
      }

    }

Note: there will be <strong>only one instance of that Java class created for the serviceTask it is
defined on</strong>. All process-instances share the same class instance that
will be used to call <class>execute(DelegateExecution)</class>.
This means that the class must not use any member variables and must
be thread-safe, since it can be executed simultaneously from different
threads. This also influences the way Field Injection is handled.

The classes that are referenced in the process definition (i.e. by using
<code>camunda:class</code>  ) are <strong>NOT instantiated
during deployment</strong>. Only when a process execution arrives at the point in the process where the class is used for the
first time, an instance of that class will be created. If the class cannot be found,
a <code>ProcessEngineException</code> will be thrown. The reason for this is that the environment (and
more specifically the classpath) when you are deploying is often different than the actual runtime
environment.






## Activity Behavior

Instead of writing a Java Delegate is also possible to provide a class that implements the `org.camunda.bpm.engine.impl.pvm.delegate.ActivityBehavior`
interface. Implementations then have access to the more powerful <code>ActivityExecution</code> that for example also allows to influence the control flow of the process. However, note that this is not a very good practice and should be avoided as much as possible. So, it is advised to use the <code>ActivityBehavior</code> interface only for advanced use cases and if you know exactly what you're doing.




## Field Injection

It's possible to inject values into the fields of the delegated classes. The following types of injection are supported:

* Fixed string values
* Expressions

If available, the value is injected through a public setter method on
your delegated class, following the Java Bean naming conventions (e.g.
field <code>firstName</code> has setter <code>setFirstName(...)</code>).
If no setter is available for that field, the value of private
member will be set on the delegate (but using private fields is <strong>not</strong> recommended - see warning below).

<strong>Regardless of the type of value declared in the process-definition, the type of the
setter/private field on the injection target should always be <code>org.camunda.bpm.engine.delegate.Expression</code></strong>.

<div class="alert alert-info"><p>
  Private fields cannot always be modified! It does <strong>not work</strong> with e.g.
  CDI beans (because you have proxies instead of real objects) or with some SecurityManager configurations.
  Please always use a public setter-method for the fields you want to have injected!
</p></div>

The following code snippet shows how to inject a constant value into a field.
Field Injection is supported when using the <class>class</class> attribute. Note that we need
to declare a <code>extensionElements</code> XML element before the actual field injection
declarations, which is a requirement of the BPMN 2.0 XML Schema.

    <serviceTask id="javaService"
                 name="Java service invocation"
                 camunda:class="org.camunda.bpm.examples.bpmn.servicetask.ToUpperCaseFieldInjected">
      <extensionElements>
          <camunda:field name="text" stringValue="Hello World" />
      </extensionElements>
    </serviceTask>
The class <code>ToUpperCaseFieldInjected</code> has a field
<code>text</code> which is of type <code>org.camunda.bpm.engine.delegate.Expression</code>.
When calling <code>text.getValue(execution)</code>, the configured string value
<code>Hello World</code> will be returned.

Alternatively, for longs texts (e.g. an inline e-mail) the <code>camunda:string</code> sub element can be
used:

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
To inject values that are dynamically resolved at runtime, expressions
can be used. Those expressions can use process variables, CDI or Spring
beans. As already noted, an instance of the Java class is shared among
all process-instances in a service task. To have dynamic injection of
values in fields, you can inject value and method expressions in a
<code>org.camunda.bpm.engine.delegate.Expression</code>
which can be evaluated/invoked using the <code>DelegateExecution</code>
passed in the <code>execute</code> method.

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
The example class below uses the injected expressions and resolves
them using the current <code>DelegateExecution</code>.

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
Alternatively, you can also set the expressions as an attribute instead of a child-element, to make the XML less verbose.

    <camunda:field name="text1" expression="${genderBean.getGenderString(gender)}" />
    <camunda:field name="text1" expression="Hello ${gender == 'male' ? 'Mr.' : 'Mrs.'} ${name}" />
<strong> Since the Java class instance is reused, the injection only happens once, when the
serviceTask is called the first time. When the fields are altered by your code, the values won't be re-injected so you should treat them
as immutable and not make any changes to them.</strong>





## Execution Listener

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
</process> ```

The first execution listener is notified when the process starts. The listener is an external Java-class (like ExampleExecutionListenerOne) and should implement the <code>org.camunda.bpm.engine.delegate.ExecutionListener</code> interface. When the event occurs (in this case end event) the method `notify(ExecutionListenerExecution execution)` is called.

```java
public class ExampleExecutionListenerOne implements ExecutionListener {

  public void notify(ExecutionListenerExecution execution) throws Exception {
    execution.setVariable("variableSetInExecutionListener", "firstValue");
    execution.setVariable("eventReceived", execution.getEventName());
  }
}```

It is also possible to use a delegation class that implements the <code>org.camunda.bpm.engine.delegate.JavaDelegate</code> interface. These delegation classes can then be reused in other constructs, such as a delegation for a serviceTask.

The second execution listener is called when the transition is taken. Note that the listener element
doesn't define an event, since only take events are fired on transitions. Values in the event
attribute are ignored when a listener is defined on a transition. Also it contains a
[camunda:script][camunda-script] child element which defines a script which
will be executed as execution listener. Alternatively it is possible to specify the script source
code as external resources (see the documenation about [script sources][script-sources] of script
tasks).

The last execution listener is called when activity secondTask ends. Instead of using the class on the listener declaration, a expression is defined instead which is evaluated/invoked when the event is fired.

```xml
<camunda:executionListener expression="${myPojo.myMethod(execution.eventName)}" event="end" />```

As with other expressions, execution variables are resolved and can be used. Because the execution implementation object has a property that exposes the event name, it's possible to pass the event-name to your methods using execution.eventName.

Execution listeners also support using a delegateExpression, similar to a service task.

```xml
<camunda:executionListener event="start" delegateExpression="${myExecutionListenerBean}" />```






## Task Listener

A task listener is used to execute custom Java logic or an expression upon the occurrence of a certain task-related event.

A task listener can only be added in the process definition as a child element of a user task. Note that this also must happen as a child of the BPMN 2.0 extensionElements and in the camunda namespace, since a task listener is a construct specifically for the camunda engine.

```xml
<userTask id="myTask" name="My Task" >
  <extensionElements>
    <camunda:taskListener event="create" class="org.camunda.bpm.MyTaskCreateListener" />
  </extensionElements>
</userTask>```

A task listener supports following attributes:

*   __event (required)__: the type of task event on which the task listener will be invoked. Possible events are:
    *    __create__: occurs when the task has been created and all task properties are set.
    *    __assignment__: occurs when the task is assigned to somebody. Note: when process execution arrives in a userTask, first an assignment event will be fired, before the create event is fired. This might seem like an unnatural order but the reason is pragmatic: when receiving the create event, we usually want to inspect all properties of the task including the assignee.
    *    __complete__: occurs when the task is completed and just before the task is deleted from the runtime data.
    *    __delete__: occurs just before the task is deleted from the runtime data.


*   __class__: the delegation class that must be called. This class must implement the `org.camunda.bpm.engine.impl.pvm.delegate.TaskListener` interface.

    ```java
    public class MyTaskCreateListener implements TaskListener {

      public void notify(DelegateTask delegateTask) {
        // Custom logic goes here
      }

    }```

    It is also possible to use Field Injection to pass process variables or the execution to the delegation class. Note that an instance of the delegation class is created upon process deployment (as is the case with any class delegation in the engine), which means that the instance is shared between all process instance executions.

*   __expression__: (cannot be used together with the class attribute): specifies an expression that will be executed when the event happens. It is possible to pass the DelegateTask object and the name of the event (using task.eventName) as parameter to the called object.

    ```xml
    <camunda:taskListener event="create" expression="${myObject.callMethod(task, task.eventName)}" />```

*   __delegateExpression__: allows to specify an expression that resolves to an object implementing the TaskListener interface, similar to a service task.

    ```java
    <camunda:taskListener event="create" delegateExpression="${myTaskListenerBean}" />```

Besides the `class`, `expression` and `delegateExpression` attribute a
[camunda:script][camunda-script] child element can be used to specify a script as task listener.
Also an external script resource can be declared with the resource attribute of the
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




## Field Injection on Listener




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
</process>```

The actual listener implementation may look as follows:

```java
public class ExampleFieldInjectedExecutionListener implements ExecutionListener {

  private Expression fixedValue;

  private Expression dynamicValue;

  public void notify(ExecutionListenerExecution execution) throws Exception {
    String value =
      fixedValue.getValue(execution).toString() +
      dynamicValue.getValue(execution).toString();

    execution.setVariable("var", value);
  }
} ```

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


## Accessing process engine services

It is possible to access the public API services (`RuntimeService`, `TaskService`, `RepositoryService` ...) from the delegation code. The following is an example showing
how to access the `TaskService` from a `JavaDelegate` implementation.

```java
public class DelegateExample implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    TaskService taskService = execution.getProcessEngineServices().taskService();
    taskService.createTaskQuery()...;
  }

}
```


## Throwing BPMN Errors from Delegation Code

In the above example the error event is attached to a Service Task. In order to get this to work the Service Task has to throw the corresponding error. This is done by using a provided Java exception class from within your Java code (e.g. in the JavaDelegate):

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

[script-sources]: ref:/api-references/bpmn20/#tasks-script-task-script-source
[camunda-script]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundascript
