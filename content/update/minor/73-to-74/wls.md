---

title: "Update an Oracle Weblogic Installation from 7.3 to 7.4"

menu:
  main:
    name: "Weblogic"
    identifier: "migration-guide-73-weblogic"
    parent: "migration-guide-73"

---

The following steps describe how to upgrade the Camunda artifacts on an Oracle WebLogic application server in a shared process engine setting. For the entire procedure, refer to the [upgrade guide][upgrade-guide]. If not already done, make sure to download the [Camunda BPM 7.3 Oracle WebLogic distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/weblogic/camunda-bpm-weblogic/).

The upgrade procedure takes the following steps:

...

<!-- TODO: define steps and describe in detail below -->

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

# 3. Configure Process Engines

## Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

[migration-guide]: {{< relref "update/minor/73-to-74/index.md" >}}
