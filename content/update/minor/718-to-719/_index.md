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

This document guides you through the update from Camunda Platform `7.18.x` to `7.19.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators: [Standalone web application](#standalone-web-application)
1. For developers: [Camunda external task client JS update](#camunda-external-task-client-js-update)
1. For developers: [Job executor priority range properties type changed](#job-executor-priority-range-properties-type-changed)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda Platform 7.18.

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

Before starting, ensure you have downloaded the Camunda Platform 7.18 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/718-to-719/jboss.md" >}})
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
