---

title: 'Creating a new Serialized Java Object'
category: 'Working with Serialized Java Objects'

---

In case the variable does not yet exist (for instance in a Start Form), you have to create the variable and specify the necessary meta data in order for the process engine to correctly handle the variable as Java Object.

```html
<script cam-script type="text/form-script">

  var dataObject = $scope.dataObject = {};

  camForm.on('form-loaded', function() {

    // declare variable 'customerData' incuding metadata for serialization
    camForm.variableManager.createVariable({
      name: 'customerData',
      type: 'Object',
      value: dataObject,
      valueInfo: {
        // indicate that object is serialized as json
        serializationDataFormat: 'application/json',
        // provide classname of java object to map to
        objectTypeName: 'org.camunda.bpm.example.CustomerData'
      }
    });

  });

</script>
```
