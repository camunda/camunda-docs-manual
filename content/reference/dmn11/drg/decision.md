---

title: 'Decision'
weight: 10

menu:
  main:
    name: "Decision"
    identifier: "dmn-ref-drg-decision"
    parent: "dmn-ref-drg"
    pre: "Specify the Decision Logic"

---

{{< img src="../img/drd.png">}}

A decision requirements graph can have one or more decisions. 
A decision defines the [id], [name] and required decisions and contains the decision logic as [decision table] or [decision literal expression].

A decision is represented by a `decision` element inside the `definitions` XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="dish" name="Desired Dish" namespace="party">
  <decision id="dish-decision" name="Dish Decision">
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

# Required Decisions

A decision can have one or more required decisions which it depends on. 

A required decision is represented by a `requiredDecision` element inside an `informationRequirement` XML element. 
It has a `href` attribute and the value starts with `#` followed by the [decision id]({{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}) of the required decision.

```xml
<decision id="dish-decision" name="Dish Decision">
  <informationRequirement>
      <requiredDecision href="#season" />
  </informationRequirement>
  <!-- ... -->
</decision>
```

[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[decision literal expression]: {{< relref "reference/dmn11/decision-literal-expression/index.md" >}}
[id]: {{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}
[name]: {{< relref "reference/dmn11/decision-table/index.md#decision-name" >}}

