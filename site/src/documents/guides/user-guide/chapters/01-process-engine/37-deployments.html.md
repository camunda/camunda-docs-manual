---

title: 'Deployments'
category: 'Process Engine'

---

## Deployments in a Clustered Scenario

Before the process engine starts to perform a deployment it tries to acquire an exclusive lock on a row in the table `ACT_RU_PROPERTY`. When the process engine was able to acquire the lock successfully, the engine starts to deploy and holds the exclusive lock as long as the execution of the deployment take place. 

If a deployment of the same resources is performed on multiple nodes in a clustered scenario simultaneously, the acquired exclusive lock ensures that duplicate filter works as expected. Otherwise it could lead to multiple versions of the same process definition for example.

However, due to the exclusive lock multiple deployments are executed in a sequential order.

By default the exclusive lock acquisition is enabled. If this is not desired, it is possible to disable it by setting the process engine configuration flag named `deploymentLockUsed` to false.
