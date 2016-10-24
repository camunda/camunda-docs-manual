---

title: "Decision Requirements Graph"
weight: 20
layout: "section-list"

menu:
  main:
    name: "Decision Requirements Graph"
    identifier: "dmn-ref-drg"
    parent: "dmn-ref"
    pre: "Models Dependencies between Decisions"

---

{{< img src="img/drd.png">}}

A Decision Requirements Graph (aka DRG) models a domain of decision-making, showing the most important elements involved in it and the dependencies
between them. The elements modeled are decisions, knowledge sources, and input data.

The visual representation of a DRG is called Decision Requirements Diagram (aka DRD).

In the XML a DRG is represented by the `definitions` element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dish" name="Desired Dish" namespace="party">
  <decision id="dish-decision" name="Dish Decision">
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

# Decision Requirements Graph Name

The name describes the DRG. It is set as the `name` attribute on the `definitions` element.


```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"
    id="dish"
    name="Dish"
    namespace="party">
  <!-- ... -->
</definitions>
```

# Decision Requirements Graph Id

The id is the technical identifier of the DRG. It is set in the `id` attribute on the `definitions` element.

Each DRG should have an unique id when it is [deployed] to the Camunda BPM
platform. The engine use the id as the decision requirements definition key of the deployed
`DecisionRequirementsDefinition`.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"
    id="dish"
    name="Dish"
    namespace="party">
  <!-- ... -->
</definitions>
```

[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[deployed]: {{< relref "user-guide/process-engine/decisions/repository.md#deploying-a-decision" >}}
