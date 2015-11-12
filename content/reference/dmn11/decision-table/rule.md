---

title: 'DMN Rules'
weight: 30

menu:
  main:
    name: "Rules"
    identifier: "dmn-ref-decision-table-rules"
    parent: "dmn-ref-decision-table"
    pre: "Specify Conditions and Conclusions"

---

A decision table have one or more rules. Each rule contains input and output entries. The input entries are the condition and the output entries the conclusion of the rule. If each input entry is satisfied then the rule matches and the decision result contains the output entries of this rule.

A rule is represented by a `rule` element in XML.
 
```xml
<decision>
  <decisionTable>
    <!-- ... -->  
    <rule>
      <inputEntry>
        <text><![CDATA[ "Fall" ]]></text>
      </inputEntry>
      <inputEntry>
        <text><![CDATA[ <= 8 ]]></text>
      </inputEntry>
      <outputEntry>
        <text><![CDATA[ "Spareribs" ]]></text>
      </outputEntry>
    </rule> 
  </decisionTable>
</decision>
```

# Input Entries (Conditions)

A rule can have one or more input entries which are the condition of the rule. Each input entry contains an expression in a `text` element inside an `inputEntry` element.

The input entry is satisfied when the expression returns `true` or it is empty.

```xml
<inputEntry>
  <text><![CDATA[ <= 8 ]]></text>
</inputEntry>
```

## Empty Input Entries

In case an input is irrelevant for a rule, this rule contains an empty input entry which is always satisfied.  

If FEEL is used as expression language then an empty input entry is represented by a `-`. Otherwise, the expression is empty.

## Expression Language of an Input Entry

The expression language of the expression can be specified by the `expressionLanguage` attribute on the `inputEntry` element. The supported expression languages are listed in the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#supported-expression-languages" >}}).

```xml
<inputEntry expressionLanguage="groovy" />
```

If no expression language is set then the global expression language is used which is set on the `definitions` element. In case no global expression language is set, the default expression language is used instead, by default [FEEL]({{< relref "reference/dmn11/feel/index.md" >}}). Please refer to the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#configuring-the-default-expression-language" >}}) how to configure the default expression language.

# Output Entries (Conclusions)

A rule have one or more output entries which are the conclusions of the rule. Each output entry contains an expression in a `text` element inside an `outputEntry` element.

```xml
<outputEntry>
  <text><![CDATA[ "Spareribs" ]]></text>
</outputEntry>
```

In case JUEL is used as expression language, the expression `${"Spareribs"}` is equals to `"Spareribs"`. It is a short way to specify that the output value is the String `Spareribs`.

## Expression Language of an Output Entry

The expression language of the expression can be specified by the `expressionLanguage` attribute on the `outputEntry` element. The supported expression languages are listed in the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#supported-expression-languages" >}}).

```xml
<outputEntry expressionLanguage="groovy" />
```

If no expression language is set then the global expression language is used which is set on the `definitions` element. In case no global expression language is set, the default expression language is used instead, by default JUEL. Please refer to the [User Guide]({{< relref "user-guide/dmn-engine/expressions-and-scripts.md#configuring-the-default-expression-language" >}}) how to configure the default expression language.

## Empty Output Entries

If the output entry is empty or contains an empty expression then the output is ignored and no part of the decision result. 

# Descriptions

A rule can contains a description that provide additional informations. The description, also called annotation, is set inside the `description` element.

```xml
<description>Save money</description>
```
