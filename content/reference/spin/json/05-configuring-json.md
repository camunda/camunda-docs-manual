---

title: 'Configuring JSON Handling'
weight: 50

menu:
  main:
    identifier: "spin-ref-json-configuration"
    parent: "spin-ref-json"

---

Spin can be configured to change JSON parsing, writing and mapping settings, for example to tolerate documents that are not strictly compliant to the standard. Spin uses [Jackson](http://wiki.fasterxml.com/JacksonHome) to handle JSON. The JSON data format therefore uses an instance of `com.fasterxml.jackson.databind.ObjectMapper` that can be configured using Spin's [configuration mechanism]({{< ref "/reference/spin/extending-spin.md#configuring-data-formats" >}}).

The data format class to register a configurator for is `org.camunda.spin.impl.json.jackson.format.JacksonJsonDataFormat`. An instance of this class provides a setter for an `ObjectMapper` that can be used to replace the default object mapper. This logic goes into a configurator class that implements the interface `org.camunda.spin.spi.DataFormatConfigurator`. Please refer to the [Jackson's documentation](https://fasterxml.github.io/jackson-databind/javadoc/2.4/) on what configuration options are available.
