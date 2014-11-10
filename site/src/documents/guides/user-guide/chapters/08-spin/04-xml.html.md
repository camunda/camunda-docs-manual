---

title: 'XML'
category: 'Data Formats (XML, JSON, Other)'

---

For working with XML, the Spin functions `org.camunda.spin.Spin.S` and `org.camunda.spin.Spin.XML` can be used as entry points. The latter offers strongly-typed access to Spin's XML Api and is preferable when writing Java code. The returned Spin wrapper offers methods for manipulating and writing XML as well as mapping XML to Java. Furthermore, the entry functions can be provided with Java objects that get implicitly converted to Spin's intermediary XML format.

The following provides examples on how camunda Spin can be used in the process engine to work with XML data. For illustration purposes, let us assume that there exists a String process variable `customer` containing XML. It has the following contents:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer xmlns="http://camunda.org/example" name="Jonny">
  <address>
    <street>12 High Street</street>
    <postCode>1234</postCode>
  </address>
</customer>
```

### Expression Language Integration

The Spin entry functions can be used wherever the process engine allows expression language. The following BPMN snippet shows a conditional sequence flow expression based on the customer's post code:

```xml
...
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${XML(customer).xPath("/customer/address/postCode").element().textContent() == "1234"}
  </conditionExpression>
</sequenceFlow>
...
```

### Scripting Integration

The following example is a script implemented in Javascript. The script makes use of the Spin API to extract the address object from the customer, add a city name and set it as a process variable:

```xml
...
<scriptTask id="task" name="Script Task" scriptFormat="javascript">
  <script>
    <![CDATA[
    var address = S(customer).element("address");
    var city = XML("<city>New York</city>");
    address.append(city);
    execution.setVariable("address", address.toString());
    ]]>
  </script>
</scriptTask>
...
```

### Serializing Process Variables

A Java object can be serialized using Spin's built-in XML data format. Let us assume that there are two java classes, `com.example.Customer` and `com.example.Address`. Spin's default XML format relies on JAXB which is why these classes have JAXB annotations. They look as follows:

```java
@XmlRootElement(namespace = "http://camunda.org/example")
public class Customer {
  protected String name;
  protected Address address;

  @XmlAttribute
  public String getName() { .. }

  @XmlElement(namespace = "http://camunda.org/example")
  public Address getAddress() { .. }

  /* constructor and setters omitted for brevity */
}

public class Address {
  protected String street;
  protected int postCode;

  @XmlElement(namespace = "http://camunda.org/example")
  public String getStreet() { .. }

  @XmlElement(namespace = "http://camunda.org/example")
  public int getPostCode() { .. }

  /* constructor and setters omitted for brevity */
}
```

The following Java code sets a process variable to a `Customer` object that is serialized using Spin's XML data format:

```java
Address address = new Address("12 High Street", 1234);
Customer customer = new Customer("jonny", address);

ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("aProcess");

ObjectValue typedCustomerValue =
  Variables.objectValue(customer).serializationDataFormat("application/xml").create();

runtimeService.setVariableTyped(processInstance.getId(), "customer", typedCustomerValue);
```

The decisive statement is

```java
ObjectValue typedCustomerValue =
  Variables.objectValue(customer).serializationDataFormat("application/xml").create();
```

This creates a variable value from the `customer` object. The invocation `serializationDataFormat("application/xml")` tells the process engine in which format the variable should be serialized. This name **must** match the name of a data format known to Spin. For example, `application/xml` is the name of the built-in XML data format.

Once the variable is set, its serialized value can be retrieved using the type variable API. For example:

```java
ObjectValue customer = runtimeService.getVariableTyped(processInstance.getId(), "customer");
String customerXml = customer.getValueSerialized();

/*
customerXml matches:
<?xml version="1.0" encoding="UTF-8"?>
<customer xmlns="http://camunda.org/example" name="Jonny">
  <address>
    <street>12 High Street</street>
    <postCode>1234</postCode>
  </address>
</customer>
*/
```

<div class="alert alert-info">
  <strong>Default Serialization Format:</strong>
  <p>The engine can be configured to persist all objects for which no explicit data format is specified as XML. The process engine configuration offers a property <code>defaultSerializationFormat</code>. To configure default XML serialization, set this property to <code>application/xml</code>. Now, the invocation <code>runtimeService.setVariable(processInstance.getId(), "customer", new Customer())</code> directly serializes the Customer object as XML without explicit declaration of the format.</p>
</div>
