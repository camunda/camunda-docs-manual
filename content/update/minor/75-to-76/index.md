---

title: "Upgrade from 7.5 to 7.6"
weight: 70

menu:
  main:
    name: "7.5 to 7.6"
    identifier: "migration-guide-75"
    parent: "migration-guide-minor"
    pre: "Upgrade from `7.5.x` to `7.6.0`."

---

This document guides you through the upgrade from Camunda BPM `7.5.x` to `7.6.0`. It covers these use cases:

1. For administrators and developers: [Database Upgrades]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Upgrade]({{< relref "#full-distribution" >}})
3. For administrators: [Standalone Web Application]({{< relref "#standalone-web-application" >}})
4. For administrators: [Updating a Tasklist Translation File]({{< relref "#tasklist-translation-file" >}})
5. For administrators and developers: [Application with Embedded Process Engine Upgrade]({{< relref "#application-with-embedded-process-engine" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.6.

Noteworthy new Features and Changes in 7.6:

{{< note title="The isExecutable is mandatory" class="warning" >}}
 The `isExecutable` attribute of the process is per default `false`. In the newer version of camunda (7.6) process definitions without the `isExecutable`
   attribute or with the attribute set to `false` are not deployed on the engine. *So every process which should be executed needs this attribute in the process definition to be deployed*. Old processes which are deployed on an earlier version are also deployed without this attribute.
{{< /note >}}

{{< note title="Manual activation rule defaults changed" class="warning" >}}

Default behavior of [manual activation rules]({{< relref "reference/cmmn11/markers/manual-activation-rule.md" >}}) in CMMN is changed. If your current case definitions are based on the fact of required manual activation and you would like to keep that behavior, please adjust your case diagramms to include manual activation rule.

```xml
<manualActivationRule/>
```
Otherwise if your case definitions do not have `manualActivationRule` elements, but uses `caseService.manuallyStartCaseExecution(caseExecutionId)` to manually start executions and you would like your executions to start right away, please remove `caseService.manuallyStartCaseExecution(caseExecutionId)` from your code

{{< /note >}}

{{< note title="Rolling upgrade support" class="warning" >}}
  Rolling upgrades are supported starting at upgrade from version 7.5.x to 7.6.0. Please read [detailed documentation]({{< relref "update/rolling-update.md" >}}) about the process and its limitations.
{{< /note >}}

{{< note title="DMN namespace changes" class="Info" >}}
The namespace for DMN 1.1 was changed after our 7.4.0 Release. The official namespace is now: http://www.omg.org/spec/DMN/20151101/dmn.xsd
{{< /note >}}

{{< note title="Admin app authorizations" class="Info" >}}
TODO: based on outcome of https://app.camunda.com/jira/browse/CAM-6704 fill in this section
{{< /note >}}


# Database Upgrades

Every Camunda installation requires a database schema upgrade.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.5_patch_?.sql`.

2. Execute the corresponding upgrade scripts named

    * `$DATABASENAME_engine_7.5_to_7.6.sql`

    The scripts upgrade the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.6.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Upgrade Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.6 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/75-to-76/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/75-to-76/jboss.md" >}})
* [IBM WebSphere]({{< relref "update/minor/75-to-76/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/75-to-76/wls.md" >}})

### Wildfly 10

The pre-built Camunda 7.6 distribution ships with Wildfly 10.1.0, whereas 7.5 comes with Wildfly 10.0.0. Camunda 7.6 is supported on Wildfly 8.2 and 10.0 such that a Wildfly upgrade is not required when migrating from 7.5 to 7.6.

## Custom Process Applications

For every process application, the Camunda dependencies should be upgraded to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications.

# Standalone Web Application

If the standalone web application is in use, the current `war` artifact must be replaced by its new version.

If a database other than the default H2 database is used, the following steps must be taken:

1. Undeploy the current version of the standalone web application
2. Upgrade the database to the new schema as described in the [database
   upgrade](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< relref "installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server


# Tasklist Translation File

The following labels must be added to the Tasklist locale file:

* `Comment`

Have a look at the [english translation file](https://github.com/camunda/camunda-tasklist-translations/blob/master/locales/en.json) for a basis to translate.

# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded process engine**.

Upgrade the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies. That means, updating the version should suffice to migrate a process application in terms of dependencies.

## Special Considerations

This section describes changes in the engine's default behavior. While the changes are reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful upgrade.

### Custom Mapping of the Decision Result

With 7.6, the type of the decision result has changed from `DmnDecisionTableResult` to `DmnDecisionResult`. If the decision result of a business rule task or a decision task is processed by an `ExecutionListener` or a `CaseExecutionListener` (i.e., [custom decision result mapping]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-of-the-decision-result" >}})) then the lister has to adjusted to use the new result type. Since the type is semantically equal and provide the same methods, only the type of the result has to be changed.
