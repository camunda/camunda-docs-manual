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

This document guides you through the update from Camunda `7.19.x` to `7.20.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For developers: [Enforce History Time To Live](#enforce-history-time-to-live)
1. For administrators: [Explicit JUEL module on Jakarta Expression Language 4](#explicit-juel-module-on-jakarta-expression-language-4)
1. For developers: [Explicit asset declaration in Java web app plugins](#explicit-asset-declaration-in-java-web-app-plugins)
1. For administrators: [Optimistic Locking on PostgreSQL](#optimistic-locking-on-postgresql)
1. For developers: [Changes on persistence connection exception logging of the REST API](#changes-on-persistence-connection-exception-logging-of-the-rest-api)
1. For developers: [JavaScript external task client re-throws errors on task service APIs](#javascript-external-task-client-rethrows-errors-on-task-service-apis)
1. For developers: [Spring Framework 6.0 support](#spring-framework-6-0-support)
1. For developers: [Upgrade to Spring Boot 3.1](#upgrade-to-spring-boot-3-1)
   * For developers: [External Task Client Spring Boot Starter requires JDK 17](#external-task-client-spring-boot-starter-requires-jdk-17)
   * For developers: [Camunda 7 Run requires JDK 17](#camunda-platform-run-requires-jdk-17)
1. For developers: [Update Alpine Base Docker Image from version 3.15 to 3.18](#update-alpine-base-of-camunda-docker-images-from-version-3-15-to-3-18)
1. For developers: [Quarkus 3 update](#quarkus-3-update)
1. For developers: [Discontinued support for JDK 8](#discontinued-support-for-jdk-8)
1. For administrators: [Discontinued support of Standalone web application](#discontinued-support-of-standalone-web-application)
1. For developers: [Discontinued support for handling JPA entities as variables](#discontinued-support-for-handling-jpa-entities-as-variables)
1. For developers: [Discontinued support for Velocity, XSLT, and XQuery template engines](#discontinued-support-for-velocity-xslt-and-xquery-template-engines)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.20.

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

Before starting, ensure you have downloaded the Camunda 7.20 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

{{< note title="Removed support for WebSphere 9" class="info" >}}
Support for WebSphere 9 was discontinued with the Camunda 7.20.0 release. Some of the artifacts that are compatible with WebSphere 9 have been renamed. See details in the dedicated [IBM WebSphere Liberty guide]({{< ref "/update/minor/719-to-720/was.md" >}}).
{{< /note >}}


Choose the application server you are working with from the following list:

* [Wildfly / JBoss EAP 7]({{< ref "/update/minor/719-to-720/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/719-to-720/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/719-to-720/wls.md" >}})
* [IBM WebSphere Liberty]({{< ref "/update/minor/719-to-720/was.md" >}})

## Custom process applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`

There are no new mandatory dependencies for process applications.

# Enforce History Time To Live

Many of our users have installations that contain model resources (BPMN, DMN, CMMN) with null historyTimeToLive. As a result,
their historic data grow over time and remain uncleaned due to this configuration. The history data of your executed processes will clutter the database and eventually negatively impact the engine's performance – even for runtime processes. Since the engine uses a relational database, only starting to clean up the history when a vast amount of data has been pilled up is very costly and time-consuming – in some situations, there is even no other solution than truncating tables and losing data. This is why with this release
we decided to make the historyTimeToLive mandatory for new deployments or redeployments.

At the same time, we acknowledge there might be use cases (e.g. when there are no history events fired at all, 
see [history level]({{< ref "/user-guide/process-engine/history/history-configuration.md#set-the-history-level" >}}) configuration) 
where our users might favour to keep the legacy behaviour despite our recommendation. 
If that is the case, you can always turn off the feature by setting the feature flag `enforceHistoryTimeToLive` to `false`. 
For more information, checkout the new parameter description under <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine#configuration-properties" >}}">Configuration Properties</a>.

# Explicit JUEL module on Jakarta Expression Language 4

