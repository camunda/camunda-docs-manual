---

title: "Embedding the DMN Engine"
weight: 10

menu:
  main:
    name: "Embed"
    identifier: "user-guide-dmn-engine-embedding"
    parent: "user-guide-dmn-engine"
    pre: "Use the DMN Engine as a Library in an Application"

---

The Camunda DMN engine can be used as a library in a custom application. To achieve this,
add the `camunda-engine-dmn` artifact to the classpath of the application and then
configure and build a decision engine instance. This section provides the
required maven coordinates to add the DMN engine as a dependency to your
project. It then shows how to configure and build a new DMN engine instance.

# Maven Coordinates

The Camunda DMN engine is released to Maven Central.

Start by importing the [`camunda-engine-dmn` BOM](/get-started/apache-maven/#camunda-dmn-engine-bom)
to ensure correct dependency management.

Next, include the [`camunda-engine-dmn`](/get-started/apache-maven/#camunda-dmn)
artifact in the `dependencies` section.

# Building a DMN Engine

To build a new DMN engine, create a DMN engine configuration.
Configure it as needed and than build a new DMN engine from it.

```java
// create default DMN engine configuration
DmnEngineConfiguration configuration = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// configure as needed
// ...

// build a new DMN engine
DmnEngine dmnEngine = configuration.buildEngine();
```

# Configuration of the DMN Engine

## Decision Table Evaluation Listeners

The DMN engine configuration allows you add a custom decision table {{< javadocref
page="?org/camunda/bpm/dmn/engine/delegate/DmnDecisionTableEvaluationListener.html"
text="evaluation listener" >}}. A decision table evaluation listener is
notified after a decision table was evaluated. It receives an evaluation event
which contains the result of the evaluation. You can decide if the
listener should be notified before or after the default listeners.

```java
// create default DMN engine configuration
DmnEngineConfiguration configuration = DmnEngineConfiguration
    .createDefaultDmnEngineConfiguration();

// instantiate the listener
DmnDecisionTableEvaluationListener myListener = ...;

// notify before default listeners
configuration.getCustomPreDecisionTableEvaluationListeners()
  .add(myListener);

// notify after default listeners
configuration.getCustomPostDecisionTableEvaluationListeners()
  .add(myListener);
```

A specialized evaluation listener is the {{< javadocref
page="?org/camunda/bpm/dmn/engine/spi/DmnEngineMetricCollector.html"
text="metric collector" >}}, which records the number of executed decision
elements. This metric can be used to monitor the workload of a decision engine.

```java
// create default DMN engine configuration
DmnEngineConfiguration configuration = DmnEngineConfiguration
    .createDefaultDmnEngineConfiguration();

// create your metric collector
DmnEngineMetricCollector metricCollector = ...;

// set the metric collector
configuration.setEngineMetricCollector(metricCollector);
```
## Decision Evaluation Listeners

The DMN engine configuration allows you add a custom {{< javadocref
page="?org/camunda/bpm/dmn/engine/delegate/DmnDecisionEvaluationListener.html"
text="decision evaluation listener" >}}. A decision evaluation listener is
notified after a decision with all the required decisions were evaluated. It receives an evaluation event
which contains the result of the evaluation. You can decide if the
listener should be notified before or after the default listeners.

```java
// create default DMN engine configuration
DmnEngineConfiguration configuration = DmnEngineConfiguration
    .createDefaultDmnEngineConfiguration();

// instantiate the listener
DmnDecisionEvaluationListener myListener = ...;

// notify before default listeners
configuration.getCustomPreDecisionEvaluationListeners()
  .add(myListener);

// notify after default listeners
configuration.getCustomPostDecisionEvaluationListeners()
  .add(myListener);
```

# Customizing and Extending the DMN Engine

{{< note title="Use of Internal API" class="warning" >}}

Please be aware that these APIs are **not** part of the [public API]({{< relref
"introduction/public-api.md" >}}) and may change in later releases.

{{< /note >}}

The {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html"
text="default DMN engine configuration" >}} has further customization and
extension points.

## Customize DMN Transformation

It is possible to customize the transformation of DMN by providing a {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnTransformer.html"
text="DMN transformer" >}} or configuring the {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/transform/DefaultDmnTransformer.html"
text="default one" >}}.

### Register DMN Transform Listeners

The simplest customization is to provide a {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnTransformListener.html"
text="transform listener" >}}. The Listener is notified after a DMN element is
transformed. The listener can modify the transformed object.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// instantiate transform listener
DmnTransformListener myTransformListener = ... ;

// add the transform listener
configuration.getTransformer()
  .getTransformListeners()
  .add(myTransformListener);
```

### Register DMN Element Transform Handler

While the transform listener allows modifying of the transformed objects, it does not support instantiating custom subclasses.
This can be achieved using a custom {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnElementTransformHandler.html"
text="transform handler" >}}.

A transform handler is registered for a given [DMN model API] type like a `DecisionTable`.

First, implement a transform handler which can transform a {{<
javadocref page="?org/camunda/bpm/model/dmn/instance/DecisionTable.html"
text="decision table" >}}.

```java
public  class MyDecisionTableHandler extends DmnElementTransformHandler<DecisionTable, MyDecisionTableImpl> {

