---

title: 'Configuring Spin Integration'
weight: 10

menu:
  main:
    identifier: "user-guide-spin-config"
    parent: "user-guide-spin"

---

To use Spin with the process engine, the following is required:

1. The Spin libraries must be on the engine's classpath
1. The Spin process engine plugin must be registered with the process engine

The following sections go into the details of integrating Spin with the process engine. Note that when you use a pre-built Camunda distribution, Spin is already integrated.

# Artifacts

There are three types of Spin artifacts as follows.

## camunda-spin-core

`camunda-spin-core` is a jar that contains only the core Spin classes. It can be combined with single data format artifacts. Camunda provides the artifacts `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom` that implement JSON and XML processing. These artifacts transitively pull in libraries they need. For example, `camunda-spin-dataformat-json-jackson` has a dependency to `jackson-databind`.

## camunda-spin-dataformat-all

`camunda-spin-dataformat-all` is a fat jar that contains `camunda-spin-core`, `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom` as well as all their dependencies. The dependencies are shaded into the `spinjar` package namespace.

Note that the package relocation means that you cannot develop against the original namespaces. Example: `camunda-spin-dataformat-json-jackson` uses `jackson-databind` for object (de-)serialization. A common use case is declaring Jackson annotations in custom classes to finetune JSON handling. With relocated dependencies, annotations in the `com.fasterxml.jackson` namespace will not be recognized by Spin. In that case, consider using `camunda-spin-core`. Keep in mind the implications this may have as described in the [Integration Use Cases](#integration-use-cases) section.

## camunda-engine-plugin-spin

`camunda-engine-plugin-spin` is a process engine plugin that integrates Spin with a process engine. For example, it 
registers variable serializers that enable the process engine to store Java objects as JSON.

### Configuration properties of the Spin plugin

The Spin process engine plugin provides the following configuration options:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>enableXxeProcessing</code></td>
    <td>Toggle the processing of External XML Entities (XXE) in an XML document. Disable to prevent 
        <a href="https://en.wikipedia.org/wiki/XML_external_entity_attack">XXE attacks</a>. Default value: 
        <code>false</code>
    </td>
  </tr>
  <tr>
    <td><code>enableSecureXmlProcessing</code></td>
    <td>Toggle the <a href="https://docs.oracle.com/en/java/javase/13/security/java-api-xml-processing-jaxp-security-guide.html">secure processing of an XML document</a>. 
        Default value: <code>true</code>
    </td>
  </tr>
</table>

## Maven coordinates

Import the [Camunda BOM](/get-started/apache-maven/) to ensure that you use the right version of Spin that is tested to work with your version of the process engine.

All Spin artifacts have the group id `org.camunda.spin`, so in order to import `camunda-spin-core`, we can write:

```xml
<dependency>
  <groupId>org.camunda.spin</groupId>
  <artifactId>camunda-spin-core</artifactId>
  <!-- The version is omitted here, because it is managed via the BOM.
    Declare a concrete version if you do not use the BOM -->
</dependency>
```

# Integration Use Cases

Depending on the application and process engine setup, it is recommended to use either `camunda-engine-plugin-spin` and `camunda-spin-core` (plus individual data formats) or `camunda-engine-plugin-spin` and `camunda-spin-dataformat-all`. The following sections explain when to use which for the most common use cases.

## Embedded Process Engine

If your application manages its own process engine, then using `camunda-engine-plugin-spin` with `camunda-spin-core` is the recommended approach. Declare the dependencies in the `compile` scope so that the Spin libraries and their dependencies are added to your application when you bundle it. Configure `org.camunda.spin.plugin.impl.SpinProcessEnginePlugin` as a process engine plugin according to the [process engine plugin documentation]({{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}).

## Application with Camunda Spring Boot Starter

Add the dependencies to `camunda-engine-plugin-spin` and `camunda-spin-core` (along with `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom` as needed) to your application. The Spin process engine plugin will be automatically registered with the process engine.

## Shared Process Engine

If you use a shared process engine, Spin is usually installed as a shared library in the application server. Check the [installation guide]({{< ref "/installation/full/_index.md" >}}) for your application server for how to set up Spin with a shared engine. When using a pre-built distribution of Camunda Platform, Spin is already pre-configured.

Depending on the type of application server, `camunda-engine-plugin-spin` should be used with either `camunda-spin-core` or `camunda-spin-dataformat-all`. In the pre-packaged distributions, the following artifacts are used:

* Tomcat: `camunda-spin-dataformat-all` is provided in Tomcat's shared library path. Using `camunda-spin-dataformat-all` avoids classpath pollution with Spin's dependencies. For example, this ensures that applications are not forced to use Spin's version of Jackson.
* Wildfly: `camunda-spin-core` (along with `camunda-spin-dataformat-json-jackson` and `camunda-spin-dataformat-xml-dom`) are deployed as modules. Thanks to Wildfly's module system, classpath pollution is not an issue. Whenever a process application is deployed, it receives an implicit module dependency to `camunda-spin-core`.

If you want to program against the Spin APIs in your process application, you need to declare a dependency to Spin in your application. As Spin is provided by the application server, the following is important:

* Make sure to set the dependencies to scope `provided`. This avoids that a copy of the dependencies is packaged with your application, resulting in various classloading problems at runtime.
* Make sure to depend on the same Spin artifacts that the application server provides, i.e. either `camunda-spin-core` or `camunda-spin-dataformat-all`.
