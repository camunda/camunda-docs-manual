---

title: 'camunda Extension Elements'
category: 'Custom Extensions'

---

The following elements are extension elements for the `camunda` namespace `http://camunda.org/schema/1.0/cmmn`.

## camunda:in

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      This element specifies variables which should be passed to the sub instance (process instance or case instance), see <a href="ref:#tasks-process-task-exchange-variables">passing variables to called process</a> or <a href="ref:#tasks-case-task-exchange-variables">passing variables to called case</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>source</code></td>
    <td>
      A name of a variable to be passed in
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>sourceExpression</code></td>
    <td>
      An expression to be evaluated and passed in
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>variables</code></td>
    <td>
      Can be set to <code>all</code> to pass all variables in
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>target</code></td>
    <td>
      Name of the variable inside the sub instance
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>businessKey</code></td>
    <td>
      Set the business key of the sub instance
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      Only one of the attributes <code>source</code>, <code>sourceExpression</code>, <code>variables</code> or <code>businessKey</code> can be used
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>target</code> is required if the <code>source</code> or <code>sourceExpression</code> attribute is used
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#tasks-process-task">Process Task</a>,
      <a href="ref:#tasks-case-task">Case Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


## camunda:out

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      This element specifies variables which should be passed back from the sub instance (process instance or case instance), see <a href="ref:#tasks-process-task-exchange-variables">passing variables to called process</a> or <a href="ref:#tasks-case-task-exchange-variables">passing variables to called case</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>source</code></td>
    <td>
      A name of a variable to be passed back
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>sourceExpression</code></td>
    <td>
      An expression to be evaluated and passed back
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>variables</code></td>
    <td>
      Can be set to <code>all</code> to pass all sub instance variables back
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>target</code></td>
    <td>
      Name of the variable inside the calling case instance
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      Only one of the attributes <code>source</code>, <code>sourceExpression</code>, <code>variables</code> or <code>businessKey</code> can be used
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>target</code> is required if the <code>source</code> or <code>sourceExpression</code> attribute is used
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#tasks-process-task">Process Task</a>,
      <a href="ref:#tasks-case-task">Case Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>
