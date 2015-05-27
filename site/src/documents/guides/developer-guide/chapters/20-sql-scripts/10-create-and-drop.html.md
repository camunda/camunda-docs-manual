---

title: 'Create and Drop SQL Scripts'
category: 'SQL Scripts'

---

The Camunda Engine uses SQL databases as storage backend so it is necessary to develop the data definition language (DDL) for each supported database type like DB2 etc.

### Development
The `create` and `drop` scripts contain all necessary logic to create the required schema for the Engine and Identity mechanism. This includes the creation and deletion of tables, foreign keys and indexes.

### Naming convention
The naming convention for creating a `create`/`drop` script is:

```
activiti.${database_type}.create.${purpose}.sql
```

where `${database_type}` is something like db2, h2, etc. The `${purpose}` describes the goal of the sql script when it is executed. 
For example `engine` as purpose denotes the creation of the necessary runtime engine tables.
All this applies for `drop` scripts too. The only exception is instead of`create`, `drop` is used.
A complete naming example for a create script: `activiti.db2.create.engine.sql`, for a drop script: `activiti.mssql.drop.history.sql`.

### Testing
The `create` and `drop` scripts are tested using the Engine [testsuite](https://github.com/camunda/camunda-bpm-platform/tree/master/engine/src/test/). The test suite is executed against all supported databases.
During the tests the scripts are executed through the engine to create the necessary tables before testing and dropping them afterwards.

### Location
The existing `create` and `drop` scripts for the Engine can be found [here](https://github.com/camunda/camunda-bpm-platform/tree/master/engine/src/main/resources/org/camunda/bpm/engine/db).