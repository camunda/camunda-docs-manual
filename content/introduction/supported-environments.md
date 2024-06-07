---

title: 'Supported Environments'
weight: 40

menu:
  main:
    identifier: "user-guide-introduction-supported-environments"
    parent: "user-guide-introduction"

---


Run Camunda in every Java-runnable environment. Camunda is supported with our QA infrastructure in the following environments. Here you can find more information about our [enterprise support](http://camunda.com/platform-7/editions/).

{{< note title="Supported Environments" class="info" >}}
  Please note that the environments listed in this section depend on the version of Camunda. Please select the corresponding version of this documentation to see the environment that fits to your version of Camunda. e.g., [supported environments for version 7.15](http://docs.camunda.org/7.15/guides/user-guide/#introduction-supported-environments)
{{< /note >}}


# Container/Application Server for Runtime Components

## Application-Embedded Process Engine

* All Java application servers
* Camunda Spring Boot Starter: Embedded Tomcat
  * [Supported versions]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
  * [Deployment scenarios]({{< ref "/user-guide/spring-boot-integration/_index.md#supported-deployment-scenarios" >}})
* Camunda Engine Quarkus Extension
  * [Supported versions]({{< ref "/user-guide/quarkus-integration/version-compatibility.md" >}})
  * [Deployment scenarios]({{< ref "/user-guide/quarkus-integration/_index.md#supported-deployment-scenarios" >}})

## Container-Managed Process Engine and Camunda Cockpit, Tasklist, Admin

* Apache Tomcat 9.0
* JBoss EAP 7.4 / 8.0
* WildFly Application Server 23.0 / 26.0 / 31.0
* IBM WebSphere Liberty 22 with Java EE 8 features ([Enterprise Edition only](http://camunda.com/enterprise/), 
  see [Installation guide]({{< ref "/installation/full/was/manual-liberty.md" >}}))
* Oracle WebLogic Server 14c (14R1) ([Enterprise Edition only](http://camunda.com/enterprise/))

# Databases

## Supported Database Products

* MySQL  8.0
* MariaDB 10.6
* Oracle 19c
* IBM DB2 11.5 (excluding IBM z/OS for all versions)
* PostgreSQL 13 / 14 / 15 / 16
* Amazon Aurora PostgreSQL compatible with PostgreSQL 13 / 14 / 15
* Microsoft SQL Server 2017 / 2019 / 2022 (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md" >}}))
* Microsoft Azure SQL with Camunda-supported SQL Server compatibility levels 
  (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md#azure-sql-compatibility-levels-supported-by-camunda" >}})): 
  * SQL Server on Azure Virtual Machines
  * Azure SQL Managed Instance
  * Azure SQL Database
* H2 2.1 (not recommended for [Cluster Mode]({{< ref "/introduction/architecture.md#clustering-model" >}}) - see [Deployment Note]({{< ref "/user-guide/process-engine/deployments.md" >}}))

## Database Clustering & Replication

Clustered or replicated databases are supported given the following conditions. The communication between Camunda and the database cluster has to match with the corresponding non-clustered / non-replicated configuration. It is especially important that the configuration of the database cluster guarantees the equivalent behavior of READ-COMMITTED isolation level.


# Web Browser

* Google Chrome latest
* Mozilla Firefox latest
* Microsoft Edge latest


# Java

* Java 11 / 17 / 21 (if supported by your application server/container)


# Java Runtime

* Oracle JDK 11 / 17 / 21
* OpenJDK 11 / 17 / 21, including builds of the following products:
  * Oracle OpenJDK
  * Eclipse Temurin JDK
  * Amazon Corretto
  * Azul Zulu

# Camunda Modeler

[Supported environments](https://docs.camunda.io/docs/reference/supported-environments/#camunda-modeler) for Camunda Modeler have moved to [docs.camunda.io](https://docs.camunda.io/).

# Maintenance Policy

Check our [Enterprise Announcements page](/enterprise/announcement/) for confirmed changes to our supported environments in upcoming releases.

## Adding Environments

Whenever a new version of one of the following environments is released, we target support of that new version with the next minor release of Camunda. A new released environment has to be available three months before the next Camunda minor release to be considered.

* Java Language (LTS)
* Spring Boot
* Wildfly Application Server
* Oracle Database (LTS)
* PostgreSQL

The exact release in which we support a new environment depends on factors such as the release date of the environment and the required implementation effort.

Version support for other environments is decided case by case, much of which is based on the demand in our user base.

## Removing Environments

Whenever a new version of one of the following environments is supported, we usually discontinue support of the oldest version with the same release:

* Wildfly Application Server

Note that we may decide to deviate from this policy on a case-by-case basis.