  public MyDecisionTableImpl handleElement(DmnElementTransformContext context, DecisionTable element) {
    // implement
  }
}
```

Then, register an instance of the handler in the default DMN transformer element handler registry.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// add the handler
configuration.getTransformer()
  .getElementTransformHandlerRegistry()
  .addHandler(DecisionTable.class, new MyDecisionTableHandler());
```

### Register DMN Data Type Transformers

The DMN engine supports a set of built-in [data types]. It is possible to override existing types with new types.

Assume you want to support a local date format type.
To achieve this, override the existing date transformer by implementing a custom transformer:

```java
public class GermanDateDataTypeTransformer extends DateDataTypeTransformer {

  protected SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

  protected Date transformString(String value) {
    try {
      return format.parse(value);
    }
    catch (ParseException e) {
      throw new IllegalArgumentException(e);
    }
  }
}
```

Then, register an instance of the handler in the default DMN transformer element handler registry:

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// add the data type transformer,
// overriding the existing type "date":
configuration
  .getTransformer()
  .getDataTypeTransformerRegistry()
  .addTransformer("date", new GermanDateDataTypeTransformer());
```
It is also possible to add a new data type by implementing a new transformer and registering it for a non-existing type name:

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// add the data type transformer for custom type "currency"
configuration
  .getTransformer()
  .getDataTypeTransformerRegistry()
  .addTransformer("currency", new currencyTypeTransformer());
```

### Register Hit Policy Handlers

The DMN engine supports a subset of the DMN 1.1 [hit policies]. It is possible to implement new hit policies or
override an existing hit policy implementation.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// get the DmnHitPolicyHandlerRegistry
DmnHitPolicyHandlerRegistry hitPolicyHandlerRegistry = configuration
  .getTransformer()
  .getHitPolicyHandlerRegistry();

// register handler you own priority hit policy handler
hitPolicyHandlerRegistry
  .addHandler(HitPolicy.PRIORITY, null, new MyPriorityHitPolicyHandler());
```

## Change default expression languages

A [DMN decision table] has multiple expressions which are evaluated when the table is executed.
The default expression language for every expression type can be configured.
The following expression types exist:

- *Input Expression*: Used to specify the input of a column in a decision
  table. The default language for input expressions in the DMN engine is
  `JUEL`.
- *Input Entry*: Used to specify the condition of a rule in a decision
  table. The default language for input entries in the DMN engine is
  `FEEL`.
- *Output Entry*: Used to specify the output of a rule in a decision
  table. The default language for output entries in the DMN engine is
  `JUEL`.
  
The default expression language of a [DMN decision literal expression] can also be configured, the default in the DMN engine is `JUEL`.

Read more about the default expressions in the corresponding [section][expressions].

It is possible to change the default expression language on the DMN engine configuration:

```java
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

configuration
  .setDefaultInputExpressionExpressionLanguage("javascript");
```

Please note that the chosen language must be available in the classpath. By
default `JUEL` and `FEEL` are available. The default `FEEL` implementation
is only supported for input entries.

If the JDK includes a javascript
implementation like Rhino or `javascript` is available as well.

It is also possible to use other script languages like `groovy`, `python` or `ruby`.
Just make sure that the corresponding libraries are available on the classpath at runtime.

## Customize Expression and Script Resolving

The default DMN engine resolves the supported expression and script languages
using different providers.

To evaluate `JUEL` expressions, the DMN engine uses the {{< javadocref page="?org/camunda/bpm/dmn/engine/impl/spi/el/ElProvider.html" text="ElProvider" >}} configured in the
DMN engine configuration. To use another implementation of the Unified Expression Language, replace this implementation.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// set a custom el provider
configuration.setElProvider(new MyElProvider());
```

To configure the `FEEL` engine used you can provide a custom {{< javadocref page="?org/camunda/bpm/dmn/feel/impl/FeelEngineFactory.html" text="FeelEngineFactory" >}}.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// set a custom feel engine factory
configuration.setFeelEngineFactory(new MyFeelEngineFactory());
```

Script languages are resolved by the {{< javadocref page="?org/camunda/bpm/dmn/engine/impl/spi/el/DmnScriptEngineResolver.html" text="DmnScriptEngineResolver" >}}. To customize the script engine resolving, provide an own implementation.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// set custom script engine resolver
configuration.setScriptEngineResolver(new MyScriptEngineResolver());
```

# Logging

The DMN engine uses [SLF4J] as logging API. The `camunda-dmn-engine` artifact
does not have a dependency to any of the existing [SLF4J] backends. This means that
you can choose which backend you want to use. One example would be [LOGBack], or
if you want to use Java util logging, you could use the `slf4j-jdk14` artifact.
For more information on how to configure and use SLF4J, please refer to the
[user manual].


[evaluation listener]: {{< javadocref page="?org/camunda/bpm/dmn/engine/delegate/DmnDecisionTableEvaluationListener.html" text="DmnDecisionTableEvaluationListener Interface" >}}
[DMN model API]: https://github.com/camunda/camunda-dmn-model
[data types]: {{< relref "user-guide/dmn-engine/data-types.md" >}}
[hit policies]: {{< relref "reference/dmn11/decision-table/hit-policy.md" >}}
[SLF4J]: http://www.slf4j.org/
[LOGBack]: http://logback.qos.ch/
[user manual]: http://www.slf4j.org/manual.html
[DMN decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[DMN decision literal expression]: {{< relref "reference/dmn11/decision-literal-expression/index.md" >}}
[expressions]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md" >}}
