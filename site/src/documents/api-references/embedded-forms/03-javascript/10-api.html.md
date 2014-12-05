---

title: 'Available API'
category: 'Custom JavaScript'

---

Inside a form script, the following built-in variables and functions are available:

## camForm

The `camForm` variable is an instance of the `CamSDK.Form` class and is the primary access point to
the form API and allows definition of event handers for participation in the form [lifecycle][lifecycle]:

```html
<form role="form">
  ...
  <script cam-script type="text/form-script">
    var variableManager = camForm.variableManager;

    camForm.on('variables-fetched', function() {
      // access to all process variables after the form has loaded
      console.log(variableManager.variables);
    });
  </script>

</form>
```

## $scope
> Only available with AngularJS integration.

Provides access to the current AngularJS scope:

```html
<form role="form">

  <input type="text"
         cam-variable-name="CUSTOMER_ID"
         cam-variable-type="String"
         ng-model="customerId" />

  <script cam-script type="text/form-script">
    camForm.on('variables-applied', function() {
      // the input field is bound to $scope.customerId
      $scope.customerId = "some-id";
    });
  </script>

</form>
```

## inject()
> Only available with AngularJS integration.

```html
<form role="form">

  <script cam-script type="text/form-script">
    inject([ '$scope', '$http', function($scope, $http) {
      camForm.on('form-loaded', function() {
        // use injected $http service for making requests
      });
    }]);
  </script>

</form>

```
[lifecycle]: ref:#lifecycle-and-events
