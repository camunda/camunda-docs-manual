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
Please note that Patch Level Updates are only provided to enterprise customers, they are not available in the community edition.
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
If you do choose to apply a database patch, then you must apply all patch scripts that are within the bounds of your update path. This means if your current patch version is `X.X.1` and you update to `X.X.5` you have to execute all patch scripts first where `$A` &ge; `X.X.1` and `$B` &le; `X.X.5`.

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
      <td><a href="https://app.camunda.com/jira/browse/CAM-2567">CAM-2567</a></td>
    </tr>
    <tr>
      <td>7.1</td>
      <td>engine_7.1_patch_7.1.9_to_7.1.10.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</a></td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>engine_7.2_patch_7.2.4_to_7.2.5.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks. <strong>This is the same patch as engine_7.1_patch_7.1.9_to_7.1.10.sql</strong>.</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</a></td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>engine_7.2_patch_7.2.6_to_7.2.7.sql</td>
      <td>Add indices to improve deployment performance.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4497">CAM-4497</a></td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.0_to_7.3.1.sql</td>
      <td>Adjust column size of ACT_HI_JOB_LOG.ACT_ID_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4037">CAM-4037</a></td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.2_to_7.3.3_1.sql</td>
      <td>Add a missing index on ACT_RU_AUTHORIZATION#RESOURCE_ID_ to prevent deadlocks.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4440">CAM-4440</a></td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.2_to_7.3.3_2.sql</td>
      <td>Add indices to improve deployment performance. <strong>This is the same patch as engine_7.2_patch_7.2.6_to_7.2.7.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4497">CAM-4497</a></td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.5_to_7.3.6_1.sql</td>
      <td>Adjust column size of ACT_RU_JOB.PROCESS_DEF_KEY_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4328">CAM-4328</a></td>
    </tr>
    <tr>
      <td>7.3</td>
      <td>engine_7.3_patch_7.3.5_to_7.3.6_2.sql</td>
      <td>Add indices to improve performance of group authorizations.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5364">CAM-5364</a></td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_1.sql</td>
      <td>Add index to improve historic activity instance statistics query performance.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5257">CAM-5257</a></td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_2.sql</td>
      <td>Add a missing index on ACT_RU_EXT_TASK#EXECUTION_ID_ to prevent deadlocks.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5440">CAM-5440</a></td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.2_to_7.4.3_3.sql</td>
      <td>Add indices to improve performance of group authorizations. <strong>This is the same patch as engine_7.3_patch_7.3.5_to_7.3.6_2.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-5364">CAM-5364</a></td>
    </tr>
    <tr>
      <td>7.4</td>
      <td>engine_7.4_patch_7.4.5_to_7.4.6.sql</td>
      <td>Adjust column size of ACT_RU_JOB.PROCESS_DEF_KEY_ to 255. <strong>This is the same patch as engine_7.3_patch_7.3.5_to_7.3.6_1.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4328">CAM-4328</a></td>
    </tr>
    <tr>
      <td>7.6</td>
      <td>engine_7.6_patch_7.6.0_to_7.6.1.sql</td>
      <td>Adjust column size of ACT_RU_EVENT_SUBSCR.ACTIVITY_ID_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-6788">CAM-6788</a></td>
    </tr>
    <tr>
      <td>7.6</td>
      <td>engine_7.6_patch_7.6.2_to_7.6.3_1.sql</td>
      <td>Add a missing index on ACT_RU_EXT_TASK#ERROR_DETAILS_ID_ to prevent deadlocks.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-7263">CAM-7263</a></td>
    </tr>
    <tr>
      <td>7.6</td>
      <td>engine_7.6_patch_7.6.2_to_7.6.3_2.sql</td>
      <td>Remove an incorrect index ACT_RU_JOB#ACT_IDX_JOB_HANDLER for MSSQL Server.</td>
      <td>MSSQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-7442">CAM-7442</a></td>
    </tr>
    <tr>
      <td>7.7</td>
      <td>engine_7.7_patch_7.7.3_to_7.7.4.sql</td>
      <td>Insert new startup.lock in ACT_GE_PROPERTY.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8162">CAM-8162</a></td>
    </tr>
    <tr>
      <td>7.7</td>
      <td>engine_7.7_patch_7.7.4_to_7.7.5_1.sql</td>
      <td>Add indices to improve performance of history cleanup</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8184">CAM-8184</a></td>
    </tr>
    <tr>
      <td>7.7</td>
      <td>engine_7.7_patch_7.7.4_to_7.7.5_2.sql</td>
      <td>Increase the field length of ACT_RU_AUTHORIZATION.RESOURCE_ID_</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8177">CAM-8177</a></td>
    </tr>
    <tr>
      <td>7.7</td>
      <td>engine_7.7_patch_7.7.5_to_7.7.6.sql</td>
      <td>Add indices to improve historic activity instance statistics</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8485">CAM-8485</a></td>
    </tr>
    <tr>
      <td>7.8</td>
      <td>engine_7.8_patch_7.8.0_to_7.8.1.sql</td>
      <td>Add indices to improve historic activity instance statistics. <strong>This is the same patch as engine_7.7_patch_7.7.5_to_7.7.6.sql</strong>.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8485">CAM-8485</a></td>
    </tr>
    <!-- ADD WHEN RELEASING 7.7.9
    <tr>
    <td>7.7</td>
      <td>engine_7.7_patch_7.7.8_to_7.7.9.sql</td>
      <td>Add indexes on Process Definition ID and End Time for Historic Process Instance and Historic Activity Instance</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8833">CAM-8833</a></td>
    </tr> -->
    <tr>
      <td>7.8</td>
      <td>engine_7.8_patch_7.8.4_to_7.8.5.sql</td>
      <td>Add indexes on Process Definition ID and End Time for Historic Process Instance and Historic Activity Instance.
      <!-- ADD WHEN RELEASING 7.7.9
      <strong>This is the same patch as engine_7.7_patch_7.7.8_to_7.7.9.sql</strong>. -->
      </td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-8833">CAM-8833</a></td>
    </tr>
  </tbody>
