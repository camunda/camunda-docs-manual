---

title: 'Task Forms'
category: 'Tasklist'

---

The Tasklist can work with different types of forms. To implement a Task Form in your application you have to connect the form resource with the BPMN 2.0 element in your process diagram. Suitable BPMN 2.0 elements for calling Tasks Forms are the [Start Event](ref:/api-references/bpmn20/#events-start-events) and the [User Task](ref:/api-references/bpmn20/#tasks-user-task). 

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

To create an embedded task form read the following section [Creating Embedded Task Forms](ref:#tasklist-task-forms-creating-embedded-task-forms).

## External Task Forms

If you want to call a Task Form that is not part of your application you can add a reference to the desired form. The Referenced Task Form will be configured similar to the Embedded Task Form. Open the properties view and enter `FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="FORM_NAME.html"
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

As variable types supported are `boolean`, `string`, `number` and `date`. The mapping between variable types and rendered input is as follows:

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