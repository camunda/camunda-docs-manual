---

title: 'Multi-Tenancy'
weight: 180

menu:
  main:
    identifier: "user-guide-process-engine-multi-tenancy"
    parent: "user-guide-process-engine"

---


*Multi-Tenancy* regards the case in which a single Camunda installation should serve more than one tenant. For each tenant, certain guarantees of isolation should be made. For example, one tenant's process instances should not interfere with those of another tenant.

Multi-Tenancy can be achieved in two different ways. One way is to use [one process engine per tenant]({{< relref "#one-process-engine-per-tenant" >}}). The other way is to use just one process engine and associate the data with [tenant identifiers]({{< relref "#single-process-engine-with-tenant-identifiers" >}}). The two ways differ from each other in the level of data isolation, the effort of maintenance and the scalability. A combination of both ways is also possible.

# Single Process Engine With Tenant-Identifiers

Multi-Tenancy can be achieved with one process engine which uses tenant identifiers (i.e., tenant-ids). The data of all tenants is stored in one table (same database and schema). Isolation is provided by the means of a tenant identifier that is stored in a column.

{{< img src="../img/multi-tenancy-tenant-identifiers.png" title="One Process Engine with Tenant-Identifiers Architecture" >}}

The tenant identifier is specified on the deployment and is propagated to all data that is created from the deployment (e.g., process definitions, process instances, tasks, etc.). To access the data for a specific tenant, the process engine allows to filter queries by a tenant identifier or specify a tenant identifier for a command (e.g., create a process instance). Additionally, the process engine provides transparent access restrictions in combination with the Identity Service that allows to omit the tenant identifier.

It is also possible for all tenants to share the same definitions without deploying them for each tenant. Shared definitions can simplify management of the deployments in case of a larger amount of tenants.

