---

title: 'DMN Hit Policies'
weight: 40

menu:
  main:
    name: "Hit Policies"
    identifier: "dmn-ref-decision-table-hp"
    parent: "dmn-ref-decision-table"
    pre: "Specify what is part of the result of a Decision Table Evaluation"

---

A decision table have a hit policy that specifies what is part of the result of a Decision Table Evaluation. The hit policy is set in the `hitPolicy` attribute on the `decisionTable` element. If no hit policy is set then the default hit policy `UNIQUE` is used.

```xml
<decisionTable hitPolicy="UNIQUE">
```

In the visual representation of the decision table the hit policy is specified by the initial letter of the hit policy. The following hit policies are supported:

<table class="table table-striped">
  <tr>
    <th>Visual representation</th>
    <th>XML representation</th>
  </tr>
  <tr>
    <td>U</td>
    <td>UNIQUE</td>
  </tr>
  <tr>
    <td>A</td>
    <td>ANY</td>
  </tr>
  <tr>
    <td>F</td>
    <td>FIRST</td>
  </tr>
  <tr>
    <td>R</td>
    <td>RULE ORDER</td>
  </tr>
  <tr>
    <td>C</td>
    <td>COLLECT</td>
  </tr>
</table>

# The Role of Hit Policies

# Unique Hit Policy

Only a single rule can be matched. The decision result contains the output entries of the matched rule. 

If more than one rule matched then an exception is thrown.

# Any Hit Policy



# First Hit Policy

# Rule Order Hit Policy

# Collect Hit Policy

Many rules can be matched but the decision table may only have one output. An aggregation function can be specified in the `aggregation` attribute on the `decisionTable` element to apply a simple function to the output values. If no aggregator is set, the decision result is the list of all the output values. 

```xml
<decisionTable hitPolicy="COLLECT" aggregation="SUM">
```

If the decision table contains more than one output then an exception is thrown.

## Aggregators for Collect Hit Policy

The aggregator function is applied to the output values and the result is used as decision result. The following aggregators are supported.

<table class="table table-striped">
  <tr>
    <th>Visual representation</th>
    <th>XML representation</th>
    <th>Result of the aggregation</th>
  </tr>
  <tr>
    <td>+</td>
    <td>SUM</td>
    <td>the sum of all output values</td>
  </tr>
  <tr>
    <td><</td>
    <td>MIN</td>
    <td>the smallest value of all output values</td>
  </tr>
  <tr>
    <td>></td>
    <td>MAX</td>
    <td>the largest value of all output values</td>
  </tr>
  <tr>
    <td>#</td>
    <td>COUNT</td>
    <td>the number of output values</td>
  </tr>
</table>
