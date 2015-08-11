---

title: "Update to the next Minor Version"
weight: 10

menu:
  main:
    name: "Minor Version Update"
    identifier: "migration-guide-minor"
    parent: "migration-guide"
    pre: "Guides you through a minor version update (Example: <code>7.3</code> to <code>7.4</code>)"

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


# Upgrade the Database

When migrating your database to the next minor version, you have to do the following:

1. Check for any existing patch scripts for your database [here] that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before upgrading. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_$MINOR_VERSION_patch_$PLATFORM_VERSION_to_$NEW_PLATFORM_VERSION.sql`, e.g., `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql`.

2. Execute the corresponding upgrade scripts named
 * `$DATABASENAME_engine_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g., `db2_engine_7.1_to_7.2.sql`
 * `$DATABASENAME_identity_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g., `db2_identity_7.1_to_7.2.sql`

 The scripts migrate the database from one minor version to the next one and change the underlying database structure, so make sure to backup your database in case there are any failures during the upgrade process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to. Execute them in ascending order by version number.
 _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.2.X` where `X > 0`.
 The procedure is the same as in step 1, only for the new minor version.

<div class="alert alert-info">
  <strong>SQL patch scripts</strong><br>
  Community users also have access to the SQL patch scripts from the enterprise version. See <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/">Camunda Nexus</a>.
  The scripts are stored inside the `camunda-sql-scripts-$NEW_PLATFOR_VERSION.jar`. Unzip the JAR-file and you are good to go.
</div>

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version.

[here]: ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts


# Upgrade a Server Installation

Depending on the scenario in which the Camunda BPM platform is deployed, you have to adjust the upgrade process.
Please note that the following procedure may differ for cluster scenarios.
As an enterprise customer, you can contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

When upgrading a shared or embedded engine, at least the following steps have to be done.

# Shared Process Engine

* Shut down your application server.
* Exchange Camunda BPM libraries, tools and web applications (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide](ref:/guides/installation-guide/) for your server.
* Restart your application server.

# Embedded Process Engine

* Upgrade the Camunda-related dependencies in your WAR / EAR artifact.
* Rebuild and redeploy it.