---

title: "Variables in the REST API"
weight: 50

menu:
  main:
    identifier: "rest-api-overview-variables"
    parent: "rest-api-overview"

---

In the REST API, [process variables]({{< relref "user-guide/process-engine/variables.md" >}}) are represented by JSON objects of the following
form:

```json
{
  "type": "String",
  "value": "Some value",
  "valueInfo": {}

}
```

The REST API supports the [Value Types]({{< relref "user-guide/process-engine/variables.md#supported-variable-values" >}}) supported by the process engine.


# Capitalization of Type Names

In the REST API, the type names start with a capital letter, i.e., `String` instead of `string`.


# Serialized and Deserialized Object Values

Object Values are instances of (non primitive) Java types. When working with the REST API, it is
generally advisable to work with the serialized value of a variable. In that case the value is
retrieved from the database and directly returned in the http response. If the client you are
building is not a Java Applications by itself, make sure you use a text-based
[serialization dataformat]({{< relref "user-guide/process-engine/variables.md#object-value-serialization" >}}) (such as XML or JSON).

{{< note title="" class="info" >}}
  To retrieve the serialized form of a variable, use the `deserializeValues=false` GET parameter.
{{< /note >}}
