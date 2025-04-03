---
title: 'Friendly Enough Expression Language'
weight: 70

menu:
  main:
    identifier: "user-guide-process-engine-expression-language-friendly-enough-expression-language"
    parent: "user-guide-process-engine-expression-language"

---

{{< note title="FEEL Support Limitation" class="warning" >}}
Please note that the WildFly and JBoss application servers do not support FEEL outside of DMN execution in Camunda 7.
{{< /note >}}

​The Friendly Enough Expression Language (FEEL) is specified within the Decision Model and Notation (DMN) standard by the Object Management Group (OMG). FEEL has the following features:

- Side-effect free
- Simple data model with numbers, dates, strings, lists, and contexts
- Simple syntax designed for a wide audience
- Three-valued logic (true, false, null) based on SQL and PMML

See the [official specification](https://www.omg.org/spec/DMN/1.0/PDF).

Within Camunda 7, FEEL can be used in many circumstances to evaluate small script-like expressions. The following table provides an overview of the BPMN elements which support usage of FEEL.

<table class="table desc-table">
  <tr>
    <th>BPMN element</th>
    <th>FEEL support</th>
  </tr>
  <tr>
    <td>
      <a href="#conditions">
        Sequence Flows, Conditional Events
      </a>
    </td>
    <td>Expression language as condition expression</td>
  </tr>
  <tr>
    <td>
        <a href="#inputoutput-parameters">
          All Tasks, All Events, Transaction, Subprocess and Connector
        </a>
    </td>
    <td>Expression language inside an inputOutput parameter mapping</td>
  </tr>
  <tr>
    <td>
        <a href="#value">
          Different Elements
        </a>
    </td>
    <td>Expression language as the value of an attribute or element</td>
  </tr>
  <tr>
    <td>
      <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#specifying-priorities-in-bpmn-xml" >}}">
        All Flow Nodes, Process Definition
      </a>
    </td>
    <td>Expression language to determine the priority of a job</td>
  </tr>
</table>

In contrast to the [Unified Expression Language]({{< ref "/user-guide/process-engine/expression-language/unified-expression-language.md" >}}) FEEL does not support `Expression language as delegation code` and does not provide access to beans and internal context variables. This steams from FEEL's nature of being Side-effect free.

# Usage of Expression Language

## Conditions
FEEL can be used to define conditions for sequence flows and conditional events.
For conditional sequence flows, a `conditionExpression` element of a sequence flow has to be used.
For conditional events, a `condition` element of a conditional event has to be used. Both are
of the type `tFormalExpression`. The text content of the element is the expression to be evaluated.

Within the expression, the execution variables are available.

The following example shows usage of expression language as condition of a sequence flow:

```xml
  <sequenceFlow>
    <conditionExpression xsi:type="tFormalExpression"  language="feel">
      test == 'foo'
    </conditionExpression>
  </sequenceFlow>
```

For usage of expression language on conditional events, see the following example:

```xml
<conditionalEventDefinition>
  <condition type="tFormalExpression">var1 == 1</condition language="feel">
</conditionalEventDefinition>
```


## inputOutput Parameters

With the Camunda `inputOutput` extension element you can map an `inputParameter` or `outputParameter`
with expression language.

For usage of expression language on `inputParameter` mapping, see the following example:

```xml
  <serviceTask id="task" camunda:class="org.camunda.bpm.example.SumDelegate">
    <extensionElements>
      <camunda:inputOutput>
        <camunda:inputParameter name="x">
          var1 + var2
        </camunda:inputParameter>
      </camunda:inputOutput>
    </extensionElements>
  </serviceTask>
```

## Value

Different BPMN elements allow to specify their content or an attribute value by an
expression. Please see the corresponding sections for [BPMN][] in the references
for more detailed examples.


# Availability of Variables and Functions Inside Expression Language

## Process Variables

A conditional sequence flow can directly check a variable value:

```xml
  <sequenceFlow>
    <conditionExpression xsi:type="tFormalExpression">
      ${test == 'start'}
    </conditionExpression>
  </sequenceFlow>
```
The list of variable types that is supported by FEEL can be found in the <a href="{{< ref "/user-guide/dmn-engine/feel/type-handling.md" >}}">FEEL Engine Type Handling</a> page.

## Custom Functions
Camunda 7 provides a wrapper for the FEEL Scala Engine to implement Custom Functions, which can be 
called in expressions and unary tests. 
To learn more visit the <a href="{{< ref "/user-guide/dmn-engine/feel/custom-functions" >}}">FEEL Engine Custom Functions</a> page.

## Built-In Camunda Spin Functions
To learn how Camunda Spin can be used together with the Scala FEEL Engine visit the <a href="{{< ref "/user-guide/dmn-engine/feel/type-handling.md#spin-types" >}}">FEEL Engine Spin Integration</a> page.

# Plugin Requirements

## Spin Plugin Requirement for Complex FEEL Mappings

When using FEEL to define complex input parameters (such as nested objects or contexts in BPMN input/output mappings) the
<a href="{{< ref "/user-guide/data-formats/configuring-spin-integration#camunda-engine-plugin-spin" >}}">camunda-engine-plugin-spin</a>
 **must** be present on the classpath.

Without the Spin plugin:

- **Simple values and shallow maps** can still be evaluated using FEEL.
- **Complex nested contexts** (e.g., a map containing another map) **will fail** with a runtime error when accessed in Java delegates or other components expecting Java types.
- FEEL expressions involving these structures will not be correctly parsed or mapped.

## Example

The following BPMN example defines a nested input parameter using a FEEL expression:

```xml
<camunda:inputParameter name="context">
  <camunda:script scriptFormat="feel">
    {
      invoice: {
        id: "INV-2024-001",
        issueDate: date("2024-04-02"),
        dueDate: date("2024-04-16"),
        customer: {
          name: "Example Corp",
          address: "123 Business Rd",
          country: "Germany"
        }
      }
   }
  </camunda:script>
</camunda:inputParameter>
```

To access this `context` as a `Map<String, Object>` in a Java delegate, the `camunda-engine-plugin-spin` plugin must be available so that the nested structure is correctly mapped.

[BPMN]: {{< ref "/reference/bpmn20/_index.md" >}}