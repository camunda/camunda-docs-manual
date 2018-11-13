---

title: 'Transactions in Processes'
weight: 160

menu:
  main:
    identifier: "user-guide-process-engine-transactions-in-processes"
    parent: "user-guide-process-engine"

---


The process engine is a piece of passive Java code which works in the Thread of the client. For instance, if you have a web application allowing users to start a new process instance and a user clicks on the corresponding button, some thread from the application server's http-thread-pool will invoke the API method `runtimeService.startProcessInstanceByKey(...)`, thus *entering* the process engine and starting a new process instance. We call this "borrowing the client thread".

On any such *external* trigger (i.e., start a process, complete a task, signal an execution), the engine runtime will advance in the process until it reaches wait states on each active path of execution. A wait state is a task which is performed *later*, which means that the engine persists the current execution to the database and waits to be triggered again. For example in case of a user task, the external trigger on task completion causes the runtime to execute the next bit of the process until wait states are reached again (or the instance ends). In contrast to user tasks, a timer event is not triggered externally. Instead it is continued by an *internal* trigger. That is why the engine also needs an active component, the [job executor]({{< ref "/user-guide/process-engine/the-job-executor.md" >}}), which is able to fetch registered jobs and process them asynchronously.


# Wait States

 We talked about wait states as transaction boundaries where the process state is stored to the database, the thread returns to the client and the transaction is committed. The following BPMN elements are always wait states:


<div class="row"><div class="col-xs-12 col-md-6">
<div><a href="{{< ref "/reference/bpmn20/tasks/receive-task.md" >}}"><svg height="90" version="1.1" width="110" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.84375px;"><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="5" y="5" width="100" height="80" r="5" rx="5" ry="5" fill="#ffffff" stroke="#808080" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" id="svg_1"></rect><text x="55" y="45" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">Receive Task</tspan></text><path fill="#ffffff" stroke="#808080" d="M7,10L7,20L23,20L23,10ZM7,10L15,16L23,10" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path></svg></a></div>

<div><a href="{{< ref "/reference/bpmn20/tasks/user-task.md" >}}"><svg height="90" version="1.1" width="110" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.84375px;"><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="5" y="5" width="100" height="80" r="5" rx="5" ry="5" fill="#ffffff" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;" id="svg_1"></rect><text x="55" y="45" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">User Task</tspan></text><path fill="#f4f6f7" stroke="#808080" d="M6.0095,22.5169H22.8676V17.0338C22.8676,17.0338,21.2345,14.2919,17.9095,13.4169H11.434500000000002C8.342600000000001,14.35,5.951400000000001,17.4419,5.951400000000001,17.4419L6.009500000000001,22.5169Z" stroke-width="0.69999999" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><path fill="none" stroke="#808080" d="M9.8,19.6L9.8,22.400000000000002" stroke-width="0.69999999" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><path fill="#808080" stroke="#808080" d="M19.6,19.6L19.6,22.400000000000002" stroke-width="0.69999999" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><circle cx="19.5" cy="13.5" r="5" fill="#808080" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(0.75,0,0,0.75,4.875,3.375)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></circle><path fill="#f0eff0" stroke="#808080" d="M11.2301,10.5581C11.2301,10.5581,13.1999,8.8599,14.9933,9.293199999999999C16.7867,9.726499999999998,18.2301,8.8081,18.2301,8.8081C18.4051,9.9897,18.2595,11.4331,17.2095,12.716899999999999C17.2095,12.716899999999999,17.967599999999997,13.2419,17.967599999999997,13.7669C17.967599999999997,14.2919,18.055099999999996,15.0794,17.267599999999998,15.8669C16.480099999999997,16.6544,13.417599999999998,16.7419,12.542599999999998,15.8669C11.667599999999998,14.9919,11.667599999999998,14.5838,11.667599999999998,14C11.667599999999998,13.4162,12.075699999999998,13.125,12.542599999999998,12.6581C11.784499999999998,12.25,10.793299999999999,10.9956,11.230099999999998,10.5581Z" stroke-width="0.69999999" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path></svg></a></div>
</div>