Camunda supports using small script-like expressions in many locations as described in our [Expression Language guide]({{< ref "/user-guide/process-engine/expression-language.md" >}}). Up to version 7.19.x, this support is based on a JSP 2.1 standard-compliant implementation of the open source library [JUEL](http://juel.sourceforge.net/). The source code of that library is embedded into and distributed with our core `camunda-engine` artifact.

With this version, we removed that source code from the core artifact and created a dedicated library called `camunda-juel`. This library is based on the [Jakarta Expression Language 4.0 specification](https://jakarta.ee/specifications/expression-language/4.0), a successor of the JSP 2.1 standard. This allows us to benefit from the many improvements that have been incorporated into the expression language API since the creation of the JSP 2.1 standard. The new expression language API is integrated into the Camunda JUEL library and relocated inside it to avoid any classpath pollution related to the official Jakarta Expression Language API that might be present in your environment.

Our pre-packaged distributions all come with the new Camunda JUEL library by default. If you're updating your distribution from 7.19.x or earlier, consult your [environment-specific guide](#full-distribution) on how to add the library. If you're relying on the `camunda-engine` artifact itself in your application, the new module will come as a transitive dependency automatically.

If you are using any JUEL or expression language-related classes that formerly resided in the `camunda-engine` artifact in your custom application, note that the package names change as follows:

* Classes from `org.camunda.bpm.engine.impl.javax.*` now reside in `org.camunda.bpm.impl.juel.jakarta.*`.
* Classes from `de.odysseus.el.*` now reside in `org.camunda.bpm.impl.juel.*`.

Updating to a newer expression language standard comes with some behavioral changes.
We recommend testing your existing expressions thoroughly before using version 7.20.x in production and adjusting them
according to the behavioral changes. The most noteworthy ones being the following:

## Bean method invocation changes

Bean method invocation changes with regards to method parameters. All values, including `null` values, are converted as described in the [EL API specification](https://jakarta.ee/specifications/expression-language/4.0/jakarta-expression-language-spec-4.0.html#type-conversion). As a result, `null` values will be coerced into the type defined by the method. For example, calling `myBean.setStringAttribute(null)`, requiring a `String` parameter, now leads to `null` being coerced into an empty String `""`. Previously, the `null` value was passed on as is.

Example:
```
execution.getProcessEngineServices().getHistoryService().createHistoricTaskInstanceQuery().taskId(nullableVariable).list();
```

When using the above code in an expression (e.g., in a service task), the result may be different from that of previous Camunda versions.
Jakarta EL will treat nullableVariable as empty string when it is null. This will result in the engine looking for a
task with id of `""` (empty string) whereas normally it would ignore the taskId parameter. This is an example of how the
new behavior can break custom implementations when using expressions. Calling the same API with regular Java code (e.g.,
from an external task or Java delegate) will not produce a different behavior compared to previous Camunda versions.
The Camunda API did not change.

## Overloaded methods

Method resolution is more reliable and supports overloaded methods. Method candidates are resolved by name and then matched by parameter count and types. If multiple candidates exist (overloaded methods), the most specific one is used. For example, method `myMethod` expecting an `Integer` is chosen over method `myMethod` expecting an `Object` if the provided parameter is an `Integer` or can be coerced into one. Previously, the first method candidate by name from the array returned by `Class#getMethods` was taken. However, the order of methods is not defined for that array. As a result, the wrong method was chosen and an exception was thrown due to an incompatible parameter in many cases.

## Changes for method invocation

Method invocation only works with publicly accessible members to provide a more reliable security model and honor the accessibility contracts of classes. Protected methods, private methods, and methods of private, protected, or anonymous inner classes cannot be accessed. Previously, you could invoke non-public methods as well.

## ELContext not nullable

The `ElContext` and its subclasses like `ProcessEngineElContext` throw a `NullPointerException` if a `null` value is set to it using the `#putContext` method. Previously, the context allowed to set `null` values.

# Explicit asset declaration in Java web app plugins

We introduced a change in the asset loading mechanism for Java web app plugins. Starting with this release,
**plugin assets must be explicitly declared in the plugin root resource class**.
You can declare your assets by overriding the `AbstractAppPluginRootResource#getAllowedAssets()` method in your root resource.

The default implementation contains two predefined assets: `app/plugin.js` and `app/plugin.css`.
For many plugins this might be already sufficient and will require no further assets to be allowed.

{{< note title="Heads Up" class="warning" >}}
Make sure to double-check and declare the required assets in your plugin root resource.
Requests for undeclared assets will be rejected, and it will likely render your plugin unusable.
{{< /note >}}

[Custom scripts][custom-script] and [frontend modules][frontend-modules] are not affected by this.

[custom-script]: {{< ref "/webapps/cockpit/extend/configuration#custom-scripts" >}}
[frontend-modules]: {{< ref "/webapps/cockpit/extend/plugins#structure-of-a-frontend-module" >}}

# Optimistic Locking on PostgreSQL

With version 7.20.0, we adjusted the [Optimistic Locking]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}) behavior on PostgreSQL in case of [Foreign Key Constraint](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK) violations. Any violation of such a constraint in INSERT and UPDATE statements now leads to an [OptimisticLockingException]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}). In effect, the engine's behavior on PostgreSQL in such scenarios is consistent with the other supported databases.

