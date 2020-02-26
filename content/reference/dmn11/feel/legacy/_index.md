---

title: 'Legacy FEEL Engine'
weight: 20

menu:
  main:
    name: "Legacy FEEL Engine"
    identifier: "dmn-ref-feel-legacy"
    parent: "dmn-ref-feel"
    pre: "whatever"

---

This page provides information on the features of the legacy FEEL Engine, that was used before the 
current, Scala-based FEEL Engine was integrated into the Camunda BPM Platform.

By using the legacy FEEL Engine, the Camunda DMN engine **only** supports `FEEL` for [input entries] 
of a decision table. This corresponds to FEEL simple unary tests.

To see how this legacy behavior can be enabled again in the Camunda BPM Platform, please see the
[dmnFeelEnableLegacyBehavior][legacy behavior flag] engine configuration property. To enable this
behavior in a standalone DMN Engine setup, please refer to the `DefaultDmnEngineConfiguration`
[enableFeelLegacyBehavior][fluent feel flag setter] and [setEnableFeelLegacyBehavior][feel flag setter] 
methods.


[legacy behavior flag]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#dmnFeelEnableLegacyBehavior" >}}
[fluent feel flag setter]: {{< javadocref_url page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#enableFeelLegacyBehavior-boolean-" >}}
[feel flag setter]: {{< javadocref_url page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#setEnableFeelLegacyBehavior-boolean-" >}}
[input entries]: {{< ref "/reference/dmn11/decision-table/rule.md#input-entry-condition" >}}