</table>


# Special Considerations

This section describes noteworthy changes between individual patch levels.

## 7.3.2 to 7.3.3

By default it is not possible anymore to pass arbitrary expressions as parameters of task queries.

Reason: Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated.

The process engine no longer evaluates these expressions by default and throws an exception instead. The pevious behavior can be re-enabled by setting the process configuration `enableExpressionsInAdhocQueries` to true.

See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.

## 7.6.10 to 7.6.11 / 7.7.5 to 7.7.6 / 7.8.0 to 7.8.1

### Java serialization format

You can now configure, if you forbid the usage of Java serialization format, when passing object variables in their Java serialized representation.

The new [configuration parameter `javaSerializationFormatEnabled`]({{< relref "reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}) 
defaults to `true`, but can be configured to `false` in Camunda engine configuration.

Following use cases are affected:

* REST API:

```json
PUT /process-instance/{id}/variables/{varName}

{
  "value" : "ab",
  "type" : "Object",
  "valueInfo" : {
    "objectTypeName": "com.example.MyObject",
    "serializationDataFormat": "application/x-java-serialized-object"
  }
}
``` 

* Java API:

```java
runtimeService.setVariable(processInstanceId, "varName",
        Variables
          .serializedObjectValue("ab")
          .serializationDataFormat("application/x-java-serialized-object")
          .objectTypeName("com.example.MyObject")
          .create());
```

You can disable Java serialization usage with the help of [this configuration parameter]({{< relref "reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}):

```xml
<property name="javaSerializationFormatEnabled">false</property>
```

### Groovy version

The pre-built Camunda distributions of versions 7.6.10, 7.7.5 and 7.8.0 ship with Groovy library of version 2.4.5, whereas newer versions come with Groovy 2.4.13. 
Please updade the library `groovy-all-$GROOVY_VERSION.jar` in the `lib` folder of your application server.


## 7.8.1. to 7.8.2 

### Restrict heatmap/statistics by time period  

In the historic process definition diagram it is possible to select time periods for which activity instance badges are displayed.

By default the displayed timer period is set to 'today' but can be extended to show badges of 'this week', 'this month' or the 'complete' history.   

This feature can be configured in two ways:

1. The default timer period can be changed to 'this week', 'this month' or 'complete'
2. The manual seletion of the time period within cockpit can be disabled.   

These attributes can be modifed in the [configuration file]({{< relref "webapps/cockpit/extend/configuration.md#historic-activity-instance-metrics" >}})
   
## 7.8.6 to 7.8.7

### History cleanup can be parallelized

As of v. 7.9.0, history cleanup can be parallelized, which leads to creation of several jobs in the database. For this reason:

* call to `HistoryService#cleanupHistoryAsync` does not guarantee to return correct Job object in return and you should not rely on the returned value any more.
 The same valid for REST call `POST /history/cleanup`
* `HistoryService#findHistoryCleanupJob` is deprecated (as well as `GET /history/cleanup/job`), one should use `HistoryService#findHistoryCleanupJobs` instead.
     
# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< relref "introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**. In this case you need to update the libraries and applications installed inside the application server.

Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down the server
* Exchange Camunda BPM libraries, tools and webapps (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide]({{< relref "installation/full/index.md" >}}) for your server.
* Restart the server

# Application With Embedded Process Engine

In case you use an embedded process engine inside your Java Application, you need to

1. update the Process Engine librarayin your dependency management (Apache MAven, Gradle ...),
2. re-package the application,
3. deploy the new version of the application.

# Standalone Webapplication Distribution

In case you installed the [Standalone Webapplication Distribution]({{< relref "introduction/downloading-camunda.md#download-the-runtime" >}}) you need to

1. undeploy the previous version of the webapplication,
2. deploy the new version of the webapplication.

# Applying Multiple Patches at Once

It is possible to apply multiple patches in one go (e.g., updateing from `7.1.0` to `7.1.4`).
