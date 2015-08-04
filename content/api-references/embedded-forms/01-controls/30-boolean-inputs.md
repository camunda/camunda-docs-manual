---

title: 'Boolean Inputs'
weight: 40

menu:
  main:
    identifier: "embedded-forms-ref-controls-boolean-inputs"
    parent: "embedded-forms-ref-controls"

---

## Checkbox

Checkboxes are HTML `<input type="checkbox">` controls. Checkbox controls can be used for boolean
variable types.

### Binding a Checkbox to a Process Variable

A checkbox input can be bound to a process variable using the `cam-variable-type` and `cam-variable-name` directives:

```html
<input type="checkbox"
       cam-variable-name="IS_VIP_CUSTOMER"
       cam-variable-type="Boolean" />
```

In the example above, the checkbox is bound to the variable named `IS_VIP_CUSTOMER` of type
`Boolean`.

### Supported Variable Types for Checkboxes

The checkbox input field only supports boolean variable types. A checked checkbox corresponds to
the value `true`, an unchecked checkbox corresponds to the value `false`.

## Boolean Select Box

In order to bind a `<select>` box to a Java `Boolean` variable, the directive
`cam-variable-type="Boolean"` must be used.

Example:

```html
<select cam-variable-name="APPROVED"
        cam-variable-type="Boolean">
  <option value="true">Yes</option>
  <option value="false">No</option>
</select>
```


## Boolean text Input

In order to bind a text input field to a Java `Boolean` variable, the directive
`cam-variable-type="Boolean"` must be used.

Text input fields of type `Boolean` accept the following string values:

* `true`
* `false`

Meaning that the user has to type the words "true" or "false" into the text input field.

Example:

```html
<input type="text"
       cam-variable-name="IS_VIP_CUSTOMER"
       cam-variable-type="Boolean" />
```
