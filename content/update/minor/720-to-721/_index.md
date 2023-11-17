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
1. For administrators: [Spring Boot Starter and Run logs admin user on `DEBUG` level](#spring-boot-starter-and-run-logs-admin-user-on-debug-level)

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

# Spring Boot Starter and Run logs admin user on `DEBUG` level

In previous releases, when configuring Camunda's admin user in the Spring Boot Starter or Run via `camunda.bpm.admin-user`, information about the admin user appeared in the logs on log level `INFO` on startup.
With this release, the log level for the logs `STARTER-SB010` and `STARTER-SB011` was changed to `DEBUG`.
