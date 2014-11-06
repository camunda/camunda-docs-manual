---

title: 'Data Format API'
category: 'Process Data Formats (XML, JSON, Custom)'

---

<!--TODO: add link to spin reference-->
The main entry point to Spin's functionality is the static function `org.camunda.spin.Spin.S` that can be used to process documents or to map java objects to a document format. The returned value of this function is a *Spin wrapper*, which is an intermediary representation of a document and that offers functions for manipulating the underlying document. In addition, the functions `org.camunda.spin.Spin.XML` and `org.camunda.spin.Spin.JSON` can be used that return a strongly-typed Spin wrapper of the provided documents which is useful when writing Java. Refer to the Spin reference documentation on how these methods can be used and what API is offered by the Spin wrappers. 

The following provides examples showing at which points Spin can be used in a BPMN process or CMMN case. For illustration purposes, let us assume that there exists a String process variable `customer` containing JSON. It has the following contents:

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

The Spin engine plugin registers the Spin API entry functions in the context used for expression evaluation. Thus, a conditional sequence flow expression based on the customer's post code could look like this:

```java
${S(customer).prop("address").prop("post code").numberValue() == 1234}
```

### Scripting Integration

Similar to the EL integration, the Spin functions can be accessed from custom scripts in the supported languages Javascript, Groovy, Python and Ruby. See the [scripting section](ref:/guides/user-guide/#process-engine-scripting) on how scripting is configured in general in camunda BPM. The following example is a Javascript script that makes use of the Spin API to extract the address object from the customer, add a city name and set it as a process variable:

```javascript
var address = S(customer).prop("address");
address.prop("city", "New York");
execution.setVariable("address", address.toString());
```

### Serializing Process Variables

Whenever custom Java objects are set as process variables, they have to be persisted into the database. Thus, a Java object instance has to be serialized. The engine's default serialization uses standard Java object serialization which ends up as machine-readable bytes in the database. This approach is limited in that the database values cannot be introspected and that a client reading the object has to possess the respective Java class. To alleviate these issues, by using the Spin engine plugin, variables can be serialized using Spin's data formats. The plugin registers a serializer that looks up all available data formats and offers them for serialization.

Let us assume that there are two java classes, `com.example.Customer` and `com.example.Address`, with the following structure:

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

This creates a variable value from the `customer` object. The invocation `serializationDataFormat("application/json")` tells the process engine in which format the variable should be serialized. To serialize a variable with a Spin data format, the argument (`application/json` in this case) **must** match the name of a data format known to Spin. For example, `application/json` is the name of the built-in JSON data format and `application/xml` is the name of the built-in XML data format. Similarly, this is the way how to serialize process variables using a custom data format.

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
    "post code" : 1234
  }
}
*/
```

<div class="alert alert-info">
  <strong>Default Serialization Format:</strong>
  <p>The engine can be configured to persist all objects for which no explicit data format is specified using Spin. The process engine configuration offers a property <code>defaultSerializationFormat</code>. It can be set to a data format name like <code>application/json</code>. Now, the invocation <code>runtimeService.setVariable(processInstance.getId(), "customer", new Customer())</code> directly serializes the Customer object as JSON without explicit declaration of the format.</p>
</div>