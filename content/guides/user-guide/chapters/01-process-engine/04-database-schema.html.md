---

title: 'Database Schema'
category: 'Process Engine'

---

The database schema of the process engine consists of multiple tables.
The table names all start with ACT. The second part is a two-character
identification of the use case of the table. This use case will also roughly
match the service API.

* `ACT_RE_*`: `RE` stands for repository. Tables with this prefix contain 'static' information such as process definitions and process resources (images, rules, etc.).
* `ACT_RU_*`: `RU` stands for runtime. These are the runtime tables, that contain the runtime data of process instances, user tasks, variables, jobs, etc. The engine only stores the runtime data during process instance execution, and removes the records when a process instance ends. This keeps the runtime tables small and fast.
* `ACT_ID_*`: `ID` stands for identity. These tables contain identity information, such as users, groups, etc.
* `ACT_HI_*`: `HI` stands for history. These are the tables that contain historical data, such as past process instances, variables, tasks, etc.
* `ACT_GE_*`: general data, which is used in various use cases.

The main tables of the process engines are the entities of process definitions, executions, tasks, variables and
event subscriptions. Their relationship is show in the following UML model.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/database-schema.png"/></center>

### Process Definitions (`ACT_RE_PROCDEF`)

The `ACT_RE_PROCDEF` table contains all deployed process definitions. It
includes information like the version details, the resource name or the
suspension state.

### Executions (`ACT_RU_EXECUTION`)

The `ACT_RU_EXECUTION` table contains all current executions. It includes
informations like the process definition, parent execution, business key, the
current activity and different metadata about the state of the execution.

### Tasks (`ACT_RU_TASK`)

The `ACT_RU_TASK` table contains all open tasks of all running process
instances. It includes information like the corresponding process instance and
execution and also metadata as creation time, assignee or due date.

### Variables (`ACT_RU_VARIABLE`)

The `ACT_RU_VARIABLE` table contains all currently set process or task
variables. It includes the names, types and values of the variables and
information about the corresponding process instance or task.

### Event Subscriptions (`ACT_RU_EVENT_SUBSCR`)

The `ACT_RU_EVENT_SUBSCR` table contains all currently existing event
subscriptions.  It includes the type, name and configuration of the expected
event along with information about the corresponding process instance and
execution.


## Entity Relationship Diagrams

<div class="alert alert-warning">
      <strong>Heads-Up:</strong>
      The database is not part of the <strong>public API</strong>. The database schema may change for MINOR and MAJOR version updates.
      <br>
      <br>
      <strong>Please note:</strong>
      The following diagrams are based on the oracle database schema. For other databases the diagram may be slightly different.
</div>

The following Entity Relationship Diagrams visualize the database tables and their explicit foreign key constraints grouped by Engine with focus on BPMN, Engine with focus on CMMN, the Engine History and the Identity. Please note that the diagrams do not visualize implicit connections between the tables.

*Example*
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/guides/user-guide/assets/img/erd_example.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
      <ul>
        <li>foreign keys are displayed as arrow from one entity to the other</li>
        <li>the arrow label describes the name of the foreign key and the database filed name in brackets</li>
        <li>the database filed name is marked with a green arrow in the table box</li>
      </ul>
  </div>
</div>


### Engine BPMN

<img data-img-thumb src="ref:asset:/guides/user-guide/assets/img/erd_oracle_73_bpmn.svg" />

### Engine CMMN

<img data-img-thumb src="ref:asset:/guides/user-guide/assets/img/erd_oracle_73_cmmn.svg" />

### History

To allow different configurations and to keep the tables more flexible, the history tables contain no foreign key constraints.

<img data-img-thumb src="ref:asset:/guides/user-guide/assets/img/erd_oracle_73_history.svg" />

### Identity

<img data-img-thumb src="ref:asset:/guides/user-guide/assets/img/erd_oracle_73_identity.svg" />
