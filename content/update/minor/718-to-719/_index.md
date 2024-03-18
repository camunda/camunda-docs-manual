---

title: "Update from 7.18 to 7.19"
weight: 5
layout: "single"

menu:
  main:
    name: "7.18 to 7.19"
    identifier: "migration-guide-719"
    parent: "migration-guide-minor"
    pre: "Update from `7.18.x` to `7.19.0`."

---

This document guides you through the update from Camunda `7.18.x` to `7.19.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
2. For administrators and developers: [Full distribution update](#full-distribution)
3. For administrators: [Standalone web application](#standalone-web-application)
4. For administrators: [Web apps revalidate authentications every five minutes](#web-apps-revalidate-authentications-every-five-minutes)
   * For administrators and developers:\
     [Container-based authentication requires implementing a ReadOnlyIdentityProvider](#container-based-authentication-requires-implementing-a-readonlyidentityprovider)
5. For administrators: [Set Job Retries Asynchronously](#set-job-retries-asynchronously)
6. For developers: [Camunda external task client JS update](#camunda-external-task-client-js-update)
7. For developers: [Job executor priority range properties type changed](#job-executor-priority-range-properties-type-changed)
8. For developers: [Java External Task Client: Deprecated exception types removed](#java-external-task-client-deprecated-exception-types-removed)
9. For developers: [Consolidated REST API responses for a missing process engine](#consolidated-rest-api-responses-for-a-missing-process-engine)
10. For developers: [Multi-Tenancy enabled for User operation logs](#multi-tenancy-enabled-for-user-operation-logs)
11. For administrators and developers: [Update to WildFly 27 Application Server](#update-to-wildfly-27-application-server)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.19.

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

Before starting, ensure you have downloaded the Camunda 7.19 distribution for the application server you use.
This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution
to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [Wildfly / JBoss EAP 7]({{< ref "/update/minor/718-to-719/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/718-to-719/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/718-to-719/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/718-to-719/was.md" >}})

## Custom process applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`

There are no new mandatory dependencies for process applications.

# Standalone web application

If you use a standalone web application, replace the current `.war` artifact with its new version.

Take the following steps to complete the update:

1. Undeploy the current version of the standalone web application.
2. Update the database to the new schema as described in the [database update](#database-updates) section.
3. Configure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}}) section.
4. Deploy the new and configured standalone web application to the server.

# Web apps revalidate authentications every five minutes

Previously, after a user logged into the web apps, the [authentication cache]({{< ref "/webapps/shared-options/authentication.md#cache" >}}) 
was valid for the lifetime of the HTTP session, which has [security implications]({{< ref "/user-guide/security.md#authentication-cache" >}}).

With this release, we introduced a time to live for the authentication cache, configured to five minutes by default.
This new default might lead to a higher load on your database.

You can read how to configure the time to live to a smaller interval or restore the legacy behavior (disable the authentication cache time to live) in the documentation about [Web Applications]({{< ref "/webapps/shared-options/authentication.md#time-to-live" >}}).

## Container-based authentication requires implementing a `ReadOnlyIdentityProvider`

When using [Container-based Authentication]({{< ref "/webapps/shared-options/authentication.md#container-based-authentication" >}}), please provide an implementation for the `ReadOnlyIdentityProvider` interface so that queries return the results of your identity provider.

This is necessary due to the aforementioned security improvement to revalidate users and groups.

# Set Job Retries Asynchronously

We have extended the [Set Job Retries Batch Operation]({{< ref "/user-guide/process-engine/batch-operations.md#setting-retries-and-due-dates-of-jobs-using-the-builder-pattern" >}}).
There are now new options that allow to set the due date of a job while also setting the number of retries.
Please bear in mind that the [usage of new features]({{< ref "/rolling-update.md#usage-of-new-features" >}}) during a rolling update 
leads to unexpected behavior and therefore must be avoided: When a set retries batch with due date is 
created during a rolling update, due dates might or might not be set depending on the executing engine (old/new engine).

# Camunda external task client JS update

We always strive to keep up with established standards and reduce technical debt which is why we
decided to move away from CommonJS in favor of ECMAScript modules (ESM).

This means that the latest 3.0 version of the [Camunda external task client JS](https://github.com/camunda/camunda-external-task-client-js/)
is now a pure ECMAScript module. Furthermore, the minimum required NodeJS to run the client is version 18.\
If your project is already using ECMAScript modules then you can update to this version without any problems.

However, if your project uses the CommonJS module system then you have the following choices:
- If the package is used in an async context, you could use `await import(…)` from CommonJS instead of `require(…)`.
- Transpile the module into CommonJS using babel for instance.
- Convert your project to ECMAScript Modules.

# Job executor priority range properties type changed

The two dedicated job executor priority range properties [jobExecutorPriorityRangeMin]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMin" >}}) and [jobExecutorPriorityRangeMax]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMax" >}}) have been change to primitive type <code>long</code>. That allows for the properties to be configured for every process engine configuration. Respectively their default values changed to <code>0</code> and <code>2<sup>63</sup>-1</code>.

# Java External Task Client: Deprecated exception types removed

In 7.18, we deprecated the exception types `NotResumedException` and `NotAcquiredException`.
With this release, we removed the exception types as announced in the [migration guide from 7.17 to 7.18]({{< ref "/update/minor/717-to-718/_index.md#deprecated-exception-types" >}}).

Please make sure to adjust your business logic accordingly.

# Consolidated REST API responses for a missing process engine

Up until 7.19, the behavior of the REST API varied from endpoint to endpoint regarding the error message you receive when the defined named process engine cannot be found.
We consolidated this behavior, so every endpoint now issues the same exception with status code 400 and the message "No process engine available".

# Multi-Tenancy enabled for User operation logs

Tenant information is populated for User operation logs from 7.19 onwards, user operation logs created prior will stay as they are. If [tenant check]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#tenantCheckEnabled" >}}) is enabled in the process engine, a tenant membership check will be performed for the following operations:

* User operation log query
* Deleting a user operation log
* Adding/Clearing a user operation log annotation

In case you want to avoid tenant check, please refer to [Disable the transparent access restrictions]({{< ref "/user-guide/process-engine/multi-tenancy.md#disable-the-transparent-access-restrictions" >}}).

# Update to WildFly 27 Application Server

With this release, we support WildFly 27, the new default pre-packaged WildFly distro. It replaces Java EE with Jakarta EE APIs. 
If you prefer to stay on WildFly ≤26 or JBoss EAP 7, you can still download the Java EE compliant [modules][wildfly26-modules], [web application][wildfly26-webapp], and [REST API][wildfly26-rest-api]. 

To work with Wildfly 27, consider the following when migrating your process applications and replacing artifacts on the application server:

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
* Camunda WildFly Subsystem under `$WILDFLY_HOME/modules/org/camunda/bpm/$APP_SERVER/camunda-wildfly-subsystem`
  
### Replace web application (Cockpit, Admin, Tasklist, Welcome) deployment

Replace the artifact `camunda-webapp-jboss-$PLATFORM_VERSION.war` with `camunda-webapp-wildfly-$PLATFORM_VERSION.war` under `$WILDFLY_HOME/standalone/deployments`.

### Replace REST API deployment

Replace the artifact `camunda-engine-rest-$PLATFORM_VERSION-wildfly.war` with `camunda-engine-rest-jakarta-$PLATFORM_VERSION-wildfly.war` under `$WILDFLY_HOME/standalone/deployments`.
