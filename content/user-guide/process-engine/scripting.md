---

title: 'Scripting'
weight: 80

menu:
  main:
    identifier: "user-guide-process-engine-scripting"
    parent: "user-guide-process-engine"

---


Camunda BPM supports scripting with JSR-223 compatible script engine implementations. Currently we
test the integration for Groovy, Javascript, JRuby and Jython. To use a scripting engine
it is necessary to add the corresponding jar to the classpath.

{{< note title="" class="info" >}}
  **Javascript** is part of the Java Runtime (JRE) and thus available out ot the box.

  We include **Groovy** in the pre-packaged Camunda distributions.
{{< /note >}}

The following table provides an overview of the BPMN elements which support the execution of
scripts.

<table class="table desc-table">
  <tr>
    <th>BPMN element</th>
    <th>Script support</th>
  </tr>
  <tr>
    <td><a href="#use-script-tasks">Script Task</a></td>
    <td>Script inside a script task</td>
  </tr>
  <tr>
    <td>
      <a href="#use-scripts-as-execution-listeners">
        Process, Activities, Sequence Flows, Gateways and Events
      </a>
    </td>
    <td>Script as an execution listener</td>
  </tr>
  <tr>
    <td>
      <a href="#use-scripts-as-task-listeners">
        User Tasks
      </a>
    </td>
    <td>Script as a task listener</td>
  </tr>
  <tr>
    <td>
      <a href="#use-scripts-as-conditions">
        Sequence Flows
      </a>
    </td>
    <td>Script as condition expression of a sequence flow</td>
  </tr>
  <tr>
    <td>
        <a href="#use-scripts-as-inputoutput-parameters">
          All Tasks, All Events, Transaction, Subprocess and Connector
        </a>
    </td>
    <td>Script inside an inputOutput parameter mapping</td>
  </tr>
</table>


# Use Script Tasks

