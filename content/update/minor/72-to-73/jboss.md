---

title: "Update a JBoss Installation from 7.2 to 7.3"

menu:
  main:
    name: "JBoss"
    identifier: "migration-guide-72-jboss"
    parent: "migration-guide-72"

---

The following steps describe how to upgrade the Camunda artifacts on a JBoss AS
7 and Wildfly 8 server in a shared process engine setting. For the entire
migration procedure, refer to the [migration guide][migration-guide]. If not
already done, make sure to download the [Camunda BPM 7.3 JBoss distribution][jboss-distro]
or [Camunda BPM 7.3 Wildfly distribution][wildfly-distro]. In the following instructions
`$APP_SERVER` should be replaced with either `jboss` or `wildfly` depending on
the used application server.

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM modules
2. Upgrade optional Camunda BPM modules
3. Upgrade Camunda web applications

Whenever the instructions are to *replace* a module, make sure to delete the previous version of the module first to avoid orphan jars.

{{< note title="Upgraded Wildfly Version" class="info" >}}
The pre-built Camunda 7.3 distribution ships with Wildfly 8.2.0.Final, whereas 7.2 comes with Wildfly 8.1.0.Final.
Camunda 7.3 is supported on Wildfly 8.1 and 8.2 such that an upgrade is not required when migrating from 7.2 to 7.3.

Should you want to upgrade Wildfly along with Camunda, perform the following steps either before or after upgrading Camunda:

* Copy all your Camunda-related modules from `$WILDFLY_HOME/modules` to the new Wildfly server's `module`-directory.
* Apply all modifications to Wildfly configuration files such as `standalone.xml` to the files located in the new Wildfly server's directory.
* Undeploy all process applications and copy them to the new Wildfly server's directory for redeployment.

See the [Wildfly 8.2.0.Final release notes](http://wildfly.org/news/2014/11/20/WildFly82-Final-Released/) for any relevant changes compared to 8.1.0.Final.
{{< /note >}}


# 1. Upgrade the Camunda BPM Modules

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`:

* `org/camunda/bpm/camunda-engine`
* `org/camunda/bpm/$APP_SERVER/camunda-$APP_SERVER-subsystem`
* `org/camunda/bpm/model/camunda-bpmn-model`
* `org/camunda/bpm/model/camunda-cmmn-model`
* `org/camunda/bpm/model/camunda-xml-model`


# 2. Upgrade Optional Camunda BPM Modules

In addition to the core modules, there may be optional artifacts in `$APP_SERVER_HOME/modules/` for LDAP integration, Camunda Connect, and Camunda Spin.
If you use any of these extensions, the following upgrade steps apply:

## LDAP Integration

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/camunda/bpm/identity/camunda-identity-ldap`

## Camunda Connect

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/camunda/connect/camunda-connect-core`
* `org/camunda/connect/camunda-connect-http-client`
* `org/camunda/connect/camunda-connect-soap-http-client`
* `org/camunda/bpm/camunda-engine-plugin-connect`

## Camunda Spin

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`
* `com/fasterxml/jackson/core/jackson-annotations`


# 3. Upgrade Camunda Web Applications

## Upgrade REST API

The following steps are required to upgrade the camunda REST API on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][engine-rest]. Or switch to the private repository for
   the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.

## Upgrade Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][webapp-jboss].
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.

{{< note title="LDAP Entity Caching" class="info" >}}
It is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[migration-guide]: {{< relref "update/minor/72-to-73/index.md" >}}
[jboss-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/
[wildfly-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/
[engine-rest]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
[webapp-jboss]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/
