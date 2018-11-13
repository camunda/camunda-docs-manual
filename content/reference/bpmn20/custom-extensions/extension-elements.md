---

title: 'Camunda BPMN Extension Elements'
weight: 10

menu:
  main:
    name: "Extension Elements"
    identifier: "bpmn-extensions-elements"
    parent: "bpmn-extensions"
    pre: "Reference of Camunda Extension Attributes for BPMN."

---

The following attributes are extension attributes for the `camunda` namespace `http://camunda.org/schema/1.0/bpmn`.


# connector

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The configuration of a camunda connector.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">&ndash;</td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connectorid" >}}">
      camunda:connectorId</a> child element is required and must identify a connector implementation
      known to the process engine
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/tasks/service-task.md" >}}">Service Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/business-rule-task.md" >}}">Business Rule Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/send-task.md" >}}">Send Task</a>,
      Message Event Definition of
      <a href="{{< ref "/reference/bpmn20/events/message-events.md#message-intermediate-throwing-event" >}}">
      Message Intermediate Throwing Event</a> or
      <a href="{{< ref "/reference/bpmn20/events/message-events.md#message-end-event" >}}">Message End Event</a>,
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">
      camunda:inputOutput</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connectorid" >}}">
      camunda:connectorId</a>
    </td>
  </tr>
</table>


# connectorId

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The unique identifier of the connector type to instantiate.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td colspan="2">&ndash;</td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The connector type has to be known to the process engine
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">
      camunda:connector</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">&ndash;</td>
  </tr>
</table>


# constraint

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata of an individual validation constraint for a form field (see <a href="{{< ref "/user-guide/task-forms/_index.md#form-field-validation" >}}">Form Field Validation</a>).
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
      <code>maxlength</code>, <code>min</code>, <code>max</code>, <code>readonly</code> or <code>validator</code>)
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#validation" >}}">camunda:validation</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


# entry

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A single entry of a map structure. Can contain a constant, expression, script, list or
      another map.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>key</code></td>
    <td>
      The key of the entry in the map
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>key</code> attribute is required
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#map" >}}">camunda:map</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#map" >}}">camunda:map</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">camunda:script</a>
    </td>
  </tr>
</table>


# executionListener

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Add an execution listener to an event.
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
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>delegateExpression</code></td>
    <td>
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>
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
      <a href="{{< ref "/reference/bpmn20/tasks/service-task.md" >}}">Service Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/send-task.md" >}}">Send Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}">User Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/business-rule-task.md" >}}">Business Rule Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/script-task.md" >}}">Script Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/receive-task.md" >}}">Receive Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/manual-task.md" >}}">Manual Task</a>,
      <a href="{{< ref "/reference/bpmn20/gateways/exclusive-gateway.md" >}}">Exclusive Gateway</a>,
      <a href="{{< ref "/reference/bpmn20/gateways/sequence-flow.md" >}}">Sequence Flow</a>,
      <a href="{{< ref "/reference/bpmn20/gateways/parallel-gateway.md" >}}">Parallel Gateway</a>,
      <a href="{{< ref "/reference/bpmn20/gateways/inclusive-gateway.md" >}}">Inclusive Gateway</a>,
      <a href="{{< ref "/reference/bpmn20/gateways/event-based-gateway.md" >}}">Event Based Gateway</a>,
      <a href="{{< ref "/reference/bpmn20/events/start-events.md" >}}">Start Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/_index.md" >}}">Intermediate Catch Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/_index.md" >}}">Intermediate Throw Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/_index.md" >}}">End Events</a>,
      <a href="{{< ref "/reference/bpmn20/events/_index.md" >}}">Boundary Events</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/embedded-subprocess.md" >}}">Embedded Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md" >}}">Call Activity</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/event-subprocess.md" >}}">Event Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/transaction-subprocess.md" >}}">Transaction Subprocess</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">camunda:script</a>
    </td>
  </tr>
</table>

# expression

<table class="table table-striped">
<tr>
  <th>Description</th>
  <td colspan="2">
    Defines an expression to inject in delegated classes (see <a href="{{< ref "/user-guide/process-engine/delegation-code.md#field-injection" >}}">Field Injection</a>).
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
    <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>
  </td>
</tr>
<tr>
  <th>Child elements</th>
  <td colspan="2">
    &ndash;
  </td>
</tr>
</table>

# failedJobRetryTimeCycle

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines the custom retry schedule for a failed job (see <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#failed-jobs" >}}">Failed Jobs</a>).
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
      <a href="{{< ref "/reference/bpmn20/tasks/service-task.md" >}}">Service Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/send-task.md" >}}">Send Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}">User Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/business-rule-task.md" >}}">Business Rule Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/script-task.md" >}}">Script Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/receive-task.md" >}}">Receive Task</a>,
      <a href="{{< ref "/reference/bpmn20/events/timer-events.md#timer-start-event" >}}">Timer Start Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/timer-events.md#timer-intermediate-catching-event" >}}">Timer Intermediate Catching Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/timer-events.md#timer-boundary-event" >}}">Timer Boundary Event</a>,
      <a href="{{< ref "/reference/bpmn20/events/signal-events.md" >}}">Intermediate Signal Throw Event</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/embedded-subprocess.md" >}}">Embedded Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md" >}}">Call Activity</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/transaction-subprocess.md" >}}">Transaction Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/task-markers.md#multiple-instance" >}}">Multi Instance Loop Characteristics</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

