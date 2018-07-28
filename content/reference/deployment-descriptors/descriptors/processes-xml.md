---

title: 'processes.xml'
weight: 20

menu:
  main:
    identifier: "descriptor-ref-processes-xml"
    parent: "descriptor-ref"
    pre: "Configure a deployment."

---


The `processes.xml` file is deployed as part of a process application and is used for configuration of the deployment of BPMN 2.0 resource files. Additionally, it can be used to configure process engines which are started / stopped with the deployment of the application.

See the [processes.xml]({{< ref "/user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}) section of the <a href="{{< ref "/user-guide/_index.md" >}}">User Guide</a> for more details..


# Xml Schema Namespace

The namespace for the processes.xml file is `http://www.camunda.org/schema/1.0/ProcessApplication`. The XSD file can be found in the `camunda-engine.jar` file.


# Empty processes.xml

The `processes.xml` may be left blank (can be empty). In this case, default values are used. See the [Empty processes.xml]({{< ref "/user-guide/process-applications/the-processes-xml-deployment-descriptor.md#empty-processes-xml" >}}) section of the [User Guide]({{< ref "/user-guide/_index.md" >}}) for more details.


# Example

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```


# Syntax Reference

<table class="table table-striped">
  <tr>
    <th>Tag name</th>
    <th>Parent tag name</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>&lt;process-application&gt;</code></td>
    <td>None.</td>
    <td>true</td>
    <td>Root element of the processes.xml file.</td>
  </tr>
  <tr>
    <td><code>&lt;process-engine&gt;</code></td>
    <td><code>&lt;process-application&gt;</code></td>
    <td>false</td>
    <td>See <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md" >}}">process-engine Reference</a></td>
  </tr>
    <tr>
    <td><code>&lt;process-archive&gt;</code></td>
    <td><code>&lt;process-application&gt;</code></td>
    <td>false</td>
    <td>See <a href="{{< ref "/reference/deployment-descriptors/tags/process-archive.md" >}}">process-archive Reference</a></td>
  </tr>
</table>
