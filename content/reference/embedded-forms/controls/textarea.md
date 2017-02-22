---

title: 'Textareas'
weight: 20

menu:
  main:
    identifier: "embedded-forms-ref-controls-textareas"
    parent: "embedded-forms-ref-controls"

---

Textareas are HTML `<textarea>` elements of the form

```html
<textarea></textarea>
```


# Binding a Textarea to a Process Variable

A textarea input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<textarea cam-variable-name="CUSTOMER_ADDRESS"
          cam-variable-type="String">
</textarea>
```

In the example above, the textarea is bound to the variable named `CUSTOMER_ADDRESS` of type
`String`.


# Supported Variable Types for Textareas

The textarea supports the same variable types as the single line text input `<input
type="text"></input>`. See the section on [Supported Variable Types]({{< relref "reference/embedded-forms/controls/inputs.md#supported-variable-types-for-text-inputs" >}}) for details.