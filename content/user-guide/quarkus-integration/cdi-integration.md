---

title: "Engine CDI Integration"
weight: 20

menu:
  main:
    name: "Engine CDI Integration"
    identifier: "user-guide-quarkus-engine-cdi"
    parent: "user-guide-quarkus-integration"

---

Quarkus comes with a built-in solution for CDI (short for "Context and Dependency Injection") called ArC, 
which is based on the [Java CDI 2.0 standard][java-cdi-20-standard]. Quarkus ArC does not entirely cover 
the CDI 2.0 standard but only implements a subset of it.

The Camunda Engine offers CDI integration with the `camunda-engine-cdi` module. This module is integrated 
directly into the Quarkus Extension. You can learn more about the features and the programming model 
at [CDI and Java EE Integration][cdi-and-java-ee-integration].

## Limitations

Since Quarkus ArC does not aim to implement CDI 2.0 fully, you cannot use the full range of features 
the `camunda-engine-cdi` module provides. Some features documented under 
[CDI and Java EE Integration][cdi-and-java-ee-integration] are unsupported or only work with restrictions. 
The limitations and differences are explained in more detail below.

{{< note title="Heads-up!" class="info" >}}
Quarkus ArC has more limitations not described in this section, as only those restrictions are highlighted 
that affect the functionality of the `camunda-engine-cdi` module. For your individual application development, 
we highly recommend you consider the <a href="https://quarkus.io/guides/cdi-reference#limitations">limitations</a> and 
<a href="https://quarkus.io/guides/cdi-reference#supported_features">supported features</a> of the Quarkus version you are using.
{{< /note >}}

### Limited support of JUEL Expression Resolution

The `camunda-engine-cdi` module allows referencing CDI beans and calling methods on CDI beans in 
model expression properties (e.g., `camunda:expression`, `camunda:delegateExpression`, etc.). 
Quarkus ArC currently doesn't support the CDI API method `javax.enterprise.inject.spi.BeanManager#getELResolver`, 
which the engine uses to resolve method calls on CDI beans. This is why currently, only referencing 
CDI beans is supported.

Examples:

* Supported Expression: `${myService}`
* Unsupported Expression: `${myService.checkCondition('foo')}`

### Limited support of scopes in the Contextual Programming Model

While the `camunda-engine-cdi` module supports associating a process instance with 
[Conversational Scope][cdi-conversational-scope] or [Request Scope][cdi-request-scope], Quarkus ArC 
only supports the **Request Scope**.

### Configure Quarkus to allow setting variables when a `@StartProcess` annotated method is called

The `camunda-engine-cdi` module allows setting variables when assigning a value to a class field
annotated with `@ProcessVariableTyped` or `@ProcessVariable` inside a method annotated 
with `@StartProcess`, as shown in the following example:

```java
@Dependent
public class ProcessController {

  @ProcessVariable
  String myProcessVariable;

  @StartProcess("keyOfTheProcess")
  public void startProcessByKey() {
    myProcessVariable = "my-value";
  }

}
```

Since Quarkus tries to auto-inject beans into class fields annotated with `@Qualifier` annotations, 
the behavior, as shown above, doesn't work out of the box. Instead, an exception is thrown.

However, if you know what you do and can spare the auto-inject behavior, it is possible to disable it.
Read more about it in the [ArC Configuration Reference][arc-config-reference].

Alternatively, you can set variables within a `@StartProcess` annotated method programmatically:

```java
@Dependent
public class ProcessController {
  
  String myProcessVariable;

  @StartProcess("keyOfTheProcess")
  public void startProcessByKey() {
    myProcessVariable = "my-value";
    process.setVariable("myProcessVariable", myProcessVariable);
  }

}
```

### `@BusinessProcessScoped` Beans

The `camunda-engine-cdi` module stores [`@BusinessProcessScoped`][business-process-scoped] beans as 
process variables in the context of the current process instance.

#### Passivation is unsupported

Quarkus does not support [Passivation and passivating scopes][cdi-passivation].
When using `@BusinessProcessScoped` beans, no validation of being serializable and therefore 
"Passivation Capable" is performed during the startup of the Quarkus application. 

If your `@BusinessProcessScoped` beans and their references 
don't implement the `java.io.Serializable` interface, the engine throws an exception during execution 
when trying to persist the beans as process variables.

#### Destroying Bean Instances is unsupported

Programmatically destroying a `@BusinessProcessScoped` bean instance is 
[currently unsupported][destroy-jira-issue].

The following API methods will throw an `UnsupportedOperationException`:

* `javax.enterprise.inject.Instance#destroy`
* `io.quarkus.arc.InjectableContext#getState`
* `io.quarkus.arc.InjectableContext#destroy`
* `io.quarkus.arc.InjectableContext#destroy(Contextual<?> contextual)`

[java-cdi-20-standard]: http://docs.jboss.org/cdi/spec/2.0/cdi-spec.html
[cdi-and-java-ee-integration]: {{< ref "/user-guide/cdi-java-ee-integration/_index.md">}}
[cdi-conversational-scope]: https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#conversation_context_ee
[cdi-request-scope]: https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#request_context_ee
[arc-config-reference]: https://quarkus.io/guides/cdi-reference#quarkus-arc_quarkus.arc.auto-inject-fields
[business-process-scoped]: {{< ref "/user-guide/cdi-java-ee-integration/contextual-programming-model.md#work-with-businessprocessscoped-beans">}}
[cdi-passivation]: https://docs.jboss.org/cdi/spec/2.0/cdi-spec.html#passivating_scope
[destroy-jira-issue]: https://jira.camunda.com/browse/CAM-13755
