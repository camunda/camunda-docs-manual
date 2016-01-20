---

title: 'Data Formats in Processes'
weight: 20

menu:
  main:
    identifier: "user-guide-spin-data-formats"
    parent: "user-guide-spin"

---


The main entry point to Spin's functionality is the static function `org.camunda.spin.Spin.S` that can be used to process documents or to map java objects to a document format. The returned value of this function is a *Spin wrapper*, which is an intermediary representation of a document and that offers functions for manipulation of the underlying document. Additionally, the functions `org.camunda.spin.Spin.XML` and `org.camunda.spin.Spin.JSON` can be used that return a strongly-typed Spin wrapper of the provided documents which is useful when writing Java. Refer to the [Spin reference documentation]({{< relref "reference/spin/index.md" >}}) on how these methods can be used and what API is offered by the Spin wrappers.

The following subsections describe the integration points of the process engine and Spin. For specific documentation on data formats like XML and JSON, please refer to the [XML section]({{< relref "user-guide/data-formats/xml.md" >}}) and the [JSON section]({{< relref "user-guide/data-formats/json.md" >}}).


# Expression Language Integration

The Spin engine plugin registers the Spin API entry functions in the context used for expression evaluation. It can therefore be used at all points where the engine allows expression language.


# Scripting Integration

Similar to the EL integration, the Spin functions can be accessed from custom scripts in the supported languages JavaScript, Groovy, Python and Ruby. See the [scripting section]({{< relref "user-guide/process-engine/scripting.md" >}}) on how scripting is configured in general in Camunda BPM.


# Native JSON and XML Variable Values

When working with JSON or XML payload it wouldn't be convenient to treat the payload as strings because then features like path-expressions and accessing properties couldn't be used. Additionally, you do not always need or want a class in your system to represent the JSON/XML.

That is why Spin provides native variable values to work with JSON and XML. The Spin API enables access and manipulation of the data in an easy way. Parsing and Serialization can be done with a single command.


# Serializing Process Variables

Whenever custom Java objects are set as process variables, they have to be persisted to the database. Thus, a Java object instance has to be serialized. The engine's default serialization uses standard Java object serialization which ends up as machine-readable bytes in the database. This approach is limited in that the database values cannot be introspected and that a client reading the object has to possess the respective Java class. To alleviate these issues, by using the Spin engine plugin, variables can be serialized using Spin's data formats. The plugin registers a serializer that looks up all available data formats and offers them for serialization.


# Extending Serialization

Spin offers two interfaces that can be implemented to [provide custom data formats]({{< relref "reference/spin/extending-spin.md#custom-dataformats" >}}) and to [configure serialization]({{< relref "reference/spin/extending-spin.md#configuring-data-formats" >}}). Every process application may provide a different set of data format providers and configurators. The BPM platform then instantiates process-application-specific data formats and ensures that they are only accessible when code is executed within the process application's context. See the section on [process application resource access]({{< relref "user-guide/process-applications/process-application-resources.md" >}}) to understand when the process engine operates in the context of a process application and how a context switch can be enforced.

{{< note title="Limitation" class="info" >}}
Data formats provided or configured on process application level currently only apply to the serialization of Object-type variables. Native Spin variables and the Spin standalone API (e.g. `S("{...}").prop("...")`) only use globally configured data formats.
{{< /note >}}
