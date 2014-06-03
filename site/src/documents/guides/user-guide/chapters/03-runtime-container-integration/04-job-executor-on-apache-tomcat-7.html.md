---

title: 'Job Executor configuration on Apache Tomcat 7'
category: 'Runtime Container Integration'

---

#Tomcat Default Job Executor
The BPM platform on Apache Tomcat 7.x uses the DefaultJobExecutor. The default [job executor](ref:#process-engine-the-job-executor): uses a ThreadPoolExecutor which manages a thread pool and a job queue. A number of job executor parameters can be modified at runtime via the use of a JMX client.

###Core Pool Size
The ThreadPoolExecutor automatically adjusts the size of the thread pool. The number of threads in the thread pool will tend to come to equilibrium with the number of threads set to core pool size.
If a new job is presented to the job executor and the total number of threads in the pool is less than core, then a new thread will be created. Hence on initial use, the number of threads in the thread pool will ramp up to the core thread count.

* The core pool size defaults to 3.

###Queue Size
The ThreadPoolExecutor includes a job queue for buffering jobs. Once the core number of threads has been reached (and in use), a new job presented to the job executor will result in the job being added to the ThreadPoolExecutor job queue.

* The default maximum length of the job queue is 3.

###Maximum Pool Size
If the length of the queue were to exceed the maximum queue size, and the number of threads in the thread pool is less than the maximum pool size, then an additional thread is added to the thread pool. This will continue until the number of threads in the pool is equal to the maximum pool size:

* The default maximum pool size is 10.

###KeepAlive
If a thread remains idle in the thread pool for longer than the keepalive time, and the number of threads exceeds core pool size, then the thread will be terminated. Hence the pool tends to settle around core thread count.

###Clustered Deployment
In a clustered deployment, multiple job executors will work with each other. (Note: see [Job Execution in Heterogeneous Clusters](ref:#process-engine-the-job-executor):). On startup, each job executor allocates a UUID which is used for identifying locked job ownership in the job table.
Hence in a two node cluster, the job executors may total up to 20 concurrent threads of execution.