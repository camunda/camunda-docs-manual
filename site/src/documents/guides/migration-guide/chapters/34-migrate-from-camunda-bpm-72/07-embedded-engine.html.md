---

title: 'Migrating an Embedded Process Engine Setting'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

When migrating a Camunda BPM embedded engine, i.e., a process engine that is managed entirely within an application and bound to that application's lifecycle, the following steps are required:

1. Upgrade Camunda dependencies

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.3 distribution for the application server you use. It contains the SQL scripts required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

<div class="alert alert-warning">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-11">
      <p><strong>No Rolling Upgrades</strong></p>
      <p>It is not possible to migrate process engines from Camunda 7.2 to 7.3 in a rolling fashion. This means, it is not possible to run process engines of version 7.2 and 7.3 in parallel with the same database configuration. The reason is that a 7.2 engine may not be able to execute process instances that have been previously executed by a 7.3 engine.</p>
    </div>
  </div>
</div>

## 1. Upgrade Camunda Dependencies

Upgrade the dependencies declared in your application's `pom.xml` file to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.
