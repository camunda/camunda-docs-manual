---

title: "Update from 7.19 to 7.20"
weight: 4
layout: "single"

menu:
  main:
    name: "7.19 to 7.20"
    identifier: "migration-guide-720"
    parent: "migration-guide-minor"
    pre: "Update from `7.19.x` to `7.20.0`."

---

This document guides you through the update from Camunda Platform `7.19.x` to `7.20.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
2. For administrators and developers: [Full distribution update](#full-distribution)
3. For administrators: [Standalone web application](#standalone-web-application)
4. For administrators: [Optimistic Locking on PostgreSQL](#optimistic-locking-on-postgresql)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda Platform 7.20.

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

Before starting, ensure you have downloaded the Camunda Platform 7.20 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [Wildfly / JBoss EAP 7]({{< ref "/update/minor/719-to-720/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/719-to-720/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/719-to-720/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/719-to-720/was.md" >}})

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

# Optimistic Locking on PostgreSQL

With version 7.20.0, we adjusted the [Optimistic Locking]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}) behavior on PostgreSQL in case of [Foreign Key Constraint](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK) violations. Any violation of such a constraint in INSERT and UPDATE statements now leads to an [OptimisticLockingException]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}). In effect, the engine's behavior on PostgreSQL in such scenarios is consistent with the other supported databases.

If you rely on the previous behavior, receiving `ProcessEngineException`s with the related error code for foreign key constraint violations, you can restore it by disabling the engine configuration flag `enableOptimisticLockingOnForeignKeyViolation`. As a result, jobs can also start failing due to those exceptions although they could be safely retried automatically to resolve the situation.