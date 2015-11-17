---

title: 'Extension Attributes'
weight: 20

menu:
  main:
    identifier: "dmn-ref-extensions-attributes"
    parent: "dmn-ref-extensions"
    pre: "Reference of Camunda Extension Attributes for DMN."

---

The following attributes are extension attributes for the `camunda` namespace `http://camunda.org/schema/1.0/dmn`.

# inputVariable

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies the variable name which can be used to access the result
      of the input expression in an input entry expression.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of the variable as <code>java.lang.String</code>.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>cellInput</code></td>
  </tr>
  <tr>
    <th>DMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/dmn11/decision-table/input.md" >}}">Input</a>
    </td>
  </tr>
</table>
