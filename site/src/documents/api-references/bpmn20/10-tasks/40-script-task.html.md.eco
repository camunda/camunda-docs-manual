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

## Variables in scripts

All process variables that are accessible through the execution that arrives in the script task, can be used within the script. In the example, the script variable `inputArray` is in fact a process variable (an array of integers).

```xml
<script>
    sum = 0
    for ( i in inputArray ) {
      sum += i
    }
</script>
```

It's also possible to set process variables in a script, simply by using an assignment statement. In the example above, the `sum` variable will be stored as a process variable after the script task has been executed. To avoid this behavior, script-local variables can be used. In Groovy, the keyword `def` must then be used: `def sum = 0`. In that case, no process variable will be stored.

An alternative is to set variables through the current execution, which is available as a reserved variable called `execution`.

```xml
<script>
    def scriptVar = "test123"
    execution.setVariable("myVar", scriptVar)
</script>    
```
  
Note: the following names are reserved and cannot be used as variable names: out, out:print, lang:import, context, elcontext.

## Script results

The return value of a script task can be assigned to an already existing or to a new process variable by specifying the process variable name as a literal value for the `camunda:resultVariable` attribute of a script task definition. Any existing value for a specific process variable will be overwritten by the result value of the script execution. When not specifying a result variable name, the script result value gets ignored.

```xml
<scriptTask id="theScriptTask" name="Execute script" scriptFormat="juel" camunda:resultVariable="myVar">
  <script>#{echo}</script>
</scriptTask>    
```
   
In the above example, the result of the script execution (the value of the resolved expression `#{echo}`) is set to the process variable named `myVar` after the script completes. 
