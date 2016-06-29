---

title: "Decision Requirements Diagram"
weight: 20
layout: "section-list"

menu:
  main:
    name: "DRD"
    identifier: "dmn-ref-drd"
    parent: "dmn-ref"
    pre: "Specify decision logic with Decision Requirements Diagram"

---

{{< img src="img/drd.png">}}
<script type="text/javascript" src="./img/map.js"></script>

Decision Requirements Diagram represents the decision requirements of various decisions. A decision consists of [decision table]
and a collection of required decision.
Required decision is also a decision that can have a [decision table] and a collection of required decision.

Required decision can be represented by the element `requiredDecision` inside the
`InformationRequirement` XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="Dish" name="Dish Decision">
    <informationRequirement>
      <requiredDecision href="#Season" />
    </informationRequirement>
	<informationRequirement>
      <requiredDecision href="#GuestCount" />
    </informationRequirement>
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
