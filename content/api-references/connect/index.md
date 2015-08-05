---

title: 'Camunda Connector Reference'
weight: 70

menu:
  main:
    identifier: "connect-ref"
    parent: "references"

---

camunda Connect provides a simple API for connecting HTTP Services and other
things.  It aims at two usage scenarios, usage in a generic system such as
camunda BPM process engine and standalone usage via API.

# Connectors

camunda Connect provides a HTTP and a SOAP HTTP connector. If you want to
add an own connector to Connect please have a look at the [extending Connect][]
section. This section also describes the usage of a `ConnectorConfigurator` to
configure the connector instances.

During the request invocation of a connecotr an interceptor chain is passed.
The user can add own interceptors to this chain. The interceptor is called for
every request of this connector.

```java
connector.addRequestInterceptor(interceptor).createRequest();
```

# Maven Coordinates

Connect can be used in any Java-based application by adding the following maven
dependency to your `pom.xml` file:

<div class="alert alert-info">
  If you use other camunda BPM projects please import the
  <a class="alert-link" href="ref:/guides/getting-started-guides/#apache-maven-the-camunda-bom">
  camunda BOM</a> to ensure correct versions for every camunda project.
</div>

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.camunda.connect</groupId>
      <artifactId>camunda-connect-bom</artifactId>
      <scope>import</scope>
      <type>pom</type>
      <version>${version.connect}</version>
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

camunda Connect is published to [maven central][1].

# Logging

camunda Connect uses [camunda-commons-logging][] which itself uses [SLF4J][] as
a logging backend. To enable logging a SLF4J implementation has to be part of
your classpath. For example `slf4j-simple`, `log4j12` or `logback-classic`.

To also enable logging for the Apache HTTP client you can use a [SLF4J
bridge][] like `jcl-over-slf4j` as the Apache HTTP Client doesn't support
SLF4J.

[1]: http://search.maven.org/#search%7Cga%7C1%7Ccamunda-connect
[extending Connect]: ref:#extending-connect
[camunda-commons-logging]: https://github.com/camunda/camunda-commons/tree/master/logging
[SLF4J]: http://slf4j.org
[SLF4J bridge]: http://www.slf4j.org/legacy.html
