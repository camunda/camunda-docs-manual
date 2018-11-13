---

title: 'Process Instance Modification'
weight: 50

menu:
  main:
    identifier: "user-guide-process-engine-process-instance-modification"
    parent: "user-guide-process-engine"

---

While the process model contains sequence flows that define in which order activities must be executed, sometimes it is desired to flexibly start an activity again or cancel a running activity. For example, this can be useful when the process model contains an error, such as a wrong sequence flow condition, and running process instances need to be corrected. Use cases for this API may be

* Repairing process instances in which some steps have to be repeated or skipped
* Migrating process instances from one version of a process definition to another
* Testing: Activities can be skipped or repeated for isolated testing of individual process segments

To perform such an operation, the process engine offers the *process instance modification API* that is entered via `RuntimeService.createProcessInstanceModification(...)` or 
`RuntimeService.createModification(...)`. This API allows to specify multiple *modification instructions* in one call by using a fluent builder. In particular, it is possible to:

* start execution before an activity
* start execution on a sequence flow leaving an activity
* cancel a running activity instance
* cancel all running instances of a given activity
* set variables with each of the instructions

{{< note title="Modification of the own process instance" class="warning"  >}}
 Process instance modification within the same instance is not recommended!
 An activity which tries to modify its own process instance can cause undefined behavior, which should be avoided.
{{< /note >}}

{{< enterprise >}}
  The Camunda enterprise edition provides a user interface to compose process instance modifications visually on the BPMN diagram in [Camunda Cockpit]({{< ref "/webapps/cockpit/bpmn/process-instance-modification.md" >}})
{{< /enterprise >}}

# Process Instance Modification by Example

As an example, consider the following process model:

<div data-bpmn-diagram="../bpmn/example1"></div>

The model shows a simple process for processing a loan application. Let us assume that a loan application has arrived, the loan application has been evaluated, and it was determined to decline the application. That means, the process instance has the following activity instance state:

```
ProcessInstance
  Decline Loan Application
```

Now the worker performing the task *Decline Loan Application* recognizes an error in the evaluation result and comes to the conclusion that the application should be accepted nevertheless. While such flexibility is not modelled as part of the process, process instance modification allows to correct the running process instance. The following API call does the trick:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("acceptLoanApplication")
  .cancelAllForActivity("declineLoanApplication")
  .execute();
```

This command first starts execution before the activity *Accept Loan Application* until a wait state - the creation of the user task in this case - is reached. After that, it cancels the running instance of the activity *Decline Loan Application*. In the worker's task list, the *Decline* task has been removed and an *Accept* task has appeared. The resulting activity instance state is:

```
ProcessInstance
  Accept Loan Application
```

Let's assume that a variable called *approver* must exist when approving the application. This can be accomplished by extending the modification request as follows:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("acceptLoanApplication")
  .setVariable("approver", "joe")
  .cancelAllForActivity("declineLoanApplication")
  .execute();
```

The added `setVariable` call ensures that before starting the activity, the specified variable is submitted.

Now to some more complex cases. Say that the application was again not ok and the activity *Decline Loan Application* is active. Now, the worker recognizes that the evaluation process was erroneous and wants to restart it entirely. The following modification instructions represent the modification request to perform this task:

It is possible to start the subprocess activities:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("declineLoanApplication")
  .startBeforeActivity("assessCreditWorthiness")
  .startBeforeActivity("registerApplication")
  .execute();
```

to start at the start event of the subprocess:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("declineLoanApplication")
  .startBeforeActivity("subProcessStartEvent")
  .execute();
```

to start the subprocess itself:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("declineLoanApplication")
  .startBeforeActivity("evaluateLoanApplication")
  .execute();
```

to start the process' start event:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("declineLoanApplication")
  .startBeforeActivity("processStartEvent")
  .execute();
```

## Process Instance Modification in JUnit Tests

Process instance modification can be very useful in JUnit Tests. You can skip the long part to run through the process from the start to the point you want to test and jump directly to the activity or gateway to test.

For this you can start a process instance with a modification and place the token directly inside the process instance.

Assume, you want to skip the subprocess *Evaluate Loan Application* and test the gateway  *Application OK?* with your process variable, you can start the process instance with

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceByKey("Loan_Application")
  .startBeforeActivity("application_OK")
  .setVariable("approved", true)
  .execute();
