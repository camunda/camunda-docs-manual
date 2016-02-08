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


# Process Instance Migration by Example

As an example, consider the following source process definition `exampleProcess:1`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example1"></div>

And the following target process definition `exampleProcess:2`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example2"></div>

We can now define a migration plan using the API entrance point `RuntimeService#createMigrationPlan`.
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
  Archive Application
  Assess Credit Worthiness
    Validate Address
```

In order to migrate this process instance according to the defined migration plan, the API method
`RuntimeService#executeMigrationPlan` can be used:

```java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

runtimeService.executeMigrationPlan(migrationPlan, processInstanceIds);
```

The resulting activity instance state is:

```
ProcessInstance
  Handle Application Receipt
    Archive Application
  Assess Credit Worthiness
    Validate Postal Address
```

The following things have happened:

* An instance of the embedded subprocess *Handle Application Receipt* was added to reflect the new sub process in `exampleProcess:2`
* The activity instances for *Archive Application*, *Assess Credit Worthiness*, and *Validate Postal Address* have been migrated

What does the second point mean in particular? Since there is a migration instruction for these activity instances they are
migrated. References to the new activity and process definition are updated. Activity instances, task instances and
variable instances are preserved other than that. Before migration, there was a task instance
in the tasklist of an accountant to perform the *Validate Address* activity. After migration, the same task instance still exists and can be completed
successfully. From the accountant's perspective, migration is completely transparent while working on a task.

Also note that the name of the *Validate Address* activity has changed to *Validate Postal Address* (and it's ID as well). This can
be handled by the migration API when there is an according migration instruction.


# Operational Semantics

The following sections specify the exact semantics of process instance migration and should be read in order to understand the
migration effects in varying circumstances. If not otherwise noted, the following examples refer to the following process models for illustration.

Process `exampleProcess:1`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example1"></div>

Process `exampleProcess:2`:

<div data-bpmn-diagram="../bpmn/process-instance-migration/example2"></div>


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

Activity types that can be mapped:

* Embedded sub process
* User task

Migration instructions must map between activities of the same type.

Supported activity relationships are:

* One-to-one relation

A migration plan is validated after creation if it contains migration
instructions that are not supported by the engine. See the [chapter on
validation]({{< relref "#validation" >}}) for details.

{{< note title="Limitations" class="warning" >}}
Multi instance activities and activities with boundary events are currently not supported.
{{< /note >}}

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
  .createMigrationPlan("testProcess:1", "testProcess:2")
  .mapEqualActivities()
  .mapActivities("validateAddress", "validateProcessAddress")
  .build();
```

It creates generated migration instructions for the equal activities
`assessCreditWorthiness`. It adds an additional mapping for `validateAddress` to `validateProcessAddress`.


## Executing a migration plan

Migration plans can be applied to a set of process instances of the source process
definition by using the API Method `RuntimeService#executeMigrationPlan`.

```Java
MigrationPlan migrationPlan = ...;
List<String> processInstanceIds = ...;

runtimeService.executeMigrationPlan(migrationPlan, processInstances);
```

Migration is successful if all process instance can be migrated. Confer the
[chapter on validation]({{< relref "#validation" >}}) to learn which kind of validation is performed before
a migration plan is executed.


## Migration Procedure

Migration of a process instance follows these steps:

1. Assignment of migration instructions to activity instances
2. Validation of the instruction assignment
3. Cancellation of unmapped activity instances
4. Migration of mapped activity instances and their dependent instances,
  and instantiation of newly introduced BPMN scopes


### Assignment of Migration Instructions

In the first step, migration instructions are assigned to activity instances
of a process instance that is going to be migrated.


### Validation of Instruction Assignment

The created assignment must be executable by the migration logic which is
ensured by the validation step. In particular, the following conditions must hold:

* Exactly one instruction must apply to a leaf activity instance (e.g. user task)
* At most one instruction must apply to a non-leaf activity instance (e.g. embedded subprocess)
* The overall assignment must be executable. See the [validation chapter]({{< relref "#validation" >}}) for details.


### Cancellation of Unmapped Activity Instances

Non-leaf activity instances to which no migration instructions apply are cancelled. In particular,
this means that a sub process instance is cancelled when it is not migrated. Cancellation is performed
before any migration instruction is applied, so the process instance is still in the pre-migration state.

The semantics are:

* The activity instance tree is traversed in a bottom-up fashion and unmapped instances are cancelled
* Cancellation invokes the activity's end execution listeners and output variable mappings


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
in the activity instance tree and its execution representation. Furthermore, it migrates
*dependent* instances that belong to the activity instance. Dependent instances are:

* Variable instances
* Task instances (for user tasks)

**Variable instances**: Variable instances are migrated when they are local to a scope

**Task instances**: Task instance migration updates activity and process definition references.
It does not re-initialize the task. For example, if the target activity has a different
assignee configured, a migrated task instance does not receive this assignee.


## Validation

A migration plan is validated at two points in time: When it is created, its
instructions are validated for static aspects. When it is applied to a
process instance, its instructions are matched to activity instances
and this assignment is validated.


### Creation Time Validation

For an instruction to be valid when a migration plan is created, it has to fulfill
the following requirements:

* It has to map activities of the same type
* It has to map activities of the supported types
* It has to be an one-to-one mapping

If validation reports errors, migration fails with a `MigrationPlanValidationException`
providing a `MigrationPlanValidationReport` object with details on the
validation errors.


### Execution Time Validation

When a migration plan is applied to a process instance, it is validated beforehand
that the plan is applicable. In particular, the following aspects are checked:

* There must be a migration instruction for every instance of leaf activities
  (i.e. activities that do not contain other activities)
* Migration of an activity instance must be *vertical* (see below for a definition)

If validation reports errors, migration fails with a `MigrationInstructionInstanceValidationException`
providing a `MigrationInstructionInstanceValidationReport` object with details on the
validation errors.


#### Vertical Migration

Activity instances are organized in a tree structure that follows the hierarchy of BPMN scopes
in the process definition. When starting process definition `exampleProcess:1`,
the activity instance tree is:

```
ProcessInstance
  Archive Application
  Assess Credit Worthiness
    Validate Address
```

The activity instance for `Validate Address` is a child of `Assess Credit Worthiness` and so on. This way, it is possible to
describe the path from an activity instance to the root activity instance. For `Validate Adress`, this is
`Validate Address -> Assess Credit Worthiness -> ProcessInstance`. *Vertical* migration means that after migration, the order
of the migrated instances must still be the same with respect to this path. For example, the `Validate Address` instance must be migrated into
an activity that is a descendant of the activity that the `Assess Credit Worthiness` instance is migrated into. Note that this definition
allows to add and remove sub process scopes because these do not change the order of the activity instances in the path.
