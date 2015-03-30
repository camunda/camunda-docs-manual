---

title: 'Variables in the Rest Api'
category: 'Overview'

---

In the Rest Api, [process variables][variables] are represented by Json objects of the following
form:

```json
{
  "type": "String",
  "value": "Some value",
  "valueInfo": {}

}
```

The Rest Api supports the [Value Types][variables-types] supported by the process engine.

## Capitalization of Type Names

In the Rest Api, the type names start with a capital letter, ie. `String` instead of `string`.

## Serialized and Deserialized Object Values

Object Values are instances of (non primitive) Java types. When working with the Rest Api, it is
generally advisable to work with the serialized value of a variable. In that case the value is
retrieved from the database and directly returned in the http response. If the client your are
building is not a Java Applications by itself, make sure you use a text-based
[serialization dataformat][serialization-data-format] (such as Xml or Json).

> In order to retrieve the serialized form of a variable, use the `deserializeValues=false`
> GET parameter.

[variables]: ref:/guides/user-guide/#process-engine-process-variables
[variables-types]: ref:/guides/user-guide/#process-engine-process-variables-supported-variable-values
[serialization-data-format]: ref:/user-guide/#process-engine-process-variables-object-value-serialization