```

In a JUnit test, you can assert that the processInstance is waiting at 'Accept Loan Application', now.

# Operational Semantics

The following sections specify the exact semantics of process instance modification and should be read in order to understand the modification effects in varying circumstances. If not otherwise noted, the following examples refer to the following process model for illustration:

<div data-bpmn-diagram="../bpmn/example1"></div>


## Modification Instruction Types

The fluent process instance modification builder offers the following instructions to be submitted:

* `startBeforeActivity(String activityId)`
* `startBeforeActivity(String activityId, String ancestorActivityInstanceId)`
* `startAfterActivity(String activityId)`
* `startAfterActivity(String activityId, String ancestorActivityInstanceId)`
* `startTransition(String transitionId)`
* `startTransition(String transition, String ancestorActivityInstanceId)`
* `cancelActivityInstance(String activityInstanceId)`
* `cancelTransitionInstance(String transitionInstanceId)`
* `cancelAllForActivity(String activityId)`


### Start Before an Activity

```java
ProcessInstanceModificationBuilder#startBeforeActivity(String activityId)
ProcessInstanceModificationBuilder#startBeforeActivity(String activityId, String ancestorActivityInstanceId)
```

Starting before an activity  via `startBeforeActivity` means that execution is started before entering the activity. The instruction respects an `asyncBefore` flag, meaning that a job will be created if the activity is `asyncBefore`. In general, this instruction executes the process model beginning with the specified activity until a wait state is reached. See the documentation on [Transactions in Processes]({{< ref "/user-guide/process-engine/transactions-in-processes.md" >}}) for details on wait states.


### Start After an Activity

```java
ProcessInstanceModificationBuilder#startAfterActivity(String activityId)
ProcessInstanceModificationBuilder#startAfterActivity(String activityId, String ancestorActivityInstanceId)
```

Starting after an activity via `startAfterActivity` means that execution is started on the single outgoing sequence flow of the activity. The instruction does not consider the `asyncAfter` flag of the given activity. If there is more than one outgoing sequence flow or none at all, the instruction fails. If successful, this instruction executes the process model beginning with the sequence flow until a wait state is reached.


### Start a Transition

```java
ProcessInstanceModificationBuilder#startTransition(String transitionId)
ProcessInstanceModificationBuilder#startTransition(String transition, String ancestorActivityInstanceId)
```

Starting a transition via `startTransition` translates to starting execution on a given sequence flow. This can be used in addition to `startAfterActivity`, when there is more than one outgoing sequence flow. If successful, this instruction executes the process model beginning with the sequence flow until a wait state is reached.


### Cancel an Activity Instance

```java
ProcessInstanceModificationBuilder#cancelActivityInstance(String activityInstanceId)
```

A specific activity instance can be canceled by `cancelActivityInstance`. This can either be a leaf activity instance, such as an instance of a user task, as well as an instance of a scope higher in the hierarchy, such as an instance of a sub process. See the [details on activity instances]({{< relref "#activity-instance-based-api" >}}) how to retrieve the activity instances of a process instance.


### Cancel a Transition Instance

```java
ProcessInstanceModificationBuilder#cancelTransitionInstance(String activityInstanceId)
```

Transition instances represent execution flows that are about to enter/leave an activity in the form of an asynchronous continuation. An asynchronous continuation job that has already been created but not yet executed is represented as a transition instance. These instances can be canceled by `cancelTransitionInstance`. See the [details on activity and transition instances]({{< relref "#activity-instance-based-api" >}}) how to retrieve the transition instances of a process instance.


### Cancel All Activity Instances for an Activity

```java
ProcessInstanceModificationBuilder#cancelAllForActivity(String activityId)
```

For convenience, it is also possible to cancel all activity and transition instances of a given activity by the instruction `cancelAllForActivity`.


## Provide Variables

With every instantiating instruction (i.e., `startBeforeActivity`, `startAfterActivity`, or `startTransition`), it is possible to submit process variables.
The API offers the methods

* `setVariable(String name, Object value)`
* `setVariables(Map<String, Object> variables)`
* `setVariableLocal(String name, Object value)`
* `setVariablesLocal(Map<String, Object> variables)`

Variables are set **after** the [necessary scopes for instantiation are created]({{< relref "#nested-instantiation" >}}) and **before** the actual execution of the specified element begins. That means, in the process engine history these variables do not appear as if they were set during execution of the specified activity for `startBefore` and `startAfter` instructions. Local variables are set on the execution that is about to perform the instruction, i.e., that enters the activity etc.

See the [variables section of this guide]({{< ref "/user-guide/process-engine/variables.md" >}}) for details on variables and scopes in general.


## Activity-Instance-based API

The process instance modification API is based on *activity instances*. The activity instance tree of a process instance can be retrieved with the following method:

```java
ProcessInstance processInstance = ...;
ActivityInstance activityInstance = runtimeService.getActivityInstance(processInstance.getId());
```

`ActivityInstance` is a recursive data structure where the activity instance returned by the above method call represents the process instance. The IDs of `ActivityInstance` objects can be used for [cancelation of specific instances]({{< relref "#cancel-an-activity-instance" >}}) or for [ancestor selection during instantiation]({{< relref "#ancestor-selection-for-instantiation" >}}).

The interface `ActivityInstance` has methods `getChildActivityInstances` and `getChildTransitionInstances` to drill down in the activity instance tree. For example, assume that the activities *Assess Credit Worthiness* and *Register Application* are active. Then the activity instance tree looks as follows:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
    Register Application Request
```

