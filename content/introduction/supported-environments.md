---

title: 'Supported Environments'
weight: 40

menu:
  main:
    identifier: "user-guide-introduction-supported-environments"
    parent: "user-guide-introduction"

---


Run the Camunda BPM platform in every Java-runnable environment. Camunda BPM is supported with our QA infrastructure in the following environments. Here you can find more information about our [enterprise support](http://camunda.com/bpm/enterprise/).

{{< note title="Supported Environments" class="info" >}}
  Please note that the environments listed in this section depend on the version of the Camunda BPM platform. Please select the corresponding version of this documentation to see the environment that fits to your version of the Camunda BPM platform. e.g., [supported environments for version 7.3](http://docs.camunda.org/7.3/guides/user-guide/#introduction-supported-environments)
{{< /note >}}


# Container/Application Server for Runtime Components (Excluding Camunda Cycle)

* Apache Tomcat 6.0 / 7.0 / 8.0
* JBoss Application Server 7.2 and JBoss EAP 6.1 / 6.2 / 6.3 / 6.4 / 7.0
* Wildfly Application Server 8.2 / 10.1
* IBM WebSphere Application Server 8.0 / 8.5 / 9.0 ([Enterprise Edition only](http://camunda.com/bpm/enterprise/))
*	Oracle WebLogic Server 12c (12R1,12R2) ([Enterprise Edition only](http://camunda.com/bpm/enterprise/))


# Container for Camunda Cycle

* Apache Tomcat 7


# Databases

## Supported Database Products

* MySQL 5.6
* MariaDB 10.0
* Oracle 10g / 11g / 12c
* IBM DB2 9.7 /10.1 / 10.5 / 11.1 (excluding IBM z/OS for all versions)
* PostgreSQL 9.1 / 9.3 / 9.4
* Microsoft SQL Server 2008 R2/2012/2014 (see [Configuration Note]({{< relref "user-guide/process-engine/database.md#configuration-for-microsoft-sql-server" >}}))
* H2 1.3 (not recommended for [Cluster Mode]({{< relref "introduction/architecture.md#clustering-model" >}}) - see [Deployment Note]({{< relref "user-guide/process-engine/deployments.md" >}}))

## Database Clustering & Replication

Clustered or replicated databases are not supported unless they behave exactly like the corresponding non-clustered / non-replicated configuration. The configuration needs to guarantee the equivalent behavior of *READ-COMMITTED* isolation level.

* MariaDB Galera Cluster: Galera Cluster for MariaDB is supported with specific configuration settings and some known limitations. See [Details]({{< relref "user-guide/process-engine/database.md#configuration-for-mariadb-galera-cluster" >}}).

# Web Browser

* Google Chrome latest
* Mozilla Firefox latest
* Internet Explorer 9 / 10 / 11


# Java

* Java 6 / 7
* Java 8 (if supported by your application server/container)


# Java Runtime

* Sun/Oracle Hot Spot 6 / 7 / 8
* IBM® J9 virtual machine (JVM) 6 / 7 / 8
* OpenJDK 7 / 8
* Oracle JRockit 6 - R28.2.7


# Camunda Modeler

* Windows 7 / 10
* Mac OS X 10.11
* Linux
