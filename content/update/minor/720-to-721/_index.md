---

title: "Update from 7.20 to 7.21"
weight: 3
layout: "single"

menu:
  main:
    name: "7.20 to 7.21"
    identifier: "migration-guide-721"
    parent: "migration-guide-minor"
    pre: "Update from `7.20.x` to `7.21.0`."

---

This document guides you through the update from Camunda `7.20.x` to `7.21.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For developers: [Add Default History Time To Live to BPMN Fluent API](#add-default-history-time-to-live-to-bpmn-fluent-api)
1. For administrators: [Spring Boot Starter and Run logs admin user information on `DEBUG` level](#spring-boot-starter-and-run-logs-admin-user-information-on-debug-level)
1. For administrators and developers: [External Task Client Java](#external-task-client-java)
1. For developers: [Changed trigger order of built-in task listeners](#changed-trigger-order-of-built-in-task-listeners)
1. For administrators and developers: [Cockpit's process definition like search changed to case-insensitive](#cockpit-s-process-definition-like-search-changed-to-case-insensitive)
1. For developers: [External MDC properties are isolated from the engine's processing](#external-mdc-properties-are-isolated-from-engine-processing)
1. For developers: [FEEL Engine 1.17.x Upgrade](#feel-engine-1-17-upgrade)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.21.

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

Before starting, ensure you have downloaded the Camunda 7.21 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# Add Default History Time To Live to BPMN Fluent API

Starting with this release, the [BPMN Fluent API Builder]({{< ref "/user-guide/model-api/bpmn-model-api/fluent-builder-api" >}}) assigns by default a history time to live of **6 months** to processes. You can change this default or pass `null` to remove the attribute using the `#setCamundaHistoryTimeToLive` or `#setCamundaHistoryTimeToLiveString` API.

# Spring Boot Starter and Run logs admin user information on `DEBUG` level

In previous releases, when configuring Camunda's admin user in the Spring Boot Starter or Run via `camunda.bpm.admin-user`, information about the admin user appeared in the logs on log level `INFO` on startup.
With this release, the log level for the logs `STARTER-SB010` and `STARTER-SB011` was changed to `DEBUG`.

# External Task Client Java

## Update the client's Apache HttpClient to version 5

We have updated the internal Apache HttpClient in our Java External Task Client from version 4.5.x to the more recent version 5.3.

Version 5 is the latest major version of HttpClient, and it offers many new features including the support for the latest HTTP/2 standards.
Additionally, it also provides synchronous, asynchronous and reactive APIs, as well.
For a complete list about features, see the official page about [HttpCore 5.2][HttpCore52] and [HttpClient 5.3][HttpClient53].

{{< note title="Heads Up" class="warning" >}}
Our client is now fully updated to the HttpClient 5 classic (synchronous) API and is not compatible with version 4 anymore!
{{< /note >}}

The classic API of the HttpClient 5 shares many similarities with the predecessor version 4, but it's not backward compatible.
This means an update to this version requires code and configuration adjustments.

[Apache has an official migration guide][HttpClient53-migration], which should make the switch easier.

[HttpCore52]: https://hc.apache.org/httpcomponents-core-5.2.x/index.html
[HttpClient53]: https://hc.apache.org/httpcomponents-client-5.3.x/index.html
[HttpClient53-migration]: https://hc.apache.org/httpcomponents-client-5.3.x/migration-guide/index.html

## Update the client's dependencies

The External Task Client Java has been migrated to the Jakarta namespace. In case you use the default data format providers (e.g.: `DomXmlDataFormatProvider`), you need to update the version of `com.sun.xml.bind:jaxb-impl` dependency to a version >= `4.0.x`.

Complete example of the External Task Client Java can be found [here](https://github.com/camunda/camunda-bpm-examples/tree/7.21/clients/java/order-handling).

# Changed trigger order of built-in task listeners

Built-in task listeners are used internally by the engine and not intended to be used by the user. User-defined task listeners are handled separately. Before this release, the order in which builtin task listeners were executed could depend on how the task was executed. This [bug report](https://github.com/camunda/camunda-bpm-platform/issues/4042) describes a scenario where after a process instance modification, the order of the builtin task listeners was reversed.
With this release for both, regular process execution and process instance modification, the engine ensures the following:

1. Built-in task listeners are executed before user-defined task listeners.
2. Built-in task listeners are executed in the order in which they were registered.
3. User-defined task listeners are executed in the order in which they were registered.

Previously, only 1. and 3. were ensured.

# Cockpit's process definition like search changed to case-insensitive

The **Cockpit/Processes**'s page Process Definition search component allows for **name** and **key** search with **equals** and **like** operators.
With this recent change, per customer feedback, we modified the like search to case-insensitive.
This will allow a better experience when looking for process definitions.

The change also affects the API that provides the data for the search component.
This API is an internal API, which means it's **not** part of the public [REST API]({{< ref "/reference/rest" >}}), so the change should not affect any customers.

# External MDC properties are isolated from engine processing

The previous behavior of _clearing the MDC tuples associated with Logging Context Parameters_ has been changed in this release. Starting from `7.21`, the new behavior preserves any logging context parameter entries found in the MDC to better isolate the engine processing from any external MDC user configuration.

Use cases that require the legacy behaviour (clearing of the MDC logging context parameter tuples after the engine processing) can opt for clearing the MDC programmatically.

# FEEL Engine 1.17 Upgrade

The `7.21` release now supports FEEL Engine 1.17.x. This upgrade introduces breaking changes such as:

- The invocation of a non-existing function returns null ([#692](https://github.com/camunda/feel-scala/issues/670))
- Comparing different datatypes is now handled gracefully and can return `false` or `null` instead of throwing exception ([#582](https://github.com/camunda/feel-scala/issues/582))

For a detailed view of the change logs, check out the FEEL Engine 1.17.0 [Release notes](https://github.com/camunda/feel-scala/releases/tag/1.17.0).
