---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

If you migrate from a version < 7.2.5 you will have to execute the SQL script `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`, where `$DATABASE` corresponds to the database platform you use.

<div class="alert alert-warning">
<strong>Note</strong>: If you already migrated from 7.1 to 7.2 you probably executed the patch script <code>$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql</code>,
which is the same as patch <code>$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql</code> so you don't have to execute it again.
</div>

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.2_to_7.3.sql` and has to be executed next.
