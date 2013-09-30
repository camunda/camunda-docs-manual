---

title: 'Process Archive Configuration'
category: 'Tags'

---


The process archive tag allows configuring a process engine deployment and can be used in the [processes.xml](#descriptors-processesxml) file.

See user guide section on [processes.xml](ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor).


## Example

The following example shows a process-archive XML snippet:

```xml
<process-archive name="loan-approval">
  <process-engine>my-engine</process-engine>
  <process>bpmn/invoice.bpmn</process>
  <process>bpmn/order-process.bpmn</process>
  <properties>
    <property name="isDeleteUponUndeploy">false</property>
    <property name="isScanForProcessDefinitions">true</property>
  </properties>
</process-archive>
```


## Syntax Reference

<table class="table table-striped">
  <tr>
    <th>Tag name </th>
    <th>Parent tag name</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>&lt;process-archive&gt;</code></td>
    <td><code>&lt;process-application&gt;</code></td>
    <td>true</td>
    <td>
      <p>
        Container element for the configuration of a process archive (deployment).
      </p>
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: allows defining the name of the process archive (Required). The name will be used for the
            process engine deployment.</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;process-engine&gt;</code></td>
    <td><code>&lt;process-archive&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Specifies the name of the process engine to which the deployment is performed. If the element is not provided, the default process engine is used.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        the name of the process engine which the deployment should be performed to.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;process&gt;</code></td>
    <td><code>&lt;process-archive&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Can be used for explicitly listing the paths to process definitions that are part of this deployment.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        the path to a process definition that is part of this deployment. The resource is loaded with the classloader of the process process application and must thus be relative to the process application classloader root(s).
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;properties&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code>, <code>&lt;plugin&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Container element for providing a set of process archive configuration properties.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;property&gt;</code></td>
    <td><code>&lt;properties&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Set value for process archive configuration property
      </p>
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: the name of the property.</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        The value of the property to be set.
      </p>
    </td>
  </tr>
</table>


## Configuration Properties

The following is a list with all supported configuration properties.

<table class="table table-striped">
  <tr>
    <th>Property name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>isDeleteUponUndeploy</code></td>
    <td>boolean</td>
    <td>
      <p>
        If true, the process engine deployment will be deleted (cascade = true) when the process application is undeployed.
      </p>
      <p>
        <strong>Default value:</strong>
        false.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>isScanForProcessDefinitions</code></td>
    <td>boolean</td>
    <td>
      <p>
        If true, the process application will be scanned for process definitions (bpmn20 and bpmn20.xml files).
      </p>
      <p>
        <strong>Default value:</strong>
        true.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>isResumePreviousVersions</code></td>
    <td>boolean</td>
    <td>
      <p>
        If true, previous versions of the deployment are automatically resumed. See <a href="ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor-process-application-deployment">Process Application Deployment</a>.
      </p>
      <p>
        <strong>Default value:</strong>
        true.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>resourceRootPath</code></td>
    <td>boolean</td>
    <td>
     <p>
      The resource root of the proccess archive. This property is used when scanning for process definitions
      (if <code>isScanForProcessDefinitions</code> is set to true).</p>

      <p> The path is interpreted as
      <ul>

        <li>
          <strong>local to the root of the classpath.</strong>
          By default or if the prefix <code>classpath:</code> is used, the path is interpreted as relative to the root
          of the classloader. Example: <code>path/to/my/processes</code> or <code>classpath:path/to/my/processes</code>)
        </li>

        <li>
          <strong>relative to the parent folder of the process archive's deployment descriptor file (processes.xml).</strong>
          If the prefix <code>pa:</code> is used, the path is interpreted as relative to the deployment descriptor defining the
          process archive. Consider the situation of a process application packaged as a WAR file:

          The deployment structure could look like this:
          <pre>
          |-- My-Application.war
              |-- WEB-INF
                  |-- lib/
                      |-- Sales-Processes.jar
                          |-- META-INF/processes.xml  (1)
                          |-- opps/openOpportunity.bpmn
                          |-- leads/openLead.bpmn

                      |-- Invoice-Processes.jar
                          |-- META-INF/processes.xml  (2)
         </pre>
         If the process archive(s) defined in (1) uses a path prefixed with <code>pa:</code>, like for instance <code>pa:opps/</code>,
         only the <code>opps/</code>-folder of sales-processes.jar is scanned. More precisely, a "pa-local path", is resolved
         relative to the the parent directory of the META-INF-directory containing the defining processes.xml file.
         This implies, that using a pa-local path in (1), no processes from (2) are visible.
         <p />
        </li>
      </ul>
      </p>
    </td>
  </tr>
</table>
