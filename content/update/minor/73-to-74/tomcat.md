---

title: "Update a Tomcat Installation from 7.3 to 7.4"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-73-tomcat"
    parent: "migration-guide-73"

---

The following steps describe how to upgrade the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire procedure, refer to the [upgrade guide][upgrade-guide]. If not already done, make sure to download the [Camunda BPM 7.4 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM Core Libraries
2. Upgrade Optional Camunda BPM Libraries
3. Maintain Process Engine Configuration
4. Maintain Process Applications
5. Upgrade Web Applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

{{< note title="Upgraded Tomcat Version" class="info" >}}
The pre-built Camunda 7.4 distribution ships with Tomcat 8.0.26, whereas 7.3 comes with Tomcat 7.0.62. Camunda 7.4 is supported on all Tomcat 6/7/8 versions such that a Tomcat upgrade is not required when migrating from 7.3 to 7.4.

Should you want to upgrade Tomcat along with Camunda, perform the following steps either before or after upgrading Camunda:

* Copy all your Camunda-related libraries from `$TOMCAT_HOME/lib` to the new Tomcat server's `lib`-directory.
* Apply all modifications to Tomcat configuration files such as `server.xml`/`bpm-platform.xml` to the files located in the new Tomcat server's directory.
* Undeploy all process applications and copy them to the new Tomcat server's directory for redeployment.

See the [Tomcat migration guide](https://tomcat.apache.org/migration-8.html#Migrating_from_7.0.x_to_8.0.x) for any Tomcat-specific migration notes and procedures.
{{< /note >}}

# 1. Upgrade the Camunda BPM Core Libraries

Replace the following libraries in the folder `$TOMCAT_HOME/lib/` with their new versions from the folder `$TOMCAT_DISTRIBUTION/lib/`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

Add or replace (if already present) the following libraries:

* `camunda-engine-dmn-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-api-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-juel-$PLATFORM_VERSION.jar`
* `camunda-dmn-model-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-typed-values-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

Starting with 7.4, SLF4J is a mandatory dependency. Add the SLF4J libraries (if not already present):

* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

Camunda needs version slf4j-api-1.7.7 or higher.
See the User Guide for [Information on Logging in Camunda]({{< relref "user-guide/logging.md" >}}).

# 2. Upgrade Optional Camunda BPM Libraries

In addition to the core libraries, there may be optional artifacts in `$TOMCAT_HOME/lib/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting. If you use any of these extensions, the following upgrade steps apply:

## LDAP Integration

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-engine-plugin-connect-$PLATFORM_VERSION.jar`

## Camunda Spin

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$PLATFORM_VERSION.jar`

## Groovy Scripting

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `groovy-all-$GROOVY_VERSION.jar`

# 3. Maintain Process Engine Configuration

This section describes changes in the engine’s default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored for shared process engines by explicitly setting a configuration option.

## Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

## User Operation Log

The behavior of the [user operation log]({{< relref "user-guide/process-engine/history.md#user-operation-log" >}}) has changed, so that operations are only logged if they are performed in the context of a logged in user. This behavior can be toggled in the process engine configuration using the property `restrictUserOperationLogToAuthenticatedUsers` (default `true`). To restore the engine's prior behavior, i.e., to write log entries regardless of user context, set the flag to `false`.

Furthermore, with 7.4 task events are only logged when they occur in the context of a logged in user. Task events are accessible via the deprecated API `TaskService#getTaskEvents`. If you rely on this API method, the previous behavior can be restored by setting the flag `restrictUserOperationLogToAuthenticatedUsers` to `false`.

# 4. Maintain Process Applications

This section describes changes in behavior of API methods that your process applications may rely on.

## CMMN Model API

As a consequence of supporting CMMN 1.1, the CMMN model API is now based on the schema of CMMN 1.1. This leads to [limitations]({{< relref "user-guide/model-api/cmmn-model-api/limitations.md" >}}) when editing CMMN 1.0 models. We therefore recommend to [migrate your CMMN 1.0 models to CMMN 1.1]({{< relref "reference/cmmn11/migration/10-to-11.md" >}}).

# 5. Upgrade Web Applications

## Upgrade REST API

The following steps are required to upgrade the Camunda REST API on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][nexus] Alternatively, switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
3. Deploy the web application archive to your Tomcat instance.

## Upgrade Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][nexus]). Alternatively, switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your Tomcat instance.

{{< note title="LDAP Entity Caching" class="info" >}}
It is possible to enable entity caching for Hypertext Application Language (HAL) requests that the Camunda web applications make. This can be especially useful when you use Camunda in combination with LDAP. To activate caching, the Camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[upgrade-guide]: {{< relref "update/minor/73-to-74/index.md" >}}
[nexus]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
