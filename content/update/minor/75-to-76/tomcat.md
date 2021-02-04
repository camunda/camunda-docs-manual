---

title: "Update a Tomcat Installation from 7.5 to 7.6"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-75-tomcat"
    parent: "migration-guide-75"

---


The following steps describe how to update the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire procedure, refer to the [update guide][update-guide]. If not already done, make sure to download the [Camunda Platform 7.6 Tomcat distribution](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The update procedure takes the following steps:

1. Update the Camunda Platform Core Libraries
2. Update Optional Camunda Platform Libraries
3. Maintain Process Applications
4. Update Web Applications

In each of the following steps, the identifier `$*_VERSION` refers to the current versions and the new versions of the artifacts.

# 1. Update the Camunda Platform Core Libraries

Replace the following libraries in the folder `$TOMCAT_HOME/lib/` with their new versions from the folder `$TOMCAT_DISTRIBUTION/lib/`:

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

# 2. Update Optional Camunda Platform Libraries

In addition to the core libraries, there may be optional artifacts in `$TOMCAT_HOME/lib/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting. If you use any of these extensions, the following update steps apply:

## LDAP Integration

Copy the following library from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$PLATFORM_VERSION.jar`

## Camunda Spin

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$PLATFORM_VERSION.jar`

## Groovy Scripting

Copy the following library from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/`, if present:

* `groovy-all-$GROOVY_VERSION.jar`

# 3. Update Web Applications

## Update REST API

The following steps are required to update the Camunda REST API on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][nexus] Alternatively, switch to the private repository for the enterprise version (credentials from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
3. Deploy the web application archive to your Tomcat instance.

## Update Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][nexus]. Alternatively, switch to the private repository for the enterprise version (credentials from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your Tomcat instance.

[update-guide]: {{< ref "/update/minor/75-to-76/_index.md" >}}
[nexus]: https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/camunda-engine-rest/
