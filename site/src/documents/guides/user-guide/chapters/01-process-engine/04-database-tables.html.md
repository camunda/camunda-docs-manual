---

title: 'Database Scheme'
category: 'Process Engine'

---

The database scheme of the process engine consists of multiple tables.
The table names all start with ACT. The second part is a two-character
identification of the use case of the table. This use case will also roughly
match the service API.

* `ACT_RE_*`: `RE` stands for repository. Tables with this prefix contain 'static' information such as process definitions and process resources (images, rules, etc.).
* `ACT_RU_*`: `RU` stands for runtime. These are the runtime tables, that contain the runtime data of process instances, user tasks, variables, jobs, etc. The engine only stores the runtime data during process instance execution, and removes the records when a process instance ends. This keeps the runtime tables small and fast.
* `ACT_ID_*`: `ID` stands for identity. These tables contain identity information, such as users, groups, etc.
* `ACT_HI_*`: `HI` stands for history. These are the tables that contain historic data, such as past process instances, variables, tasks, etc.
* `ACT_GE_*`: general data, which is used in various use cases.

The main tables of the process engines are the entities of process definitions, executions, tasks, variables and
event subscriptions. Their relationship is show in the following ER model.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/database-scheme.png"/></center>

### Process Definitions (`ACT_RE_PROCDEF`)

The `ACT_RE_PROCDEF` table contains all deployed process definitions. It
includes information like the version information, the resource name or the
suspension state.

### Executions (`ACT_RU_EXECUTION`)

The `ACT_RU_EXECUTION` table contains all current executions. It includes
informations like the process definition, parent execution, business key, the
current activity and different metadata about the state of the execution.

### Tasks (`ACT_RU_TASK`)

The `ACT_RU_TASK` table contains all open task of all running process
instances. It includes information like the corresponding process instance and
execution and also metadata as creation time, assignee or due date.

### Variables (`ACT_RU_VARIABLE`)

The `ACT_RU_VARIABLE` table contains all currently set process or task
variables. It includes the name, type and value of the variable and
information about the corresponding process instance or task.

### Event Subscriptions (`ACT_RU_EVENT_SUBSCR`)

The `ACT_RU_EVENT_SUBSCR` table contains all currently existing event
subscriptions.  It includes the type, name and configuration of the expected
event together with information about the corresponding process instance and
execution.