<div class="col-xs-12 col-md-6">
<div><a href="{{< ref "/reference/bpmn20/events/message-events.md" >}}"><svg height="40" version="1.1" width="40" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.84375px;"><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><circle cx="20" cy="20" r="15" fill="#ffffff" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;" id="svg_1"></circle><circle cx="20" cy="20" r="12" fill="none" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></circle><path fill="#ffffff" stroke="#808080" d="M7,10L7,20L23,20L23,10ZM7,10L15,16L23,10" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(0.9375,0,0,0.9375,5.9375,5.9375)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><text x="20" y="50" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">Message</tspan></text></svg> Message Event</a></div>

<div><a href="{{< ref "/reference/bpmn20/events/timer-events.md" >}}"><svg height="40" version="1.1" width="40" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.84375px;"><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><circle cx="20" cy="20" r="15" fill="#ffffff" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;" id="svg_1"></circle><circle cx="20" cy="20" r="12" fill="none" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></circle><circle cx="20" cy="20" r="10" fill="#ffffff" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></circle><path fill="#ffffff" stroke="#808080" d="M15,5L15,8M20,6L18.5,9M24,10L21,11.5M25,15L22,15M24,20L21,18.5M20,24L18.5,21M15,25L15,22M10,24L11.5,21M6,20L9,18.5M5,15L8,15M6,10L9,11.5M10,6L11.5,9M17,8L15,15L19,15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(1,0,0,1,5,5)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><text x="20" y="50" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">Timer</tspan></text></svg> Timer Event</a></div>

<div><a href="{{< ref "/reference/bpmn20/events/signal-events.md" >}}"><svg height="40" version="1.1" width="40" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.84375px;"><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><circle cx="20" cy="20" r="15" fill="#ffffff" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;" id="svg_1"></circle><circle cx="20" cy="20" r="12" fill="none" stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></circle><path fill="#ffffff" stroke="#808080" d="M7.7124971,20.247342L22.333334,20.247342L15.022915000000001,7.575951200000001L7.7124971,20.247342Z" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" transform="matrix(0.9375,0,0,0.9375,5.9389,5.8695)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;"></path><text x="20" y="50" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial, Helvetica, sans-serif;" font-size="12px" font-family="Arial, Helvetica, sans-serif"><tspan style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" dy="4">Signal</tspan></text></svg> Signal Event</a></div>
</div>
</div>


The [Event Based Gateway]({{< ref "/reference/bpmn20/gateways/event-based-gateway.md" >}}):

<div data-bpmn-diagram="../bpmn/event-based-gateway"></div>

Keep in mind that [Asynchronous Continuations]({{< relref "#asynchronous-continuations" >}}) can add transaction boundaries to other tasks as well.


# Transaction Boundaries

The transition from one such stable state to another stable state is always part of a single transaction, meaning that it succeeds as a whole or is rolled back on any kind of exception occuring during its execution. This is illustrated in the following example:

{{< img src="../img/transactions-1.png" title="Transaction Boundaries" >}}

We see a segment of a BPMN process with a user task, a service task and a timer event. The timer event marks the next wait state. Completing the user task and validating the address is therefore part of the same unit of work, so it should succeed or fail atomically. That means that if the service task throws an exception we want to roll back the current transaction, so that the execution tracks back to the user task and the user task is still present in the database. This is also the default behavior of the process engine.

In **1**, an application or client thread completes the task. In that same thread the engine runtime is now executing the service task and advances until it reaches the wait state at the timer event (**2**). Then it returns the control to the caller (**3**) potentially committing the transaction (if it was started by the engine).


# Asynchronous Continuations

## Why Asynchronous Continuations?

In some cases the synchronous behavior is not desired. Sometimes it is useful to have custom control over transaction boundaries in a process.
The most common motivation is the requirement to scope *logical units of work*. Consider the following process fragment:

