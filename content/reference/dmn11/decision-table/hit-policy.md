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

A decision table has a hit policy that specifies what the
results of the evaluation of a decision table consist of.

The hit policy is set in the `hitPolicy` attribute on the `decisionTable` XML
element. If no hit policy is set then the default hit policy `UNIQUE` is used.

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="dish" name="Dish">
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

A hit policy specifies how many rules of a decision table can be satisfied and
which of the satisfied rules are included in the [decision table result]. The
hit policies [Unique], [Any] and [First] will always return a maximum of one
satisfied rule. The hit policies [Rule Order] and [Collect] can return
multiple satisfied rules.

## Unique Hit Policy

Only a single rule can be satisfied. The decision table result contains the
output entries of the satisfied rule.

If more than one rule is satisfied, the Unique hit policy is violated.

See the following decision table.
{{< img src="../img/hit-policy-unique.png" title="Hit Policy Unique" class="no-lightbox" >}}
Depending on the current season the dish should be chosen.
Only one dish can be chosen, since only one season can exist at the same time.

## Any Hit Policy

Multiple rules can be satisfied. However, all satisfied rules must generate the same
output. The decision table result contains only the output of one of the
satisfied rules.

If multiple rules are satisfied which generate different outputs, the hit policy
is violated.

See the following example:
{{< img src="../img/hit-policy-any.png" title="Hit Policy Any" class="no-lightbox" >}}
There is a decision table for the leave application. If the applier
has no vacation days left or he is currently in the probation period, the application will be refused.
Otherwise the application is applied.

## First Hit Policy

Multiple rules can be satisfied. The decision table result contains only
the output of the first satisfied rule.

{{< img src="../img/hit-policy-first.png" title="Hit Policy First" class="no-lightbox" >}}
See the decistion table for advertisement. Regarding the current age of the user, which
advertisement should be shown is decided. For example, the user is 19 years old. All the rules will match, but since
the hit policy is set to first only, the advertisement for Cars is used.

## Rule Order Hit Policy

Multiple rules can be satisfied. The decision table result contains the output
of all satisfied rules in the order of the rules in the decision table.

{{< img src="../img/hit-policy-rule-order.png" title="Hit Policy Rule Order" class="no-lightbox" >}}
Again, see the advertisement example with the rule order policy. Say we have a user at the age of 19 again.
All rules are satisfied so all outputs are given, ordered by the rule ordering.
It can perhaps be used to indicate the priority of the displayed advertisements.

## Collect Hit Policy

Multiple rules can be satisfied. The decision table result contains the output
of all satisfied rules in an arbitrary order as a list.

{{< img src="../img/hit-policy-collect.png" title="Hit Policy Collect" class="no-lightbox" >}}
With this hit policy, the output list has no ordering. So the advertisement will be arbitrary
if the age is for example 19.

Additionally, an aggregator can be specified for the Collect hit policy. If an
aggregator is specified, the decision table result will only contain a single
output entry. The aggregator will generate the output entry from all satisfied
rules. **Note** if the Collect hit policy is used with an aggregator, the
decision table can only have one output.

The aggregator is set as the `aggregation` attribute of the `descisionTable`
XML element.

```xml
<decisionTable id="decisionTable" hitPolicy="COLLECT" aggregation="SUM">
  <!-- .. -->
</decisionTable>
```

### Aggregators for Collect Hit Policy

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

#### SUM aggregator
The SUM aggregator sums up all outputs from the satisfied rules.
{{< img src="../img/hit-policy-collect-sum.png" title="Hit Policy Collect SUM" class="no-lightbox" >}}
The showed decision table can be used to sum up the salary bonus for an employee. For example, the employee has been working in the company for
3.5 years. So the first, second and third rule will match and the result of the decision table is 600, since the output is summed up.

#### MIN aggregator
The MIN aggregator can be used to return the smallest output value of all satisfied rules.
See the following example of a car insurance. After years without a car crash the insurance fee will be reduced.
{{< img src="../img/hit-policy-collect-min.png" title="Hit Policy Collect MIN" class="no-lightbox" >}}
For example, if the input for the decision table is 3.5 years, the result will be 98.83, since the first three rules match
but the third rule has the minimal output.

#### MAX aggregator
The MAX aggregator can be used to return the largest output value of all satisfied rules.

{{< img src="../img/hit-policy-collect-max.png" title="Hit Policy Collect MAX" class="no-lightbox" >}}

This decision table represents the decision for the amount of pocket money for a child.
Depending of the age, the amount grows. For example, an input of 9 will satisfy the first and second rules.
The output of the second rule is larger then the output of the first rule, so the output
will be 5. A child at the age of 9 will get 5 as pocket money.

#### COUNT aggregator
The COUNT aggregator can be use to return the count of satisfied rules.

{{< img src="../img/hit-policy-collect-count.png" title="Hit Policy Collect COUNT" class="no-lightbox" >}}

For example, see the salary bonus decision table again, this time with the COUNT aggregator.
With an input of 4, the first three rules will be satisfied. Therefore, the result from the decision table will be 3, which means
that after 4 years the result of the decision table is 3 salary bonuses.

[decision table result]: {{< ref "/user-guide/dmn-engine/evaluate-decisions.md#interpret-the-dmndecisiontableresult" >}}
[Unique]: #unique-hit-policy
[Any]: #any-hit-policy
[First]: #first-hit-policy
[Rule Order]: #rule-order-hit-policy
[Collect]: #collect-hit-policy
