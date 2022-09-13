---

title: 'JTA Transaction Integration'
weight: 20

menu:
  main:
    identifier: "user-guide-cdi-transactions"
    parent: "user-guide-cdi"

---

## Embedded Process Engine

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

## Shared Process Engine

The shared process engine distributions for Java EE Application Servers (Wildfly, JBoss, IBM WebSphere Application Server, Oracle WebLogic Application Server) provide JTA integration out of the box.

## Example

The following example shows how to integrate your custom business logic into a transaction of the process engine:

```java
@Named
@Dependent
public class MyBean {

  @Inject
  public RuntimeService runtimeService;

  @Transactional
  public void doSomethingTransactional() {
    // Here you can do transactional stuff in your domain model and it will be 
    // combined in the same transaction as the the following RuntimeService API 
    // call to start a process instance:
    runtimeService.startProcessInstanceByKey("my-process");
  }

}
```

## Using JTA transaction integration with CockroachDB

Please see the documentation section on [external transaction management with CockroachDB]({{< ref "/user-guide/process-engine/database/cockroachdb-configuration.md#using-external-transaction-management-with-the-spring-java-ee-integrations" >}})
to understand how to use the JTA Transaction Integration with CockroachDB.

## Using JTA transaction integration with WebSphere Liberty

Camunda Platform 7 allows to mark a transaction as "rollback only" by calling `UserTransaction#setRollbackOnly()`.
If this code is executed within a Camunda Platform 7 Job, the Job is marked as failed, and can be retried.

WebSphere Liberty doesn't support this behavior of Camunda Platform 7. When calling `UserTransaction#setRollbackOnly()`
in WebSphere Liberty, the transaction is rolled back silently, and the Camunda process engine is unable to unlock the
job and decrease the job retry count.

As a workaround, you can throw a `RuntimeException` after invoking the `UserTransaction#setRollbackOnly()`. The Camunda
process engine will catch this `Exception` and handle the transaction rollback inside a job correctly.

For more details on the WebSphere Liberty Camunda Platform 7 integration, check
out the [WebSphere Liberty installation guide]({{< ref "/installation/full/was/manual-liberty.md" >}}) section.