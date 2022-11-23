---

title: 'Deployments'
weight: 245

menu:
  main:
    identifier: "user-guide-process-engine-deployments"
    parent: "user-guide-process-engine"

---

Before a process (or case, or decision) can be executed by the process engine, it has to be deployed. A deployment is a logical entity that groups multiple resources that are deployed together. Deployments can be made programmatically via Java API or [REST API]({{< ref "/reference/rest/deployment/post-deployment.md" >}}), or declaratively for resources of a [Process Application]({{< ref "/user-guide/process-applications/_index.md" >}}). This section covers advanced deployment concepts.

# Deployments in a Clustered Scenario

Before the process engine starts to perform a deployment, it tries to acquire an exclusive lock on a row in the table `ACT_GE_PROPERTY`. When the process engine is able to acquire the lock successfully, it starts to deploy and holds the exclusive lock as long as the execution of the deployment take place.

If a deployment of the same resources is performed on multiple nodes in a clustered scenario simultaneously, the acquired exclusive lock ensures that duplicate filtering works as expected. Otherwise, parallel deployments may result in multiple versions of the same process definition.

Additionally, the exclusive lock ensures that multiple definitions (e.g., process definitions) with the same key don't get the same version when they are deployed simultaneously, which can lead to failures and unexpected behavior. Note that there is no unique constraint in the database that checks the uniqueness of a definition.

In consequence, the exclusive lock enforces a sequential order of deployments.

By default, the exclusive lock acquisition is enabled. If this is not desired, it is possible to disable it by setting the process engine configuration flag named `deploymentLockUsed` to false.

{{< note class="warning" title="H2 Database" >}}
Note that the H2 database is not supported in a clustered scenario. The process engine creates no exclusive locks because H2 uses table level locks by default, which may cause deadlocks if the deploy command needs to get a new Id using the DbIdGenerator while performing a deployment.
{{< /note >}}