{{< note title="Examples" class="info" >}}
Find [examples on GitHub](https://github.com/camunda/camunda-bpm-examples) that show how to use tenant-identifiers with
  
* [Embedded Process Engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-embedded)    
* [Shared Process Engine](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-shared)
{{< /note >}}

## Deploy Definitions for a Tenant

To deploy definitions for a single tenant, the tenant identifier has to be set on the deployment. The given identifier is propagated to all definitions of the deployment so that they belong to the tenant.

If no tenant identifier is set then the deployment and its definitions belong to all tenants. In this case, all tenants can access the deployment and the definitions. See [this section]({{< relref "#shared-definitions-for-all-tenants" >}}) to read more about how to use shared definitions.

### Specify the Tenant Identifier via Java API

When a deployment is created using the Repository Service, the tenant identifier can be set on the {{< javadocref page="?org/camunda/bpm/engine/repository/DeploymentBuilder.html" text="DeploymentBuilder" >}}.

```java
repositoryService
  .createDeployment()
  .tenantId("tenant1")
  .addZipInputStream(inputStream)
  .deploy()
```

### Specify the Tenant Identifier via Deployment Descriptor

In case of a process application, the deployment is specified by a [processes.xml]({{< relref "user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}) Deployment Descriptor. Since the descriptor can contain multiple process-archives (i.e., deployments), the tenant identifier can be set on each process-archive as `tenantId` attribute.

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

### Specify the Tenant Identifier via Spring Configuration

When the [Automatic Resource Deployment]({{< relref "user-guide/spring-framework-integration/deployment.md" >}}) of the Spring Framework Integration is used, the tenant identifier can be specified in the Process Engine Configuration as `deploymentTenantId` property.

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <property name="deploymentResources">
    <array>
      <value>classpath*:/org/camunda/bpm/engine/spring/test/autodeployment/autodeploy.*.cmmn</value>
      <value>classpath*:/org/camunda/bpm/engine/spring/test/autodeployment/autodeploy.*.bpmn20.xml</value>
    </array>
  </property>
  <property name="deploymentTenantId" value="tenant1" />
</bean>
```

### Versioning of Tenant-Specific Definitions

When a definition is deployed for a tenant then it is assigned a version which is independent from definitions of other tenants. For example, if a new process definition is deployed for two tenants then both definitions are assigned the version `1`. The versioning within one tenant works like the [versioning of definitions]({{< relref "user-guide/process-engine/process-versioning.md" >}}) that belong to no tenant.

## Query Data of a Tenant

The process engine queries of tenant-specific data (e.g., Deployment Query, Process Definition Query) allows to filter by one or more tenant identifiers. If no identifier is set then the result contains the data of all tenants.

Note that the [transparent access restrictions]({{< relref "#transparent-access-restrictions-for-tenants" >}}) of tenants can influence the result of a query if a user is not allowed to see the data of a tenant.

### Query Deployments of a Tenant

To find the deployments of specific tenants, the tenant identifiers have to be passed to `tenantIdIn` on the `DeploymentQuery`.

```java
List<Deployment> deployments = repositoryService
  .createDeploymentQuery()
  .tenantIdIn("tenant1", "tenant2")
  .orderByTenantId()
  .asc()
  .list();
```

In case of [shared definitions]({{< relref "#shared-definitions-for-all-tenants" >}}), it can be useful to filter by deployments which belong to no tenant by calling `withoutTenantId()`. 

```java
List<Deployment> deployments = repositoryService
  .createDeploymentQuery()
  .withoutTenantId()
  .list();
```

It is also possible to filter by deployments which belong to a specific tenant or no tenant by calling `includeDeploymentsWithoutTenantId()`.

```java
List<Deployment> deployments = repositoryService
  .createDeploymentQuery()
  .tenantIdIn("tenant1")
  .includeDeploymentsWithoutTenantId()
  .list();
```

### Query Definitions of a Tenant

Similar to the `DeploymentQuery`, the definition queries allow to filter by one or more tenants and by definitions which belong to no tenant.

```java
List<ProcessDefinition> processDefinitions = repositoryService
  .createProcessDefinitionQuery()
  .tenantIdIn("tenant1")
  .includeProcessDefinitionsWithoutTenantId();
  .list();
```

## Run Commands for a Tenant

When a definition is deployed for multiple tenants, a command can be ambiguous (e.g., start a process instance by key). If such a command is executed, a `ProcessEngineException` is thrown. To run the command successfully, the tenant identifier has to be passed to the command.

Note that the [transparent access restrictions]({{< relref "#transparent-access-restrictions-for-tenants" >}}) of tenants can omit the tenant identifier if a user is only allowed to see one of the definitions.

### Create a Process Instance

To create an instance by key of a process definition which is deployed for multiple tenants, the tenant identifier has to be passed to the {{< javadocref page="?org/camunda/bpm/engine/runtime/ProcessInstantiationBuilder.html" text="ProcessInstantiationBuilder" >}}. 

```java
runtimeService
  .createProcessInstanceByKey("key")
  .processDefinitionTenantId("tenant1")
  .execute();
```

### Correlate a Message

The [Message API]({{< relref "reference/bpmn20/events/message-events.md#message-api" >}}) can be used to correlate a message to one or all tenants. In case a message can correlate to definitions or executions of multiple tenants, the tenant identifier has to be passed to the {{< javadocref page="?org/camunda/bpm/engine/runtime/MessageCorrelationBuilder.html" text="MessageCorrelationBuilder" >}}. Otherwise, a `MismatchingMessageCorrelationException` is thrown.

```java
runtimeService
  .createMessageCorrelation("messageName")
  .tenantId("tenant1")
  .correlate();
```

To correlate a message to all tenants, pass no tenant identifier to the builder and call `correlateAll()`.

```java
runtimeService
  .createMessageCorrelation("messageName")
  .correlateAll();
```

### Send a Signal

The [Signal API]({{< relref "reference/bpmn20/events/signal-events.md#signal-api" >}}) can be used to deliver a signal to one or all tenants. Pass the tenant identifier to the {{< javadocref page="?org/camunda/bpm/engine/runtime/SignalEventReceivedBuilder.html" text="SignalEventReceivedBuilder" >}} to deliver the signal to a specific tenant. If no identifier is passed then the signal is delivered to all tenants.

```java
runtimeService
  .createSignalEvent("signalName")
  .tenantId("tenant1")
  .send();
```

When a signal is thrown within a process (i.e., intermediate signal event or signal end event) then the signal is delivered to definitions and executions which belong to the same tenant as the calling execution or no tenant.

### Create a Case Instance

To create an instance by key of a case definition which is deployed for multiple tenants, the tenant identifier has to be passed to the {{< javadocref page="?org/camunda/bpm/engine/runtime/CaseInstanceBuilder.html" text="CaseInstanceBuilder" >}}.

```java
caseService
  .withCaseDefinitionByKey("key")
  .caseDefinitionTenantId("tenant1")
  .execute();
```

### Evaluate a Decision Table

To evaluate a decision table by key which is deployed for multiple tenants, the tenant identifier has to be passed to the {{< javadocref page="?org/camunda/bpm/engine/dmn/DecisionEvaluationBuilder.html" text="DecisionEvaluationBuilder" >}}.

```java
decisionService
  .evaluateDecisionTableByKey("key")
  .decisionDefinitionTenantId("tenant1")
  .evaluate();
```

## Transparent Access Restrictions for Tenants

When integrating Camunda into an application, it can be cumbersome to pass the tenant Id to each camunda API call. Since such an application usually also has a concept of an "authenticated user", it is possible to set the list of tenant ids when setting the authentication:

```java
try {
  identityService.setAuthentication("mary", asList("accounting"), asList("tenant1"));

  // All api calls executed here have "tenant1" transparently set as tenantId

}
finally {
  identityService.clearAuthentication();
}
```

In the above example, all api calls executed betwen `setAuthentication(...)` and `clearAuthentication()` are transparenty executed with the list
of provided tenant Ids.

### Query Example:

```java
try {
  identityService.setAuthentication("mary", asList("accounting"), asList("tenant1"));

  repositoryService.createProcessDefinitionQuery().list();
}
finally {
  identityService.clearAuthentication();
}
```

Is equivalent to

```java
repositoryService.createProcessDefinitionQuery()
  .tenantIdIn("tenant1")
  .includeProcessDefinitionsWithoutTenantId()
  .list();
```

### Task Access Example:

For other commands like `completeTask()`, the transparent access check ensures that the authenticated user does not access
resources by other tenants:

```java
try {
  identityService.setAuthentication("mary", asList("accounting"), asList("tenant1"));

  // throws an exception if task has tenant id other than "tenant1"
  taskService.completeTask("someTaskId");
}
finally {
  identityService.clearAuthentication();
}
```

### Getting a user's Tenant Ids from the Identity Service

The process engine's Identity Service can be used to manage users, groups and tenants as well as their relationships.
The following example shows how to retreive the lists of groups and tenants for a given user and then use these lists when setting the authentication:

```java
List<Tenant> groups = identityService.createGroupQuery()
  .userMember(userId)
  .list();

List<Tenant> tenants = identityService.createTenantQuery()
  .userMember(userId)
  .includingGroupsOfUser(true)
  .list();

try {
  identityService.setAuthentication(userId, groups, tenants);

  // get all tasks visible to user.
  taskService.createTaskQuery().list();
  
}
finally {
  identityService.clearAuthentication();
}
```

{{< note title="LDAP Identity Service" class="info" >}}
The above example only works with the [Database Identity Service]({{< relref "user-guide/process-engine/identity-service.md#the-database-identity-service" >}}) (i.e., the default implementation). The [LDPA Identity Service]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) doesn't support tenants.
{{< /note >}}  


### Camunda Rest API and Web Applications

The Camunda [Rest API]({{< relref "reference/rest/index.md" >}}) and the web applications Cockpit and Tasklist support the transparent access restrictions. When a user logs in then he only sees and can only access the data (e.g., process definitions) that belongs to one of his tenants.

Tenants and their memberships can be managed in the [Admin]({{< relref "webapps/admin/tenant-management.md" >}}) web application.

### Disable the Transparent Access Restrictions 

The transparent access restrictions are enabled by default. To disable the restrictions, set the `tenantCheckEnabled` property in the [ProcessEngineConfiguration]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md#processengineconfiguration-bean" >}}) to `false`.

Additionally, it is also possible to disable the restrictions for a single command (e.g., for a maintenance task). Use the `CommandContext` to disable and enable the restrictions for the current command.

```java
commandContext.disableTenantCheck();

// e.g., do maintenance tasks over all tenants

commandContext.enableTenantCheck();
```

Note that the restrictions can't be enabled for a command if they are disabled in the `ProcessEngineConfiguration`. 

### Access all Tenants as Administrator

Users who are a member of the group `camunda-admin` can access the data of all tenants, even if they don't belong to the tenants. This is useful for an administrator of a multi-tenancy application since he has to manage the data over all tenants.

## Shared Definitions for all Tenants

...will be documented soon!

{{< note title="Example" class="info" >}}
You can find an [example](https://github.com/camunda/camunda-bpm-examples/tree/master/multi-tenancy/tenant-identifier-shared-definitions) on [GitHub](https://github.com/camunda/camunda-bpm-examples) that shows how to use shared definitions.
{{< /note >}}

# One Process Engine Per Tenant

Multi-Tenancy can be achieved by providing one process engine per tenant. Each process engine is configured to use a different data source which connects the data of the tenant. The data of the tenants can be stored in different databases, in one database with different schemas or in one schema with different tables.

{{< img src="../../../introduction/img/multi-tenancy-process-engine.png" title="One Process Engine per Tenant Architecture" >}}

The process engines can run on the same server so that all share the same computational resources such as a data source (when isolating via schemas or tables) or a thread pool for asynchronous job execution. 

{{< note title="Tutorial" class="info" >}}
  You can see the [tutorial]({{< relref "examples/tutorials/multi-tenancy.md" >}}) how to implement multi-tenancy with data isolation by schemas.
{{< /note >}}

## Configure the Process Engines

The process engines can be configured in a configuration file or via Java API. Each engine should have a name that is related to a tenant such that it can be identified based on the tenant. For example, each engine can be named after the tenant it serves. See the [Process Engine Bootstrapping]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md" >}}) section for details.

### Database Isolation

If different tenants should work on entirely different databases, they have to use different JDBC settings or different data sources. 

### Schema or Table Isolation

For schema- or table-based isolation, a single data source can be used which means that resources like a connection pool can be shared among multiple engines.
To achieve this,

* the configuration option [databaseTablePrefix]({{< relref "reference/deployment-descriptors/tags/process-engine.md#configuration-protperties" >}}) can be used to configure database access.
* consider switching on the setting `useSharedSqlSessionFactory`. The setting controls whether each process engine instance should parse and maintain a local copy of the mybatis mapping files or whether a single, shared copy can be used. Since the mappings require a lot of heap (>30MB), it is recommended to switch this on. This way only one copy needs to be allocated.

{{< note title="Considerations for useSharedSqlSessionFactory setting" class="warning" >}}
The `useSharedSqlSessionFactory` setting causes caching of the mybatis sql session factory in a static field, once built.
When using this configuration setting, you need to be aware that

* it can only be used if all process engines which use the setting share the same datasource and transaction factory
* the reference in the field, once set, is never cleared. This is usually not a problem but if it is, users must clear the field
manually by setting it to null explicitly via 

```java
ProcessEngineConfigurationImpl.cachedSqlSessionFactory = null
```
{{< /note >}}

### Job Executor for Multiple Process Engines

For background execution of processes and tasks, the process engine has a component called [job executor]({{< relref "user-guide/process-engine/the-job-executor.md" >}}). The job executor periodically acquires jobs from the database and submits them to a thread pool for execution. For all process applications on one server, one thread pool is used for job execution. Furthermore, it is possible to share the acquisition thread between multiple engines. This way, resources are still manageable even when a large amount of process engines are used. See the section [The Job Executor and Multiple Process Engines]({{< relref "user-guide/process-engine/the-job-executor.md#the-job-executor-and-multiple-process-engines" >}}) for details.

### Example Configuration for Schema Isolation

Multi-Tenancy settings can be applied in the various ways of configuring a process engine. The following is an example of a [bpm-platform.xml]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-in-bpm-platformxml" >}}) file that specifies engines for two tenants that share the same database but work on different schemas:

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
      <property name="useSharedSqlSessionFactory">true</property>
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
      <property name="useSharedSqlSessionFactory">true</property>
    </properties>
  </process-engine>
</bpm-platform>
```


## Deploy Definitions for a Tenant

When developing process applications, i.e., process definitions and supplementary code, some processes may be deployed to every tenant's engine while others are tenant-specific. The processes.xml deployment descriptor that is part of every process application offers this kind of flexibility by the concept of *process archives*. One application can contain any number of process archive deployments, each of which can be deployed to a different process engine with different resources. See the section on the [processes.xml deployment descriptor]({{< relref "user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}) for details.

The following is an example that deploys different process definitions for two tenants. It uses the configuration property `resourceRootPath` that specifies a path in the deployment that contains process definitions to deploy. Accordingly, all the processes under `processes/tenant1` on the application's classpath are deployed to engine `tenant1`, while all the processes under `processes/tenant2` are deployed to engine `tenant2`.

```xml
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


## Access the Process Engine of a Tenant

To access a specific tenant's process engine at runtime, it has to be identified by its name. The Camunda engine offers access to named engines in various programming models:

* **Plain Java API**: Via the [ProcessEngineService]({{< relref "user-guide/runtime-container-integration/bpm-platform-services.md#processengineservice" >}}) any named engine can be accessed.
* **CDI Integration**: Named engine beans can be injected out of the box. The [built-in CDI bean producer]({{< relref "user-guide/cdi-java-ee-integration/built-in-beans.md" >}}) can be specialized to access the engine of the current tenant dynamically.
* **Via JNDI on JBoss/Wildfly**: On JBoss and Wildfly, every container-managed process engine can be [looked up via JNDI]({{< relref "user-guide/runtime-container-integration/jboss.md#looking-up-a-process-engine-in-jndi" >}}).

The Camunda web applications Cockpit, Tasklist and Admin offer tenant-specific views out of the box by [switching between different process engines]({{< relref "webapps/cockpit/dashboard.md#multi-tenancy" >}}).

