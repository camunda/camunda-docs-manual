---

title: "Update a Tomcat Installation from 7.2 to 7.3"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-72-tomcat"
    parent: "migration-guide-72"

---

The following steps describe how to update the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.3 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The update procedure takes the following steps:

1. Update the Camunda BPM core libraries
2. Update the optional Camunda BPM libraries
3. Update Camunda web applications
4. Configure Process Engines

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

{{< note title="Updated Tomcat Version" class="info" >}}
The pre-built Camunda 7.3 distribution ships with Tomcat 7.0.62, whereas 7.2 comes with Tomcat 7.0.50. Camunda 7.3 is supported on all Tomcat 6/7 versions such that a Tomcat update is not required when migrating from 7.2 to 7.3.

Should you want to update Tomcat along with Camunda, perform the following steps either before or after updating Camunda:

* Copy all your Camunda-related libraries from `$TOMCAT_HOME/lib` to the new Tomcat server's `lib`-directory.
* Apply all modifications to Tomcat configuration files such as `server.xml`/`bpm-platform.xml` to the files located in the new Tomcat server's directory.
* Undeploy all process applications and copy them to the new Tomcat server's directory for redeployment.

See the [Tomcat migration guide](https://tomcat.apache.org/migration-7.html#Upgrading_7.0.x) for any Tomcat-specific migration notes and procedures.
{{< /note >}}


# 1. Update the Camunda BPM Core Libraries

Replace the following libraries in the folder `$TOMCAT_HOME/lib/` with their new versions from the folder `$TOMCAT_DISTRIBUTION/lib/`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-cmmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`

# 2. Update Optional Camunda BPM libraries

In addition to the core libraries, there may be optional artifacts in `$TOMCAT_HOME/lib/` for LDAP integration, Camunda Connect, and Camunda Spin. If you use any of these extensions, the following update steps apply:

## LDAP Integration

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

## Camunda Connect

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$PLATFORM_VERSION.jar`

## Camunda Spin

Copy the following libraries from `$TOMCAT_DISTRIBUTION/lib` to the folder `$TOMCAT_HOME/lib/` if present:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$PLATFORM_VERSION.jar`


# 3. Update Web Applications

## Update REST API

The following steps are required to update the camunda REST API on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][nexus] Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
3. Deploy the web application archive to your Tomcat instance.

## Update Cockpit, Tasklist, and Admin

The following steps are required to update the camunda web applications Cockpit, Tasklist, and Admin on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][nexus]). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your Tomcat instance.

{{< note title="LDAP Entity Caching" class="info" >}}
It is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

# 4. Configure Process Engines

## Task Query Expressions

As of 7.3.3, the default handling of expressions submitted as parameters of task queries has changed. Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated. The process engine no longer evaluates these expressions by default and throws an exception instead. This behavior can be toggled in the process engine configuration using the properties `enableExpressionsInAdhocQueries` (default `false`) and `enableExpressionsInStoredQueries` (default `true`). To restore the engine's previous behavior, set both flags to `true`. See the user guide on [security considerations for custom code]({{< relref "user-guide/process-engine/securing-custom-code.md" >}}) for details.
This is already the default for Camunda BPM versions after and including 7.2.8.

[migration-guide]: {{< relref "update/minor/72-to-73/index.md" >}}
[nexus]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
