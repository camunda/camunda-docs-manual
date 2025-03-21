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

This document guides you through the update from Camunda `7.17.x` to `7.18.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators: [Standalone web application](#standalone-web-application)
1. For administrators and developers: [Groovy version update](#groovy-version-update)
1. For administrators: [Camunda Docker Images: Base image updated to Alpine 3.15](#camunda-docker-images-base-image-updated-to-alpine-3-15)
1. For administrators and developers: [XLTS for AngularJS](#xlts-for-angularjs)
1. For administrators and developers: [Stricter default Content Security Policy](#stricter-default-content-security-policy)
1. For administrators: [Log level configuration for BPMN stack trace](#log-level-configuration-for-bpmn-stack-trace)
1. For developers: [Adjusted class structure for Expression Language handling](#adjusted-class-structure-for-expression-language-handling)
1. For developers: [Adjusted exception handling in the Java External Task Client](#adjusted-exception-handling-in-the-java-external-task-client)
1. For administrators: [Batch execution start time](#batch-execution-start-time)
1. For developers: [Discontinue Camunda H2 console webapp](#discontinue-camunda-h2-console-web-app)
1. For administrators and developers: [REST API artifact `camunda-engine-rest-jaxrs2` discontinued](#rest-api-artifact-camunda-engine-rest-jaxrs2-discontinued)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.18.

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

Before starting, ensure you have downloaded the Camunda 7.18 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/717-to-718/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/717-to-718/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/717-to-718/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/717-to-718/was.md" >}})

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

# Groovy version update

Camunda 7 provides the Groovy script engine by default with the pre-packaged distributions. With Camunda 7.18, we bumped Groovy to version `2.4.21`. With this Groovy version bump, we decided to move away from the `groovy-all-$GROOVY_VERSION.jar` 
since newer Groovy versions [don't provide a `groovy-all-$GROOVY_VERSION.jar` anymore](https://groovy-lang.org/releasenotes/groovy-2.5.html).
Therefore, you will find the following Groovy-related libraries in the Camunda 7.18 pre-packed distributions:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`

The `groovy` and `groovy-jsr-223` Groovy modules are required for correct operation of the Groovy script engine.
Since the `groovy-all.jar` included a lot more than `groovy` and `groovy-jsr-223` modules, we decided to provide additional useful Groovy modules.

