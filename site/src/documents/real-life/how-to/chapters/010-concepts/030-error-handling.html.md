---

title: 'Error Handling'
category: 'Concepts'

---


## Error Handling Strategies

There are a couple of basic strategies to handle errors and exceptions within processes. The decision which strategy to use depends on:

 *   Technical vs. Business Errors: Does the error have some business meaning and causes an alternative process flow (like item not on stock) or is it some technical malfunction (like network currently down)?
 *   Explicit error handling or generic approach: For some situations you want to explicitly model what should happen in case of an error (typcially for business errors). For a lot of situations you don't want to do that but have some generic mechanism which applies for errors, simplyfying your process models (typical for technical errors, imagine you would have to model network outtage on every task were it might possibly occur? You woldn't recognize your business process any more).

In the context of the fox engine, errors are normally raised as Java excepions you have to handle. Let's have a look on how to handle them.

### Transaction Rollbacks

The standard handling strategy is that exceptions are thrown to the client, meaning the current transaction is rolled back. This means the process state is rolled back to the last wait state. This behavior is described in detail in [Transactions in Processes](@docUrl('guides/user-guide/#process-engine-transactions-in-processes')). The error handling is delegated to the client of the engine.

As a concrete example this would mean, that the user gets an error dialog on the fronted, that the stock management software is currently not reachable due to network errors. To retry the user might have to click the same button again. Even if this is often not desired it is still a simple strategy applicable in a lot of situations.

### Async and Failed Jobs

If you don't want the exception being show to the user one option is to make service calls which might cause an error async as described in [Transactions in Processes](@docUrl('guides/user-guide/#process-engine-transactions-in-processes')). In this case the exception is stored in the process engine database and [The Job](guides/user-guide/#process-engine-the-job-executor) in the background is marked as failed (to be more precise, the exception is stored and some retry counter is decremented).

In the example above this means that the user will not see an error but an "everything successful" dialog. The exception is stored on the job. Now either a clever retry strategy will automatically re-trigger the job later on (when the network is available again) or some operator needs to have a look at the error and trigger an additional retry. This is shown later in more details.

This strategy is pretty powerful and applied often in real-life projects, however, it still hides the error from the BPMN diagram, so for business errors which you want to be visible in the process diagram, you better use error events as described below.

### Catch Exception and use data based XOR-Gateway

If you call Java Code which can throw an exception you can catch the exception within the Java Delegate, CDI Bean or whatsoever. Maybe it is already sufficient to log some information and go on, meaning to ignore the error. More often you write the result into some process variable and model an XOR-Gateway later in the process flow to take a different path if that error occurred.

In this case you model the error handling explicitly in the process model but let it look like a normal result and not like an error. From a business perspective it is not an error but a result, so the decision should not be made lightly. A rule of thumb is that results can be handled this way, exceptional errors should not. However the BPMN perspective does not always have to match the technical implementation. 

Example:

<center>
  <img src="ref:asset:/assets/img/real-life/error-result-xor.png" class="img-responsive"/>
</center>

We trigger a "check data completeness" task. The Java Service might throw an "DataIncompleteException". However, if we check for completeness, incomplete data is not a exception, but an expected result, so we prefer using an XOR-Gateway in the process flow, evaluation a process variable, e.g. "#{dataComplete==false}".

### BPMN 2.0 Error Event

The BPMN 2.0 error event gives you a possibility to explicitly model errors, tackling the use case of business errors. The most prominent example is the "intermediate catching error event", which can be attached to the boundary of an activity. Defining a boundary error event makes most sense on an embedded subprocess, a call activity or a Service Task. An error will cause the alternative process flow to be triggered:

<img src="ref:asset:/assets/img/real-life/bpmn.boundary.error.event.png" class="img-responsive"/>


See [BPMN Error Events](ref:/api-references/bpmn20/#events-error-events) and [Throwing Errors from Delegation Code](ref:/guides/user-guide/#process-engine-delegation-code-throwing-bpmn-errors-from-delegation-code) for more information. 


### BPMN 2.0 Compensation and Business Transactions

BPMN 2.0 transactions and compensations allow you to model business transaction boundaries, but not in a technical ACID manner, and make sure already executed actions are compensated during rollback. Compensation means, to make the effect of the action invisible, e.g. book in goods if you have booked out goods before, see [BPMN Compensation event](ref:/api-references/bpmn20/#events-cancel-and-compensation-events) and [BPMN Transaction Subprocess](ref:/api-references/bpmn20/#subprocesses-transaction-subprocess) for details.


# Monitoring and Recovery Strategies

In case the error occurred different recovery strategies can be applied.

### Let the user retry

As mentioned above, the simplest error handling strategy is to throw the exception to the client, meaning the user has to retry the aciton himself. How he does that is up to the user, normally reloading the page or clicking again.

### Retry failed Jobs

If you use Jobs (`async`) you can leverage Cockpit as monitoring too to handle failed jobs, in this case no end user sees the exception. Then you normally see failures in cockpit when the retries are used up (see [Failed Jobs](ref:/guides/user-guide/#process-engine-the-job-executor-failed-jobs)). 


See [Failed Jobs in Cockpit](ref:/guides/user-guide/#cockpit-failed-jobs) for more details.

If you don't want to use cockpit you could find the failed jobs via the API yourself as well:

```java
List<Job> failedJobs = processEngine.getManagementService().createJobQuery().withException().list();
for (Job failedJob : failedJobs) {
  processEngine.getManagementService().setJobRetries(failedJob.getId(), 1);
}
```

### Explicit Modeling

Of course you can always model explicitly some retry mechanism as pointed out in [Where is the retry in BPMN 2.0](http://www.bpm-guide.de/2012/06/15/where-is-the-retry-in-bpmn-2-0/):

<center>
  <img src="ref:asset:/assets/img/real-life/retry.png" class="img-responsive"/>
</center>

We would recommend to limit it to cases where you either want to see it in the process diagram for a good reason. We prefer asynchronous continuation, since it doesn't bloat your process diagram and basically can do the same thing with even less runtime overhead, since "walking" through the modeled loop involves e.g. writing an audit log.

### User Tasks for Operations

We often see something like this in projects:

<center>
  <img src="ref:asset:/assets/img/real-life/error-handling-user-task.png" class="img-responsive"/>
</center>

Actually this is a valid approach where you assign errors as User Tasks to some operator and model what possibilities he has to solve the problem. However, this is a strange mixture: We want to handle some technical error but add it to our business process model. Where do we stop? Don't we have to model it on every Service Task now?

Having a failed jobs list instead of using the "normal" task list feels like a more natural approach for this situation, that's why we normally recommend the other possibility and do not consider this to be best practice.