In code, the *Assess* and *Register* activity instances can be retrieved as follows:

```java
ProcessInstance processInstance = ...;
ActivityInstance activityInstance = runtimeService.getActivityInstance(processInstance.getId());
ActivityInstance subProcessInstance = activityInstance.getChildActivityInstances()[0];
ActivityInstance[] leafActivityInstances = subProcessInstance.getChildActivityInstances();
// leafActivityInstances has two elements; one for each activity
```

It is also possible to directly retrieve all activity instances for a given activity:

```java
ProcessInstance processInstance = ...;
ActivityInstance activityInstance = runtimeService.getActivityInstance(processInstance.getId());
ActivityInstance assessCreditWorthinessInstances = activityInstance.getActivityInstances("assessCreditWorthiness")[0];
```

Compared to activity instances, *transition instances* do not represent active activities but activities that are about to be entered or about to be left. This is the case when jobs for asynchronous continuations exist but have not been executed yet. For an activity instance, child transition instances can be retrieved with the method `getChildTransitionInstances` and the API for transition instances is similar to that for activity instances.


## Nested Instantiation

Assume a process instance of the above example process where the activity *Decline Loan Application* is active. Now we submit the instruction to start before the activity *Assess Credit Worthiness*. When applying this instruction, the process engine makes sure to instantiate all parent scopes that are not active yet. In this case, before starting the activity, the process engine instantiates the *Evaluate Loan Application* sub process. Where before the activity instance tree was

```
ProcessInstance
  Decline Loan Application
```

it now is

```
ProcessInstance
  Decline Loan Application
  Evaluate Loan Application
    Assess Credit Worthiness
```

Apart from instantiating these parent scopes, the engine also ensures to register the event subscriptions and jobs in these scopes. For example, consider the following process:

<div data-bpmn-diagram="../bpmn/example2"></div>

Starting the activity *Assess Credit Worthiness* also registers an event subscription for the message boundary event *Cancelation Notice Received* such that it is possible to cancel the sub process this way.


## Ancestor Selection for Instantiation

By default, starting an activity instantiates all parent scopes that are not instantiated yet. When the activity instance tree is the following:

```
ProcessInstance
  Decline Loan Application
```

Then starting *Assess Credit Worthiness* results in this updated tree:

```
ProcessInstance
  Decline Loan Application
  Evaluate Loan Application
    Assess Credit Worthiness
```

The sub process scope has been instantiated as well. Now assume that the sub process is already instantiated, such as in the following tree:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
```

Starting *Assess Credit Worthiness* again will start it in the context of the existing sub process instance, such that the resulting tree is:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
    Assess Credit Worthiness
```

If you want to avoid this behavior and instead want to instantiate the sub process a second time, an id of an ancestor activity instance can be supplied by using the method `startBeforeActivity(String activityId, String ancestorActivityInstanceId)` - similar methods exist for starting after an activity and starting a transition. The parameter `ancestorActivityInstanceId` takes the id of an activity instance that is currently active and that belongs to an *ancestor* activity of the activity to be started. An activity is a valid ancestor, if it contains the activity to be started (either directly, or indirectly with other activities in between).

With a given ancestor activity instance id, all scopes in between the ancestor activity and the activity to be started will be instantiated, regardless of whether they are already instantiated. In the example, the following code starts the activity *Assess Credit Worthiness* with the process instance (being the root activity instance) as the ancestor:

```java
ProcessInstance processInstance = ...;
ActivityInstance activityInstanceTree = runtimeService.getActivityInstance(processInstance.getId());
runtimeService.createProcessInstanceModification(activityInstanceTree.getId())
  .startBeforeActivity("assessCreditWorthiness", processInstance.getId())
  .execute();
```

