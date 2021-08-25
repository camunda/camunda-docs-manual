---

title: "Quarkus Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-quarkus-version-compatibility"
    parent: "user-guide-quarkus-integration"

---

Each version of the Camunda Engine Quarkus Extension is bound to a specific version of Camunda Platform and Quarkus. 
Only these default combinations are recommended (and supported) by Camunda.

<table class="table table-striped">
  <tr>
    <th>Camunda Platform version</th>
    <th>Quarkus version</th>
  </tr>
  <tr>
    <td>7.16.0</td>
    <td>2.1.2.Final</td>
  </tr>
</table>

In case a certain Quarkus version has a bug, you can override the existing Quarkus version by adding the following
inside your `pom.xml`. Note that this new Camunda/Quarkus version combination should also be supported by Camunda.

```xml
<dependencyManagement>
  <dependencies>
    ...
    <dependency>
      <groupId>io.quarkus.platform</groupId>
      <artifactId>quarkus-bom</artifactId>
      <version>${quarkus.framework.version}</version><!-- set correct version here -->
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    ...
  </dependencies>
</dependencyManagement>
```
