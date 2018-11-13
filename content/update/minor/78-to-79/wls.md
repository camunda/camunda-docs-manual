---

title: "Update an Oracle WebLogic Installation from 7.8 to 7.9"

menu:
  main:
    name: "WebLogic"
    identifier: "migration-guide-78-weblogic"
    parent: "migration-guide-78"

---

The following steps describe how to update the Camunda artifacts on an Oracle WebLogic application server in a shared process engine setting. For the entire procedure, refer to the [update guide][update-guide]. If not already done, make sure to download the [Camunda BPM 7.9 Oracle WebLogic distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/weblogic/camunda-bpm-weblogic/).

The update procedure takes the following steps:

1. Uninstall the Camunda Applications and Archives
2. Replace Camunda Core Libraries
3. Replace Optional Camunda Dependencies
4. Maintain the BPM Platform Configuration
5. Install the Camunda Archive
6. Install the Web Applications

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of the artifacts.

# 1. Uninstall the Camunda Applications and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the Camunda EAR. Its name should be `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 2. Replace Camunda Core Libraries

After shutting down the server, replace the following libraries in `$WLS_DOMAIN_HOME/lib` with their equivalents from `$WLS_DISTRIBUTION/modules/lib`:

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

In addition to the core libraries, there may be optional artifacts in `$WLS_DOMAIN_HOME/lib` for LDAP integration, Camunda Spin, and Groovy scripting. If you use any of these extensions, the following update steps apply:

## LDAP integration

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-connect-core-$CONNECT_VERSION.jar`


## Camunda Spin

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `camunda-spin-core-$SPIN_VERSION.jar`

## Groovy Scripting

Copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`, if present:

* `groovy-all-$GROOVY_VERSION.jar`

# 4. Maintain the BPM Platform Configuration

If you have previously replaced the default BPM platform configuration by a custom configuration following any of the ways outlined in the [deployment descriptor reference][configuration-location], it may be necessary to restore this configuration. This can be done by repeating the configuration replacement steps for the updated platform.

# 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WLS_DISTRIBUTION/modules/camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

# 6. Install the Web Applications

## REST API

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` to your Oracle WebLogic instance.

## Cockpit, Tasklist, and Admin

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war` to your Oracle WebLogic instance.

[configuration-location]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[update-guide]: {{< ref "/update/minor/78-to-79/_index.md" >}}
