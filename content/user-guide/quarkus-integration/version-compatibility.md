---

title: "Quarkus Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-quarkus-version-compatibility"
    parent: "user-guide-quarkus-integration"

---

Each version of the Camunda Quarkus Extension is bound to a specific version of Camunda Platform and Quarkus. 
Only these default combinations are recommended (and supported) by Camunda.
Other combinations must be thoroughly tested before being used in production.

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

TODO: update dependency management section below to Quarkus so that users are enabled to override
the version in case it has a bug. Describe that camunda only supports what is defined above.

```
<dependencyManagement>
  <dependencies>
  ...
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-dependencies</artifactId>
      <version>2.x.y.RELEASE</version> <!-- set correct version here -->
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  ...
  </dependencies>
</dependencyManagement>
```
