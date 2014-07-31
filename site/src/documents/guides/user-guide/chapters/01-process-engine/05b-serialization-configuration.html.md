---

title: 'Variable Serialization'
category: 'Process Engine'

---

The engine offers two ways of serializing complex java objects to the database that can be specified by setting the engine configuration option `defaultSerializationFormat`. The possible configuration values are:

* `java serializable`: This option requires variables to implement the `java.io.Serializable` interface. Objects are then transformed by standard Java serialization to byte arrays which are persisted in the database.
* `application/json; implementation=tree`: Using this option, variables are be transformed to and persisted as Json. This requires the <a href="https://github.com/camunda/camunda-spin">camunda Spin</a> library to be on the process engine's classpath which is the default when you use a pre-built distro. Internally, Spin uses <a href="https://github.com/FasterXML/jackson">Jackson</a> to map Java to Json and vice versa.

When the option `defaultSerializationFormat` is omitted, the default serialization is `java serializable`.

## Configuring Spin-based Serialization

When choosing a serialization option like `application/json; implementation=tree`, the process engine uses the functionality of camunda Spin. However, Spin's default serialization settings may not always be best suited for every use case. For example, serializing and deserializing polymorphic java types requires the persisted Json to contain type information. To enable the serialization of type information, Spin can be configured in various ways (see the <a href="https://github.com/camunda/camunda-spin/blob/master/docs/user-guide/index.md">Spin documentation</a>). When using Spin with the process engine, we recommend implementing a <a href="ref:#process-engine-process-engine-plugins">process engine plugin</a> to change Spin's default settings. Configuration has to be applied before the process engine is constructed (i.e. in the plugin's `preInit` method).
