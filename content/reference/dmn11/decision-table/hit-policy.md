---

title: 'DMN Hit Policy'
weight: 40

menu:
  main:
    name: "Hit Policy"
    identifier: "dmn-ref-decision-table-hp"
    parent: "dmn-ref-decision-table"
    pre: "Specify what is part of the result of a Decision Table Evaluation"

---

{{< img src="../img/hit-policy.png" title="Hit Policy" class="no-lightbox" >}}

A decision table can have a hit policy that specifies what is part of the
result of the evaluation of a decision table.

The hit policy is set in the `hitPolicy` attribute on the `decisionTable` XML
element. If no hit policy is set then the default hit policy `UNIQUE` is used.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="decision" name="Dish">
    <decisionTable id="decisionTable" hitPolicy="RULE ORDER">
      <!-- .. -->
    </decisionTable>
  </decision>
</definitions>
```

In the visual representation of the decision table the hit policy is specified
by the initial letter of the hit policy. The following hit policies are
supported by the Camunda DMN engine:

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

# The Role of a Hit Policy

A hit policy specifies how many rules of a decision table can be satisfied. And
which of the satisfied rules are included in the [decision table result]. The
hit policies [Unique], [Any] and [First] will always return maximal one
satisfied rule. Whereas the hit policies [Rule Order] and [Collect] can return
multiple satisfied rules.

# Unique Hit Policy

Only a single rule can be satisfied. The decision table result contains the
output entries of the satisfied rule.

If more than one rule is satisfied the Unique hit policy is violated.

# Any Hit Policy

Multiple rules can be satisfied. But all satisfied rules must generate the same
output. The decision table result contains only the output of one of the
satisfied rules.

If multiple rules are satisfied which generate different outputs the hit policy
is violated.

# First Hit Policy

Multiple rules can be satisfied. The decision table result contains only
the output of the first satisfied rule.

# Rule Order Hit Policy

Multiple rules can be satisfied. The decision table result contains the output
of all satisfied rules in the order of the rules in the decision table.

# Collect Hit Policy

Multiple rules can be satisfied. The decision table result contains the output
of all satisfied rules in an arbitrary order.

Additionally an aggregator can be specified for the Collect hit policy. If an
aggregator is specified the decision table result will only contain a single
output entry. The aggregator will generate the output entry from all satisfied
rules. **Note** if the Collect hit policy is used with an aggregator the
decision table can only have one output.

The aggregator is set as the `aggregation` attribute of the `descisionTable`
XML element.

```xml
<decisionTable id="decisionTable" hitPolicy="COLLECT" aggregation="SUM">
  <!-- .. -->
</decisionTable>
```

## Aggregators for Collect Hit Policy

{{< img src="../img/collect-aggregator.png" title="Hit Policy Collect with Aggregation" class="no-lightbox" >}}

In the visual representation of the decision table the aggregator is specified
by a marker after the hit policy. The following aggregators are supported by
the Camunda DMN engine:

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


[decision table result]: {{< relref "user-guide/dmn-engine/evaluate-decisions.md#interpret-the-dmndecisiontableresult" >}}
[Unique]: #unique-hit-policy
[Any]: #any-hit-policy
[First]: #first-hit-policy
[Rule Order]: #rule-order-hit-policy
[Collect]: #collect-hit-policy
