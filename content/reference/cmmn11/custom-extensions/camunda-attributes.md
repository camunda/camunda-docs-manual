---

title: 'Extension Attributes'
weight: 20

menu:
  main:
    identifier: "cmmn-ref-extensions-attributes"
    parent: "cmmn-ref-extensions"
    pre: "Reference of Camunda Extension Attributes for CMMN."

---

The following attributes are extension attributes for the `camunda` namespace `http://camunda.org/schema/1.0/cmmn`.

# assignee

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies a performer of a <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of a performer as <code>java.lang.String</code> or an expression which evaluates to a <code>java.lang.String</code> e.g., <code>${perfomer}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>


# candidateGroups

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies which group(s) will be candidate for performing the <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of group ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g., <code>management</code> or <code>management, ${accountancyGroupId()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>

# candidateUsers

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies which user(s) will be candidate for performing the <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of user ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g., <code>kermit, gonzo</code> or <code>${ldapService.findAllSales()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>

# caseBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies which case definition version should be called inside the case task.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>latest</code>, <code>deployment</code>, <code>version</code>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      If the value is set to <code>version</code> the attribute <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#caseversion" >}}">camunda:caseVersion</a> is required, see <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#casebinding" >}}">Case Binding</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/case-task.md" >}}">Case Task</a>
    </td>
  </tr>
</table>

# caseTenantId

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the tenant id of the case definition which is to be resolved by a case task, see <a href="{{< relref "reference/cmmn11/tasks/case-task.md#case-tenant-id" >}}">Case Tenant Id</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A concrete tenant id or an expression which evaluates to a <code>java.lang.String</code> e.g., <code>${caseExecution.tenantId}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/case-task.md" >}}">Case Task</a>
    </td>
  </tr>
</table>

# caseVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute <strong>explicitly</strong> defines which case definition version should be called inside the case task.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      All deployed version numbers of the case definition to call or an expression which evaluates to a <code>java.lang.Integer</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/case-task.md" >}}">Case Task</a>
    </td>
  </tr>
</table>

# class

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which Java class will be executed at runtime. The stated class must implement a <a href="{{< relref "user-guide/process-engine/delegation-code.md#java-delegate" >}}">Java delegate</a> interface.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Fully qualified Java class name of a class which implements a <a href="{{< relref "user-guide/process-engine/delegation-code.md#java-delegate" >}}">Java Delegate</a> interface, e.g., <code>org.camunda.bpm.MyJavaDelegate</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>,
      camunda:caseExecutionListener
    </td>
  </tr>
</table>

# decisionBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies which decision definition version should be evaluated inside the <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">decision task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>latest</code>, <code>deployment</code>, <code>version</code>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      If the value is set to <code>version</code> the attribute <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#decisionversion" >}}">camunda:decisionVersion</a> is required.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>latest</code></td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">Decision Task</a>
    </td>
  </tr>
</table>

# decisionTenantId

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the tenant id of the decision definition which is to be evaluated by a decision task, see <a href="{{< relref "reference/cmmn11/tasks/decision-task.md#decision-tenant-id" >}}">Decision Tenant Id</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A concrete tenant id or an expression which evaluates to a <code>java.lang.String</code> e.g., <code>${caseExecution.tenantId}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">Decision Task</a>
    </td>
  </tr>
</table>

# decisionVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute <strong>explicitly</strong> defines which decision definition version should be called inside the <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">decision task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      All deployed version numbers of the decision definition to call or an expression which evaluates to a <code>java.lang.Integer</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">Decision Task</a>
    </td>
  </tr>
</table>

# delegateExpression

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute allows specification of an expression which must resolve to an object that implements the corresponding interface (see <a href="{{< relref "user-guide/process-engine/delegation-code.md" >}}">delegation code</a>).
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Expression which evaluates to a Java class implementing a <a href="{{< relref "user-guide/process-engine/delegation-code.md" >}}">delegation</a> interface, e.g., <code>${myVariableListener}</code>.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>,
      camunda:caseExecutionListener
    </td>
  </tr>
</table>


# dueDate

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies the initial due date of a <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a> when it is created.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      An expression which evaluates to a <code>java.util.Date</code>, <code>java.util.String</code> (<a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> formatted) or <code>null</code>, e.g., <code>${dueDate}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>


# expression

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute defines an expression which will be evaluated at runtime.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Expression, e.g., <code>${gender == 'male' ? 'Mr.' : 'Mrs.'}</code> or <code>#{printer.printMessage()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>,
      camunda:caseExecutionListener
    </td>
  </tr>
</table>

# formKey

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies a form resource. See <a href="{{< relref "user-guide/task-forms/index.md" >}}">task forms</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A <code>java.lang.String</code> of a form resource which can be evaluated by the <a href="{{< relref "webapps/tasklist/index.md" >}}">Tasklist</a>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>

# historyTimeToLive

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the history time to live (in days) for the case definition. It is used within <a href="{{< relref "user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a>.
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
    <td>null - means that case definition history won't ever be removed during history cleanup run</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      Case
    </td>
  </tr>
</table>

# mapDecisionResult

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute references which <a href="{{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#predefined-mapping-of-the-decision-result" >}}">built-in Decision Result Mapper</a> is used to pass the result of an evaluated decision to a case variable. It should be used in combination with <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#resultvariable" >}}">camunda:resultVariable</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      singleEntry, singleResult, collectEntries, resultList
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>resultList</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">Decision Task</a>
    </td>
  </tr>
