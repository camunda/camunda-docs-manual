---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.1 to 7.2'

---

For migration from **Camunda BPM 7.1** to **Camunda BPM 7.2**, the provided upgrade scripts have to be executed that match your database. With a pre-built distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

If you migrate from a version < 7.1.4 or have not previously executed the 7.1.5 patch script, you have to execute the SQL script `$DATABASE_engine_7.1_patch_7.1.4_to_7.1.5.sql` first, where `$DATABASE` corresponds to the database platform you use.

If you migrate from a version < 7.1.10 you will have to execute the SQL script `$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql`.

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available sql patch scripts for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.1_to_7.2.sql` and has to be executed next.