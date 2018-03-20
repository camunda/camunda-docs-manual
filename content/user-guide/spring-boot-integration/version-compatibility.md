---

title: "Spring Boot Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-spring-boot-version-compatibility"
    parent: "user-guide-spring-boot-integration"

---

Each version of the Camunda Spring Boot Starter is bound to a specific version of Camunda BPM. Only these default combinations are recommended (and supported) by Camunda.
Nevertheless, lower versions of the Spring Boot Starter can be combined with newer versions of the Camunda BPM engine (see [Overriding Camunda version](../#overriding-camunda-version)), 
though such combinations must be thoroughly tested before being used in production. 

<table class="table table-striped">
  <tr>
    <th>Spring Boot Starter version</th>
    <th>Camunda BPM version</th>
    <th>Spring Boot version</th>
  </tr>
  <tr>
    <td>1.0.0\*</td>
    <td>7.3.0</td>
    <td>1.2.5.RELEASE</td>
  </tr>
  <tr>
    <td>1.1.0\*</td>
    <td>7.4.0</td>
    <td>1.3.1.RELEASE</td>
  </tr>
  <tr>
    <td>1.2.0\*</td>
    <td>7.5.0</td>
    <td>1.3.5.RELEASE</td>
  </tr>
  <tr>
    <td>1.2.1\*</td>
    <td>7.5.0</td>
    <td>1.3.6.RELEASE</td>
  </tr>
  <tr>
    <td>1.3.0\*</td>
    <td>7.5.0</td>
    <td>1.3.7.RELEASE</td>
  </tr>
  <tr>
    <td>2.0.0\*</td>
    <td>7.6.0</td>
    <td>1.4.2.RELEASE</td>
  </tr>
  <tr>
    <td>2.1.x\*</td>
    <td>7.6.0</td>
    <td>1.5.3.RELEASE</td>
  </tr>
  <tr>
    <td>2.2.x\*</td>
    <td>7.7.0</td>
    <td>1.5.6.RELEASE</td>
  </tr>
  <tr>
    <td>2.3.0</td>
    <td>7.8.0</td>
    <td>1.5.8.RELEASE</td>
  </tr>
  <tr>
    <td>3.0.0</td>
    <td>7.9.0</td>
    <td>2.0.0.RELEASE</td>
  </tr>
</table>
* These are the versions of the Spring Boot Starter Community Extension, which can be used the same way as the offically supported Spring Boot Starter, 
but using another Maven dependencies. Check the docs [here](https://camunda.github.io/camunda-bpm-spring-boot-starter/).

TODO: Upgrade changes.