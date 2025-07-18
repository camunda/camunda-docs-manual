---

title: 'Camunda Connector Reference'
weight: 70
layout: "single"

menu:
  main:
    name: "Connectors"
    identifier: "connect-ref"
    parent: "references"

---

Camunda Connect provides a simple API for connecting HTTP services and other
things. It aims at two usage scenarios: usage in a generic system such as the
Camunda 7 process engine and standalone usage via API.

# Connectors

Camunda Connect provides a HTTP and a SOAP HTTP connector. If you want to
add an own connector to Connect please have a look at the [extending Connect]({{< ref "/reference/connect/extending-connect.md" >}})
section. This section also describes the usage of a `ConnectorConfigurator` to
configure the connector instances.

During the request invocation of a connector an interceptor chain is passed.
The user can add own interceptors to this chain. The interceptor is called for
every request of this connector.

```java
connector.addRequestInterceptor(interceptor).createRequest();
```

# Maven Coordinates

Connect can be used in any Java-based application by adding the following maven
dependency to your `pom.xml` file:

{{< note title="Camunda BOM" class="info" >}}
If you use other Camunda 7 projects please import the
[Camunda BOM](/get-started/apache-maven/)
to ensure correct versions for every Camunda project.
{{< /note >}}

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.camunda.connect</groupId>
      <artifactId>camunda-connect-bom</artifactId>
      <scope>import</scope>
      <type>pom</type>
      <version>${version.camunda}</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

```xml
<dependencies>
  <dependency>
    <groupId>org.camunda.connect</groupId>
    <artifactId>camunda-connect-core</artifactId>
  </dependency>

  <dependency>
    <groupId>org.camunda.connect</groupId>
    <artifactId>camunda-connect-connectors-all</artifactId>
  </dependency>
</dependencies>
```

Camunda Connect is published to [maven central](http://search.maven.org/#search%7Cga%7C1%7Ccamunda-connect).

{{< note title="Process engine plugin" class="info" >}}
If you are using Connect in the Camunda 7 process engine, you also need the `camunda-engine-plugin-connect` dependency. For more information, refer to the [Connectors guide]({{< ref "/user-guide/process-engine/connectors.md" >}}).
{{< /note >}}

# Logging

Camunda Connect uses [camunda-commons-logging](https://github.com/camunda/camunda-bpm-platform/tree/master/commons/logging) which itself uses [SLF4J](http://slf4j.org) as
a logging backend. To enable logging a SLF4J implementation has to be part of
your classpath. For example `slf4j-simple`, `log4j12` or `logback-classic`.

Apache HTTP Client 5.x has built-in SLF4J support, so no additional bridges are required for HTTP client logging.
