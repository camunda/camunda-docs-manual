---

title: "Update from 7.0 to 7.1"
weight: 120

menu:
  main:
    name: "7.0 to 7.1"
    identifier: "migration-guide-70"
    parent: "migration-guide-minor"
    pre: "Update from `7.0.x` to `7.1.0`."

---

<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
   Throughout this guide we will use a number of variables to denote common path names and constants:
  <ul>
    <li><code>$DATABASE</code> expresses the target database platform, e.g., DB2, MySql, etc.</li>
    <li><code>$DISTRIBUTION_PATH</code> represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g., <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code> for Tomcat etc.</li>
    <li><code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install, e.g., <code>7.1.0</code>.</li>
  </ul>
</div>

# Migrate your Database

For migration from **Camunda BPM 7.0** to **Camunda BPM 7.1**, the provided upgrade scripts that match your database have to be executed.
With a pre-packaged distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

Check for [available database patch scripts]({{< relref "update/patch-level.md#database-patches" >}}) for an overview of available sql patch scripts  to see if there are any for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.0_to_7.1.sql` and has to be executed next.


# Migrate your Process Application

To migrate your process application from Camunda BPM 7.0 to Camunda BPM 7.1, you need to follow these steps:

*   If you use `@Inject` with TaskForm, you have to add a `@Named("...")` annotation to the `@Inject` annotation due to backward-compatibility of `camunda.taskForm`.
  There you have two choices: If you are using `camunda.taskForm` in your process application and don't want to update all your jsf pages and beans you should use `@Named("camunda.taskForm")`,
  otherwise you should use `@Named("camundaTaskForm")`. Your application server should write an error or a warning if you use the wrong one. So be careful! However, we recommend that you use the annotation `@Named("camundaTaskForm")`.

In case you have to migrate (upgrade) the version of running process instances, we provide more information in our [User Guide](ref:/guides/user-guide/#process-engine-process-versioning-version-migration).


# Migrate the Server

## JBoss AS 7.1.3 to 7.2.0

### Upgrade the JBoss application server

Camunda BPM 7.1 ships with a new version of the JBoss AS 7, namely, 7.2.0.
The preferred upgrade steps are:

* copy all your custom modules / subsystems to the new JBoss server directory
* re-add all your custom modifications from the existing `$CAMUNDA_HOME/standalone/configuration/standalone.xml` to the new one located in the new JBoss server directory.
* copy all deployed datasources to the new JBoss server directory
* undeploy all process applications and copy them to the new JBoss server directory for redeployment
