---

title: "Update a Tomcat Installation from 7.4 to 7.5"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-74-tomcat"
    parent: "migration-guide-74"

---

The following steps describe how to upgrade the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire procedure, refer to the [upgrade guide][upgrade-guide]. If not already done, make sure to download the [Camunda BPM 7.5 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM Core Libraries
2. Upgrade Optional Camunda BPM Libraries
3. Maintain Process Engine Configuration
4. Maintain Process Applications
5. Upgrade Web Applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

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

<< Add necessary process engine configuration changes as subsections here >>

# 4. Maintain Process Applications

This section describes changes in behavior of API methods that your process applications may rely on.

<< Add necessary application changes as subsections here >>

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

[upgrade-guide]: {{< relref "update/minor/74-to-75/index.md" >}}
[nexus]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
