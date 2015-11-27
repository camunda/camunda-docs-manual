---

title: 'Output'
weight: 20

menu:
  main:
    name: "Output"
    identifier: "dmn-ref-decision-table-output"
    parent: "dmn-ref-decision-table"
    pre: "Specify the Output of Decision Tables"

---

{{< img src="../img/output.png" title="Output" class="no-lightbox" >}}

A decision table can have one or more outputs, also called output clauses or output components. An output clause is represented by an `output` element in XML.

```xml
<decision>
  <decisionTable>
    <!-- ... -->
    <output label="Dish" name="desiredDish" typeRef="string" />
    <!-- ... -->
  </decisionTable>
</decision>
```

# Output Label

{{< img src="../img/output-label.png" title="Output Label" class="no-lightbox" >}}

An output label is a short description of the output. It is set on the `output` element in the `label` attribute. Note that the label is not required but recommended since it helps to understand the decision.

```xml
<output label="Dish" />
```

# Output Name

{{< img src="../img/output-name.png" title="Output Name" class="no-lightbox" >}}

The name of the output is specified by the `name` attribute on the `output` element. It is used to reference the value of the output in the [decision result]({{< relref "user-guide/dmn-engine/evaluate-decisions.md#interpret-the-dmndecisiontableresult" >}}).

If the decision table has more than one output then all outputs must have an unique name.

```xml
<output name="desiredDish" />
```

# Output Type Definition

{{< img src="../img/output-type-definition.png" title="Output Type Definition" class="no-lightbox" >}}

The type of the output value can be specified by the `typeRef` attribute on the `output` element. After an output entry is evaluated the DMN engine checks if the type of the value matches the specified type. The supported types are listed in the [User Guide]({{< relref "user-guide/dmn-engine/data-types.md#supported-data-types" >}}).

Additionally, the type can be used to transform the output value into another type. For example, transform the output value `80%` of type String into a Double using a [custom data type]({{< relref "user-guide/dmn-engine/data-types.md#implement-a-custom-data-type" >}}).

```xml
<output typeRef="string" />
```

Note that the type is not required but recommended since it provides a type safety of the output values.
