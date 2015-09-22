---

title: 'Deployments'
weight: 245

menu:
  main:
    identifier: "user-guide-process-engine-deployments"
    parent: "user-guide-process-engine"

---

Before a process (or case, or decision) can be executed by the process engine, it has to be deployed. A deployment is a logical entity that groups multiple resources that are deployed together. Deployments can be made programmatically via Java API or [REST API]({{< relref "reference/rest/deployment/post-deployment.md" >}}), or declaratively for resources of a [process application]({{< relref "user-guide/process-applications/index.md" >}}). This section covers advanced deployment concepts.

# Deployments in a Clustered Scenario

Before the process engine starts to perform a deployment it tries to acquire an exclusive lock on a row in the table `ACT_RU_PROPERTY`. When the process engine is able to acquire the lock successfully, it starts to deploy and holds the exclusive lock as long as the execution of the deployment take place.

If a deployment of the same resources is performed on multiple nodes in a clustered scenario simultaneously, the acquired exclusive lock ensures that duplicate filter works as expected. Otherwise, parallel deployments may result in multiple versions of the same process definition.

In consequence, the exclusive lock enforces a sequential order of deployments.

By default, the exclusive lock acquisition is enabled. If this is not desired, it is possible to disable it by setting the process engine configuration flag named `deploymentLockUsed` to false.
