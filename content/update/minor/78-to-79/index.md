---

title: "Update from 7.8 to 7.9"
weight: 50
menu:
  main:
    name: "7.8 to 7.9"
    identifier: "migration-guide-78"
    parent: "migration-guide-minor"
    pre: "Update from `7.8.x` to `7.9.0`."

---

<!-- TODO :  -->

# Base Delegate Execution

This section concerns the Java API and the interface `org.camunda.bpm.engine.delegate.BaseDelegateExecution`.

The behaviour of `BaseDelegateExecution#getBusinessKey` has been changed. It now returns a business key of the root execution, e.g. process instance and is equvalent to `DelegateExecution#getProcessBusinessKey`. 

Please note this change can influence your custom implementations of `Execution Listener`.

# Java serialized objects

Starting from version 7.9 setting object variables, serialized with Java serialization, is forbidden by default. You can be affected by this change, if you are using such kind of REST requests:

```json
PUT /process-instance/{id}/variables/{varName}

{
  "value" : "ab",
  "type" : "Object",
  "valueInfo" : {
    "objectTypeName": "com.example.MyObject",
    "serializationDataFormat": "application/x-java-serialized-object"
  }
}
``` 

or via Java:

```java
runtimeService.setVariable(processInstanceId, "varName",
        Variables
          .serializedObjectValue("ab")
          .serializationDataFormat("application/x-java-serialized-object")
          .objectTypeName("com.example.MyObject")
          .create());
```
In this case you will need to use another serialization format (JSON or XML) or to explicitly enable Java serialization with the help of [this configuration parameter]({{< relref "reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}):

```xml
<property name="javaSerializationFormatEnabled">true</property>
```