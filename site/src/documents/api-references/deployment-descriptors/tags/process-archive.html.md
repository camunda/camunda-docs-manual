---

title: 'Process Archive Configuration'
category: 'Tags'

---


The process archive tag allows configuration of a process engine deployment and can be used in the [processes.xml](ref:#descriptors-processesxml) file.

See the [processes.xml](ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor) section of the [User Guide](ref:/guides/user-guide/) for more details.


## Example

The following example shows a process-archive XML snippet:

```xml
<process-archive name="loan-approval">
  <process-engine>my-engine</process-engine>
  <resource>bpmn/invoice.bpmn</resource>
  <resource>bpmn/order-resource.bpmn</resource>
  <properties>
    <property name="isDeleteUponUndeploy">false</property>
    <property name="isScanForProcessDefinitions">true</property>
    <property name="additionalResourceSuffixes">groovy,py</property>
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
          <li><code>name</code>: Allows you to define the name of the process archive (Required). The name will be used for the
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
        The name of the process engine to which the deployment should be performed.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;resource&gt;</code></td>
    <td><code>&lt;process-archive&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Can be used to explicitly list the paths to resources that are part of this deployment. These
        can be process or case definitions but also additional files like script files.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        The path to the resource that is part of this deployment. The resource is loaded with the classloader of the process application and therefore must be relative to the process application classloader root(s).
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
          <li><code>name</code>: The name of the property.</li>
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

The following is a list of all supported configuration properties.

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
        If true, previous versions of the deployment are automatically resumed. See the <a href="ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor-process-application-deployment">Process Application Deployment</a> section of the <a href="ref:/guides/user-guide/">User Guide</a> for more details.
      </p>
      <p>
        <strong>Default value:</strong>
        true.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>resourceRootPath</code></td>
    <td>string</td>
    <td>
     <p>
      The resource root of the process archive. This property is used when scanning for process definitions
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
         This implies that when using a pa-local path in (1), no processes from (2) are visible.
         <p />
        </li>
      </ul>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>additionalResourceSuffixes</code></td>
    <td>comma-seperated list</td>
    <td>
      Specifies a list of additional suffixes which are considered as deployment resource if the
      <code>isScanForProcessDefinitions</code> property is set to <code>true</code>. It can be used
      to deploy additional resources beside process and case definitions, for example to add a
      script to the deployment and reference it as an external source of a
      <a href="ref:/api-references/bpmn20/#tasks-script-task-script-source">script task</a> or an
      <a href="ref:/guides/user-guide/#process-engine-scripting-use-scripts-as-inputoutput-parameter">
      inputOutput</a> mapping. To specify multiple suffixes, a comma is used as seperator,
      ie., <code>py,groovy,rb</code>.
    </td>
  </tr>
</table>
