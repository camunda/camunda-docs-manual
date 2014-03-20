---

title: 'Task Forms'
category: 'Tasklist'

---

The Tasklist can work with different types of forms. To implement a Task Form in your application you have to connect the form resource with the BPMN 2.0 element in your process diagram. Suitable BPMN 2.0 elements for calling Tasks Forms are the [Start Event](ref:/api-references/bpmn20/#events-start-events) and the [User Task](ref:/api-references/bpmn20/#tasks-user-task).

Out of the box, camunda Tasklist supports four different kinds of task forms:

* [Embedded Task Forms](ref:#tasklist-task-forms-embedded-task-forms): HTML-based task forms displayed embedded inside the tasklist.
* [Generated Task Forms](ref:#tasklist-task-forms-generated-task-forms): Like embedded task forms but generated from XML Metadata inside BPMN 2.0 XML.
* [External Task Forms](ref:#tasklist-task-forms-external-task-forms): The user is directed to another application to complete the task.
* [Generic Task Forms](ref:#tasklist-task-forms-generic-task-forms): If no task form exists, a generic form is displayed for editing the process variables.

When embedding the process engine into a custom application, you can integrate the process engine with any form technology such as [Java Server Faces](ref:/real-life/how-to/#user-interface-jsf-task-forms), Java Swing and Java FX, Rest-based Javascript web applications and many more.

## Embedded Task Forms

To add an embedded Task Form to your application simply create an HTML file and attach it to a [User Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start Event](ref:/api-references/bpmn20/#events-start-events) in your process model.
Add a folder `src/main/webapp/forms` to your project folder and create a FORM_NAME.html file containing the relevant content for your form. The following example shows a simple form with two input fields:

```html
<form class="form-horizontal">
  <div class="control-group">
    <label class="control-label">Customer ID</label>
    <div class="controls">
      <input form-field type="string" name="customerId"></input>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label">Amount</label>
    <div class="controls">
      <input form-field type="number" name="amount"></input>
    </div>
  </div>
</form>
```

To configure the form in your process open the process in your Eclipse IDE with the <a href="http://www.camunda.org/design/modeler.html">camunda Modeler</a> and select the desired [User Task](ref:/api-references/bpmn20/#tasks-user-task) or [Start Event](ref:/api-references/bpmn20/#events-start-events). Open the properties view and enter `embedded:app:forms/FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="embedded:app:forms/FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```

To create an embedded task form read the section [Creating Embedded Task Forms](ref:#tasklist-task-forms-creating-embedded-task-forms).

## Generated Task Forms

The camunda process engine supports generating Html Task Forms based on Form Data Matadata provided in BPMN 2.0 XML. Form Data Metadata is a set of BPMN 2.0 vendor extensions provided by camunda allowing you to define form fields directly in BPMN 2.0 XML:

```xml
<userTask id="usertask" name="Task">
  <extensionElements>
    <camunda:formData>
        <camunda:formField
            id="firstname" label="Firstname" type="string">
            <camunda:validation>
               <camunda:constraint name="maxlength" config="25" />
               <camunda:constraint name="required" />
            </camunda:validation>
        </camunda:formField>
        <camunda:formField
            id="lastname" label="Lastname" type="string">
            <camunda:validation>
               <camunda:constraint name="maxlength" config="25" />
               <camunda:constraint name="required" />
            </camunda:validation>
        </camunda:formField>
        <camunda:formField
            id="dateOfBirth" label="Date of Birth" type="date" />
    </camunda:formData>
  </extensionElements>
</userTask>
```

<p class="alert alert-info">
  <strong>camunda Modeler:</strong> Form Metadata can be edited graphically using camunda Modeler
</p>

This form would look as follows in camunda tasklist:

<center>
  <img class="img-responsive" src="ref:asset:/assets/img/user-guide/generated-forms-example.png" />
</center>

As you can see, the `<camunda:formData ... />` element is provided as a child element of the BPMN `<extensionElements>` element. Form Meta Data consists of multiple Form Fields which represent individual input fields where a user has to provide some value or selection.

### Form Fields

A form field can have the following attributes:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Attribute</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td><td>unique id of the form field, corresponding to the name of the process variable to which the value of the form field is added when the form is submitted.</td>
    </tr>
    <tr>
      <td>label</td><td>The label to be displayed next to the form field.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>The type of the form field. The following types are supported out of the box:
        <ul>
          <li>string</li>
          <li>long</li>
          <li>date</li>
          <li>boolean</li>
          <li>enum</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>defaultValue</td><td>Value to be used as a default (pre-selection) for the field.</td>
    </tr>
  </tbody>
</table>

### Form Field Validation

Validation can be used for specifying frontend and backend validation of form fields. camunda BPM provides a set of built-in form field validators and an extension point for plugging in custom validators.

Validation can be configured for each form field in BPMN 2.0 XML:

```xml
<camunda:formField
    id="firstname" name="Firstname" type="string">
    <camunda:validation>
       <camunda:constraint name="maxlength" config="25" />
       <camunda:constraint name="required" />
    </camunda:validation>
</camunda:formField>
```

As you can see, you can provide a list of validation constraints for each Form Field.

The following built-in validators are supported out of the box:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Validator</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>required</td>
      <td>
        <p>Applicable to all types. Validates that a value is provided for the form field. Rejects 'null' values and empty strings.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;required&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>minlength</td>
      <td>
        <p>Applicable to string fields. Validates minlength of text content. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;minlength&quot; config=&quot;4&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>maxlength</td>
      <td>
        <p>Applicable to string fields. Validates maxlength of text content. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;maxlength&quot; config=&quot;25&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>min</td>
      <td>
        <p>Applicable to numeric fields. Validates the min value of a number. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;min&quot; config=&quot;1000&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>max</td>
      <td>
        <p>Applicable to numeric fields. Validates the max value of a number. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;max&quot; config=&quot;10000&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

camunda BPM supports custom validators. Custom validators are referenced using their fully qualified classname or an expression. Expressions can be used for resolving Spring or CDI @Named beans:

```xml
<camunda:formField
    id="firstname" name="Firstname" type="string">
    <camunda:validation>
       <camunda:constraint name="validator" config="com.asdf.MyCustomValidator" />
       <camunda:constraint name="validator" config="${validatorBean}" />
    </camunda:validation>
</camunda:formField>
```
A custom validator implements the `org.camunda.bpm.engine.impl.form.validator.FormFieldValidator` interface:

```java
public class CustomValidator implements FormFieldValidator {

  public boolean validate(Object submittedValue, FormFieldValidatorContext validatorContext) {

    // ... do some custom validation of the submittedValue

    // get access to the current execution
    DelegateExecution e = validatorContext.getExecution();

    // get access to all form fields submitted in the form submit
    Map<String,Object> completeSubmit = validatorContext.getSubmittedValues();

  }

}
```

If the process definition is deployed as part of a ProcessApplication deployment, the validator instance is resolved using the process application classloader and / or the process application Spring Application Context / CDI Bean Manager in case of an expression.

## External Task Forms

If you want to call a Task Form that is not part of your application you can add a reference to the desired form. The Referenced Task Form will be configured similar to the Embedded Task Form. Open the properties view and enter `FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="app:FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```

The tasklist creates the URL by the pattern:

```xml
"../.." + contextPath (of process application) + "/" + "app" + formKey (from BPMN 2.0 XML) + "processDefinitionKey=" + processDefinitionKey + "&callbackUrl=" + callbackUrl;
```

When you have completed the task the call back URL will be called.

<div class="alert alert-info">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-8">
      <strong>How-To</strong>
      <p><a href="ref:/real-life/how-to/#user-interface-jsf-task-forms">How to add JSF Forms to your process application</a></p>
    </div>
  </div>
</div>

## Generic Task Forms

The generic form will be used whenever you have not added a dedicated form for a [User Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start Event](ref:/api-references/bpmn20/#events-start-events).

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-generic-form.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    Hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-plus"></i> </button> button to add a variable that will be passed to the process instance upon task completion. State a variable name and select the type and enter the desired value. Enter as much variables as you need.
    After hitting the <code>Complete Task</code> button the process instance contains the entered values. Generic Task Forms can be very helpful during the development stage, so you do not need to implement all Task Forms before you can run a workflow. For debugging and testing this concept has many benefits as well.
  </div>
</div>

## Creating Embedded Task Forms

Embedded task forms are plain HTML documents that contain input fields that map to process variables. These inputs must be annotated with a `form-field` attribute. Additionally they must declare the type and name of the mapped variable. A simple process variable mapping input is shown below:

```html
<input form-field type="boolean" name="myBoolean" />
```

### Input Fields

Input fields are HTML input fields of the form

```html
<input form-field type="[type]" name="[variableName]" />
```

The following variable types are supported on input fields: `boolean`, `string`, `number` and `date`. The mapping between variable types and rendered input is as follows:

<table class="table table-bordered" style="max-width: 300px">
  <thead>
    <tr>
      <th>Variable Type</th><th>Input Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>boolean</td><td>checkbox</td>
    </tr>
    <tr>
      <td>string</td><td>text</td>
    </tr>
    <tr>
      <td>number</td><td>number</td>
    </tr>
    <tr>
      <td>date</td><td>datetime</td>
    </tr>
  </tbody>
</table>

### Select Boxes

Select Boxes are HTML `<select>` elements of the form

```html
<select form-field type="[type]" name="[variableName]" form-values="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

The following parameters are supported:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Parameter</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>
        <p>The datatype of the select box. The following types are supported:</p>
        <p>
          <code>string</code>, <code>number</code>, <code>boolean</code>.
        </p>
      </td>
    </tr>
    <tr>
      <td>variableName</td>
      <td>
        <p>The name of the process variable to which this input field should be bound.</p>
      </td>
    </tr>
    <tr>
      <td>optionsVarName</td>
      <td>
        <p>Process variable providing the select options. The process variable can be of type <code>java.util.Map</code> or <code>java.util.List</code>. In case of a Map, the keys in the map are used as values of the select option and the values in the map are used as labels.</p>
      </td>
    </tr>
    <tr>
      <td>value</td>
      <td>
        <p>The value is used as value when submitting the sect box.</p>
      </td>
    </tr>
    <tr>
      <td>label</td>
      <td>
        <p>The label is displayed to the user.</p>
      </td>
    </tr>
  </tbody>
</table>

A simple example of a select box binding to the process variable `approver`:

```html
<select form-field type="string" name="approver">
  <option value="demo">Demo</option>
  <option value="john">Jonny</option>
  <option value="peter">Peter Meter</option>
</select>
```

Select options can also be loaded from a process variable:

```html
<select form-field type="string" name="approver" form-values="names">
</select>
```

### Radio Buttons

Radio buttons are HTML `<input>` elements of the form

```html
<input form-field type="radio" name="[variableName]" value="[value]">
```

*Note:* currently the radio button only supports string variables.

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Parameter</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>variableName</td>
      <td>
        <p>The name of the process variable</p>
      </td>
    </tr>
    <tr>
      <td>value</td>
      <td>
        <p>The value of the radio button</p>
      </td>
    </tr>
  </tbody>
</table>

Radio Buttons are usually used as a group:

```html
<input form-field type="radio" name="approver" value="jonny"> Jonny <br>
<input form-field type="radio" name="approver" value="mary"> Mary
```

### Textarea

Textareas are HTML `<textarea>` elements of the form

```html
<textarea form-field name="[variableName]"></textarea>
```

*Note:* currently the textarea only supports string variables.

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Parameter</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>variableName</td>
      <td>
        <p>The name of the process variable</p>
      </td>
    </tr>
  </tbody>
</table>

This is an example of the textarea:

```html
<textarea form-field name="selectedName"></textarea>
```

### Displaying the value of a form variable

You can reference the value of a process variable using the `formVariable()` method:

```html
The user {{formVariable('selectedName')}} should approve this request!
```

### Adding validation

Form validation may be added via [AngularJS](http://angularjs.org) [validation directives](http://docs.angularjs.org/api/ng.directive:input) that are available for [text input](http://docs.angularjs.org/api/ng.directive:input.text), [checkbox](http://docs.angularjs.org/api/ng.directive:input.checkbox) and [number input](http://docs.angularjs.org/api/ng.directive:input.number).

For example, the following snipped validates the form input against the pattern `00-00`:

```html
<input form-field type="string" name="myString" ng-pattern="/\d{2}-\d{2}/" />
```

To query the validation state of a form, you may use the `variablesForm` variable that is available in the scope of embedded task form:

```html
<input form-field type="string" name="myString" ng-pattern="/\d{2}-\d{2}/" />
<p ng-if="variablesForm.$invalid">
  Your form contains errors!
</p>
<p ng-if="variablesForm.myString.$invalid">
  The form input <em>myString</em> is not valid. Allowed pattern: <code>00-00</code>.
</p>
```

Based on the validation state of a form, a forms submit button will either be disabled (form has errors) or enabled (form is ok).

### Extending the Task Form Scope with Custom Behavior

It is possible to inject custom JavaScript code into the scope of an embedded form. To do that, the script must be wrapped into a
`<script form-script type="text/form-script"></script>` block.

Inside the script the variable `$scope` is provided to bind functions such as form input change listeners to it.
Given these change listeners advanced validation may be carried out.

Check out the [AngularJS documentation on ngModel](http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController) to learn more about how to interact with form elements.

```html
<input form-field type="string" name="myString" ng-change="myStringChanged()" />

<script form-script type="text/form-script">
  $scope.myStringChanged = function(e) {
    var formField = $scope.variablesForm.myString,
        value = formField.$modelValue;

    // value must equal 'cat'
    if (value != 'cat') {
      value.$setValidity('catEntered', false);
    } else {
      value.$setValidity('catEntered', true);
    }
  };
</script>
```

The above example binds a change listener to the input named `myString`. Inside the change listener the form fields value is retrieved.
Using the value, a validation is performed (must equal `cat`) and the form fields validation state is updated accordingly.

In case you would like to have access to internal services such as [$http](http://docs.angularjs.org/api/ng.$http) to perform validation against a backend you may use the `inject` hook provided inside a form script:

```html
<script form-script type="text/form-script">

  inject([ '$scope', '$http', function($scope, $http) {

    $scope.myStringChanged = function(e) {
      var formField = $scope.variablesForm.myString,
          value = formField.$modelValue;

      $http.get("...?myString=" + value).success(function(data) {
        if (data == "ok") {
          value.$setValidity('backendOk', true);
        } else {
          value.$setValidity('backendOk', false);
        }
      });
    };
  }]);
</script>
```

The example performs backend validation of the form field value using the `$http` service.

Note that you may want to [debounce](http://www.neerajkumar.net/blog/2013/07/07/function-debouncing-using-javascript/)
the backend validation rather than firing one query per user interaction.
