---

title: 'Scripting'
weight: 80

menu:
  main:
    identifier: "user-guide-process-engine-scripting"
    parent: "user-guide-process-engine"

---


Camunda 7 supports scripting with JSR-223 compatible script engine implementations. Currently we
test the integration for Groovy, JavaScript, JRuby and Jython. To use a scripting engine
it is necessary to add the corresponding jar to the classpath.

{{< note title="" class="info" >}}
  We include **GraalVM JavaScript** in the pre-packaged Camunda distributions. 
  Consult [JavaScript Considerations](#javascript-considerations) for further information.
  
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
        Processes, Activities, Sequence Flows, Gateways and Events
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
          All Tasks, All Events, Transactions, Subprocesses and Connectors
        </a>
    </td>
    <td>Script inside an inputOutput parameter mapping</td>
  </tr>
</table>


# Use Script Tasks

With a BPMN 2.0 script task you can add a script to your BPM process (for more information see the
[BPMN 2.0 reference]({{< ref "/reference/bpmn20/tasks/script-task.md" >}}).

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

To start the process, a variable `inputArray` is necessary.

```java
Map<String, Object> variables = new HashMap<String, Object>();
variables.put("inputArray", new Integer[]{5, 23, 42});
runtimeService.startProcessInstanceByKey("process", variables);
```


# Use Scripts as Execution Listeners

Besides Java code and expression language, Camunda 7 also supports the execution of a script
as an execution listener. For general information about execution listeners see the corresponding
[section]({{< ref "/user-guide/process-engine/delegation-code.md#execution-listener" >}}).

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
information about task listeners see the corresponding
[section]({{< ref "/user-guide/process-engine/delegation-code.md#task-listener" >}}).

To use a script as a task listener, a `camunda:script` element has to be added as a child element of
the `camunda:taskListener` element. Inside the script, the variable `task` is available, which corresponds to
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

As an alternative to expression language, Camunda 7 allows you to use scripts as
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
  JavaScript and JRuby but not to Jython. If you want to use Jython, your script has to be a
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
# Script Engine Caching

Whenever the process engine reaches a point where a script has to be executed, the process engine looks for a Script Engine by a language name. The default behavior is that if it is the first request, a new Script Engine is created. If the Script Engine declares to be thread safe, it is also cached. The caching prevents the process engine from creating a new Script Engine for each request for the same script language.

By default the caching of Script Engines happens at process application level. Each process application holds an own instance of a Script Engine for a given language. This behavior can be disabled by setting the process engine configuration flag named `enableFetchScriptEngineFromProcessApplication` to false. Consequently, the Script Engines are cached globally at process engine level and they are shared between each process application. For further details about the process engine configuration flag `enableFetchScriptEngineFromProcessApplication`, please read the section about [referencing process application classes]({{< ref "/user-guide/process-engine/scripting.md#reference-process-application-provided-classes" >}}).

If it is not desired to cache Script Engines in general, it can be disabled by setting the process engine configuration flag name `enableScriptEngineCaching` to false.


# Script Compilation

Most script engines compile script source code either to a Java class or to a different
intermediary format prior to executing the script. Script engines implementing the Java `Compilable`
interface allow programs to retrieve and cache the script compilation. The default setting of the
process engine is to check if a Script Engine supports the compile feature. If true and the caching of Script Engines is enabled, the script engine compiles the script and then caches the compilation result. This prevents the process engine from compiling a script source each time the same script task is executed.

By default, compilation of scripts is enabled. If you need to disable script compilation, you can set the process engine configuration flag named `enableScriptCompilation` to false.

# Load Script Engine

If the process engine configuration flag named `enableFetchScriptEngineFromProcessApplication` is set to true, it is also possible to load Script Engines from the classpath of the process application. For that, the Script Engine can be packaged as a library within the process application. It is also possible to install the Script Engine globally.

In case the Script Engine module should be installed globally and Wildfly is used, it is necessary to add a module dependency to the Script Engine. This can be done by adding a `jboss-deployment-structure.xml` to the process application, e.g.,:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jboss-deployment-structure>
  <deployment>
    <dependencies>
      <module name="org.apache.groovy.groovy-all"
              services="import" />
    </dependencies>
  </deployment>
</jboss-deployment-structure>
```

# Configure Script Engine

Most script engines offer configuration options to adjust their script execution semantics.
We provide the following default configurations for supported script engines before executing code on them:

<table class="table desc-table">
  <tr>
    <th>Script Engine</th>
    <th>Default configuration</th>
  </tr>
  <tr>
    <td>GraalVM JavaScript</td>
    <td>
      Configured to allow host acces and host class lookup by setting <code>polyglot.js.allowHostAccess</code> and 
      <code>polyglot.js.allowHostClassLookup</code> to <code>true</code>.
    </td>
  </tr>
  <tr>
    <td>Groovy</td>
    <td>Configured to only hold weak references to Java methods by setting <code>#jsr223.groovy.engine.keep.globals</code> to <code>weak</code>.</td>
  </tr>
</table>

Besides those default options, you can configure the script engines by any of the following:

* Set script engine-specific configuration flags in process engine configuration.
* Provide script engine-specific system properties.
* Provide a custom implementation of the `ScriptEngineResolver` interface.

Note that for JavaScript execution you might be able to choose the script engine to use depending on your setup. Consult
[JavaScript Considerations](#javascript-considerations) for further information.

## Process engine flags

You can use the following process engine configuration flags to influence the configuration of specific script engines:

* [configureScriptEngineHostAccess]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#configureScriptEngineHostAccess" >}}) - 
  Specifies whether host language resources like classes and their methods are accessible or not.
* [enableScriptEngineLoadExternalResources]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#enableScriptEngineLoadExternalResources" >}}) - 
  Specifies whether external resources can be loaded from file system or not.
* [enableScriptEngineNashornCompatibility]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#enableScriptEngineNashornCompatibility" >}}) - 
  Specifies whether Nashorn compatibility mode is enabled or not.

## System properties

Depending on the script engine, specific system properties can be used to influence the setup of the script engine.
Consult the development guides of the script engine you want to configure for further information on available parameters.
Note that the supported options can differ between versions of the script engine.

You can set system properties either programmatically through `System.setProperty(parameter, value)` or as JVM arguments, 
for example upon application start on command line via `-Dparameter=value`. Most application servers like Wildfly, 
Tomcat, Websphere, and Weblogic support providing JVM arguments via environment variables `JAVA_OPTS` or `JAVA_OPTIONS`. 
Consult your application server's documentation to learn how to pass on JVM arguments. Camunda Run supports setting 
JVM arguments via the `JAVA_OPTS` environment variable as well.

## Custom ScriptEngineResolver

You can provide a custom `ScriptEngineResolver` implementation to configure script engines. Depending on the specifc script engine to configure, 
you can gain more configuration options with this approach. You can add your custom script engine resolver to the engine configuration 
with the `#setScriptEngineResolver(ScriptEngineResolver)` method.

You can inherit from the `org.camunda.bpm.engine.impl.scripting.engine.DefaultScriptEngineResolver` for starters in case configuring an existing 
script engine instance is sufficient for you. By overriding the `#configureScriptEngines(String, ScriptEngine)` method of the `DefaultScriptEngineResolver`, 
you can change settings on the script engine instance provided to that method as shown in the following example:

```java
public class CustomScriptEngineResolver extends DefaultScriptEngineResolver {

  public CustomScriptEngineResolver(ScriptEngineManager scriptEngineManager) {
    super(scriptEngineManager);
  }

  protected void configureScriptEngines(String language, ScriptEngine scriptEngine) {
    super.configureScriptEngines(language, scriptEngine);
    if (ScriptingEngines.GROOVY_SCRIPTING_LANGUAGE.equals(language)) {
      // make sure Groovy compiled scripts only hold weak references to java methods
      scriptEngine.getContext().setAttribute("#jsr223.groovy.engine.keep.globals", "soft", ScriptContext.ENGINE_SCOPE);
    }
  }
}
```

If you need more flexibility in configuring a script engine, you can override a method further up the chain in the script engine creation
or provide your own plain implementation of the interface. Have a look at the following example that provides a custom **GraalVM JavaScript** 
instance with Nashorn Compatibility Mode enabled:

```java
public class CustomScriptEngineResolver extends DefaultScriptEngineResolver {

  public CustomScriptEngineResolver(ScriptEngineManager scriptEngineManager) {
    super(scriptEngineManager);
  }

  @Override
  protected void configureGraalJsScriptEngine(ScriptEngine scriptEngine) {
    // do nothing
  }

  @Override
  protected ScriptEngine getJavaScriptScriptEngine(String language) {
    return com.oracle.truffle.js.scriptengine.GraalJSScriptEngine.create(null,
        org.graalvm.polyglot.Context.newBuilder("js")
        // make sure GraalVM JS can provide access to the host and can lookup classes
        .allowHostClassLookup(s -> true)
        // enable Nashorn Compatibility Mode
        .allowExperimentalOptions(true)
        .option("js.nashorn-compat", "true"));
  }
}
```

# Reference Process Application Provided Classes

The script can reference to process application provided classes by importing them like in the following groovy script example.

```java
import my.process.application.CustomClass

sum = new CustomClass().calculate()
execution.setVariable('sum', sum)
```

To avoid possible class loading problems during the script execution, it is recommended to set the process engine configuration flag name `enableFetchScriptEngineFromProcessApplication` to true.

Be aware that the process engine flag `enableFetchScriptEngineFromProcessApplication` is only relevant in a shared engine scenario.

# Variables Available During Script Execution

During the execution of scripts, all process variables visible in the current scope are available.
They can be accessed directly by the name of the variable (i.e., `sum`). This does not apply for
JRuby where you have to access the variable as a ruby global variable (prepend with a dollar sign,
i.e., `$sum`)

There are also special variables:

1. `execution`, which is always available if the script is executed in an execution scope (e.g., in a script task) ({{< javadocref page="org/camunda/bpm/engine/delegate/DelegateExecution.html" text="DelegateExecution" >}}).
1. `task`, which is available if the script is executed in a task scope (e.g., a task listener) ({{< javadocref page="org/camunda/bpm/engine/delegate/DelegateTask.html" text="DelegateTask" >}}).
1. `connector`, which is available if the script is executed in a connector variable scope (e.g., outputParameter of a camunda:connector) ({{< javadocref page="org/camunda/connect/plugin/impl/ConnectorVariableScope.html" text="ConnectorVariableScope" >}}).

These variables correspond to the `DelegateExecution`, `DelegateTask` or resp. `ConnectorVariableScope`
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

# Accessing Process Engine Services using Scripts

Camunda's Java API provides access to Camunda's process engine services; these services can be accessed using Scripts:

{{< javadocref page="org/camunda/bpm/engine/ProcessEngineServices.html" text="Process Engine Services" >}} \

{{< javadocref page="org/camunda/bpm/engine/package-summary.html" text="Public Java API of Camunda 7 Engine" >}}

Example of creating a BPMN Message that correlates with the message key "work":

```javascript
execution.getProcessEngineServices().getRuntimeService().createMessageCorrelation("work").correlateWithResult();
```


# Printing to Console using Scripts

During the execution of scripts, it might be desired to print to the console due to logging and debugging reasons.

Here are examples on how this can be accomplished in the respective language:

* Groovy:

```groovy
println 'This prints to the console'
```

* Java:

```java
var system = java.lang.System;
system.out.println('This prints to the console');
```


# Script Source

The standard way to specify the script source code in the BPMN XML model is to add it directly to
the XML file. Nonetheless, Camunda 7 provides additional ways to specify the script source.

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
[camunda:resource]({{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#resource" >}})
section of the [Custom Extensions]({{< ref "/reference/bpmn20/custom-extensions/_index.md" >}}) chapter.

# JavaScript Considerations

JavaScript code execution is part of the Java Runtime (JRE) with the **Nashorn** script engine until Java 14 and thus only there available out of the box.
We include **GraalVM JavaScript** in the pre-packaged Camunda distributions as a replacement regardless of the JRE version.
JavaScript code executes on GraalVM JavaScript with preference in the process engine context if this script engine is available.
If this script engine cannot be found, the process engine defaults to let the JVM select an appropriate script engine.

You can set the default JavaScript engine to use for languages `javascript` and `ecmascript` with the process engine configuration property named `scriptEngineNameJavaScript`.
Set this value to `nashorn` to configure the process engine to use the Nashorn script engine by default.
Note that if no script engine related to that value can be found, the process engine does not look for a fallback and throws an exception.

Consult the [official GraalVM JavaScript Guide](https://www.graalvm.org/reference-manual/js/ScriptEngine/) for questions around that script engine. 
It also contains a guide on [Migration from Nashorn](https://www.graalvm.org/reference-manual/js/NashornMigrationGuide/).
