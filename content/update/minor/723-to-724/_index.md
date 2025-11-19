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
1. For administrators and developers: [Docker Base Image Update](#docker-base-image-update)
1. For administrators and developers: [JMX Prometheus Javaagent Update](#jmx-prometheus-javaagent-upgrade)
1. For administrators and developers: [LegacyJobRetryBehaviorEnabled process engine flag](#legacyjobretrybehaviorenabled-process-engine-flag)
1. For administrators and developers: [Connect: Apache HTTP Client migration from 4 to 5](#connect-apache-http-client-migration-from-4-to-5)
1. For developers: [Cron expression](#cron-expression)
1. For developers: [Quarkus 3.27 extension update](#quarkus-3-27-extension-update)
1. For developers: [Spring Boot 3.5 update](#spring-boot-3-5-update)


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

# Downsized WildFly distribution

From 7.24.1 to 7.24.2, the WildFly distribution has been downsized by removing optional components that are not commonly used in typical Camunda installations.
Read more details in the [Patch Level Update Guide]({{< ref "/update/patch-level.md#downsized-wildfly-distribution" >}}).

# Docker Base Image Update

The Docker base image has been updated from Alpine Linux 3.18 to Alpine Linux 3.22.

#### Migration Steps

For standard Docker image usage, **no action is required** beyond pulling the 7.24.0 image.

For custom Docker configurations:

1. **Assess Custom Code**: Review any Alpine-specific customizations for version 3.22 compatibility
2. **Update Dependencies**: Check that the additional packages you install are available in Alpine 3.22
3. **Rebuild Custom Images**: Update Dockerfiles that extend the Camunda base image
4. **Test Migration**: Verify functionality after updating to the new base image

For detailed information about changes across Alpine versions, refer to the following release notes:

* [Alpine Linux 3.19 Release Notes](https://alpinelinux.org/posts/Alpine-3.19.0-released.html)
* [Alpine Linux 3.20 Release Notes](https://alpinelinux.org/posts/Alpine-3.20.0-released.html)
* [Alpine Linux 3.21 Release Notes](https://alpinelinux.org/posts/Alpine-3.21.0-released.html)
* [Alpine Linux 3.22 Release Notes](https://alpinelinux.org/posts/Alpine-3.22.0-released.html)

See the [Alpine Linux documentation](https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.22.0) for comprehensive change details.

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

In 7.22.5+ and in 7.23.2+ the default value is `true` for `legacyJobRetryBehaviorEnabled`. For 7.24.0+ the default value is `false` for `legacyJobRetryBehaviorEnabled` .

# Connect: Apache HTTP Client migration from 4 to 5

Camunda 7.24 migrates the Connect HTTP and SOAP HTTP connectors from Apache HttpClient 4.x to 5.x. 

## Changes Overview

The main changes include:

- **Dependency Update**: Apache HttpClient dependency changed from `org.apache.httpcomponents:httpclient:4.5.14` to `org.apache.httpcomponents.client5:httpclient5:5.4.3`
- **Package Structure**: Core classes moved from `org.apache.http.*` to `org.apache.hc.*` packages
- **API Changes**: Several interface and method signatures have been updated
- **Configuration Options**: Some request configuration options have been renamed or replaced

## Breaking Changes

### Request Configuration Options

Several configuration options for HTTP requests have changed:

**Removed Options:**

- `decompression-enabled` - No longer available in HttpClient 5
- `local-address` - Removed from the configuration API
- `normalize-uri` - No longer configurable
- `relative-redirects-allowed` - Merged into general redirect handling
- `socket-timeout` - Replaced with `response-timeout`
- `stale-connection-check-enabled` - No longer needed

**Updated Options:**

- `connection-timeout`, `connection-request-timeout`, and `response-timeout` now use `Timeout` objects instead of integer milliseconds
- `redirects-enabled` replaces `relative-redirects-allowed`

**New Options:**

- `connection-keep-alive` - Controls connection keep-alive timeout
- `hard-cancellation-enabled` - Enables hard cancellation of requests
- `response-timeout` - Replaces `socket-timeout`

### API Changes

If you have custom code that extends or uses Connect HTTP internal API directly:

- **Response Interface**: `CloseableHttpResponse` is now `ClassicHttpResponse`
- **Request Classes**: HTTP method classes moved to `org.apache.hc.client5.http.classic.methods.*`
- **Status Code Access**: Use `response.getCode()` instead of `response.getStatusLine().getStatusCode()`
- **Header Access**: Use `response.getHeaders()` instead of `response.getAllHeaders()`

## Migration Steps

### For Standard Usage

If you only use Connect through Camunda's standard APIs (service tasks), **no changes are required**.

### For Custom Extensions

If you have custom code that:
- Extends Connect HTTP connector classes
- Directly uses Apache HttpClient APIs with Connect
- Configures HTTP request options programmatically

You need to:

1. **Update Dependencies**: Replace Apache HttpClient 4.x dependencies with 5.x versions in your project
2. **Update Imports**: Change package imports from `org.apache.http.*` to `org.apache.hc.*`
3. **Review Configuration**: Update any custom request configuration code to use the new option names and types
4. **Test Thoroughly**: Verify that your HTTP connections work as expected with the new client

### Configuration Migration Example

**Before (HttpClient 4.x):**
```java
request.configOption("socket-timeout", 30000)
       .configOption("connection-timeout", 5000)
       .configOption("stale-connection-check-enabled", true);
```

**After (HttpClient 5.x):**
```java
request.configOption("response-timeout", Timeout.ofSeconds(30))
       .configOption("connection-timeout", Timeout.ofSeconds(5))
       // stale-connection-check-enabled no longer needed
       .configOption("hard-cancellation-enabled", true);
```

## Additional Notes

- The migration maintains backward compatibility for all standard Connect connector usage
- The `commons-codec` dependency is no longer needed and has been removed

For more details about HttpClient 5.x changes, refer to the [Apache HttpClient 5.x migration guide](https://hc.apache.org/httpcomponents-client-5.0.x/migration-guide/index.html).

# Cron expression

With this minor, the cron expression support in timer events is provided through `cron-utils` library.
In the library, the cron expression looks like: `0 0 * * * *`.
In contrast with the previously used Quartz library (`0 0 * * * * *`), the 7th optional field for year is not supported.
Please check your models and adjust any cron expressions accordingly.
The library supports variaty of cron expressions like macros, weekday, and `n`-th day of week. 

For reference, check `cron-util` documentation <a href="https://github.com/jmrozanec/cron-utils">here</a>.

# Spring Boot 3.5 update

Spring Boot Starter has been upgraded to use Spring Boot 3.5. Follow the Spring Boot guide to update accordingly, check the [Spring Boot release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.5-Release-Notes).


# Quarkus 3.27 extension update

The Camunda Quarkus extension has been updated to use Quarkus 3.27. This version brings its own features and changes. For a complete list, check the [Quarkus 3.27 LTS release blog post](https://quarkus.io/blog/quarkus-3-27-released/).
