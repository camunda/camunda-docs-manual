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

This page describes the process of the rolling upgrade. 

# Rolling Upgrade

The rolling upgrade is a process, on which the nodes of a cluster will be upgraded step by step
without any downtime of the hole system.

## Summary

{{< img src="../img/architecture.png" title="Rolling Upgrade example architecture" >}}

The picture displays a possible architecture of a system.
In this architecture exist one database and m-Nodes, which should be upgraded during the rolling upgrade.
The architecture contains also a load balancer, that distributes the requests of the n-Clients to the m-Nodes. Each node stands for a separated camunda engine. 

In the following table is the process of the rolling upgrade summarized. The table contains also the information of the guarantees, which is given by camunda.

<table class="table desc-table">
 <thead>
  <tr><th>Process</th><th>Guarantees</th></tr>
</thead>
 <tbody>
  <tr>
    <td>Upgrade Database E. g. from 7.5 to 7.6</td>
    <td>Engine workes with a new version of database schema!</td>
  </tr>
  <tr>
    <td>For each Node or group of Nodes:
      <ul>
        <li>disconect node from database and load balancer</li>
        <li>update node to newer version of camunda engine</li>
        <li>integrate node again in cluster</li>
      </ul>
    </td>
    <td>
      No downtime if node by node is upgraded. 
      Engine of newer/old version can work on process instance with other version.
      <br><br>
      <b>Warning:</b>
      <i>During rolling upgrade no usage of features of the newer version!
      If features are used, behaviour is not defined and not guaranteed!</i>
    </td>
  </tr>
 </tbody>
</table>

## Process
 This sections contains the hole process of a rolling upgrade in detail.

### 1. Upgrade the Database

<img src="../img/architecture-step1.png" align="left" height="320" width="480">


The database have to upgraded at first. There is no guaranteed performance impact or duration for an upgrade,
since the upgrade depends on the already stored information. For example adding an index to a table with ~1 million entries will take a while.

The **guarantee** which is given by camunda is that an old engine can work on a new database schema.
There are no restrictions during the execution of an old engine on a new schema.

<br><br>

### 2. For each node

The following steps should be done for each node or group of nodes. For example the nodes can be grouped together. which makes the upgrade process faster, but fewer requests can be processed in the meantime.
In other words the latency will be increased during the upgrade. An approach could be that 33% of the nodes
are upgraded in parallel. In this case 66% of the nodes are available to process the requests and 33% are offline during the upgrade.

Camunda guarantees that there is no downtime of the hole system if node by node is upgraded correctly.

#### 2.1 Isolation

<img src="../img/architecture-step2.png" align="right" height="320" width="480" >

The first step during an upgrade of a node or a group of nodes is the isolation. The node or group of nodes
must be isolated, which means took offline. No request should be forwarded to this node or group, from 
the load balancer and no node should communicate with the database.

#### 2.2 Upgrade

The node or group of nodes, which are isolated and contains the process engine, have to upgrade to a newer version of the camunda engine. 

#### 2.3 Integration

The node or group of nodes, which had been upgraded, have to integrated again into the cluster. The load balancer
can now proceed with the forwarding of requests to the upgraded nodes and the nodes can communicate with the database again. 

<img src="../img/architecture-step3.png" align="left" height="300" width="450" >  
<img src="../img/architecture-step4.png" align="right" height="300" width="450" > 


Camunda **guarantees** that old engines and new engines are able to work on the same database, where the database has the newer schema. 
This means that an engine on version 7.5 can work on a database with the schema of version 7.5 and also on a schema of version 7.6. 
**But** it is not guaranteed that an engine can work on a schema which is lower than the engine version. 
So probably an engine with the version 7.5 doesn't work on a database with the schema of version 7.4.

This guarantee includes that an process which is started on an old engine can be completed on a new engine.

{{< img src="../img/architecture-step5.png" title="Rolling Upgrade repeat for all nodes" >}}


To upgrade all nodes, the steps 2.1 till 2.3 must be repeated for each node or group of nodes.

### 3. Upgrade completed
 
Right after all nodes are upgraded and reintegrated in the cluster the rolling upgrade process
is completed. This process is only suitable for the upgrade to the next camunda engine version.
It is not possible to skip a version upgrade. So only a direct upgrade from 7.5 to 7.6 is possible, **not** directly from 7.4 to 7.6.

{{< img src="../img/architecture-step6.png" title="Rolling Upgrade completed" >}}

{{< note title="No usage of new features during rolling upgrade!" class="warning" >}}

During the **hole** rolling upgrade process it is not permitted to use new features, of the new engine version, since the behavior is not defined and not guaranteed!

{{< /note >}}
