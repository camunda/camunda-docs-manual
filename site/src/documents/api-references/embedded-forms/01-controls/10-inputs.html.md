---

title: 'Text Inputs'
category: 'Supported HTML Controls'

---

Single line text inputs are `<input type="text">` controls. Single line text inputs are the most
common input field and allow the user to provide values for different data types.

## Binding Text Input to a Process Variable

A text input can be bound to a process variable using the `cam-variable-type` and
`cam-variable-name` directives:

```html
<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String" />
```

In the example above, the text input field is bound to the variable named `CUSTOMER_ID` of type
`String`.

## Supported Variable Types for Text Inputs

A text input field supports multiple variable types.

> *Binding to existing variables*: Note that if you bind the input field to an existing variable,
> the type of the variable is provided by the process engine and the `cam-variable-type` directive
> is not required.

### String

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

### Integer

In order to bind the input field to a Java `Integer` variable, the directive
`cam-variable-type="Integer"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_AGE"
       cam-variable-type="Integer" />
```

### Long

In order to bind the input field to a Java `Long` variable, the directive
`cam-variable-type="Long"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CUSTOMER_REVENUE"
       cam-variable-type="Long" />
```

### Short

In order to bind the input field to a Java `Short` variable, the directive
`cam-variable-type="Short"` must be used.

Example:

```html
<input type="text"
cam-variable-name="CUSTOMER_REVENUE"
cam-variable-type="Short" />
```

### Double

In order to bind the input field to a Java `Double` variable, the directive
`cam-variable-type="Double"` must be used.

Example:

```html
<input type="text"
cam-variable-name="CUSTOMER_REVENUE"
cam-variable-type="Double" />
```
