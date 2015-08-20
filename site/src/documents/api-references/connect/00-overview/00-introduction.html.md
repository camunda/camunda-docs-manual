---

title: 'Introduction'
category: 'Overview'

---

camunda Connect provides a simple API for connecting HTTP Services and other
things.  It aims at two usage scenarios, usage in a generic system such as
camunda BPM process engine and standalone usage via API.

Connect can be used in any Java-based application by adding the following maven
dependency to your `pom.xml` file:

<div class="alert alert-info">
  If you use other camunda BPM projects please import the
  <a class="alert-link" href="/get-started/apache-maven/">
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

[1]: http://search.maven.org/#search%7Cga%7C1%7Ccamunda-connect

