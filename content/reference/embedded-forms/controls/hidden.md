---

title: 'Hidden Input Fields'
weight: 60

menu:
  main:
    identifier: "embedded-forms-ref-controls-hidden"
    parent: "embedded-forms-ref-controls"

---

Hidden input elements are HTML controls in the form of

```html
<input type="hidden"></input>
```

They are not displayed in the form, but can be used to retrieve values to be used in the context of the form (e.g., using Angular bindings).


# Binding a Hidden Element to a Process Variable

A hidden input can be bound to a process variable using the `cam-variable-type` and `cam-variable-name` directives:

```html
<input type="hidden"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String"
       value="testuser" />
```

In the example above, the hidden input field is bound to the variable named `CUSTOMER_ID` of type `String` and contains the value `testuser`.


# Supported Variable Types for Hidden Elements

The hidden input field supports the same variable types as the single line text input `<input type="text"></input>`. See the section on [Supported Variable Types]({{< relref "reference/embedded-forms/controls/inputs.md#supported-variable-types-for-text-inputs" >}}) for details.
