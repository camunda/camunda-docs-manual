---

title: 'Variable Serialization'
category: 'Process Engine'

---

The engine offers two ways of serializing complex Java objects to the database that can be specified by setting the engine configuration option `defaultSerializationFormat`. The possible configuration values are:

* `java serializable`: This option requires variables to implement the `java.io.Serializable` interface. Objects are then transformed by standard Java serialization to byte arrays which are persisted to the database.
* `application/json; implementation=tree`: By using this option, variables are transformed to and persisted as JSON. This requires the [camunda Spin](https://github.com/camunda/camunda-spin) library to be on the process engine's classpath which is the default when you use a pre-built distro. Internally, Spin uses [Jackson](https://github.com/FasterXML/jackson) to map Java to JSON and vice versa.

When the option `defaultSerializationFormat` is omitted, the default serialization is `java serializable`.

## Configuring Spin-based Serialization

When choosing a serialization option like `application/json; implementation=tree`, the process engine uses the functionality of camunda Spin. However, Spin's default serialization settings may not always be best suited for every use case. For example, serializing and deserializing polymorphic Java types requires the persisted JSON to contain type information. To enable the serialization of type information, Spin can be configured in various ways (see the [Spin documentation](https://github.com/camunda/camunda-spin/blob/master/docs/user-guide/index.md) for more information). When using Spin with the process engine, we recommend implementing a [process engine plugin](ref:#process-engine-process-engine-plugins) to change Spin's default settings. Configuration has to be applied before the process engine is constructed (i.e. in the plugin's `preInit` method).