With a BPMN 2.0 script task you can add a script to your BPM process (see for more information the
[BPMN 2.0 reference]({{< relref "reference/bpmn20/tasks/script-task.md" >}}).

The following process is a simple example with a Groovy script task that sums up the elements of an array.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   targetNamespace="http://camunda.org/example">
  <process id="process" isExecutable="true">
    <startEvent id="start"/>
    <sequenceFlow id="sequenceFlow1" sourceRef="start" targetRef="task"/>
    <scriptTask id="task" name="Groovy Script" scriptFormat="groovy">
      <script>
        <![CDATA[
        sum = 0

        for ( i in inputArray ) {
          sum += i
        }

        println "Sum: " + sum
        ]]>
      </script>
    </scriptTask>
    <sequenceFlow id="sequenceFlow2" sourceRef="task" targetRef="end"/>
    <endEvent id="end"/>
  </process>
</definitions>
```

To start the process a variable `inputArray` is necessary.

```java
Map<String, Object> variables = new HashMap<String, Object>();
variables.put("inputArray", new Integer[]{5, 23, 42});
runtimeService.startProcessInstanceByKey("process", variables);
```


# Use Scripts as Execution Listeners

Besides Java code and expression language, Camunda BPM also supports the execution of a script
as an execution listener. For general information about execution listeners see the corresponding
[section]({{< relref "user-guide/process-engine/delegation-code.md#execution-listener" >}}).

To use a script as an execution listener, a `camunda:script` element has to be added as a child
element of the `camunda:executionListener` element. During script evaluation, the variable `execution` is
available, which corresponds to the `DelegateExecution` interface.

The following example shows usage of scripts as execution listeners.

```xml
<process id="process" isExecutable="true">
  <extensionElements>
    <camunda:executionListener event="start">
      <camunda:script scriptFormat="groovy">
        println "Process " + execution.eventName + "ed"
      </camunda:script>
    </camunda:executionListener>
  </extensionElements>

  <startEvent id="start">
    <extensionElements>
      <camunda:executionListener event="end">
        <camunda:script scriptFormat="groovy">
          println execution.activityId + " " + execution.eventName + "ed"
        </camunda:script>
      </camunda:executionListener>
    </extensionElements>
  </startEvent>
  <sequenceFlow id="flow1" startRef="start" targetRef="task">
    <extensionElements>
      <camunda:executionListener>
        <camunda:script scriptFormat="groovy" resource="org/camunda/bpm/transition.groovy" />
      </camunda:executionListener>
    </extensionElements>
  </sequenceFlow>

  <!--
    ... remaining process omitted
  -->
</process>
```


# Use Scripts as Task Listeners

Similar to execution listeners, task listeners can also be implemented as scripts. For general
information about execution listeners see the corresponding
[section]({{< relref "user-guide/process-engine/delegation-code.md#task-listener" >}}).

To use a script as a task listener, a `camunda:script` element has to be added as a child element of
the `camunda:taskListener`. Inside the script, the variable `task` is available, which corresponds to
the `DelegateTask` interface.

The following example shows usage of scripts as task listeners.

```xml
<userTask id="userTask">
  <extensionElements>
    <camunda:taskListener event="create">
      <camunda:script scriptFormat="groovy">println task.eventName</camunda:script>
    </camunda:taskListener>
    <camunda:taskListener event="assignment">
      <camunda:script scriptFormat="groovy" resource="org/camunda/bpm/assignemnt.groovy" />
    </camunda:taskListener>
  </extensionElements>
</userTask>
```

# Use Scripts as Conditions

As an alternative to expression language, Camunda BPM allows you to use scripts as
`conditionExpression` of conditional sequence flows. To do that, the `language` attribute of the
`conditionExpression` element has to be set to the desired scripting language. The script source code
is the text content of the element, as with expression language. Another way to specify the script
source code is to define an external source as described in the [script source section]({{< relref "#script-source" >}}).

The following example shows usage of scripts as conditions. The Groovy variable `status` is a
process variable which is available inside the script.

```xml
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression" language="groovy">
    status == 'closed'
  </conditionExpression>
</sequenceFlow>

<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression" language="groovy"
      camunda:resource="org/camunda/bpm/condition.groovy" />
</sequenceFlow>
```


# Use Scripts as inputOutput Parameters

With the Camunda `inputOutput` extension element you can map an `inputParameter` or `outputParameter`
with a script. The following example process uses the Groovy script from the previous example to assign
the Groovy variable `sum` to the process variable `x` for a Java delegate.

{{< note title="Script Return Value" class="info" >}}
  Please note that the last statement of the script is returned. This applies to Groovy,
  Javascript and JRuby but not to Jython. If you want to use Jython, your script has to be a
  single expression like `a + b` or `a > b` where `a` and
  `b` are already process variables. Otherwise, the Jython scripting engine will not return a value.
{{< /note >}}

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   xmlns:camunda="http://activiti.org/bpmn"
                   targetNamespace="http://camunda.org/example">
  <process id="process" isExecutable="true">
    <startEvent id="start"/>
    <sequenceFlow id="sequenceFlow1" sourceRef="start" targetRef="task"/>
    <serviceTask id="task" camunda:class="org.camunda.bpm.example.SumDelegate">
      <extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="x">
             <camunda:script scriptFormat="groovy">
              <![CDATA[

              sum = 0

              for ( i in inputArray ) {
                sum += i
              }

              sum
              ]]>
            </camunda:script>
          </camunda:inputParameter>
        </camunda:inputOutput>
      </extensionElements>
    </serviceTask>
    <sequenceFlow id="sequenceFlow2" sourceRef="task" targetRef="end"/>
    <endEvent id="end"/>
  </process>
</definitions>
```

After the script has assigned a value to the `sum` variable, `x` can be used inside the Java delegate
code.

```java
public class SumDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    Integer x = (Integer) execution.getVariable("x");

    // do something
  }

}
```

The script source code can also be loaded from an external resource in the same way as described
for [script tasks]({{< relref "#script-source" >}}).

```xml
<camunda:inputOutput>
  <camunda:inputParameter name="x">
     <camunda:script scriptFormat="groovy" resource="org/camunda/bpm/example/sum.groovy"/>
  </camunda:inputParameter>
</camunda:inputOutput>
```


## Script Compilation

Most script engines compile script source code either to a Java class or to a different
intermediary format prior to executing the script. Script engines implementing the Java `Compilable`
interface allow programs to retrieve and cache the script compilation. The default setting of the
process engine is to check if a Script Engine supports the compile feature and, if true, have the
script engine compile the script and then cache the compilation result.  This prevents the process
engine from compiling a script source each time the same script task is executed.

By default, compilation of scripts is enabled. If you need to disable script compilation, you can set
the process engine configuration flag named `enableScriptCompilation` to false.


## Variables Available During Script Execution

During the execution of scripts, all process variables visible in the current scope are available.
They can be accessed directly by the name of the variable (i.e. `sum`). This does not apply for
JRuby where you have to access the variable as a ruby global variable (prepend with a dollar sign,
i.e. `$sum`)

There are also special variables like `execution` which is always available if the script is
executed in an execution scope (e.g. in a script task), `task` which is available if the script is
executed in a task scope (e.g. a task listener) and `connector` which is available if the script is
executed in a connector variable scope (e.g. outputParameter of a camunda:connector). These
variables correspond to the `DelegateExecution`, `DelegateTask` or resp. `ConnectorVariableScope`
interface which means that it can be used to get and set variables or access process engine services.

```java
// get process variable
sum = execution.getVariable('x')

// set process variable
execution.setVariable('y', x + 15)

// get task service and query for task
task = execution.getProcessEngineServices().getTaskService()
  .createTaskQuery()
  .taskDefinitionKey("task")
  .singleResult()
```


## Script Source

The standard way to specify the script source code in the BPMN XML model is to add it directly to
the XML file. Nonetheless, Camunda BPM provides additional ways to specify the script source.

If you use another scripting language than Expression Language, you can also specify the script
source as an expression which returns the source code to be executed. This way, the source code can,
for example, be contained in a process variable.

In the following example snippet the process engine will evaluate the expression `${sourceCode}` in
the current context every time the element is executed.

```xml
<!-- inside a script task -->
<scriptTask scriptFormat="groovy">
  <script>${sourceCode}</script>
</scriptTask>

<!-- as an execution listener -->
<camunda:executionListener>
  <camunda:script scriptFormat="groovy">${sourceCode}</camunda:script>
</camunda:executionListener>

<!-- as a condition expression -->
<sequenceFlow id="flow" sourceRef="theStart" targetRef="theTask">
  <conditionExpression xsi:type="tFormalExpression" language="groovy">
    ${sourceCode}
  </conditionExpression>
</sequenceFlow>

<!-- as an inputOutput mapping -->
<camunda:inputOutput>
  <camunda:inputParameter name="x">
    <camunda:script scriptFormat="groovy">${sourceCode}</camunda:script>
  </camunda:inputParameter>
</camunda:inputOutput>
```

You can also specify the attribute `camunda:resource` on the `scriptTask` and `conditionExpression`
element, respectively the `resource` attribute on the `camunda:script` element. This extension
attribute specifies the location of an external resource which should be used as script source code.
Optionally, the resource path can be prefixed with an URL-like scheme to specify if the resource is
contained in the deployment or classpath. The default behaviour is that the resource is part of the
classpath. This means that the first two script task elements in the following examples are equal.

```xml
<!-- on a script task -->
<scriptTask scriptFormat="groovy" camunda:resource="org/camunda/bpm/task.groovy"/>
<scriptTask scriptFormat="groovy" camunda:resource="classpath://org/camunda/bpm/task.groovy"/>
<scriptTask scriptFormat="groovy" camunda:resource="deployment://org/camunda/bpm/task.groovy"/>

<!-- in an execution listener -->
<camunda:executionListener>
  <camunda:script scriptFormat="groovy" resource="deployment://org/camunda/bpm/listener.groovy"/>
</camunda:executionListener>

<!-- on a conditionExpression -->
<conditionExpression xsi:type="tFormalExpression" language="groovy"
    camunda:resource="org/camunda/bpm/condition.groovy" />

<!-- in an inputParameter -->
<camunda:inputParameter name="x">
  <camunda:script scriptFormat="groovy" resource="org/camunda/bpm/mapX.groovy" />
</camunda:inputParameter>
```

The resource path can also be specified as an expression which is evaluated on the invocation of the
script task.

```xml
<scriptTask scriptFormat="groovy" camunda:resource="${scriptPath}"/>
```

For more information, see the
[camunda:resource]({{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-resource" >}})
section of the [Custom Extensions]({{< relref "reference/bpmn20/custom-extensions/index.md" >}}) chapter.
