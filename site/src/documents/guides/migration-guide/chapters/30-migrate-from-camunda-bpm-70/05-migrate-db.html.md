---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.0 to 7.1'

---


For migration from **Camunda BPM 7.0** to **Camunda BPM 7.1**, the provided upgrade scripts have to be executed that match your database.
With a pre-packaged distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version if there are any.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.0_to_7.1.sql` and has to be executed next.