Then, the resulting activity instance tree is the following:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
  Evaluate Loan Application
    Assess Credit Worthiness
```

The sub process was started a second time.


## Cancelation Propagation

Canceling an activity instance propagates to parent activity instances that do not contain other activity instances. This behavior ensures that the process instance is not left in an execution state that makes no sense. This means, when a single activity is active in a sub process and that activity instance is canceled, the sub process is canceled as well. Consider the following activity instance tree:

```
ProcessInstance
  Decline Loan Application
  Evaluate Loan Application
    Assess Credit Worthiness
```

After canceling the activity instance for *Assess Credit Worthiness*, the tree is:

```
ProcessInstance
  Decline Loan Application
```

If all instructions have been executed and there is no active activity instance left, the entire process instance is canceled. This would be the case in the example above if both activity instances were canceled, the one for *Assess Credit Worthiness* and the one for *Decline Loan Application*.

However, the process instance is only canceled after all instructions have been executed. That means, if the process instance has no active activity instances between two instructions the process instance is not immediately canceled. As an example, assume that the activity *Decline Loan Application* is active. The activity instance tree is:

```
ProcessInstance
  Decline Loan Application
```

The following modification operation succeeds although the process instance has no active activity instance directly after the cancelation instruction has been executed:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("declineLoanApplication")
  .startBeforeActivity("acceptLoanApplication")
  .execute();
```


## Instruction Execution Order

Modification instructions are always executed in the order they are submitted. Thus, performing the same instructions in a different order can make a difference. Consider the following activity instance tree:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
```

Assume you have the task of canceling the instance of *Assess Credit Worthiness* and starting the activity *Register Application*. There are two orderings for these two instructions: Either the cancelation is performed first, or the instantiation is performed first. In the former case, the code looks as follows:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .cancelAllForActivity("assesCreditWorthiness")
  .startBeforeActivity("registerApplication")
  .execute();
```

Due to [cancelation propagation]({{< relref "#cancelation-propagation" >}}), the sub process instance is canceled when the cancelation instruction is executed only to be re-instantiated when the instantiation instruction is executed. This means, after the modification has been executed, there is a different instance of the *Evaluate Loan Application* sub process. Any entities associated with the previous instance have been removed, such as variables or event subscriptions.

In contrast, consider the case where the instantiation is performed first:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("registerApplication")
  .cancelAllForActivity("assesCreditWorthiness")
  .execute();
```

Due to the [default ancestor selection]({{< relref "#ancestor-selection-for-instantiation" >}}) during instantiation and the fact that cancelation does not propagate to the sub process instance in this case, the sub process instance is the same after modification as it was before. Related entities like variables and event subscriptions are preserved.


## Start Activities with Interrupting/Canceling Semantics

Process instance modification respects any interrupting or canceling semantics of the activities to be started. In particular, starting an interrupting boundary event or an interrupting event sub process will cancel/interrupt the activity it is defined on/in. Consider the following process:

<div data-bpmn-diagram="../bpmn/example3"></div>

Assume that the activity *Assess Credit Worthiness* is currently active. The event sub process can be started with the following code:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("cancelEvaluation")
  .execute();
```

Since the start event of the *Cancel Evaluation* sub process is interrupting, it will cancel the running instance of *Assess Credit Worthiness*. The same happens when the start event of the event subprocess is started via:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("eventSubProcessStartEvent")
  .execute();
```

However, when an activity located in the event sub process is directly started, the interruption is not executed. Consider the following code:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("notifyAccountant")
  .execute();
```

The resulting activity instance tree would be:

```
ProcessInstance
  Evaluate Loan Application
    Assess Credit Worthiness
    Cancel Evaluation
      Notify Accountant
```


## Modify Multi-Instance Activity Instances

Modification also works for multi-instance activities. We distinguish in the following between the *multi-instance body* and the *inner activity*. The inner activity is the actual activity and has the ID as declared in the process model. The multi-instance body is a scope around this activity that is not represented in the process model as a distinct element. For an activity with id `anActivityId`, the multi-instance body has by convention the id `anActivityId#multiInstanceBody`.

With this distinction, it is possible to start the entire multi-instance body, as well as start a single inner activity instance for a running parallel multi-instance activity. Consider the following process model:

<div data-bpmn-diagram="../bpmn/example4"></div>

Let's assume the multi-instance activity is active and has three instances:

