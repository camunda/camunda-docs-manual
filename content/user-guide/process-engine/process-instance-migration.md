---

title: 'Process Instance Migration'
weight: 115

menu:
  main:
    identifier: "user-guide-process-engine-process-instance-migration"
    parent: "user-guide-process-engine"

---

Whenever a new version of a process definition is deployed, existing process instances that run
on previous versions are not affected. That means, the new process definition does not apply
to them automatically. If process instances are supposed to continue execution on a different process
definition, the *process instance migration* API can be employed.

Migration consists of two parts:

1. Creating a *migration plan* that describes how process instances are to be migrated from one
process definition to another
2. Applying the migration plan to a set of process instances

A migration plan consists of a set of *migration instructions* that in essence are mappings between
activities of the two process definitions. In particular, it maps an activity of the *source process definition*,
i.e., the definition process instances are migrated from, to an activity of the *target process definition*,
i.e., the definition process instances are migrated to. A migration instruction ensures that an instance of the source
activity is migrated into an instance of the target activity. A migration plan is complete when there are instructions for
all active source activities.

The following process models are used to illustrate the API and effects of migration unless otherwise noted:

Process `exampleProcess:1`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example1"></div>

Process `exampleProcess:2`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example2"></div>


# Process Instance Migration by Example

We can define a migration plan using the API entrance point `RuntimeService#createMigrationPlan`.
It returns a fluent builder to create a migration plan. For our example, the code looks like:

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapActivities("assessCreditWorthiness", "assessCreditWorthiness")
  .mapActivities("validateAddress", "validatePostalAddress")
  .mapActivities("archiveApplication", "archiveApplication")
  .build();
```

The `mapActivities` invocations each specify a migration instruction and express that instances
of the first activity should become instances of the second activity.

Let us assume that we have a process instance in the following activity instance state:

```
ProcessInstance
├── Archive Application
└── Assess Credit Worthiness
    └── Validate Address
```

In order to migrate this process instance according to the defined migration plan, the API method
`RuntimeService#newMigration` can be used:

```java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .execute();
```

The resulting activity instance state is:

```
ProcessInstance
├── Handle Application Receipt
│   └── Archive Application
└── Assess Credit Worthiness
    └── Validate Postal Address
```

The following things have happened:

* An instance of the embedded subprocess *Handle Application Receipt* was added to reflect the new sub process in `exampleProcess:2`
* The activity instances for *Archive Application*, *Assess Credit Worthiness*, and *Validate Postal Address* have been migrated

What does the second point mean in particular? Since there is a migration instruction for these activity instances they are
migrated. The entities that comprise this instance are updated to reference the new activity and process definition. Besides that, activity instances, task instances and
variable instances are preserved.

Before migration, there was a task instance
in the tasklist of an accountant to perform the *Validate Address* activity. After migration, the same task instance still exists and can be completed
successfully. It still has the same properties such as assignee or name.
From the accountant's perspective, migration is completely transparent while working on a task.


# API

The following gives a structured overview of the Java API for process instance migration. Note that these operations are also available
via [REST]({{< relref "reference/rest/migration/index.md" >}}).

## Creating a Migration Plan

A migration plan can be created by using the API `RuntimeService#createMigrationPlan`.
It defines how migration should be performed.
A migration plan contains the IDs of the source and target process definition
as well as a list of migration instructions. A migration instruction is a mapping from activities in
the source process definition to activities in the target process definition.

For example, the following code creates a valid migration plan:

```Java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapActivities("assessCreditWorthiness", "assessCreditWorthiness")
  .mapActivities("validateAddress", "validatePostalAddress")
  .build();
```

All activities can be mapped. Migration instructions must map between activities of the same type.

Supported activity relationships are:

* One-to-one relation

A migration plan is *validated after creation* to detect migration
instructions that are not supported by the process engine. See the [chapter on
creation time validation]({{< relref "#creation-time-validation" >}}) for details.

In addition, a migration plan is *validated before execution* to ensure that it can be applied to a specific process instance. For example,
migration instructions for some activity types are only supported for transition instances (i.e., active asynchronous continuations) but not for
activity instances. See the [chapter on execution time validation]({{< relref "#execution-time-validation" >}}) for details.


### One-to-One Relation Instruction

