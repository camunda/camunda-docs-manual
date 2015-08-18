---

title: 'Connectors'
weight: 100

menu:
  main:
    identifier: "user-guide-process-engine-connectors"
    parent: "user-guide-process-engine"

---


With the optional dependency [camunda-connect](https://github.com/camunda/camunda-connect), the process engine supports simple
connectors. Currently the following connector implementations exist:

<table class="table">
  <tr>
    <th>Connector</th>
    <th>ID</th>
  </tr>
  <tr>
    <td>REST HTTP</td>
    <td>http-connector</td>
  </tr>
  <tr>
    <td>SOAP HTTP</td>
    <td>soap-http-connector</td>
  </tr>
</table>


# Configure Camunda Connect

As Camunda Connect is an optional dependency, it is not immediately available when using the process engine. With a pre-built distribution, Camunda Connect is already preconfigured.

There are two types of `connect` artifacts:

* `camunda-connect-core`: a jar that contains only the core Connect classes. In addition to `camunda-connect-core`, single connector implementations like `camunda-connect-http-client` and `camunda-connect-soap-http-client` exist. These dependencies should be used when the default connectors have to be reconfigured or when custom connector implementations are used.
* `camunda-connect-connectors-all`: a single jar without dependencies that contains the HTTP and SOAP connectors.
* `camunda-engine-plugin-connect`: a process engine plugin to add Connect to the Camunda BPM platform.


# Maven Coordinates

{{< note title="" class="info" >}}
  Please import the [Camunda BOM]({{< relref "get-started/apache-maven.md" >}}) to ensure correct versions for every Camunda project.
{{< /note >}}


## camunda-connect-core

`camunda-connect-core` contains the core classes of Connect. Additionally, the HTTP and SOAP connectors can be added with the dependencies `camunda-connect-http-client` and `camunda-connect-soap-http-client`. These artifacts will transitively pull in their dependencies, like Apache HTTP client. For integration with the engine, the artifact `camunda-engine-plugin-connect` is needed. Given that the BOM is imported, the Maven coordinates are as follows:

```xml
<dependency>
  <groupId>org.camunda.connect</groupId>
  <artifactId>camunda-connect-core</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.connect</groupId>
  <artifactId>camunda-connect-http-client</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.connect</groupId>
  <artifactId>camunda-connect-soap-http-client</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-plugin-connect</artifactId>
</dependency>
```


## camunda-connect-connectors-all

This artifact contains the HTTP and SOAP connectors as well as their dependencies. To avoid conflicts with other versions of these dependencies, the dependencies are relocated to different packages. `camunda-connect-connectors-all` has the following Maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.connect</groupId>
  <artifactId>camunda-connect-connectors-all</artifactId>
</dependency>
```


## Configure the Process Engine Plugin

`camunda-engine-plugin-connect` contains a class called `org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin` that can be registered with a process engine using the [plugin mechanism]({{< relref "user-guide/process-engine/process-engine-plugins.md" >}}). For example, a `bpm-platform.xml` file with the plugin enabled would look as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">
  ...
  <process-engine name="default">
    ...
    <plugins>
      <plugin>
        <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>
</bpm-platform>
```

{{< note title="" class="info" >}}
  When using a pre-built distribution of Camunda BPM, the plugin is already pre-configured.
{{< /note >}}


# Use Connectors

To use a connector, you have to add the Camunda extension element [connector]({{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-connector" >}}). The connector is configured by a unique [connectorId]({{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-connectorid" >}}), which specifies the used connector implementation. The ids of the currently supported connectors can be found at the [beginning of this section]({{< relref "#" >}}). Additionally, an [input/output mapping]({{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) is used to configure the connector. The required input parameters and the available output parameters depend on the connector implementation. Additional input parameters can also be provided to be used within the connector.

As an example, a shortened configuration of the camunda SOAP connector implementation is shown. A complete [example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service) can be found in the [Camunda examples repository](https://github.com/camunda/camunda-bpm-examples) on GitHub.

```xml
<serviceTask id="soapRequest" name="Simple SOAP Request">
  <extensionElements>
    <camunda:connector>
      <camunda:connectorId>soap-http-connector</camunda:connectorId>
      <camunda:inputOutput>
        <camunda:inputParameter name="url">
          http://example.com/webservice
        </camunda:inputParameter>
        <camunda:inputParameter name="payload">
          <![CDATA[
            <soap:Envelope ...>
              ... // the request envelope
            </soap:Envelope>
          ]]>
        </camunda:inputParameter>
        <camunda:outputParameter name="result">
          <![CDATA[
            ... // process response body
          ]]>
        </camunda:outputParameter>
      </camunda:inputOutput>
    </camunda:connector>
  </extensionElements>
</serviceTask>
```

A full [example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/rest-service) of the REST connector can also be found in the [Camunda examples repository](https://github.com/camunda/camunda-bpm-examples) on GitHub.
