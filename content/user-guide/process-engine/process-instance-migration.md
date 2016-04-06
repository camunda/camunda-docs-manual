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
i.e. the definition process instances are migrated from, to an activity of the *target process definition*,
i.e. the definition process instances are migrated to. A migration instruction ensures that an instance of the source
activity is migrated into an instance of the target activity. A migration plan is complete when there are instructions for
all active source activities.

The following following process models are used to illustrate the API and effects of migration unless otherwise noted:

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
migrated. References to the new activity and process definition are updated. Activity instances, task instances and
variable instances are preserved other than that. Before migration, there was a task instance
in the tasklist of an accountant to perform the *Validate Address* activity. After migration, the same task instance still exists and can be completed
successfully. It still has the same properties such as assignee or name.
From the accountant's perspective, migration is completely transparent while working on a task.

Also note that the name of the *Validate Address* activity has changed to *Validate Postal Address* (and it's ID as well). This can
be handled by the migration API when there is an according migration instruction.


# API

The following gives a structured overview of the Java API for process instance migration. Note that these operations are also available
via [REST]({{< relref "reference/rest/migration/index.md" >}}).

## Creating a Migration Plan

A migration plan can be created using the API `RuntimeService#createMigrationPlan`
and defines how migration should be performed.
A migration plan contains the ids of the source and target process definition
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
instructions that are not supported by the engine. See the [chapter on
creation time validation]({{< relref "#creation-time-validation" >}}) for details.

In addition, a migration plan is *validated before execution* to ensure that it can be applied to a given process instance. For example,
migration instructions for some activity types are only supported for transition instances (i.e. active asynchronous continuations) but not for
activity instances. See the [chapter on execution time validation]({{< relref "#execution-time-validation" >}}) for details.


### One-to-One Relation Instruction

```java
MigrationPlanBuilder#mapActivities(String sourceActivityId, String targetActivityId)
```

Defining a one-to-one relation instruction means that an instance of the source activity
is migrated into an instance of the target activity. Activity instance, task instance, and variable
instance state is preserved when migration is executed.


## Generating a migration plan

In addition to manually specifying all migration instructions, the `MigrationPlanBuilder`
is able to generate migration instructions for all *equal* activities in the source
and target process definitions. This can reduce the effort for creating a migration
to only those activities that are not equal.

Equality of a pair of activities is defined as follows:

* They are of the same activity type
* They have the same ID
* They belong to the same scope, i.e. their parent BPMN scopes are equal according to this definition.
  Process definitions are always equal.

Note that migration instruction generation does not create all instructions that are valid.
This limitation is introduced to ensure that all generated instructions are valid
for every possible process instance to be migrated. In some cases it
is not possible to ensure that an instruction is valid before executing it.
These kind of instructions are not generated by the migration plan generator.

For example consider the following code snippet:

```Java
MigrationPlan migrationPlan = processEngine.getRuntimeService()
  .createMigrationPlan("exampleProcess:1", "exampleProcess:2")
  .mapEqualActivities()
  .mapActivities("validateAddress", "validateProcessAddress")
  .build();
```

It creates generated migration instructions for the equal activities
`assessCreditWorthiness`. It adds an additional mapping for `validateAddress` to `validateProcessAddress`.


## Executing a migration plan

Migration plans can be applied to a set of process instances of the source process
definition by using the API Method `RuntimeService#newMigration`.

The migration can either be executed synchronously (blocking) or asynchronously
(non-blocking) using a [batch][].

The following are some reasons to prefer either one or the other:

- Use synchronous migration if:
  - the number of process instances is small
  - the migration should be atomic, i.e. it should be executed
    immediately and should fail if at least one process instances cannot
    be migrated


- Use asynchronous migration if:
  - the number of process instances is large
  - all process instances should be migrated decoupled from the other
    instances, i.e. every instance is migrated in its own transaction
  - the migration should be executed by another thread, i.e. the job
    executor should handle the execution

### Synchronous migration execution

To execute the migration synchronous the `execute` method is used. It will
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

To execute the migration asynchronous the `executeAsync` method is used. It will
return immediately with a reference to the batch which executes the migration.

```Java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

Batch batch = runtimeSerivce.newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .executeAsync();
```

Using a batch the process instance migration is split into several jobs which
are executed asynchronous. These batch jobs are executed by the job executer.
See the [batch][] section for more information. A batch is completed if all
batch execution jobs are successfully completed. But in contrast to the
synchronous migration it is not guaranteed that either all or none process
instance is migrated. As the migration is split into several independent batch
execution jobs every single job can fail or succeed.

If a batch execution migration job fails it is retried by the job executor
and if no retries are left an incident is created. In this case manual actions
are necessary to complete the batch migration.


# BPMN-specific Effects

Depending on the type of the activities a process model contains, migration has varying effects.

## Tasks

### User Task

When a user task is migrated, all properties of the task instance (i.e. `org.camunda.bpm.engine.task.Task`) are preserved apart
from the process definition id. The task is not reinitialized: Attributes like assignee or name do not change.

### Receive Task

When a receive task instance is migrated, the corresponding event subscription remains as it is apart from the activity it references.
That means that the name of the message the instance waits for does not change, even if
the target process definition defines a different message.


## Events

### Boundary Event

Boundary events of types timer, message, and signal manifest themselves at runtime as instances of `org.camunda.bpm.engine.runtime.EventSubscription`
and `org.camunda.bpm.engine.runtime.Job`. They capture the state about the event to be received. For a timer, the corresponding job
contains the time elapsed until the event triggers.

If there is no migration instruction for a boundary event, then its representing entity is removed. In order to preserve its
entity, a migration instruction from a boundary event to another boundary event can be provided. In this case, there must
also be a mapping from the activity the source boundary event is attached to, to the activity the target boundary event is attached to.

Consider the following two processes where the configuration of the boundary event changes:

Process `timerBoundary:1`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-boundary-timer1"></div>

Process `timerBoundary:2`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example-boundary-timer2"></div>

Applying a migration plan that does not contain the instruction `.mapActivities("timer", "timer")` is going to remove the timer job and re-create it.
In effect, the boundary event fires ten days after migration. In contrast, if that instruction is provided then the timer job instance is preserved. However, its
payload is not updated to the target boundary event's duration. In effect, it is going to trigger five days after the activity was started.

### Intermediate Catch Event

When a an intermediate catch event instance is migrated, the corresponding entity that represents the waiting state
(i.e. event subscription for message and signal events, job for timer events) remains as it is apart from the activity
and process definition it references.

That means, the event configuration does not change even if the target process definition defines a different configuration. For example,
if a message catch event is configured for message `Message_A` and is mapped to a message catch event that is configured for message `Message_B`,
then a process instance with an active instance of that event still waits for `Message_A` after migration. Similarly, the
due date of a timer does not change during migration.


## Subprocess

### Embedded Sub Process

If a migration instruction applies to an embedded sub process, it is migrated to its target sub process in the target process definition.
In case no instruction applies, the instance is cancelled before migration is performed. Should the target process definition
contain new sub processes that no existing instance migrates to, then these are instantiated as needed during migration.

### Call Activity

Call activities are migrated like any other activity. The called instance, be it a BPMN process or a CMMN case, is not changed. It can be migrated separately.


## Flow Node Markers

### Multi-Instance

Active multi-instance activities can be migrated if

* the target activity is multi-instance of the same type (parallel or sequential)
* the target activity is not a multi-instance activity.

#### Migrating a Multi-instance Activity

When migrating instances of a multi-instance activity to another multi-instance activity, the migration plan needs to contain two instructions: One for the *inner activity*, i.e. the activity that has multi-instance loop characteristics. And another one for the *multi-instance body*. The body is an artificial activity that contains the inner activity. By convention, it has the id `<id of inner activity>#multiInstanceBody`. When migrating a multi-instance body and its inner activity, the multi-instance state is preserved. That means, if a parallel multi-instance activity is migrated with two instances out of five being active, then the state is the same after migration.

#### Removing a Multi-Instance Marker

If the target activity is not a multi-instance activity, it is sufficient to have an instruction for the inner activity. During migration, the multi-instance variables `nrOfInstances`, `nrOfActiveInstances` and `nrOfCompletedInstances` are removed. The number of inner activity instances is preserved. That means, if there are two out of five active instances before migration, then there are going to be two instances of the target activity after migration. In addition, their `loopCounter` and collection element variables are kept.


### Asynchronous Continuations

When an asynchronous continuation is active, i.e. the corresponding job has not been completed by the job executor yet, it is represented in the form of a *transition instance*. For example, this is the case when job execution failed and an incident has been created. For transition instances the mapping instructions apply just like for activity instances. That means, when there is an instruction from activity `userTask` to activity `newUserTask`, all transition instances that represent an asynchronous continuation before or after `userTask` are migrated to `newUserTask`. In order for this to succeed, the target activity must be asynchronous as well.

{{< note title="Limitation with asyncAfter" class="warning" >}}
  When migrating a transition instance that represents an asynchronous continuation *after* an activity, migration is only successful if the following limitations hold:

  * If the source activity has no outgoing sequence flow, the target activity must not have more than one outgoing sequence flow
  * If the source activity has an outgoing sequence flow, the target activity must have an outgoing sequence flow with the same ID or must not have more than one outgoing sequence flow
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

* Exactly one instruction must apply to a leaf activity instance (e.g. user task)
* At most one instruction must apply to a non-leaf activity instance (e.g. embedded subprocess)
* The overall assignment must be executable. See the [validation chapter]({{< relref "#validation" >}}) for details.


### Cancellation of Unmapped Activity Instances and Event-Handler Entities

Non-leaf activity instances to which no migration instructions apply are cancelled. Event handler entities
(e.g. message event subscriptions or timer jobs) are removed when their BPMN elements (e.g. boundary events)
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

Validation ensures that none of the limimations stated in this guide lead
to an inconsistent process instance state with undefined behavior after migration.


### Creation Time Validation

For an instruction to be valid when a migration plan is created, it has to fulfill
the following requirements:

* It has to map activities of the same type
* It has to be an one-to-one mapping

If validation reports errors, migration fails with a `MigrationPlanValidationException`
providing a `MigrationPlanValidationReport` object with details on the
validation errors.


### Execution Time Validation

When a migration plan is applied to a process instance, it is validated beforehand
that the plan is applicable. In particular, the following aspects are checked:

* **Completeness**: There must be a migration instruction for every instance of leaf activities
  (i.e. activities that do not contain other activities)
* **Instruction Applicability**: For certain activity types, only transition instances but not
  activity instances can be migrated
* **Hierarchy Preservation**: Every activity instance must stay a descendant of its closest migrating ancestor activity instance

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

Migration instructions are used to migrate activity instances as well as transition instances (i.e. active asynchronous continuations). Some
instructions can only be used to migrate transition instances but not activity instances. In general, activity instances can only be
migrated if they are instances of the following activity types:

* Task
  * User Task
  * Receive Task
* Subprocess
  * Embedded Sub Process
  * Call Activity
* Events
  * Boundary Event
  * Intermediate Catch Event
* Misc
  * Multi-instance Body

Transition instances can be migrated for any activity type.


#### Hierarchy Preservation

An activity instance must stay a descendant of its closest ancestor activity instance that migrates (i.e. that is not cancelled during migration).

Consider the following migration plan:

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

The migration plan cannot be applied to the process instance, because the hierarchy preservation requirement is violated: The instance of *Validate Address* is supposed to be migrated to *Validate Postal Address*. However, the parent activity instance of *Assess Credit Worthiness* is migrated to *Handle Application Receipt* which does not contain *Validate Postal Address*.

[batch]: {{< relref "user-guide/process-engine/batch.md" >}}
