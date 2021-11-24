---

title: "Update from 7.16 to 7.17"
weight: 7
layout: "single"

menu:
  main:
    name: "7.16 to 7.17"
    identifier: "migration-guide-717"
    parent: "migration-guide-minor"
    pre: "Update from `7.16.x` to `7.17.0`."

---

This document guides you through the update from Camunda Platform `7.16.x` to `7.17.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For administrators and developers: [Task Worker Metrics](#task-worker-metrics)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda Platform 7.16.

# Database Updates

Every Camunda installation requires a database schema update. Check our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}}) for further instructions. 

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda Platform 7.17 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/716-to-717/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/716-to-717/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/716-to-717/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/716-to-717/was.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications.

# Standalone Web Application

If you use a standalone web application, replace the current `war` artifact by its new version. 
Take the following steps to complete the update:

1. Undeploy the current version of the standalone web application.
2. Update the database to the new schema as described in the [database update](#database-updates) section.
3. Configure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section.
4. Deploy the new and configured standalone web application to the server.

# Task Worker Metrics

Starting from version 7.17, the task worker metrics are displayed by default.
If this causes slow page loading, you can turn it off in the  [admin webapp configuration.]({{< ref "/webapps/admin/configuration.md#task-worker-metrics" >}})