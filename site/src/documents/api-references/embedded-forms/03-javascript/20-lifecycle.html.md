---

title: 'Participating in the Form Lifecycle'
category: 'Custom JavaScript'

---

It is possible to participate in the lifecycle of the form. See [Form Lifecycle and
Events][lifecycle] for more details.

## Fetching additional Variables

When loading the form, the values of all variables used in the form will be fetched from the
backend. This means that the form SDK will only fetch those variables which are actually used in the
form. The most convenient way for using a variable is the `cam-variable-name` directive. However,
there are some situations where directive-based usage is inconvenient. In such situations it is
useful to declare additional variables programmatically:

```html
<form role="form">

  <div id="my-container"></div>

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('form-loaded', function() {
      // this callback is executed *before* the variables are loaded from the server.
      // if we declare a variable here, its value will be fetched as well
      variableManager.fetchVariable('customVariable');
    });

    camForm.on('variables-fetched', function() {
      // this callback is executed *after* the variables have been fetched from the server
      var variableValue = variableManager.variableValue('customVariable');
      $( '#my-container', camForm.formElement).textContent(variableValue);
    });
  </script>

</form>
```

## Submitting additional Variables

Similar to fetching additional variables using a script, it is also possible to add additional
variables to the submit:


```html
<form role="form">

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('submit', function() {
      // this callback is executed when the form is submitted, *before* the submit request to
      // the server is executed

      // creating a new variable will add it to the form submit
      variableManager.createVariable({
        name: 'customVariable',
        type: 'String',
        value: 'Some Value...',
        isDirty: true
      });

    });
  </script>

</form>
```

## Implementing Custom Fields

The following is a small usage example which combines some of the features explained so far.
It uses custom JavaScript to implement a custom interaction with a form field which does not
use any `cam-variable-*` directives.

It shows how custom scripting can be used for

* declaring a variable to be fetched from the backend,
* writing the variable's value to a form field,
* reading the value upon submit.

```html
<form role="form">

  <!-- custom control which does not use cam-variable* directives -->
  <input type="text"
         class="form-control"
         id="customField">

  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;
    var customField = $('#customField', camForm.formElement);

    camForm.on('form-loaded', function() {
      // fetch the variable 'customVariable'
      variableManager.fetchVariable('customVariable');
    });

    camForm.on('variables-fetched', function() {
      // value has been fetched from the backend
      var value = variableManager.variableValue('customVariable');
      // write the variable value to the form field
      customField.val(value);
    });

    camForm.on('submit', function(evt) {
      var fieldValue = customField.val();
      var backendValue = variableManager.variable('customVariable').value;

      if(fieldValue === backendValue) {
        // prevent submit if value of form field was not changed
        evt.submitPrevented = true;

      } else {
        // set value in variable manager so that it can be sent to backend
        variableManager.variableValue('customVariable', fieldValue);
      }
    });
  </script>

</form>
```
The above example uses jQuery for interacting with the HTML controls. If you use AngularJS, you can also populate the `$scope` in the `variables-fetched` callback and read the values from the `$scope` in the `submit` callback:

```html
<form role="form">

<!-- custom control which does not use cam-variable* directives
     but binds to the angular scope -->
<input type="text"
       class="form-control"
       id="customField"
       ng-model="customerId">

<script cam-script type="text/form-script">
  var variableManager = camForm.variableManager;

  $scope.customerId = null;

  camForm.on('form-loaded', function() {
    // fetch the variable 'customVariable'
    variableManager.fetchVariable('customVariable');
  });

  camForm.on('variables-fetched', function() {
    // value has been fetched, bind to $scope.customerId
    $scope.customerId = variableManager.variable('customVariable').value;
  });

  camForm.on('submit', function(evt) {
    // set value in variable manager so that it can be sent to backend
    variableManager.variableValue('customVariable', $scope.customerId);
  });
</script>

</form>
```

[lifecycle]: ref:#lifecycle-and-events