```java
MigrationPlanBuilder#mapActivities(String sourceActivityId, String targetActivityId)
```

Defining a one-to-one relation instruction means that an instance of the source activity
is migrated into an instance of the target activity. Activity instance, task instance and variable
instance state is preserved when migration is executed.


### Updating Event Triggers

When migrating events, it is possible to decide whether the corresponding event
triggers should be updated or not.  See the [BPMN-specific considerations on
events]({{< relref "#events" >}}) for details. When generating a migration
plan, it is possible to define this setting for generated instructions between
events by using the method `updateEventTrigger`.  For example, the following
code generates a migration instruction for a boundary event and updates its
event trigger during migration.

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapActivities("userTask", "userTask")
  .mapActivities("boundary", "boundary")
    .updateEventTrigger()
  .build();
```


## Generating a migration plan

In addition to manually specifying all migration instructions, the `MigrationPlanBuilder`
is able to generate migration instructions for all *equal* activities in the source
and target process definitions. This can reduce the effort for creating a migration
to only those activities that are not equal.

Equality of a pair of activities is defined as follows:

* They are of the same activity type
* They have the same ID
* They belong to the same scope, i.e., their parent BPMN scopes are equal according to this definition.
  Process definitions are always equal.

For example, consider the following code snippet:

```Java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapEqualActivities()
  .mapActivities("validateAddress", "validateProcessAddress")
  .build();
```

It creates generated migration instructions for the equal activities
`assessCreditWorthiness`. It adds an additional mapping from `validateAddress` to `validateProcessAddress`.

### Updating Event Triggers

Like for individual instructions, it is possible to specify the event trigger update flag
for generated migration instructions by using the `updateEventTriggers` method.
This is equal to calling `updateEventTrigger` on all event migration instructions
which are generated.

```Java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapEqualActivities()
  .updateEventTriggers()
  .build();
```


## Executing a migration plan

Migration plans can be applied to a set of process instances of the source process
definition by using the API Method `RuntimeService#newMigration`.

The migration can either be executed synchronously (blocking) or asynchronously
(non-blocking) using a [batch][].

The following are some reasons to prefer either one or the other:

- Use synchronous migration if:
  - the number of process instances is small
  - the migration should be atomic, i.e., it should be executed
    immediately and should fail if at least one process instance cannot
    be migrated


- Use asynchronous migration if:
  - the number of process instances is large
  - all process instances should be migrated decoupled from the other
    instances, i.e., every instance is migrated in its own transaction
  - the migration should be executed by another thread, i.e., the job
    executor should handle the execution


### Selecting process instances to migrate

Process instances can be selected for migration by either providing a set of process instance IDs
or providing a process instance query. It is also possible to specify both, a list of process instance IDs and a query.
The process instances to be migrated will then be the union of the resulting sets.

#### List of process instances

The process instances which should be migrated by a migration plan can either
be specified as a list of the process instance IDs:

```Java
MigrationPlan migrationPlan = ...;

List<String> processInstanceIds = ...;

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .execute();
```

For a static number of process instances, there is a convenience varargs method:

```Java
MigrationPlan migrationPlan = ...;

ProcessInstance instance1 = ...;
ProcessInstance instance2 = ...;

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(instance1.getId(), instance2.getId())
  .execute();
```

#### Process Instance Query

If the instances are not known beforehand, the process instances can be selected by a process instance query:

```Java
MigrationPlan migrationPlan = ...;

ProcessInstanceQuery processInstanceQuery = runtimeService
  .createProcessInstanceQuery()
  .processDefinitionId(migrationPlan.getSourceProcessDefinitionId());

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceQuery(processInstanceQuery)
  .execute();
```


### Skipping Listeners and Input/Output Mappings

During migration, activity instances may end or new activity instances may emerge.
Per default, their activities' execution listeners and input/output mappings
are going to be invoked as appropriate. This may not always be the desired behavior.

For example, if an execution listener expects the existence of a variable to function
properly but that variable does not exist in instances of the source process definition,
then skipping listener invocation can be useful.

In the API, the two methods `#skipCustomListeners` and `#skipIoMappings`
can be used for this purpose:

```Java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .skipCustomListeners()
  .skipIoMappings()
  .execute();
```

### Synchronous migration execution

