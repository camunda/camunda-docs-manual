---

title: 'Multi-Tenancy'
weight: 180

menu:
  main:
    identifier: "user-guide-process-engine-multi-tenancy"
    parent: "user-guide-process-engine"

---


*Multi-Tenancy* regards the case in which a single Camunda installation should serve more than one tenant. For each tenant, certain guarantees of isolation should be made. For example, one tenant's process instances should not interfere with those of another tenant.

Multi-tenancy can be achieved on different levels of data isolation. On the one end of the spectrum, different tenants' data can be stored in [different databases]({{< relref "#one-process-engine-with-tenant-identifiers" >}}) by configuring multiple process engines, while on the other end of the spectrum, data can be associated with [tenant identifiers]({{< relref "#one-deployment-per-tenant" >}}) and are stored in the same tables. In between these two extremes, it is possible to separate tenant data into different schemas or tables.

{{< note title="Recommended Approach" class="info" >}}
  If you have many tenants which have only less data (e.g. process definitions, process instances, tasks etc.) and don't need a strict isolation from each other (e.g. data and resources) then we recommend the approach of one process engine with tenant-specific deployments over the multiple process engines (i.e., isolation into different databases/schemas/tables) approach as it is more resource-efficient.
{{< /note >}}


# One Process Engine Per Tenant

Database-, schema-, and table-based multi-tenancy can be enabled by configuring one process engine per tenant. Each process engine can be configured to point to a different portion of the database. While they are isolated in that sense, they may all share computational resources such as a data source (when isolating via schemas or tables) or a thread pool for asynchronous job execution. Furthermore, the Camunda API offers convenient access to different process engines based on a tenant identifier.


## Data Isolation

Database, schema or table level


## Advantages

* Strict data separation
* Hardly any performance overhead for application servers due to resource sharing
* In case one tenant's database state is inconsistent, no other tenant is affected
* Camunda Cockpit, Tasklist, and Admin offer tenant-specific views out of the box by [switching between different process engines]({{< relref "webapps/cockpit/dashboard.md#multi-tenancy" >}})


## Disadvantages
 
* Additional process engine configuration necessary
* No out-of-the-box support for tenant-independent queries

## Implementation

Working with different process engines for multiple tenants comprises the following steps:

* **Configuration** of process engines
* **Deployment** of process definitions for different tenants to their respective engines
* **Access** to a process engine based on a tenant identifier via the Camunda API

{{< note title="Tutorial" class="info" >}}
  You can find a tutorial [here]({{< relref "examples/tutorials/multi-tenancy.md" >}}) that shows how to implement multi-tenancy with data isolation by schemas.
{{< /note >}}


### Configuration

Multiple process engines can be configured in a configuration file or via Java API. Each engine should be given a name that is related to a tenant such that it can be identified based on the tenant. For example, each engine can be named after the tenant it serves. See the [Process Engine Bootstrapping]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md" >}}) section for details.

The process engine configuration can be adapted to achieve either database-, schema- or table-based isolation of data. If different tenants should work on entirely different databases, they have to use different jdbc settings or different data sources. For schema- or table-based isolation, a single data source can be used which means that resources like a connection pool can be shared among multiple engines. The configuration option [databaseTablePrefix]({{< relref "reference/deployment-descriptors/tags/process-engine.md#configuration-protperties" >}}) can be used to configure database access in this case.

For background execution of processes and tasks, the process engine has a component called [job executor]({{< relref "user-guide/process-engine/the-job-executor.md" >}}). The job executor periodically acquires jobs from the database and submits them to a thread pool for execution. For all process applications on one server, one thread pool is used for job execution. Furthermore, it is possible to share the acquisition thread between multiple engines. This way, resources are still manageable even when a large number of process engines is used. See the section [The Job Executor and Multiple Process Engines]({{< relref "user-guide/process-engine/the-job-executor.md#the-job-executor-and-multiple-process-engines" >}}) for details.

Multi-tenancy settings can be applied in the various ways of configuring a process engine. The following is an example of a [bpm-platform.xml]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-in-bpm-platformxml" >}}) file that specifies engines for two tenants that share the same database but work on different schemas:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform">

  <job-executor>
    <job-acquisition name="default" />
  </job-executor>

  <process-engine name="tenant1">
    <job-acquisition>default</job-acquisition>
    <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration</configuration>
    <datasource>java:jdbc/ProcessEngine</datasource>

    <properties>
      <property name="databaseTablePrefix">TENANT_1.</property>

      <property name="history">full</property>
      <property name="databaseSchemaUpdate">true</property>
      <property name="authorizationEnabled">true</property>
    </properties>
  </process-engine>

  <process-engine name="tenant2">
    <job-acquisition>default</job-acquisition>
    <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration</configuration>
    <datasource>java:jdbc/ProcessEngine</datasource>

    <properties>
      <property name="databaseTablePrefix">TENANT_2.</property>

      <property name="history">full</property>
      <property name="databaseSchemaUpdate">true</property>
      <property name="authorizationEnabled">true</property>
    </properties>
  </process-engine>
