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

The Camunda DMN engine can be used as a library in your own application. In
order to achieve this, you have to include the `camunda-engine-dmn` artifact,
configure and build a decision engine instance. This section provides the
required maven coordinates to add the DMN engine as a dependency to your
project. It then shows how to configure and build a new DMN engine instance.

# Maven Coordinates

The Camunda DMN engine is released to Maven Central and provides a BOM which we
recommend to import.

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.camunda.bpm.dmn</groupId>
      <artifactId>camunda-engine-dmn-bom</artifactId>
      <version>7.4.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

After that you have to include the `camunda-engine-dmn` artifact in your
`dependencies` section. Alternative you can skip the BOM import and specify
the version of the `camunda-engine-dmn` artifact.

```xml
<dependencies>
  <dependency>
    <groupId>org.camunda.bpm.dmn</groupId>
    <artifactId>camunda-engine-dmn</artifactId>
  </dependency>
</dependencies>
```

# Building a DMN Engine

To build a new DMN engine you have to create a DMN engine configuration.
Configure it if needed and than build a new DMN engine from it.

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

The DMN engine configuration allows you add own decision table {{< javadocref
page="?org/camunda/bpm/dmn/engine/delegate/DmnDecisionTableEvaluationListener.html"
text="evaluation listener" >}}. A decision table evaluation listener is
notified after a decision table was evaluated. It receives a evaluation event
which contains the result of the evaluation. You can decided whether your
listener should be notified before or after the default listeners.

```java
// create default DMN engine configuration
DmnEngineConfiguration configuration = DmnEngineConfiguration
    .createDefaultDmnEngineConfiguration();

// create your listener
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
text="metric collector" >}} which records the number of executed decision
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

# Customizing and Extending the DMN Engine

The {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html"
text="default DMN engine configuration" >}} has further customization and
extension points. Please be aware that these APIs are **not** part of the
[public API] and may change in later releases.


## Customize DMN Transformation

You can customize the transformation of DMN by providing an own {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnTransformer.html"
text="DMN transformer" >}} or configure the {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/transform/DefaultDmnTransformer.html"
text="default one" >}}.

### Register DMN Transform Listeners

The simplest customization is to provide a {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnTransformListener.html"
text="transform listener" >}} which will be notified after a DMN element was
transformed. You can then modify the transformed object.

```java
// with a default dmn engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// and your own transfrom listner
DmnTransformListener myTransformListener = ... ;

// you can add it to the transformer
configuration.getTransformer()
  .getTransformListeners()
  .add(myTransformListener);
```

### Register DMN Element Transform Handler
If you want that the transformation creates objects from your own classes you
can register new {{< javadocref
page="?org/camunda/bpm/dmn/engine/impl/spi/transform/DmnElementTransformHandler.html"
text="transform handlers" >}}. These are registered for elements of the [DMN
model API].

For example if you want that the transformer omits an extended decision table
object you can register your own handler in the registry.

First you have to implement a transform handler which can transform a {{<
javadocref page="?org/camunda/bpm/model/dmn/instance/DecisionTable.html"
text="decision table" >}}.

```java
public  class MyDecisionTableHandler extends DmnElementTransformHandler<DecisionTable, MyDecisionTableImpl> {

  public MyDecisionTableImpl handleElement(DmnElementTransformContext context, DecisionTable element) {
    // implement
  }
}
```

Then you can register an instance of your handler in the default DMN transformer
element handler registry.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can add your own element handler
configuration.getTransformer()
  .getElementTransformHandlerRegistry()
  .addHandler(DecisionTable.class, new MyDecisionTableHandler());
```

### Register DMN Data Type Transformers

The DMN engine supports some build-in [data types]. You can either override
an existing one or add own types.

For example if you want to support a local date format you can
override the existing date transformer by implementing an own transformer:

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

Then you can register an instance of your handler in the default DMN transformer
element handler registry.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can add your own data type transformer
configuration
  .getTransformer()
  .getDataTypeTransformerRegistry()
  .addTransformer("date", new GermanDateDataTypeTransformer());
```

You can also add own data types by implementing corresponding transformers:


```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can add your own custom data type transformer
configuration
  .getTransformer()
  .getDataTypeTransformerRegistry()
  .addTransformer("custom", new CustomDataTypeTransformer());
