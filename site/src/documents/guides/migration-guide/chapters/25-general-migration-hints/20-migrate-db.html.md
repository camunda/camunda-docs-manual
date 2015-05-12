---

title: 'Upgrade your Database'
category: 'General migration hints for Camunda BPM'

---

When migrating your database to the next minor version you have to do the following:

1. Check for any existing patch scripts for your database [here] that are within the bounds of your upgrade path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 Execute them by version number ordering.
 The naming pattern is `$DATABASENAME_engine_$MINOR_VERSION_patch_$PLATFORM_VERSION_to_$NEW_PLATFORM_VERSION.sql`, e.g. `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql`.

2. Execute the corresponding upgrade scripts named
 * `$DATABASENAME_engine_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g. `db2_engine_7.1_to_7.2.sql`
 * `$DATABASENAME_identity_$MINOR_VERSION_to_$NEW_MINOR_VERSION.sql`, e.g. `db2_identity_7.1_to_7.2.sql`

 The scripts migrate the database from one minor version to the next one and change the underlying database structure so make sure to backup your database in case there are any failures during the upgrade process.

3. Check for any existing patch scripts for your database that are within the bounds of the new minor version you are upgrading to and execute them in the version number order.
 _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g. `7.2.X` where `X > 0`.
 The procedure is the same as in step 1, only for the new minor version.

<div class="alert alert-info">
  <strong>SQL patch scripts</strong><br>
  Community users also have access to the SQL patch scripts from the enterprise version. See <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/">Camunda Nexus</a>.
  The scripts are stored inside the `camunda-sql-scripts-$NEW_PLATFOR_VERSION.jar`. Unzip the JAR-file and you are good to go.
</div>

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version.

[here]: ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts
