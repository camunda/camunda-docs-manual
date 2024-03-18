---

title: "Update an Oracle WebLogic Installation from 7.19 to 7.20"

menu:
  main:
    name: "WebLogic"
    identifier: "migration-guide-720-weblogic"
    parent: "migration-guide-720"

---

The following steps describe how to update the Camunda artifacts on an Oracle WebLogic application server in a
shared process engine setting. Throughout the procedure, refer to the [update guide][update-guide]. If not already done, download the [Camunda 7.20 Oracle WebLogic distribution](https://artifacts.camunda.com/artifactory/camunda-bpm-ee/org/camunda/bpm/weblogic/camunda-bpm-weblogic/7.20.0-ee/).

The update procedure takes the following steps:

1. Uninstall the Camunda applications and archives.
2. Replace Camunda core libraries.
3. Replace optional Camunda dependencies.
4. Maintain the Camunda 7 configuration.
5. Install the Camunda Archive.
6. Install the web applications.

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of the artifacts.

# 1. Uninstall the Camunda applications and archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist, and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda core libraries

After shutting down the server, replace the following libraries in `$WLS_DOMAIN_HOME/lib` with the equivalents from `$WLS_DISTRIBUTION/modules/lib`:

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
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-typed-values-$PLATFORM_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `feel-engine-$FEEL_ENGINE_VERSION-scala-shaded.jar`
* `mybatis-$MYBATIS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

# 3. Replace optional Camunda dependencies

In addition to the core libraries, there may be optional artifacts in `$WLS_DOMAIN_HOME/lib` for LDAP integration, Camunda Spin, and scripting. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect plugin

`camunda-connect-http-client`, `camunda-connect-soap-http-client`, and `camunda-engine-plugin-connect` are part of the `.ear`.

## Camunda Spin

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

---
`camunda-spin-dataformat-json-jackson`, `camunda-spin-dataformat-xml-dom`, and `camunda-engine-plugin-spin` are part of the `.ear`.

## GraalVM JavaScript

Copy the following libraries from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `graal-sdk-$GRAALJS_VERSION.jar`
* `icu4j-$ICU4J_VERSION.jar`
* `js-$GRAALJS_VERSION.jar`
* `js-scriptengine-$GRAALJS_VERSION.jar`
* `regex-$GRAALJS_VERSION.jar`
* `truffle-api-$GRAALJS_VERSION.jar`

## Groovy

The following libraries replace the single `groovy-all-$GROOVY_VERSION.jar` library. Copy these libraries from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`

# 4. Maintain the Camunda 7 configuration

If you have previously replaced the default Camunda 7 configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

# 5. Install the Camunda Archive

Install the Camunda EAR, or the file `$WLS_DISTRIBUTION/modules/camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 6. Install the web applications

## REST API

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` to your Oracle WebLogic instance.

## Cockpit, Tasklist, and Admin

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war` to your Oracle WebLogic instance.

[configuration-location]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[update-guide]: {{< ref "/update/minor/719-to-720/_index.md" >}}
