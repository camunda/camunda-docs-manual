---

title: 'Migrating a Shared Process Engine Setting'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

When migrating a Camunda BPM shared engine installation, i.e., a scenario in which the process engine is configured as a central service on the application server, the following steps are required:

1. Upgrade of the Camunda libraries on the application server
2. Migrate process applications

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.3 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

<div class="alert alert-warning">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-11">
      <p><strong>No Rolling Upgrades</strong></p>
      <p>It is not possible to migrate process engines from Camunda 7.2 to 7.3 in a rolling fashion. This means, it is not possible to run process engines of version 7.2 and 7.3 in parallel with the same database configuration. The reason is that a 7.2 engine may not be able to execute process instances that have been previously executed by a 7.3 engine, as these may use features that were not available yet in 7.2.</p>
    </div>
  </div>
</div>

## 1. Upgrade of the Camunda Libraries on the Application Server and Optional Configuration

Please choose the application server you are working with from the following list. You will be redirected to Camunda's installation guide.

* [Apache Tomcat][tomcat-migration]
* [JBoss/Wildfly][jboss-migration]
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

[tomcat-migration]: ref:/guides/installation-guide/tomcat/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[jboss-migration]: ref:/guides/installation-guide/jboss/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[glassfish-migration]: ref:/guides/installation-guide/glassfish/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[websphere-migration]: ref:/guides/installation-guide/was/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
[weblogic-migration]: ref:/guides/installation-guide/wls/#migration-migrate-from-camunda-bpm-72-to-camunda-bpm-73
