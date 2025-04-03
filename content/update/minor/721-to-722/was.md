---

title: "Update an IBM Websphere Liberty Installation from 7.21 to 7.22"

menu:
  main:
    name: "WebSphere Liberty"
    identifier: "migration-guide-722-was"
    parent: "migration-guide-722"

---


The following steps describe how to update the Camunda artifacts on IBM WebSphere application server Liberty in a shared process engine setting. 
Throughout the procedure, refer to the [update guide][update-guide]. If not already done, download the [Camunda 7.22 IBM WebSphere distribution][was-distribution].

The update procedure takes the following steps:

1. Uninstall the Camunda libraries and archives.
2. Replace Camunda core libraries.
3. Replace optional Camunda dependencies.
4. Maintain the Camunda 7 configuration.
5. Install the Camunda Archive.
6. Install the web applications.

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of 
the artifacts.

# 1. Remove the Camunda libraries and archives

First, remove the Camunda EAR, REST API, and web applications from the Liberty `$YOUR_SERVER/apps/` directory.

# 2. Replace Camunda core libraries

With your first Camunda installation, you have created a shared library named `Camunda`. We identify 
the folder to this shared library as `$SHARED_LIBRARY_PATH`.

After shutting down the server, replace the following libraries in `$SHARED_LIBRARY_PATH` with the equivalents 
from `$WAS_DISTRIBUTION/server/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-dmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `camunda-engine-dmn-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-api-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-juel-$PLATFORM_VERSION.jar`
* `camunda-engine-feel-scala-$PLATFORM_VERSION.jar`
* `camunda-juel-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$PLATFORM_VERSION.jar`
* `camunda-commons-typed-values-$PLATFORM_VERSION.jar`
* `camunda-commons-utils-$PLATFORM_VERSION.jar`
* `camunda-connect-connectors-all-$PLATFORM_VERSION.jar`
* `camunda-connect-core-$PLATFORM_VERSION.jar`
* `camunda-template-engines-freemarker-$PLATFORM_VERSION.jar`
* `feel-engine-$FEEL_ENGINE_VERSION-scala-shaded.jar`
* `freemarker-$FREEMARKER_VERSION.jar`
* `mybatis-$MYBATIS_VERSION.jar`

# 3. Replace optional Camunda dependencies

In addition to the core libraries, there may be optional artifacts in `$SHARED_LIBRARY_PATH` for LDAP integration, 
Camunda Spin, Camunda Connect, and scripting. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following library from `$WAS_DISTRIBUTION/server/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect plugin

`camunda-connect-connectors-all` and `camunda-engine-plugin-connect` are part of the `.ear`.

## Camunda Spin

Copy the following library from `$WAS_DISTRIBUTION/server/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `camunda-spin-core-$PLATFORM_VERSION.jar`

## GraalVM JavaScript

Copy the following libraries from `$WAS_DISTRIBUTION/server/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `graal-sdk-$GRAALJS_VERSION.jar`
* `icu4j-$ICU4J_VERSION.jar`
* `js-$GRAALJS_VERSION.jar`
* `js-scriptengine-$GRAALJS_VERSION.jar`
* `regex-$GRAALJS_VERSION.jar`
* `truffle-api-$GRAALJS_VERSION.jar`

## Groovy

The following libraries replace the single `groovy-all-$GROOVY_VERSION.jar` library. Copy these libraries from
`$WAS_DISTRIBUTION/server/lib` to the folder `$SHARED_LIBRARY_PATH`, if present:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`

# 4. Maintain the Camunda 7 configuration

If you have previously replaced the default Camunda 7 configuration with a custom configuration following any of 
the methods outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore 
this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

# 5. Install the Camunda Archive

Install the Camunda EAR, or the file `$WAS_DISTRIBUTION/server/apps/camunda-ibm-websphere-ear-7.22.0-ee.ear`.

Please follow [the EAR installation guide](https://docs.camunda.org/manual/7.22/installation/full/was/manual-liberty/#camunda-ear)
to deploy the Camunda EAR correctly.

# 6. Install the web applications

## REST API

The following steps are required to update the Camunda REST API on an IBM WebSphere Liberty instance:

1. Place the web application `$WAS_DISTRIBUTION/server/apps/camunda-engine-rest-7.22.0-ee-was.war` in the Liberty `$YOUR_SERVER/apps/` directory.
2. Configure the `server.xml` as described in [the Liberty installation guide](https://docs.camunda.org/manual/7.22/installation/full/was/manual-liberty/#rest-api).

## Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on an IBM WebSphere instance:

1. Place the web application `$WAS_DISTRIBUTION/server/apps/camunda-webapp-ee-was-7.22.0-ee.war` in the Liberty `$YOUR_SERVER/apps/` directory.
2. Configure the `server.xml` as described in [the Liberty installation guide](https://docs.camunda.org/manual/7.22/installation/full/was/manual-liberty/#cockpit-tasklist-and-admin).

[configuration-location]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[update-guide]: {{< ref "/update/minor/721-to-722/_index.md" >}}
[was-distribution]: https://artifacts.camunda.com/artifactory/camunda-bpm-ee/org/camunda/bpm/websphere/camunda-bpm-websphere/7.22.0-ee/
