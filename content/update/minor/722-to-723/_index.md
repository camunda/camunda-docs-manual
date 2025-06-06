---

title: "Update from 7.22 to 7.23"
weight: 2
layout: "single"

menu:
  main:
    name: "7.22 to 7.23"
    identifier: "migration-guide-723"
    parent: "migration-guide-minor"
    pre: "Update from `7.22.x` to `7.23.0`."

---

This document guides you through the update from Camunda `7.22.x` to `7.23.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators and developers: [Bootstrap NES and AngularJS NES by HeroDevs, Inc.](#bootstrap-nes-and-angularjs-nes-by-herodevs-inc)
1. For developers: [Set Variables Async API](#set-variables-async-api)
1. For developers: [GraalVM Upgrade](#graalvm-upgrade)
1. For developers: [Spring Framework Upgrade (changes required when using Java 11)](#spring-framework-upgrade-changes-required-when-using-java-11)
1. For developers: [Quarkus 3.20 Extension Update](#quarkus-3-20-extension-update)

This guide covers mandatory migration steps and optional considerations for the initial configuration of new functionality included in Camunda 7.23.

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

Before starting, ensure you have downloaded the Camunda 7.23 distribution for the application server you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

# Bootstrap NES and AngularJS NES by HeroDevs, Inc.

Camunda 7.23 replaces the following libraries with versions of Bootstrap NES and AngularJS NES by HeroDevs, Inc.:

* *AngularJS* (technical names: `angular`, `angular-animate`, `angular-cookies`, `angular-loader`, `angular-mocks`, `angular-resource`, `angular-route`, `angular-sanitize`, `angular-touch`)
*  *angular-ui-bootstrap*
*  *angular-translate*
*  *angular-moment*
*  *Bootstrap*

Where AngularJS, angular-ui-bootstrap, angular-translate, angular-moment, and Bootstrap were licensed entirely under the MIT license, Bootstrap NES and AngularJS NES by HeroDevs, Inc. licenses additional parts under the HeroDevs NES License. By downloading and using Camunda with Bootstrap NES and AngularJS NES by HeroDevs, Inc., you agree to the terms of the HeroDevs NES License. You can find the HeroDevs NES License terms in our [License Book]({{< ref "/introduction/third-party-libraries/camunda-bpm-platform-license-book.md" >}}).

Please see our [third-Party libraries documentation]({{< ref "/introduction/third-party-libraries/_index.md#web-applications-cockpit-tasklist-admin" >}}) for details.



# Set Variables Async API

Before version 7.23 (and patch version 7.22.1), the Set Variables Async API failed whenever at least one of the process instances did not exist. 

Starting with this Camunda minor release, the behavior has changed: if any of the process instances was deleted or completed, the call will still succeed. As a consequence, the Set Variables Batch Operation will also succeed in this case.

Please note that this does not apply to the Sync API, which keeps its behavior and fails if the process instance does not exist.

# GraalVM Upgrade

We are pleased to announce that the 7.23 release is compatible with `GraalVM 21.3.x`

The engine will automatically **disable the system property** `polyglot.engine.WarnInterpreterOnly` when a [GraalJS](https://www.graalvm.org/jdk17/reference-manual/js/) script engine is used.

This adjustment ensures a smoother experience by suppressing unnecessary warnings related to `interpreter-only` execution in non-native GraalVM environments
which might cause confusion to our users running on non-GraalVM JDKs.

You can read more about the warnings [here](https://www.graalvm.org/jdk17/reference-manual/js/FAQ/#warning-implementation-does-not-support-runtime-compilation).

{{< note title="Heads-up!" class="info" >}}
If you want to ensure the best performance for JS execution, you can always configure the GraalVM Compiler with your JDK of choice, or use the GraalVM JDK.

More information on how to do this can be found in the official [GraalVM documentation](https://www.graalvm.org/jdk17/reference-manual/js/RunOnJDK/#graalvm-javascript-on-jdk-11).
{{< /note >}}

# Spring Framework Upgrade (changes required when using Java 11)

Starting with version `7.23`, the `camunda-engine` artifact now uses Spring Framework 6 by default, replacing Spring 5 from previous releases.

Unlike previous versions, Spring Framework 6 requires Java 17 or higher. If you need to keep using Java 11, you will need to override the Spring version to keep using Spring Framework 5.

# Quarkus 3.20 Extension Update
The Camunda Quarkus extension has been updated to use Quarkus 3.20. This version brings its own features and changes. For a complete list, see the [Quarkus 3.20 LTS release blog post](https://quarkus.io/blog/quarkus-3-20-0-released/).