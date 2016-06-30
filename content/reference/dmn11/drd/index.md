---

title: "Decision Requirements Diagram"
weight: 20
layout: "section-list"

menu:
  main:
    name: "Decision Requirements Diagram"
    identifier: "dmn-ref-drd"
    parent: "dmn-ref"
    pre: "Models Dependencies between Decisions"

---

{{< img src="img/drd.png">}}

A Decision Requirements Diagram (aka DRD) models a domain of decision-making, showing the most important elements involved in it and the dependencies
between them. The elements modeled are decisions, knowledge sources, and input data.

A DRD is represented by the `definitions` element in the XML.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="dish" name="Desired Dish" namespace="party">
  <decision id="dish-decision" name="Dish Decision">
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

# Decision Requirements Diagram Name

The name describes the DRD. It is set as the `name` attribute on the `definitions` element.


```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd"
    id="dish"
    name="Dish"
    namespace="party">
  <!-- ... -->
</definitions>
```

# Decision Requirements Diagram Id

The id is the technical identifier of the DRD. It is set in the `id` attribute on the `definitions` element.

Each DRD should have an unique id when it is [deployed] to the Camunda BPM
platform. The engine use the id as the decision requirement definition key of the deployed
`DecisionRequirementDefinition`.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd"
    id="dish"
    name="Dish"
    namespace="party">
  <!-- ... -->
</definitions>
```

[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[deployed]: {{< relref "user-guide/process-engine/decisions/repository.md#deploying-a-decision" >}}
