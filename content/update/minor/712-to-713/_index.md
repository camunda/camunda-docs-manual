---

title: "Update from 7.12 to 7.13"
weight: 20
layout: "single"

menu:
  main:
    name: "7.12 to 7.13"
    identifier: "migration-guide-713"
    parent: "migration-guide-minor"
    pre: "Update from `7.12.x` to `7.13.0`."

---

This document guides you through the update from Camunda BPM `7.12.x` to `7.13.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
   * [Changed Default Application Paths for Webapp & REST API](#changed-default-application-paths)
   * [New License Key Mechanism](#new-license-key-mechanism)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Identity Service Queries](#identity-service-queries)
1. For developers: [MetricsReporterIdProvider interface Deprecation](#metricsreporteridprovider-interface-deprecation)
1. For administrators and developers: [New Version of Templating Engines (Freemarker, Velocity)](#new-version-of-templating-engines-freemarker-velocity)
1. For developers: [Entirely Replaced FEEL Engine](#entirely-replaced-feel-engine)
1. For Developers: [Changes in Cockpit](#changes-in-cockpit)
1. For developers: [Deployment-Aware Batch Operations](#deployment-aware-batch-operations)
1. For developers: [Historic Process Instance Variables on Asynchronous Instantiation](#historic-process-instance-variables-on-asynchronous-instantiation)
1. For administrators and developers: [Oracle JDBC Driver Removed from Camunda Docker Images](#oracle-jdbc-driver-removed-from-camunda-docker-images)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda BPM 7.13.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend executing these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.12_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.12_to_7.13.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.13.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.


# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.13 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/712-to-713/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/712-to-713/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/712-to-713/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/712-to-713/was.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications.

# Standalone Web Application

If the standalone web application is in use, the current `war` artifact must be replaced by its new version.

If a database other than the default H2 database is used, the following steps must be taken:

1. Undeploy the current version of the standalone web application
2. Update the database to the new schema as described in the [database update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server

# Spring Boot Starter Update

Starting with version 7.13, the **`camunda-bpm-spring-boot-starter`** library has been migrated into the `camunda-bpm-platform` repository.
The library version has therefore changed from Camunda Spring Boot Starter (currently at 3.4.x) to the Camunda BPM Platform version (7.13.0).
The Maven coordinates have not changed otherwise.

Overriding the Camunda version used by the Spring Boot Starter is not necessary anymore. 
Pick the version of the Starter that resembles the version of Camunda BPM you would like to use.

If you are using Camunda Spring Boot Starter within your Spring Boot application, then you need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Remove the Camunda BPM version from your `pom.xml` in case you overrode it before (e.g. when using the enterprise version or a patch release).

## Changed Default Application Paths

With this release, the application path of the Spring Boot Webapp Starter & REST API Starter changed. 
The change aligns the application path with all other Camunda BPM distributions.

### REST API

Old Application Path: `/rest`\
New Application Path: `/engine-rest`

If you want to change the application path back to the old one, use the following configuration
property in your `application.yaml` file:

```yaml
spring.jersey.application-path=/rest
```

### Webapp

Old Application Path: `/`\
New Application Path: `/camunda`

In previous versions, there was a problem when using URL paths like `/api/*` or `/app/*` for your 
custom resources since these paths were reserved for the Camunda BPM Webapp. For instance, the 
Camunda BPM Webapp specific CSRF Prevention Filter was applied on these paths and might have 
interfered with your custom REST endpoints or applications. With the changed application path, you 
can now use these paths without restrictions and remove any workarounds (e. g. URL whitelisting for 
the CSRF Prevention Filter).

If you want to change the application path back to the old one, use the following configuration
property in your `application.yaml` file:

```yaml
camunda.bpm.webapp.application-path=/
```

**Please Note:** When changing the application path back to `/`, the `/api/*` and `/app/*` are 
reserved for the Camunda BPM Webapp again.

## New License Key Mechanism

The mechanism for license key pickup (via Spring properties or from the classpath of a Spring Boot application) has been moved with the release of 7.13. It is now only available from the **`camunda-bpm-spring-boot-starter-webapp-ee`** module.

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
</dependency>
```

If you want to set a license key without using the **`camunda-bpm-spring-boot-starter-webapp-ee`** module, you can use the Java API:

```java
managementService.setLicenseKey(String licenseKey);
```
Only Spring Boot applications that use one of the mentioned ways of setting the key are affected by these changes. Other mechanisms included in the engine (e.g. automatic pickup from the users home directory) are not affected. You can find more information about license keys in the [dedicated License use section]({{< ref "/user-guide/license-use.md" >}}).


# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# Identity Service Queries

When you provide ...

1. a custom identity provider implementation by implementing the interface `ReadOnlyIdentityProvider` or `WritableIdentityProvider`
2. **AND** a dedicated implementation of Identity Service Queries (e. g. `GroupQuery`, `TenantQuery`, `UserQuery`)

With this release, you need to implement a new API method <code>[Query#unlimitedList][javadocs-query-unlimited-list]</code>
so that the REST API works appropriately.

Please read more about it in the [User Guide]({{< ref "/user-guide/process-engine/process-engine-api.md#custom-identity-service-queries" >}}).

[javadocs-query-unlimited-list]: https://docs.camunda.org/javadoc/camunda-bpm-platform/7.13/org/camunda/bpm/engine/query/Query.html#unlimitedList--

# MetricsReporterIdProvider interface Deprecation

As of version 7.13, the `MetricsReporterIdProvider` interface has been deprecated. By default, the
Metrics Reporter identifier now uses the `SimpleIpBasedProvider` class, which was ported to
implement the new `HostnameProvider` interface. The `HostnameProvider` interface, and it's default
`SimpleIpBasedProvider` implementation, are used to generate `hostname` information for the Historic
Job Logs as well.

In case a custom implementation of the `MetricsReporterIdProvider` interface is used, it is
recommended to port it to the new `HostnameProvider` interface and set it to the appropriate Process
Engine Configuration property (read more about it [here]({{< ref "/user-guide/process-engine/metrics.md#reporter-identifier" >}})).
Otherwise, different values will be provided for the Metrics Reporter identifier and the Historic
Job Logs hostname information.

# New Version of Templating Engines (Freemarker, Velocity)

Camunda 7.13 includes version 2.0.0 of the `org.camunda.template-engines` artifacts, in particular `camunda-template-engines-freemarker`, `camunda-template-engines-velocity` and `camunda-template-engines-xquery-saxon`.

This updates the following template engine versions:

* Apache Freemarker
  * Old version: 2.3.20 (Release date: June 2013)
  * New version: 2.3.29 (Release date: August 2019)
  * Change log: https://freemarker.apache.org/docs/api/freemarker/template/Configuration.html#Configuration-freemarker.template.Version-
* Apache Velocity
  * Old version: 1.7 (Release date: November 2010)
  * New version: 2.2 (Release date: January 2020)
  * Change log: https://velocity.apache.org/engine/2.2/upgrading.html

Please note that the new versions of Freemarker and Velocity contain changes that are not compatible with the previous versions. We strongly recommend to test the execution of your templates before applying the update. In addition, you can replace the artifacts of version 2.0.0 by the old artifacts in version 1.1.0 to continue using the old versions of Freemarker and Velocity.

# Entirely Replaced FEEL Engine

With this release, we replaced the old FEEL Engine completely. From now on, Camunda BPM uses the 
[FEEL Scala Engine](https://github.com/camunda/feel-scala) (opens external link) by default.
You can restore the legacy behavior via a [configuration property][feel-legacy-prop].

## New Custom Function Mechanism

The FEEL Engine provides an all-new Custom Function mechanism. It is now possible to register Custom 
Functions programmatically. Please read all about it in the documentation about [Custom FEEL Functions].
The old way to register a Custom Function is not supported with the new FEEL Engine.

## New Default Expression Languages

The FEEL Engine changes the default Expression Languages for certain DMN Notation Elements:

<table class="table table-striped">
  <tr>
    <th>DMN Notation Element</th>
    <th>Old</th>
    <th>New</th>
  </tr>
  <tr>
    <td>Input Expression</td>
    <td>JUEL</td>
    <td>FEEL</td>
  </tr>
  <tr>
    <td>Input Entries</td>
    <td>FEEL</td>
    <td>FEEL</td>
  </tr>
  <tr>
    <td>Output Entries</td>
    <td>JUEL</td>
    <td>FEEL</td>
  </tr>
  <tr>
    <td>Literal Expression</td>
    <td>JUEL</td>
    <td>FEEL</td>
  </tr>
</table>

Expression languages defined in the DMN Model (*.dmn file) will override the defaults.

## New Logger Category

The new FEEL Engine uses the slf4j logging "facade", as defined in the 
[Camunda docs]({{< ref "/user-guide/logging.md" >}}).

However, since the new FEEL Engine is an [independently maintained project](https://github.com/camunda/feel-scala/), 
it defines its own logger category. Users that filter the old FEEL Engine logs will need to update 
their configurations by adding a configuration for the new FEEL Engine logger category 
`org.camunda.feel.FeelEngine`.

For the Camunda-related integration code of the Scala FEEL Engine, the new, 
`org.camunda.bpm.dmn.feel.scala` logger category was added. The logs under this category will
cover only the "Scala FEEL Engine"-related operations. For a more general configuration, the old 
`org.camunda.bpm.dmn.feel` can still be used. If a more fine-grained configuration is needed, the
new logger category can be utilized.

## Differences in the Expression Language

Make sure to migrate your Expressions to FEEL 1.2 when using the new FEEL Engine. The legacy
FEEL Engine has a partial coverage of FEEL 1.1.

Additionally, make sure your FEEL expressions respect the following breaking changes.

### Objects Cannot Be Compared 

Previously it was possible to compare objects when the class of the respective objects implements 
`java.lang.Comparable`. Objects cannot be compared with the new FEEL Engine.

### Spin Java API Cannot Be Called

The handling of Spin-based JSON & XML variables has changed fundamentally. For more information, 
please see the documentation about [FEEL Engine Spin Integration]. The Spin Java API cannot be
called directly in FEEL Expressions with the new FEEL Engine.

### Beans Are Not Automatically Resolved

Previously, the FEEL Engine took care of resolving beans automatically. Beans are not automatically
resolved with the new FEEL Engine.

### Changed Exception Classes

The following exception classes were consolidated to `org.camunda.bpm.dmn.feel.impl.FeelException`:

* `org.camunda.bpm.dmn.feel.impl.juel.FeelConvertException`
* `org.camunda.bpm.dmn.feel.impl.juel.FeelMethodInvocationException`
* `org.camunda.bpm.dmn.feel.impl.juel.FeelMissingFunctionException`
* `org.camunda.bpm.dmn.feel.impl.juel.FeelMissingVariableException`
* `org.camunda.bpm.dmn.feel.impl.juel.FeelSyntaxException`

### Single-Quoted String Literals Not Allowed

Previously, double-quoted as well as single-quoted string literals were allowed.
The new FEEL Engine is more strict on the specification here. Use double quotes 
for string literals in expressions. 

**Example:** Migrate 'foo' to "foo"

**Single-quoted string literals are considered as a bug in the old FEEL Engine.**

### Timezone Information Is Respected

From now on, an exception is thrown when a variable of type `java.util.Date` is compared with the 
FEEL expression: `date and time("2019-09-12T13:00:00@Europe/Berlin")`. 

**Ignoring the timezone information is considered as a bug in the old FEEL Engine.**

### Known Issues in the New FEEL Engine

Please also check out the status of the following known issues when migrating your FEEL Expressions:

* https://jira.camunda.com/browse/CAM-11269
* https://jira.camunda.com/browse/CAM-11304
* https://jira.camunda.com/browse/CAM-11382

[feel-legacy-prop]: {{< ref "/user-guide/dmn-engine/feel/legacy-behavior.md" >}}
[Custom FEEL Functions]: {{< ref "/user-guide/dmn-engine/feel/custom-functions.md" >}}
[FEEL Engine Spin Integration]: {{< ref "/user-guide/dmn-engine/feel/spin-integration.md" >}}

# Changes in Cockpit

## DMN 1.3 Support in Cockpit

With this release, Cockpit adds support for DMN 1.3, the next version of the DMN standard. If you edit and deploy DMN diagrams in Cockpit, which use earlier versions of DMN, they will automatically be migrated to DMN 1.3.

The Camunda engine already supports the DMN 1.3 namespace by default, so there are no more steps required to migrate.
Make sure you have the latest version of [Camunda Modeler](https://camunda.com/download/modeler/) installed to edit DMN 1.3 files locally.

## Removal Time Batches are Hierarchical by Default

The default behavior of the `set removal time` batch operations changed to be hierarchical with this release. It is less likely that the batch operation will lead to deadlocks, transaction timeouts, or full transaction logs with the hierarchical flag enabled.

# Deployment-Aware Batch Operations

With this release, all [batch operations][] that work on process-related elements, e.g. process instances, are deployment-aware.
From the list of currently available batch operations, only [Set a Removal Time to Historic Batches][set-removal-time-batch] is not deployment-aware. 
This is because only the *jobs* of a batch might need deployment-related resources, the batch itself does not and is therefore not bound to a deployment.

Since [Monitor Jobs][] do not need any deployment-related resources anymore with this release as well,
only [Seed Jobs][] and [Execution Jobs][] are affected by this. Technically, seed jobs and execution jobs will receive a `deploymentId` so [deployment-aware job executors][job-cluster] can pick up those jobs of a batch that need to be executed on their nodes.

The deployment id of the seed job is chosen from a list of involved deployments. The list of deployments involved in a batch is derived from the elements of the batch operation, e.g. for chosen process instances the deployments their process definitions belong to are fetched. Execution jobs only contain elements of the same deployment and are bound to it as well.

This feature also works in a [Rolling Update scenario][]. All batches created in versions prior to 7.13.0 will be executed with the same behavior they had before.
Only batches created and run on nodes that run on version 7.13.0 or later will be able to create deployment-aware batch jobs for all process-related batch operations.

For custom batch operations the new mechanism also means that deployment-aware batch jobs can be created in a more transparent way.
The `BatchConfiguration` now has a new attribute `idMappings` that comprises a list of deployment-to-ids mappings.
The routine creating the batch entity with the custom batch type handler simply needs to provide such a list of mappings to the configuration.
The seed job creation as well as the batch job creation in the seed job will transparently take care of producing deployment-aware jobs afterwards.

[batch operations]: {{< ref "/user-guide/process-engine/batch-operations.md" >}}
[Monitor Jobs]: {{< ref "/user-guide/process-engine/batch.md#monitor-job" >}}
[Seed Jobs]: {{< ref "/user-guide/process-engine/batch.md#seed-job" >}}
[Execution Jobs]: {{< ref "/user-guide/process-engine/batch.md#execution-jobs" >}}
[set-removal-time-batch]: {{< ref "/user-guide/process-engine/batch-operations.md#historic-batches" >}}
[job-cluster]: {{< ref "/user-guide/process-engine/the-job-executor.md#job-execution-in-heterogeneous-clusters" >}}
[Rolling Update scenario]: {{< ref "/update/rolling-update.md" >}}

# Historic Process Instance Variables on Asynchronous Instantiation

This concerns only processes that have a start event with the [asyncBefore]({{< ref "/reference/bpmn20/events/start-events.md#asynchronous-instantiation" >}}) flag set.

{{< img src="./img/asyncBefore-start-event.svg" title="Asynchronous Instantiation" >}}

Let's have a look at the following example:

```java
// Step 1
ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("oneTaskProcess",
        Variables.createVariables().putValue("invoiceId", "I-123"));

// Step 2: execute the asynchronous continuation job of the start event
executeJob(processInstancJob);
```

Before this minor release, the historic variable `invoiceId` would have been stored only after the job execution in step 2.
That behavior differed from the rest of the use cases where variables are set on process instance start or later.
Now they are stored right away to keep the use cases consistent.
The approach is more natural to how the historic information is stored into the database and helps to resolve issues during process execution and inconsistent information between runtime and historic data.
In Cockpit, starting from 7.13, you will notice a different activity instance id in the Details for instances.

{{< img src="./img/variable-log.png" title="Variable Log" >}}

As you can see in the picture above, the variable log shows the process instance id for the activity instead of the start event activity. The same is valid if you are using the Java and/or REST API.

# Oracle JDBC Driver Removed from Camunda Docker Images

The Docker images for Camunda 7.13 no longer provide an Oracle JDBC driver out of the box. If you relied on this, apply the strategy outlined in https://github.com/camunda/docker-camunda-bpm-platform#database-environment-variables: Add the driver to the container and configure the database settings manually by linking the configuration file into the container.
