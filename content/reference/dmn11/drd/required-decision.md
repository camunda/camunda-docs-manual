---

title: 'Required decision'
weight: 40

menu:
  main:
    name: "Required decision"
    identifier: "dmn-ref-drd-required-decision"
    parent: "dmn-ref-drd"
    pre: "Specify role of required decision"

---

The required decision describes the decision that is required to evaluate the
decision. It is set with the `href` attribute on the `requiredDecision` element.
The `href` attribute has the value that starts with `#` followed by the [decision id]({{< relref "reference/dmn11/decision-table/index.md#decision-id" >}}) of the required decision.

```xml
<decision id="Dish" name="Dish Decision">
  <informationRequirement>
      <requiredDecision href="#Season" />
  </informationRequirement>
  <!-- ... -->
</decision>
```