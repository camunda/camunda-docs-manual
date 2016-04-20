---

title: 'JNDI Bindings for BPM Platform Services'
weight: 20

menu:
  main:
    identifier: "user-guide-runtime-container-integration-jndi"
    parent: "user-guide-runtime-container-integration"

---

The BPM Platform Services (i.e. Process Engine Service and Process Application Service) are provided via JNDI Bindings with the following JNDI names:

* Process Engine Service: `java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService`
* Process Application Service: `java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService`

On Glassfish 3.1.1, JBoss AS 7 and Wildfly 8 / 10 you are able get any on these BPM Platform Services through a JNDI lookup. However, on Apache Tomcat 8 you have to do quite a bit more to be able to do a lookup to get one of these BPM Platform Services.
