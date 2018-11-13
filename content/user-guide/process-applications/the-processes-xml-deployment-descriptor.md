---

title: 'The processes.xml Deployment Descriptor'
weight: 20

menu:
  main:
    identifier: "user-guide-process-application-descriptor"
    parent: "user-guide-process-applications"

---


The processes.xml deployment descriptor contains the deployment metadata for a process application. The following example is a simple example of a `processes.xml` deployment descriptor:

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

A single deployment (process-archive) is declared. The process archive has the name *loan-approval* and is deployed to the process engine with the name *default*. Two additional properties are specified:

  * `isDeleteUponUndeploy`: this property controls whether the undeployment of the process application should entail that the process engine deployment is deleted from the database. The default setting is false. If this property is set to true, undeployment of the process application leads to the removal of the deplyoment (including process instances) from the database.
  * `isScanForProcessDefinitions`: if this property is set to true, the classpath of the process application is automatically scanned for deployable resources. Deployable resources must end in `.bpmn20.xml`, `.bpmn`, `.cmmn11.xml`, `.cmmn`, `.dmn11.xml` or `.dmn`.

See [Deployment Descriptor Reference]({{< ref "/reference/deployment-descriptors/descriptors/processes-xml.md" >}}) for complete documentation of the syntax of the `processes.xml` file.


# Empty processes.xml

The processes.xml may optionally be empty (left blank). In this case default values are used. The empty processes.xml corresponds to the following configuration:

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```

The empty processes.xml will scan for process definitions and perform a single deployment to the default process engine.


# Location of the processes.xml File

The default location of the processes.xml file is `META-INF/processes.xml`. The Camunda BPM platform will parse and process all processes.xml files on the classpath of a process application. Composite process applications (WAR / EAR) may carry multiple subdeployments providing a META-INF/processes.xml file.

In an apache maven based project, add the the processes.xml file to the `src/main/resources/META-INF` folder.


# Custom Location for the processes.xml File

If you want to specify a custom location for the processes.xml file, you need to use the `deploymentDescriptors` property of the `@ProcessApplication` annotation:

```java
@ProcessApplication(
    name="my-app",
    deploymentDescriptors={"path/to/my/processes.xml"}
)
public class MyProcessApp extends ServletProcessApplication {

}
```

The provided path(s) must be resolvable through the `ClassLoader#getResourceAsStream(String)`-Method of the classloader returned  by the `AbstractProcessApplication#getProcessApplicationClassloader()` method of the process application.

Multiple distinct locations are supported.


# Configure Process Engines in the processes.xml File

The processes.xml file can also be used for configuring one or multiple process engine(s). The following is an example of a configuration of a process engine inside a processes.xml file:

```xml
<process-application
xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-engine name="my-engine">
    <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration</configuration>
  </process-engine>

  <process-archive name="loan-approval">
    <process-engine>my-engine</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```

The `<configuration>...</configuration>` property allows specifying the name of a process engine configuration class to be used when building the process engine.

# Specify Tenant-Ids for Process Archives in the processes.xml File

For [Multi-Tenancy with Tenant-Identifiers]({{< ref "/user-guide/process-engine/multi-tenancy.md#single-process-engine-with-tenant-identifiers" >}}), you can specify a tenant-id of a process archive by setting the attribute `tenantId`. If a tenant-id is set then all containing resources will be deployed for the given tenant-id. The following is an example of a processes.xml file which contains one process archive with a tenant-id:

```xml
<process-application
xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval" tenantId="tenant1">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">false</property>
    </properties>
  </process-archive>

</process-application>
```

Note that the processes.xml file can contain multiple process archives with different tenant-ids. 

# Process Application Deployment

When deploying a set of BPMN 2.0 files to the process engine, a process deployment is created. The process deployment is performed to the process engine database so that when the process engine is stopped and restarted, the process definitions can be restored from the database and execution can continue. When a process application performs a deployment, in addition to the database deployment it will create a registration for this deployment with the process engine. This is illustrated in the following figure:


{{< img src="../img/process-application-deployment.png" title="Process Application Deployment" >}}

Deployment of the process application "invoice.war" is illustrated on the left hand side:

1. The process application "invoice.war" deploys the invoice.bpmn file to the process engine.
2. The process engine checks the database for a previous deployment. In this case, no such deployment exists. As a result, a new database deployment `deployment-1` is created for the process definition.
3. The process application is registered for the `deployment-1` and the registration is returned.

When the process application is undeployed, the registration for the deployment is removed (see right hand side of the illustration above). After the registration is cleared, the deployment is still present in the database.

The registration allows the process engine to load additional Java Classes and resources from the process application when executing the processes. In contrast to the database deployment, which can be restored whenever the process engine is restarted, the registration of the process application is kept as in-memory state. This in-memory state is local to an individual cluster node, allowing us to undeploy or redeploy a process application on a particular cluster node without affecting the other nodes and without having to restart the process engine. If the Job Executor is deployment aware, job execution will also stop for jobs created by this process application. However, as a consequence, the registration also needs to be re-created when the application server is restarted. This happens automatically if the process application takes part in the application server deployment lifecycle. For instance, ServletProcessApplications are deployed as ServletContextListeners and when the servlet context is started, it creates the deployment and registration with the process engine. The redeployment process is illustrated in the next figure:

{{< img src="../img/process-application-redeployment.png" title="Process Application Redeployment" >}}

(a) Left hand side: invoice.bpmn has not changed:

1. The process application "invoice.war" deploys the invoice.bpmn file to the process engine.
2. The process engine checks the database for a previous deployment. Since `deployment-1` is still present in the database, the process engine compares the xml content of the database deployment with the bpmn20.xml file from the process application. In this case, both xml documents are identical which means that the existing deployment can be resumed.
3. The process application is registered for the existing deployment `deployment-1`.

(b) Right hand side: invoice.bpmn has changed:

1. The process application "invoice.war" deploys the invoice.bpmn file to the process engine.
2. The process engine checks the database for a previous deployment. Since `deployment-1` is still present in the database, the process engine compares the xml content of the database deployment with the invoice.bpmn file from the process application. In this case, changes are detected which means that a new deployment must be created.
3. The process engine creates a new deployment `deployment-2`, containing the updated invoice.bpmn process.
3. The process application is registered for the new deployment `deployment-2` AND the existing deployment `deployment-1`.

The resuming of the previous deployment (deployment-1) is a feature called `resumePreviousVersions` and is activated by default. There are two different possibilities how to resume previous deployments.

The first one, which is the default way, is that a previous deployment will be resolved based on the process definition keys. Depending on the processes you deploy with your process application all deployments will be resumed that contain process definitions with the same key.

The second option is to resume deployments based on the deployment name (more precisely the value of the `name` attribute of the process archive). That way you can delete a process in a new  deployment but the process application will register itself for the previous deployments and therefore also for the deleted process. This makes it possible that the running process instances of the deleted process can continue for this process application.

To activate this behavior you have set the property `isResumePreviousVersions` to true and the property `resumePreviousBy` to `deployment-name`:

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    ...
    <properties>
      ...
      <property name="isResumePreviousVersions">true</property>
      <property name="resumePreviousBy">deployment-name</property>
    </properties>
  </process-archive>

</process-application>
```

If you want to deactivate this feature, you have to set the property to `false` in processes.xml file:

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    ...
    <properties>
      ...
      <property name="isResumePreviousVersions">false</property>
    </properties>
  </process-archive>

</process-application>
```
