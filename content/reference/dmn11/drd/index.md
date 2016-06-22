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

# Required decision

The required decision describes the decision that is required to evaluate the
decision. It is set with the `href` attribute on the `requiredDecision` element.
The `href` attribute has the value that starts with `#` followed by the [decision id] of the required decision.

```xml
<decision id="Dish" name="Dish Decision">
  <informationRequirement>
      <requiredDecision href="#Season" />
  </informationRequirement>
  <!-- ... -->
</decision>
```
# Required Decision Mapping

Decision is mapped to the required decisions by the [output name] and [input expression] of the decision table.
The `name` attribute in `output` element of the required decision is mapped to the `text` element in `inputExpression` element of the decision.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="Dish" name="Dish Decision">
    <informationRequirement>
      <requiredDecision href="#Season" />
    </informationRequirement>
	<informationRequirement>
      <requiredDecision href="#GuestCount" />
    </informationRequirement>
	 <decisionTable id="dishDecisionTable">
	 <input id="seasonInput">
        <inputExpression typeRef="string" >
		  <text>season</text>
		</inputExpression>
     </input>
	 <input id="guestCountInput">
        <inputExpression typeRef="integer" >
		  <text>guestCount</text>
		</inputExpression>
     </input>
    <!-- ... -->
    </decisionTable>
  </decision>

  <decision id="Season" name="Season decision">
     <decisionTable id="seasonDecisionTable">
	 <output id="seasonOutput" name="season" typeRef="string" />
    <!-- ... -->
    </decisionTable>
  </decision>

  <decision id="GuestCount" name="Guest Count">
     <decisionTable id="guestCountDecisionTable">
	 <output id="guestCountOutput" name="guestCount" typeRef="integer" />
    <!-- ... -->
    </decisionTable>
  </decision>
  
</definitions>
```

[decision id]:    {{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}
[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[output name]: {{< relref "reference/dmn11/decision-table/output.md#output-name" >}}
[input expression]: {{< relref "reference/dmn11/decision-table/input.md#input-expression" >}}
