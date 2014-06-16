---

title: 'Scripting'
category: 'Process Engine'

---

camunda BPM supports scripting with JSR-223 compatible script engine implementations. Currently we
test the integration for Groovy, Javascript, JRuby and Jython. To use a scripting engine
it is necessary to add the corresponding jar to the classpath.

The following table provides an overview of the BPMN elements which support the execution of
scripts.

<table class="table">
  <tr>
    <th>BPMN element</th>
    <th>Script support</th>
  </tr>
  <tr>
    <td><a href="#process-engine-scripting-use-script-tasks">Script Task</a></td>
    <td>Embedded script source code inside a script child element</td>
  </tr>
  <tr>
    <td><a href="#process-engine-scripting-use-scripts-as-inputoutput-parameter">
        All Tasks, All Events, Transaction and Subprocess
    </a></td>
    <td>Embedded script source code inside a inputOutput parameter mapping</td>
  </tr>
</table>


### Use script tasks

With a BPMN 2.0 script task you can add a script to your BPM process (see for more information the
[BPMN 2.0 reference](ref:/api-references/bpmn20/#tasks-script-task)).

The following process is a simple example with a groovy script task.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   targetNamespace="http://camunda.org/example">
  <bpmn2:process id="process" isExecutable="true">
    <bpmn2:startEvent id="start"/>
    <bpmn2:sequenceFlow id="sequenceFlow1" sourceRef="start" targetRef="task"/>
    <bpmn2:scriptTask id="task" name="Groovy Script" scriptFormat="groovy">
      <bpmn2:script>
        <![CDATA[
        sum = 0

        for ( i in inputArray ) {
          sum += i
        }

        println "Sum: " + sum
        ]]>
      </bpmn2:script>
    </bpmn2:scriptTask>
    <bpmn2:sequenceFlow id="sequenceFlow2" sourceRef="task" targetRef="end"/>
    <bpmn2:endEvent id="end"/>
  </bpmn2:process>
</bpmn2:definitions>
```

To start the process a variable `inputArray` is necessary.

```java
Map<String, Object> variables = new HashMap<String, Object>();
variables.put("inputArray", new Integer[]{5, 23, 42});
runtimeService.startProcessInstanceByKey("process", variables);
```


### Use scripts as inputOutput parameter

With the camunda `inputOutput` extension element you can map a `inputParameter` or `outputParameter`
with a script. The following example process uses the groovy script from the previous example assign
the groovy variable `sum` to the process variable `x` for a Java delegate.


<div class="alert alert-info">
  <strong>Script Return Value:</strong>
  <p>
    Please notice that the last statement of the script is returned. This applies to groovy,
    Javascript and JRuby but not to Jython. If you want to use Jython your script has to be a
    single expression like <code>a + b</code> or <code>a > b</code> where <code>a</code> and
    <code>b</code> are already process variables. Otherwise the Jython scripting engine will
    not return a value.
  </p>
</div>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   xmlns:camunda="http://activiti.org/bpmn"
                   targetNamespace="http://camunda.org/example">
  <bpmn2:process id="process" isExecutable="true">
    <bpmn2:startEvent id="start"/>
    <bpmn2:sequenceFlow id="sequenceFlow1" sourceRef="start" targetRef="task"/>
    <bpmn2:serviceTask id="task" camunda:class="org.camunda.bpm.example.SumDelegate">
      <bpmn2:extensionElements>
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
      </bpmn2:extensionElements>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="sequenceFlow2" sourceRef="task" targetRef="end"/>
    <bpmn2:endEvent id="end"/>
  </bpmn2:process>
</bpmn2:definitions>
```

After the script assigned a value to the `sum` variable it can be used inside the Java delegate
code.

```java
public class SumDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    Integer x = (Integer) execution.getVariable("x");

    // do something
  }

}
```


## Script compilation

Most script engines will compile the script sourcecode either to a Java class or to a different
intermediary format prior to executing the script. Script engines implementing the Java `Compilable`
interface allow programs to retrieve and cache the script compilation. The default setting of the
process engine is to check whether a Script Engine supports the compile feature and if true have the
script engine compile the script and then cache the compilation result.  This allows the process
engine to keep from compiling a script source each time the same script task is executed.

By default compilation of scripts is enabled. If you need to disable script compilation, you can set
the process engine configuration flag named `enableScriptCompilation` to false.


## Variables available during script execution

During the execution of script all process variables visible in the current scope are available.
They can be accessed directly by the name of the variable (i.e. `sum`). This does not apply for
JRuby where you have to access the variable as a ruby global variable (prepend with a dollar sign,
i.e. `$sum`)

There is also the special variable `execution` which is always available if the script is executed
in a execution scope (e.g. in a script task). This variable corresponds to the `DelegateExecution`
interface. Which means it can be used to get and set variables or access process engine services.

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

