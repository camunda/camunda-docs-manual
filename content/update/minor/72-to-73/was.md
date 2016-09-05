---

title: "Update an IBM Websphere Installation from 7.2 to 7.3"

menu:
  main:
    name: "WebSphere"
    identifier: "migration-guide-72-was"
    parent: "migration-guide-72"

---

The following steps describe how to update the Camunda artifacts on an IBM WebSphere application server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.3 IBM WebSphere distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/websphere/camunda-bpm-websphere/).

The update procedure takes the following steps:

1. Uninstall the Camunda libraries and archives
2. Replace Camunda core libraries
3. Replace optional Camunda dependencies
4. Maintain BPM platform configuration (*optional*)
5. Install the Camunda archive
6. Install the Camunda BPM web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

# 1. Uninstall the Camunda Libraries and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda Core Libraries

With 7.2, you have created a shared library named `Camunda`. We identify the folder to this shared library as `$SHARED_LIBRARY_PATH`.

After shutting down the server, replace the following libraries in `$SHARED_LIBRARY_PATH` with their equivalents from `$WAS_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

# 3. Replace Optional Camunda Dependencies

In addition to the core libraries, there may be optional artifacts in `$SHARED_LIBRARY_PATH` for LDAP integration, Camunda Connect, and Camunda Spin. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-connect-core-$CONNECT_VERSION.jar`

## Camunda Spin

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH` if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

# 4. Maintain the BPM Platform Configuration

If you have previously replaced the default BPM platform configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

## Task Query Expressions

As of 7.3.3, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.2.8.

# 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WAS_DISTRIBUTION/modules/camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`. During the installation, the EAR will try to reference the previously created `Camunda` shared library.

# 6. Install the Web Applications

## REST API

The following steps are required to update the Camunda REST API on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

## Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

{{< note title="LDAP Entity Caching" class="info" >}}
It is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[configuration-location]: {{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[migration-guide]: {{< relref "update/minor/72-to-73/index.md" >}}