To execute the migration synchronously, the `execute` method is used. It will
block until the migration is completed.

```Java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .execute();
```

Migration is successful if all process instances can be migrated. Confer the
[chapter on validation]({{< relref "#validation" >}}) to learn which kind of validation is performed before
a migration plan is executed.


### Asynchronous batch migration execution

To execute the migration asynchronously, the `executeAsync` method is used. It will
return immediately with a reference to the batch which executes the migration.

```Java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

Batch batch = runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .executeAsync();
```

Using a batch, the process instance migration is split into several jobs which
are executed asynchronously. These batch jobs are executed by the job executor.
See the [batch][] section for more information. A batch is completed if all
batch execution jobs are successfully completed. However, in contrast to the
synchronous migration, it is not guaranteed that either all or no process
instances are migrated. As the migration is split into several independent jobs,
every single job may fail or succeed.

If a migration job fails, it is retried by the job executor
and if no retries are left, an incident is created. In this case, manual action
is necessary to complete the batch migration: The job's retries can be incremented
or the job can be deleted. Deletion cancels migration of the specific instance but
does not affect the batch beyond that.

#### Batch migration in a heterogeneous cluster

As described in the [job executor][] section of the user guide, the process engine
can be used in a heterogeneous cluster where deployments are unevenly distributed across cluster nodes.
The *deployment-aware* job executor only executes jobs for deployments registered with it.
In a heterogeneous cluster, this avoids problems with accessing deployment resources.

