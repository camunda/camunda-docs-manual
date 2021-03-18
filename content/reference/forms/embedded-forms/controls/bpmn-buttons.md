---

title: 'BPMN Event Buttons'
weight: 90

menu:
  main:
    identifier: "embedded-forms-ref-controls-bpmn-event-button"
    parent: "embedded-forms-ref-controls"

---

These buttons can be used to trigger error and escalation events in user tasks. They will submit all entered values and activate the corresponding boundary event. To learn more about error and escalation events, see our section about [events](https://docs.camunda.org/manual/latest/reference/bpmn20/events/).

## Error

An Error Button can be bound to an error code and error message using the `cam-error-code` and `cam-error-message` directive.
Providing an error message is optional.

```html
<button cam-error-code="bpmn-error-543"
 cam-error-message="anErrorMessage" />
```

In the example above, the button is bound to the error code `bpmn-error-543` with the message `anErrorMessage`.

## Escalation

In a similar manner to the error button, an escalation button can be bound to an escalation code using the `cam-escalation-code` directive.

```html
<button cam-escalation-code="bpmn-escalation-123" />
```