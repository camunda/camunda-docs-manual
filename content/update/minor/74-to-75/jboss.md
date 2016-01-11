---

title: "Update a JBoss Installation from 7.4 to 7.5"

menu:
  main:
    name: "JBoss AS/Wildfly"
    identifier: "migration-guide-74-jboss"
    parent: "migration-guide-74"

---

The following steps describe how to upgrade the Camunda artifacts on a JBoss AS
7 and Wildfly 8 server in a shared process engine setting. For the entire
procedure, refer to the [upgrade guide][upgrade-guide]. If not
already done, make sure to download the [Camunda BPM 7.5 JBoss distribution][jboss-distro]
or [Camunda BPM 7.5 Wildfly distribution][wildfly-distro]. In the following instructions
`$APP_SERVER` should be replaced with either `jboss` or `wildfly`, depending on
the used application server.

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM Modules
2. Upgrade Optional Camunda BPM Modules
3. Maintain Process Engine Configuration
4. Maintain Process Applications
5. Upgrade Camunda Web Applications

Whenever the instructions are to *replace* a module, make sure to delete the previous version of the module first to avoid orphan jars.

# 1. Upgrade the Camunda BPM Modules

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`:

* `org/camunda/bpm/camunda-engine`
* `org/camunda/bpm/$APP_SERVER/camunda-$APP_SERVER-subsystem`
* `org/camunda/bpm/model/camunda-bpmn-model`
* `org/camunda/bpm/model/camunda-cmmn-model`
* `org/camunda/bpm/model/camunda-xml-model`

Add or replace (if already present) the following modules:

* `org/camunda/bpm/dmn/camunda-engine-dmn`
* `org/camunda/bpm/dmn/camunda-engine-feel-api`
* `org/camunda/bpm/dmn/camunda-engine-feel-juel`
* `org/camunda/bpm/model/camunda-dmn-model`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-typed-values`
* `org/camunda/commons/camunda-commons-utils`

# 2. Upgrade Optional Camunda BPM Modules

In addition to the core modules, there may be optional artifacts in `$APP_SERVER_HOME/modules/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting.
If you use any of these extensions, the following upgrade steps apply:

## LDAP Integration

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/identity/camunda-identity-ldap`

## Camunda Connect

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/camunda-engine-plugin-connect`

## Camunda Spin

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`

## Groovy Scripting

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/codehaus/groovy/groovy-all`

# 3. Maintain Process Engine Configuration

This section describes changes in the engine’s default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored for shared process engines by explicitly setting a configuration option.

<< Add necessary process engine configuration changes as subsections here >>

# 4. Maintain Process Applications

This section describes changes in behavior of API methods that your process applications may rely on.

<< Add necessary application changes as subsections here >>

# 5. Upgrade Camunda Web Applications

## Upgrade REST API

The following steps are required to upgrade the Camunda REST API on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][engine-rest]. Alternatively, switch to the private repository for
   the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.

## Upgrade Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][webapp-jboss].
   Alternatively, switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.

[upgrade-guide]: {{< relref "update/minor/74-to-75/index.md" >}}
[jboss-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/
[wildfly-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/
[engine-rest]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
[webapp-jboss]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/