```
ProcessInstance
  Contact Customer - Multi-Instance Body
    Contact Customer
    Contact Customer
    Contact Customer
```

The following modification starts a fourth instance of the *Contact Customer* activity in the same multi-instance body activity:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("contactCustomer")
  .execute();
```

The resulting activity instance tree is:

```
ProcessInstance
  Contact Customer - Multi-Instance Body
    Contact Customer
    Contact Customer
    Contact Customer
    Contact Customer
```

The process engine makes sure to update the multi-instance-related variables `nrOfInstances`, `nrOfActiveInstances`, and `loopCounter` correctly. If the multi-instance activity is configured based on a collection, the collection is not considered when the instruction is executed and the collection element variable will not be populated for the additional instance. Such behavior can be achieved by providing the collection element variable with the instantiation instruction by using the method `#setVariableLocal`.

Now consider the following request:

```java
ProcessInstance processInstance = ...;
runtimeService.createProcessInstanceModification(processInstance.getId())
  .startBeforeActivity("contactCustomer#multiInstanceBody")
  .execute();
```

This starts the entire multi-instance body a second time, leading to the following activity instance tree:

```
ProcessInstance
  Contact Customer - Multi-Instance Body
    Contact Customer
    Contact Customer
    Contact Customer
    Contact Customer
  Contact Customer - Multi-Instance Body
    Contact Customer
    Contact Customer
    Contact Customer
```

## Modification of Multiple Process Instances

When there are multiple process instances which fulfill a specific criteria, it is possible to modify them at once using `RuntimeService.createModification(...)`. This method allows to specify
the modification instructions and IDs of process instances that should be modified. It is required that the process instances belong to the given process definition. 

The fluent modification builder offers the following instructions to be submitted:

* `startBeforeActivity(String activityId)`
* `startAfterActivity(String activityId)`
* `startTransition(String transitionId)`
* `cancelAllForActivity(String activityId)`

Process instances can be selected for modification by either providing a set of process instance IDs or providing a process instance query. 
It is also possible to specify both, a list of process instance IDs and a query. The process instances to be modified will then be the union of the resulting sets.

```java
ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();

runtimeService.createModification("exampleProcessDefinitionId")
  .cancelAllForActivity("exampleActivityId:1")
  .startBeforeActivity("exampleActivityId:2")
  .processInstanceIds(processInstanceQuery)
  .processInstanceIds("processInstanceId:1", "processInstanceId:2")
  .execute();
```

The modification of multiple process instances can be executed synchronously or asynchronously.
For more information about the difference between synchronous and asynchronous execution, please refer to the related
section of the [user guide]({{< ref "/user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}).

An example for synchronous execution:

```java
runtimeService.createModification("exampleProcessDefinitionId")
  .cancelAllForActivity("exampleActivityId:1")
  .startBeforeActivity("exampleActivityId:2")
  .processInstanceIds("processInstanceId:1", "processInstanceId:2")
  .execute();
```

An example for asynchronous execution:

```java
Batch batch = runtimeService.createModification("exampleProcessDefinitionId")
  .cancelAllForActivity("exampleActivityId:1")
  .startBeforeActivity("exampleActivityId:2")
  .processInstanceIds("processInstanceId:1", "processInstanceId:2", "processInstanceId:100")
  .executeAsync();
```

## Skip Listener and Input/Output Invocation

It is possible to skip invocations of execution and task listeners as well as input/output mappings for the transaction that performs the modification. This can be useful when the modification is executed on a system that has no access to the involved process application deployments and their contained classes. Listener and ioMapping invocations can be skipped by using the modification builder's method `execute(boolean skipCustomListeners, boolean skipIoMappings)`.


## Soundness Checks

Process instance modification is a very powerful tool and allows to start and cancel activities at will. Thus, it is easy to create situations that are unreachable by normal process execution. Assume the following process model:

<div data-bpmn-diagram="../bpmn/example5"></div>

Assume that activity *Decline Loan Approval* is active. With modification, the activity *Assess Credit Worthiness* can be started. After that activity is completed, execution gets stuck at the joining parallel gateway because no token will ever arrive at the other incoming sequence flow such that the parallel gateway is activated. This is one of the most obvious situations where the process instance cannot continue execution and there are certainly many others, depending on the concrete process model.

The process engine is **not** able to detect modifications that create such situations. It is up to the user of this API to make modifications that do not leave the process instance in an undesired state. However, process instance modification is also the tool to repair these situations :-)