{{< img src="../img/transactions-2.png" title="Asynchronous Continuations" >}}

We are completing the user task, generating an invoice and then sending that invoice to the customer. It can be argued that the generation of the invoice is not part of the same unit of work: we do not want to roll back the completion of the usertask if generating an invoice fails.
Ideally, the process engine would complete the user task (**1**), commit the transaction and return
control to the calling application (**2**). In a background thread (**3**), it would generate the invoice.
This is the exact behavior offered by asynchronous continuations: they allow us to scope transaction
boundaries in the process.


## Configure Asynchronous Continuations

Asynchronous Continuations can be configured *before* and *after* an activity. Additionally, a
process instance itself may be configured to be started asynchronously.

An asynchronous continuation before an activity is enabled using the `camunda:asyncBefore` extension
attribute:

```xml
<serviceTask id="service1" name="Generate Invoice" camunda:asyncBefore="true" camunda:class="my.custom.Delegate" />
```

An asynchronous continuation after an activity is enabled using the `camunda:asyncAfter` extension
attribute:

```xml
<serviceTask id="service1" name="Generate Invoice" camunda:asyncAfter="true" camunda:class="my.custom.Delegate" />
```

Asynchronous instantiation of a process instance is enabled using the `camunda:asyncBefore`
extension attribute on a process-level start event.
On instantiation, the process instance will be created and persisted in the database, but execution
will be deferred. Also, execution listeners will not be invoked synchronously. This can be helpful
in various situations such as [heterogeneous clusters]({{< ref "/user-guide/process-engine/the-job-executor.md#cluster-setups" >}}),
when the execution listener class is not available on the node that instantiates the process.

```xml
<startEvent id="theStart" name="Invoice Received" camunda:asyncBefore="true" />
```


## Asynchronous Continuations of Multi-Instance Activities

A [multi-instance activity]({{< ref "/reference/bpmn20/tasks/task-markers.md#multiple-instances" >}}) can be configured for asynchronous continuation like other activities. Declaring asynchronous continuation of a multi-instance activity makes the multi-instance body asynchronous, that means, the process continues asynchronously *before* the instances of that activity are created or *after* all instances have ended.

Additionally, the inner activity can also be configured for asynchronous continuation using the `camunda:asyncBefore` and `camunda:asyncAfter` extension attributes on the `multiInstanceLoopCharacteristics` element:

```xml
<serviceTask id="service1" name="Generate Invoice" camunda:class="my.custom.Delegate">
	<multiInstanceLoopCharacteristics isSequential="false" camunda:asyncBefore="true">
 		<loopCardinality>5</loopCardinality>
	</multiInstanceLoopCharacteristics>
</serviceTask>
```

Declaring asynchronous continuation of the inner activity makes each instance of the multi-instance activity asynchronous. In the above example, all instances of the parallel multi-instance activity will be created but their execution will be deferred. This can be useful to take more control over the transaction boundaries of the multi-instance activity or to enable true parallelism in case of a parallel multi-instance activity.


## Understand Asynchronous Continuations

To understand how asynchronous continuations work, we first need to understand how an activity is
executed:

{{< img src="../img/process-engine-activity-execution.png" title="Asynchronous Continuations" >}}

The above illustration shows how a regular activity which is entered and left by a sequence flow is
executed:

1. The "TAKE" listeners are invoked on the sequence flow entering the activity.
2. The "START" listeners are invoked on the activity itself.
3. The behavior of the activity is executed: the actual behavior depends on the type of the
   activity: in case of a `Service Task` the behavior consists of invoking [Delegation Code]({{< ref "/user-guide/process-engine/delegation-code.md" >}}), in case of a `User Task`, the behavior consists of creating a `Task` instance in the task list etc...
4. The "END" listeners are invoked on the activity.
5. The "TAKE" listeners of the outgoing sequence flow are invoked.

Asynchronous Continuations allow putting break points between the execution of the sequence flows
and the execution of the activity:

