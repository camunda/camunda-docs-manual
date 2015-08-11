---

title: 'Camunda Spin Dataformat Reference'
weight: 60

menu:
  main:
    name: "Dataformats"
    identifier: "spin-ref"
    parent: "references"

---

Camunda Spin is a library for simple XML and JSON processing on the JVM (Java
Virtual Machine), targeting Java and JVM-based scripting languages such as
Groovy, JRuby, Jython, JavaScript and Java Expression Language. It provides a
comprehensible fluent API for working with different data formats through
lightweight wrapper objects.

Spin can be used in any Java-based application by adding the following maven
dependency to your `pom.xml` file:

<div class="alert alert-info">
  If you use Spin in combination with other Camunda BPM projects (such as the Camunda process engine),
  please import the <a class="alert-link" href="ref:/guides/getting-started-guides/#apache-maven-the-camunda-bom">
  Camunda BOM</a> to ensure that you use the Camunda Spin version matching your process engine
  version.
</div>

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.camunda.spin</groupId>
      <artifactId>camunda-spin-bom</artifactId>
      <scope>import</scope>
      <type>pom</type>
      <version>${version.spin}</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

```xml
<dependencies>
  <dependency>
    <groupId>org.camunda.spin</groupId>
    <artifactId>camunda-spin-core</artifactId>
  </dependency>

  <dependency>
    <groupId>org.camunda.spin</groupId>
    <artifactId>camunda-spin-dataformat-all</artifactId>
  </dependency>
</dependencies>
```

Camunda Spin is published to [maven central][1].

[1]: http://search.maven.org/#search%7Cga%7C1%7Ccamunda-spin
