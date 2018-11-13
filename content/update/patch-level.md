---

title: "Patch Level Update"
weight: 20

menu:
  main:
    name: "Patch Level Update"
    identifier: "migration-guide-patch"
    parent: "migration-guide"
    pre: "Guides you through a patch level update (Example: `7.3.2` to `7.3.3`)."

---

This guide explains how to perform a patch level update. The *patch level* is the version number "after the second dot". Example: update from `7.3.2` to `7.3.3`.

{{< enterprise >}}
Please note that Patch Level Upgrades are only provided to enterprise customers, they are not available in the community edition.
{{< /enterprise >}}

{{< note title="Reading this Guide" class="info" >}}
In this guide, a number of variables are used to denote common path names and constants:

* `$DATABASE`: the target database platform, e.g., DB2, MySql etc.
* `$DISTRIBUTION_PATH`: the path of the downloaded pre-packaged Camunda BPM distribution, e.g., `camunda-bpm-tomcat-$PLATFORM_VERSION.zip` or `camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz` for Tomcat etc.
* `$PLATFORM_VERSION`: the version of the Camunda BPM platform you want to install, e.g., `7.1.0`.

{{< /note >}}

# Database Patches

Between patch levels, the structure of the database schema is not changed. The database structure of all patch releases is backwards compatible to the corresponding minor version. Example: the database schema of all `7.3.x` versions is backwards compatible to the `7.3.0` schema.

The one exception to this are bugs in the database schema itself. If you are affected by such a bug, you have the option to run a patch script.
Patch scripts are shipped inside the distribution at the following location: `$DISTRIBUTION_PATH/sql/upgrade`, named: `engine_$VERSION_patch_$A_to_$B`.
If you do choose to apply a database patch, then you must apply all patch scripts that are within the bounds of your upgrade path. This means if your current patch version is `X.X.1` and you upgrade to `X.X.5` you have to execute all patch scripts first where `$A` &ge; `X.X.1` and `$B` &le; `X.X.5`.

Each patch script contains a comment what the fixes are related to and a link to the corresponding [Camunda Jira](https://app.camunda.com/jira/browse/CAM) issue.

The following list is an overview of all currently available patch scripts:

<table class="table desc-table">
  <thead>
    <tr>
      <th>Camunda Version</th>
      <th>Patch file</th>
      <th>Description</th>
      <th>Affected databases</th>
      <th>Issue link</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>7.1</td>
      <td>engine_7.1_patch_7.1.4_to_7.1.5.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks</td>
      <td>H2, MySQL, Oracle, PostgreSQL</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-2567">CAM-2567</td>
    </tr>
    <tr>
      <td>7.1</td>
      <td>engine_7.1_patch_7.1.9_to_7.1.10.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>engine_7.2_patch_7.2.4_to_7.2.5.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks. <strong>This is the same patch as engine_7.1_patch_7.1.9_to_7.1.10.sql</strong>.</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>engine_7.2_patch_7.2.6_to_7.2.7.sql</td>
      <td>Add indices to improve deployment performance.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4497">CAM-4497</td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.0_to_7.3.1.sql</td>
      <td>Adjust column size of ACT_HI_JOB_LOG.ACT_ID_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4037">CAM-4037</td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.2_to_7.3.3_1.sql</td>
      <td>Add a missing index on ACT_RU_AUTHORIZATION#RESOURCE_ID_ to prevent deadlocks.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4440">CAM-4440</td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.2_to_7.3.3_2.sql</td>
      <td>Add indices to improve deployment performance. <strong>This is the same patch as engine_7.2_patch_7.2.6_to_7.2.7.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4497">CAM-4497</td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.5_to_7.3.6_1.sql</td>
      <td>Adjust column size of ACT_RU_JOB.PROCESS_DEF_KEY_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4328">CAM-4328</td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.5_to_7.3.6_2.sql</td>
      <td>Add indices to improve performance of group authorizations.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5364">CAM-5364</td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_1.sql</td>
      <td>Add index to improve historic activity instance statistics query performance.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5257">CAM-5257</td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_2.sql</td>
      <td>Add a missing index on ACT_RU_EXT_TASK#EXECUTION_ID_ to prevent deadlocks.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5440">CAM-5440</td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_3.sql</td>
      <td>Add indices to improve performance of group authorizations. <strong>This is the same patch as engine_7.3_patch_7.3.5_to_7.3.6_2.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5364">CAM-5364</td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.5_to_7.4.6.sql</td>
      <td>Adjust column size of ACT_RU_JOB.PROCESS_DEF_KEY_ to 255. <strong>This is the same patch as engine_7.3_patch_7.3.5_to_7.3.6_1.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4328">CAM-4328</td>
    </tr>
  </tbody>
</table>


# Special Considerations

This section describes noteworthy changes between individual patch levels.

## 7.3.2 to 7.3.3

By default it is not possible anymore to pass arbitrary expressions as parameters of task queries.

Reason: Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated.

The process engine no longer evaluates these expressions by default and throws an exception instead. The pevious behavior can be re-enabled by setting the process configuration `enableExpressionsInAdhocQueries` to true.

See the user guide on [security considerations for custom code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}) for details.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**. In this case you need to update the libraries and applications installed inside the application server.

Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down the server
* Exchange Camunda BPM libraries, tools and webapps (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide]({{< ref "/installation/full/_index.md" >}}) for your server.
* Restart the server

# Application With Embedded Process Engine

In case you use an embedded process engine inside your Java Application, you need to

1. update the Process Engine librarayin your dependency management (Apache MAven, Gradle ...),
2. re-package the application,
3. deploy the new version of the application.

# Standalone Webapplication Distribution

In case you installed the [Standalone Webapplication Distribution]({{< ref "/introduction/downloading-camunda.md#download-the-runtime" >}}) you need to

1. undeploy the previous version of the webapplication,
2. deploy the new version of the webapplication.

# Applying Multiple Patches at Once

It is possible to apply multiple patches in one go (e.g., updateing from `7.1.0` to `7.1.4`).
