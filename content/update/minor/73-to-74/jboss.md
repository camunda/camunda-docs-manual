---

title: "Update a JBoss Installation from 7.3 to 7.4"

menu:
  main:
    name: "JBoss"
    identifier: "migration-guide-73-jboss"
    parent: "migration-guide-73"

---

The following steps describe how to upgrade the Camunda artifacts on a JBoss AS
7 and Wildfly 8 server in a shared process engine setting. For the entire
procedure, refer to the [upgrade guide][upgrade-guide]. If not
already done, make sure to download the [Camunda BPM 7.4 JBoss distribution][jboss-distro]
or [Camunda BPM 7.4 Wildfly distribution][wildfly-distro]. In the following instructions
`$APP_SERVER` should be replaced with either `jboss` or `wildfly` depending on
the used application server.

The upgrade procedure takes the following steps:

...

<!-- TODO: define steps and describe in detail below -->

Whenever the instructions are to *replace* a module, make sure to delete the previous version of the module first to avoid orphan jars.

{{< note title="Upgraded Wildfly Version" class="info" >}}
The pre-built Camunda 7.4 distribution ships with Wildfly 8.2.1.Final, whereas 7.3 comes with Wildfly 8.2.0.Final.
The patch version of Wildfly contains some security bug fixes and component upgrades.
Camunda 7.4 is supported on Wildfly 8.1 and 8.2 such that an upgrade is not required when migrating from 7.3 to 7.4.

Should you want to upgrade Wildfly along with Camunda, perform the following steps either before or after upgrading Camunda:

* Copy all your Camunda-related modules from `$WILDFLY_HOME/modules` to the new Wildfly server's `module`-directory.
* Apply all modifications to Wildfly configuration files such as `standalone.xml` to the files located in the new Wildfly server's directory.
* Undeploy all process applications and copy them to the new Wildfly server's directory for redeployment.

See the [Wildfly 8.2.1.Final release notes](https://issues.jboss.org/secure/ReleaseNote.jspa?projectId=12313721&version=12327667) for any relevant changes compared to 8.2.0.Final.
{{< /note >}}


# 3. Configure Process Engines

## Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

## User Operation Log

The behavior of the [user operation log]({{< relref "user-guide/process-engine/history.md#user-operation-log" >}}) has changed, so that operations are only logged if they are performed in the context of a logged in user. This behavior can be toggled in the process engine configuration using the property `restrictUserOperationLogToAuthenticatedUsers` (default `true`). To restore the engine's prior behavior, i.e. to write log entries regardless of user context, set the flag to `false`.

Furthermore, with 7.4 task events are only logged when they occur in the context of a logged in user. Task events are accessible via the deprecated API `TaskService#getTaskEvents`. If you rely on this API method, the previous behavior can be restored by setting the flag `restrictUserOperationLogToAuthenticatedUsers` to `false`.

[upgrade-guide]: {{< relref "update/minor/73-to-74/index.md" >}}
[jboss-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/
[wildfly-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/
