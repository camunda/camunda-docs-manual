---

title: 'Data Formats in Processes'
category: 'Data Formats (XML, JSON, Other)'

---

<!--TODO: add link to spin reference-->
The main entry point to Spin's functionality is the static function `org.camunda.spin.Spin.S` that can be used to process documents or to map java objects to a document format. The returned value of this function is a *Spin wrapper*, which is an intermediary representation of a document and that offers functions for manipulating the underlying document. In addition, the functions `org.camunda.spin.Spin.XML` and `org.camunda.spin.Spin.JSON` can be used that return a strongly-typed Spin wrapper of the provided documents which is useful when writing Java. Refer to the Spin reference documentation on how these methods can be used and what API is offered by the Spin wrappers. 

The following subsections describe the integration points of the process engine and Spin. For specific documentation on data formats like XML and JSON, please refer to the [XML section][xml-subsection] or the [JSON section][json-subsection].

### Expression Language Integration

The Spin engine plugin registers the Spin API entry functions in the context used for expression evaluation. It can therefore be used at all points the engine allows expression language. 

### Scripting Integration

Similar to the EL integration, the Spin functions can be accessed from custom scripts in the supported languages Javascript, Groovy, Python and Ruby. See the [scripting section](ref:/guides/user-guide/#process-engine-scripting) on how scripting is configured in general in camunda BPM.

### Serializing Process Variables

Whenever custom Java objects are set as process variables, they have to be persisted into the database. Thus, a Java object instance has to be serialized. The engine's default serialization uses standard Java object serialization which ends up as machine-readable bytes in the database. This approach is limited in that the database values cannot be introspected and that a client reading the object has to possess the respective Java class. To alleviate these issues, by using the Spin engine plugin, variables can be serialized using Spin's data formats. The plugin registers a serializer that looks up all available data formats and offers them for serialization.

[xml-subsection]: ref:#data-formats-xml-json-other-xml
[json-subsection]: ref:#data-formats-xml-json-other-json