---

title: 'Data Formats (XML, JSON, Other)'
weight: 90

menu:
  main:
    identifier: "user-guide-spin"
    parent: "user-guide"

---


{{< note title="Spin Dataformat Reference" class="info" >}}
  This section explains how to work with data formats such as XML or JSON in Camunda BPM. The
  [Spin Dataformat Reference]({{< relref "reference/spin/_index.md" >}}) provides a complete reference of
  all data manipulation features available.
{{< /note >}}

While Camunda BPM is a Java platform, process data is not always represented by Java objects. When interacting with external systems, serialized formats such as JSON or XML are often used. While such process variables can be treated by the engine as plain String objects, there is a significant effort required to process such data like parsing, manipulating or mapping from/to Java objects. Thus, Camunda BPM offers an optional component that eases the work with this kind of data in the process engine.

The [Camunda Spin](https://github.com/camunda/camunda-spin) project provides data format functionality and can be plugged into the engine. It is a wrapper around well-known libraries for processing data formats like XML and JSON and integrates with the engine's data handling functionality. Spin is designed to be extensible so that custom data formats can be added to those provided out of the box.

As an introductory example, assume a process instance that retrieves a customer's profile by invoking a RESTful XML web service and that stores the result in a variable called `customer`. Let the `customer` variable have the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer xmlns="http://camunda.org/example" name="Jonny">
  <address>
    <street>12 High Street</street>
    <postcode>1234</postcode>
  </address>
</customer>
```

With Spin integrated into the engine, the following expression can be used to evaluate the customer's post code in a conditional sequence flow:

```java
${XML(customer).xPath("/customer/address/postcode").element().textContent() == "1234"}
```

Camunda Spin provides the following engine functionality:

* Fluent APIs for reading, manipulating and writing text-based data formats like JSON and XML wherever code is plugged into a process
* Integration of the Spin API functions into the expression language
* Integration of the Spin API functions into scripting environments
* Native JSON and XML variable value types
* Serializing Java process variables by mapping objects to Spin data formats like JSON and XML