If you rely on the previous behavior, receiving `ProcessEngineException`s with the related error code for foreign key constraint violations, you can restore it by disabling the engine configuration flag `enableOptimisticLockingOnForeignKeyViolation`. As a result, jobs can also start failing due to those exceptions although they could be safely retried automatically to resolve the situation.

# Changes on persistence connection exception logging of the REST API

All persistence connection exceptions will be logged with logging level ERROR instead of WARN from now on.
You can read more about SQL connection exceptions & SQL classes [here](https://en.wikipedia.org/wiki/SQLSTATE).

# JavaScript external task client rethrows errors on task service APIs

Previously, the JavaScript external task client swallowed errors caused by the engine's REST API when 
calling task service APIs like `#complete`. You could handle these errors only by subscribing to a 
global error handler.

With this release, the client re-throws errors, additionally directly on calling the respective task service APIs, 
and you can handle them directly. Adjust your custom business logic accordingly.

# Spring Framework 6.0 support

The newly created `engine-spring-6` module provides support to Spring Framework 6.0 with the following maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring-6</artifactId>
</dependency>
```

The most noteworthy changes from the new major version are JDK 17+ and Jakarta EE 9+ baseline.
To adjust your applications, follow the Spring Framework [upgrade guide][spring6-guide]
and check the [Spring Framework 6.0 goes GA][spring6] blog post.

Camunda 7 introduces Spring Framework 6.0 support for:

* Spring Boot Starter
* WildFly Application Server 27

[spring6]: https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga
[spring6-guide]: https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x

# Upgrade to Spring Boot 3.1

The Camunda Engine now offers support for Spring Boot 3.1. The new major version builds on Spring Framework 6.0 
and brings changes such as JDK 17 baseline and switching to the Jakarta namespace. 

For a complete list of new features and changes, check the [Spring Boot 3.0][boot30] and [Spring Boot 3.1][boot31] release notes.
Have a look at the Spring Boot [update guide][boot30-guide] to migrate your applications from Spring Boot 2.7.

The switch to the Jakarta namespace requires the Spring Boot Starter and other modules to now rely on Camunda 7 modules that are created for this purpose.
For example, if you want to build a custom webjar, keep the following changes in mind:

* `camunda-webapp-webjar` depends on `camunda-webapp-jakarta` for building the Spring Boot webjar.
* `camunda-webapp-webjar-ee` depends on `camunda-webapp-jakarta` and `camunda-webapp-ee-plugins-jakarta`.
`

[boot30]: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes
[boot31]: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1-Release-Notes
[boot30-guide]: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide

## External Task Client Spring Boot Starter requires JDK 17

After adopting Spring Boot 3, the External Task Client Spring Boot Starter requires Java 17.

## Camunda 7 Run requires JDK 17

Starting with Camunda 7.20, the Camunda 7 Run distribution requires Java Runtime Environment 17 installed.

# Update Alpine Base of Camunda Docker images from Version 3.15 to 3.18

The Camunda Docker images are based on Alpine. This release updates the Alpine base docker image from version 3.15 to 3.18. Please find the changes in detail at the official sources below:

* [Alpine 3.16.0 Release Notes] [alpine316]
* [Alpine 3.17.0 Release Notes] [alpine317]
* [Alpine 3.18.0 Release Notes] [alpine318]

[alpine316]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.16.0
[alpine317]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.17.0
[alpine318]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.18.0

# Quarkus 3 update

We have updated our Quarkus Extension to the latest Quarkus 3 version. This version brings many new features and changes.
For a complete list, see the [Quarkus 3 major release][quarkus3] blog post.
From the extension's perspective, the most important changes are the deprecation of Java 11 and the switch to Jakarta EE 10.
With the update, the [JSF Task Forms][jsf-task-forms] use case is not supported out of the box anymore in a Quarkus application.

Quarkus has a very comprehensive [guide for updating][quarkus3-update] and also offers an update tool.

You can find more details about the extension on our dedicated [Quarkus Integration][quarkus-integration] page.

[quarkus3]: https://quarkus.io/blog/quarkus-3-0-final-released
[quarkus3-update]: https://quarkus.io/blog/quarkus-3-0-final-released/#upgrading
[quarkus-integration]: {{< ref "/user-guide/quarkus-integration" >}}
[jsf-task-forms]: {{< ref "/user-guide/task-forms/jsf-task-forms.md" >}}

# Discontinued support for JDK 8

With version 7.20, we discontinue support for JDK 8 and require a minimum of Java Runtime Environment 11 for building and operating Camunda 7.
As [mentioned above](#upgrade-to-spring-boot-3-1), Spring Boot-related applications already require Java Runtime Environment 17.

# Discontinued support of Standalone web application

Camunda Automation Platform 7.19 is the last release providing support for Standalone Web Application Distribution.
Version 7.20.0 no longer provides this distribution.

# Discontinued support for handling JPA entities as variables

The process engine will no longer process JPA entities as variables affecting the following components:

* Process engine (`camunda-engine`) - `JPAVariableSerializer` logic removed
* Spring Framework integration (`engine-spring`) - `SpringEntityManagerSessionFactory` class removed
* Spring Boot Starter (`spring-boot-starter`) - `DefaultJpaConfiguration` logic and `camunda.bpm.jpa` properties removed

In case your projects have used the removed JPA variable serializer, you must create custom JPA serializer logic for the variables that have been created already. Without providing a JPA variable serializer, when previously created JPA variable is retrieved, a `ProcessEngineException` will be thrown for `ENGINE-03040 No serializer defined for variable instance`. Futher ensure the serializer loads correctly already persisted entities before updating to 7.20 version.

You can re-create the removed logic in your project and register a JPA variables serializer as a process engine plugin. As a step by step guide how to achieve that, we created an [example](https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/handling-jpa-variables).

# Discontinued support for Velocity, XSLT, and XQuery template engines

We discontinue support for template engines with the following Maven artifacts (groupId:artifactId):

* org.camunda.template-engines:camunda-template-engines-velocity
* org.camunda.template-engines:camunda-template-engines-xquery
* org.camunda.bpm.extension.xslt:camunda-bpm-xslt

We moved the source code of the template engines listed above over to Camunda's [Community Hub](https://github.com/camunda-community-hub/camunda-7-template-engines-jsr223) and released version 2.2.0, the first community release and last release triggered by us.

You can contribute to the [GitHub repository](https://github.com/camunda-community-hub/camunda-7-template-engines-jsr223) if you require code changes, library updates, or bug fixes. Camunda doesn't drive development for community extensions.

If you want to continue to use the community-maintained template engines, use the following Maven coordinates:

```xml
<dependency>
  <groupId>org.camunda.community.template.engine</groupId>
  <artifactId>camunda-7-template-engine-velocity</artifactId>
  <version>2.2.0</version>
</dependency>

<dependency>
  <groupId>org.camunda.community.template.engine</groupId>
  <artifactId>camunda-7-template-engine-xquery</artifactId>
  <version>2.2.0</version>
</dependency>

<dependency>
  <groupId>org.camunda.community.template.engine</groupId>
  <artifactId>camunda-7-template-engine-xslt</artifactId>
  <version>2.2.0</version>
</dependency>
```

We are looking for maintainers for the template engine extensions. Feel free to reach out to us [via the forum](https://forum.camunda.io/c/camunda-platform-7-topics/39) if you are interested.
