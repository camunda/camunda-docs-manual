---

title: 'Examples'
category: 'Custom JavaScript'

---

The following examples show example scenarios of custom Javascript in embedded forms.

## Load Additional Resources

This example includes an image, which is located in the contextPath of the form (e.g. in the same directory). The URL of the image is retrieved via the _task form key_ method of the REST API:

```html
<form role="form">
  <script cam-script type="text/form-script">
    inject(['$http', 'Uri', function($http, Uri) {
      camForm.on('form-loaded', function() {
        $http.get(Uri.appUri("engine://engine/:engine/task/" + camForm.taskId + "/form")).success(function(result){
          $scope.contextPath = result.contextPath;
        });
      });
    }]);
  </script>

  <img ng-src="{{contextPath}}/image.png" />

</form>
```
