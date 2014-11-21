---

title: 'Migrating an Embedded Process Engine Setting'
category: 'Migrate from camunda BPM 7.1 to 7.2'

---

When migrating a camunda BPM embedded engine, i.e. a process engine that is managed entirely within an application and bound to that application's lifecycle, the following steps are required:

1. Database upgrade
2. Configure process engines (*optional*)
3. Upgrade camunda dependencies

Prerequisites:

* Before starting, make sure that you have downloaded the camunda BPM 7.2 distribution for the application server you use. It contains the SQL scripts required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## 1. Database upgrade

For migration from **camunda BPM 7.1** to **camunda BPM 7.2**, the provided upgrade scripts have to be executed that match your database. With a pre-built distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

If you migrate from a version < 7.1.4 or have not previously executed the 7.1.5 patch script, you have to execute the SQL script `$DATABASE_engine_7.1_patch.sql` first, where `$DATABASE` corresponds to the database platform you use.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.1_to_7.2.sql` and has to be executed next.

## 2. Configure Process Engines

This section describes a change in the engine's default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful upgrade.

#### Script Variable Storing

As of 7.2, the default behavior of script variables has changed. Script variables are set in e.g. a BPMN Script Task that uses a language such as JavaScript or Groovy. In previous versions, the process engine automatically stored all script variables as process variables. Starting with 7.2, this behavior has changed and the process engine does not automatically store script variables any longer. You can re-enable the legacy behavior by setting the boolean property `autoStoreScriptVariables` to `true` in your process engines' configurations. Depending on your scenario, this may involve updating a `camunda.cfg.xml` file, a `processes.xml` file or a programmatic configuration. For example, in a `camunda.cfg.xml` file, the property can be set as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
  ...
  <process-engine name="default">
    ...
    <properties>
      ... existing properties ...
      <property name="autoStoreScriptVariables">true</property>
    </properties>
    ...
  </process-engine>
  ...
</bpm-platform>
```

As an alternative, script code can be migrated by replacing all implicit declarations of process variables in scripts with an explicit call to `execution.setVariable('varName', 'value')`.


## 3. Upgrade Camunda Dependencies

Upgrade the dependencies declared in your application's pom.xml file to the new camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.
