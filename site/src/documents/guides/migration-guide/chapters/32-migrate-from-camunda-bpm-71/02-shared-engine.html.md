---

title: 'Migrating a Shared Process Engine Setting'
category: 'Migrate from Camunda BPM 7.1 to 7.2'

---

When migrating a Camunda BPM shared engine installation, i.e. a scenario in which the process engine is configured as a central service on the application server, the following steps are required:

1. Upgrade of the Camunda libraries in the application server and optional configuration
2. Migrate process applications

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.2 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## 1. Upgrade of the Camunda Libraries in the Application Server and Optional Configuration

Please choose the application server you are working with from the following list. You will be redirected to Camunda's installation guide.

* [Apache Tomcat][tomcat-migration]
* [JBoss][jboss-migration]
* [Glassfish][glassfish-migration]
* [IBM WebSphere][websphere-migration]
* [Oracle WebLogic][weblogic-migration]

## 2. Migration Process Applications

For every process application, the Camunda dependencies should be upgraded to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

[tomcat-migration]: ref:/guides/installation-guide/tomcat/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[jboss-migration]: ref:/guides/installation-guide/jboss/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[glassfish-migration]: ref:/guides/installation-guide/glassfish/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[websphere-migration]: ref:/guides/installation-guide/was/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[weblogic-migration]: ref:/guides/installation-guide/wls/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
