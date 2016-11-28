---

title: "Upgrade an IBM Websphere Installation from 7.5 to 7.6"

menu:
  main:
    name: "WebSphere"
    identifier: "migration-guide-75-was"
    parent: "migration-guide-75"

---


The following steps describe how to upgrade the Camunda artifacts on an IBM WebSphere application server in a shared process engine setting. For the entire procedure, refer to the [upgrade guide][upgrade-guide]. If not already done, make sure to download the [Camunda BPM 7.6 IBM WebSphere distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/websphere/camunda-bpm-websphere/).

The upgrade procedure takes the following steps:

1. Uninstall the Camunda Libraries and Archives
2. Replace Camunda Core Libraries
3. Replace Optional Camunda Dependencies
4. Maintain the BPM Platform Configuration
5. Install the Camunda Archive
6. Install the Web Applications

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of the artifacts.

# 1. Uninstall the Camunda Libraries and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda Core Libraries

With your first Camunda installation or upgrade to 7.2, you have created a shared library named `Camunda`. We identify the folder to this shared library as `$SHARED_LIBRARY_PATH`.

After shutting down the server, replace the following libraries in `$SHARED_LIBRARY_PATH` with their equivalents from `$WAS_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-dmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `camunda-engine-dmn-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-api-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-juel-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-typed-values-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

# 3. Replace Optional Camunda Dependencies

In addition to the core libraries, there may be optional artifacts in `$SHARED_LIBRARY_PATH` for LDAP integration, Camunda Spin, and Groovy scripting. If you use any of these extensions, the following upgrade steps apply:

## LDAP integration

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-connect-core-$CONNECT_VERSION.jar`

## Camunda Spin

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## Groovy Scripting

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `groovy-all-$GROOVY_VERSION.jar`

# 4. Maintain the BPM Platform Configuration

If you have previously replaced the default BPM platform configuration with a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the upgraded platform.

# 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WAS_DISTRIBUTION/modules/camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`. During the installation, the EAR will try to reference the `Camunda` shared library.

# 6. Install the Web Applications

## REST API

The following steps are required to upgrade the Camunda REST API on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

## Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

[configuration-location]: {{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[upgrade-guide]: {{< relref "update/minor/75-to-76/index.md" >}}
