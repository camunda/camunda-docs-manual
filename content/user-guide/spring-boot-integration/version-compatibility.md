---

title: "Spring Boot Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-spring-boot-version-compatibility"
    parent: "user-guide-spring-boot-integration"

---

Each version of the Camunda Spring Boot Starter is bound to a specific version of Camunda 7 and Spring Boot. 
Only these default combinations are recommended (and supported) by Camunda.
Other combinations must be thoroughly tested before being used in production.

{{< note title="Heads Up" class="info" >}}
  Starting with version 7.13.0, Camunda 7 and its compatible Spring Boot Starter always share the same version.
  Also, the Camunda 7 version used in the Spring Boot Starter doesn't have to be overridden anymore. Simply pick
  the version of the Starter that resembles the version of Camunda 7 you want to use.
{{< /note >}}

<table class="table table-striped">
  <tr>
    <th>Spring Boot Starter version</th>
    <th>Camunda 7 version</th>
    <th>Spring Boot version</th>
  </tr>
  <tr>
    <td>1.0.0&#42;</td>
    <td>7.3.0</td>
    <td>1.2.5.RELEASE</td>
  </tr>
  <tr>
    <td>1.1.0&#42;</td>
    <td>7.4.0</td>
    <td>1.3.1.RELEASE</td>
  </tr>
  <tr>
    <td>1.2.0&#42;</td>
    <td>7.5.0</td>
    <td>1.3.5.RELEASE</td>
  </tr>
  <tr>
    <td>1.2.1&#42;</td>
    <td>7.5.0</td>
    <td>1.3.6.RELEASE</td>
  </tr>
  <tr>
    <td>1.3.0&#42;</td>
    <td>7.5.0</td>
    <td>1.3.7.RELEASE</td>
  </tr>
  <tr>
    <td>2.0.0&#42;&#42;</td>
    <td>7.6.0</td>
    <td>1.4.2.RELEASE</td>
  </tr>
  <tr>
    <td>2.1.x&#42;&#42;</td>
    <td>7.6.0</td>
    <td>1.5.3.RELEASE</td>
  </tr>
  <tr>
    <td>2.2.x&#42;&#42;</td>
    <td>7.7.0</td>
    <td>1.5.6.RELEASE</td>
  </tr>
  <tr>
    <td>2.3.x</td>
    <td>7.8.0</td>
    <td>1.5.8.RELEASE</td>
  </tr>
  <tr>
    <td>3.0.x</td>
    <td>7.9.0</td>
    <td>2.0.x.RELEASE</td>
  </tr>
  <tr>
    <td>3.1.x</td>
    <td>7.10.0</td>
    <td>2.0.x.RELEASE</td>
  </tr>
  <tr>
    <td>3.2.x</td>
    <td>7.10.0</td>
    <td>2.1.x.RELEASE</td>
  </tr>
  <tr>
    <td>3.3.1+</td>
    <td>7.11.0</td>
    <td>2.1.x.RELEASE</td>
  </tr>
  <tr>
    <td>3.4.x</td>
    <td>7.12.0</td>
    <td>2.2.x.RELEASE</td>
  </tr>
  <tr>
    <td>7.13.x<br/>7.13.3+&#42;&#42;&#42;</td>
    <td>7.13.x<br/>7.13.3+</td>
    <td>2.2.x.RELEASE<br/>2.3.x.RELEASE</td>
  </tr>
  <tr>
    <td>7.14.x<br/>7.14.2+&#42;&#42;&#42;</td>
    <td>7.14.x<br/>7.14.2+</td>
    <td>2.3.x.RELEASE<br/>2.4.x</td>
  </tr>
  <tr>
    <td>7.15.x<br/>7.15.3+&#42;&#42;&#42;</td>
    <td>7.15.x<br/>7.15.3+</td>
    <td>2.4.x<br/>2.5.x</td>
  </tr>
  <tr>
    <td>7.16.x<br/>7.16.3+&#42;&#42;&#42;</td>
    <td>7.16.x<br/>7.16.3+</td>
    <td>2.5.x<br/>2.6.x</td>
  </tr>
  <tr>
    <td>7.17.x<br/>7.17.2+&#42;&#42;&#42;</td>
    <td>7.17.x<br/>7.17.2+</td>
    <td>2.6.x<br/>2.7.x</td>
  </tr>
  <tr>
    <td>7.18.x<br/>7.19.x</td>
    <td>7.18.x<br/>7.19.x</td>
    <td>2.7.x</td>
  </tr>
  <tr>
    <td>7.20.x<br/>7.20.3+&#42;&#42;&#42;</td>
    <td>7.20.x<br/>7.20.3+</td>
    <td>3.1.x<br/>3.2.x</td>
  </tr>
  <tr>
    <td>7.21.x<br/>7.21.3+&#42;&#42;&#42;</td>
    <td>7.21.x<br/>7.21.3+</td>
    <td>3.2.x<br/>3.3.x</td>
  </tr>
  <tr>
    <td>7.22.x<br/>7.22.2+&#42;&#42;&#42;</td>
    <td>7.22.x<br/>7.22.2+</td>
    <td>3.3.x<br/>3.4.x</td>
  </tr>
  <tr>
    <td>7.23.x</td>
    <td>7.23.x</td>
    <td>3.4.x</td>
  </tr>
</table>

\* For these versions, use the following Maven coordinates:
```
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-spring-boot-starter</artifactId>
  <version>1.x</version> <!-- set correct version here -->
</dependency>
```

\*\* For these versions, use the following Maven coordinates:
```
<dependency>
  <groupId>org.camunda.bpm.extension.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter</artifactId>
  <version>2.x</version> <!-- set correct version here -->
</dependency>
```

\*\*\* For these versions, all listed Spring Boot versions are supported 
while the oldest one is used by default. If you want to use a newer supported version,
configure `dependencyManagement` in your application, e.g. add the following when using Maven:
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
