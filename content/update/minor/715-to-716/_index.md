---

title: "Update from 7.15 to 7.16"
weight: 8
layout: "single"

menu:
  main:
    name: "7.15 to 7.16"
    identifier: "migration-guide-716"
    parent: "migration-guide-minor"
    pre: "Update from `7.15.x` to `7.16.0`."

---

This document guides you through the update from Camunda `7.15.x` to `7.16.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For administrators: [Set Variables on Process Instance Migration](#set-variables-on-process-instance-migration)
1. For administrators: [Java 15 and GraalVM JavaScript support](#java-15-and-graalvm-javascript-support)
1. For administrators: [Upcoming Liquibase support](#upcoming-liquibase-support)
1. For administrators and developers: [New Version of Templating Engines (Freemarker, Velocity)](#new-version-of-templating-engines-freemarker-velocity)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new functionality included in Camunda 7.16.

# Database Updates

Every Camunda installation requires a database schema update. Check our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}}) for further instructions. 

**Note**: Updating to Camunda `7.16` from any version prior to `7.16` requires using the [manual update]({{< ref "/installation/database-schema.md#manual-update" >}}) approach.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda 7.16 distribution for the application server you use. It contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [JBoss AS/Wildfly]({{< ref "/update/minor/715-to-716/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/715-to-716/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/715-to-716/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/715-to-716/was.md" >}})

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
   section. **Note** that with 7.16 the standalone web applications use **HikariCP** for data sources instead of Apache Commons DBCP. Replace the
   `targetDataSource`'s bean class to `com.zaxxer.hikari.HikariDataSource` and rename the `url` parameter of the data source to `jdbcUrl`.
4. Deploy the new and configured standalone web application to the server.

# Set Variables on Process Instance Migration

We have extended the [Process Instance Migration Batch Operation]({{< ref "/user-guide/process-engine/process-instance-migration.md#set-variables-to-process-instances" >}}) to set variables into the process instances' scope.
Please bear in mind that the [usage of new features]({{< ref "/rolling-update.md#usage-of-new-features" >}}) during a rolling update 
leads to unexpected behavior and therefore must be avoided: When a migration batch with variables is 
created during a rolling update, variables might or might not be set depending on the executing engine (old/new engine), 
and batch variables might not be removed when an old engine executes the monitor job.

# Java 15 and GraalVM JavaScript support

You can now run Camunda 7 with Java 15. 
This version of Java not only adds new features but also removes the default JavaScript engine called **Nashorn**.
Therefore, Camunda 7 now also supports [GraalVM JavaScript](https://www.graalvm.org/reference-manual/js/) as JavaScript engine.

This section provides guidance on migration tasks for processes that make use of JavaScript code in any way.
Beyond the adjustments regarding JavaScript execution, migrating to Java 15 requires no further specific actions.

If you are migrating to Java 15 or later, please continue with section [Java 15 migration](#java-15-migration).
If you are using any Java version prior to Java 15, jump ahead to section [Default JavaScript engine](#default-javascript-engine) 
to learn about changes in the default behavior of JavaScript execution in Camunda 7 in general.

## Java 15 migration

With Nashorn not included in Java 15 anymore, you can move forward with any of the following:

1. Move to another JavaScript engine like **GraalVM JavaScript**
1. Reintegrate the Nashorn JavaScript engine with the [OpenJDK Nashorn Engine](https://github.com/openjdk/nashorn)
1. Move away from JavaScript by using Java Delegates, External Tasks, or another scripting language like Groovy

With Camunda 7.16, we add out-of-the-box support for option #1. You can approach options #2 and #3 as you can with any previous version of Camunda 7.
Depending on your [application setup]({{< ref "/introduction/architecture.md#camunda-platform-architecture" >}}) and use of JavaScript, moving forward with 
GraalVM JavaScript requires different follow-up tasks. In any case, make sure to thoroughly test your scripts after migrating your applications before using them in production. 

Choose the section that fits your setup best to read on from the following:

* [Embedded Process Engine / Spring Boot (Starter) Application](#embedded-process-engine)
* [Shared, Container-Managed Process Engine](#shared-process-engine) (with our without custom process applications)
* [Standalone (Remote) Process Engine Server](#remote-process-engine) (e.g., using Camunda Run)

### Embedded Process Engine

Applications embedding the process engine as a library need to add GraalVM JavaScript to their list of dependencies.
We are not enforcing GraalVM JavaScript as a dependency in this use case to provide application developers with as much freedom as possible.

Adding the GraalVM JavaScript script engine to your application requires adding two dependencies: 

* [GraalVM JavaScript Engine](https://search.maven.org/artifact/org.graalvm.js/js/)
* [GraalVM JavaScript ScriptEngine](https://search.maven.org/artifact/org.graalvm.js/js-scriptengine)

Please make sure you use the same version for both dependencies to ensure compatibility.

The JVM registers the GraalVM JavaScript engine automatically. Camunda 7 picks up the script engine and configures it automatically for any occurrence of JavaScript execution in the process engine context. 

If you are migrating from Nashorn, please read the [official Nashorn migration guide]. 
You can also configure the GraalVM JavaScript engine to your needs if necessary. 
Please consult the [Configure Script Engine Guide] on how to achieve this.


### Shared Process Engine

If you are using any of our [Pre-Packaged Distributions], GraalVM JavaScript can be included in the container of your choice by updating to version 7.16 as advised in the [Full Distribution] section above.

If you are migrating from Nashorn, please read the [official Nashorn migration guide].
You can also configure the GraalVM JavaScript engine to your needs if necessary. 
Please consult the [Configure Script Engine Guide] on how to achieve this.

### Remote Process Engine

If you are using any of our [Pre-Packaged Distributions], GraalVM JavaScript can be included in the container of your choice by updating to version 7.16 as advised in the [Full Distribution] section above.
If you are updating to version 7.16 of [Camunda 7 Run], GraalVM JavaScript is already included in your distribution by default. You don't have to consider any further setup tasks to include GraalVM JavaScript.

If you are migrating from Nashorn, please read the [official Nashorn migration guide].
You can also configure the GraalVM JavaScript engine to your needs if necessary. 
Please consult the [Configure Script Engine Guide] on how to achieve this.

## Default JavaScript engine

Camunda 7 [Pre-Packaged Distributions] and [Camunda 7 Run] can include GraalVM JavaScript as of version 7.16.
If you run those distributions on any Java version prior to Java 15, the JVM also includes the Nashorn scripting engine by default.
Thus, the JVM might have to choose from two JavaScript engines when executing scripts for languages `javascript` and `ecmascript`.

In order to provide a reliable behavior on those platforms, Camunda 7 preferably executes code for languages `javascript` and `ecmascript` on GraalVM JavaScript if it is available.
If this script engine cannot be found, Camunda 7 picks any other script engine registered for JavaScript execution based on the JVM's choosing.
In effect, you might be automatically migrating from Nashorn to GraalVM JavaScript depending on the distribution you use and the upgrade procedure you perform.

The following Camunda distributions include GraalVM JavaScript by default when updating as advised in the [Full Distribution] section:

* Camunda 7 Run
* JBoss AS / Wildfly

All other Camunda distributions consider this script engine as optional. If you do not add it when updating your distribution, it will not be available.
In this case, Camunda 7 executes scripts with languages `javascript` and `ecmascript` as it did before.

Please consult the [official Nashorn migration guide] to evaluate if migrating to GraalVM JavaScript is feasible in your setup.
If migration is not immediately possible, you can use the following options to roll out custom migration strategies:

* Do not add GraalVM JavaScript as a library to your distribution. 
  Camunda 7 executes scripts with languages `javascript` and `ecmascript` as it did before.
  Note that this is not possible on JBoss AS/Wildfly and Camunda 7 Run without further adjustments.
* Set the engine configuration option `scriptEngineNameJavaScript` to a script engine of your choice. 
  Camunda 7 uses this script engine as the default for all scripts with languages `javascript` and `ecmascript`. 
  Setting this option to `nashorn` enables the previous execution behavior. 
  Note that this is not possible out-of-the-box anymore starting with Java 15. 
  The Nashorn scripting engine is not included there anymore.
* Set script language of your scripts to a script engine-specific value per script, for example `nashorn` instead of `javascript`. 
  Using this, you can migrate to GraalVM JavaScript in general and still keep single scripts on the old behavior until ready to migrate.

Furthermore, you can also configure the GraalVM JavaScript engine to your needs if necessary. 
Please consult the [Configure Script Engine Guide] on how to achieve this.

[Pre-Packaged Distributions]: {{< ref "/installation/full/_index.md" >}}
[Camunda 7 Run]: {{< ref "/installation/camunda-bpm-run.md" >}}
[official Nashorn migration guide]: https://www.graalvm.org/reference-manual/js/NashornMigrationGuide/
[Full Distribution]: #full-distribution
[Configure Script Engine Guide]: {{< ref "/user-guide/process-engine/scripting.md#configure-script-engine" >}}

# Camunda Form Definition parsing

The 7.16.0 release introduces a new database entity called Camunda Form Definition. After Process, Decision, and Case Definition, this is the fourth definition entity in the engine.
Camunda Form Definitions represent a [Camunda Form] and introduce versioning and more powerful ways of referencing Camunda Forms from other deployments.

To create Camunda Form Definitions, the engine will parse the form JSON when it is deployed. All files with the `.form` file ending will be treated as Camunda Form Definitions. This
might lead to unwanted behavior in cases where files with the `.form` ending that are not Camunda Forms already exist or are deployed to the engine. In those cases, the parser will throw
an exception as the definition could not be parsed correctly.

[Camunda Form]: {{< ref "/user-guide/task-forms/_index.md#camunda-forms" >}}

# Upcoming Liquibase support

Starting with Camunda `7.16.0`, Liquibase can be used to [install the database schema]({{< ref "/installation/database-schema.md" >}}) and keep track of necessary changes to it.
However, Liquibase can *NOT* be used to update from `7.15.x` to `7.16`. Please use the [manual update approach]({{< ref "/installation/database-schema.md#manual-update" >}}) for that.
Nonetheless, you can already [migrate to Liquibase]({{< ref "/installation/database-schema.md#migrate-to-liquibase" >}}) as soon as you updated to `7.16.0` and prepare your installation for any future updates.

# New Version of Templating Engines (Freemarker, Velocity)

Camunda 7.16 includes version 2.1.0 of the `org.camunda.template-engines` artifacts, in particular `camunda-template-engines-freemarker`, `camunda-template-engines-velocity`, and `camunda-template-engines-xquery-saxon`.

This updates the following template engine versions:

* Apache Freemarker
  * Old version: 2.3.29 (Release date: August 2019)
  * New version: 2.3.31 (Release date: February 2021)
  * Change log: https://freemarker.apache.org/docs/api/freemarker/template/Configuration.html#Configuration-freemarker.template.Version-
* Apache Velocity
  * Old version: 2.2 (Release date: January 2020)
  * New version: 2.3 (Release date: March 2021)
  * Change log: https://velocity.apache.org/engine/2.3/upgrading.html
  
Please note that the new version of Freemarker contains changes that are not compatible with the previous version. We strongly recommend to test the execution of your templates before applying the update. In addition, you can replace the artifacts of version 2.1.0 by the old artifacts in version 2.0.0 to continue using the old versions of Freemarker and Velocity.