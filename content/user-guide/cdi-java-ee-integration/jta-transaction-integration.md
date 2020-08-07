---

title: 'JTA Transaction Integration'
weight: 20

menu:
  main:
    identifier: "user-guide-cdi-transactions"
    parent: "user-guide-cdi"

---

# Embedded Process Engine

The process engine transaction management can integrate with JTA. To use JTA transaction
manager integration, you need to use the

* `org.camunda.bpm.engine.impl.cfg.JtaProcessEngineConfiguration` for JTA integration only
* `org.camunda.bpm.engine.cdi.CdiJtaProcessEngineConfiguration` for additional CDI expression
  resolving support.
  
The process engine requires access to an implementation of `javax.transaction.TransactionManager`. Not all application servers provide such an implementation. Most notably, IBM WebSphere and Oracle WebLogic historically did not provide this  implementation. To achieve JTA transaction integration on these containers, users should use the Spring Framework Abstraction and configure the process engine using the [SpringProcessEngineConfiguration]({{< ref "/user-guide/spring-framework-integration/_index.md">}}).
  
{{< note title="" class="warning" >}}
  When you configure a transaction manager, make sure that it actually manages the data source that
  you have configured for the process engine. If that is not the case, the data source works in auto-commit mode. 
  This can lead to inconsistencies in the database, because transaction commits and rollbacks are no longer performed.
{{< /note >}}

# Shared Process Engine

The shared process engine distributions for Java EE Application Servers (Wildfly, JBoss, IBM WebSphere Application Server, Oracle WebLogic Application Server) provide JTA integration out of the box.

# Using JTA Transaction Integration with CockroachDB

Please see the documentation section on [external transaction management with CockroachDB]({{< ref "/user-guide/process-engine/database/cockroachdb-configuration.md#using-external-transaction-management-with-the-spring-java-ee-integrations" >}})
to understand how to use the JTA Transaction Integration with CockroachDB.