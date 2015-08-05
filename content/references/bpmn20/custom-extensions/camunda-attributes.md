---

title: 'Extension Attributes'
weight: 20

menu:
  main:
    identifier: "bpmn-extensions-attributes"
    parent: "bpmn-extensions"

---

The following attributes are extension attributes for the `camunda` namespace `http://activiti.org/bpmn`.

### camunda:assignee

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a human performer of a <a href="ref:#tasks-user-task">User Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of a performer as <code>java.lang.String</code> or an expression which evaluates to a <code>java.lang.String</code> e.g. <code>${initiator}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="{{< relref "references/bpmn20/tasks/user-task.md" >}}">User Task</a>
    </td>
  </tr>
</table>

### camunda:asyncAfter

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      Specifies an asynchronous contiuation after an activity, see <a href="ref:/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">Asynchronous Continuations</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Boolean</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>true</code>, <code>false</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-start-events">Start Events</a>,
      <a href="ref:#events">End Events</a>,
      <a href="ref:#events">Intermediate Throw Events</a>,
      <a href="ref:#events">Intermediate Catch Events</a>,

      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#tasks-manual-task">Manual Task</a>,

      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>,

      <a href="ref:#gateways-parallel-gateway">Parallel Gateway</a>,
      <a href="ref:#gateways-inclusive-gateway">Inclusive Gateway</a>,
      <a href="ref:#gateways-data-based-exclusive-gateway-xor">Exclusive Gateway</a>,

      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a>
    </td>
  </tr>
</table>

### camunda:asyncBefore

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      Specifies an asynchronous continuation before an activity, see <a href="ref:/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations">Asynchronous Continuations</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Boolean</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>true</code>, <code>false</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-start-events">Start Events</a>,
      <a href="ref:#events">End Events</a>,
      <a href="ref:#events">Intermediate Throw Events</a>,
      <a href="ref:#events">Intermediate Catch Events</a>,

      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#tasks-manual-task">Manual Task</a>,

      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>,

      <a href="ref:#gateways-parallel-gateway">Parallel Gateway</a>,
      <a href="ref:#gateways-event-based-gateway">Event Based Gateway</a>,
      <a href="ref:#gateways-inclusive-gateway">Inclusive Gateway</a>,
      <a href="ref:#gateways-data-based-exclusive-gateway-xor">Exclusive Gateway</a>,

      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a>
    </td>
  </tr>
</table>

### camunda:calledElementBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which process definition version of the subprocess the call activity calls.
      If the value is <code>version</code> the attribute <a href="ref:#custom-extensions-camunda-extension-attributes-camundacalledelementversion">camunda:calledElementVersion</a>
      is required, see <a href="ref:#subprocesses-call-activity-calledelement-binding">Called Element Binding</a> for more information.
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
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#subprocesses-call-activity">Call Activity</a>
    </td>
  </tr>
</table>

### camunda:calledElementVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which process definition version of the subprocess the call activity calls if the <a href="ref:#custom-extensions-camunda-extension-attributes-camundacalledelementbinding">camunda:calledElementBinding</a>
      is set to <code>version</code>, see <a href="ref:#subprocesses-call-activity-calledelement-binding">Called Element Binding</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A concrete version of all deployed version numbers of the subprocess to call as <code>java.lang.Integer</code> or an expression which evaluates to a <code>java.lang.Integer</code> e.g. <code>${versionToCall}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#subprocesses-call-activity">Call Activity</a>
    </td>
  </tr>
</table>

