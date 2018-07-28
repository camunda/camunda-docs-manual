---

title: "DMN Decision Table"
weight: 10

menu:
  main:
    name: "Decision Table"
    identifier: "dmn-ref-decision-table"
    parent: "dmn-ref"
    pre: "Specify Decision Logic as a Table"

---

{{< img src="img/dish-table.png" class="no-lightbox" >}}
<script type="text/javascript" src="./img/map.js"></script>

A decision table represents decision logic which can be depicted as a table in
DMN 1.1. It consists of [inputs], [outputs] and [rules].

A decision table is represented by a `decisionTable` element inside a
`decision` XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="dish" name="Dish">
    <decisionTable id="decisionTable">
    <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

# Decision Name

{{< img src="img/decision-name.png" title="Decision Name" class="no-lightbox" >}}

The name describes the decision for which the decision table provides the
decision logic. It is set as the `name` attribute on the `decision` element.

```xml
<decision id="dish" name="Dish">
  <decisionTable id="decisionTable">
  <!-- ... -->
  </decisionTable>
</decision>
```

# Decision Id

{{< img src="img/decision-id.png" title="Decision Id" class="no-lightbox" >}}

The id is the technical identifier of the decision. It is set in the `id`
attribute on the `decision` element.

Each decision should have an unique id when it is [deployed] to the Camunda BPM
platform. The engine uses the id as the decision key of the deployed
`DecisionDefinition`.

```xml
<decision id="dish" name="Dish">
  <decisionTable id="decisionTable">
  <!-- ... -->
  </decisionTable>
</decision>
```


[inputs]: {{< relref "reference/dmn11/decision-table/input.md" >}}
[outputs]: {{< relref "reference/dmn11/decision-table/output.md" >}}
[rules]: {{< relref "reference/dmn11/decision-table/rule.md" >}}
[deployed]: {{< relref "user-guide/process-engine/decisions/repository.md" >}}
