---

title: "Update from 7.17 to 7.18"
weight: 6
layout: "single"

menu:
  main:
    name: "7.17 to 7.18"
    identifier: "migration-guide-718"
    parent: "migration-guide-minor"
    pre: "Update from `7.17.x` to `7.18.0`."

---

This document guides you through the update from Camunda Platform `7.17.x` to `7.18.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators: [Standalone web application](#standalone-web-application)
1. For administrators and developers: [Groovy version update](#groovy-version-update)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new 
functionality included in Camunda Platform 7.18.

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

Before starting, ensure you have downloaded the Camunda Platform 7.18 distribution for the application server 
you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the 
distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/717-to-718/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/717-to-718/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/717-to-718/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/717-to-718/was.md" >}})

## Custom process applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you 
have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`

There are no new mandatory dependencies for process applications.

# Standalone web application

If you use a standalone web application, replace the current `.war` artifact by its new version. 
Take the following steps to complete the update:

1. Undeploy the current version of the standalone web application.
2. Update the database to the new schema as described in the [database update](#database-updates) section.
3. Configure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section.
4. Deploy the new and configured standalone web application to the server.

# Groovy version update

Camunda Platform 7 provides the Groovy script engine by default with the pre-packaged distributions. With Camunda Platform
7.18, we bumped Groovy to version `2.5.16`. This version of Groovy [doesn't provide a `groovy-all.jar` anymore](https://groovy-lang.org/releasenotes/groovy-2.5.html). 
Therefore, you will find the following Groovy-related libraries in the Camunda Platform 7.18 pre-packed distributions:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`
* `groovy-datetime-$GROOVY_VERSION.jar`
* `groovy-dateutil-$GROOVY_VERSION.jar`

The `groovy` and `groovy-jsr-223` Groovy modules are required for the correct operation of the Groovy script engine.
Since the `groovy-all.jar` included a lot more than `groovy` and `groovy-jsr-223` modules, we decided to provide 
additional Groovy modules that we deemed useful.

Camunda users that rely on Groovy for their scripts will need to replace the libraries as described in the
[Camunda libraries and applications](#camunda-libraries-and-applications) guide for their application server. Camunda 
Platform Run users will need to replace the `groovy-all-$GROOVY_VERSION.jar` in the `{RUN_HOME}/configuration/userlib/` 
directory with the `.jar` libraries from the list above.

Camunda users that don't rely on Groovy can ignore this section.