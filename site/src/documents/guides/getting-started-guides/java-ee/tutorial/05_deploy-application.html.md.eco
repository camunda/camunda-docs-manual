---
title: 'Deploy the Process Application'
category: 'Tutorial'
---

To deploy the process application select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`. This will generate a WAR file named `pizza-order.war` in the `target/` folder of your Maven project.

<p class="alert alert-info">
  If the <code>pizza-order.war</code> file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.
</p>

###Deploy to JBoss AS

To deploy the process application, copy and paste the `pizza-order.war` from your Maven project `target` folder to the `$CAMUNDA_HOME/server/jboss-as-VERSION/standalone/deployments` folder.

Check the log file of the JBoss server. If you see a log message like the following one, the deployment was successful:

<pre class="console">
11:27:10,067 INFO  [org.camunda.bpm.container.impl.jboss.service.ProcessApplicationDeploymentService] (ServerService Thread Pool -- 16) Deployment summary for process archive 'pizza-order' of process application 'pizza-order':

    pizza-order.bpmn

11:27:10,070 INFO  [javax.enterprise.resource.webcontainer.jsf.config] (ServerService Thread Pool -- 9) Initializing Mojarra 2.1.18-jbossorg-1 20130205-1414 for context '/pizza-order'
11:27:10,071 INFO  [org.camunda.bpm.engine.impl.bpmn.deployer.BpmnDeployer] (ServerService Thread Pool -- 16) Processing resource pizza-order.bpmn
11:27:10,199 INFO  [org.camunda.bpm.engine.impl.application.ProcessApplicationManager] (ServerService Thread Pool -- 16) ProcessApplication 'pizza-order' registered for DB deployments [f74d80c1-ba48-11e3-9dd4-f0def1e59da8]. Will execute process definitions

    orderPizza[version: 1, id: orderPizza:1:f7609393-ba48-11e3-9dd4-f0def1e59da8]

11:27:10,310 INFO  [org.hibernate.validator.internal.util.Version] (ServerService Thread Pool -- 9) HV000001: Hibernate Validator 4.3.1.Final
11:27:10,532 INFO  [org.jboss.as.server] (DeploymentScanner-threads - 1) JBAS018559: Deployed "pizza-order.war" (runtime-name : "pizza-order.war")
</pre>