Camunda users relying on Groovy for their scripts need to replace the libraries as described in the
[Camunda libraries and applications](#camunda-libraries-and-applications) guide for their application server. Camunda 7 Run users need to replace the `groovy-all-$GROOVY_VERSION.jar` in the `{RUN_HOME}/configuration/userlib/` directory with the `.jar` libraries from the list above.

Camunda users who don't rely on Groovy can ignore this section.

# Camunda Docker Images: Base image updated to Alpine 3.15

With Camunda 7.18, Alpine, the base image in Camunda’s Docker images, has been updated from version 3.13 to 3.15.

We went through the release notes to identify breaking changes and could identify the following:

> The faccessat2 syscall has been enabled in musl. This can result in issues on docker hosts with older versions of docker (<20.10.0) and libseccomp (<2.4.4), which blocks this syscall.

Besides Docker runtime versions < 20.10.0, alternative docker runtimes like containerd.io are also affected by this.
Read more about it in the [Alpine 3.14 Release Notes](https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.14.0#faccessat2).

If you have extended the Camunda docker images yourself, please read the release notes of Alpine 3.14 and 3.15 carefully:

* https://alpinelinux.org/posts/Alpine-3.14.0-released.html
* https://alpinelinux.org/posts/Alpine-3.15.0-released.html

# XLTS for AngularJS

Camunda 7.18.0 replaces the AngularJS libraries with XLTS for AngularJS. Where AngularJS was licensed entirely under the MIT license, XLTS for AngularJS licenses additional parts under the XLTS for AngularJS – EULA. By downloading and using Camunda with XLTS for AngularJS, you agree to the terms of the XLTS for AngularJS – EULA. Please see our [third-Party libraries documentation]({{< ref "/introduction/third-party-libraries/_index.md#xlts-for-angularjs" >}}) for details and the terms of the EULA.

# Stricter default Content Security Policy

The default **Content Security Policy** configuration is changing from version 7.18.
In older versions, the default policy was a very minimal configuration and explicitly strengthened according to our recommendations.
With this version, we make the previously recommended **Content Security Policy** the default policy, and even stricter by introducing the `strict-dynamic` directive.
If you have added custom script tags in one of the `index.html` files of the web apps, add the `nonce` attribute to the opening script tag:

```html
<script type="application/javascript" nonce="$CSP_NONCE">
```

You don't need to worry about whitelisting for scripts you load via our plugin system.

Find the details in the [Content Security Policy]({{< ref "/webapps/shared-options/header-security.md#content-security-policy" >}}) section.

# Log level configuration for BPMN stack trace

We've added a new configuration property called `logLevelBpmnStackTrace` to change the default `DEBUG` level of the bpmn stack trace.
The default behaviour remains the same as before, so you don't have to do anything.
However, if you want to see the bpmn stack traces in the log, but don't want to turn on debug logging, then you can change their log level with this parameter.

See the [Logging level parameters]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#logLevelBpmnStackTrace" >}}) section for details.  
Additionally, you can find out more about logging in the [Logging User Guide]({{< ref "/user-guide/logging.md" >}}) section.

# Adjusted class structure for Expression Language handling

To provide a more convenient pluggability of the [Unified Expression Language (EL)]({{< ref "/user-guide/process-engine/expression-language/unified-expression-language.md" >}}) used in the engine, the structure of related classes changes with Camunda 7.18.
The `ExpressionManager` class is now a Java `Interface` that needs to be implemented to provide a custom expression manager for the EL of your choice. If you still want to extend the default JUEL-based expression manager, you can subclass the new `JuelExpressionManager` class.

Additionally, if you want your custom expression manager to be available in the DMN Engine, you can implement the new `ElProviderCompatible` interface in your expression manager as well.
The process engine configuration will then take care of passing on your expression manager to the DMN Engine. The `JuelExpressionManager` already implements this interface as well.

# Adjusted exception handling in the Java External Task Client

In the course of exposing the new [exception codes]({{< ref "/user-guide/process-engine/error-handling.md#exception-codes" >}}) feature to the Java External Task Client, 
the client's exception handling was slightly overhauled which might lead to migration effort.

## Deprecated exception types

With this version, we deprecated the following exception types: 

* `NotResumedException`: thrown when the HTTP status code returns `500`.
* `NotAcquiredException`: thrown when the HTTP status code returns `400`.

These exception names didn't really match their respective semantics. This is why we replaced the 
`NotResumedException` with `EngineException` and the `NotAcquiredException` with `BadRequestException`. 

With this release, the old exceptions are marked as deprecated but still work like before. 
We will remove the deprecated exception types with the next minor version.

Ensure you adjust your business logic accordingly.

## Breaking change in `ErrorAwareBackoffStrategy`

When you implement a custom `ErrorAwareBackoffStrategy`, ensure you migrate your 
custom code to respect the adjusted method signature that changed from `#reconfigure(List, Exception)` 
to `#reconfigure(List, ExternalTaskClientException)`. 

Before 7.18, the exception cause was wrapped in a `FetchAndLockException` and passed to `#reconfigure(List, Exception)`.
With this version, we streamlined the exception types thrown when calling operations on the `ExternalTaskService` with 
the exceptions passed to `#reconfigure(List, ExternalTaskClientException)` in case a "fetch and lock" request fails.
This is why we removed the `FetchAndLockException` and replaced it with an `ExternalTaskClientException`.

# Batch execution start time

We are introducing a few new features for the cockpit's batches page, one of which is a field called
execution start time. The execution start time is displayed in the batch details view on the batches
page, and it shows the time when the first job's execution of the batch began.

If you have batch jobs started but not finished before the 7.18 update then this new field on the
batch page could either show incorrect or empty value. This is due to the fact that the batch has
been started before the update.

There is no need for any action and this won't influence the batch execution in any way.
All the batch jobs started after the update will populate this field properly.

# Discontinue Camunda H2 console web app

The Camunda 7.18.0 release removes the H2 console application from the Tomcat and WildFly distributions. There will not be any further releases of the Camunda H2 console web app going forward.

## Removed the H2 console app from Camunda distributions

The H2 console web app was included in all Camunda Tomcat and WildFly distributions. Considering H2 is widely discouraged for use in production, this web app was only ever meant as a development and debugging tool.
Including it in a ready-to-use distribution means an additional step for end users since the app should be removed before using the Camunda distribution in production.

## End of life for the Camunda H2 console web app project

Going forward we will not further develop the Camunda H2 console app. This also means there will not be any more releases for this project.
If you need to connect to the default file-based H2 database during development, we encourage you to use third-party tools like [DBeaver](https://dbeaver.io/).

# REST API artifact `camunda-engine-rest-jaxrs2` discontinued

Starting with 7.18.0, we discontinue the REST API artifact `org.camunda.bpm:camunda-engine-rest-jaxrs2`. We provided this artifact to allow long-polling on the REST API endpoint `/external-task/fetchAndLock` for application servers/runtimes that support the JAX-RS 2.0 specification. Application servers/runtimes only supporting JAX-RS 1.0 had to use the artifact `org.camunda.bpm:camunda-engine-rest-core`, excluding the long-polling capability. 

Since we dropped support for IBM WebSphere 8.5 with the 7.17.0 release, with this release we consolidated both artifacts into `org.camunda.bpm:camunda-engine-rest-core`, which is now based on the JAX-RS 2.0 specification and provides support for long-polling.
