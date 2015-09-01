---

title: 'Working with Java Objects'
weight: 50

menu:
  main:
    identifier: "embedded-forms-ref-java-objects"
    parent: "embedded-forms-ref"

---

This section explains how to work with serialized Java Objects in embedded task forms.

{{< note >}}
Out of the box, you can only work with Java Objects which are serialized in *JSON format*
If Java Classes are serialized using JAX-B, you need to add custom XML parsing and writing logic
to the embedded form. Java Objects serialized using Java Serialization cannot be used in forms.
{{< /note >}}


# Fetching an existing Serialized Java Object Variable

The Form SDK will only fetch those variables which are actually used in a form. Since a Complex Java
Object is usually not bound to a single input field, we cannot use the `cam-variable-name` directive.
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


# Creating a new Serialized Java Object

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


# Full Example

A full example of this feature can be found in the [Camunda BPM Examples Repository](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-embedded-serialized-java-object).
