---

title: 'Upgrade SQL Scripts'
category: 'SQL Scripts'

---

Camunda BPM as Open Source project provides SQL upgrade scripts for all supported databases to migrate between minor versions.
These scripts contain all necessary schema changes to upgrade the existing schema of the previous minor version to the following minor version.

### Development
The `upgrade` scripts contain all necessary logic to create the required schema for the Engine and Identity mechanism. This includes the creation and deletion of tables, foreign keys and indexes.

### Naming Convention
The naming convention for creating a `upgrade` script is:

```
${database_type}_${purpose}_${old_minor_version}_to_${new_minor_version}.sql
```

where `${purpose}` in this case denotes what is affected when you execute the script. Currently there is only `engine` as purpose. 
The placeholders `${old_minor_version}` and `${new_minor_version}` describe the minor versions.  

Example: `db2_engine_7.2_to_7.3.sql` or `mysql_engine_7.1_to_7.2.sql`.

### Testing
The upgrade scripts are tested using the [database upgrade](https://github.com/camunda/camunda-bpm-platform/tree/master/qa/test-db-upgrade) project.
During the execution of the project these things are done:

1. Creation of the database tables with the create scripts of the previously released minor version. Eg. the database create scripts of 7.2.0.
2. The schema will then be patched by applying all released patch scripts for the previously released minor version.
3. Then the upgrade scripts will be applied to the schema. This migrates the schema to the next minor version, eg. 7.3.0.
4. Afterwards all available patch scripts for the newest minor version will be applied, except those which are already present in the previous minor version. 
This situation happens when the same sql patch script is available for eg. 7.2 and 7.3 minor versions.
5. Then the engine testsuite of the current minor version is run against the migrated and patched database schema.
6. At last the database schema is dropped by using the database drop scripts from the current minor version.

### Location
The source files can be found [here](https://github.com/camunda/camunda-bpm-platform/tree/master/distro/sql-script/upgrade).