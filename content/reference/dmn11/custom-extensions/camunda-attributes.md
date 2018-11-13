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

# historyTimeToLive

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the history time to live (in days) for the decision definition. It is used within <a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer or java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Any non-negative integer number or string containing a time in days defined by the ISO-8601 date format.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>null - means that decision definition history won't ever be removed during history cleanup run</td>
  </tr>
  <tr>
    <th>DMN 1.1 Elements</th>
    <td>
      Decision
    </td>
  </tr>
</table>

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
      <a href="{{< ref "/reference/dmn11/decision-table/input.md" >}}">Input</a>
    </td>
  </tr>
</table>

# versionTag

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      <p>
      The attribute specifies a version tag for the process definition.
      </p>
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Any value that has a meaning as version tag for the decision definition.
      <strong>Note:</strong> Sorting by versionTag is string based. The version will not be interpreted. As an example, the sorting could return v0.1.0, v0.10.0, v0.2.0.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>DMN 1.1 Elements</th>
    <td>
      Decision
    </td>
  </tr>
</table>
