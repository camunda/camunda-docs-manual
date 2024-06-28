---

title: "Update from 7.21 to 7.22"
weight: 2
layout: "single"

menu:
  main:
    name: "7.21 to 7.22"
    identifier: "migration-guide-722"
    parent: "migration-guide-minor"
    pre: "Update from `7.21.x` to `7.22.0`."

---

This document guides you through the update from Camunda `7.21.x` to `7.22.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators and developers: [Camunda Spin](#camunda-spin)
1. For developers: [Camunda Commons](#camunda-commons)
1. For developers: [Camunda Template Engines FreeMarker](#camunda-template-engines-freemarker)
1. For developers: [Camunda Connect](#camunda-connect)
1. For administrators and developers: [Update to JBoss EAP 8.0](#update-to-jboss-eap-8)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.22.

# Database updates

Every Camunda installation requires a database schema update. Check our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}})
for further instructions.

# Full distribution

This section is applicable if you installed the
[Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}})
with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server.
2. Migrate custom process applications.

Before starting, ensure you have downloaded the Camunda 7.22 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# Camunda Spin
 We’ve moved the `camunda-spin` project from its [previous location](https://github.com/camunda/camunda-spin) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha1` to use the latest release of Camunda Spin. 

# Camunda Commons
 We’ve moved the `camunda-commons` project from its [previous location](https://github.com/camunda/camunda-commons) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha1` to use the latest release of Camunda Commons.
 We've also updated the `camunda-commons-bom` to include `camunda-commons-typed-values`. Now, you can manage all Camunda commons dependency versions directly through the `camunda-commons-bom`.

# Camunda Template Engines FreeMarker
 We’ve moved the `camunda-template-engines-freemarker` project from its [previous location](https://github.com/camunda/camunda-template-engines-jsr223) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha2` to use the latest release of Camunda Template Engines FreeMarker.

# Camunda Connect
 We’ve moved the `camunda-connect` project from its [previous location](https://github.com/camunda/camunda-connect) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha2` to use the latest release of Camunda Connect.
 
# Update to JBoss EAP 8

With this release, we support JBoss EAP 8.0, it's Jakarta EE compliant platform. The artifacts are shipped with the latest pre-packaged [Camunda 7 WildFly distribution]({{< ref "/installation/full/jboss/manual.md#setup" >}}).
If you prefer to stay on JBoss EAP 7, you can still download the Java EE compliant [modules][wildfly26-modules], [web application][wildfly26-webapp], and [REST API][wildfly26-rest-api]. 

To work with JBoss EAP 8, consider the following when migrating your process applications and replacing artifacts on the application server:

[wildfly26-modules]: https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/wildfly/camunda-wildfly26-modules/
[wildfly26-webapp]: https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/webapp/camunda-webapp-jboss/
[wildfly26-rest-api]: https://artifacts.camunda.com/artifactory/public/org/camunda/bpm/camunda-engine-rest/

## Migrate process applications

* Replace Java EE class references (`javax.*`) with Jakarta class references (`jakarta.*`)
  * You might have a look at [`org.eclipse.transformer:transformer-maven-plugin`](https://github.com/eclipse/transformer)
* Replace Camunda class references:
  * `org.camunda.bpm.application.impl.EjbProcessApplication` → `org.camunda.bpm.application.impl.JakartaEjbProcessApplication`
  * `org.camunda.bpm.application.impl.ServletProcessApplicationDeployer` → `org.camunda.bpm.application.impl.JakartaServletProcessApplicationDeployer`
  * `org.camunda.bpm.application.impl.ServletProcessApplication` → `org.camunda.bpm.application.impl.JakartaServletProcessApplication`
  * `org.camunda.bpm.engine.impl.cfg.jta.JtaTransactionContext` → `org.camunda.bpm.engine.impl.cfg.jta.JakartaTransactionContext`
  * `org.camunda.bpm.engine.impl.cfg.jta.JtaTransactionContextFactory` → `org.camunda.bpm.engine.impl.cfg.jta.JakartaTransactionContextFactory`
  * `org.camunda.bpm.engine.impl.cfg.JtaProcessEngineConfiguration` → `org.camunda.bpm.engine.impl.cfg.JakartaTransactionProcessEngineConfiguration`
  * `org.camunda.bpm.engine.impl.interceptor.JtaTransactionInterceptor` → `org.camunda.bpm.engine.impl.interceptor.JakartaTransactionInterceptor`
* Replace Camunda Maven dependencies:
  * `org.camunda.bpm.javaee:camunda-ejb-client` → `org.camunda.bpm.javaee:camunda-ejb-client-jakarta`
  * `org.camunda.bpm:camunda-engine-cdi` → `org.camunda.bpm:camunda-engine-cdi-jakarta`

## Replace artifacts on the application server

You can find the new artifacts either in the current WildFly distribution or in the [`camunda-wildfly-modules`](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/wildfly/camunda-wildfly-modules/).

### Replace modules

* `$WILDFLY_HOME/modules/org/camunda/spin/camunda-spin-dataformat-xml-dom` → `$WILDFLY_HOME/modules/org/camunda/spin/camunda-spin-dataformat-xml-dom-jakarta`
* Camunda WildFly Subsystem under `$JBOSS_HOME/modules/org/camunda/bpm/$APP_SERVER/camunda-wildfly-subsystem`
  
### Replace web application (Cockpit, Admin, Tasklist, Welcome) deployment

Replace the artifact `camunda-webapp-jboss-$PLATFORM_VERSION.war` with `camunda-webapp-wildfly-$PLATFORM_VERSION.war` under `$JBOSS_HOME/standalone/deployments`.

### Replace REST API deployment

Replace the artifact `camunda-engine-rest-$PLATFORM_VERSION-wildfly.war` with `camunda-engine-rest-jakarta-$PLATFORM_VERSION-wildfly.war` under `$JBOSS_HOME/standalone/deployments`.
