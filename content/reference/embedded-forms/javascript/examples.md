---

title: 'Examples'
weight: 60

menu:
  main:
    identifier: "embedded-forms-ref-javascript-examples"
    parent: "embedded-forms-ref-javascript"

---

The following examples show example scenarios of custom JavaScript in embedded forms.


# Load Additional Resources

This example includes an image, which is located in the contextPath of the form (i.e., in the same directory). The URL of the image is retrieved via the _task form key_ method of the REST API:

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

# Upload Large Files

This example contains a file input element and the script to send it to the server. In contrast to the [file input element of the Forms SDK]({{< relref "reference/embedded-forms/controls/files.md" >}}), this example can handle large files, but it also has some drawbacks:

* Can not be used in the start form of a process (no process instance id exists at this time)
* Does not take part in the form lifecycle (files could be saved even if the form is not submitted)
* Can only save one file at a time

This example first retrieves the process instance id of the task for the form. It then registers an upload function, which, when executed, uploads the data as a process instance variable with the name `uploadedFile`

```html
<form role="form">
  <input id="fileUpload"
         type="file" />
  <button ng-click="upload()">Upload</button>

  <script cam-script type="text/form-script">
    inject(['$http', 'Uri', function($http, Uri) {
      camForm.on('form-loaded', function() {
        $http.get(Uri.appUri('engine://engine/:engine/task/' + camForm.taskId)).success(function(result){
          $scope.upload = function() {
            var formData = new FormData();
            formData.append('data', document.getElementById('fileUpload').files[0]);
            $http.post(Uri.appUri('engine://engine/:engine/process-instance/' + result.processInstanceId + '/variables/uploadedFile/data'), formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
          };
       });
      });
    }]);
  </script>
</form>
```
