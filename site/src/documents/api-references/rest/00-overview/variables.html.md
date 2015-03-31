---

title: 'Variables in the REST API'
category: 'Overview'

---

In the REST API, [process variables][variables] are represented by JSON objects of the following
form:

```json
{
  "type": "String",
  "value": "Some value",
  "valueInfo": {}

}
```

The REST API supports the [Value Types][variables-types] supported by the process engine.

## Capitalization of Type Names

In the REST API, the type names start with a capital letter, i.e., `String` instead of `string`.

## Serialized and Deserialized Object Values

Object Values are instances of (non primitive) Java types. When working with the REST API, it is
generally advisable to work with the serialized value of a variable. In that case the value is
retrieved from the database and directly returned in the http response. If the client you are
building is not a Java Applications by itself, make sure you use a text-based
[serialization dataformat][serialization-data-format] (such as XML or JSON).

> In order to retrieve the serialized form of a variable, use the `deserializeValues=false`
> GET parameter.

[variables]: ref:/guides/user-guide/#process-engine-process-variables
[variables-types]: ref:/guides/user-guide/#process-engine-process-variables-supported-variable-values
[serialization-data-format]: ref:/user-guide/#process-engine-process-variables-object-value-serialization
