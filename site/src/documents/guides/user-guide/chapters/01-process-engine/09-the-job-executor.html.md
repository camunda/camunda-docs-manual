---

title: 'The Job Executor'
category: 'Process Engine'

---

A job is an explicit representation of a task to trigger process execution. A job is created whenever a wait state is reached during process execution that has to be triggered internally. This is the case when a timer event or a task marked for asynchronous execution (see [transaction boundaries](ref:#process-engine-transactions-in-processes)) is approached. The job executor has two responsibilities: job acquisition and job execution. The following diagram illustrates this:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/job-executor-basic-architecture.png"/></center>

## Job Executor Activation

By default, the JobExecutor is activated when the process engine boots. For unit testing scenarios it is cumbersome to work with this background component. Therefore the Java API offers to query for (`ManagementService.createJobQuery`) and execute jobs (`ManagementService.executeJob`) *by hand*, which allows to control job execution from within a unit test. To avoid interference with the job executor, it can be switched off.

Specify

    <property name="jobExecutorActivate" value="false" />

in the process engine configuration when you don't want the JobExecutor to be activated upon booting the process engine.

## Job Acquisition

Job acquisition is the process of retrieving jobs from the database that are to be executed next. Therefore jobs must be persisted to the database together with properties determining whether a job can be executed. For example, a job created for a timer event may not be executed before the defined time span has passed.

### Persistence

Jobs are persisted to the database, in the `ACT_RU_JOB` table. This database table has the following columns (among others):

    ID_ | REV_ | LOCK_EXP_TIME_ | LOCK_OWNER_ | RETRIES_ | DUEDATE_

Job acquisition is concerned with polling this database table and locking jobs.

### Acquirable Jobs

A job is acquirable, i.e. a candidate for execution, if it fulfills all following conditions:

* it is due, meaning that the value in the DUEDATE_ column is in the past
* it is not locked, meaning that the value in the LOCK_EXP_TIME_ column is in the past
* its retries have not elapsed, meaning that the value in the RETRIES_ column is greater than zero.

In addition, the process engine has a concept of suspending a process definition and a process instance. A job is only acquirable if neither the corresponding process instance nor the corresponding process definition are suspended.

### The two Phases of Job Acquisition

Job acquisition has two phases. In the first phase the job executor queries for a configurable amount of acquirable jobs. If at least one job can be found, it enters the second phase, locking the jobs. Locking is necessary in order to ensure that jobs are executed exactly once. In a clustered scenario, it is accustom to operate multiple job executor instances (one for each node) that all poll the same ACT&#95;RU&#95;JOB table. Locking a job ensures that it is only acquired by a single job executor instance. Locking a job means updating its values in the LOCK&#95;EXP&#95;TIME&#95; and LOCK&#95;OWNER_ columns. The LOCK&#95;EXP&#95;TIME&#95; column is updated with a timestamp signifying a date that lies in the future. The intuition behind this is that we want to lock the job until that date is reached. The LOCK&#95;OWNER&#95; column is updated with a value uniquely identifying the current job executor instance. In a clustered scenario this could be a node name uniquely identifying the current cluster node.

The situation where multiple job executor instances attempt to lock the same job concurrently is accounted for by using optimistic locking (see REV&#95; column).

After having locked a job, the job executor instance has effectively reserved a time slot for executing the job: once the date written to the LOCK&#95;EXP&#95;TIME&#95; column is reached it will be visible to job acquisition again. In order to execute the acquired jobs, they are passed to the acquired jobs queue.

## Job Execution

### Thread Pool

Acquired jobs are executed by a thread pool. The thread pool consumes jobs from the acquired jobs queue. The acquired jobs queue is an in-memory queue with a fixed capacity. When an executor starts executing a job, it is first removed from the queue.

In the scenario of an embedded process engine, the default implementation for this thread pool is a `java.util.concurrent.ThreadPoolExecutor`. However, this is not allowed in Java EE environments. There we hook into the application server capabilities of thread management. See the platform-specific information in the [Runtime Container Integration](ref:#runtime-container-integration) section on how this achieved.

### Failed Jobs

Upon failure of job execution, e.g. if a service task invocation throws an exception, a job will be retried a number of times (by default 3). It is not immediately retried and added back to the acquisition queue, but the value of the RETRIES&#95; column is decreased. The process engine thus performs bookkeeping for failed jobs. After updating the RETRIES&#95; column, the executor moves on to the next job. This means that the failed job will automatically be retried once the LOCK&#95;EXP&#95;TIME&#95; date is expired.

In real life it is useful to configure the retry strategy, i.e. the number of times a job is retried and when it is retried, so the LOCK&#95;EXP&#95;TIME&#95;. In the camunda engine, this can be configured as an extension element of a task in the BPMN 2.0 XML:

    <definitions ... xmlns:camunda="http://activiti.org/bpmn">
      ...
      <serviceTask id="failingServiceTask" camunda:async="true" camunda:class="org.camunda.engine.test.cmd.FailingDelegate">
        <extensionElements>
          <camunda:failedJobRetryTimeCycle>R5/PT5M</camunda:failedJobRetryTimeCycle>
        </extensionElements>
      </serviceTask>
      ...
    </definitions>

The configuration follows the [ISO_8601 standard for repeating time intervals](http://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals). In the example, `R5/PT5M` means that the maximum number of retries is 5 (`R5`) and the delay of retry is 5 minutes (`PT5M`).

Similarly, the following example defines three retries after 5 seconds each for a boundary timer event:

    <boundaryEvent id="BoundaryEvent_1" name="Boundary event" attachedToRef="Freigebenden_zuordnen_143">
      <extensionElements>
        <camunda:failedJobRetryTimeCycle>R3/PT5S</camunda:failedJobRetryTimeCycle>
      </extensionElements>
      <outgoing>SequenceFlow_3</outgoing>
      <timerEventDefinition id="sid-ac5dcb4b-58e5-4c0c-b30a-a7009623769d">
        <timeDuration xsi:type="tFormalExpression" id="sid-772d5012-17c2-4ae4-a044-252006933a1a">PT10S</timeDuration>
      </timerEventDefinition>
    </boundaryEvent>

Recap: a retry may be required, if there are any failures during the transaction which follows the timer.

## Concurrent Job Execution

The Job Executor makes sure that **jobs from a single process instance are never executed concurrently**. Why is this? Consider the following process definition:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/job-executor-exclusive-jobs.png"/></center>

We have a parallel gateway followed by three service tasks which all perform an asynchronous continuation. As a result of this, three jobs are added to the database. Once such a job is present in the database it can be processed by the job executor. It acquires the jobs and delegates them to a thread pool of worker threads which actually process the jobs. This means that using an asynchronous continuation, you can distribute the work to this thread pool (and in a clustered scenario even across multiple thread pools in the cluster).

This is usually a good thing. However it also bears an inherent problem: consistency. Consider the parallel join after the service tasks. When the execution of a service task is completed, we arrive at the parallel join and need to decide whether to wait for the other executions or whether we can move forward. That means, for each branch arriving at the parallel join, we need to take a decision whether we can continue or whether we need to wait for one or more other executions from the other branches.

This requires synchronization between the branches of execution. The engine addresses this problem with optimistic locking. Whenever we take a decision based on data that might not be current (because another transaction might modify it before we commit), we make sure to increment the revision of the same database row in both transactions. This way, whichever transaction commits first wins and the other ones fail with an optimistic locking exception. This solves the problem in the case of the process discussed above: if multiple executions arrive at the parallel join concurrently, they all assume that they have to wait, increment the revision of their parent execution (the process instance) and then try to commit. Whichever execution is first will be able to commit and the other ones will fail with an optimistic locking exception. Since the executions are triggered by a job, the job executor will retry to perform the same job after waiting for a certain amount of time and hopefully this time pass the synchronizing gateway.

However, while this is a perfectly fine solution from the point of view of persistence and consistency, this might not always be desirable behavior at a higher level, especially if the execution has non-transactional side effects, which will not be rolled back by the failing transaction. For instance, if the *book concert tickets* service does not share the same transaction as the process engine, we might book multiple tickets if we retry the job. That is why jobs of the same process instance are processed *exclusively* by default.

### Exclusive Jobs

An exclusive job cannot be performed at the same time as another exclusive job from the same process instance. Consider the process shown in the section above: if the jobs correpsonding to the service tasks are treated as exclusive, the job executor will make sure that they are not executed concurrently. Instead, it will ensure that whenever it acquires an exclusive job from a certain process instance, it also acquires all other exclusive jobs from the same process instance and delegates them to the same worker thread. This enforces sequential execution of the jobs.

**Exclusive Jobs are the default configuration**. All asynchronous continuations and timer events are thus exclusive by default. In addition, if you want a job to be non-exclusive, you can configure it as such using `camunda:exclusive="false"`. For example, the following service task would be asynchronous but non-exclusive.

  <serviceTask id="service" camunda:expression="${myService.performBooking(hotel, dates)}" camunda:async="true" camunda:exclusive="false" />

Is this a good solution? We had some people asking whether it was. Their concern was that it would prevent you from *doing things in parallel* and would thus be a performance problem. Again, two things have to be taken into consideration:

* It can be turned off if you are an expert and know what you are doing (and have understood this section). Other than that, it is more intuitive for most users if things like asynchronous continuations and timers just work.
* It is actually not a performance issue. Performance is an issue under heavy load. Heavy load means that all worker threads of the job executor are busy all the time. With exclusive jobs, the engine will simply distribute the load differently. Exclusive jobs means that jobs from a single process instance are performed by the same thread sequentially. But consider: you have more than one single process instance. And jobs from other process instances are delegated to other threads and executed concurrently. This means that with exclusive jobs the engine will not execute jobs from the same process instance concurrently but it will still execute multiple instances concurrently. From an overall throughput perspective this is desirable in most scenarios as it usually leads to individual instances being done more quickly.

## The Job Executor and Multiple Process Engines

In the case of a single, application-embedded process engine, the job executor setup is the following:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/job-executor-single-engine.png" /></center>

There exists a single job table that the engine adds jobs to and the acquisition consumes from. Creating a second embedded engine would therefore create another acquisition thread and execution thread-pool.

In larger deployments however, this quickly leads to a poorly manageable situation. When running camunda BPM on Tomcat or an application server, the platform allows to declare multiple process engines shared by multiple process applications. With respect to job execution, one job acquisition may serve multiple job tables (and thus process engines) and a single thread-pool for execution may be used.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/job-executor-multiple-engines.png"/></center>

**This setup enables centralized monitoring of job acquisition and execution**.
See the platform-specific information in the [Runtime Container Integration](ref:#runtime-container-integration) section on how the thread pooling is implemented on the different platforms.

Different job acquisitions can also be configured differently, e.g. to meet business requirements like SLAs. For example, the acquisition's timeout when no more executable jobs are present can be configured differently per acquisition.

To which job acquisition a process engine is assigned can be specified in the declaration of the engine, so either in the `processes.xml` deployment descriptor of a process application or in the camunda BPM platform descriptor. The following is an example configuration that declares a new engine and assigns it to the job acquisition named `default`, which is created when the platform is bootstrapped.

    <process-engine name="newEngine">
      <job-acquisition>default</job-acquisition>
      ...
    </process-engine>

Job acquisitions have to be declared in the BPM platform's deployment descriptor, see [the container-specific configuration options](ref:#runtime-container-integration).

## Cluster Setups

When running the camunda platform in a cluster, there is a distinction between *homogeneous* and *heterogeneous* setups. We define a cluster as a set of network nodes that all run the camunda BPM platform against the same database (at least for one engine on each node). In the *homogeneous* case, the same process applications (and thus custom classes like JavaDelegates) are deployed to all of the nodes, as depicted below.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/homogeneous-cluster.png"/></center>

In the *heterogeneous* case, this is not given, meaning that some process applications are deployed to only part of the nodes.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/heterogeneous-cluster.png"/></center>

### Job Execution in Heterogeneous Clusters

A heterogeneous cluster setup as described above poses additional challenges to the job executor. Both platforms declare the same engine, i.e. they run against the same database. This means that jobs will be inserted into the same table. However, in the default configuration the job acquisition thread of node 1 will lock any executable jobs of that table and submit them to the local job execution pool. This means, jobs created in the context of process application B (so on node 2), may be executed on node 1 and vice versa. As the job execution may involve classes that are part of B's deployment, you are likely going to see a `ClassNotFoundExeception` or any of the likes.

To prevent the job acquisition on node 1 from picking jobs that *belong* to node 2, the process engine can be configured as *deployment aware*, by the setting following property in the process engine configuration:

    <process-engine name="default">
      ...
      <properties>
        <property name="jobExecutorDeploymentAware">true</property>
        ...
      </properties>
    </process-engine>

Now, the job acquisition thread on node 1 will only pick up jobs that belong to deployments made on that node, which solves the problem. Digging a little deeper, the acquisition will only pick up those jobs that belong to deployments that were *registered* with the engines it serves. Every deployment gets automatically registered. Additionally, one can explicitly register and unregister single deployments with an engine by using the `ManagementService` methods `registerDeploymentForJobExecutor(deploymentId)` and `unregisterDeploymentForJobExecutor(deploymentId)`. It also offers a method `getRegisteredDeployments()` to inspect the currently registered deployments.

As this is configurable on engine level, you can also work in a *mixed* setup, when some deployments are shared between all nodes and some are not. You can assign the globally shared process applications to an engine that is not deployment aware and the others to a deployment aware engine, probably both running against the same database. This way, jobs created in the context of the shared process applications will get executed on any cluster node, while the others only get executed on their respective nodes.
