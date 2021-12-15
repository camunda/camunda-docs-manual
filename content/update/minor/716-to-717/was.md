---

title: "Update an IBM Websphere Installation from 7.16 to 7.17"

menu:
  main:
    name: "WebSphere"
    identifier: "migration-guide-717-was"
    parent: "migration-guide-717"

---


The following steps describe how to update the Camunda artifacts on an IBM WebSphere application server in a shared process engine setting. Throughout the procedure, refer to the [update guide][update-guide]. If not already done, download the [Camunda Platform 7.16 IBM WebSphere distribution](https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm-ee/org/camunda/bpm/websphere/camunda-bpm-websphere/7.16.0-ee/).

The update procedure takes the following steps:

1. Uninstall the Camunda libraries and archives.
2. Replace Camunda core libraries.
3. Replace optional Camunda dependencies.
4. Maintain the Camunda Platform configuration.
5. Install the Camunda Archive.
6. Install the web applications.

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of the artifacts.

# 1. Uninstall the Camunda libraries and archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist, and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda core libraries

With your first Camunda installation or update to 7.2, you have created a shared library named `Camunda`. We identify the folder to this shared library as `$SHARED_LIBRARY_PATH`.

After shutting down the server, replace the following libraries in `$SHARED_LIBRARY_PATH` with their equivalents from `$WAS_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-dmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `camunda-engine-dmn-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-api-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-juel-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-scala-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-typed-values-$PLATFORM_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-template-engines-freemarker-$TEMPLATE_ENGINES_VERSION.jar`
* `feel-engine-$FEEL_ENGINE_VERSION-scala-shaded.jar`
* `freemarker-$FREEMARKER_VERSION.jar`
* `mybatis-$MYBATIS_VERSION.jar`

# 3. Replace optional Camunda dependencies

In addition to the core libraries, there may be optional artifacts in `$SHARED_LIBRARY_PATH` for LDAP integration, Camunda Spin, Camunda Connect, and scripting. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect plugin

`camunda-connect-connectors-all` and `camunda-engine-plugin-connect` are part of the `.ear`.

## Camunda Spin

Copy the following library from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## GraalVM JavaScript

Copy the following libraries from `$WAS_DISTRIBUTION/modules/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `graal-sdk-$GRAALJS_VERSION.jar`
* `icu4j-$ICU4J_VERSION.jar`
* `js-$GRAALJS_VERSION.jar`
* `js-scriptengine-$GRAALJS_VERSION.jar`
* `regex-$GRAALJS_VERSION.jar`
* `truffle-api-$GRAALJS_VERSION.jar`

# 4. Maintain the Camunda Platform configuration

If you have previously replaced the default Camunda Platform configuration with a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

# 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WAS_DISTRIBUTION/modules/camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear`. During the installation, the EAR will try to reference the `Camunda` shared library.

# 6. Install the web applications

## REST API

The following steps are required to update the Camunda REST API on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

## Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on an IBM WebSphere instance:

1. Deploy the web application `$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` to your IBM WebSphere instance.
2. Associate the web application with the `Camunda` shared library.

[configuration-location]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[update-guide]: {{< ref "/update/minor/716-to-717/_index.md" >}}
