---

title: 'Selects'
weight: 50

menu:
  main:
    identifier: "embedded-forms-ref-controls-selects"
    parent: "embedded-forms-ref-controls"

---

Select boxes are HTML controls of the form

```html
<select></select>
```


# Binding to a Process Variable

A select box can be bound to a process variable using the `cam-variable-name` directive:

```html
<select cam-variable-name="foo"
        cam-variable-type="String">
  <option>bar</option>
  <option>zar</option>
</select>
```


# Supported Variable Types

The select box supports the same value types as `<input type="text">`.


# Populating the Options from a Variable

The `<option>` entries can be populated using a variable. The name of the variable can be provided using the `cam-choices` directive:

```html
<select cam-variable-name="PRODUCT_TYPE"
        cam-variable-type="String"
        cam-choices="AVAILABLE_PRODUCT_TYPES">
</select>
```

The directive `cam-choices` expects the values to be a List or Map (Object). In case of a Map (Object), the keys of the map are used as values of the options. `java.util.Map` and  `java.util.List` are supported but must be serialized as JSON:

```java
Map<String, String> productTypes = new HashMap<String, String>();
productTypes.put("001", "Notebook");
productTypes.put("002", "Server");
productTypes.put("003", "Workstation");

execution.setVariable("AVAILABLE_PRODUCT_TYPES",  
  Variables.objectValue(productTypes)
    .serializationDataFormat(SerializationDataFormats.JSON)
    .create());
```

Would be rendered as

```html
<select cam-variable-name="PRODUCT_TYPE"
        cam-variable-type="String"
        cam-choices="AVAILABLE_PRODUCT_TYPES">
  <option value="001">Notebook</option>
  <option value="002">Server</option>
  <option value="003">Workstation</option>
</select>
```
