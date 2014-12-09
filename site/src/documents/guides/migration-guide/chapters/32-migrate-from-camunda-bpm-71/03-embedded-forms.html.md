---

title: 'Migrating Embedded Task Forms'
category: 'Migrate from Camunda BPM 7.1 to 7.2'

---

Embedded form support has been redesigned in Camunda BPM 7.2 and existing forms must be migrated.

> Documentation on embedded forms support in 7.2 can be found in the [Embedded Forms Reference][forms-reference]

# Overview

The following APIs / Behavior changed:

* The `form-field` directive has been replaced with `cam-variable-name` and `cam-variable-type`.
* The form now has a defined lifecycle (`form-loaded`, `variables-fetched`, ...) for which callbacks / event listeners can be provided.
* In 7.1, all process instance scope variables were fetched. In 7.2 only the variables used in the form are fetched. The variables are retrieved from the task scope and its parent scopes.

In the remainder of this section, we walk through these changes in detail.

# The `form-field` directive

The form field directive is not supported in 7.2. HTML controls using the `form-field` directive need to be migrated.

The `form-field` directive was replaced by

* `cam-variable-name`: provides the name of the variable.
* `cam-variable-type`: provides the type of the variable.

### The `form-field` directive on Input Fields

In 7.1, the `form-field` directive was used on input fields of the following form

```html
<input form-field name="[variableName]" type="[type]" />
```

#### The `name` Attribute

In 7.2, the HTML `name` attribute is not used anymore for providing the name of the process variable. In 7.2, the `cam-variable-name` attribute must be used:

```html
<input name="someName"
       cam-variable-name="[variableName]" />
```

#### The `type` Attribute

In 7.2 the HTML `type` attribute is not used anymore for providing the type of the variable. Instead, the `cam-variable-type` attribute is used:

```html
<input name="someName"
       cam-variable-name="[variableName]"
       type="input|checkbox|hidden|..."
       cam-variable-type="[variableType]" />
```

> Note: The `cam-variable-type` attribute is only required if the variable does not yet exist. If the variable already exists in the process, the attribute is not required.

##### Boolean

In 7.1 a boolean input field looked like this:

```html
<input form-field name="VAR_NAME" type="boolean" />
```

In 7.2 it looks like this:

```html
<input type="checkbox"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Boolean" />
```

##### String

In 7.1 a string input field looked like this:

```html
<input form-field name="VAR_NAME" type="string" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="String" />
```

##### Number

In 7.1 a number input field looked like this:

```html
<input form-field name="VAR_NAME" type="number" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Integer|Long|Short|Float|Double" />
```

##### Date

In 7.1 a date input field looked like this:

```html
<input form-field name="VAR_NAME" type="date" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Date" />
```

> See this [Note on Datepickers][datepickers]

### The `form-field` Directive on Select Boxes

In 7.1, select boxes had the following form:

```html
<select form-field
        name="[variableName]"
        type="[type]"
        form-values="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

In 7.2, select boxes have the following form:

```html
<select cam-variable-name="[variableName]"
        cam-variable-type="[type]"
        cam-choices="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

#### Serialized List and Map

In 7.1 a serialized `java.util.List` and `java.util.Map` instance could be used for populating the `form-values="[optionsVarName]"`. In 7.2, this is possible in combination with the `cam-choices="[optionsVarName]"` directive. However, the lists and maps need to be serialized using the `application/json` dataformat:

```java
Map<String, String> productTypes = new HashMap<String, String>();
productTypes.put("001", "Notebook");
productTypes.put("002", "Server");
productTypes.put("003", "Workstation");

execution.setVariable("AVAILABLE_PRODUCT_TYPES",  
  objectValue(customerData)
    .serializationDataFormat(SerializationDataFormats.JSON)
    .create());
```

### The `form-field` Directive on a Textarea

In 7.1 a textarea control had the following form:

```html
<textarea form-field name="[variableName]"></textarea>
```

In 7.2, it has the following form:

```html
<textarea name="someName"
          cam-variable-name="[variableName]"
          cam-variable-type="String"></textarea>
```

# Fetching additional variables

In 7.1 all variables from the process instance scope were fetched. In 7.2 the form needs to declare the variables it wants to fetch. This can be achieved declaratively or programmatically.

## Fetching a variable using `cam-variable-name`

If you use the `cam-variable-name` directive, the corresponding process variable will be fetched.

## Fetching a variable using JavaScript

Additional variables can be fetched by hooking into the form lifecycle.

```html
<form role="form">

Value: {{customValue}}.

<script cam-script type="text/form-script">
var variableManager = camForm.variableManager;

camForm.on('form-loaded', function() {
  // this callback is executed *before* the variables are loaded from the server.
  // if we declare a variable here, its value will be fetched as well
  variableManager.fetchVariable('customVariable');
});

camForm.on('variables-fetched', function() {
  // this callback is executed *after* the variables have been fetched from the server
  $scope.customValue = variableManager.variableValue('customVariable');

});
</script>

</form>
```

[forms-reference]: ref:/api-references/embedded-forms/
[datepickers]: ref:/api-references/embedded-forms/#supported-html-controls-date-inputs-using-a-date-picker
