---

title: "Decision Requirements Graph"
weight: 20

menu:
  main:
    name: "Decision Requirements Graph"
    identifier: "dmn-ref-drg"
    parent: "dmn-ref"
    pre: "Models Dependencies between Decisions"

---

{{< img src="img/drd.png" title="Decision Requirements Graph" class="no-lightbox" >}}

A Decision Requirements Graph (DRG) models a domain of decision-making, showing the most important elements involved in it and the dependencies
between them. The elements modeled are [decisions], [input data], and [knowledge sources].

The visual representation of a DRG is called Decision Requirements Diagram (DRD).

In the XML a DRG is represented by the `definitions` element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dinnerDecisions" name="Dinner Decisions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="dish" name="Dish">
    <!-- ... -->
  </decision>
  <decision id="beverages" name="Beverages">
    <!-- ... -->
  </decision>
</definitions>
```

# Decision Requirements Graph Name

{{< img src="img/drg-name.png" title="Decision Requirements Graph Name" class="no-lightbox" >}}

The name describes the DRG. It is set as the `name` attribute on the `definitions` element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" 
             id="dinnerDecisions" 
             name="Dinner Decisions" 
             namespace="http://camunda.org/schema/1.0/dmn">
  <!-- ... -->
</definitions>
```

# Decision Requirements Graph Id

{{< img src="img/drg-id.png" title="Decision Requirements Graph Id" class="no-lightbox" >}}

The id is the technical identifier of the DRG. It is set in the `id` attribute on the `definitions` element.

Each DRG should have an unique id when it is [deployed] to the Camunda BPM
platform. The engine use the id as the decision requirements definition key of the deployed
`DecisionRequirementsDefinition`.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" 
             id="dinnerDecisions" 
             name="Dinner Decisions" 
             namespace="http://camunda.org/schema/1.0/dmn">
  <!-- ... -->
</definitions>
```

# Decision

{{< img src="img/decision.png" title="Decision" class="no-lightbox" >}}

A decision requirements graph can have one or more decisions. A decision has a [name] which is shown in the DRD and an [id]. The decision logic inside the decision must be either a [decision table] or a [decision literal expression].

A decision is represented by a `decision` element inside the `definitions` XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dish" name="Desired Dish" namespace="party">
  <decision id="beverages" name="Beverages">
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

## Required Decisions

{{< img src="img/required-decision.png" title="Required Decision" class="no-lightbox" >}}

A decision can have one or more required decisions which it depends on. 

A required decision is represented by a `requiredDecision` element inside an `informationRequirement` XML element. 
It has a `href` attribute and the value starts with `#` followed by the [decision id]({{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}) of the required decision.

```xml
<decision id="beverages" name="Beverages">
  <informationRequirement>
      <requiredDecision href="#dish" />
  </informationRequirement>
  <!-- ... -->
</decision>
```

# Input Data

{{< img src="img/input-data.png" title="Input Data" class="no-lightbox" >}}

An input data denotes information used as an input by one or more decisions. 

It is represented by an `inputData` element inside the `definitions` element. 

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dinnerDecisions" name="Dinner Decisions" namespace="http://camunda.org/schema/1.0/dmn">
  <inputData id="guestsWithChildren" name="Guests with children?" />
  
  <decision id="beverages" name="Beverages">
    <informationRequirement>
      <requiredInput href="#guestsWithChildren" />
    </informationRequirement>
    <!-- ... -->
</definitions>
```

Note that an input data has no execution semantics and is ignored by the Camunda DMN engine.

# Knowledge Source

{{< img src="img/knowledge-source.png" title="Knowledge Source" class="no-lightbox" >}}

A knowledge source denotes an authority for a Decision.

It is represented by a `knowledgeSource` element inside the `definitions` element. 

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dinnerDecisions" name="Dinner Decisions" namespace="http://camunda.org/schema/1.0/dmn">
  <knowledgeSource id="cookbook" name="Men's Cookbook" />
  
  <decision id="dish" name="Dish">
    <authorityRequirement>
      <requiredDecision href="#cookbook" />
    </authorityRequirement>
    <!-- ... -->
</definitions>
```

Note that a knowledge source has no execution semantics and is ignored by the Camunda DMN engine.



[decisions]: {{< relref "#decision" >}}
[input data]: {{< relref "#input-data" >}}
[knowledge sources]: {{< relref "#knowledge-source" >}}
[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[deployed]: {{< relref "user-guide/process-engine/decisions/repository.md#deploying-a-decision" >}}
[decision literal expression]: {{< relref "reference/dmn11/decision-literal-expression/index.md" >}}
[id]: {{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}
[name]: {{< relref "reference/dmn11/decision-table/index.md#decision-name" >}}
