---

title: 'JSON'
category: 'Data Formats (XML, JSON, Other)'

---

For working with JSON, the Spin functions `org.camunda.spin.Spin.S` and `org.camunda.spin.Spin.JSON` can be used as entry points. The latter offers strongly-typed access to Spin's JSON Api and is preferable when writing Java code. In scripting environments, only the `S` function is available. The returned Spin wrapper offers methods for manipulating and writing JSON as well as mapping JSON to Java. Furthermore, the entry functions can be provided with Java objects that get implicitly converted to Spin's intermediary JSON format.

The following provides examples on how camunda Spin can be used in the process engine to work with JSON data. For illustration purposes, let us assume that there exists a String process variable `customer` containing JSON. It has the following contents:

```json
{
  "name" : "jonny",
  "address" : {
    "street" : "12 High Street",
    "post code" : 1234
  }
}
```

### Expression Language Integration

The Spin entry functions can be used wherever the process engine allows expression language. The following BPMN snippet shows a conditional sequence flow expression based on the customer's post code:

```xml
...
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${S(customer).prop("address").prop("post code").numberValue() == 1234}
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
    var address = S(customer).prop("address");
    address.prop("city", "New York");
    execution.setVariable("address", address.toString());
    ]]>
  </script>
</scriptTask>
...
```

### Serializing Process Variables

A Java object can be serialized using Spin's built-in JSON data format. Let us assume that there are two java classes, `com.example.Customer` and `com.example.Address`, with the following structure:

```java
public class Customer {
  protected String name;
  protected Address address;

  /* constructor, getters and setters omitted for brevity */
}

public class Address {
  protected String street;
  protected int postCode;

  /* constructor, getters and setters omitted for brevity */
}
```

The following Java code sets a process variable to a `Customer` object that is serialized using Spin's JSON data format:

```java
Address address = new Address("12 High Street", 1234);
Customer customer = new Customer("jonny", address);

ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("aProcess");

ObjectValue typedCustomerValue =
  Variables.objectValue(customer).serializationDataFormat("application/json").create();

runtimeService.setVariableTyped(processInstance.getId(), "customer", typedCustomerValue);
```

The decisive statement is

```java
ObjectValue typedCustomerValue =
  Variables.objectValue(customer).serializationDataFormat("application/json").create();
```

This creates a variable value from the `customer` object. The invocation `serializationDataFormat("application/json")` tells the process engine in which format the variable should be serialized. This name **must** match the name of a data format known to Spin. For example, `application/json` is the name of the built-in JSON data format.

Once the variable is set, its serialized value can be retrieved using the type variable API. For example:

```java
ObjectValue customer = runtimeService.getVariableTyped(processInstance.getId(), "customer");
String customerJson = customer.getValueSerialized();

/*
customerJson matches:
{
  "name" : "jonny",
  "address" : {
    "street" : "12 High Street",
    "postCode" : 1234
  }
}
*/
```

<div class="alert alert-info">
  <strong>Default Serialization Format:</strong>
  <p>The engine can be configured to persist all objects for which no explicit data format is specified as JSON. The process engine configuration offers a property <code>defaultSerializationFormat</code>. To configure default JSON serialization, set this property to <code>application/json</code>. Now, the invocation <code>runtimeService.setVariable(processInstance.getId(), "customer", new Customer())</code> directly serializes the Customer object as JSON without explicit declaration of the format.</p>
</div>