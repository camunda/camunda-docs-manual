---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.0 to 7.1'

---


For migration from **Camunda BPM 7.0** to **Camunda BPM 7.1**, the provided upgrade scripts have to be executed that match your database.
With a pre-built distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available sql patch scripts for your current version if there are any.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.0_to_7.1.sql` and has to be executed next.

For migration from **Camunda BPM 7.0** to **Camunda BPM 7.1** we recommend you to take a look at our migration scripts located in the `$DISTRIBUTION_PATH/sql/upgrade` folder of your downloaded pre-packaged distribution.
To perform the migration of your database choose the corresponding upgrade script `$DATABASE_engine_7.0_to_7.1` according to your database platform and run it.