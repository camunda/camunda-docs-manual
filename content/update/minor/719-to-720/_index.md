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
5. For administrators: [Explicit JUEL module on Jakarta Expression Language 4](#explicit-juel-module-on-jakarta-expression-language-4)
6. For developers: [JavaScript External Task Client rethrows errors on task service APIs](#javascript-external-task-client-rethrows-errors-on-task-service-apis)

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

# Explicit JUEL module on Jakarta Expression Language 4

Camunda supports using small script-like expressions in many locations as described in our [Expression Language guide]({{< ref "/user-guide/process-engine/expression-language.md" >}}). Up to version 7.19.x, this support is based on a JSP 2.1 standard-compliant implementation of the open source library [JUEL](http://juel.sourceforge.net/). The source code of that library is embedded into and distributed with our core `camunda-engine` artifact.

With this version, we removed that source code from the core artifact and created a dedicated library called `camunda-juel`. This library is based on the [Jakarta Expression Language 4.0 specification](https://jakarta.ee/specifications/expression-language/4.0), a successor of the JSP 2.1 standard. This allows us to benefit from the many improvements that have been incorporated into the expression language API since the creation of the JSP 2.1 standard. The new expression language API is integrated into the Camunda JUEL library and relocated inside it to avoid any classpath pollution related to the official Jakarta Expression Language API that might be present in your environment.

Our pre-packaged distributions all come with the new Camunda JUEL library by default. If you're updating your distribution from 7.19.x or earlier, consult your [environment-specific guide](#full-distribution) on how to add the library. If you're relying on the `camunda-engine` artifact itself in your application, the new module will come as a transitive dependency automatically.

If you are using any JUEL or expression language-related classes that formerly resided in the `camunda-engine` artifact in your custom application, note that the package names change as follows:

* Classes from `org.camunda.bpm.engine.impl.javax.*` now reside in `org.camunda.bpm.impl.juel.jakarta.*`.
* Classes from `de.odysseus.el.*` now reside in `org.camunda.bpm.impl.juel.*`.

Updating to a newer expression language standard comes with some behavioral changes, the most noteworthy ones being the following:

* Bean method invocation changes with regards to method parameters. All values, including `null` values, are converted as described in the [EL API specification](https://jakarta.ee/specifications/expression-language/4.0/jakarta-expression-language-spec-4.0.html#type-conversion). As a result, `null` values will be coerced into the type defined by the method. For example, calling `myBean.setStringAttribute(null)`, requiring a `String` parameter, now leads to `null` being coerced into an empty String `""`. Previously, the `null` value was passed on as is.
* Method resolution is more reliable and supports overloaded methods. Method candidates are resolved by name and then matched by parameter count and types. If multiple candidates exist (overloaded methods), the most specific one is used. For example, method `myMethod` expecting an `Integer` is chosen over method `myMethod` expecting an `Object` if the provided parameter is an `Integer` or can be coerced into one. Previously, the first method candidate by name from the array returned by `Class#getMethods` was taken. However, the order of methods is not defined for that array. As a result, the wrong method was chosen and an exception was thrown due to an incompatible parameter in many cases.
* Method invocation only works with publicly accessible members to provide a more reliable security model and honor the accessibility contracts of classes. Protected methods, private methods, and methods of private, protected, or anonymous inner classes cannot be accessed. Previously, you could invoke non-public methods as well.
* The `ElContext` and its subclasses like `ProcessEngineElContext` throw a `NullPointerException` if a `null` value is set to it using the `#putContext` method. Previously, the context allowed to set `null` values.

We recommend testing your existing expressions thoroughly before using version 7.20.x in production and adjusting them according to the beforementioned behavioral changes.

# JavaScript External Task Client rethrows errors on task service APIs

Previously, the JavaScript External Task Client swallowed errors caused by the engine's REST API when 
calling task service APIs like `#complete`. You could handle these errors only by subscribing to a 
global error handler.

With this release, the client rethrows errors additionally directly on calling the respective task service APIs, 
and you can handle them directly. Please adjust your custom business logic accordingly.
