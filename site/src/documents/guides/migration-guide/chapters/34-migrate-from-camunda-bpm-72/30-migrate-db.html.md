---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

If you migrate from a version < 7.2.5 you will have to execute the SQL script `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`, where `$DATABASE` corresponds to the database platform you use.

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available sql patch scripts for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.2_to_7.3.sql` and has to be executed next.