</table>

# priority

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies the initial priority of a <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a> when it is created.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      An expression which evaluates to a <code>java.lang.Number</code> or a <code>java.lang.String</code> which represents a number or <code>null</code>, e.g., <code>${priority}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/human-task.md" >}}">Human Task</a>
    </td>
  </tr>
</table>

# processBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute specifies which process definition version should be called inside the process task.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>latest</code>, <code>deployment</code>, <code>version</code>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      If the value is set to <code>version</code> the attribute <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#processversion" >}}">camunda:processVersion</a> is required, see <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#processbinding" >}}">Process Binding</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/process-task.md" >}}">Process Task</a>
    </td>
  </tr>
</table>

# processTenantId

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the tenant id of the process definition which is to be resolved by a process task, see <a href="{{< relref "reference/cmmn11/tasks/process-task.md#process-tenant-id" >}}">Process Tenant Id</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A concrete tenant id or an expression which evaluates to a <code>java.lang.String</code> e.g., <code>${caseExecution.tenantId}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/process-task.md" >}}">Process Task</a>
    </td>
  </tr>
</table>

# processVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      This attribute <strong>explicitly</strong> defines which process definition version should be called inside the process task.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      All deployed version numbers of the process definition to call or an expression which evaluates to a <code>java.lang.Integer</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/process-task.md" >}}">Process Task</a>
    </td>
  </tr>
</table>

# repeatOnStandardEvent

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a transition in which the repetition rule of a stage or task is evaluated.
      <br>
      <br>
      Note that this attribute is omitted when the stage or task to repeat has at least one entry criterion.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>create</code>, <code>enable</code>, <code>disable</code>, <code>reenable</code>, <code>manualStart</code>, <code>start</code>, <code>complete</code>, <code>exit</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>complete</code></td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/markers/repetition-rule.md" >}}">Repetition Rule</a>
    </td>
  </tr>
</table>

# resource

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies an external resource. The resource can be part of the deployment or
      exists in the classpath. To specify the type of resource, a URL scheme like prefix
      <code>deployment://</code> resp. <code>classpath://</code> can be supplied. If the scheme is
      omitted, it is assumed that the resource exists in the classpath.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The path to a resource or an expression which returns the path. Optional the path can
      start with an URL like scheme <code>classpath://</code> or <code>deployment://</code> to
      specify where to find the resource. If omitted the resource is assumed to exists in the
      classpath.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>,
      camunda:caseExecutionListener
    </td>
  </tr>
</table>

# resultVariable

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the case variable in which the returned decision result is saved. It can be used in combination with <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a> to define a decision result mapping.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of a case variable to save the return value
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>CMMN 1.1 Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/tasks/decision-task.md" >}}">Decision Task</a>
    </td>
  </tr>
</table>

# variableName

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The variable name that is attached to element <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variableonpart" >}}">camunda:variableOnPart</a> for which the sentry listens. Sentry is evaluated when the variable event transition occurs.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Camunda extension element</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variableonpart" >}}">camunda:variableOnPart</a>
    </td>
  </tr>
</table>