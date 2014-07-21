---

title: 'Input/Output Variable Mapping'
category: 'Process Engine'

---

To improve the reusability of source code and business logic, camunda BPM supports input/output
mapping of process variables. This can be used for tasks, events and subprocesses.

In order to use the variable mapping, you have to add the camunda extension element [inputOutput][]
to the element. It can contain multiple [inputParameter][] and [outputParameter][] elements which
specify which variables should be mapped. The `name` attribute of an [inputParameter][] denotes
the variable name inside the activity, whereas the `name` attribute of an [outputParameter][]
denotes the variable name outside of the activity.

The content of an input/outputParameter specifies the value which is mapped to the corresponding
variable. It can be a simple constant string or an expression. An empty body sets the variable
to the special value `null`.

```xml
<camunda:inputOutput>
  <camunda:inputParameter name="x">foo</camunda:inputParameter>
  <camunda:inputParameter name="willBeNull"/>
  <camunda:outputParameter name="y">${x}</camunda:outputParameter>
  <camunda:outputParameter name="z">${willBeNull == null}</camunda:outputParameter>
</camunda:inputOutput>
```

Furthermore, even complexer structures like [lists][list] and [maps][map] can be used. Both can also
be nested.

```xml
<camunda:inputOutput>
  <camunda:inputParameter name="x">
    <camunda:list>
      <camunda:value>a</camunda:value>
      <camunda:value>${1 + 1}</camunda:value>
      <camunda:list>
        <camunda:value>1</camunda:value>
        <camunda:value>2</camunda:value>
        <camunda:value>3</camunda:value>
      </camunda:list>
    </camunda:list>
  </camunda:inputParameter>
  <camunda:outputParameter name="y">
    <camunda:map>
      <camunda:entry key="foo">bar</camunda:entry>
      <camunda:entry key="map">
        <camunda:map>
          <camunda:entry key="hello">world</camunda:entry>
          <camunda:entry key="camunda">bpm</camunda:entry>
        </camunda:map>
      </camunda:entry>
    </camunda:map>
  </camunda:outputParameter>
</camunda:inputOutput>
```

A script can also be used to calculate the variable value. Please see the corresponding
[section][script-io] in the scripting chapter.

A simple example for the benefit of input/output mapping would be a complex calculation which
should be part of multiple processes definitions. This calculation can be developed as isolated
delegation code or script task and be reused in every process, even though the processes operate on
different data sources. The input/output mapping is then used to map the varying process data to
the required input parameter of the complex calculation implementation and also to utilize the
calculation result in the further process execution.

To further explain, this we assume the calculation requires a `userId` and a `costSum` as input
parameters. It then calculates three values, `a`, `b` and `c`, which are different forecasts for the
future costs of the user. In a first process both input parameters are already available as process variables, but with different names (`id`, `sum`). From the three results, the process only uses `b`
which it needs as process variable `forecast`. The resulting input/output mapping would look as follows:

```xml
<serviceTask camunda:class="org.camunda.bpm.example.ComplexCalculation">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="userId">${id}</camunda:inputParameter>
      <camunda:inputParameter name="costSum">${sum}</camunda:inputParameter>
      <camunda:outputParameter name="forecast">${b}</camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</serviceTask>
```

In a second process you have to a calculate the `costSum` from different maps. Also, the process
needs the average `avgForecast` of the calculated values `a` and `c`.

```xml
<serviceTask camunda:class="org.camunda.bpm.example.ComplexCalculation">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="userId">${id}</camunda:inputParameter>
      <camunda:inputParameter name="costSum">
        ${sumA[id] + sumB[id] + sumC[id]}
      </camunda:inputParameter>
      <camunda:outputParameter name="avgForecast">
        ${(a + c) / 2}
      </camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</serviceTask>
```


[inputOutput]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundainputoutput
[inputParameter]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundainputparameter
[outputParameter]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundaoutputparameter
[list]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundalist
[map]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundamap
[script-io]: ref:#process-engine-scripting-use-scripts-as-inputoutput-parameters