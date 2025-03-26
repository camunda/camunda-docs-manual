---

title: "Quarkus Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-quarkus-version-compatibility"
    parent: "user-guide-quarkus-integration"

---

Each version of the Camunda Engine Quarkus Extension is bound to a specific version of Camunda 7 and Quarkus. 
Only these default combinations are recommended (and supported) by Camunda.

<table class="table table-striped">
  <tr>
    <th>Camunda 7 version</th>
    <th>Quarkus version</th>
  </tr>
  <tr>
    <td>7.16.x, 7.17.x</td>
    <td>2.1.x.Final</td>
  </tr>
  <tr>
    <td>7.18.x</td>
    <td>2.8.x.Final</td>
  </tr>
  <tr>
    <td>7.19.x</td>
    <td>2.16.x.Final</td>
  </tr>
  <tr>
    <td>7.20.x</td>
    <td>3.2.x.Final</td>
  </tr>
  <tr>
    <td>7.21.x</td>
    <td>3.8.x</td>
  </tr>
  <tr>
    <td>7.22.x</td>
    <td>3.15.x</td>
  </tr>  
  <tr>
    <td>7.23.x</td>
    <td>3.20.x</td>
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
