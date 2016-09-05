---

title: "Update from 7.5 to 7.6"
weight: 70

menu:
  main:
    name: "7.5 to 7.6"
    identifier: "migration-guide-75"
    parent: "migration-guide-minor"
    pre: "Update from `7.5.x` to `7.6.0`."

---

This document guides you through the update from Camunda BPM `7.5.x` to `7.6.0`. It covers these use cases:

1. For administrators and developers: [Database Updates]({{< relref "#database-updates" >}})
2. For administrators and developers: [Full Distribution Update]({{< relref "#full-distribution" >}})
3. For administrators and developers: [Application with Embedded Process Engine Update]({{< relref "#application-with-embedded-process-engine" >}})

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

{{< note title="TODO" class="info" >}}
  Add warning if no rolling updates!
{{< /note >}}

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.5_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.5_to_7.6.sql`

    The scripts update the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.6.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## Special Considerations

{{< note title="TODO" class="info" >}}
  Add Special Considerations!
{{< /note >}}

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update Camunda Libraries and Applications inside the application server
2. Migrate custom Process Applications

Before starting, make sure that you have downloaded the Camunda BPM 7.6 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< relref "update/minor/75-to-76/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< relref "update/minor/75-to-76/jboss.md" >}})
* [IBM WebSphere]({{< relref "update/minor/75-to-76/was.md" >}})
* [Oracle WebLogic]({{< relref "update/minor/75-to-76/wls.md" >}})

{{< note title="TODO" class="info" >}}
  Add sections for application servers.
{{< /note >}}

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

There are no new mandatory dependencies. That means, updating the version should suffice to migrate a process application in terms of dependencies.

{{< note title="TODO" class="info" >}}
  Add new mandatory or transitive dependencies if necessary!
{{< /note >}}

## Special Considerations

This section describes changes in the engine's default behavior. While the changes are reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful update.

{{< note title="TODO" class="info" >}}
  Add engine changes!
{{< /note >}}

### Custom Mapping of the Decision Result

With 7.6, the type of the decision result has changed from `DmnDecisionTableResult` to `DmnDecisionResult`. If the decision result of a business rule task or a decision task is processed by an `ExecutionListener` or a `CaseExecutionListener` (i.e., [custom decision result mapping]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-of-the-decision-result" >}})) then the lister has to adjusted to use the new result type. Since the type is semantically equal and provide the same methods, only the type of the result has to be changed.


