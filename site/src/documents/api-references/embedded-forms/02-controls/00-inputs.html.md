---

title: 'Inputs'
category: 'Supported HTML Controls'

---

Most of the implementation can be done by adding the following special attributes to the fields.

* cam-variable-name: _Requires a value_ corresponding to the variable name. This attribute __is used on every__ control.
* cam-variable-type: Is _optional_ but _requires a value_ if used.
* cam-choices: _Requires a value_ corresponding to a variable name containing the available choices. This attribute is only used on [choices] controls. If a `select` tag has `option` tags as children, the new `option` tags (for the dynamically added) choices will be appended.

## Single Line Text Input

Single line text inputs are `<input type="text">` controls. Single line text inputs are the most
common input fields and allow the user to provide values for different data types.

### Binding Text Input to a Process Variable

A text input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String" />
```

In the example above, the text input field is bound to the variable named `CUSTOMER_ID` of type
`String`.

### Supported Variable Types for Text Inputs

A text input field supports multiple variable types.

> *Binding to existing variables*: Note that if you bind the input field to an existing variable,
> the type of the variable is provided by the process engine and the `cam-variable-type` directive
> is not required.

#### String

In order to bind the input field to a `String` variable, the directive `cam-variable-type="String"`
must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String" />
```

> *Trimming*: Note that the value of the String variable is trimmed before it is submitted to the
> process engine: leading and trailing whitespace is removed.

#### Integer

In order to bind the input field to a Java `Integer` variable, the directive
`cam-variable-type="Integer"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_AGE"
       cam-variable-type="Integer" />
```

#### Float

In order to bind the input field to a Java `Float` variable, the directive
`cam-variable-type="Float"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_REVENUE"
       cam-variable-type="Float" />
```

#### Date

In order to bind the input field to a Java `Date` variable, the directive
`cam-variable-type="Date"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CONTRACT_START_DATE"
       cam-variable-type="Date" />
```

#### _Date Format_

Currently only the ISO Date Format `yyyy-MM-dd'T'HH:mm:ss` is supported.
Example value: `2013-01-23T13:42:42`

#### _Using a Date Picker_

You can use the [Angular UI datepicker](http://angular-ui.github.io/bootstrap/)
directive to offer a datepicker for the date input field. The complete markup of the input field
including the datepicker button is shown below.

```html
<p class="input-group">
  <input type="text"
         cam-variable-name="CONTRACT_START_DATE"
         cam-variable-type="Date"
         class="form-control"
         datepicker-popup="yyyy-MM-dd'T'HH:mm:ss"
         is-open="dateFieldOpened" />
  <span class="input-group-btn">
    <button type="button"
            class="btn btn-default"
            ng-click="open($event)">
      <i class="glyphicon glyphicon-calendar"></i>
    </button>
  </span>
</p>
```

In addition to the HTML markup, the following JavaScript must be included in the form file
(see [Custom JavaScript][javascript]):

```html
<script cam-script type="text/form-script">
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dateFieldOpened = true;
  };
</script>
```

The attributes of the datepicker component are explained below:

* Additional attributes of the input element:
 * `datepicker-popup="yyyy-MM-dd'T'HH:mm:ss"`: This attribute sets the format of the date which
   is returned by the datepicker. It must be the ISO Date Format.
 * `is-open="dateFieldOpened"`: This attribute contains the name of the variable, which
   indicates the open status of the datepicker. It must be the same variable, which is set to
   true in the `open` function in the JavaScript snippet. If a form contains multiple
   datepickers, they must have different values for this attribute.
* Attributes of the datepicker button:
 * `ng-click="open($event)"`: This attribute contains the name of the function which is called
   when the datepicker button is clicked. It must be the function name of the JavaScript snippet
   which sets the `is-open` variable to true. If a form contains multiple date pickers, they
   must have different function names, or the name of the `is-open` variable must be passed to
   the function.

#### Boolean

In order to bind the input field to a Java `Boolean` variable, the directive
`cam-variable-type="Boolean"` must be used.

Text input fields of type `Boolean` accept the following string values:

* `true`
* `false`

Meaning that the user has to type the words "true" or "false" into the text input field. You may want to use a <a href="ref:#supported-html-controls-inputs-checkbox">Checkbox input</a> instead.

Example:

```html
<input type="text"
       cam-variable-name="IS_VIP_CUSTOMER"
       cam-variable-type="Boolean" />
```

## Multi Line Textarea

Textareas are HTML `<textarea>` elements of the form

```html
<textarea></textarea>
```

### Binding a Textarea to a Process Variable

A textarea input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<textarea cam-variable-name="CUSTOMER_ADDRESS"
          cam-variable-type="String">
</textarea>
```

In the example above, the textarea is bound to the variable named `CUSTOMER_ADDRESS` of type
`String`.

### Supported Variable Types for Textareas

The textarea supports the same variable types as the single line text input `<input
type="text"></input>`.

## Checkbox

Checkboxes are HTML `<input type="checkbox">` controls. Checkbox controls can be used for boolean
variable types.

### Binding a Checkbox to a Process Variable

A checkbox input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

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

## Hidden

Hidden input elements are HTML `<input type="hidden">` controls. They are not displayed in the
form, but can be used to retrieve values to be used in the context of the form (e.g., using Angular
bindings).

### Binding a Hidden Element to a Process Variable

A hidden input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<input type="hidden"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String"
       value="testuser" />
```

In the example above, the hidden input field is bound to the variable named `CUSTOMER_ID`
of type `String` and contains the value `testuser`.

### Supported Variable Types for Hidden Elements

The hidden input field supports the same variable types as the single line text input `<input
type="text"></input>`.

[choices]: ref:#supported-html-controls-choices
[javascript]: ref:#custom-javascript
