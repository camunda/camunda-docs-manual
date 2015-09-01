---

title: "Controls"
weight: 10

menu:
  main:
    identifier: "embedded-forms-ref-controls"
    parent: "embedded-forms-ref"

---

The Forms SDK provides a set of directives which simplify working with process variables in an HTML form.
These directives work on most of the HTML controls and allow users to declaratively fetch variables from the process engine and have their values written to and read from input fields.

{{< note >}}
If an HTML control is not supported, you need to write [custom JavaScript]({{< relref "reference/embedded-forms/javascript/lifecycle.md#implementing-custom-fields" >}}).  
{{< /note >}}


# The `cam-variable-name` Directive

The `cam-variable-name` directive allows providing the name of a process / task / case variable. If the directive is discovered on an HTML control, the value of the variable is fetched from the server and written to the control.

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID">
```


# The `cam-business-key` Directive

The `cam-business-key` is aimed to be used on a free text input field in order to define a businessKey at the [start of a process]({{< relref "reference/rest/process-definition/post-submit-form.md" >}}).  
This attribute is only relevant when the form is aimed to start a process.

```html
<input type="text"
       cam-business-key>
```

See also: [Setting the business key using Javascript]({{< relref "reference/embedded-forms/javascript/generating-businesskey.md" >}})

## AngularJS support and `cam-variable-name`
If you use the AngularJS integration, the `cam-variable-name` directive will automatically bind the input to the model in case no binding is provided by the user.

The following two markup examples have the same semantics:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID">
```

is the same as

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       ng-model="CUSTOMER_ID">
```

If the user provides a customer `ng-model` binding, it is respected:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       ng-model="customerId">

Current value: {{customerId}}
```


# The `cam-variable-type` Directive

The `cam-variable-type` directive allows specifying the type of a process / task / vase variable. This is required if the variable does not yet exist.

The following markup creates a text input field bound to a variable of type `Double`:

```html
<input type="text"
       cam-variable-name="INVOICE_AMOUNT"
       cam-variable-type="Double">
```

## Supported Variable Types

See the section on [variable types]({{< relref "user-guide/process-engine/variables.md#supported-variable-values" >}}) for a list of variable types which are supported out of the box.

## AngularJS Support and `cam-variable-type`

The `cam-variable-type` directive can be used as validation directive:

```html
<input type="text"
       name="invoiceAmount"
       cam-variable-name="INVOICE_AMOUNT"
       cam-variable-type="Double">

<span ng-show="myForm.invoiceAmount.$error.camVariableType">
  Input must be a 'Double'.
</span>
```
