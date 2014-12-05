---

title: 'AngularJS Integration'
category: 'Integrating the Forms SDK'

---

## Including the Angular Distribution

Make sure you include the AngularJS build of the Forms SDK:

```html
<script src="angular.min.js" type="text/javascript"></script>
<script src="camunda-bpm-sdk-angular.js" type="text/javascript"></script>
```

## Loading the Forms Module

Add the Forms SDK as module dependency to your application
module:

```javascript
angular.bootstrap(window.document, ['cam.embedded.forms', ...]);
```


## Angular Directives & Compilation

If the form is loaded from a URL, the SDK makes sure that it is properly compiled and linked to the current Angular scope. This allows using Angular directives in forms loaded dynamically at runtime.

```html
<form role="form" name="form">

<input type="text"
       cam-variable-name="CUSTOMER_ID"
       cam-variable-type="String"
       ng-model="customerId">

<p ng-show="customerId">Your input: <em>{{customerId}}</em></p>

</form>
```