</bpm-platform>
```


### Deployment

When developing process applications, i.e., process definitions and supplementary code, some processes may be deployed to every tenant's engine while others are tenant-specific. The processes.xml deployment descriptor that is part of every process application offers this kind of flexibility by the concept of *process archives*. One application can contain any number of process archive deployments, each of which can be deployed to a different process engine with different resources. See the section on the [processes.xml deployment descriptor]({{< relref "user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}) for details.

The following is an example that deploys different process definitions for two tenants. It uses the configuration property `resourceRootPath` that specifies a path in the deployment that contains process definitions to deploy. Accordingly, all the processes under `processes/tenant1` on the application's classpath are deployed to engine `tenant1`, while all the processes under `processes/tenant2` are deployed to engine `tenant2`.

```
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="tenant1-archive">
    <process-engine>tenant1</process-engine>
    <properties>
      <property name="resourceRootPath">classpath:processes/tenant1/</property>

      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

  <process-archive name="tenant2-archive">
    <process-engine>tenant2</process-engine>
    <properties>
      <property name="resourceRootPath">classpath:processes/tenant2/</property>

      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```


### Access

In order to access a specific tenant's process engine at runtime, it has to be identified by its name. The Camunda engine offers access to named engines in various programming models:

* **Plain Java API**: Via the [ProcessEngineService]({{< relref "user-guide/runtime-container-integration/bpm-platform-services.md#processengineservice" >}}) any named engine can be accessed.
* **CDI Integration**: Named engine beans can be injected out of the box. The [built-in CDI bean producer]({{< relref "user-guide/cdi-java-ee-integration/built-in-beans.md" >}}) can be specialized to access the engine of the current tenant dynamically.
* **Via JNDI on JBoss/Wildfly**: On JBoss and Wildfly, every container-managed process engine can be [looked up via JNDI]({{< relref "user-guide/runtime-container-integration/jboss.md#looking-up-a-process-engine-in-jndi" >}}).


# One Process Engine With Tenant-Identifiers

A process engine can handle multiple tenants by adding a tenant identifier (e.g. tenant-id) to the deployment. This identifier is propagated to all data that are created from the deployment (e.g. process definitions, process instances etc.). In order to access only data for a specific tenant, the process engine queries allow to filter by a tenant-id. A calling application must make sure to filter according to the correct tenant.    

## Data isolation

Row level with tenant identifier for filtering


## Advantages

* Straightforward querying for data across multiple tenants as the data for all tenants is organized in the same tables
* Resource-efficient for a huge number of tenants with less data

## Disadvantages

* Shared resources for all tenants that can lead to bottlenecks 
* No strict data separation, risk of disclosing data that belong to other tenants

## Implementation

Working with multiple tenants in a process engine comprises the following aspects:

* **Deployment** of process definitions for different tenants
* **Versioning** of process definitions for different tenants 
* **Querying** for process entities of different tenants

{{< note title="Examples" class="info" >}}
You can find examples on [GitHub](https://github.com/camunda/camunda-bpm-examples) that shows how to use multi-tenancy for
  
* [Embedded Process Engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-embedded)    
* [Shared Process Engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-shared)
{{< /note >}}

### Deployment

Each tenant has his own deployment. The id of the tenant is set while deploying the resources (e.g. process definitions).

Using the Java API:

```java
repositoryService
      .createDeployment()
      .tenantId("tenant1")
      .addZipInputStream(inputStream)
      .deploy()
```

Using the [processes.xml]({{< relref "user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}) Deployment Descriptor:

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive tenantId="tenant1">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```

### Versioning

Each tenant has his own definitions (e.g. process definitions) which have versions independent from other tenants. For example, if a new process definition is deployed for two tenants then both definitions get the version `1`. The versioning within one tenant works like the [versioning for non multi-tenancy]({{< relref "user-guide/process-engine/process-versioning.md" >}}).

### Querying

The process engine queries allow to filter by a specific tenant-id. The following snippet shows a query that retrieves all deployments for tenant `tenant1`:

```java
List<Deployment> deployments = repositoryService
        .createDeploymentQuery()
        .tenantIdIn("tenant1")
        .list();
```

It is also possible to filter by a list of tenant-ids. For example, retrieve all deployments from tenant `tenant1` and `tenant2`:

```java
List<Deployment> deployments = repositoryService
        .createDeploymentQuery()
        .tenantIdIn("tenant1", "tenant2")
        .orderByTenantId()
        .asc()
        .list();
```

To retrieve the data from all tenants, no criteria for tenant-id have to be set on the query.