### camunda:candidateGroups

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which group(s) will be candidate for performing the <a href="ref:#tasks-user-task">User Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of group ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g. <code>management</code> or <code>management, ${accountancyGroupId()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:candidateStarterGroups

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which group(s) will be able to start the process.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of group ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g. <code>management</code> or <code>management, ${accountancyGroupId()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      Process
    </td>
  </tr>
</table>

### camunda:candidateStarterUsers

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which user(s) will be able to start the process.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of user ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g. <code>kermit, gonzo</code> or <code>${ldapService.findAllSales()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      Process
    </td>
  </tr>
</table>

### camunda:candidateUsers

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which user(s) will be candidate for performing the <a href="ref:#tasks-user-task">User Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Comma separated list of user ids as <code>java.lang.String</code> or expressions that evaluate to a <code>java.lang.String</code> or a <code>java.util.Collection</code> of <code>java.lang.String</code>, e.g. <code>kermit, gonzo</code> or <code>${ldapService.findAllSales()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:caseBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which case definition version of the subcase the call activity calls.
      If the value is <code>version</code> the attribute <a href="ref:#custom-extensions-camunda-extension-attributes-camundacaseversion">camunda:caseVersion</a>
      is required, see <a href="ref:#subprocesses-call-activity-create-a-case-instance">Case Binding</a> for more information.
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
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#subprocesses-call-activity-create-a-case-instance">Call Activity</a>
    </td>
  </tr>
</table>

### camunda:caseRef

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute references a case definition by its key to call.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#subprocesses-call-activity-create-a-case-instance">Call Activity</a>
    </td>
  </tr>
</table>

### camunda:caseVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which case definition version of the subcase the call activity calls if the <a href="ref:#custom-extensions-camunda-extension-attributes-camundacasebinding">camunda:caseBinding</a> is set to <code>version</code>, see <a href="ref:#subprocesses-call-activity-create-a-case-instance">Case Binding</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      All deployed version numbers of the subprocess to call
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#subprocesses-call-activity-create-a-case-instance">Call Activity</a>
    </td>
  </tr>
</table>

### camunda:class

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which Java class will be executed at runtime. The stated class must implement a <a href="/guides/user-guide/#process-engine-delegation-code-java-delegate">Java delegate</a> interface.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Fully qualified Java class name of a class which implements a <a href="/guides/user-guide/#process-engine-delegation-code-java-delegate">Java Delegate</a> interface, e.g <code>org.camunda.bpm.MyJavaDelegate</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      Message Event Definition of <a href="ref:#events-message-events-message-intermediate-throwing-event">Message Intermediate Throwing Event</a> or <a href="ref:#events-message-events-message-end-event">Message End Event</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundatasklistener">camunda:taskListener</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexecutionlistener">camunda:executionListner</a>
    </td>
  </tr>
</table>

### camunda:collection

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a collection, where for each element, an instance will be created. See <a href="ref:#tasks-task-markers-multiple-instance">Multiple Instance</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of a <code>java.util.Collection</code> process variable as <code>java.lang.String</code> or an Expression which evaluates to the name of a collection
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a> of Task,
      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>
    </td>
  </tr>
</table>

### camunda:decisionRef

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute references a decision definition to evalute by its key.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A String or an expression which evalutes to the key of a decision definition which should be evaluated by this task, e.g. <code>myDecisionDefinitionKey</code> or <code>${decisionKey}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>
    </td>
  </tr>
</table>

### camunda:decisionRefBinding

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which decision definition version the task evaluates.
      If the value is <code>version</code> the attribute <a href="ref:#custom-extensions-camunda-extension-attributes-camundadecisionrefversion">camunda:decisionRefVersion</a>
      is required.
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
    <th>Default Value</th>
    <td><code>latest</code></td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>
    </td>
  </tr>
</table>

### camunda:decisionRefVersion

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which decision definition version the task evaluates if the <a href="ref:#custom-extensions-camunda-extension-attributes-camundadecisionrefbinding">camunda:decisionRefBinding</a>
      is set to <code>version</code>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A concrete version of all deployed version numbers of the decision to call as <code>java.lang.Integer</code> or an expression which evaluates to a <code>java.lang.Integer</code> e.g. <code>${versionToCall}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>
    </td>
  </tr>
</table>

### camunda:delegateExpression

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute allows specification of an expression which must resolve to an object that implements the corresponding interface (see <a href="/guides/user-guide/#process-engine-delegation-code">delegation code</a>).
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Expression which evaluates to a Java class implementing a <a href="/guides/user-guide/#process-engine-delegation-code">delegation</a> interface, e.g. <code>${myJavaDelegate}</code> or <code>#{myTaskListener}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      Message Event Definition of <a href="ref:#events-message-events-message-intermediate-throwing-event">Message Intermediate Throwing Event</a> or <a href="ref:#events-message-events-message-end-event">Message End Event</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundatasklistener">camunda:taskListener</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexecutionlistener">camunda:executionListner</a>
    </td>
  </tr>
</table>

### camunda:dueDate

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the initial due date of a <a href="ref:#tasks-user-task">User Task</a> when it is created.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      An expression which evaluates to a <code>java.util.Date</code>, <code>java.util.String</code> (<a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> formatted) or <code>null</code>, e.g. <code>${dateVariable}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:elementVariable

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the process variable which will be set on each created instance, containing an element of the specified collection see
      <a href="ref:#tasks-task-markers-multiple-instance">Multiple Instance</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The name of a process variable as <code>java.lang.String</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a> of Task,
      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>
    </td>
  </tr>
</table>


### camunda:errorCodeVariable

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a process variable which will be set if an error has been received by the error start or boundary event, see <a href="ref:#events-error-events">Error Events</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      The error code of an error defined in the process definition.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-error-events">Error Events</a>
    </td>
  </tr>
</table>

### camunda:exclusive

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies that jobs should be executed exclusively. See <a href="ref:/guides/user-guide/#process-engine-the-job-executor-exclusive-jobs">Exclusive Jobs</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Boolean</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>true</code>, <code>false</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td><code>true</code></td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-start-events">Start Events</a>,
      <a href="ref:#events">End Events</a>,
      <a href="ref:#events">Intermediate Throw Events</a>,
      <a href="ref:#events">Intermediate Catch Events</a>,

      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#tasks-manual-task">Manual Task</a>,

      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>,

      <a href="ref:#gateways-parallel-gateway">Parallel Gateway</a>,
      <a href="ref:#gateways-event-based-gateway">Event Based Gateway</a>,
      <a href="ref:#gateways-inclusive-gateway">Inclusive Gateway</a>,
      <a href="ref:#gateways-data-based-exclusive-gateway-xor">Exclusive Gateway</a>,

      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a>
    </td>
  </tr>
</table>

### camunda:expression

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
      Expression, e.g. <code>${gender == 'male' ? 'Mr.' : 'Mrs.'}</code> or <code>#{printer.printMessage()}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      Message Event Definition of <a href="ref:#events-message-events-message-intermediate-throwing-event">Message Intermediate Throwing Event</a> or <a href="ref:#events-message-events-message-end-event">Message End Event</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundatasklistener">camunda:taskListener</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexecutionlistener">camunda:executionListner</a>
    </td>
  </tr>
</table>

### camunda:formHandlerClass

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the class that will be called during the parsing of the form information of a <a href="ref:#events-start-events">Start Event</a> or <a href="ref:#tasks-user-task">User Task</a>.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      Fully qualified Java class name of a class which implements the <code>org.camunda.bpm.engine.impl.form.handler.StartFormHandler</code>
      or <code>org.camunda.bpm.engine.impl.form.handler.TaskFormHandler</code> interface, e.g. <code>org.camunda.bpm.MyUserTaskFormHandler</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      Initial <a href="ref:#events-start-events">Start Event</a> of a Process,
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:formKey

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a form resource. See <a href="ref:/guides/user-guide/#task-forms">task forms</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A <code>java.lang.String</code> of a form resource which can be evaluated by the <a href="ref:/guides/user-guide/#tasklist">Tasklist</a>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      Initial <a href="ref:#events-start-events">Start Event</a> of a Process,
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:initiator

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies a process variable in which the user id of the process initiator is set.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      A process variable name to save the process initiator
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-start-events">Start Event</a> of a Process
    </td>
  </tr>
</table>

### camunda:jobPriority

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      Specifies the priority a job receives that is created in the context of executing the given process element (e.g. a timer event, or in the case of [asyncBefore](ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore) and [asyncAfter](ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter)). See the user guide on [Job Prioritization](ref:/guides/user-guide/#process-engine-the-job-executor-job-prioritization) for details.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.Integer</code> or <code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      An expression must resolve to an integer.
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>none</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#events-start-events">Start Events</a>,
      <a href="ref:#events">End Events</a>,
      <a href="ref:#events">Intermediate Throw Events</a>,
      <a href="ref:#events">Intermediate Catch Events</a>,

      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#tasks-manual-task">Manual Task</a>,

      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>,

      <a href="ref:#gateways-parallel-gateway">Parallel Gateway</a>,
      <a href="ref:#gateways-inclusive-gateway">Inclusive Gateway</a>,
      <a href="ref:#gateways-data-based-exclusive-gateway-xor">Exclusive Gateway</a>,

      <a href="ref:#tasks-task-markers-multiple-instance">Multi Instance Loop Characteristics</a>,

      Process
    </td>
  </tr>
</table>

### camunda:priority

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies the initial priority of a <a href="ref:#tasks-user-task">User Task</a> when it is created.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>org.camunda.bpm.engine.delegate.Expression</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      An expression which evaluates to a <code>java.lang.Number</code> or a <code>java.lang.String</code> which represents a number or <code>null</code>, e.g. <code>${dateVariable}</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
</table>

### camunda:resource

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
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-script-task">Script Task</a>
    </td>
  </tr>
</table>


### camunda:resultVariable

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      <p>
      The attribute specifies the process variable to save the return value of a <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexpression">camunda:expression</a>.
      </p>
      <p>
        Note that when you use <code>camunda:resultVariable</code> in a multi-instance construct, for example in a multi-instance subprocess, the result variable is overwritten every time the task completes unless the variable is a <a href="ref:/guides/user-guide/#process-engine-process-variables-variable-scopes-and-variable-visibility">local variable</a> in the scope of the multi-instance construct. This can lead to seemingly random behavior.</p>
      <p>
        This is a known issue. As a workaround, a local variable can be declared by adding an <a href="ref:/guides/user-guide/#process-engine-delegation-code-execution-listener">execution listener</a> to the subprocess' start event that initializes the variable as <code>null</code>.
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
      The name of a process variable to save the return value
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      Message Event Definition of <a href="ref:#events-message-events-message-intermediate-throwing-event">Message Intermediate Throwing Event</a> or <a href="ref:#events-message-events-message-end-event">Message End Event</a>,
    </td>
  </tr>
</table>


### camunda:type

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td>
      The attribute specifies which built-in task implementation to use. Currently an email and a shell service task exists.
    </td>
  </tr>
  <tr>
    <th>Type</th>
    <td><code>java.lang.String</code></td>
  </tr>
  <tr>
    <th>Possible Values</th>
    <td>
      <code>mail</code>, <code>shell</code>
    </td>
  </tr>
  <tr>
    <th>Default Value</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>BPMN 2.0 Elements</th>
    <td>
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>
    </td>
  </tr>
</table>