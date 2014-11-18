---

title: 'Fetching a Serialized Java Object'
category: 'Working with Serialized Java Objects'

---

This section explains how to work with serialized Java Objects in embedded task forms.

> NOTE: Out of the box, you can only work with Java Objects which are serialized in *JSON format*
> If Java Classes are serialized using JAX-B, you need to add custom XML parsing and writing logic
> to the embedded form.

The Form SDK will only fetch those variables which are actually used in a form. Since a Complex Java
Object is usually not bound to a single input field we cannot use the `cam-variable-name` directive.
We thus need to fetch the variable programatically:

```html
<script cam-script type="text/form-script">
  camForm.on('form-loaded', function() {
    // tell the form SDK to fetch the variable named 'invoiceData'
    camForm.variableManager.fetchVariable('invoiceData');
  });
  camForm.on('variables-fetched', function() {
    // work with the variable (bind it to the current AngularJS $scope)
    $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
  });
</script>
```
