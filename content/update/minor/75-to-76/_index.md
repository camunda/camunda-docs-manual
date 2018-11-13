---

title: "Update from 7.5 to 7.6"
weight: 70
layout: "single"

menu:
  main:
    name: "7.5 to 7.6"
    identifier: "migration-guide-75"
    parent: "migration-guide-minor"
    pre: "Update from `7.5.x` to `7.6.0`."

---

<style type="text/css">
    blockquote.upgrade-guide-quote{
      border-left: 2px solid #d2828d;
      margin-left: 1.65em;
      font-size: 0.9em;
    }
</style>

This document guides you through the update from Camunda BPM `7.5.x` to `7.6.0`. It covers these use cases:

1. For administrators and developers: [Database Update]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
3. For administrators: [Standalone Web Application]({{< relref "#standalone-web-application" >}})
4. For administrators: [Updating a Tasklist Translation File]({{< relref "#tasklist-translation-file" >}})
5. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.6.

Noteworthy new Features and Changes in 7.6:

* [DRD support in DMN]({{< ref "/reference/dmn11/drg/_index.md" >}})
* [CMMN support in Cockpit]({{< ref "/webapps/cockpit/cmmn/_index.md" >}})
* [Batch operations]({{< ref "/webapps/cockpit/batch/batch-operation.md" >}})
* Rolling update support

<blockquote class="upgrade-guide-quote">
  Rolling updates are supported starting at updates from version 7.5.x to 7.6.0. Please read the <a href="../../../update/rolling-update">detailed documentation</a> about the process and its limitations.
</blockquote>

* The isExecutable attribute is mandatory

<blockquote class="upgrade-guide-quote">
 By default, the <i>isExecutable</i> attribute of a process is <i>false</i>. In Camunda BPM 7.6, process definitions without the <i>isExecutable</i> attribute or with the attribute set to <i>false</i> are not deployed to the engine. <b>So every process which should be executed needs this attribute in the process definition to be deployed</b>. Old processes which are deployed on an earlier version are also deployed without this attribute.
</blockquote>

* Manual activation rule defaults changed

<blockquote class="upgrade-guide-quote">
Default behavior of <a href="../../../reference/cmmn11/markers/manual-activation-rule">manual activation rules</a> in CMMN is changed. If your current case definitions are based on the fact of required manual activation and you would like to keep that behavior, please adjust your case diagrams to include manual activation rules.

<pre style="margin-top:1em">
&lt;manualActivationRule/&gt;
</pre>

Otherwise, if your case definitions do not have <i>manualActivationRule</i> elements, but use <i>caseService.manuallyStartCaseExecution(caseExecutionId)</i> to manually start executions and you would like your executions to start right away, please remove <i>caseService.manuallyStartCaseExecution(caseExecutionId)</i> from your code.
</blockquote>

* DMN namespace change

<blockquote class="upgrade-guide-quote">
The namespace for DMN 1.1 was changed after our 7.4.0 Release. The official namespace is now: <a href="http://www.omg.org/spec/DMN/20151101/dmn.xsd">http://www.omg.org/spec/DMN/20151101/dmn.xsd</a>
</blockquote>

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.5_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.5_to_7.6.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.6.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.6 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< ref "/update/minor/75-to-76/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< ref "/update/minor/75-to-76/jboss.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/75-to-76/was.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/75-to-76/wls.md" >}})

### Wildfly 10

The pre-built Camunda 7.6 distribution ships with Wildfly 10.1.0, whereas 7.5 ships with Wildfly 10.0.0. Camunda 7.6 is supported on Wildfly 8.2 and 10.0 such that a Wildfly update is not required when migrating from 7.5 to 7.6.

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
2. Update the database to the new schema as described in the [database
   update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server


# Tasklist Translation File

The following labels must be added to the Tasklist locale file:

* `Comment`

Have a look at the [english translation file](https://github.com/camunda/camunda-tasklist-translations/blob/master/locales/en.json) for a basis to translate.

# Application with Embedded Process Engine

This section is applicable if you have a custom application with an **embedded process engine**.

Update the dependencies declared in your application's `pom.xml` file to the new version. Which dependencies you have is application-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* ...

There are no new mandatory dependencies. That means, updating the version should suffice to migrate a process application in terms of dependencies.

## Special Considerations

This section describes changes in the engine's default behavior. While the changes are reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful update.

### Custom Mapping of the Decision Result

With Camunda 7.6, the type of the decision result has changed from `DmnDecisionTableResult` to `DmnDecisionResult`. If the decision result of a business rule task or a decision task is processed by an `ExecutionListener` or a `CaseExecutionListener` (i.e., [custom decision result mapping]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-of-the-decision-result" >}})), then the listener has to adjusted to use the new result type. Since the type is semantically equal and provides the same methods, only the type of the result has to be changed.
