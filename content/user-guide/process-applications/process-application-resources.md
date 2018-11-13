---

title: 'Process Application Resource Access'
weight: 31

menu:
  main:
    identifier: "user-guide-process-application-resource-access"
    parent: "user-guide-process-applications"

---

Process applications provide and logically group resources specific to the processes they contain. There are resources that are part of the application itself, like a classloader and its classes and resources, as well as resources managed by the process engine at runtime, like a set of [scripting engines]({{< ref "/user-guide/process-engine/scripting.md" >}}) or [Spin data format]({{< ref "/user-guide/data-formats/_index.md" >}}). This section describes under which conditions the process engine looks up resources on process-application level and how that lookup can be enforced.

{{< img src="../img/process-application-context.png" title="Process Application Context" >}}


# Context Switch

When executing a process instance, the process engine has to know which process application provides the corresponding resources. It then internally performs a *context switch*. This has the following effects:

* The thread context class loader is set to the process application classloader. This enables loading classes from the process application, e.g. a Java delegate implementation.
* The process engine can access the resources it manages for that particular process application. This enables invoking scripting engines or Spin data formats specific to the process application.

For example, before invoking a Java delegate, the process engine performs a context switch into the respective process application. It is therefore able to set the thread context classloader to the process application classloader. If no context switch is performed, only those resources are available that accessible on the process engine level. This is typically a different classloader and a different set of managed resources.

A context switch is guaranteed in the following cases:

* **Delegation Code Invocation**: Whenever delegation code like Java delegates, execution/task listeners (Java codes or scripts), etc. is called by the process engine
* **Explicit Process Application Context Declaration**: For every engine API invocation, when a process application was declared using the utility class `org.camunda.bpm.application.ProcessApplicationContext`

# Declare Process Application Context

Process application context must be declared whenevever custom code uses the engine API that is not part of delegation code and when a context switch is needed for proper function.

## Example

To clarify the use case, we assume that a process application employs the [feature to serialize object-type variables in the JSON format]({{< ref "/user-guide/data-formats/json.md#serializing-process-variables" >}}). However, for that application JSON serialization shall be customized (think about the numerous ways to serialize a date as a JSON string). The process application therefore contains a Camunda Spin data format configurator implementation that configures the Spin JSON data format in the desired way. In turn, the process engine manages a Spin data format for that specific process application to serialize object values with. Now, we assume that a Java servlet calls the process engine API to submit a Java object and serialize it with the JSON format. The code might look as follows:

```java
public class ObjectValueServlet extends HttpServlet {

  protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    JsonSerializable object = ...; // a custom Java object
    ObjectValue jsonValue = Variables
      .objectValue(jsonSerializable)
      .serializationDataFormat("application/json")
      .create();

    RuntimeService runtimeService = ...; // obtain runtime service
    runtimeService.setVariable("processInstanceId", "variableName", jsonValue);
  }
}
```

Note that the engine API is not called from within delegation code but a from servlet instead. The process engine is therefore not aware of process application context and cannot perform a context switch to use the correct JSON data format for variable serialization. In consequence, the process-application-specific JSON configuration does not apply.

In such a case, process application context can be declared by using the static methods the class `org.camunda.bpm.application.ProcessApplicationContext` provides. In particular, the method  `#setCurrentProcessApplication` declares the process application to switch into for following engine API invocations. The method `#clear` resets this declaration. In the example, we wrap the `#setVariable` invocation accordingly:

```java
try {
  ProcessApplicationContext.setCurrentProcessApplication("nameOfTheProcessApplication");
  runtimeService.setVariable("processInstanceId", "variableName", jsonValue);
} finally {
  ProcessApplicationContext.clear();
}
```

Now, the process engine knows in which context to execute the `#setVariable` call in. It therefore can access the correct JSON data format and serializes the variable correctly.

## Java API

The methods `ProcessApplicationContext#setCurrentProcessApplication` declare process application context for all following API invocations until `ProcessApplicationContext#clear` is called. It is therefore advised to use a try-finally block to ensure clearance even when exceptions are raised. In addition, the methods `ProcessApplicationContext#withProcessApplicationContext` execute a Callable and declare the context during the Callable's execution.

## Programming Model Integration

Declaring process application context whenever engine API is invoked can result in highly repetitive code. Depending on your programming model, you may consider declaring the context in a place that applies to all the desired business logic in a cross-cutting manner. For example, in CDI it is possible to define method invocation interceptors that trigger based on the presence of annotations. Such an interceptor can identify the process application based on the annotation and declare the context transparently.
