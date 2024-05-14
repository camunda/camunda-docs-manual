---

title: "Update from 7.21 to 7.22"
weight: 2
layout: "single"

menu:
  main:
    name: "7.21 to 7.22"
    identifier: "migration-guide-722"
    parent: "migration-guide-minor"
    pre: "Update from `7.21.x` to `7.22.0`."

---

This document guides you through the update from Camunda `7.21.x` to `7.22.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators and developers: [Camunda Spin](#camunda-spin)
1. For developers: [Camunda Commons](#camunda-commons)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.22.

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

Before starting, ensure you have downloaded the Camunda 7.22 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# Camunda Spin
 We’ve moved the `camunda-spin` project from its [previous location](https://github.com/camunda/camunda-spin) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha1` to use the latest release of Camunda Spin. 

# Camunda Commons
 We’ve moved the `camunda-commons` project from its [previous location](https://github.com/camunda/camunda-commons) into the [mono repository](https://github.com/camunda/camunda-bpm-platform). We’re no longer versioning it independently. Instead, we’ve integrated it into the 7.X.Y versioning scheme, so you can conveniently declare Camunda `7.22.0-alpha1` to use the latest release of Camunda Commons.
