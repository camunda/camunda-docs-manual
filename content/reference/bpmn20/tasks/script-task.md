---

title: 'Script Task'
weight: 50

menu:
  main:
    identifier: "bpmn-ref-tasks-script-task"
    parent: "bpmn-ref-tasks"
    pre: "Execute a Script."

---

A script task is an automated activity. When a process execution arrives at the script task, the corresponding script is executed.

<div data-bpmn-symbol="scripttask" data-bpmn-symbol-name="Script Task"></div>

A script task is defined by specifying the script and the scriptFormat.

```xml
<scriptTask id="theScriptTask" name="Execute script" scriptFormat="groovy">
  <script>
    sum = 0
    for ( i in inputArray ) {
      sum += i
    }
  </script>
</scriptTask>
```

The value of the scriptFormat attribute must be a name that is compatible with JSR-223 (Scripting
for the Java Platform). If you want to use a (JSR-223 compatible) scripting engine, you need to to
add the corresponding jar to the classpath and use the appropriate name.

The script source code has to be added as the text content of the `script` child element.
Alternatively, the source code can be specified as an expression or external resource. For more
information on the possible ways of providing the script source code please see the corresponding
 [section][script-source] of the [User Guide][user-guide].

For general information about scripting in the process engine, please see the [Scripting]({{< relref "user-guide/process-engine/scripting.md" >}}) section of the [User Guide][user-guide].

{{< note title="Supported Script Languages" class="info" >}}

Camunda BPM should work with most of the JSR-223 compatible script engine implementations. We test integration for Groovy, JavaScript, JRuby and Jython. See the <a href="{{< relref "introduction/third-party-libraries.md#process-engine" >}}">Third Party Dependencies</a> section of the <a href="{{< relref "user-guide/index.md" >}}">User Guide</a> for more details.

{{< /note >}}

{{< note title="Decision Script Task" class="info" >}}
Beside normal script languages you can also use Script Task to evaluate a DMN decision.

```xml
<scriptTask id="dmnScriptTask" name="Check order" scriptFormat="dmn"
    camunda:resource="org/camunda/bpm/DmnScriptTaskTest.dmn10.xml"
    camunda:resultVariable="decisionResult" />
```

{{< /note >}}

## Variables in scripts

All process variables that are accessible through the execution that arrives in the script task can be used within the script. In the example below, the script variable `inputArray` is in fact a process variable (an array of integers).

```xml
<script>
    sum = 0
    for ( i in inputArray ) {
      sum += i
    }
</script>
```

It's also possible to set process variables in a script. Variables can be set by using the `setVariable(...)` methods provided by the `VariableScope` interface:


```xml
<script>
    sum = 0
    for ( i in inputArray ) {
      sum += i
    }
    execution.setVariable("sum", sum);
</script>
```

### Enabling auto-storing of script variables

By setting the propery `autoStoreScriptVariables` to `true` in the process engine configuration, the process engine will automatically store all _global_ script variables as process variables. This was the default behavior in camunda BPM 7.0 and 7.1 but it only reliably works for the Groovy scripting language (see the [Set autoStoreScriptVariables][autostore-variables] section of the [Migration Guide]({{< relref "update/index.md" >}}) for more information).

In order to use this feature, you have to

* set `autoStoreScriptVariables` to `true` in the process engine configuration,
* prefix all script variables that should not be stored as script variables using the `def` keyword: `def sum = 0`. In this case the variable `sum` will not be stored as process variable.


<div class="alert alert-info">
  <strong>Groovy-Support only:</strong>
  <p>
    The configuration flag <code>autoStoreScriptVariables</code> is only supported for Groovy Script Tasks.
  </p>
</div>

Note: the following names are reserved and cannot be used as variable names:
`out`, `out:print`, `lang:import`, `context`, `elcontext`.


## Script results

The return value of a script task can be assigned to a previously existing or to a new process variable by specifying the process variable name as a literal value for the `camunda:resultVariable` attribute of a script task definition. Any existing value for a specific process variable will be overwritten by the result value of the script execution. When a result variable name is not specified, the script result value gets ignored.

```xml
<scriptTask id="theScriptTask" name="Execute script" scriptFormat="juel" camunda:resultVariable="myVar">
  <script>#{echo}</script>
</scriptTask>
```

In the above example, the result of the script execution (the value of the resolved expression `#{echo}`) is set to the process variable named `myVar` after the script completes.

<div class="alert alert-warning">
  <strong>Result variables and multi-instance</strong>
  <p>
    Note that when you use <code>camunda:resultVariable</code> in a multi-instance construct, for example in a multi-instance subprocess, the result variable is overwritten every time the task completes, which may appear as random behavior. See <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a> for details.
  </p>
</div>

In case you evaluate a DMN decision using a Script Task the decision result
will be *unpacked* to be easy accessible in the process.  The applied rules can
be found in the [Business Rule Task][dmn-result-type] documentation.


## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#resource" >}}">camunda:resource</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
</table>


[script-source]: {{< relref "user-guide/process-engine/scripting.md#script-source" >}}
[user-guide]: {{< relref "user-guide/index.md" >}}
[autostore-variables]: {{< relref "update/minor/71-to-72/index.md#script-variable-storing" >}}
[dmn-result-type]: {{< relref "business-rule-task.md#dmn-result-variable-type" >}}
