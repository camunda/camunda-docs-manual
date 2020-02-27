---

title: 'FEEL Engine'
weight: 30

menu:
  main:
    name: "FEEL Engine"
    identifier: "user-guide-dmn-engine-feel"
    parent: "user-guide-dmn-engine"
    pre: "Friendly Enough Expression Language Engine"

---

FEEL is part of the DMN specification and stands for "Friendly Enough Expression Language". You can 
use it to evaluate expressions in a decision table. Camunda BPM currently supports FEEL in version 1.2.

You can use the Expression Language in the following DMN Notation Elements:

* [Input Expressions]
* [Input Entries]
* [Output Entries]
* [Literal Expressions]

This documentation covers everything integration-specific about the **FEEL Scala Engine** in the 
Camunda DMN Engine. By default, Camunda BPM relies on the [FEEL Scala Engine][] (opens external link) 
in version `1.11.0`. 

{{< note title="Heads Up!" class="info" >}}
If you come from a Camunda BPM version <= 7.12.x and already use FEEL, 
please read the documentation about the 
<a href="{{< ref "/user-guide/dmn-engine/feel/legacy-behavior.md" >}}">FEEL Engine Legacy Behavior</a>.
{{< /note >}}

[FEEL Scala Engine]: https://github.com/camunda/feel-scala
[input entries]: {{< ref "/reference/dmn11/decision-table/rule.md#input-entry-condition" >}}
[Input Expressions]: {{< ref "/reference/dmn11/decision-table/input.md#input-expression" >}}
[Output Entries]: {{< ref "/reference/dmn11/decision-table/rule.md#output-entry-conclusion" >}}
[Literal Expressions]: {{< ref "/reference/dmn11/decision-literal-expression/_index.md" >}}