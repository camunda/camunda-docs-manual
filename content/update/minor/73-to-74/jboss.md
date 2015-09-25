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

...

<!-- TODO: a note about Wildfly versions as in the 7.2 to 7.3 guide? -->


# 3. Configure Process Engines

## Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

[upgrade-guide]: {{< relref "update/minor/73-to-74/index.md" >}}
[jboss-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/
[wildfly-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/
