---

title: 'FEEL Engine Legacy Behavior'
weight: 50

menu:
  main:
    name: "Legacy Behavior"
    identifier: "user-guide-dmn-engine-feel-legacy-behavior"
    parent: "user-guide-dmn-engine-feel"
    pre: "Only relevant for users coming from Camunda 7 version <= 7.12.0"

---

If you come from a Camunda 7 version <= 7.12.x and already use FEEL, it might be that you need to 
migrate your DMN models. To do this, please check out the [Migration Guide], where we've documented 
all breaking changes. 

If you don't want to migrate your DMN models right now, you can also restore the legacy FEEL 
behavior by flipping a config flag:

* To see how this legacy behavior can be enabled again in Camunda 7, please see the
[dmnFeelEnableLegacyBehavior][legacy behavior flag] engine configuration property.
* To enable this behavior in a standalone DMN Engine setup, please refer to the `DefaultDmnEngineConfiguration`
[enableFeelLegacyBehavior][fluent feel flag setter] and [setEnableFeelLegacyBehavior][feel flag setter] 
methods

{{< note title="Heads Up!" class="info" >}}
By using the legacy FEEL Engine, the Camunda DMN Engine **only** supports `FEEL` for 
<a href="{{< ref "/reference/dmn/decision-table/rule.md#input-entry-condition" >}}">Input Entries</a> of a decision table – this corresponds to FEEL 
simple unary tests.
{{< /note >}}

[Migration Guide]: {{< ref "/update/minor/712-to-713/_index.md#entirely-replaced-feel-engine" >}}
[legacy behavior flag]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#dmnFeelEnableLegacyBehavior" >}}
[fluent feel flag setter]: {{< javadocref_url page="org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#enableFeelLegacyBehavior" >}}
[feel flag setter]: {{< javadocref_url page="org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#setEnableFeelLegacyBehavior" >}}
