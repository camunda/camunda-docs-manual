---

title: 'DMN Decision Table Output'
weight: 20

menu:
  main:
    name: "Output"
    identifier: "dmn-ref-decision-table-output"
    parent: "dmn-ref-decision-table"
    pre: "Specify the Output of Decision Tables"

---

{{< img src="../img/output.png" title="Output" class="no-lightbox" >}}

A decision table can have one or more output, also called output clauses. An
output clause defines the id, label, name and type of a decision table output.

A output clause is represented by an `output` element inside a `decisionTable`
XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="decision" name="Dish">
    <decisionTable id="decisionTable">
      <!-- ... -->
      <output id="output1" label="Dish" name="desiredDish" typeRef="string" />
      <!-- ... -->
    </decisionTable>
  </decision>
</definitions>

```

# Output Id

The output id is an unique identifier of the decision table output. It is used
by the Camunda BPMN platform to reference the output in the history of
evaluated decisions. Therefore it is required by the Camunda DMN engine. It is
set as the `id` attribute of the `output` XML element.

```xml
<output id="output1" label="Dish" name="desiredDish" typeRef="string" />
```

# Output Label

{{< img src="../img/output-label.png" title="Output Label" class="no-lightbox" >}}

An output label is a short description of the output. It is set on the `output`
XML element in the `label` attribute. Note that the label is not required but
recommended since it helps to understand the decision.

```xml
<output id="output1" label="Dish" name="desiredDish" typeRef="string" />
```

# Output Name

{{< img src="../img/output-name.png" title="Output Name" class="no-lightbox" >}}

The name of the output is used to reference the value of the output in the
[decision table result]. It is specified by the `name` attribute on the
`output` XML element.

If the decision table has more than one output then all outputs must have an
unique name.

```xml
<output id="output1" label="Dish" name="desiredDish" typeRef="string" />
```

# Output Type Definition

{{< img src="../img/output-type-definition.png" title="Output Type Definition" class="no-lightbox" >}}

The type of the output clause can be specified by the `typeRef` attribute on the
`output` XML element. After an [output entry] is evaluated by the
DMN engine it converts the result to the specified type. The supported types
are listed in the [User Guide][supported DT].

```xml
<output id="output1" label="Dish" name="desiredDish" typeRef="string" />
```

Note that the type is not required but recommended since it provides a type
safety of the output values.

Additionally, the type can be used to transform the output value into another
type. For example, transform the output value `80%` of type String into a
Double using a [custom data type]({{< ref "/user-guide/dmn-engine/data-types.md#implement-a-custom-data-type" >}}).


[decision table result]: {{< ref "/user-guide/dmn-engine/evaluate-decisions.md#interpret-the-dmndecisiontableresult" >}}
[supported DT]: {{< ref "/user-guide/dmn-engine/data-types.md#supported-data-types" >}}
[output entry]: {{< ref "/reference/dmn11/decision-table/rule.md#output-entry-conclusion" >}}
[custom data type]: {{< ref "/user-guide/dmn-engine/data-types.md#implement-a-custom-data-type" >}}
