---

title: 'DMN Decision Table Input'
weight: 10

menu:
  main:
    name: "Input"
    identifier: "dmn-ref-decision-table-input"
    parent: "dmn-ref-decision-table"
    pre: "Specify the Inputs of Decision Tables"

---

{{< img src="../img/input.png" title="Input" class="no-lightbox" >}}

A decision table can have one or more inputs, also called input clauses. An
input clause defines the id, label, expression and type of a decision table
input.

A input clause is represented by an `input` element inside a `decisionTable`
XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="dish" name="Dish">
    <decisionTable id="decisionTable">
      <input id="input1" label="Season">
        <inputExpression id="inputExpression1" typeRef="string">
          <text>season</text>
        </inputExpression>
      </input>
      <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

# Input Id

The input id is an unique identifier of the decision table input. It is used by
the Camunda BPMN platform to reference the input in the history of evaluated
decisions. Therefore it is required by the Camunda DMN engine. It is set as
the `id` attribute of the `input` XML element.

```xml
<input id="input1" label="Season">
  <inputExpression id="inputExpression1" typeRef="string">
    <text>season</text>
  </inputExpression>
</input>
```

# Input Label

{{< img src="../img/input-label.png" title="Input Label" class="no-lightbox" >}}

An input label is a short description of the input. It is set on the `input`
XML element in the `label` attribute. Note that the label is not required but
recommended since it helps to understand the decision.

```xml
<input id="input1" label="Season">
  <inputExpression id="inputExpression1" typeRef="string">
    <text>season</text>
  </inputExpression>
</input>
```

# Input Expression

{{< img src="../img/input-expression.png" title="Input Expression" class="no-lightbox" >}}

An input expression specifies how the value of the input clause is generated.
It is an expression which will be evaluated by the DMN engine. It is usually
simple and reference a variable which is available during the evaluation. The
expression is set inside a `text` element that is a child of the
`inputExpression` XML element.

```xml
<input id="input1" label="Season">
  <inputExpression id="inputExpression1" typeRef="string">
    <text>season</text>
  </inputExpression>
</input>
```

# Input Type Definition

{{< img src="../img/input-type-definition.png" title="Input Type Definition" class="no-lightbox" >}}

The type of the input clause can be specified by the `typeRef` attribute on the
`inputExpression` XML element. After the input expression is evaluated by the
DMN engine it converts the result to the specified type. The supported types
are listed in the [User Guide][supported DT].

```xml
<input id="input1" label="Season">
  <inputExpression id="inputExpression1" typeRef="string">
    <text>season</text>
  </inputExpression>
</input>
```

Note that the type is not required but recommended since it helps to understand
the possible input values and provide a type safety to be aware of unexpected
input values.

# Input Expression Language

The expression language of the input expression can be specified by the
`expressionLanguage` attribute on the `inputExpression` XML element. The
supported expression languages are listed in the [User Guide][supported EL].

```xml
<input id="input1" label="Season">
  <inputExpression id="inputExpression1" typeRef="string" expressionLanguage="groovy">
    <text>season</text>
  </inputExpression>
</input>
```

If no expression language is set then the global expression language is used
which is set on the `definitions` XML element.

```xml
<definitions id="definitions"
             name="definitions"
             xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"
             expressionLanguage="groovy"
             namespace="http://camunda.org/schema/1.0/dmn">
  <!-- ... -->
</definitions>
```

In case no global expression language is set, the default expression language
is used instead. The default expression language for input expressions is JUEL.
Please refer to the [User Guide][default EL] to read more about expression
languages.

# Input Variable Name

When the input expression is evaluated then the return value is stored in a variable.
The name of the variable can be specified by the `camunda:inputVariable`
[extension attribute][inputVariable] on the `input` element. By default, the
name is `cellInput`.

To use the attribute you have to define the Camunda DMN namespace
`xmlns:camunda="http://camunda.org/schema/1.0/dmn` in the XML.

```xml
<definitions id="definitions"
             name="definitions"
             xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd"
             xmlns:camunda="http://camunda.org/schema/1.0/dmn"
             namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="dish" name="Dish">
    <decisionTable id="decisionTable">
      <input id="input1"
             label="Season"
             camunda:inputVariable="currentSeason">
        <!-- ... -->
      </input>
      <!-- ... -->
    </decisionTable>
  </decision>
</definitions>
```

The variable can be used in an expression of an [input entry]. For example, the
JUEL expression `currentSeason != "Fall"` checks if the season input is not
`"Fall"`.

[supported EL]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md#supported-expression-languages" >}}
[default EL]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md#default-expression-languages" >}}
[supported DT]: {{< relref "user-guide/dmn-engine/data-types.md#supported-data-types" >}}
[inputVariable]: {{< relref "reference/dmn11/custom-extensions/camunda-attributes.md#inputvariable" >}}
[input entry]: {{< relref "reference/dmn11/decision-table/rule.md#input-entry-condition" >}}
