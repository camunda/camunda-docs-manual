---

title: "Spring Boot Version Compatibility"
weight: 10

menu:
  main:
    name: "Vesion Compatibility"
    identifier: "user-guide-spring-boot-version-compatibility"
    parent: "user-guide-spring-boot-integration"

---

Each version of Camunda Spring Boot Starter is bind with specific version of Camunda BPM. Nevertheless smaller version of Spring Boot Starter
 may be combined with newer version of Camunda BPM engine (see [Overriding Camunda version](../#overriding-camunda-version)).

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
    <td>2.3.x</td>
    <td>7.8.0</td>
    <td>1.5.6.RELEASE</td>
  </tr>
</table>
* these versions are the versions of Spring Boot Community Extension, which can be used the same way as offically supported Spring Boot Starter, 
but using another Maven dependencies, check the docs [here](https://camunda.github.io/camunda-bpm-spring-boot-starter/).  