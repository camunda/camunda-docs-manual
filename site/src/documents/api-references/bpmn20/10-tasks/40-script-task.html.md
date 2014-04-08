---

title: 'Script Task'
category: 'Tasks'

keywords: 'variables scripts results'

---

A script task is an automatic activity. When a process execution arrives at the script task, the corresponding script is executed.

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

The value of the scriptFormat attribute must be a name that is compatible with the JSR-223 (scripting for the Java platform). If you want to use a (JSR-223 compatible) scripting engine, it is necessary to add the corresponding jar to the classpath and use the appropriate name.

<div class="alert alert-info">
  <strong>Supported Script Languages:</strong>
  <p>
    camunda BPM should work with most of the JSR-223 compatible script engine implementations. 
    We test integration for Groovy, Java Script, JRuby and Jython. See also: <a href="ref:/guides/user-guide/#introduction-third-party-libraries-process-engine">Third Party Dependencies</a>
  </p>
</div>

## Variables in scripts

All process variables that are accessible through the execution that arrives in
the script task can be used within the script. In the example, the script
variable `inputArray` is in fact a process variable (an array of integers).

```xml
<script>
    sum = 0
    for ( i in inputArray ) {
      sum += i
    }
</script>
```

It's also possible to set process variables in a script. Variables can be set by the 
`setVariable(...)` methods provided by the `VariableScope` interface: 


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

By setting the propery `autoStoreScriptVariables` to true in the process engine
configuration, the process engine will automatically store all _global_ script
variables as process variables.
 
This was the default behavior in camunda BPM 7.0 and 7.1 but it only reliably works for
for the groovy scripting language 
(see the [Note in the Migration Guide for camunda BPM 7.2](ref:/guides/migration-guide/#migrate-from-camunda-bpm-71-to-72-migrate-process-engine-configuration-set-autostorescriptvariables)).

In order to use this feature, you have to 

* set `autoStoreScriptVariables` to true in the process engine configuration,
* prefix all script variables that should not be stored as script variables using the `def`
  keyword: `def sum = 0`. In that case the variable `sum` will not
  be stored as process variable.


<div class="alert alert-info">
  <strong>Groovy-Support only:</strong>
  <p>
    The configuration flag <code>autoStoreScriptVariables</code> is only supported for Groovy Script Tasks.
  </p>
</div>

Note: the following names are reserved and cannot be used as variable names: out, out:print, lang:import, context, elcontext.

## Script results

The return value of a script task can be assigned to an already existing or to a new process variable by specifying the process variable name as a literal value for the `camunda:resultVariable` attribute of a script task definition. Any existing value for a specific process variable will be overwritten by the result value of the script execution. When not specifying a result variable name, the script result value gets ignored.

```xml
<scriptTask id="theScriptTask" name="Execute script" scriptFormat="juel" camunda:resultVariable="myVar">
  <script>#{echo}</script>
</scriptTask>
```

In the above example, the result of the script execution (the value of the resolved expression `#{echo}`) is set to the process variable named `myVar` after the script completes.

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasync">camunda:async</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaresultvariable">camunda:resultVariable</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:async</code> is set to <code>true</code>
    </td>
  </tr>
</table>

