---

title: "Update from 7.3 to 7.4"
weight: 90
layout: "single"

menu:
  main:
    name: "7.3 to 7.4"
    identifier: "migration-guide-73"
    parent: "migration-guide-minor"
    pre: "Update from `7.3.x` to `7.4.0`."

---

This document guides you through the update from Camunda BPM `7.3.x` to `7.4.0`. It covers these use cases:

1. For administrators and developers: [Database Updates]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
3. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.4.

Noteworthy new Features and Changes in 7.4:

* **DMN 1.1:** [Decision Model And Notation][dmn-ref] is a standard for defining and executing business rules in the form of decisions and integrates with [BPMN][bpmn-ref] and [CMMN][cmmn-ref]. Camunda BPM 7.4 implements this standard for decision tables and therefore introduces new artifacts and extends the database schema during update. If you do not plan to use DMN, the DMN-related tables will stay empty.
* **CMMN 1.1:** In addition to the already implemented version 1.0, the new version 1.1 of [Case Management Model And Notation][cmmn-ref] (CMMN) is supported with Camunda BPM 7.4. The execution of CMMN 1.0 models is still supported by Camunda BPM.
* **Logging:** Camunda 7.4 uses SLF4J as a logging API instead of JDK logging as before. This introduces the SLF4J API as a core dependency for the process engine. Please refer to the application server-specific sub-chapters of this document for implications on updating a full distribution installation. Also see the User Guide for [information on how to set up logging]({{< ref "/user-guide/logging.md" >}}).
* **Changed URL of BPMN Extensions Namespace**: With 7.4 the namespace URL for BPMN extensions is changed. See last section on this page for details.

[dmn-ref]: {{< ref "/reference/dmn/_index.md" >}}
[cmmn-ref]: {{< ref "/reference/cmmn11/_index.md" >}}
[bpmn-ref]: {{< ref "/reference/bpmn20/_index.md" >}}

{{< note title="No Rolling Updates" class="warning" >}}
It is not possible to migrate process engines from Camunda 7.3 to 7.4 in a rolling fashion. This means, it is not possible to run process engines of version 7.3 and 7.4 in parallel with the same database configuration. The reason is that a 7.3 engine may not be able to execute process instances that have been previously executed by a 7.4 engine, as these may use features that were not available yet in 7.3.
{{< /note >}}

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.3_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.3_to_7.4.sql`

    The scripts update the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.4.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## Special Considerations

### Patch Scripts

If you previously migrated from 7.2 to 7.3 you may have already executed the patch script `$DATABASE_engine_7.2_patch_7.2.6_to_7.2.7.sql`.
This script is the same as patch `$DATABASE_engine_7.3_patch_7.3.2_to_7.3.3_2.sql` which need not be executed then.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.4 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< ref "/update/minor/73-to-74/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< ref "/update/minor/73-to-74/jboss.md" >}})
* [Glassfish]({{< ref "/update/minor/73-to-74/glassfish.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/73-to-74/was.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/73-to-74/wls.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications.

# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded process engine**.

Update the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies but some artifacts have new transitive dependencies. For example `camunda-engine` depends on `camunda-engine-dmn`. In order to pull these new dependencies into your application artifact, updating the version in your build tool and rebuilding the application is recommended.

## Special Considerations

This section describes changes in the engine's default behavior. While the changes are reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful update.

### Logging

As of 7.4 the process engine uses SLF4J for logging. The SLF4J API is pulled in transitively by the process engine maven module.
However, in order for any actual logging to occur, you need to add an slf4j compatible logging backend. Please refer to the user guide for
[Information on how to setup logging]({{< ref "/user-guide/logging.md" >}}).

### Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

### User Operation Log

The behavior of the [user operation log]({{< ref "/user-guide/process-engine/history.md#user-operation-log" >}}) has changed, so that operations are only logged if they are performed in the context of a logged in user. This behavior can be toggled in the process engine configuration using the property `restrictUserOperationLogToAuthenticatedUsers` (default `true`). To restore the engine's prior behavior, i.e., to write log entries regardless of user context, set the flag to `false`.

Furthermore, with 7.4 task events are only logged when they occur in the context of a logged in user. Task events are accessible via the deprecated API `TaskService#getTaskEvents`. If you rely on this API method, the previous behavior can be restored by setting the flag `restrictUserOperationLogToAuthenticatedUsers` to `false`.

### CMMN Model API

As a consequence of supporting CMMN 1.1, the CMMN model API is now based on the schema of CMMN 1.1. This leads to [limitations]({{< ref "/user-guide/model-api/cmmn-model-api/limitations.md" >}}) when editing CMMN 1.0 models. We therefore recommend to [migrate your CMMN 1.0 models to CMMN 1.1]({{< ref "/reference/cmmn11/migration/10-to-11.md" >}}).

# Changed URL of BPMN Extensions Namespace

With Camunda 7.4 the default namespace URL of BPMN extensions is changed from

http://activiti.org/bpmn (referred to as legacy namespace)

to

http://camunda.org/schema/1.0/bpmn

This section explains the implications of this change for the different components of Camunda.

## Implications by Component

### Eclipse Plugin

There is a new version of the eclipse plugin available (3.0.0) which supports the new namespace.
It does not fully support the legacy namespace anymore.

If you use a 3.0.0+ version of the plugin,

* all newly created bpmn processes use the new namespace url.
* If you open an existing model which uses the legacy namespace, a warning dialog is shown asking you to update the namespace URL. If you click "yes", the plugin automatically migrates the legacy namespace to the new URL.

If you do not update the Eclipse plugin, the old version of the plugin continues to work with the legacy namespace.
Since the process engine maintains backwards compatibility with the legacy namespace, this is fine. It is only a problem if you want to roundtrip models with the new Camunda Modeler.

### Process Engine

The process engine maintains backwards compatibility with the legacy namespace. This means that if a BPMN process using the legacy namespace is deployed, the process engine is able to parse and execute it.

### BPMN Model API

The BPMN model API maintains backwards compatibility with the legacy namespace for reading usecases. This means that if the model API is used for reading properties from the model, both namespaces can be used interchangeably without problems.

When creating new models with the model API, the new namespace is used.

Editing existing models using the legacy namespace with the model API and then adding new extensions is not supported.
You need to update the namespace to the new namespace manually.

### Camunda Modeler (New)

The new Camunda Modeler is based on [bpmn.io](http://bpmn.io). It is a desktop application editing files stored on the local file system.

The Camunda Modeler exclusively works with the new namespace. If you open an existing model which uses the legacy namespace, a warning dialog is shown asking you to update the namespace URL. If you click "yes", the modeler automatically migrates the legacy namespace to the new URL.
If you click "No", the modeler does not migrate the namespace and you will not be able to edit the existing extension elements in the model.
