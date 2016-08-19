---

title: "Rolling Upgrade"
weight: 20

menu:
  main:
    name: "Rolling Upgrade"
    identifier: "rolling-upgrade"
    parent: "migration-guide"
    pre: "Guides you through a rolling upgrade from a minor version to another"

---

{{< note title="Limits for Rolling Upgrades" class="warning" >}}
Rolling upgrades are not possible prior to Version `7.5`. Or in other words: the first upgrade that can be done in the way described on this page is the upgrade from version `7.5.x` to `7.6.y`.

Also note that it is only possible to upgrade from one minor version to the next. For example, it is possible to upgrade from `7.5.3` to `7.6.2` in a rolling fashion but it is not possible to upgrade from `7.5.3` to `7.7.2` in one go.

More considerations for rolling upgrades can be found at the bottom of this page. Make sure to read them.
{{< /note >}}

# What is a Rolling Upgrade?

A rolling upgrade is a process to perform a Camunda upgrade in a cluster. The nodes are upgraded one by one or in groups.
During the upgrade process, it is ensured that at least one node is available to handle incoming requests, guaranteeing availability and minimizing downtime.

# Overview

{{< img src="../img/architecture.png" title="Rolling Upgrade example architecture" >}}

The above picture displays an example system. There are three process engine nodes connected to a shared database.
A load balancer distributes requests to the Process Engine nodes.
"Process Engine node" shall be an instance of an application or application server hosting a process engine.
It must not necessarily be a separate physical host.

A rolling upgrade can be orchestrated in a 2 step process:

1. Update the Database Schema,
2. Update the Camunda libraries on all nodes, one by one or in groups.

_A 3-node cluster is used in this document for illustration. Obviously, the procedure can be generalized to a `N`-Node cluster._

# Step by Step

The following sections provide a step-by-step walkthrough of how to perform a rolling upgrade.
In this example, we use the version `7.X` to signify the Camunda version the cluster is migrated _from_.
We use `7.Y` to signify the Camunda version the cluster is migrated _to_.

## Step 1: Update the Database Schema

Initially, the database schema is at version `7.X` and the Camunda library versions are at `7.X` on all nodes:

{{< img src="../img/architecture-step1.png" title="Initial Situation" >}}

The first step consists of upgrading the database schema to version `7.Y`. Information on where to find the upgrade scripts and how to apply them can be found in the documentation on how to perform upgrades.
As a result, the database schema version is at `7.Y` while the Camunda library version is still `7.X`:

{{< img src="../img/architecture-step2.png" title="Update the Database Schema" >}}

Considerations:

* Applying the database upgrade scripts while not upgrading the library version (or in other words using a newer version of the database schema with an older version of the library) is possible since Camunda guarantees backwards compatibility of the database schema. (See the _Considerations_ section at the bottom of this page for details.)

* Camunda does however not guarantee that the database schema upgrade script can be applied _on-line_ without issues. Depending on the database and the current load, the script can take a long time to run or may block other transactions from making progress. (See the _Considerations_ section at the bottom of this page for details). Users are strongly encouraged to test the schema upgrade script in a staging environment prior to executing it on a production database.

## Step 2: Update the Nodes

After the upgrade of the database schema is completed, the Camunda library version can to be upgraded.

The following steps need to be done for each node or group of nodes.

Grouping nodes makes the upgrade process faster, at the expense that fewer nodes are intermittently available to process requests. An approach could be that 33% of the nodes are upgraded in parallel. In this case 66% of the nodes are available to process the requests and 33% are offline during the upgrade.

### 2.1 Isolation

First, a node is isolated. Usually this means that the load balancer is configured in a way that no new requests are sent to this node.
Once all open requests are processed, the node is successfully isolated and can be taken down.

{{< img src="../img/architecture-step3.png" title="Isolation of a Node" >}}

### 2.2 Upgrade

In this step the Camunda library version is upgraded on an isolated node. The exact way to achieve this depends on the environment:

* When using an embedded process engine, the application bundling the Camunda libraries needs to be re-packaged with the new version of the libraries and re-deployed.
* When using a shared process engine, the libraries and applications deployed to the application server need to be upgraded.

After the upgrade is complete, the node can be brought back up.

{{< img src="../img/architecture-step4.png" title="First Node Updated" >}}

### 2.3 Integration

In this step an upgraded node is re-integrated into the cluster. This usually means configuring the load balancer in a way that requests are routed to this node.

{{< img src="../img/architecture-step5.png" title="First Node is integrated into the cluster" >}}

# Important Considerations

## Backwards Compatibility of Database Schema

To facilitate upgrades, Camunda ensures backwards compatibility of the database schema.
Backwards compatibility makes it possible to operate an older version of the process engine on a newer version of the database schema. This property is crucial in the first step of the rolling upgrade process: after the database has been upgraded, the process engine libraries are still at the previous version.

## On-line applicability of Db Migration Script

Note that Camunda does not guarantee that the migration script is applicable on-line (concurrently to in-flight transactions).
While Camunda does its best effort to ensure this property, it is not guaranteed. It is therefore strongly recommended to _test the database migration script_ on a test database with a similar load to the production database.

## Usage of new Features

During the rolling upgrade process, it is not permitted to use new features of the newer engine version. This means that it is not possible to "roll out" a new version of the BPMN processes or of the application making use of new API methods while also upgrading the library. The reason for this is that while performing a rolling upgrade, there is a time frame in which both older and newer versions of the process engine library operate on the database concurrently. During this time, usage of new features of the new engine like deployment of a BPMN process with a newly supported symbol would cause problems with the old engine.

## One Minor Releases Only

It is only possible to upgrade from one minor version to the next. For example, it is possible to upgrade from `7.5.3` to `7.6.2` in a rolling fashion but it is not possible to upgrade from `7.5.3` to `7.7.2` in one go.

## Required Version

Rolling upgrades are not possible prior to Version `7.5`. Or in other words: the first upgrade that can be done in the way described on this page is the upgrade from version `7.5.x` to `7.6.y`.
