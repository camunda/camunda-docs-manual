---

title: 'Input'
weight: 10

menu:
  main:
    name: "Input"
    identifier: "dmn-ref-decision-table-input"
    parent: "dmn-ref-decision-table"
    pre: "Specify the Inputs of Decision Tables"

---

{{< img src="../img/input.png" title="Input" class="no-lightbox" >}}

A decision table can have one or more inputs, also called input clauses. An input clause is represented by an `input` element in XML.

```xml
<decision>
  <decisionTable>
    <input label="How many guests">
      <inputExpression typeRef="integer">
        <text>guestCount</text>
      </inputExpression>
    </input>
    <!-- ... -->
  </decisionTable>
</decision>
```

# Input Label

{{< img src="../img/input-label.png" title="Input Label" class="no-lightbox" >}}

An input label is a short description of the input. It is set on the `input` element in the `label` attribute. Note that the label is not required but recommended since it helps to understand the decision.

```xml
<input label="How many guests" />
```

# Input Expression

{{< img src="../img/input-expression.png" title="Input Expression" class="no-lightbox" >}}

An input expression is an expression in an expression language that specifies the value of the input. It is usually simple and reference a variable which is available at runtime. The expression is set inside a `text` element that is a child of the `inputExpression` element.

```xml
<inputExpression>
  <text>guestCount</text>
</inputExpression>
```

In case JUEL is used as expression language, the expression `${guestCount}` is equals to `guestCount`. It is a short way to specify that a variable with name `guestCount` is set as value of the input.

## Input Expression Language

The expression language of the input expression can be specified by the `expressionLanguage` attribute on the `inputExpression` element. The supported expression languages are listed in the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#supported-expression-languages" >}}).

```xml
<inputExpression expressionLanguage="groovy" />
```

If no expression language is set then the global expression language is used which is set on the `definitions` element. In case no global expression language is set, the default expression language is used instead, by default JUEL. Please refer to the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#configuring-the-default-expression-language" >}}) how to configure the default expression language.

## Input Variable Name

When the input expression is evaluated then the value is stored in a variable. The name of the variable can be specified by the `camunda:inputVariable` [extension attribute]({{< relref "reference/dmn11/custom-extensions/camunda-attributes.md#inputvariable" >}}) on the `input` element. By default, the name is `cellInput`.

```xml
<input camunda:inputVariable="guestCount" />
```

The variable can be used in an expression of an input entry. For example, the JUEL expression `guestCount <= 8` checks if the input value is less than 8.

## Input Type Definition

{{< img src="../img/input-type-definition.png" title="Input Type Definition" class="no-lightbox" >}}

The type of the input value can be specified by the `typeRef` attribute on the `inputExpression` element. After the input expression is evaluated the DMN engine checks if the type of the value matches the specified type. The supported types are listed in the [User Guide]({{< relref "user-guide/dmn-engine/data-types.md#supported-data-types" >}}).

```xml
<inputExpression typeRef="integer" />
```

Note that the type is not required but recommended since it helps to understand the possible input values and provide a type safety to be aware of unexpected input values.
