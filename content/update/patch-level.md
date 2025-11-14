---

title: "Patch Level Update"
weight: 5

menu:
  main:
    name: "Patch Level Update"
    identifier: "migration-guide-patch"
    parent: "migration-guide"
    pre: "Guides you through a patch level update (Example: `7.24.1` to `7.24.2`)."

---

This guide explains how to perform a patch level update. The *patch level* is the version number "after the second dot". Example: update from `{{< minor-version >}}.1` to `{{< minor-version >}}.2`.

{{< enterprise >}}
Please note that Patch Level Updates are only provided to enterprise customers, they are not available in the community edition.
{{< /enterprise >}}

## Database Patches

Between patch levels, the structure of the database schema is not changed. The database structure of all patch releases is backward compatible with the corresponding minor version. Our [database schema update guide]({{< ref "/installation/database-schema.md#patch-level-update" >}}) provides details on the update procedure as well as available database patches.

## Special Considerations

This section describes noteworthy potentially breaking changes when you update to the respective patch levels.

{{< details left="7.24.2 / 7.23.7 / 7.22.10" right="Nov/2025">}}
#### Downsized WildFly distribution

Starting with Camunda 7.24.2, 7.23.7, and 7.22.10 the WildFly distribution has been optimized to reduce its size by approximately **30%**. This is achieved by using Galleon provisioning with only the layers strictly required for Camunda 7 operation.

##### Benefits of Optimized Distribution

* **Smaller footprint**: Reduced disk space and memory usage by ~30%
* **Faster startup**: Fewer subsystems to initialize
* **Improved security**: Reduced attack surface by removing unused components
* **Better containerization**: Smaller Docker images

##### Minimal Required Galleon Layers

The following Galleon layers are sufficient to run Camunda 7 on WildFly:

* core-tools
* core-server
* datasources
* cdi
* deployment-scanner
* servlet
* jaxrs-core
* ejb
* jpa

Depending on your deployment scenario, there might be even fewer needed Galleon layers.
For example, if you don't use EJBs, you can omit the `ejb` layer. However, the above list covers the most common use cases.

##### Distribution Changes

The optimized distribution uses Galleon provisioning instead of a full WildFly installation. This means:

* Unnecessary WildFly components (appclient, domain mode scripts, web services tools, etc.) are removed
* Only the essential modules required for Camunda 7 are included

##### Module Descriptor Updates

As part of the optimization, deprecated module dependencies have been removed from `module.xml` descriptors. These dependencies are no longer needed and were causing exceptions in recent WildFly versions.

###### Removed Dependencies

The following dependencies have been **removed** from Camunda module descriptors:

* **`sun.jdk`** - This module is obsolete in modern JDK versions
* **`javax.api`** - Replaced by Jakarta EE APIs

###### Affected Modules

The following module descriptors have been updated to remove deprecated dependencies:

* `org/camunda/bpm/camunda-engine/main/module.xml`
* `org/camunda/bpm/identity/camunda-identity-ldap/main/module.xml`
* `org/camunda/bpm/wildfly/camunda-wildfly-subsystem/main/module.xml`
* `org/camunda/bpm/dmn/camunda-engine-feel-scala/main/module.xml`
* `org/camunda/feel/feel-engine/main/module.xml`
* `org/apache/groovy/groovy-all/main/module.xml`
* `com/ibm/icu/icu4j/main/module.xml`
* `org/graalvm/js/js/main/module.xml`
* `org/graalvm/js/js-scriptengine/main/module.xml`
* `org/graalvm/regex/regex/main/module.xml`
* `org/graalvm/sdk/graal-sdk/main/module.xml`
* `org/graalvm/truffle/truffle-api/main/module.xml`

###### Example Change

**Before:**

```xml
<module xmlns="urn:jboss:module:1.9" name="org.camunda.bpm.camunda-engine">
    <dependencies>
        <module name="sun.jdk"/>
        <module name="javax.api"/>
        <module name="org.camunda.commons.camunda-commons-logging"/>
        <!-- other dependencies -->
    </dependencies>
</module>
```

