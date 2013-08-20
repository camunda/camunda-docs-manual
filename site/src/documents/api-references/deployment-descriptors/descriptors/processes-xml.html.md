processes.xml
=============

The `processes.xml` file is deployed as part of a process application and is used for configuring the deployment of BPMN 2.0 resource files. Additionally, it can be used for configuring  process engines which are started / stopped with the deployment of the application.

See [User Guide Section on processes.xml](/guides/user-guide/#!/#the-processes-xml-deployment-descriptor).

Xml Schema Namespace
---------------------

The namespace for the processes.xml file is `http://www.camunda.org/schema/1.0/ProcessApplication`. The XSD file can be found in the `camunda-engine.jar` file.

Example
-------

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


Syntax Reference
----------------

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
    <td>See <a href="#!/tags/process-engine">process-engine Reference</a></td>
  </tr>
    <tr>
    <td><code>&lt;process-archive&gt;</code></td>
    <td><code>&lt;process-application&gt;</code></td>
    <td>false</td>
    <td>See <a href="#!/tags/process-archive">process-archive Reference</a></td>
  </tr>
</table>
