---

title: "Update from 7.23 to 7.24"
weight: 1
layout: "single"

menu:
  main:
    name: "7.23 to 7.24"
    identifier: "migration-guide-724"
    parent: "migration-guide-minor"
    pre: "Update from `7.23.x` to `7.24.0`."

---

This document guides you through the update from Camunda `7.23.x` to `7.24.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators and developers: [JMX Prometheus Javaagent Update](#jmx-prometheus-javaagent-upgrade)
1. For administrators and developers: [LegacyJobRetryBehaviorEnabled process engine flag](#legacyjobretrybehaviorenabled-process-engine-flag)
1. For developers: [Cron expression](#cron-expression)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.24.

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

Before starting, ensure you have downloaded the Camunda 7.24 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# JMX Prometheus Javaagent Upgrade

This minor upgrades the JMX Prometheus Javaagent used in the Camunda docker image to version 1.0.1.
For a complete list of changes for this upgrade, please refer to the [JMX Prometheus release notes](https://github.com/prometheus/jmx_exporter/releases/tag/1.0.1).

# LegacyJobRetryBehaviorEnabled process engine flag

Starting with versions 7.22.5, 7.23.2 and 7.24.0, the process engine introduces a new configuration flag: `legacyJobRetryBehaviorEnabled`.

By default, when a job is created, its retry count is determined based on the camunda:failedJobRetryTimeCycle expression defined in the BPMN model.
However, setting `legacyJobRetryBehaviorEnabled` to `true` enables the legacy behavior, where the job is initially assigned a fixed number of retries (typically 3), regardless of the retry configuration.

Why enable the legacy behavior?

- Your process logic may depend on the legacy retry count behavior.
- The legacy behavior avoids loading the full BPMN model and evaluating expressions during job creation, which can improve performance.

In 7.22.5+ and in 7.23.2+ the default value is `true` for `legacyJobRetryBehaviorEnabled`. For 7.24.0+ the default value is `false` for `legacyJobRetryBehaviorEnabled`.

# Cron expression

With this minor, cron expression support in timer events is provided through Spring library.
In the library the cron expression looks like: `0 0 * * * *`.
In contrast with the previously used Quartz library (`0 0 * * * * *`), 7th optional field for year is not supported.
Please check your models and adjust any cron expressions accordingly.
The new format for expressions supports variaty of cron expressions like macros, weekday, and `n`-th day of week. 

For reference, check Spring documentation <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronExpression.html#parse(java.lang.String)">here</a>.