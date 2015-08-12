---

title: "Update to the next Minor Version"
weight: 10

menu:
  main:
    name: "Minor Version Update"
    identifier: "migration-guide-minor"
    parent: "migration-guide"
    pre: "Guides you through a minor version update (Example: `7.3` to `7.4`)"

---

This page gives an overview of how to perform a minor version update. This applies to any updates of the version number "after the first dot", example: `7.3` to `7.4`.

When performing such a version update, you should first read this guide and then read the specific guide for the update you want to perform. The specific update guide covers the following topics in detail:

* Database
* Process Engine (and plugins)
* Camunda web applications (and plugins)
* Process applications

{{< note title="Reading this Guide" class="info" >}}
Throughout this guide, a number of variables are used. These variables denote common path names and constants:

* `$DATABASE`: the target database platform, e.g., DB2, MySql, etc.
* `$DISTRIBUTION_PATH`: the path of the downloaded pre-packaged Camunda BPM distribution, e.g., `camunda-bpm-tomcat-$PLATFORM_VERSION.zip` or `camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz` for Tomcat.
* `$MINOR_VERSION`: the current minor version of the Camunda BPM platform you are currently using, e.g., `7.1`.
* `$NEW_MINOR_VERSION`: the next minor version of the Camunda BPM platform you want to upgrade to, e.g., `7.2`.
* `$PLATFORM_VERSION`: the version of the Camunda BPM platform you are currently using, e.g., `7.1.0`.
* `$NEW_PLATFORM_VERSION`: the version of the Camunda BPM platform you want to upgrade to, e.g., `7.2.0`

{{< /note >}}

**Getting Help:** If you have any trouble, ask for assistance in the [Forum](http://camunda.org/community/forum.html). As an enterprise customer, you can contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

# Overview

The general approach to migrate from one minor version to the next one involves the following steps:

1. [Download](http://camunda.org/download/) the pre-packaged distribution corresponding to the next minor version from the Camunda website, e.g., `camunda-bpm-tomcat-7.2.0.zip`. As an enterprise customer, use the [enterprise edition download](ref:/enterprise/#downloads) page instead.
2. Migrate your database using the SQL scripts packaged inside the `$DISTRIBUTION_PATH/sql/upgrade`.
3. Upgrade the Camunda libraries and web applications on your server.
4. Upgrade your process applications.

Depending if you are running Camunda BPM as a shared engine or an embedded one, it differs what you have to do during steps 3 and 4.
Check the concrete migration guide if there are any special steps you have to make.


# Update the Database

When updtating to the next minor version you need to update the database.

1. Check for [Available SQL Patch Scripts][patch-scripts] for your database that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before upgrading. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_$MINOR_VERSION_patch_$PLATFORM_VERSION_to_$NEW_PLATFORM_VERSION.sql`, e.g., `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql`.

2. Execute the corresponding upgrade scripts named

    * `$DATABASENAME_engine_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g., `db2_engine_7.1_to_7.2.sql`
    * `$DATABASENAME_identity_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g., `db2_identity_7.1_to_7.2.sql` 
 
    The scripts migrate the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.2.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

{{< note title="Locating SQL patch scripts" class="warning" >}}
Community users also have access to the SQL patch scripts from the enterprise version.
See [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
The scripts are stored inside the `camunda-sql-scripts-$NEW_PLATFOR_VERSION.jar`. Unzip the JAR-file and you are good to go.
{{< /note >}}

# Update Libraries and Applications

## Full Distribution

If you installed the [Full Distribution]({{< relref "user-guide/introduction/downloading-camunda.md#download-the-runtime" >}}) on an application server, you need to update the libraries and applications installed inside the application server. Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down the server
* Exchange Camunda BPM libraries, tools and webapps (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide]({{< relref "installation/full/index.md" >}}) for your server.
* Restart the server

## Custom Application with Embedded Process Engine

In case you use an embedded process engine inside your Java Application, you need to 

1. update the Process Engine librarayin your dependency management (Apache MAven, Gradle ...),
2. re-package the application,
3. deploy the new version of the application.

## Standalone Webapplication Distribution

In case you installed the [Standalone Webapplication Distribution]({{< relref "user-guide/introduction/downloading-camunda.md#download-the-runtime" >}}) you need to

1. undeploy the previous version of the webapplication,
2. deploy the new version of the webapplication.
