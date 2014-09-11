---

title: 'Process Variables'
category: 'Process Engine'

---

This section describes the concepts of variables in processes. Variables can be used to add data to process runtime states or, more particular, variable scopes. Various API methods that change the state of these entities allow updating of the attached variables. In general, a variable consists of a name and a value. The name is used for identification across process constructs. For example, if one activity sets a variable named *var*, a follow-up activity can access it by using this name. The value of a variable is a Java object. 

## Variable Scopes and Variable Visibility

All entities that can have variables are called *variable scopes*. These are executions (which include process instances) and tasks. As described in the  [Concepts section](ref:#process-engine-process-engine-concepts-executions), the runtime state of a process instance is represented by a tree of executions. Consider the following process model where the red dots mark active tasks:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-3.png" /></center>

The runtime structure of this process is as follows:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-4.png" /></center>

There is a process instance with two child executions, each of which has created a task. All these five entities are variable scopes and the arrows mark a parent-child relationship. A variable that is defined on a parent scope is accessible in every child scope unless a child scope defines a variable of the same name. The other way around, child variables are not accessible from a parent scope. Variables that are directly attached to the scope in question are called *local* variables. Consider the following assignment of variables to scopes:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-5.png" /></center>

In this case, when working on *Task 1* the variables *worker* and *customer* are accessible. Note that due to the structure of scopes, the variable *worker* can be defined twice, so that *Task 1* accesses a different *worker* variable than *Task 2*. However, both share the variable *customer* which means that if that variable is updated by one of the tasks, this change is also visible to the other. 

Both tasks can access two variables each while none of these is a local variable. All  three executions have one local variable each.

Now let's say, we set a local variable *customer* on *Task 1*:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-6.png" /></center>

While two variables named *customer* and *worker* can still be accessed from *Task 1*, the *customer* variable on *Execution 1* is hidden, so the accessible *customer* variable is the local variable of *Task 1*.

## Variable Representations

Internally, the process engine persists variables to the database, which is why there are two types of variable representations:

* The variable value as a Java object
* The serialized variable value

While the Java Object representation is the one that is typically used when implementing process applications, the serialized representation can be useful in environments where the involved Java classes are not available. For example, monitoring applications that access the process engine database are typically unaware of the involved process applications and the classes they provide. As these kind of applications cannot access the Java object representation, they can work with the serialized representation that does not require non-JDK classes.

## Variable Types

When a variable is created, it is assigned a variable type. A variable type has two responsibilities: First, it defines a format and a procedure with which the value is persisted to the database. Second, it defines a procedure with which the value is restored when it is accessed. Depending on the Java type a value is an instance of, it may be persisted by a different variable type. The process engine provides a set of *primitive* and *custom object* variable types that are described in the following image.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-1.png" /></center>

### Primitive Types

Primitive types are variable types that are responsible for storing instances of standard JDK classes. These are the following:

* `boolean`: Stores instances of `java.lang.Boolean`
* `bytes`: Stores instances of `byte[]`
* `short`: Stores instances of `java.lang.Short`
* `integer`: Stores instances of `java.lang.Integer`
* `long`: Stores instances of `java.lang.Long`
* `double`: Stores instances of `java.lang.Double`
* `date`: Stores instances of `java.util.Date`
* `string`: Stores an instance of `java.lang.String`
* `null`: Stores `null` references

### Custom Object Types

Custom object types are capable of persisting variables of non-JDK Java classes that, for example, are provided with the process application. The two types provided by the engine are:

* `serializable`: Stores objects of classes that implement `java.io.Serializable` by applying standard Java object serialization.
* `spin-serialization`: Stores custom objects by serializing them with a data format provided by the [camunda Spin](https://github.com/camunda/camunda-spin) library. A typical application of this variable type is to serialize variables in a Java-independent format, such as JSON or XML. This type requires that camunda Spin is on the process engine's classpath which is the default when you use a pre-built distribution.

<div class="alert alert-info">
  <p><strong>Type Names in Java:</strong></p>
  <p>The interface <code>org.camunda.bpm.engine.delegate.ProcessEngineVariableType</code> provides the names of all the built-in variable types as constants.</p>
</div>

#### Default Variable Types

The set of configured variable types represents which types of objects the process engine is able to store. As the primitive types are non-overlapping, that means every type stores a different kind of object, they are all active by default. Furthermore, they override any custom object type. For example, a variable value of type `java.lang.String` could be handled by the type `string` as well as the type `serializable`. As `string` is the primitive type, it is chosen for persisting the value.

In contrast to the primitive types, the custom object types are overlapping. For example, an instance of a class `com.example.Order` that implements `java.io.Serializable` could be handled by both types, `serializable` and `spin-serialization`. Thus, the process engine has exactly one variable type for custom object serialization that can be configured in the process engine configuration by the property `defaultSerializationFormat`. The possible configuration values are:

* `java serializable`: This format identifies the variable type `serializable`.
* `application/json; implementation=tree`: This format identifies the variable type `spin-serialization` and specifies that process variables should be serialized as JSON.

When the option `defaultSerializationFormat` is omitted, the default serialization is `java serializable`.

### Configuring the `spin-serialization` type

When choosing a serialization option like `application/json; implementation=tree`, the process engine uses the functionality of camunda Spin. However, Spin's default serialization settings may not always be best suited for every use case. For example, serializing and deserializing polymorphic Java types requires the persisted JSON to contain type information. To enable the serialization of type information, Spin can be configured in various ways (see the [Spin documentation](https://github.com/camunda/camunda-spin/blob/master/docs/user-guide/index.md) for more information). When using Spin with the process engine, we recommend implementing a [process engine plugin](ref:#process-engine-process-engine-plugins) to change Spin's default settings. Configuration has to be applied before the process engine is constructed (i.e. in the plugin's `preInit` method).


## Using the Java Object Representation

The most convenient way to interact with process variables from Java is to use their Java object representation. Wherever the process engine offers variable access, process variables can be accessed in this representation given that for custom objects the engine is aware of the involved classes. For example, the following code sets and retrieves a variable for a given process instance:

```java
com.example.Order order = new com.example.Order();
runtimeService.setVariable(execution.getId(), "order", order);

com.example.Order retrievedOrder = (com.example.Order) runtimeService.getVariable(execution.getId(), "order")
```

Note that this code sets a variable at the highest possible point in the hierarchy of variable scopes. This means, if the variable is already present (whether in this execution or any of its parent scopes), it is updated. If the variable is not yet present, it is created in the highest scope, i.e. the process instance. If a variable is supposed to be set exactly on the provided execution, the *local* methods can be used. For example: 

```java
com.example.Order order = new com.example.Order();
runtimeService.setVariableLocal(execution.getId(), "order", order);

com.example.Order retrievedOrder = (com.example.Order) runtimeService.getVariable(execution.getId(), "order")
com.example.Order retrievedOrder = (com.example.Order) runtimeService.getVariableLocal(execution.getId(), "order")
// both methods return the variable
```

Whenever a variable is set in its Java representation, the process engine automatically determines a suitable variable type or raises an exception if no type fits the value.

Variables in their Java object representation are accessible for the following cases:

* Instantiating processes
* Delivering messages
* Task lifecycle transitions, such as completion or resolution
* Setting/getting variables from outside
* Setting/getting variables in a [Delegate](ref:#process-engine-delegation-code)
* Expressions in the process model
* Scripts in the process model
* (Historic) Variable queries

## Using the Serialized Value Representation

Should the classes of custom objects be missing on the classpath of the process engine or application that tries to access them, then using the Java object representation will result in a `ClassNotFoundException` or something similar. To inspect custom object variables in these cases anyway, the serialized representation can be used. This representation is closer to how the variable value is persisted to the database and does not rely on non-JDK classes. 

### Retrieving Serialized Variable Values

A serialized representation is an instance of `org.camunda.bpm.engine.delegate.SerializedVariableValue` and encapsulates the serialized value (use `SerializedVariableValue#getValue()`) as well as additional variable meta-data (use `SerializedVariableValue#getConfig()`).

It can be accessed in the following cases:

* Setting/getting variables in a [Delegate](ref:#process-engine-delegation-code)
* (Historic) Variable queries

The following is an example that gets the serialized value by issuing a variable query:

```java
VariableInstance variableInstance = runtimeService.createVariableInstanceQuery().singleResult();
SerializedValue serializedRepresentation = variableInstance.getSerializedValue();
```

The Java type of the serialized value and its semantics depend on the variable type. All of the primitive variable types, except `date`, return the same value as in the Java object representation because they do not require custom classes anyway. Furthermore, they do not have any meta-data. In the following example, the variable *customer* is of the primitive type *string* and therefore has a serialized value of type *String*:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/variables-2.png" /></center>

It can be accessed in the following way:

```java
VariableInstance variableInstance = runtimeService.createVariableInstanceQuery().variableName("customer").singleResult();
String value = (String) variableInstance.getValue();
String variableType = variableInstance.getTypeName(); // equals "string"

SerializedValue serializedRepresentation = variableInstance.getSerializedValue();
String serializedValue = (String) serializedRepresentation.getValue();  // equals value because the variable has a primitive type
Map<String, Object> configuration = serializedRepresentation.getConfig(); // returns an empty map
```

The serialized representations of the remaining variable types are described in the following sections.

#### Serialized Representation of `date` Variables

The serialized representation of a `date` variable is the date in milliseconds since January 01, 1970, 00:00:00 GMT. Accordingly, the serialized value is a `Long` object. It does not have meta-data.

#### Serialized Representation of `serializable` Variables

Variables of type `serializable` are persisted to the database as byte streams by using standard Java object serialization. That is why their serialized representation is `byte[]`. They do not have additional serialization meta-data. The following code accesses the serialized value of a `serializable` variable:

```java
VariableInstance variableInstance = runtimeService.createVariableInstanceQuery().variableName("order").singleResult();
SerializedValue serializedRepresentation = variableInstance.getSerializedValue();

byte[] serializedValue = (byte[]) serializedRepresentation.getValue();
// the byte array could now be read to deserialize the object if the class is present
```

#### Serialized Representation of `spin-serialization` Variables

Variables of type `spin-serialization` are text-based which is why their serialized representation is `String`. The value format adheres to the Spin data format that is used with the variable. The meta-data for this variable type is the following:

* `dataFormatId`: the name of the Spin data format that can be used to interpret the serialized value. For the built-in JSON format, this is `application/json; implementation=tree`.
* `rootType`: The fully qualified class name that identifies the class of the Java object the serialized value represents. The format of this property depends on the Spin data format of the variable.

The following code accesses the serialized value of a `spin-serialization` variable that was persisted as JSON:

```java
VariableInstance variableInstance = runtimeService.createVariableInstanceQuery().variableName("order").singleResult();
SerializedValue serializedRepresentation = variableInstance.getSerializedValue();

String serializedValue = (String) serializedRepresentation.getValue(); // an escaped JSON String
Map<String, Object> configuration = serializedRepresentation.getConfig();
String dataFormatId = configuration.get("dataFormatId"); // equals "application/json; implementation=tree"
String rootType = configuration.get("rootType"); // equals "com.example.Order"
```

<div class="alert alert-info">
  <p><strong>Configuration Keys in Java:</strong></p>
  <p>The type-specific configuration keys are provided as constants by the interface <code>org.camunda.bpm.engine.delegate.ProcessEngineVariableType</code>.</p>
</div>

### Setting Serialized Variable Values

To set a variable from a serialized value, the `runtimeService` and `taskService` offer the methods `setVariableFromSerialized(..)` and `setVariableLocalFromSerialized(..)`. To set a serialized value, the desired variable type as well as type-dependent meta-data has to be provided. The following code sets a `spin-serialization` variable in JSON format from its serialized value:

```java
String serializedOrder = "{\"value\": 42}";
Map<String, Object> serializationConfig = new HashMap<String, Object>();
serializationConfig.put("dataFormatId", "application/json; implementation=tree");
serializationConfig.put("rootType", "com.example.Order");

runtimeService.setVariableFromSerialized(execution.getId(), "order", serializedOrder, "spin-serialization", serializationConfig);
```

<div class="alert alert-warning">
  <p><strong>Be Aware of Inconsistent Variable State:</strong></p>
  <p>When setting a serialized variable value, no checking is done whether the structure of the serialized value is compatible with the class the variable value is supposed to be an instance of. For example, when setting a <code>spin-serialization</code> variable of a class <code>com.example.Order</code> from JSON, the supplied JSON is not validated against the structure of <code>Order</code>. Thus, an invalid variable value can only be detected when it is requested in its Java object representation the next time.</p>
</div>

## Input/Output Variable Mapping

To improve the reusability of source code and business logic, camunda BPM offers input/output
mapping of process variables. This can be used for tasks, events and subprocesses.

In order to use the variable mapping, the camunda extension element [inputOutput][] has to be added
to the element. It can contain multiple [inputParameter][] and [outputParameter][] elements that
specify which variables should be mapped. The `name` attribute of an [inputParameter][] denotes
the variable name inside the activity (a local variable to be created), whereas the `name` attribute of an [outputParameter][]
denotes the variable name outside of the activity.

The content of an input/outputParameter specifies the value that is mapped to the corresponding
variable. It can be a simple constant string or an expression. An empty body sets the variable
to the value `null`.

```xml
<camunda:inputOutput>
  <camunda:inputParameter name="x">foo</camunda:inputParameter>
  <camunda:inputParameter name="willBeNull"/>
  <camunda:outputParameter name="y">${x}</camunda:outputParameter>
  <camunda:outputParameter name="z">${willBeNull == null}</camunda:outputParameter>
</camunda:inputOutput>
```

Even complex structures like [lists][list] and [maps][map] can be used. Both can also
be nested.

```xml
<camunda:inputOutput>
  <camunda:inputParameter name="x">
    <camunda:list>
      <camunda:value>a</camunda:value>
      <camunda:value>${1 + 1}</camunda:value>
      <camunda:list>
        <camunda:value>1</camunda:value>
        <camunda:value>2</camunda:value>
        <camunda:value>3</camunda:value>
      </camunda:list>
    </camunda:list>
  </camunda:inputParameter>
  <camunda:outputParameter name="y">
    <camunda:map>
      <camunda:entry key="foo">bar</camunda:entry>
      <camunda:entry key="map">
        <camunda:map>
          <camunda:entry key="hello">world</camunda:entry>
          <camunda:entry key="camunda">bpm</camunda:entry>
        </camunda:map>
      </camunda:entry>
    </camunda:map>
  </camunda:outputParameter>
</camunda:inputOutput>
```

A script can also be used to provide the variable value. Please see the corresponding
[section][script-io] in the scripting chapter for how to specify a script.

A simple example of the benefit of input/output mapping is a complex calculation which
should be part of multiple processes definitions. This calculation can be developed as isolated
delegation code or a script and be reused in every process, even though the processes use a different variable set. 
An input mapping is used to map the different process variables to
the required input parameters of the complex calculation activity. Accordingly, an output mapping allows to utilize the
calculation result in the further process execution.

In more detail, let us assume such a calculation is implemented by a Java Delegate class `org.camunda.bpm.example.ComplexCalculation`.
This delegate requires a `userId` and a `costSum` variable as input
parameters. It then calculates three values, `pessimisticForecast`, `realisticForecast` and `optimisticForecast`, 
which are different forecasts of the future costs a customer faces. In a first process, both input variables are available as process variables but with different names (`id`, `sum`). From the three results, the process only uses `realisticForecast` which it depends on by the name `forecast` in follow-up activities. A corresponding input/output mapping looks as follows:

```xml
<serviceTask camunda:class="org.camunda.bpm.example.ComplexCalculation">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="userId">${id}</camunda:inputParameter>
      <camunda:inputParameter name="costSum">${sum}</camunda:inputParameter>
      <camunda:outputParameter name="forecast">${realisticForecast}</camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</serviceTask>
```

In a second process, let us assume the `costSum` variable has to be calculated from properties of three different maps. Also, the process
depends on a variable `avgForecast` as the average value of the three forecasts. In this case, the mapping looks as follows:

```xml
<serviceTask camunda:class="org.camunda.bpm.example.ComplexCalculation">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="userId">${id}</camunda:inputParameter>
      <camunda:inputParameter name="costSum">
        ${mapA[costs] + mapB[costs] + mapC[costs]}
      </camunda:inputParameter>
      <camunda:outputParameter name="avgForecast">
        ${(pessimisticForecast + realisticForecast + optimisticForecast) / 3}
      </camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</serviceTask>
```


[inputOutput]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundainputoutput
[inputParameter]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundainputparameter
[outputParameter]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundaoutputparameter
[list]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundalist
[map]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundamap
[script-io]: ref:#process-engine-scripting-use-scripts-as-inputoutput-parameters