{{< img src="../img/process-engine-async.png" title="" >}}

The above illustration shows where the different types of asynchronous continuations break the
execution flow:

* An asynchronous continuation BEFORE an activity breaks the execution flow between the invocation
  of the incoming sequence flow's TAKE listeners and the execution of the activity's START
listeners.
* An asynchronous continuation AFTER an activity breaks the execution flow between the invocation of
  the activity's END listeners and the outgoing sequence flow's TAKE listeners.

Asynchronous continuations directly relate to transaction boundaries: putting an asynchronous
continuation before or after an activity creates a transaction boundary before or after the activity:

{{< img src="../img/process-engine-async-transactions.png" title="" >}}

What's more, asynchronous continuations are always executed by the [Job
Executor]({{< ref "/user-guide/process-engine/the-job-executor.md" >}}).


# Rollback on Exception

We want to emphasize that in case of a non handled exception, the current transaction gets rolled back and the process instance is in the last wait state (save point). The following image visualizes that.

{{< img src="../img/transactions-3.png" title="Rollback" >}}

If an exception occurs when calling `startProcessInstanceByKey` the process instance will not be saved to the database at all.


# Reasoning for This Design

The above sketched solution normally leads to discussion, as people expect the process engine to stop in case the task caused an exception. Also, other BPM suites often implement every task as a wait state. However, this approach has a couple of **advantages**:

 * In test cases you know the exact state of the engine after the method call, which makes assertions on process state or service call results easy.
 * In production code the same is true; allowing you to use synchronous logic if required, for example because you want to present a synchronous user experience in the front-end.
 * The execution is plain Java computing which is very efficient in terms of performance.
 * You can always switch to 'asyncBefore/asyncAfter=true' if you need different behavior.

However, there are consequences which you should keep in mind:

 * In case of exception,s the state is rolled back to the last persistent wait state of the process instance. It might even mean that the process instance will never be created! You cannot easily trace the exception back to the node in the process causing the exception. You have to handle the exception in the client.
 * Parallel process paths are not executed in parallel in terms of Java Threads, the different paths are executed sequentially, since we only have and use one Thread.
 * Timers cannot fire before the transaction is committed to the database. Timers are explained in more detail later, but they are triggered by the only active part of the Process Engine where we use own Threads: The Job Executor. Hence they run in an own thread which receives the due timers from the database. However, in the database the timers are not visible before the current transaction is visible. So the following timer will never fire:

{{< img src="../img/NotWorkingTimerOnServiceTimeout.png" title="Not Working Timeout" >}}


# Transaction Integration

The process engine can either manage transactions on its own ("Standalone" transaction management)
or integrate with a platform transaction manager.


## Standalone Transaction Management

If the process engine is configured to perform standalone transaction management, it always opens a
new transaction for each command which is executed. To configure the process engine to use
standalone transaction management, use the
`org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration`:

```java
ProcessEngineConfiguration.createStandaloneProcessEngineConfiguration()
  ...
  .buildProcessEngine();
```

The use cases for standalone transaction management are situations where the process engine does not
have to integrate with other transactional resources such as secondary datasources or messaging
systems.

{{< note title="" class="info" >}}
  In the Tomcat distribution the process engine is configured using standalone transaction management.
{{< /note >}}


## Transaction Manager Integration

The process engine can be configured to integrate with a transaction manager (or transaction
management systems). Out of the box, the process engine supports integration with Spring and JTA
transaction management. More information can be found in the following chapters:

* [Section on Spring Transaction Management][tx-spring]
* [Section on JTA Transaction Management][tx-jta]

The use cases for transaction manager integration are situations where the process engine needs to
integrate with

* transaction focused programming models such as Java EE or Spring (think about transaction scoped
  JPA entity managers in Java EE),
* other transactional resources such as secondary datasources, messaging systems or other
  transactional middleware like the web services stack.

