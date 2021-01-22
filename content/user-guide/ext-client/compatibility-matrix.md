---

title: 'Version Compatibility'
weight: 270

menu:
  main:
    name: "Version Compatibility"
    identifier: "external-task-client-compatibility-matrix"
    parent: "external-task-client"

---

Each version of the Camunda Platform is bound to a specific version of the **External Task Clients**.

<table class="table table-striped">
  <tr>
    <th>Camunda Platform version</th>
    <th>NodeJs</th>
    <th>Java</th>
  </tr>
  <tr>
    <td>7.9.x</td>
    <td>1.0.x</td>
    <td>1.0.x</td>
  </tr>
  <tr>
    <td>7.10.x</td>
    <td>1.1.x</td>
    <td>1.1.x</td>
  </tr>
  <tr>
    <td>7.11.x</td>
    <td>1.1.x, 1.2.x</td>
    <td>1.2.x</td>
  </tr>
  <tr>
    <td>7.12.x</td>
    <td>1.3.x</td>
    <td>1.3.x</td>
  </tr>
  <tr>
    <td>7.13.x</td>
    <td>2.0.x</td>
    <td>1.3.x</td>
  </tr>
  <tr>
    <td>7.14.x</td>
    <td>2.0.x</td>
    <td>1.4.x</td>
  </tr>
</table>

Only these default combinations are recommended (and supported) by Camunda. Nevertheless, each version of the External
Task Clients can be combined with newer patch versions of the Camunda Platform Workflow Engine.
