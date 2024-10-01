---

title: 'Database Schema'
weight: 10
menu:
  main:
    identifier: "user-guide-process-engine-database-schema"
    parent: "user-guide-process-engine-database"

---

The database schema of the process engine consists of multiple tables.
The table names all start with ACT. The second part is a two-character
identification of the use case of the table. This use case will also roughly
match the service API.

* `ACT_RE_*`: `RE` stands for repository. Tables with this prefix contain 'static' information such as process definitions and process resources (images, rules, etc.).
* `ACT_RU_*`: `RU` stands for runtime. These are the runtime tables that contain the runtime data of process instances, user tasks, variables, jobs, etc. The engine only stores the runtime data during process instance execution and removes the records when a process instance ends. This keeps the runtime tables small and fast.
* `ACT_ID_*`: `ID` stands for identity. These tables contain identity information such as users, groups, etc.
* `ACT_HI_*`: `HI` stands for history. These are the tables that contain historical data such as past process instances, variables, tasks, etc.
* `ACT_GE_*`: General data, which is used in various use cases.

The main tables of the process engines are the entities of process definitions, executions, tasks, variables and
event subscriptions. Their relationship is shown in the following UML model.

{{< img src="../../img/database-schema.png" title="Database Schema" >}}


## Process Definitions (`ACT_RE_PROCDEF`)

The `ACT_RE_PROCDEF` table contains all deployed process definitions. It
includes information like the version details, the resource name or the
suspension state.


## Executions (`ACT_RU_EXECUTION`)

The `ACT_RU_EXECUTION` table contains all current executions. It includes
information like the process definition, parent execution, business key, the
current activity and different metadata about the state of the execution.


## Tasks (`ACT_RU_TASK`)

The `ACT_RU_TASK` table contains all open tasks of all running process
instances. It includes information like the corresponding process instance,
execution and also metadata such as creation time, assignee or due date.


## Variables (`ACT_RU_VARIABLE`)

The `ACT_RU_VARIABLE` table contains all currently set process or task
variables. It includes the names, types and values of the variables and
information about the corresponding process instance or task.


## Event Subscriptions (`ACT_RU_EVENT_SUBSCR`)

The `ACT_RU_EVENT_SUBSCR` table contains all currently existing event
subscriptions. It includes the type, name and configuration of the expected
event along with information about the corresponding process instance and
execution.

## Schema Log (`ACT_GE_SCHEMA_LOG`)

The `ACT_GE_SCHEMA_LOG` table contains a history of the database
schema version. New entries to the table are written when changes to
the database schema are made. On database creation the initial entry
is added. Every update script adds a new entry containing an `id`,
the `version` the database was updated to and the date and time 
(`timestamp`) of the update.

To retrieve entries from the schema log, the SchemaLogQuery-API can be
used:
```java
List<SchemaLogEntry> entries = managementService.createSchemaLogQuery().list();
```

## Metrics Log (ACT_RU_METER_LOG)

The `ACT_RU_METER_LOG` table contains a collection of runtime metrics that can help draw conclusions about usage, load
and performance of Camunda 7. Metrics are reported as numbers in the Java `long` range and count the occurrence of
specific events. Please find detailed information about how metrics are collected in the [Metrics User Guide]({{< ref "/user-guide/process-engine/metrics.md">}}).

The default configuration of the [MetricsReporter]({{< ref "/user-guide/process-engine/metrics.md#metrics-reporter">}}) will create one row per [metric]({{< ref "/user-guide/process-engine/metrics.md#built-in-metrics">}}) in `ACT_RU_METER_LOG` every 15 minutes.

{{< note title="Heads Up!" class="warning" >}}
If you are an enterprise customer, your license agreement might require you to report some metrics annually. Please store `root-process-instance-start`, `activity-instance-start`, `executed-decision-instances` and `executed-decision-elements` metrics for at least 18 months until they were reported.
{{< /note >}}

## Task Metrics Log (ACT_RU_TASK_METER_LOG)

The `ACT_RU_TASK_METER_LOG` table contains a collection of task related metrics that can help draw conclusions about usage, load
and performance of the BPM platform. Task metrics contain a pseudonymized and fixed-length value of task assignees and their time of appearance. Please find detailed information about how task metrics are collected in the [Metrics User Guide]({{< ref "/user-guide/process-engine/metrics.md">}}).

Every assignment of a task to an assignee will create one row in `ACT_RU_TASK_METER_LOG`.

{{< note title="Heads Up!" class="warning" >}}
If you are an enterprise customer, your license agreement might require you to report some metrics annually. Please store task metrics for at least 18 months until they were reported.
{{< /note >}}

# Entity Relationship Diagrams

{{< note title="" class="info" >}}
  The database is not part of the **public API**. The database schema may change for MINOR and MAJOR version updates.

  **Please note:**
  The following diagrams are based on the MySQL database schema. For other databases the diagram may be slightly different.
{{< /note >}}


The following Entity Relationship Diagrams visualize the database tables and their explicit foreign key constraints, grouped by Engine with focus on BPMN, Engine with focus on DMN, Engine with focus on CMMN, the Engine History and the Identity. Please note that the diagrams do not visualize implicit connections between the tables.


## Engine BPMN

{{< img src="../../img/erd_722_bpmn.svg" title="BPMN Tables" >}}


## Engine DMN

{{< img src="../../img/erd_722_dmn.svg" title="DMN Tables" >}}


## Engine CMMN

{{< img src="../../img/erd_722_cmmn.svg" title="CMMN Tables" >}}


## History

To allow different configurations and to keep the tables more flexible, the history tables contain no foreign key constraints.

{{< img src="../../img/erd_722_history.svg" title="History Tables" >}}


## Identity

{{< img src="../../img/erd_722_identity.svg" title="Identity Tables" >}}