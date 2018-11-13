---

title: "Update an Oracle WebLogic Installation from 7.3 to 7.4"

menu:
  main:
    name: "WebLogic"
    identifier: "migration-guide-73-weblogic"
    parent: "migration-guide-73"

---

The following steps describe how to update the Camunda artifacts on an Oracle WebLogic application server in a shared process engine setting. For the entire procedure, refer to the [update guide][update-guide]. If not already done, make sure to download the [Camunda BPM 7.4 Oracle WebLogic distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/weblogic/camunda-bpm-weblogic/).

The update procedure takes the following steps:

1. Uninstall the Camunda Applications and Archives
2. Replace Camunda Core Libraries
3. Replace Optional Camunda Dependencies
4. Maintain the BPM Platform Configuration
5. Maintain Process Engine Configuration
6. Maintain Process Applications
7. Install the Camunda Archive
8. Install the Web Applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

# 1. Uninstall the Camunda Applications and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda Core Libraries

After shutting down the server, replace the following libraries in `$WLS_DOMAIN_HOME/lib` with their equivalents from `$WLS_DISTRIBUTION/modules/lib`:

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

# 3. Replace Optional Camunda Dependencies

In addition to the core libraries, there may be optional artifacts in `$WLS_DOMAIN_HOME/lib` for LDAP integration, Camunda Spin, and Groovy scripting. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following libraries from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Spin

Copy the following libraries from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## Groovy Scripting

Copy the following libraries from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `groovy-all-$GROOVY_VERSION.jar`

# 4. Maintain the BPM Platform Configuration

If you have previously replaced the default BPM platform configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

# 5. Maintain Process Engine Configuration

This section describes changes in the engine’s default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored for shared process engines by explicitly setting a configuration option.

## Task Query Expressions

As of 7.4, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.3.3 and 7.2.8.

## User Operation Log

The behavior of the [user operation log]({{< ref "/user-guide/process-engine/history.md#user-operation-log" >}}) has changed, so that operations are only logged if they are performed in the context of a logged in user. This behavior can be toggled in the process engine configuration using the property `restrictUserOperationLogToAuthenticatedUsers` (default `true`). To restore the engine's prior behavior, i.e., to write log entries regardless of user context, set the flag to `false`.

Furthermore, with 7.4 task events are only logged when they occur in the context of a logged in user. Task events are accessible via the deprecated API `TaskService#getTaskEvents`. If you rely on this API method, the previous behavior can be restored by setting the flag `restrictUserOperationLogToAuthenticatedUsers` to `false`.

# 6. Maintain Process Applications

This section describes changes in behavior of API methods that your process applications may rely on.

## CMMN Model API

As a consequence of supporting CMMN 1.1, the CMMN model API is now based on the schema of CMMN 1.1. This leads to [limitations]({{< ref "/user-guide/model-api/cmmn-model-api/limitations.md" >}}) when editing CMMN 1.0 models. We therefore recommend to [migrate your CMMN 1.0 models to CMMN 1.1]({{< ref "/reference/cmmn11/migration/10-to-11.md" >}}).

# 7. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WLS_DISTRIBUTION/modules/camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 8. Install the Web Applications

## REST API

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` to your Oracle WebLogic instance.

## Cockpit, Tasklist, and Admin

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war` to your Oracle WebLogic instance.

{{< note title="LDAP Entity Caching" class="info" >}}
It is possible to enable entity caching for Hypertext Application Language (HAL) requests that the Camunda web applications make. This can be especially useful when you use Camunda in combination with LDAP. To activate caching, the Camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< ref "/reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[configuration-location]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[update-guide]: {{< ref "/update/minor/73-to-74/_index.md" >}}
