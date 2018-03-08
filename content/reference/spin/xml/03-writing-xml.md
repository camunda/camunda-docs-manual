---

title: 'Writing XML'
weight: 30

menu:
  main:
    identifier: "spin-ref-xml-writing"
    parent: "spin-ref-xml"

---

The XML datatype supports writing XML to Strings, output streams or writers.


# Writing to a String:

```java
import org.camunda.spin.xml.SpinXmlElement;

// Create XML element
SpinXmlElement element = XML("<root id=\"test\"/>");

String xml = element.toString();

String value = element.attr("id").value();
```

# Writing to an Output Stream:

```java
import org.camunda.spin.xml.SpinXmlElement;
import org.camunda.spin.xml.SpinXmlAttribute;

// Create XML element
SpinXmlElement element = XML("<root id=\"test\"/>");

try {

  // Define Output Stream
  OutputStream outputStream = System.out;

  // Wrap Output Stream in Writer
  OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);

  // Write element to stream writer
  element.writeToWriter(outputStreamWriter);

  // Get attribute from element
  SpinXmlAttribute attr = element.attr("id");

  // Write attribute value to stream writer
  attr.writeToWriter(outputStreamWriter);

  // End Output Stream
  outputStreamWriter.write("\n");

  // Close Output Stream and Writer
  outputStreamWriter.close();

} catch (IOException e) {
  // Handle exception if needed
}
```

# Write to Writer

```java
import org.camunda.spin.xml.SpinXmlElement;
import org.camunda.spin.xml.SpinXmlAttribute;

// Create XML element
SpinXmlElement element = XML("<root id=\"test\"/>");

// Create String Writer
StringWriter writer = new StringWriter();

// Write element to Writer
element.writeToWriter(writer);

// Get attribute from element
SpinXmlAttribute attr = element.attr("id");

// Write attribute value to Writer
attr.writeToWriter(writer);
```
