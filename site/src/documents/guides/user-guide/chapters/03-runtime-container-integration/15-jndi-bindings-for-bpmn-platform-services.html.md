---

title: 'JNDI Bindings for BPM Platform Services'
category: 'Runtime Container Integration'

---

The BPM Platform Services (i.e. Process Engine Service and Process Application Service) are provided via JNDI Bindings with the following JNDI names:

* Process Engine Service: `java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService`
* Process Application Service: `java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService`

On Glassfish 3.1.1 and on JBoss AS 7 you can do a lookup with the JNDI names to get one of these BPM Platform Services. However, on Apache Tomcat 7 you have to do quite a bit more to be able to do a lookup to get one of these BPM Platform Services.