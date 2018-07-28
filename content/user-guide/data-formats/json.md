---

title: 'JSON'
weight: 40

menu:
  main:
    identifier: "user-guide-spin-json"
    parent: "user-guide-spin"

---

For working with JSON, the Spin functions `org.camunda.spin.Spin.S` and `org.camunda.spin.Spin.JSON` can be used as entry points. The latter offers strongly-typed access to Spin's JSON API and is preferable when writing Java code. In scripting environments, only the `S` function is available. The returned Spin wrapper offers methods for manipulating and writing JSON as well as mapping JSON to Java. Furthermore, the entry functions can be provided with Java objects that get implicitly converted to Spin's intermediary JSON format.

The following provides examples on how Camunda Spin can be used in the process engine to work with JSON data. For illustration purposes, let us assume that a String process variable `customer` containing JSON exists. It has the following content:

```json
{
  "name" : "jonny",
  "address" : {
    "street" : "12 High Street",
    "post code" : 1234
  }
}
```

If you want to learn how to use JSON objects in an embedded form, please take a look at the [Embedded Forms Reference]({{< relref "reference/embedded-forms/json-data.md" >}}).

Further documentation about the usage of Spin can be found in the [Camunda Spin Dataformat Reference]({{< relref "reference/spin/_index.md" >}}).

# Expression Language Integration

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

If your variable is already a [JSON variable value]({{< relref "#native-json-variable-value" >}}), and not a string like in the previous example, you can omit the `S(...)` call and directly access the variable:

```xml
...
<sequenceFlow>
  <conditionExpression xsi:type="tFormalExpression">
    ${customer.jsonPath("$.adress.post code").numberValue() == 1234}
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
    var address = S(customer).prop("address");
    address.prop("city", "New York");
    execution.setVariable("address", address.toString());
    ]]>
  </script>
</scriptTask>
...
```


# Native JSON Variable Value

The native variable value for JSON makes it possible to easily parse a JSON string and wrap it inside an object without the need to have a class representing the JSON. Suppose we want to save the JSON inside a process variable for later use, we could do the following inside a JavaDelegate:

```java
public class MyDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution execution) throws Exception {
    String json = "{\"name\" : \"jonny\","
        + "\"address\" : {"
          + "\"street\" : \"12 High Street\","
          + "\"post code\" : 1234"
          + "}"
        + "}";
    JsonValue jsonValue = SpinValues.jsonValue(json).create();
    execution.setVariable("customerJonny", jsonValue);
  }
}

```

The call to `SpinValues.jsonValue(...).create()` will transform the string into a Jackson object wrapped by Spin.

If we wanted to retrieve the JSON in another JavaDelegate and, e.g., add some more information, we could do this easily:

```java
public class AddDataDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution execution) throws Exception {
    JsonValue customer = execution.getVariableTyped("customerJonny");
    customer.getValue().prop("creditLimit", 1000.00);
    //{"name":"jonny","address":{"street":"12 High Street","post code":1234},"creditLimit":1000.0}
  }
}
```

When retrieving the JSON value via `execution.getVariableTyped()` there are two options: serialized and deserialized.
Retrieving the variable deserialized by calling either `getVariableTyped("name")` or `getVariableTyped("name", true)`, the `JsonValue` contains the wrapped Jackson object to represent the JSON data. Calling `getVariableTyped("name", false)` results in `JsonValue` containing only the raw string, which is advantageous if you only need the string, e.g., to pass it to another API.


# Serializing Process Variables

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

runtimeService.setVariable(processInstance.getId(), "customer", typedCustomerValue);
```

The decisive statement is

```java
ObjectValue typedCustomerValue =
  Variables.objectValue(customer).serializationDataFormat("application/json").create();
```

This creates a variable value from the `Customer` object. The invocation `serializationDataFormat("application/json")` tells the process engine in which format the variable should be serialized. This name **must** match the name of a data format known to Spin. For example, `application/json` is the name of the built-in JSON data format.

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

{{< note title="Default Serialization Format" class="info" >}}
  The engine can be configured to persist all objects for which no explicit data format is specified as JSON. The process engine configuration offers a property `defaultSerializationFormat`. To configure default JSON serialization, set this property to `application/json`. Now, the invocation `runtimeService.setVariable(processInstance.getId(), "customer", new Customer())` directly serializes the customer object as JSON without explicit declaration of the format.
{{< /note >}}
