---

title: 'Creating a new JSON variable'
category: 'Working with JSON Objects'

---

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
