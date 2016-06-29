---

title: 'Required decision Mapping'
weight: 40

menu:
  main:
    name: "Required decision Mapping"
    identifier: "dmn-ref-drd-required-decision-mapping"
    parent: "dmn-ref-drd"
    pre: "Specify the mapping of required decisions with the decision"

---

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
[input expression]: {{< relref "reference/dmn11/decision-table/input.md#input-expression" >}}
[output name]: {{< relref "reference/dmn11/decision-table/output.md#output-name" >}}
