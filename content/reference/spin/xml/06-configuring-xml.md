---

title: 'Configuring XML Handling'
weight: 60

menu:
  main:
    identifier: "spin-ref-xml-configuration"
    parent: "spin-ref-xml"

---

Spin can be configured to change XML parsing, writing and mapping settings. Spin uses JAXB and DOM to handle XML. 
The XML data format therefore uses instances of `javax.xml.parsers.DocumentBuilderFactory`, 
`javax.xml.transform.TransformerFactory` and `javax.xml.bind.JAXBContext` that can be configured using Spin's 
[configuration mechanism]({{< ref "/reference/spin/extending-spin.md#configuring-data-formats" >}}). For example, 
a custom application may provide an implementation of `org.camunda.spin.spi.DataFormatConfigurator` that exchanges 
the `JAXBContext` Spin uses and caches the context to improve performance.

The data format class to register a configurator for is `org.camunda.spin.impl.xml.dom.format.DomXmlDataFormat`. 
An instance of this class provides setter methods for the above-mentioned entities that can be used to replace the 
default object mapper. Please refer to the [JDK documentation](http://docs.oracle.com/javase/8/docs/api/) on what 
configuration can be applied.

## Safe XML processing

The Spin XML data format provides the following configuration properties to enable secure parsing of XML documents:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>xxe-processing</code></td>
    <td>Toggle the processing of External XML Entities (XXE) in an XML document. Disable to prevent 
        <a href="https://en.wikipedia.org/wiki/XML_external_entity_attack">XXE attacks</a>. Default value: 
        <code>false</code>
    </td>
  </tr>
  <tr>
    <td><code>secure-processing</code></td>
    <td>Toggle the <a href="https://docs.oracle.com/en/java/javase/13/security/java-api-xml-processing-jaxp-security-guide.html">secure processing of an XML document</a>. 
        Default value: <code>true</code>
    </td>
  </tr>
</table>

To provide a custom configuration, you can pass these properties in a `Map`, to the `DataFormats.loadDataFormats(...)` 
method like in the example below:

```java
  Map<String, Object> configurationOptions = new HashMap<>();
  configurationOptions.put("xxe-processing", true);
  configurationOptions.put("secure-processing", false);

  DataFormats.loadDataFormats(classloader, configurationOptions);
```