**After:**

```xml
<module xmlns="urn:jboss:module:1.9" name="org.camunda.bpm.camunda-engine">
    <dependencies>
        <module name="org.camunda.commons.camunda-commons-logging"/>
        <!-- other dependencies -->
    </dependencies>
</module>
```

{{< note title="No Action Required for Pre-packaged Distribution" class="warning" >}}
If you use the pre-packaged Camunda WildFly distribution, these changes are already applied. You only need to be aware of these changes if you maintain custom WildFly installations or have customized module descriptors.
{{< /note >}}

##### Migration from Full WildFly Distribution

If you are updating from an earlier version that used a full WildFly installation, note the following differences.

###### Removed Components

The following WildFly components are **no longer included** in the optimized distribution:

* **Application Client**: `appclient/` directory and related scripts
* **Domain Mode**: Domain configuration files and scripts
* **Web Services Development Tools**: `wsconsume` and `wsprovide` utilities
* **Additional Subsystems**: Various EE subsystems not required by Camunda 7 (see [Removed Modules](#removed-modules) below)

###### Removed Modules

The optimized distribution removes numerous WildFly system layer modules that are not required for Camunda 7, including:

* Application client modules
* Web services client tools
* Domain management modules
* Advanced clustering and messaging features
* MicroProfile extensions (beyond core requirements)
* Legacy compatibility modules (javax.api, sun.jdk)

For a complete list of removed modules, compare the `modules/system/layers/base/` directory between the old and new distributions.

###### Configuration Files

The following standalone configuration files are **no longer included**:

* `standalone-full-ha.xml`
* `standalone-full.xml`
* `standalone-ha.xml`
* `standalone-load-balancer.xml`
* `standalone-microprofile-ha.xml`
* `standalone-microprofile.xml`

Only `standalone.xml` is included, which is sufficient for most Camunda 7 deployments.

{{< note title="Custom Configurations" class="info" >}}
If you have customized any of the removed configuration files or rely on removed subsystems, you may need to either:

* Recreate your customizations in the minimal `standalone.xml`
* Use the full WildFly distribution and [manually install]({{< ref "/installation/full/jboss/manual.md" >}}) Camunda 7 components
* Create a custom Galleon provisioning configuration with additional layers
{{< /note >}}

##### Creating Custom Galleon Provisioning

If you need additional WildFly features beyond the minimal set, you can create a custom Galleon provisioning configuration:

1. Install the [Galleon CLI tool](https://docs.wildfly.org/galleon/)
2. Create a provisioning configuration file (e.g., `provision.xml`):
```xml
<?xml version="1.0" ?>
<installation xmlns="urn:jboss:galleon:provisioning:3.0">
    <feature-pack location="org.wildfly:wildfly-galleon-pack:37.0.0.Final">
        <default-configs inherit="false"/>
        <packages inherit="false"/>
    </feature-pack>
    <config model="standalone" name="standalone.xml">
        <layers>
            <!-- Minimal Camunda 7 layers -->
            <include name="core-tools"/>
            <include name="core-server"/>
            <include name="datasources"/>
            <include name="cdi"/>
            <include name="deployment-scanner"/>
            <include name="servlet"/>
            <include name="jaxrs-core"/>
            <include name="ejb"/>
            <include name="jpa"/>
            
            <!-- Add additional layers as needed -->
            <!-- <include name="your-additional-layer"/> -->
        </layers>
    </config>
</installation>
```
3. Provision WildFly with Galleon:
```bash
galleon.sh provision /path/to/provision.xml --dir=$WILDFLY_HOME
```
4. Copy Camunda modules and configuration from the Camunda WildFly distribution

##### Additional Resources

* [WildFly Manual Installation Guide]({{< ref "/installation/full/jboss/manual.md" >}})
* [WildFly Configuration Guide]({{< ref "/installation/full/jboss/configuration.md" >}})
* [WildFly Galleon Documentation](https://docs.wildfly.org/galleon/)
* [WildFly Galleon Layers](https://docs.wildfly.org/37/Galleon_Guide.html#wildfly_galleon_layers)
{{< /details >}}

{{< details left="7.21.13" right="Sep/2025">}}
#### Camunda Run: Spring Boot 3.5 Upgrade

Camunda Run is now based on Spring Boot 3.5, upgrading from Spring Boot 3.3 which has reached end-of-life.

##### Migration Steps

For standard Camunda Run usage, **no action is required** beyond upgrading to version 7.21.13.

For custom Spring Boot configurations:

1. **Review Custom Configuration**: If you have applied custom Spring Boot-specific configuration to your `application.yml` or `application.properties`, ensure compatibility with Spring Boot 3.5
2. **Update Dependencies**: If you have added custom Spring Boot dependencies, verify they are compatible with Spring Boot 3.5
3. **Test Your Setup**: Verify that your Camunda Run instance starts and functions correctly after the upgrade

##### Expected Impact

We expect **no migration to be needed** for most users, as this upgrade primarily addresses security updates and dependency maintenance. The Spring Boot configuration interface remains largely compatible between versions 3.3 and 3.5.

For detailed information about Spring Boot 3.5 changes, refer to the release notes:

* [Spring Boot 3.4 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.4-Release-Notes).
* [Spring Boot 3.5 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.5-Release-Notes).
{{< /details >}}

{{< details left="7.23.4 / 7.22.7 / 7.21.12" right="July/2025">}}

#### Docker Base Image Update

The Docker base image has been updated from Alpine Linux 3.18 to Alpine Linux 3.22.

##### Migration Steps

For standard Docker image usage, **no action is required** beyond pulling the 7.21.12 / 7.22.7 / 7.23.4 image.

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
{{< /details >}}

{{< details left="7.22.2 / 7.21.7 / 7.20.10" right="Jan/2025">}}

#### GraalVM Upgrade

We are pleased to announce that the above patch releases are compatible with `GraalVM 21.3.12`

The engine will automatically **disable the system property** `polyglot.engine.WarnInterpreterOnly` when a [GraalJS](https://www.graalvm.org/jdk17/reference-manual/js/) script engine is used.

This adjustment ensures a smoother experience by suppressing unnecessary warnings related to `interpreter-only` execution in non-native GraalVM environments
which might cause confusion to our users running on non-GraalVM JDKs.

You can read more about the warnings [here](https://www.graalvm.org/jdk17/reference-manual/js/FAQ/#warning-implementation-does-not-support-runtime-compilation).

{{< note title="Heads-up!" class="info" >}}
If you want to ensure the best performance for JS execution, you can always configure the GraalVM Compiler with your JDK of choice, or use the GraalVM JDK.

More information on how to do this can be found in the official [GraalVM documentation](https://www.graalvm.org/jdk17/reference-manual/js/RunOnJDK/#graalvm-javascript-on-jdk-11).
{{< /note >}}
{{< /details >}}

{{< details left="7.22.1 / 7.21.6 / 7.20.9" right="Nov/2024">}}

The 7.22.0 release [replaced the runtime with the historic process instance query]({{< ref "/update/minor/721-to-722/_index.md#cockpit-process-instance-batch-modification" >}}) in Cockpit when performing a [Process Instance Batch Modification][process-instance-modification].

{{< note title="Heads-up!" class="warning" >}}
After migrating to 7.22.1, the behavior of the `Activity ID` filter when batch modifying process instances will change back to the old behavior you are used to from Camunda versions <= 7.21.X.
{{< /note >}}

The 7.22.0 release introduced a limitation for the `Activity ID` filter: Filtering for activities marked as `asyncBefore`/`asyncAfter` with active instances didn't yield process instances when using the `Activity ID` filter.

After some user feedback, we understood that there are use cases that cannot be catered with this limitation in place leading to undesired behavior.
With this patch release, we lifted this limitation by opting for a different solution approach which restored the previous behavior.

[process-instance-modification]: {{< ref "/webapps/cockpit/bpmn/process-instance-modification.md#perform-a-batch-modification" >}}

#### Set Variables Async API

Before version 7.22.1, the Set Variables Async API failed whenever at least one of the process instances did not exist.

Starting with version 7.22.1, the behavior has changed: if any of the process instances was deleted or completed, the call will still succeed. As a consequence, the Set Variables Batch Operation will also succeed in this case.

Please note that this does not apply to the Sync API, which keeps its behavior and fails if the process instance does not exist.

#### Bootstrap NES and AngularJS NES by HeroDevs, Inc.

These patches replace the following libraries with versions of Bootstrap NES and AngularJS NES by HeroDevs, Inc.:

* *AngularJS* (technical names: `angular`, `angular-animate`, `angular-cookies`, `angular-loader`, `angular-mocks`, `angular-resource`, `angular-route`, `angular-sanitize`, `angular-touch`)
*  *angular-ui-bootstrap*
*  *angular-translate*
*  *angular-moment*
*  *Bootstrap*

Where AngularJS, angular-ui-bootstrap, angular-translate, angular-moment, and Bootstrap were licensed entirely under the MIT license, Bootstrap NES and AngularJS NES by HeroDevs, Inc. licenses additional parts under the HeroDevs NES License. By downloading and using Camunda with Bootstrap NES and AngularJS NES by HeroDevs, Inc., you agree to the terms of the HeroDevs NES License. You can find the HeroDevs NES License terms in our [License Book]({{< ref "/introduction/third-party-libraries/camunda-bpm-platform-license-book.md" >}}).

Please see our [third-party libraries documentation]({{< ref "/introduction/third-party-libraries/_index.md#web-applications-cockpit-tasklist-admin" >}}) for details.
{{< /details >}}

{{< details left="7.21.4" right="Aug/2024">}}

#### Added Support for Tomcat 10

This version supports all the necessary building-block modules for our users to use `camunda-bpm-platform` community and enterprise editions in conjunction with `Tomcat 10.1`.

{{< note title="Heads-up!" class="warning" >}}

**<h4>Jakarta Namespace</h4>**

`Tomcat 10` is compatible with the `jakarta` namespace.
If you wish to use it, the `jakarta` modules needs to be used (`camunda-webapp-tomcat-jakarta`, `camunda-engine-rest-jakarta`).

The `javax` modules won't work with `Tomcat 10`.

For detailed steps of manual installation, follow the [Tomcat Manual Installation Guide]({{< ref "/installation/full/tomcat/manual.md" >}})

**<h4>Weld Class Loading Issues</h4>**
In deployment scenarios involving one or more process applications with managed beans, classloading issues may occur if the WELD library is directly embedded in the WAR's `/WEB-INF/lib` folder.
To resolve this, move the weld library away from the war and place it into the `$CATALINA_HOME/lib` folder.

The above workaround is not guaranteed to work for cases with bean references between WAR deployments (WAR A referencing a bean from WAR B).

The following test scenarios fail on Tomcat 10:

* [CallActivityContextSwitchTest](https://github.com/camunda/camunda-bpm-platform/blob/f37877b822dabcbf3cee5806bd5833d18cdcb543/qa/integration-tests-engine/src/test/java/org/camunda/bpm/integrationtest/functional/context/CallActivityContextSwitchTest.java)
* [CdiBeanCallActivityResolutionTest](https://github.com/camunda/camunda-bpm-platform/blob/f37877b822dabcbf3cee5806bd5833d18cdcb543/qa/integration-tests-engine/src/test/java/org/camunda/bpm/integrationtest/functional/cdi/CdiBeanCallActivityResolutionTest.java)
{{< /note >}}
{{< /details >}}

{{< details left="7.20.3" right="Jan/2024">}}

#### Changed trigger order of built-in task listeners

Built-in task listeners are used internally by the engine and not intended to be used by the user. User-defined task listeners are handled separately. Before this release, the order in which builtin task listeners were executed could depend on how the task was executed. This [bug report](https://github.com/camunda/camunda-bpm-platform/issues/4042) describes a scenario where after a process instance modification, the order of the builtin task listeners was reversed.
With this release for both, regular process execution and process instance modification, the engine ensures the following:

1. Built-in task listeners are executed before user-defined task listeners.
2. Built-in task listeners are executed in the order in which they were registered.
3. User-defined task listeners are executed in the order in which they were registered.

Previously, only 1. and 3. were ensured.

#### Cockpit's process definition like search changed to case-insensitive

The **Cockpit/Processes**'s page Process Definition search component allows for **name** and **key** search with **equals** and **like** operators.
With this recent change, per customer feedback, we modified the like search to case-insensitive.
This will allow a better experience when looking for process definitions.

The change also affects the API that provides the data for the search component.
This API is an internal API, which means it's **not** part of the public [REST API]({{< ref "/reference/rest" >}}), so the change should not affect any customers.
{{< /details >}}

{{< details left="7.20.2 / 7.19.9 / 7.18.13" right="Nov/2023">}}
#### Spring Boot Starter and Run logs admin user information on `DEBUG` level

In previous releases, when configuring Camunda's admin user in the Spring Boot Starter and Run via `camunda.bpm.admin-user`, information about the admin user appeared in the logs on log level `INFO` on startup.
With this release, the log level for the logs `STARTER-SB010` and `STARTER-SB011` was changed to `DEBUG`.
{{< /details >}}

{{< details left="7.19.5 / 7.18.10" right="Jul/2023">}}
#### Update Alpine Base of Camunda Docker images from Version 3.15 to 3.18

The Camunda Docker images are based on Alpine. This release updates the Alpine base docker image from version 3.15 to 3.18. Please find the changes in detail at the official sources below:

* [Alpine 3.16.0 Release Notes] [alpine316]
* [Alpine 3.17.0 Release Notes] [alpine317]
* [Alpine 3.18.0 Release Notes] [alpine318]

[alpine316]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.16.0
[alpine317]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.17.0
[alpine318]: https://wiki.alpinelinux.org/wiki/Release_Notes_for_Alpine_3.18.0
{{< /details >}}

{{< details left="7.19.3 / 7.18.9" right="Jun/2023">}}
#### Explicit asset declaration in Java web app plugins

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
{{< /details >}}

{{< details left="7.19.2 / 7.18.8" right="May/2023">}}
#### Bean method resolution from JUEL expressions

Calling bean methods from JUEL expressions now works more reliably and supports overloaded methods. As a result, the behavior of calling overloaded methods from such expressions changes.

Previoulsy, overloaded methods couldn't be determined reliably and were chosen based on the order of the underlying JDK's result of the call to `Class#getMethods` for a specific method name. As a result, the expected method might have been chosen for the expression evaluation but this could not be guaranteed.

Now, the most specific version according to the provided number and types of method parameters is chosen consistently. For example, method `myMethod` expecting an `Integer` is chosen over method `myMethod` expecting an `Object` if the provided parameter is an `Integer` or can be coerced into one.

Ideally, you shouldn't notice any difference in method invocation from JUEL expressions. However, we recommend testing your existing expressions thoroughly before using this patch version in production.
{{< /details >}}

{{< details left="7.19.1 / 7.18.7" right="Apr/2023">}}
#### Optimistic Locking on PostgreSQL

With this release, we adjusted the [Optimistic Locking]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}) behavior on PostgreSQL in case of [Foreign Key Constraint](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK) violations. Any violation of such a constraint in INSERT and UPDATE statements now leads to an [OptimisticLockingException]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}}). In effect, the engine's behavior on PostgreSQL in such scenarios is consistent with the other supported databases.

If you rely on the previous behavior, receiving `ProcessEngineException`s with the related error code for foreign key constraint violations, you can restore it by disabling the engine configuration flag `enableOptimisticLockingOnForeignKeyViolation`. As a result, jobs can also start failing due to those exceptions although they could be safely retried automatically to resolve the situation.
{{< /details >}}

{{< details left="7.18.6" right="Mar/2023">}}
#### Web apps revalidate authentications every five minutes

Previously, after a user logged into the web apps, the [authentication cache]({{< ref "/webapps/shared-options/authentication.md#cache" >}})
was valid for the lifetime of the HTTP session, which has [security implications]({{< ref "/user-guide/security.md#authentication-cache" >}}).

With this release, we introduced a time to live for the authentication cache, configured to five minutes by default.
This new default might lead to a higher load on your database.

You can read how to configure the time to live to a smaller interval or restore the legacy behavior (disable the authentication cache time to live) in the documentation about [Web Applications]({{< ref "/webapps/shared-options/authentication.md#time-to-live" >}}).

##### Container-based authentication requires implementing a `ReadOnlyIdentityProvider`

When using [Container-based Authentication]({{< ref "/webapps/shared-options/authentication.md#container-based-authentication" >}}), please provide an implementation for the `ReadOnlyIdentityProvider` interface so that queries return the results of your identity provider.

This is necessary due to the aforementioned security improvement to revalidate users and groups.
{{< /details >}}

{{< details left="7.18.5" right="Feb/2023">}}
#### Multi-Tenancy enabled for User operation logs

Tenant information is populated for User operation logs from 7.18.5 onwards, user operation logs created prior will stay as they are. If [tenant check]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#tenantCheckEnabled" >}}) is enabled in the process engine, a tenant membership check will be performed for the following operations:

* User operation log query
* Deleting a user operation log
* Adding/Clearing a user operation log annotation

In case you want to avoid tenant checks, please refer to [Disable the transparent access restrictions]({{< ref "/user-guide/process-engine/multi-tenancy.md#disable-the-transparent-access-restrictions" >}}).
{{< /details >}}

{{< details left="7.18.3" right="Jan/2023">}}
#### Job executor priority range properties default changed

The default value for the job executor priority range property [jobExecutorPriorityRangeMin]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMin" >}}) has changed from 0 to <code>-2<sup>63</sup></code> (`Long.MIN_VALUE`). This property and its counterpart ([jobExecutorPriorityRangeMax]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMax" >}})) only have an effect if [jobExecutorAcquireByPriority]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorAcquireByPriority" >}}) is set to true.
{{< /details >}}

{{< details left="7.18.2" right="Dec/2022">}}
#### Job executor priority range properties type changed

The two dedicated job executor priority range properties [jobExecutorPriorityRangeMin]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMin" >}}) and [jobExecutorPriorityRangeMax]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#jobExecutorPriorityRangeMax" >}}) have been change to primitive type <code>long</code>. That allows for the properties to be configured for every process engine configuration. Respectively their default values changed to <code>0</code> and <code>2<sup>63</sup>-1</code> (`Long.MAX_VALUE`).
Note: this behavior is slightly changed with the [next patch]({{< ref "#job-executor-priority-range-properties-default-changed" >}}).
{{< /details >}}

## Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**. In this case you need to update the libraries and applications installed inside the application server.

Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down the server
* Exchange Camunda 7 libraries, tools and webapps (EAR, RAR, Subsystem (Wildfly), Shared Libs) - essentially, follow the [installation guide]({{< ref "/installation/full/_index.md" >}}) for your server.
* Restart the server

## Application With Embedded Process Engine

In case you use an embedded process engine inside your Java Application, you need to

1. update the Process Engine library in your dependency management (Apache Maven, Gradle ...),
2. re-package the application,
3. deploy the new version of the application.

## Standalone Webapplication Distribution

{{< note title="Camunda discontinues the support of the Standalone Web Application Distribution." class="warning" >}}
Camunda Automation Platform 7.19 is the last release providing support for Standalone Web Application Distribution.

Please consider migrating to [another supported]({{< ref "/introduction/downloading-camunda.md#download-the-runtime" >}}) setup.
{{< /note >}}

In case you installed the [Standalone Webapplication Distribution]({{< ref "/introduction/downloading-camunda.md#download-the-runtime" >}}) you need to

1. undeploy the previous version of the webapplication,
2. deploy the new version of the webapplication.

## Applying Multiple Patches at Once

It is possible to apply multiple patches in one go (e.g., updating from `7.1.0` to `7.1.4`).
