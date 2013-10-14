---

title: 'Transactions in Processes'
category: 'Process Engine'

---

The process engine is a piece of passive Java Code, which works in the Thread of the client. For instance, if you have a web application allowing users to start a new process instance and a user clicks on the corresponding button, some thread from the application server's http-thread-pool will invoke the API method `runtimeService.startProcessInstanceByKey(...)`, thus *entering* the process engine and starting a new process instance. We call this "borrowing the client thread".


On any such *external* trigger (i.e. start a process, complete a task, signal an execution), the engine runtime is going to advance in the process until it reaches wait states on each active path of execution. A wait state is a task which is performed *later*, which means that the engine persists the current execution to the database and waits to be triggered again. For example in case of a user task, the external trigger on task completion causes the runtime to execute the next bit of the process until wait states are reached again (or the instance ends). In contrast to user tasks, a timer event is not triggered externally. Instead it is continued by an *internal* trigger. That is why the engine also needs an active component, the [job executor](ref:#process-engine-the-job-executor), which is able to fetch registered jobs and process them asynchronously.


## Wait States

 We talked about wait states as transaction boundaries where the process state is stored to the database, the Thread returns to the client and the transaction is committed. The following BPMN elements are always wait states:

<div data-bpmn-symbol="receivetask" data-bpmn-symbol-name="Receive Task">
	<a href="ref:/api-references/bpmn20/#tasks-receive-task">
	  <div id="1" title="go to Receive Task"></div>
	</a>
</div>
<br>
<div data-bpmn-symbol="usertask" data-bpmn-symbol-name="User Task">
	<a href="ref:/api-references/bpmn20/#tasks-user-task">
	  <div id="1" title="go to User Task"></div>
	</a>
</div>
<br>
<a href="ref:/api-references/bpmn20/#events-message-events"><div data-bpmn-symbol="intermediatecatchevent/message"  data-bpmn-symbol-name="Message"></div> Message Event</a><br>
<a href="ref:/api-references/bpmn20/#events-timer-events"><div data-bpmn-symbol="intermediatecatchevent/timer"  data-bpmn-symbol-name="Timer"></div> Timer Event</a><br>
<a href="ref:/api-references/bpmn20/#events-signal-events"><div data-bpmn-symbol="intermediatecatchevent/signal"  data-bpmn-symbol-name="Signal"></div> Signal Event</a><br><br>


The <a href="ref:/api-references/bpmn20/#gateways-event-based-gateway">Event Based Gateway</a>:

<div data-bpmn-diagram="implement/event-based-gateway" > </div>

And keep in mind that [Asynchronous Continuations](ref:/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continutaions) can add transaction boundaries to other tasks as well.

## Transaction Boundaries

The transition from one such stable state to another stable state is always part of one transaction, meaning that it succeeds as a whole or is rolled back on any kind of exception occuring during its execution. This is illustrated in the following example:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/transactions-1.png"/></center>

We see a segment of a BPMN process with a user task, a service task and a timer event. The timer event marks the next wait state. Completing the user task and validating the address is therefore part of the same unit of work, so it should succeed or fail atomically. That means that if the service task throws an exception we want to rollback the current transaction, such that the execution tracks back to the user task and the user task is still present in the database. This is also the default behavior of the process engine.

In **1**, an application or client thread completes the task. In that same thread the engine runtime is now executing the service task and advances until it reaches the wait state at the timer event (**2**). Then it returns the control to the caller (**3**) potentially committing the transaction (if it was started by the engine).



## Asynchronous Continuations


In some cases this behavior is not desired. Sometimes we need custom control over transaction boundaries in a process, in order to be able to scope logical units of work. Consider the following process fragment:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/transactions-2.png"/></center>

This time we are completing the user task, generating an invoice and then send that invoice to the customer. This time the generation of the invoice is not part of the same unit of work so we do not want to rollback the completion of the usertask if generating an invoice fails. So what we want the engine to do is complete the user task (**1**), commit the transaction and return the control to the calling application (**2**).

Then we want to generate the invoice asynchronously, in a background thread. A pool of background threads is managed by the [job executor](ref:#process-engine-the-job-executor). It periodically checks the database for asynchronous *jobs*, i.e. units of work in the process runtime.

So behind the scenes, when we reach the *generate invoice* task, we are persisting a job in the database, queueing it for later execution. This job is then picked up by the job executor and executed (**3**). We are also giving the local job executor a little hint that there is a new job, to improve performance. In order to use this feature, we can use the `camunda:async="true"` extension in the BPMN 2.0 XML. So for example, the service task would look like this:

    <serviceTask id="service1" name="Generate Invoice" camunda:class="my.custom.Delegate" camunda:async="true" />

`camunda:async` can be specified on the following bpmn task types: `task`, `serviceTask`, `scriptTask`, `businessRuleTask`, `sendTask`, `receiveTask`, `userTask`, `subProcess` and `callActivity`. On a user task, receive task or other wait states, the additional async continuation allows us to execute the start execution listeners in a separate thread/transaction.

A start event may also be declared as asynchronous in the same way as above by the attribute `camunda:async="true"`. On instantiation, the process instance will be created and persisted in the database, but execution will be deferred. Also, execution listeners will not be invoked synchronously. This can be helpful in various situations such as [heterogeneous clusters](ref:#process-engine-the-job-executor-cluster-setups), when the execution listener class is not available on the node that instantiates the process.

## Rollback on Exception

We want to emphasis that in case of a non handled exception the current transaction gets rolled back and the process instance is in the last wait state (safe point). The following image visualizes that.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/transactions-3.png"/></center>

If an exception occurs when calling `startProcessInstanceByKey` the process instance will not be saved to the database at all.

## Reasoning for this design

The above sketched solution normally leads to discussion as people expect the process engine to stop in the task caused an exception. Also other BPM suites often implement every task as wait state. But the approach has a couple of **advantages**:

 * In Testcases you know the exact state of the engine after the method call, which makes assertions on process state or service call results easy.
 * In production code the same is true; allowing you to use synchronous logic if required, for example because you want to present a synchronous user experience in the front-end as shown in the Tutorial "UI Mediator".
 * The execution is plain Java computing which is very efficient and performant.
 * You can always switch to 'async=true' if you need different behavior.

But there are consequences which you should keep in mind:

 * In case of Exceptions the state is rolled back to the last persistent wait state of the process instance. It might even mean that the process instance will never be created! You cannot easily trace the exception back to the node in the process causing the exception. You have to handle the exception in the client.
 * Parallel process paths are not executed parallelly in terms of Java Threads, the different paths are executed sequentially, since we only have and use one Thread.
 * Timers cannot fire before the transaction is committed to the database. Timers are explained in more detail later, but they are triggered by the only active part of the Process Engine where we use own Threads: The Job Executor. Hence they run in an own thread which receives the due timers from the database. But in the database the timers are not visible before the current transaction is visible. So the following timer will never fire:

<img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/NotWorkingTimerOnServiceTimeout.png"/>
