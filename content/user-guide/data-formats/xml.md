---

title: 'XML'
weight: 30

menu:
  main:
    identifier: "user-guide-spin-xml"
    parent: "user-guide-spin"

---

For working with XML, the Spin functions `org.camunda.spin.Spin.S` and `org.camunda.spin.Spin.XML` can be used as entry points. The latter offers strongly-typed access to Spin's XML API and is preferable when writing Java code. In scripting environments, only the `S` function is available. The returned Spin wrapper offers methods for manipulating and writing XML as well as mapping XML to Java. Furthermore, the entry functions can be provided with Java objects that get implicitly converted to Spin's intermediary XML format.

The following provides examples on how Camunda Spin can be used in the process engine to work with XML data. For illustration purposes, let us assume that a String process variable `customer` containing XML exists. It has the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer xmlns="http://camunda.org/example" name="Jonny">
  <address>
    <street>12 High Street</street>
    <postCode>1234</postCode>
  </address>
</customer>
```

Further documentation about the usage of Spin can be found in the [Camunda Spin Dataformat Reference]({{< relref "reference/spin/_index.md" >}}).


# Expression Language Integration

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

If your variable is already an [XML variable value]({{< relref "#native-xml-variable-value" >}}) and not a string like in the previous example, you can omit the `XML(...)` call and directly access the variable:

```xml
...
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${customer.xPath("/customer/address/postCode").element().textContent() == "1234"}
  </conditionExpression>
</sequenceFlow>
...
```


# Scripting Integration

The following example is a script implemented in JavaScript. The script makes use of the Spin API to extract the address object from the customer, add a city name and set it as a process variable:

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


# Native XML Variable Value

The native variable value for XML makes it possible to easily parse an XML string and wrap it inside an object without the need to have a class representing the XML. Suppose we want to save the XML inside a process variable for later use, we could do the following inside a JavaDelegate:

```java
public class MyDelegate implements JavaDelegate {

  @Override
  public void execute(DelegateExecution execution) throws Exception {
    String xml = "<customer xmlns=\"http:\\/\\/camunda.org/example\" name=\"Jonny\">"
          + "<address>"
            + "<street>12 High Street</street>"
            + "<postCode>1234</postCode>"
          + "</address>"
        + "</customer>";
    XmlValue xmlValue = SpinValues.xmlValue(xml).create();
    execution.setVariable("customerJonny", xmlValue);
  }
}
```

The call to `SpinValues.xmlValue(...).create()` will transform the string into a DomXML object wrapped by Spin.

If we wanted to retrieve the XML in another JavaDelegate and, e.g., add some more information, we could do this easily:

```java
public class AddDataDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution execution) throws Exception {
    XmlValue customer = execution.getVariableTyped("customerJonny");
    SpinXmlElement xmlElement = customer.getValue().append(Spin.XML("<creditLimit>1000.00</creditLimit>"));
    customer = SpinValues.xmlValue(xmlElement).create();
    execution.setVariable("customerJonny", customer);
    //<?xml version="1.0" encoding="UTF-8"?><customer xmlns="http:\/\/camunda.org/example" name="Jonny"><address><street>12 High Street</street><postCode>1234</postCode></address><creditLimit xmlns="">1000.00</creditLimit></customer>
  }
}
```

When retrieving the XML value via `execution.getVariableTyped()` there are two options: serialized and deserialized.
Retrieving the variable deserialized by calling either `getVariableTyped("name")` or `getVariableTyped("name", true)`  the `XmlValue` contains the wrapped DomXML object to represent the XML data. Calling `getVariableTyped("name", false)` results in `XmlValue` containing only the raw string, which is advantageous if you only need the string to pass it to, e.g., another API.


# Serializing Process Variables

A Java object can be serialized using Spin's built-in XML data format. Let us assume that there are two Java classes, `com.example.Customer` and `com.example.Address`. Spin's default XML format relies on JAXB which is why JAXB annotations like `@XmlRootElement`, `@XmlAttribute`, and `@XmlElement` can be used to configure the serialization process. Note though that these annotations are not required. The classes look as follows:

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

runtimeService.setVariable(processInstance.getId(), "customer", typedCustomerValue);
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

{{< note title="Default Serialization Format" class="info" >}}
  The engine can be configured to persist all objects for which no explicit data format is specified as XML. The process engine configuration offers a property `defaultSerializationFormat`. To configure default XML serialization, set this property to `application/xml`. Now, the invocation `runtimeService.setVariable(processInstance.getId(), "customer", new Customer())` directly serializes the customer object as XML without explicit declaration of the format.
{{< /note >}}