```

### Register Hit Policy Handlers

The DMN engine supports a subset of the DMN 1.1 [hit policies]. You
can either extend this support or replace existing hit policy handlers.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can get the default hit policy regsitry
DmnHitPolicyHandlerRegistry hitPolicyHandlerRegistry = configuration
  .getTransformer()
  .getHitPolicyHandlerRegistry();

// add you own priority hit policy handler
hitPolicyHandlerRegistry
  .addHandler(HitPolicy.PRIORITY, null, new MyPriorityHitPolicyHandler());

// override the existing collect sum hit policy handler
hitPolicyHandlerRegistry
  .addHandler(HitPolicy.COLLECT, BuiltinAggregator.SUM, new MyCollectSumHitPolicyHandler());
```

## Change default expression languages

A [DMN decision table] consists of multiple expressions which will be evaluated
by the DMN engine. The default expression language for every expression type
can be configured. The following expression types exist:

- *Input Expression*: Use to specify the input of a column in a decision
  table. The default language for input expressions in the DMN engine is
  `JUEL`.
- *Input Entry*: Use to specify the condition of a rule in a decision
  table. The default language for input entries in the DMN engine is
  `FEEL`.
- *Output Entry*: Use to specify the output of a rule in a decision
  table. The default language for output entries in the DMN engine is
  `JUEL`.

You can read more about the default expressions in the corresponding
[section][expressions].

To can change the default expression language on the default DMN engine
configuration:

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can set the defaul input expression language
configuration
  .setDefaultInputExpressionExpressionLanguage("javascript");
```

Please note that the chosen language must be available in the classpath. Per
default `JUEL` and `FEEL` are available. But the default `FEEL` implementation
is only supported for input entries. If your JDK includes a javascript
implementation like Rhino or Nashhorn also `javascript` should be available.

If you want to other script languages like `groovy`, `python` or `ruby` please
make sure that the corresponding library dependencies are added to your project.

## Customize Expression and Script Resolving

The default DMN engine resolves the supported expression and script languages
using different providers.

To evaluate `JUEL` expressions the DMN engine uses the {{< javadocref page="?org/camunda/bpm/dmn/engine/impl/spi/el/ElProvider.html" text="ElProvider" >}} configured on the
DMN engine configuration. If you want to use another implementation of the
Unified Expression Language you can replace this implementation.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can use another EL provider
configuration.setElProvider(new MyElProvider());
```

To configure the `FEEL` engine used you can provide an own {{< javadocref page="?org/camunda/bpm/dmn/feel/impl/FeelEngineFactory.html" text="FeelEngineFactory" >}}.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can use another FEEL engine factory
configuration.setFeelEngineFactory(new MyFeelEngineFactory());
```

Script languages will be resolved by the {{< javadocref page="?org/camunda/bpm/dmn/engine/impl/spi/el/DmnScriptEngineResolver.html" text="DmnScriptEngineResolver" >}}. If you want
to customize the script engine resolving you can provide an own implementation.

```java
// with a default DMN engine configuration
DefaultDmnEngineConfiguration configuration = (DefaultDmnEngineConfiguration) DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration();

// you can use another script engine resolver
configuration.setScriptEngineResolver(new MyScriptEngineResolver());
```

# Logging

The DMN engine uses [SLF4J] as logging API. The `camunda-dmn-engine` artifact
does not have a dependency to any of the existing [SLF4J] backends. This means
you can choose which backend you want to use. One example would be [LOGBack], or
if you want to use Java util logging you could use the `slf4j-jdk14` artifact.
For more information on how to configure and use SLF4J please referee to the
[user manual].


[evaluation listener]: {{< javadocref page="?org/camunda/bpm/dmn/engine/delegate/DmnDecisionTableEvaluationListener.html" text="DmnDecisionTableEvaluationListener Interface" >}}
[public API]: {{< relref "introduction/public-api.md" >}}
[DMN model API]: https://github.com/camunda/camunda-dmn-model
[data types]: {{< relref "user-guide/dmn-engine/data-types.md" >}}
[hit policies]: {{< relref "reference/dmn11/decision-table/hit-policy.md" >}}
[SLF4J]: http://www.slf4j.org/
[LOGBack]: http://logback.qos.ch/
[user manual]: http://www.slf4j.org/manual.html
[DMN decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[expressions]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md" >}}
