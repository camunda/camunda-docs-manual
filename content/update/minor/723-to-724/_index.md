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

1. For administrators and developers: [JMX Prometheus Javaagent Update](#jmx-prometheus-javaagent-upgrade)

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