When executing a migration batch, the batch execution jobs are therefore restricted
to the job executor that has a registration for the deployment of the source
process definition. This introduces the requirement that
source and target deployment are registered with the same job executor or else
migration may fail when executing custom code (e.g., execution listeners) in the context
of the target process. Note that it is also possible to
[skip the execution of custom code](#skipping-listeners-and-input-output-mappings)
during migration.

# BPMN-specific API and Effects

Depending on the type of the activities a process model contains, migration has varying effects.

## Tasks

### User Task

When a user task is migrated, all properties of the task instance (i.e., `org.camunda.bpm.engine.task.Task`) are preserved apart
from the process definition id. The task is not reinitialized: Attributes like assignee or name do not change.

### Receive Task

A receive task defines a persistent event trigger that can be updated or preserved during migration.
The considerations for [intermediate catch events]({{< relref "#events" >}}) apply here as well.

### External Task

When an active [external task]({{< relref "external-tasks.md" >}}) is migrated, all properties of the external task instance (i.e., `org.camunda.bpm.engine.externaltask.ExternalTask`) are preserved
apart from activity id, process definition key, and process definition id. In particular, this means that attributes like topic and lock state do not change.

It is possible to map activities that are implemented as external tasks to each other even if they have different types. For example, an external send task can be mapped to an external service task.

## Gateways

### Inclusive & Parallel Gateway

Instances of inclusive and parallel gateways represent waiting tokens before the gateway is able to trigger.
They can be migrated to a gateway of the same type in the target process by supplying a migration instruction.

In addition, the following conditions must hold:

* The target gateway must have at least the same number of incoming sequence flows as the source gateway
* There must be a valid migration instruction for the scope in which the gateway is contained in
* At most one gateway of the source process definition can be mapped to every gateway in the target process definition

### Event-based Gateway

To migrate an event-based gateway instance, a migration instruction to another event-based gateway must be part of the migration plan.
In order to migrate the gateway's event triggers (event subscriptions, jobs), the events following to the gateway can be mapped as well.
See the [events section]({{< relref "#events" >}}) for the semantics of instructions between events.


## Events

For all kinds of catching events (start, intermediate, boundary), a migration instruction can be supplied if they define a persistent event
trigger. This is the case for message, timer, and signal events.

When mapping events, there are two configuration options:

1. **The event trigger remains the same**: Even if the target event defines a different trigger (e.g.,  changed timer configuration),
  the migrated event instance is triggered according to the source definition. This is the default behavior
  when calling `migrationBuilder.mapActivities("sourceTask", "targetTask")`
2. **The event trigger is updated**: The migrated event instance is triggered according to the target definition.
  This behavior can be specified by calling `migrationBuilder.mapActivities("sourceTask", "targetTask").updateEventTrigger()`

{{< note title="Timer Events" class="info" >}}
  Using `#updateEventTrigger` with a timer event does not take into account that a certain amount of time has already elapsed before migration.
  In consequence, the event trigger is reset according to the target event.

  Consider the following two processes where the configuration of the boundary event changes:

  Process `timerBoundary:1`:

  <div data-bpmn-diagram="../bpmn/process-instance-migration/example-boundary-timer1"></div>

  Process `timerBoundary:2`:

  <div data-bpmn-diagram="../bpmn/process-instance-migration/example-boundary-timer2"></div>

  Specifying the instruction `migrationBuilder.mapActivities("timer", "timer").updateEventTrigger()` is going to reinitialize the timer job.
  In effect, the boundary event fires ten days after migration. In contrast, if `updateEventTrigger` is not used, then the
  timer job configuration is preserved. In effect, it is going to trigger five days after the activity was started regardless of when the migration is performed.
{{< /note >}}


### Boundary Event

Boundary events can be mapped from the source to the target process definition along with the activity that they are attached to. The following applies:

* If a boundary event is mapped, its persistent event trigger (for timers, messages, and signals) is migrated
* If a boundary event in the source process definition is not mapped, then its event trigger is deleted during migration
* If a boundary event of the target definition is not the target of a migration instruction, then a new event trigger is initialized during migration


### Start Event

Start events of event sub processes can be mapped from source to target with similar semantics as boundary events. In particular:

* If a start event is mapped, its persistent event trigger (for timers, messages, and signals) is migrated
* If a start event in the source process definition is not mapped, then its event trigger is deleted during migration
* If a start event of the target definition is not the target of a migration instruction, then a new event trigger is initialized during migration


### Intermediate Catch Event

Intermediate catch events must be mapped if a process instance is waiting for that event during migration.


### Compensation Event

#### Migrating Compensation Events

When migrating process instances with active compensation subscriptions, the following rules apply:

* The corresponding compensation catch events must be mapped
* After migration, compensation can be triggered from the same migrated scope as before migration or its closest migrated ancestor
* In order to preserve the variable snapshots of parent scopes, those scopes must be mapped as well.

Process instances with active compensation subscriptions can be migrated by mapping the corresponding catching compensation events.
This tells the migration API which compensation handler of the source process model corresponds to which handler in the target process model.

Consider this source process:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation5"></div>

And this target process:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation6"></div>

Assume a process instance in the following state:

```
ProcessInstance
└── Assess Credit Worthiness
```

The process instance has a compensation subscription for *Archive Application*. A valid migration plan must
therefore contain a mapping for the compensation boundary event. For example:

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("compensationProcess:1", "compensationProcess:2")
  .mapActivities("archiveApplication", "archiveApplication")
  .mapActivities("compensationBoundary", "compensationBoundary")
  .build();
```

After migration, compensation can be triggered from the same scope as before migration (or in case that scope is removed, the closest ancestor scope that migrates).
For illustration, consider the following source process:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation3"></div>

And this target process:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation4"></div>

When migrating the same process instance state as in the above example, the inner compensation event is **not** going to
trigger compensation of the *Archive Application* activity but only the outer compensation event.

{{< note title="Active Compensation" class="info" >}}
  Migrating process instances with active compensation handlers is not supported yet.
{{< /note >}}


#### Adding Compensation Events

New compensation boundary events contained in the target process definition only take effect for activity instances that are not started or not finished yet.
For example, consider the following two processes:

Process `compensation:1`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation1"></div>

Process `compensation:2`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-compensation2"></div>

Furthermore, assume that before migration a process instance is in the following state:

```
ProcessInstance
└── Assess Credit Worthiness
```

If this process instance is migrated (with *Assess Credit Worthiness* being mapped to its equivalent), then triggering compensation
afterwards is **not** going to compensate *Archive Application*.


## Subprocess

If a migration instruction applies to an embedded/event/transaction sub process, it is migrated to its target sub process in the target process definition.
This preserves sub process state such as variables. In case no instruction applies, the instance is cancelled before migration is performed.
Should the target process definition contain new sub processes that no existing instance migrates to, then these are instantiated as needed during migration.

Embedded/Event/Transaction sub processes can be mapped interchangeably. For example, it is possible to map an embedded sub process to an event sub process.

### Call Activity

Call activities are migrated like any other activity. The called instance, be it a BPMN process or a CMMN case, is not changed. It can be migrated separately.


## Flow Node Markers

### Multi-Instance

Active multi-instance activities can be migrated if

* the target activity is multi-instance of the same type (parallel or sequential)
* the target activity is not a multi-instance activity.

#### Migrating a Multi-instance Activity

When migrating instances of a multi-instance activity to another multi-instance activity, the migration plan needs to contain two instructions: One for the *inner activity*, i.e., the activity that has multi-instance loop characteristics. And another one for the *multi-instance body*. The body is a BPMN scope that contains the inner activity and that is not visually represented. By convention, it has the id `<id of inner activity>#multiInstanceBody`. When migrating a multi-instance body and its inner activity, the multi-instance state is preserved. That means, if a parallel multi-instance activity is migrated with two instances out of five being active, then the state is the same after migration.

#### Removing a Multi-Instance Marker

If the target activity is not a multi-instance activity, it is sufficient to have an instruction for the inner activity. During migration, the multi-instance variables `nrOfInstances`, `nrOfActiveInstances` and `nrOfCompletedInstances` are removed. The number of inner activity instances is preserved. That means, if there are two out of five active instances before migration, then there are going to be two instances of the target activity after migration. In addition, their `loopCounter` and collection element variables are kept.


### Asynchronous Continuations

When an asynchronous continuation is active, i.e., the corresponding job has not been completed by the job executor yet, it is represented in the form of a *transition instance*. For example, this is the case when job execution failed and an incident has been created. For transition instances the mapping instructions apply just like for activity instances. That means, when there is an instruction from activity `userTask` to activity `newUserTask`, all transition instances that represent an asynchronous continuation before or after `userTask` are migrated to `newUserTask`. In order for this to succeed, the target activity must be asynchronous as well.

{{< note title="Limitation with asyncAfter" class="warning" >}}
  When migrating a transition instance that represents an asynchronous continuation *after* an activity, migration is only successful if the following limitations hold:

  * If the source activity has no outgoing sequence flow, the target activity must not have more than one outgoing sequence flow
  * If the source activity has outgoing sequence flows, the target activity must have sequence flows with the same IDs or must have not more than one outgoing sequence flow. This also applies if the source activity has a single sequence flow.
{{< /note >}}


# Operational Semantics

In the following, the exact semantics of migration are documented. Reading this section is recommended to fully understand the effects, power, and limitations of process instance migration.

## Migration Procedure

Migration of a process instance follows these steps:

1. Assignment of migration instructions to activity instances
2. Validation of the instruction assignment
3. Cancellation of unmapped activity instances and event handler entities
4. Migration of mapped activity instances and their dependent instances,
  instantiation of newly introduced BPMN scopes, and handler creation for newly introduced events


### Assignment of Migration Instructions

In the first step, migration instructions are assigned to activity instances
of a process instance that is going to be migrated.


### Validation of Instruction Assignment

The created assignment must be executable by the migration logic which is
ensured by the validation step. In particular, the following conditions must hold:

* Exactly one instruction must apply to a leaf activity instance (e.g., user task)
* At most one instruction must apply to a non-leaf activity instance (e.g., embedded subprocess)
* The overall assignment must be executable. See the [validation chapter]({{< relref "#validation" >}}) for details.


### Cancellation of Unmapped Activity Instances and Event-Handler Entities

Non-leaf activity instances to which no migration instructions apply are cancelled. Event handler entities
(e.g., message event subscriptions or timer jobs) are removed when their BPMN elements (e.g., boundary events)
are not migrated. Cancellation is performed before any migration instruction is applied,
so the process instance is still in the pre-migration state.

The semantics are:

* The activity instance tree is traversed in a bottom-up fashion and unmapped instances are cancelled
* Activity instance cancellation invokes the activity's end execution listeners and output variable mappings


### Migration/Creation of Activity Instances

Finally, activity instances are migrated and new ones are created as needed.

The semantics are:

* The activity instance tree is traversed in a top-down fashion
* If an activity instance is migrated into a BPMN scope to which no parent activity instance
  is migrated, then a new activity instance is created
* Creation invokes the activity's start execution listeners and input variable mappings
* An activity instance is migrated according to its assigned migration instruction


#### Activity instance migration

Migrating an activity instance updates the references to the activity and process definition
in the activity instance tree and its execution representation. Furthermore, it migrates or removes
*dependent* instances that belong to the activity instance. Dependent instances are:

* Variable instances
* Task instances (for user tasks)
* Event subscription instances


## Validation

A migration plan is validated at two points in time: When it is created, its
instructions are validated for static aspects. When it is applied to a
process instance, its instructions are matched to activity instances
and this assignment is validated.

Validation ensures that none of the limitations stated in this guide lead
to an inconsistent process instance state with undefined behavior after migration.


### Creation Time Validation

For an instruction to be valid when a migration plan is created, it has to fulfill
the following requirements:

* It has to map activities of the same type
* It has to be a one-to-one mapping
* A migrated activity must remain a descendant of its closest migrating ancestor scope (**Hierarchy Preservation**)
* The migration plan adheres to [BPMN-element-specific considerations]({{< relref "#bpmn-specific-api-and-effects" >}})

If validation reports errors, migration fails with a `MigrationPlanValidationException`
providing a `MigrationPlanValidationReport` object with details on the
validation errors.


#### Hierarchy Preservation

An activity must stay a descendant of its closest ancestor scope that migrates (i.e., that is not cancelled during migration).

Consider the following migration plan for the example processes shown at the
[beginning of this chapter]({{<
relref "user-guide/process-engine/process-instance-migration.md" >}}):

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapActivities("assessCreditWorthiness", "handleApplicationReceipt")
  .mapActivities("validateAddress", "validatePostalAddress")
  .build();
```

And a process instance in the following state:

```
ProcessInstance
└── Assess Credit Worthiness
    └── Validate Address
```

The migration plan cannot be applied, because the
hierarchy preservation requirement is violated: The activity *Validate
Address* is supposed to be migrated to *Validate Postal Address*. However, the
parent scope *Assess Credit Worthiness* is migrated to *Handle
Application Receipt*,  which does not contain *Validate Postal Address*.


### Execution Time Validation

When a migration plan is applied to a process instance, it is validated beforehand
that the plan is applicable. In particular, the following aspects are checked:

* **Completeness**: There must be a migration instruction for every instance of leaf activities
  (i.e., activities that do not contain other activities)
* **Instruction Applicability**: For certain activity types, only transition instances but not
  activity instances can be migrated

If validation reports errors, migration fails with a `MigrationInstructionInstanceValidationException`
providing a `MigrationInstructionInstanceValidationReport` object with details on the
validation errors.

#### Completeness

Migration is only meaningful if a migration instruction applies to every instance of a leaf activity. Assume a migration plan as follows:

```java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapActivities("archiveApplication", "archiveApplication")
  .build();
```

Now consider a process instance in the following activity instance state:

```
ProcessInstance
└── Archive Application
```

The plan is complete with respect to this process instance because there is a migration instruction for the activity *Archive Application*.

Now consider another process instance:

```
ProcessInstance
├── Archive Application
└── Assess Credit Worthiness
    └── Validate Address
```

The migration plan is not valid with respect to this instance because there is no instruction that applies to the instance of *Validate Address*.


#### Instruction Applicability

Migration instructions are used to migrate activity instances as well as transition instances (i.e., active asynchronous continuations). Some
instructions can only be used to migrate transition instances but not activity instances. In general, activity instances can only be
migrated if they are instances of the following element types:

* Task
  * User Task
  * Receive Task
  * External Task
* Subprocess
  * Embedded Sub Process
  * Event Sub Process
  * Transaction Sub Process
  * Call Activity
* Gateways
  * Parallel Gateway
  * Inclusive Gateway
  * Event-based Gateway
* Events
  * Boundary Event
  * Intermediate Catch Event
* Misc
  * Multi-instance Body

Transition instances can be migrated for any activity type.

[batch]: {{< relref "user-guide/process-engine/batch.md" >}}
[job executor]: {{< relref "user-guide/process-engine/the-job-executor.md#job-execution-in-heterogeneous-clusters" >}}
[execution jobs]: {{< relref "user-guide/process-engine/batch.md#execution-jobs" >}}
