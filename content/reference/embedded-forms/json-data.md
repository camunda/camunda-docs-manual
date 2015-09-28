---

title: "Working with Json Data"
weight: 40

menu:
  main:
    identifier: "embedded-forms-ref-json"
    parent: "embedded-forms-ref"

---

# Fetching an existing JSON Variable

The Form SDK will only fetch those variables which are actually used in a form. Since a JSON object is usually not bound to a single input field, we cannot use the `cam-variable-name` directive.
We thus need to fetch the variable programatically:

```html
<script cam-script type="text/form-script">
  camForm.on('form-loaded', function() {
    // tell the form SDK to fetch the variable named 'customer'
    camForm.variableManager.fetchVariable('customer');
  });
  camForm.on('variables-fetched', function() {
    // work with the variable (bind it to the current AngularJS $scope)
    $scope.customer = camForm.variableManager.variableValue('customer');
  });
</script>
```

After that, you can work with the JSON object in your form, e.g. use it in input fields:

```html
<input type="text" ng-model="customer.firstName" required />
<input type="text" ng-model="customer.lastName" required />
```


# Creating a new JSON Variable

You can use JSON objects in your embedded forms. In order to persist this data in the process instance, you have to explicitely create the variable in the `variableManager`. This code-snippet creates the variable `customer`.

```html
<script cam-script type="text/form-script">
  var customer = $scope.customer = {
    firstName: 'John',
    lastName: 'Doe'
  };

  camForm.on('form-loaded', function() {

    // declare a 'json' variable 'customer'
    camForm.variableManager.createVariable({
      name: 'customer',
      type: 'json',
      value: customer
    });
  });
</script>
```


# Full Example

A full example of this feature can be found in the [Camunda BPM Examples Repository](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-json).
