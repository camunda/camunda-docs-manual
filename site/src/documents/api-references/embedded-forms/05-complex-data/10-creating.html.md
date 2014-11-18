---

title: 'Creating a new Serialized Java Object'
category: 'Working with Serialized Java Objects'

---

In case the variable does not yet exist (for instance in a Start Form), you have to create the variable and specify the necessary meta data in order for the process engine to correctly handle the variable as Java Object.

```html
<script cam-script type="text/form-script">
  camForm.on('form-loaded', function() {

    // declare variable incuding metadata for serialization
    camForm.variableManager.createVariable({
      name: 'invoiceData',
      type: 'Object',
      value: {},
      serializationConfig: {
        dataFormatId: 'application/json; implementation=tree',
        rootType: 'org.my.project.dto.InvoiceData'
      }
    });

  });
  camForm.on('variables-fetched', function() {
    $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
  });
</script>
```
