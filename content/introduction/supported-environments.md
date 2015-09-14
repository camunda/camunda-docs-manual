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
  Please note that the environment listed in this section depends on the version of the Camunda BPM platform. Please select the corresponding version of this documentation to see the environment that fits to your version of the Camunda BPM platform. e.g. [supported environment for version 7.3](http://docs.camunda.org/7.3/guides/user-guide/#introduction-supported-environments)
{{< /note >}}


# Container/Application Server for Runtime Components (Excluding Camunda Cycle)

* Apache Tomcat 6 / 7 / 8
* JBoss Application Server 7.2 and JBoss EAP 6.1 / 6.2 / 6.3 / 6.4
* Wildfly 8.1 / 8.2 Application Server
* GlassFish 3.1
* IBM WebSphere Application Server 8.0 / 8.5 ([Enterprise Edition only](http://camunda.com/bpm/enterprise/))
*	Oracle WebLogic Server 12c ([Enterprise Edition only](http://camunda.com/bpm/enterprise/))


# Container for Camunda Cycle

* Apache Tomcat 7


# Databases

* MySQL 5.1 / 5.5 / 5.6
* MariaDB 10.0
* Oracle 10g / 11g / 12c
* IBM DB2 9.7 /10.1 / 10.5 (excluding IBM z/OS for all versions)
* PostgreSQL 9.1 / 9.3 / 9.4
* Microsoft SQL Server 2008 R2/2012/2014 (see [Configuration Note]({{< relref "user-guide/process-engine/database.md#custom-configuration-for-microsoft-sql-server" >}}))
* H2 1.3


# Webbrowser

* Google Chrome latest
* Mozilla Firefox latest
* Internet Explorer 9 / 10 / 11


# Java

* Java 6 / 7
* Java 8 (if supported by your application server/container)


# Java Runtime

* Sun/Oracle Hot Spot 6 / 7 / 8
* IBM® J9 virtual machine (JVM) 6 / 7 / 8
* OpenJDK 6 / 7
* Oracle JRockit 6 - R28.2.7


# Eclipse (for Camunda Modeler)

* Eclipse Indigo/Juno/Kepler