[tx-spring]: {{< ref "/user-guide/spring-framework-integration/_index.md#spring-transaction-integration" >}}
[tx-jta]: {{< ref "/user-guide/cdi-java-ee-integration/_index.md" >}}

# Optimistic Locking

The Camunda Engine can be used in multi threaded applications. In such a setting, when multiple threads interact with the process engine concurrently, it can happen that these threads attempt to do changes to the same data. For example: two threads attempt to complete the same User Task at the same time (concurrently). Such a situation is a conflict: the task can be completed only once.

Camunda Engine uses a well known technique called "Optimistic Locking" (or Optimistic Concurrently Control) to detect and resolve such situations.

This section is structured in two parts: The first part introduces Optimistic Locking as a concept. You can skip this section in case you are already familiar with Optimistic Locking as such. The second part explains the usage of Optimistic Locking in Camunda.

## What is Optimistic Locking?

Optimistic Locking (also Optimistic Concurrency Control) is a method for concurrency control, which is used in
transaction based systems. Optimistic Locking is most efficient in situations in which data is read more frequently than it is changed. Many threads can read the same data objects at the same time without excluding each other. Consistency is then ensured by detecting conflicts and preventing updates in situations in which multiple threads attempt to change the same data objects concurrently. If such a conflict is detected, it is ensured that only one update succeeds and all others fail.

### Example

Assume we have a database table with the following entry:

  <table border="1" width="400" align="center" class="table table-condensed">
    <tr>
      <th>Id</th>
      <th>Version</th>
      <th>Name</th>
      <th>Address</th>
      <th>...</th>      
    </tr>
    <tr>
      <td>8</td>
      <td>1</td>
      <td>Steve</td>
      <td>3, Workflow Boulevard, Token Town</td>
      <td>...</td>
    </tr>
    <tr>
     <td>...</td>
     <td>...</td>
     <td>...</td>
     <td>...</td>
     <td>...</td>
    </tr>
  </table>

The above table shows a single row holding user data. The user has a unique Id (primary key), a version, a name and a current address.

We now construct a situation in which 2 transactions attempt to update this entry, one attempting to change the address, the other one attempting to delete the user. The intended behavior is that once of the transactions succeeds and the other is aborted with an error indicating that a concurrency conflict was detected. The user can then decide to retry the transaction based on the latest state of the data:

{{< img src="../img/optimisticLockingTransactions.png" title="Transactions with Optimistic Locking" >}}

As you can see in the picture above, `Transaction 1` reads the user data, does something with the data, deletes the user and then commits.
`Transaction 2` starts at the same time and reads the same user data, and also works on the data. When `Transaction 2` attempts to update the user address a conflict is detected (since `Transaction 1` has already deleted the user).

The conflict is detected because the current state of the user data is read when `Transaction 2` performs the update. At that time, the concurrent `Transaction 1` has already marked the row to be deleted. The database now waits for `Transaction 1` to end. After it is ended, `Transaction 2 ` can proceed. At this time, the row does not exist anymore and the update succeeds but reports to have changed `0` rows. An application can react to this and rollback `Transaction 2` to prevent other changes made by that transaction to become effective.

The application (or the user using it) can further decide whether `Transaction 2` should be retried. In our example, the transaction would then not find the user data and report that the user has been deleted.

### Optimistic Locking vs. Pessimistic Locking

Pessimistic Locking works with read locks. A read lock locks a data object on read, preventing other concurrent transactions from reading it as well. This way, conflicts are prevented from occurring.

In the example above, `Transaction 1` would lock the user data once it reads it. When attempting to read is as well, `Transaction 2` is blocked from making progress. Once `Transaction 1` completes, `Transaction 2` can progress and reads the latest state. This way conflicts are prevented as transactions always exclusively work on the latest state of data.

Pessimistic Locking is efficient in situations where writes are as frequent as reads and with high contention.

However, since pessimistic locks are exclusive, concurrency is reduced, degrading performance. Optimistic Locking, which detects conflicts rather than preventing them to occur, is therefore preferable in the context of high levels of concurrency and where reads are more frequent than writes. Also, Pessimistic Locking can quickly lead to deadlocks.