# field

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines the value to inject in delegated classes (see <a href="{{< ref "/user-guide/process-engine/delegation-code.md#field-injection" >}}">Field Injection</a>).
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
      <a href="{{< ref "/reference/bpmn20/tasks/service-task.md" >}}">Service Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/business-rule-task.md" >}}">Business Rule Task</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/send-task.md" >}}">Send Task</a>,
      Message Event Definition of <a href="{{< ref "/reference/bpmn20/events/message-events.md#message-intermediate-throwing-event" >}}">Message Intermediate Throwing Event</a> or <a href="{{< ref "/reference/bpmn20/events/message-events.md#message-end-event" >}}">Message End Event</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#tasklistener" >}}">camunda:taskListener</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#executionlistener" >}}">camunda:executionListner</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#expression" >}}">camunda:expression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#string" >}}">camunda:string</a>
    </td>
  </tr>
</table>

# formData

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define fields of a form, which are used to generate task forms (see <a href="{{< ref "/user-guide/task-forms/_index.md#generated-task-forms" >}}">Generated Task Forms</a>).
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
      <a href="{{< ref "/reference/bpmn20/events/start-events.md" >}}">Start Event</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formfield" >}}">camunda:formField</a>
    </td>
  </tr>
</table>

# formField

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a single form field (see <a href="{{< ref "/user-guide/task-forms/_index.md#generated-task-forms" >}}">Generated Task Forms</a>).
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
      The attribute <code>id</code> may not be empty
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The attribute <code>type</code> can be one of the known form field types (<code>string</code>, <code>long</code>, <code>boolean</code>, <code>date</code> or <code>enum</code>) or a custom one
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
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formdata" >}}">camunda:formData</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#properties" >}}">camunda:properties</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#validation" >}}">camunda:validation</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#value" >}}">camunda:value</a>
    </td>
  </tr>
</table>

# formProperty

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a form field (<strong>Deprecated</strong> use <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formdata" >}}">camunda:formData</a>).
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
      <a href="{{< ref "/reference/bpmn20/events/start-events.md" >}}">Start Event</a>,
      <a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#value" >}}">camunda:value</a>
    </td>
  </tr>
</table>

# in

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The element specifies variables which should be passed to the subprocess, see <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md#passing-variables" >}}">passing variables</a> for more information.
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
    <td><code>local</code></td>
    <td>
      Can be set to <code>true</code> to only pass local variables of the execution that executes the call activity.
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
      <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md" >}}">Call Activity</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


# inputParameter

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      An single input mapping for the activity. If the element has no child element the text
      content of this element is mapped into the activity. The text content can be a constant
      string value or an expression. If no child element or text content exists the variable
      inside the activity is set to the special value <code>null</code>.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>name</code></td>
    <td>
      The name of the variable inside the activity.
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>name</code> attribute is required.
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The element can have one child element, a constant string or an expression as text content.
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">
        camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#map" >}}">
        camunda:map</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">
        camunda:script</a>
    </td>
  </tr>
</table>


# inputOutput

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The element describes an input/output mapping for the activity.
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
      <a href="{{< ref "/reference/bpmn20/tasks/_index.md" >}}">All Tasks</a>,
      <a href="{{< ref "/reference/bpmn20/events/_index.md" >}}">All Events</a> (except Start and Boundary Events),
      <a href="{{< ref "/reference/bpmn20/subprocesses/embedded-subprocess.md" >}}">Embedded Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/subprocesses/transaction-subprocess.md" >}}">Transaction Subprocess</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">
        camunda:connector</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputparameter" >}}">
        camunda:inputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#outputparameter" >}}">
        camunda:outputParameter</a>
    </td>
  </tr>
</table>


# list

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A list structure. If the list contains multiple values they should be added as
      text content of child elements. Which child elements are use is arbitrary, e.g..:
      <code><br/>
        &lt;camunda:list&gt;<br/>
        &nbsp;&nbsp;&lt;camunda:value&gt;one&lt;/camunda:value&gt;<br/>
        &nbsp;&nbsp;&lt;camunda:value&gt;two&lt;/camunda:value&gt;<br/>
        &nbsp;&nbsp;&lt;camunda:value&gt;three&lt;/camunda:value&gt;<br/>
        &lt;/camunda:list&gt;
      </code><br/>
      Also a <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">
      camunda:script</a> element can be used as a list element. The return value of the
      script is added to the list. Furthermore, lists can contain nested lists and maps.
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
      Multiple values have to be encapsulated in child elements.
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputparameter" >}}">
        camunda:inputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#outputparameter" >}}">
        camunda:outputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#entry" >}}">camunda:entry</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      Any child element,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">
        camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#map" >}}">
        camunda:map</a>
    </td>
  </tr>
</table>


# map

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A map structure. The entries can be constants, expressions, scripts, nested maps and lists.
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
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputparameter" >}}">
        camunda:inputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#outputparameter" >}}">
        camunda:outputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#entry" >}}">camunda:entry</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#entry" >}}">camunda:entry</a>
    </td>
  </tr>
</table>



# out

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      The element specifies variables which should be passed back from the subprocess, see <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md#passing-variables" >}}">passing variables</a> for more information.
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
    <td></td>
    <td><code>local</code></td>
    <td>
      Can be set to <code>true</code> to pass variables from the called case/process instance to local variables of the execution executing the call activity.
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      Only one of the attributes <code>source</code>, <code>sourceExpression</code> or <code>variables</code> can be used
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
      <a href="{{< ref "/reference/bpmn20/subprocesses/call-activity.md" >}}">Call Activity</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


# outputParameter

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      An single output mapping for the activity. If the element has no child element, the text
      content of this element is mapped out of the activity. The text content can be a constant
      string value or an expression. If no child element or text content exists, the variable
      outside of the activity is set to the special value <code>null</code>.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>name</code></td>
    <td>
      The name of the variable outside of the activity.
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>name</code> attribute is required.
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      The element can have one child element, a constant string or an expression as text content.
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">
        camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#map" >}}">
        camunda:map</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">
        camunda:script</a>
    </td>
  </tr>
</table>


# potentialStarter

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

# properties

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
      Base Element,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formfield" >}}">camunda:formField</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#property" >}}">camunda:property</a>
    </td>
  </tr>
</table>

# property

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
    <td><code>name</code></td>
    <td>
      The name of the property
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>value</code></td>
    <td>
      The value of the property
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      If the property belongs to a <code>camunda:formField</code> extension element, only
      the attributes <code>id</code> and <code>value</code> are used.
    </td>
  </tr>
  <tr>
    <td></td>
    <td colspan="2">
      If the parent <code>camunda:properties</code> element is directly added as an extension element,
      for example by the camunda Modeler, only the attributes <code>name</code> and <code>value</code>
      are used.
    </td>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#properties" >}}">camunda:properties</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


# script

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      A script element. The script is executed and the return value is used as mapping value.
    </td>
  </tr>
  <tr>
    <th>Attributes</th>
    <td><code>scriptFormat</code></td>
    <td>
      The format identifier, normally the language of the script source code
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>resource</code></td>
    <td>
      equivalent to <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#resource" >}}">
      camunda:resource</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>scriptFormat</code> attribute is required
    </td>
  </tr>
    <td></td>
    <td colspan="2">
      If the <code>resource</code> attribute is used, no source code text content is allowed
    </td>
  <tr>
  </tr>
  <tr>
    <th>Parent elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputparameter" >}}">
        camunda:inputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#outputparameter" >}}">
        camunda:outputParameter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#entry" >}}">camunda:entry</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#list" >}}">camunda:list</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#executionlistener" >}}">
        camunda:executionListener</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#tasklistener" >}}">
        camunda:taskListener</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>


# string

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Defines a String value to inject in delegated classes (see <a href="{{< ref "/user-guide/process-engine/delegation-code.md#field-injection" >}}">Field Injection</a>).
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
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>

# taskListener

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
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>expression</code></td>
    <td>
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td><code>delegateExpression</code></td>
    <td>
      see <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td colspan="2">
      The <code>event</code> attribute is required and must be one of the task events: <code>create</code>, <code>assignment</code>, <code>complete</code> or <code>delete</code>
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
      <a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}">User Task</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#script" >}}">camunda:script</a>
    </td>
  </tr>
</table>

# validation

<table class="table table-striped">
  <tr>
    <th>Description</th>
    <td colspan="2">
      Metadata to define a list of validation constraints for form fields (see <a href="{{< ref "/user-guide/task-forms/_index.md#form-field-validation" >}}">Form Field Validation</a>).
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
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formfield" >}}">camunda:formField</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#constraint" >}}">camunda:constraint</a>
    </td>
  </tr>
</table>

# value

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
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formfield" >}}">camunda:formField</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#formproperty" >}}">camunda:formProperty</a>
    </td>
  </tr>
  <tr>
    <th>Child elements</th>
    <td colspan="2">
      &ndash;
    </td>
  </tr>
</table>
