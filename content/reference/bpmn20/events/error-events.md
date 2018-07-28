---

title: 'Error Events'
weight: 50

menu:
  main:
    identifier: "bpmn-ref-events-error-events"
    parent: "bpmn-ref-events"
    pre: "Events catching / throwing errors."
---

Error events are events which are triggered by a defined error.

<div data-bpmn-diagram="../bpmn/event-error"></div>


# Business Errors vs. Technical Errors

A BPMN error is meant for business errors - which are different than technical exceptions. So, this is different than Java exceptions - which are, by default, handled in their own way.

You might also want to check out the basics of [Threading and Transactions]({{< relref "user-guide/process-engine/transactions-in-processes.md#transaction-boundaries" >}}) in the [User Guide]({{< relref "user-guide/_index.md" >}}) first.


# Defining an Error

An error event definition references an error element. The following is an example of an error end event, referencing an error declaration:

```xml
<definitions>
  <error id="myError" errorCode="ERROR-OCCURED" name="ERROR-OCCURED"/>
  <!-- ... -->
  <process>
    <!-- ... -->
    <endEvent id="myErrorEndEvent">
      <errorEventDefinition errorRef="myError" />
    </endEvent>
  </process>
</definitions>
```

You can trigger this error event either with a throwing error event within your process definition or from Delegation Code, see the
[Throwing BPMN Errors from Delegation Code]({{< relref "user-guide/process-engine/delegation-code.md#throw-bpmn-errors-from-delegation-code" >}}) section of the [User Guide]({{< relref "user-guide/_index.md" >}}) for more information.

Another possibility to define an error is setting of the type (class name) of any Java Exception as error code. Example:

```xml
<definitions>
  <error id="myException" errorCode="com.company.MyBusinessException" name="myBusinessException"/>
  ...
  <process>
    ...
    <endEvent id="myErrorEndEvent">
      <errorEventDefinition errorRef="myException" />
    </endEvent>
  </process>
</definitions>
```

The exception type should only be used for business exceptions and not for technical exceptions in the process.

An error event handler references the same error element to declare that it catches the error.


# Error Start Event

An error start event can only be used to trigger an Event Sub-Process - it __cannot__ be used to start a process instance. The error start event is always interrupting.

<div data-bpmn-diagram="../bpmn/event-subprocess-alternative1"></div>

Three optional attributes can be added to the error start event: <code>errorRef</code>, <code>camunda:errorCodeVariable</code> and <code>camunda:errorMessageVariable</code>:
```xml
<definitions>
  <error id="myException" errorCode="com.company.MyBusinessException" name="myBusinessException"/>
  ...
  <process>
    ...
    <subProcess id="SubProcess_1" triggeredByEvent="true">>
      <startEvent id="myErrorStartEvent">
        <errorEventDefinition errorRef="myException" camunda:errorCodeVariable="myErrorVariable"
  		  camunda:errorMessageVariable="myErrorMessageVariable" />
      </startEvent>
    ...
    </subProcess>
  ...
  </process>
</definitions>
```
* If `errorRef` is omitted, the subprocess will start for every error event that occurs.
* The `camunda:errorCodeVariable` will contain the error code that was specified with the error.
* The `camunda:errorMessageVariable` will contain the error message that was specified with the error.

`camunda:errorCodeVariable` and `camunda:errorMessageVariable` can be retrieved like any other process variable, but only if the attribute was set.


# Error End Event

When process execution arrives at an error end event, the current path of execution is ended and an error is thrown. This error can be caught by a matching intermediate error boundary event. In case no matching error boundary event is found, the execution semantics defaults to the none end event semantics.

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#errorcodevariable" >}}">camunda:errorCodeVariable</a>,
	  <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#errormessagevariable" >}}">camunda:errorMessageVariable</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


# Error Boundary Event

An intermediate catching error event on the boundary of an activity, or error boundary event for short, catches errors that are thrown within the scope of the activity on which it is defined.

Defining a error boundary event makes most sense on an embedded subprocess, or a call activity, as a subprocess creates a scope for all activities inside the subprocess. Errors are thrown by error end events. Such an error will propagate its parent scopes upwards until a scope is found on which a error boundary event is defined that matches the error event definition.

When an error event is caught, the activity on which the boundary event is defined is destroyed, also destroying all current executions therein (e.g., concurrent activities, nested subprocesses, etc.). Process execution continues following the outgoing sequence flow of the boundary event.

<div data-bpmn-diagram="../bpmn/event-subprocess-alternative2"></div>

A error boundary event is defined as a typical boundary event. As with the other error events, the errorRef references an error defined outside of the process element:

```xml
<definitions>
  <error id="myError" errorCode="ERROR-OCCURED" name="name of error"/>
  <!-- ... -->
  <process>
    <!-- ... -->
    <subProcess id="mySubProcess">
      <!-- ... -->
    </subProcess>
    <boundaryEvent id="catchError" attachedToRef="mySubProcess">
      <errorEventDefinition errorRef="myError" camunda:errorCodeVariable="myErrorVariable"
	    camunda:errorMessageVariable="myErrorMessageVariable" />
    </boundaryEvent>
  </process>
</definitions>
```

The errorCode is used to match the errors that are caught:

*   If errorRef is omitted, the error boundary event will catch any error event, regardless of the errorCode of the error.
*   In case an errorRef is provided and it references an existing error, the boundary event will only catch errors with the defined error code.
*   If the errorCodeVariable is set, the error code can be retrieved using this variable.
*   If the errorMessageVariable is set, the error message can be retrieved using this variable.


# Unhandled BPMN Error

It can happens that no catching boundary event was defined for an error event. The default behaviour in this case is to log information and end the current execution.
This behaviour can be changed with <code>enableExceptionsAfterUnhandledBpmnError</code> property set to <code>true</code>
(via the process engine configuration or the deployment descriptor) and Process Engine Exception will be thrown if unhandled BPMN Error occurs.


# Catch and Re-Throw Pattern

An error can be handled by the error start event in the event sub process and the same error can be thrown from the event sub process to handle the error on the higher level scope (in the example  below, the error thrown from the Event Subprocess is handled by the error boundary event in the Subprocess).

<div data-bpmn-diagram="../bpmn/catchandthrowpattern"></div>

## Additional Resources

*   [Error Events](http://camunda.org/bpmn/reference.html#events-error) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
*   [Incidents]({{< relref "user-guide/process-engine/incidents.md" >}}) in the [User Guide](red:/guides/user-guide/)
