---

title: 'FEEL Engine Type Handling'
weight: 10

menu:
  main:
    name: "Type Handling"
    identifier: "user-guide-dmn-engine-feel-types"
    parent: "user-guide-dmn-engine-feel"
    pre: "Supported types of variable values and supported output types"

---

This documentation covers supported types of variable values when used in a FEEL expression and 
supported output types.

In DMN, when defining a `typeRef` attribute on a **Variable**, **Input** or **Output** element, the 
DMN Engine tries to convert the result value of the corresponding **Literal Expression**, 
**Input Expression** or the **Output Entry**. When no `typeRef` attribute is specified, the DMN 
Engine passes the return value of the FEEL Engine directly without any conversion. Please see the 
documentation about [Supported Data Types in DMN] to learn more about the `typeRef` attribute. 

The FEEL Engine might support more types than listed below. However, this page defines
which of the types are known for being...

* ...well integrable in Camunda 7
* ...covered by automated tests

## Supported Variable Value Types

The variable value types listed in this section can be handled by the FEEL Engine when passing.

### Java Native Types

* `java.lang.String`
* `java.lang.Float`
* `java.lang.Double`
* `java.lang.Integer`
* `java.lang.Long`
* `java.lang.Boolean`
* `java.util.Date`
* `java.util.Map`
* `java.util.List`

### Spin Types

* `org.camunda.spin.json.SpinJsonNode`
* `org.camunda.spin.xml.SpinXmlElement`

For more information about the Camunda Spin integration, please see the documentation about 
[FEEL Engine Spin Integration].

## Return Types

The table displays:

* Which return value of a FEEL Expression maps to which Java type
* Which Camunda 7 specific variable type is assigned for the respective Java type

<table class="table table-striped">
  <tr>
    <th>FEEL Expression Example</th>
    <th>FEEL Engine Return Type</th>
    <th>Camunda Variable Type</th>
  </tr>
  <tr>
    <td><code>null</code></td>
    <td><code>null</code></td>
    <td>null</td>
  </tr>
  <tr>
    <td><code>"foo"</code></td>
    <td><code>java.lang.String</code></td>
    <td>string</td>
  </tr>
  <tr>
    <td><code>3.1415</code></td>
    <td><code>java.lang.Double</code></td>
    <td>double</td>
  </tr>
  <tr>
    <td><code>3</code></td>
    <td><code>java.lang.Long</code></td>
    <td>long</td>
  </tr>
  <tr>
    <td><code>true</code></td>
    <td><code>java.lang.Boolean</code></td>
    <td>boolean</td>
  </tr>
  <tr>
    <td><code>time("11:45:30")</code></td>
    <td><code>java.time.LocalTime</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td>
        <code>time("11:45:30+02:00")</code><br>
        <code>time("10:31:10@Europe/Paris")</code>
    </td>
    <td><code>org.camunda.feel.syntaxtree.ZonedTime</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>date("2017-03-10")</code></td>
    <td><code>java.time.LocalDate</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>date and time("2019-08-12T22:22:22")</code></td>
    <td><code>java.time.LocalDateTime</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td>
        <code>date and time("2019-08-12T22:22:22+02:00")</code><br>
        <code>date and time("2019-08-12T22:22:22@Europe/Berlin")</code>
    </td>
    <td><code>java.time.ZonedDateTime</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>duration("P4D")</code></td>
    <td><code>java.time.Duration</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>duration("P1Y6M")</code></td>
    <td><code>java.time.Period</code></td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>{ "foo": "bar" }</code></td>
    <td><code>java.util.Map</code> *</td>
    <td>object</td>
  </tr>
  <tr>
    <td><code>[ "foo", "bar", "baz" ]</code></td>
    <td><code>java.util.List</code> *</td>
    <td>object</td>
  </tr>
</table>

\* Since the FEEL Engine is based on the [Scala Library], a Scala-specific implementation type for 
`Map` and `List` is used

[Supported Data Types in DMN]: {{< ref "/user-guide/dmn-engine/data-types.md#supported-data-types" >}}
[FEEL Engine Spin Integration]: {{< ref "/user-guide/dmn-engine/feel/spin-integration.md" >}}
[Scala Library]: https://www.scala-lang.org/
