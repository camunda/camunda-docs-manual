---

title: 'Apache Tomcat 7 Integration'
weight: 30

menu:
  main:
    name: "Apache Tomcat"
    identifier: "user-guide-runtime-container-integration-tomcat"
    parent: "user-guide-runtime-container-integration"

---


# JNDI Bindings

To use the JNDI Bindings for BPM Platform Services on Apache Tomcat 7 you have to add the file `META-INF/context.xml` to your process application and add the following [ResourceLinks](http://tomcat.apache.org/tomcat-7.0-doc/config/context.html#Resource_Links):

```xml
<Context>
  <ResourceLink name="ProcessEngineService"
    global="global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService"
    type="org.camunda.bpm.ProcessEngineService" />

  <ResourceLink name="ProcessApplicationService"
    global="global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService"
    type="org.camunda.bpm.ProcessApplicationService" />
</Context>
```

These elements are used to create a link to the global JNDI Resources defined in `$TOMCAT_HOME/conf/server.xml`.

Furthermore, declare the dependency on the JNDI binding inside the `WEB-INF/web.xml` deployment descriptor.

```xml
<web-app>
  <resource-ref>
    <description>Process Engine Service</description>
    <res-ref-name>ProcessEngineService</res-ref-name>
    <res-type>org.camunda.bpm.ProcessEngineService</res-type>
    <res-auth>Container</res-auth>
  </resource-ref>
  <resource-ref>
    <description>Process Application Service</description>
    <res-ref-name>ProcessApplicationService</res-ref-name>
    <res-type>org.camunda.bpm.ProcessApplicationService</res-type>
    <res-auth>Container</res-auth>
  </resource-ref>
  ...
</web-app>
```

**Note**: You can choose different resource link names for the Process Engine Service and Process Application Service. The resource link name has to match the value inside the `<res-ref-name>`-element inside the corresponding `<resource-ref>`-element in `WEB-INF/web.xml`. We propose the name `ProcessEngineService` for the Process Engine Service and `ProcessApplicationService` for the Process Application Service.

To do a lookup for a BPM Platform Service you have to use the resource link name to get the linked global resource. For example:

* Process Engine Service: `java:comp/env/ProcessEngineService`
* Process Application Service: `java:comp/env/ProcessApplicationService`

If you have declared other resource link names than we proposed, you have to use `java:comp/env/$YOUR_RESOURCE_LINK_NAME` to do a lookup to get the corresponding BPM Platform Service.


# Job Executor Configuration

## Tomcat Default Job Executor

The BPM platform on Apache Tomcat 7.x uses the default job executor. The default [job executor]({{< ref "/user-guide/process-engine/the-job-executor.md" >}}) uses a ThreadPoolExecutor which manages a thread
pool and a job queue.

The core pool size, queue size, maximum pool size and keep-alive-time can be configured in the `bpm-platform.xml`.
After configuring job acquisition, it is possible to set the values with the help of a `<properties>`
tag. The correct syntax can be found in the [references]({{< ref "/reference/deployment-descriptors/tags/job-executor.md" >}}).

All the previously mentioned properties except the queue size can be modified at runtime via the use of a JMX client.


## Core Pool Size

The ThreadPoolExecutor automatically adjusts the size of the thread pool. The number of threads in
the thread pool will tend to come to equilibrium with the number of threads set to core pool size.
If a new job is presented to the job executor and the total number of threads in the pool is less
than core, then a new thread will be created. Hence on initial use, the number of threads in the
thread pool will ramp up to the core thread count.

* The default core pool size is 3.


## Queue Size

The ThreadPoolExecutor includes a job queue for buffering jobs. Once the core number of threads has
been reached (and are in use), a new job presented to the job executor will result in the job being
added to the ThreadPoolExecutor job queue.

* The default maximum length of the job queue is 3.


## Maximum Pool Size

If the length of the queue were to exceed the maximum queue size, and the number of threads in the
thread pool is less than the maximum pool size, then an additional thread is added to the thread
pool. This will continue until the number of threads in the pool is equal to the maximum pool size:

* The default maximum pool size is 10.


## KeepAlive

If a thread remains idle in the thread pool for longer than the keepalive time, and the number of
threads exceeds core pool size, then the thread will be terminated. Hence the pool tends to settle
around core thread count.

* The default keepalive time is 0.


## Clustered Deployment

In a clustered deployment, multiple job executors will work with each other (Note: see [Job
Execution in Heterogeneous
Clusters]({{< ref "/user-guide/process-engine/the-job-executor.md#job-execution-in-heterogeneous-clusters" >}})).
On startup, each job executor allocates a UUID which is used for identifying locked job ownership in the job
table.  Hence in a two node cluster, the job executors may total up to 20 concurrent threads of
execution.
