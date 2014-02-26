---

title: 'camunda Extension Elements'
category: 'Custom Extensions'

---

The following attributes are extension elements for the <code>camunda</code> namespace <code>http://activiti.org/bpmn</code>.

## camunda:constraint

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata of a individual validation constraint for a form field (see <a href="ref:/guides/user-guide/#tasklist-task-forms-form-field-validation">Form Field Validation</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>name</code></td>
    <td>
      The name of the form field constraint type
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>config</code></td>
    <td>
      The configuration of the form field constraint type
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>name</code> attribute must be one of the known validators (<code>required</code>, <code>minlength</code>,
      <code>maxlength</code>, <code>min</code>, <code>max</code> or <code>validator</code>)
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundavalidation">camunda:validation</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

## camunda:executionListener

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Add a execution listener to an event.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>event</code></td>
    <td>
      The type of the event for which the listener is called
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>class</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundaclass">camunda:class</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexpression">camunda:expression</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>delegateExpression</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundadelegateexpression">camunda:delegateExpression</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>event</code> attribute is required (except for transitions) and must be one of the task events: <code>start</code> or <code>end</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      One of the attributes <code>class</code>, <code>expression</code> or <code>delegateExpression</code> is mandatory
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      Process,
      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#tasks-manual-task">Manual Task</a>,
      <a href="ref:#gateways-data-based-exclusive-gateway-xor">Exclusive Gateway</a>,
      <a href="ref:#gateways-conditional-and-default-sequence-flows">Sequence Flow</a>,
      <a href="ref:#gateways-parallel-gateway">Parallel Gateway</a>,
      <a href="ref:#gateways-inclusive-gateway">Inclusive Gateway</a>,
      <a href="ref:#gateways-event-based-gateway">Event Based Gateway</a>,
      <a href="ref:#events">Start Event</a>,
      <a href="ref:#events">Intermediate Catch Event</a>,
      <a href="ref:#events">Intermediate Throw Event</a>,
      <a href="ref:#events">End Events</a>,
      <a href="ref:#events">Boundary Events</a>,
      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-event-subprocess">Event Subprocess</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafield">camunda:field</a>
    </td>
  </tr>
</table>

## camunda:expression

<table class="table table-striped">
<tr>
  <th>Description</th>
  <td colspan="2">
    Defines an expression to inject in delegated classes (see <a href="/guides/user-guide/#process-engine-delegation-code-field-injection">Field Injection</a>).
  </td>
</tr>
<tr>
  <th>Attributes</th>
  <td colspan="2">
    &ndash;
  </td>
</tr>
<tr>
  <th>Text Content</th>
  <td colspan="2">
    The expression to inject
  </td>
</tr>
<tr>
  <th>Constraints</th>
  <td colspan="2">
    &ndash;
  </td>
</tr>
<tr>
  <th>Parent elements</th>
  <td colspan="2">
    <a href="ref:#custom-extensions-camunda-extension-elements-camundafield">camunda:field</a>
  </td>
</tr>
<tr>
  <th>Child elements</th>
  <td colspan="2">
    &ndash;
  </td>
</tr>
</table>

## camunda:failedJobRetryTimeCycle

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines the custom retry schedule for a failed job (see <a href="ref:/guides/user-guide/#process-engine-the-job-executor-failed-jobs">Failed Jobs</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Text Content</th>
    <td colspan="2">
      The retry time cycle value
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The configuration follows the <a href="http://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals">ISO 8601 standard for repeating time intervals</a>
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      Task,
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      <a href="ref:#tasks-user-task">User Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-script-task">Script Task</a>,
      <a href="ref:#tasks-receive-task">Receive Task</a>,
      <a href="ref:#events-timer-events-timer-start-event">Timer Start Event</a>,
      <a href="ref:#events-timer-events-timer-intermediate-catching-event">Timer Intermediate Catching Event</a>,
      <a href="ref:#events-timer-events-timer-boundary-event">Timer Boundary Event</a>,
      <a href="ref:#events-signal-events">Intermediate Signal Throw Event</a>,
      <a href="ref:#subprocesses-embedded-subprocess">Embedded Subprocess</a>,
      <a href="ref:#subprocesses-call-activity">Call Activity</a>,
      <a href="ref:#subprocesses-transaction-subprocess">Transaction Subprocess</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

## camunda:field

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines value to inject in delegated classes (see <a href="/guides/user-guide/#process-engine-delegation-code-field-injection">Field Injection</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>name</code></td>
    <td>
      The name of the field
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>The value of the field as expression</td>
  </tr>
  <tr>
    <td></td>
    <td><code>stringValue</code></td>
    <td>The value of the field as String</td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      Only one attribute of <code>stringValue</code> and <code>expression</code> or one of the child elements <code>string</code> and <code>expression</code> can be used
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#tasks-service-task">Service Task</a>,
      <a href="ref:#tasks-business-rule-task">Business Rule Task</a>,
      <a href="ref:#tasks-send-task">Send Task</a>,
      Message Event Definition of <a href="ref:#events-message-events-message-intermediate-throwing-event">Message Intermediate Throwing Event</a> or <a href="ref:#events-message-events-message-end-event">Message End Event</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundatasklistener">camunda:taskListener</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexecutionlistener">camunda:executionListner</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexpression">camunda:expression</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundastring">camunda:string</a>
    </td>
  </tr>
</table>

## camunda:formData

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define fields of a form, which are used to generate task forms (see <a href="ref:/guides/user-guide/#tasklist-task-forms-generated-task-forms">Generated Task Forms</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#events-start-events">Start Event</a>,
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformfield">camunda:formField</a>
    </td>
  </tr>
</table>

## camunda:formField

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a single form field (see <a href="ref:/guides/user-guide/#tasklist-task-forms-generated-task-forms">Generated Task Forms</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>id</code></td>
    <td>
      The id of the form field, corresponding to the name of a process variable
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>label</code></td>
    <td>
      The label to be displayed next to the form field
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>type</code></td>
    <td>
      The type of the form field
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>datePattern</code></td>
    <td>
      The pattern of a date type form field
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>defaultValue</code></td>
    <td>
      The value to be used as a default (pre-selection) for the field
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The attribute <code>id</code> is required to be not empty
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>type</code> can be one of a known form field type (<code>string</code>, <code>long</code>, <code>boolean</code>, <code>date</code> or <code>enum</code>) or a custom one
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>datePattern</code> can only be used if the <code>type</code> attribute is set to <code>date</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The child element <code>camunda:properties</code> is only allowed once
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The child element <code>camunda:validation</code> is only allowed once
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The child elements <code>camunda:values</code> can only be used if the <code>type</code> attribute is set to <code>enum</code>
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformdata">camunda:formData</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaproperties">camunda:properties</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundavalidation">camunda:validation</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundavalue">camunda:value</a>
    </td>
  </tr>
</table>

## camunda:formProperty

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a form field (<strong>Deprecated</strong> use <a href="ref:#custom-extensions-camunda-extension-elements-camundaformdata">camunda:formData</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>id</code></td>
    <td>
      The key used to submit the property through the API
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>name</code></td>
    <td>
      The display label of the property
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>type</code></td>
    <td>
      The type of the property
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>required</code></td>
    <td>
      True if the form field is required (default: <code>false</code>)
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>readable</code></td>
    <td>
      True if the form field is readable and will be displayed (default: <code>true</code>)
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>writeable</code></td>
    <td>
      True if the form field is writeable (default: <code>true</code>)
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>variable</code></td>
    <td>
      Specifies the process variable on which the variable is mapped
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>
      Specifies an expression that maps the property, e.g. <code>${street.address}</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>datePattern</code></td>
    <td>
      The pattern of a date type form field
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>default</code></td>
    <td>
      The default value or expression of the property
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>id</code> attribute is required
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>type</code> can be one of the known types (<code>string</code>, <code>long</code>, <code>boolean</code>, <code>date</code> or <code>enum</code>) or a custom one
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>datePattern</code> can only be used if the <code>type</code> attribute is set to <code>date</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The child elements <code>camunda:values</code> can only be used if the <code>type</code> attribute is set to <code>enum</code>
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#events-start-events">Start Event</a>,
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundavalue">camunda:value</a>
    </td>
  </tr>
</table>

## camunda:in

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The element specifies variables which should be passed to the subprocess, see <a href="ref:#subprocesses-call-activity-passing-variables">passing variables</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>source</code></td>
    <td>
      A name of a process variable to be passed in
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
      Can be set to <code>all</code> to pass all process variables in
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>target</code></td>
    <td>
      Name of the process variable inside the subprocess instance
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>businessKey</code></td>
    <td>
      Set the business key of the subprocess process instance
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
      <a href="ref:#subprocesses-call-activity">Call Activity</a>
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
      The element specifies variables which should be passed back from the subprocess, see <a href="ref:#subprocesses-call-activity-passing-variables">passing variables</a> for more information.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>source</code></td>
    <td>
      A name of a process variable to be passed back
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
      Can be set to <code>all</code> to pass all subprocess variables back
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>target</code></td>
    <td>
      Name of the process variable inside the subprocess instance
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
      <a href="ref:#subprocesses-call-activity">Call Activity</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

## camunda:potentialStarter

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines which users or groups can start the process.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      Process
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      resourceAssignmentExpression
    </td>
  </tr>
</table>

## camunda:properties

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A key value list of properties which be can be interpreted freely.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformfield">camunda:formField</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaproperty">camunda:property</a>
    </td>
  </tr>
</table>

## camunda:property

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A key value pair which can be interpreted freely.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>id</code></td>
    <td>
      The id of the form field property
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>value</code></td>
    <td>
      The value of the form field property
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaproperties">camunda:properties</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

## camunda:string

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines a String value to inject in delegated classes (see <a href="/guides/user-guide/#process-engine-delegation-code-field-injection">Field Injection</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Text Content</th>
    <td colspan="2">
      The String value to inject
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafield">camunda:field</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

## camunda:taskListener

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Add a task listener to a task event.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>event</code></td>
    <td>
      The type of the event for which the listener is called
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>class</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundaclass">camunda:class</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexpression">camunda:expression</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>delegateExpression</code></td>
    <td>
      see <a href="ref:#custom-extensions-camunda-extension-attributes-camundadelegateexpression">camunda:delegateExpression</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>event</code> attribute is required and must be one of the task events: <code>create</code>, <code>assignment</code> or <code>complete</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      One of the attributes <code>class</code>, <code>expression</code> or <code>delegateExpression</code> is mandatory
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#tasks-user-task">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafield">camunda:field</a>
    </td>
  </tr>
</table>

## camunda:validation

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a list of validation constraints for form fields (see <a href="ref:/guides/user-guide/#tasklist-task-forms-form-field-validation">Form Field Validation</a>).
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformfield">camunda:formField</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaconstraint">camunda:constraint</a>
    </td>
  </tr>
</table>

## camunda:value

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Possible values of a form field with the type <code>enum</code>.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>id</code></td>
    <td>
      The id of the value
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>name</code></td>
    <td>
      The name of the value
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformfield">camunda:formField</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformproperty">camunda:formProperty</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>
