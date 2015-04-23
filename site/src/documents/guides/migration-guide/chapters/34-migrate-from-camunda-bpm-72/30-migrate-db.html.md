---

title: 'Migrate your Database'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---
If you migrate from a version < 7.2.5 you will have to execute the SQL script `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`, where `$DATABASE` corresponds to the database platform you use.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.2_to_7.3.sql` and has to be executed next.