### Further Reading

* [\[1\] Wikipedia: Optimistic concurrency control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control)
* [\[2\] Stackoverflow: Optimistic vs. Pessimistic Locking](http://stackoverflow.com/questions/129329/optimistic-vs-pessimistic-locking)

## Optimistic Locking in Camunda

Camunda uses Optimistic Locking for concurrency control. If a concurency conflict is detected, 
an exception is thrown and the transaction is rolled back. Conflicts are detected when _UPDATE_ or _DELETE_ statements are executed. 
The execution of delete or update statements return an affected rows count. 
If this count is equal to zero, it indicates that the row was previously updated or deleted.
In such cases a conflict is detected and an `OptimisticLockingException` is thrown.

### The OptimisticLockingException

The `OptimisticLockingException` can be thrown by API methods.
Consider the following invocation of the `completeTask(...)` method:

```java
taskService.completeTask(aTaskId); // may throw OptimisticLockingException
```
The above method may throw an `OptimisticLockingException` in case executing the method call leads to concurrent modification of data.

Job execution can also cause an `OptimisticLockingException` to be thrown. Since this is expected, the execution will be retried.

#### Handling Optimistic Locking exceptions

In case the current Command is triggered by the Job Executor, `OptimisticLockingException`s are handled automatically using retries. Since this exception is expected to occur, it does not decrement the retry count.

If the current Command is triggered by an external API call, the Camunda Engine rolls back the current transaction to the last save point (wait state). Now the user has to decide how the exception should be handled, if the transaction should be retried or not. Also consider that even if the transaction was rolled back, it may have had non-transactional side effects which have not been rolled back.

To control the scope of transactions, explicit save points can be added before and after activities using Asynchronous Continuations.

### Common Places Where Optimistic Locking Exceptions Are Thrown

There a some common places where an `OptimisticLockingException` can be thrown.
For example

* Competing external requests: completing the same task twice, concurrently.
* Synchronization points inside a process: Examples are parallel gateway, multi instance, etc.

The following model shows a parallel gateway, on which the `OptimisticLockingException` can occur.

{{< img src="../img/optimisticLockingParallel.png" title="Optimistic Locking in parallel gateway" >}}

There are two user tasks after the opening parallel gateway. The closing parallel gateway, after the user tasks, merges the executions to one.
In most cases, one of the user tasks will be completed first. Execution then waits on the closing parallel gateway until the second user task is completed.

However, it is also possible that both user tasks are completed concurrently. Say the user task above is completed. The transaction assumes he is the first on the closing parallel gateway.
The user task below is completed concurrently and the transaction also assumes he is the first on the closing parallel gateway.
Both transactions try to update a row, which indicates that they are the first on the closing parallel gateway. In such cases an `OptimisticLockingException` is thrown. One of the transactions is rolled back and the other one succeeds to update the row.

### Optimistic Locking and Non-Transactional Side Effects

After the occurrence of an `OptimisticLockingException`, the transaction is rolled back. Any transactional work will be undone.
Non-transactional work like creation of files or the effects of invoking non-transactional web services will not be undone. This can end in inconsistent state.

There are several solutions to this problem, the most common one is eventual consolidation using retries.

### Internal Implementation Details

Most of the Camunda Engine database tables contain a column called `REV_`. This column represents the revision version.
When reading a row, data is read at a given "revision". Modifications (UPDATEs and DELETEs) always attempt to update the revision which was read by the current command. Updates increment the revision. After executing a modification statement, the affected rows count is checked. If the count is `1` it is deduced that the version read was still current when executing the modification. In case the affected rows count is `0`, other transaction modified the same data while this transaction was running. This means that a concurrency conflict is detected and this transaction must not be allowed to commit. Subsequently, the transaction is rolled back (or marked rollback-only) and an `OptimisticLockingException` is thrown.
