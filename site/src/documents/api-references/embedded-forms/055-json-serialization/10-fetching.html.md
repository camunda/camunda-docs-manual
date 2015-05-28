---

title: 'Fetching a JSON variable'
category: 'Working with JSON Objects'

---

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
