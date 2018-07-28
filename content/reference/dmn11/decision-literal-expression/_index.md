---

title: "DMN Decision Literal Expression"
weight: 15

menu:
  main:
    name: "Decision Literal Expression"
    identifier: "dmn-ref-decision-literal-expression"
    parent: "dmn-ref"
    pre: "Specify Decision Logic as an Expression"

---

{{< img src="img/decision-literal-expression.png" title="Decision Literal Expression" class="no-lightbox" >}}

A decision literal expression represents decision logic which can be depicted as an expression in DMN 1.1.
It consists of a [literal expression] and a [variable].

A decision literal expression is represented by a `literalExpression` element inside a `decision` XML element.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="season" name="Season">
    <variable name="season" typeRef="string" />
    <literalExpression>
      <text>calendar.getSeason(date)</text>
    </literalExpression>
  </decision>
</definitions>
```

# Decision Name

{{< img src="img/decision-name.png" title="Decision Name" class="no-lightbox" >}}

The name describes the decision for which the literal expression provides the
decision logic. It is set as the `name` attribute on the `decision` element.

```xml
<decision id="season" name="Season">
    <!-- ... -->
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
<decision id="season" name="Season">
    <!-- ... -->
</decision>
```

# Literal Expression

The literal expression specifies how the value of the decision is generated. It is an expression which will be evaluated by the DMN engine.
It can be used to do a complex calculation, to invoke a bean which provides decision logic, or to combine the output values of [required decisions].

The expression is set inside a `text` element that is a child of the `literalExpression` XML element.

```xml
<literalExpression>
  <text>calendar.getSeason(date)</text>
</literalExpression>
```

## Literal Expression Language

The expression language of the literal expression can be specified by the
`expressionLanguage` attribute on the `literalExpression` XML element. The
supported expression languages are listed in the [User Guide][supported EL].

```xml
<literalExpression expressionLanguage="groovy">
  <text>calendar.getSeason(date)</text>
</literalExpression>
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
is used instead. The default expression language for literal expressions is JUEL.
Please refer to the [User Guide][default EL] to read more about expression
languages.

# Variable

A decision literal expression must have a variable which specifies the name and the type of the decision result.
A variable is represented by a `variable` element inside a `decision` XML element.

```xml
<decision id="season" name="Season">
  <variable name="season" />
</decision>
```

## Variable Name

The name of the variable is used to reference the value of the literal expression in the decision result. It is specified by the `name` attribute on the `variable` XML element.

```xml
<variable name="season" />
```

## Variable Type Definition

The type of the decision result can be specified by the `typeRef` attribute on the
`variable` XML element. After the expression is evaluated by the
DMN engine it converts the result to the specified type. The supported types
are listed in the [User Guide][supported DT].

```xml
<variable name="season" typeRef="string" />
```

Note that the type is not required but recommended since it provides a type
safety of the expression result.

[literal expression]: {{< relref "reference/dmn11/decision-literal-expression/_index.md#literal-expression" >}}
[variable]: {{< relref "reference/dmn11/decision-literal-expression/_index.md#variable" >}}
[supported EL]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md#supported-expression-languages" >}}
[default EL]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md#default-expression-languages" >}}
[supported DT]: {{< relref "user-guide/dmn-engine/data-types.md#supported-data-types" >}}
[deployed]: {{< relref "user-guide/process-engine/decisions/repository.md" >}}
[required decisions]: {{< relref "reference/dmn11/drg/_index.md#required-decisions" >}}

