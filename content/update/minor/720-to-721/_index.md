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

This document guides you through the update from Camunda Platform `7.20.x` to `7.21.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For developers: [Add Default History Time To Live to BPMN Fluent API](#add-default-history-time-to-live-to-bpmn-fluent-api)
1. For administrators: [Spring Boot Starter and Run logs admin user information on `DEBUG` level](#spring-boot-starter-and-run-logs-admin-user-information-on-debug-level)
1. For developers: [Update Java External Task Client's Apache HttpClient to version 5](#update-java-external-task-client-s-apache-httpclient-to-version-5)
1. For developers: [Changed trigger order of built-in task listeners](#changed-trigger-order-of-built-in-task-listeners)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda Platform 7.21.

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

Before starting, ensure you have downloaded the Camunda Platform 7.21 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# Add Default History Time To Live to BPMN Fluent API

Starting with this release, the [BPMN Fluent API Builder]({{< ref "/user-guide/model-api/bpmn-model-api/fluent-builder-api" >}}) assigns by default a history time to live of **6 months** to processes. You can change this default or pass `null` to remove the attribute using the `#setCamundaHistoryTimeToLive` or `#setCamundaHistoryTimeToLiveString` API.

# Spring Boot Starter and Run logs admin user information on `DEBUG` level

In previous releases, when configuring Camunda's admin user in the Spring Boot Starter or Run via `camunda.bpm.admin-user`, information about the admin user appeared in the logs on log level `INFO` on startup.
With this release, the log level for the logs `STARTER-SB010` and `STARTER-SB011` was changed to `DEBUG`.

# Update Java External Task Client's Apache HttpClient to version 5

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


# Changed trigger order of built-in task listeners

Built-in task listeners are used internally by the engine and not intended to be used by the user. User-defined task listeners are handled separately. Before this release, the order in which builtin task listeners were executed could depend on how the task was executed. This [bug report](https://github.com/camunda/camunda-bpm-platform/issues/4042) describes a scenario where after a process instance modification, the order of the builtin task listeners was reversed.
With this release for both, regular process execution and process instance modification, the engine ensures the following:

1. Built-in task listeners are executed before user-defined task listeners.
2. Built-in task listeners are executed in the order in which they were registered.
3. User-defined task listeners are executed in the order in which they were registered.

Previously, only 1. and 3. were ensured.
