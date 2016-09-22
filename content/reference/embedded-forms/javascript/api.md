---

title: 'Available API'
weight: 20

menu:
  main:
    identifier: "embedded-forms-ref-javascript-api"
    parent: "embedded-forms-ref-javascript"

---

Inside a form script, the following built-in variables and functions are available:


# camForm

The `camForm` variable is an instance of the `CamSDK.Form` class and is the primary access point to
the form API and allows definition of event handers for participation in the form [lifecycle]({{< relref "reference/embedded-forms/lifecycle.md" >}}):

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


# $scope

{{< note class="info" >}}
Only available with AngularJS integration.
{{< /note >}}

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


# inject()

{{< note class="info" >}}
Only available with AngularJS integration.
{{< /note >}}

```html
<form role="form">

  <script cam-script type="text/form-script">
    inject(['$http', 'Uri', function($http, Uri) {
      camForm.on('form-loaded', function() {
        // use injected $http service for making requests, e.g.
        $http.get(Uri.appUri('engine://engine/:engine/task/' + camForm.taskId)).success(function(task) {
          $scope.task = task;
        });
      });
    }]);
  </script>

</form>

```
