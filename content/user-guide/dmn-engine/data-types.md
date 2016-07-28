---

title: "Data Types in the DMN Engine"
weight: 40

menu:
  main:
    name: "Data Types"
    identifier: "user-guide-dmn-engine-data-types"
    parent: "user-guide-dmn-engine"
    pre: "Specify the Types of Input/Output Data"

---

A decision table allows to specify the types of inputs and outputs. When the
DMN engine evaluates an input or an output, it checks if the type of the
value matches the specified type. If the types do not match, the engine
tries to transform the value into the specified type or throws an exception.

The DMN engine supports basic types which can be extended by custom types.


# Supported Data Types

The following types are supported by the DMN engine:

<table class="table table-striped">
  <tr>
    <th>Data Type</th>
    <th>Can transform from</th>
    <th>Produce values of type</th>
  </tr>
  <tr>
    <td>string</td>
    <td>java.lang.Object</td>
    <td>StringValue</td>
  </tr>
  <tr>
    <td>boolean</td>
    <td>java.lang.Boolean, java.lang.String</td>
    <td>BooleanValue</td>
  </tr>
  <tr>
    <td>integer</td>
    <td>java.lang.Number, java.lang.String</td>
    <td>IntegerValue</td>
  </tr>
  <tr>
    <td>long</td>
    <td>java.lang.Number, java.lang.String</td>
    <td>LongValue</td>
  </tr>
  <tr>
    <td>double</td>
    <td>java.lang.Number, java.lang.String</td>
    <td>DoubleValue</td>
  </tr>
  <tr>
    <td>date</td>
    <td>java.util.Date, java.lang.String</td>
    <td>DateValue</td>
  </tr>
</table>

Each data type transformer produces a Typed Value which contains the value and
additional type informations.

If the given type does not match one of the above types then the value is
transformed into an untyped value by default.

## Working with Dates

The DMN engine supports a `date` type which is a combination of date and time.
By default, the data type transformer accept objects of the type
`java.util.Date` and Strings having the format `yyyy-MM-dd'T'HH:mm:ss`.

If you prefer another format or different representation of a date,
implement a custom type and [replace the default transformer][data-type-transformer].

# Setting the Data Type of an Input

The type of a decision table input is specified by the `typeRef` attribute on the
`inputExpression` element.

```xml
<decision>
  <decisionTable>
    <input id="orderSum" label="Order sum">
      <inputExpression typeRef="double">
        <text>sum</text>
      </inputExpression>
    </input>
    <!-- ... -->
  </decisionTable>
</decision>
```

# Setting the Data Type of an Output

The type of a decision table output is specified by the `typeRef` attribute on the `output`
element.

```xml
<decision>
  <decisionTable>
    <!-- ... -->
    <output id="result" label="Check Result" name="result" typeRef="string" />
    <!-- ... -->
  </decisionTable>
</decision>
```

# Setting the Data Type of a Variable

The type of a decision literal expression result is specified by the `typeRef` attribute on the `variable`
element.

```xml
<decision>
  <variable name="result" typeRef="string" />
  <!-- ... -->
</decision>
```

# Implement a custom Data Type

{{< note title="Use of Internal API" class="warning" >}}

Please be aware that these APIs are **not** part of the [public API]({{< relref
"introduction/public-api.md" >}}) and may change in later releases.

{{< /note >}}

The default data types of the DMN engine can be extended or replaced by custom
types. For example, you can add a new type for time or change the
transformation to support a different date format or localized boolean
constants.

To do this, implement a new {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/type/DmnDataTypeTransformer.html"
text="DmnDataTypeTransformer" >}}. The transformation is processed in the
`transform()` method and returns a typed value. If it cannot successfully transform a value,
it must throw an `IllegalArgumentException`.

```java
public class CustomDataTypeTransformer implements DataTypeTransformer {

  public TypedValue transform(Object value) throws IllegalArgumentException {
    // transform the value into a typed value
    return typedValue;
  }
}
```

To use this data type transformer in the DMN engine, add it to the
[DMN engine configuration][data-type-transformer].


[data-type-transformer]: {{< relref "user-guide/dmn-engine/embed.md#register-dmn-data-type-transformers" >}}
