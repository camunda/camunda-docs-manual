---

title: "Update a JBoss/Wildfly Installation from 7.8 to 7.9"

menu:
  main:
    name: "JBoss AS/Wildfly"
    identifier: "migration-guide-78-jboss"
    parent: "migration-guide-78"

---

The following steps describe how to update the Camunda artifacts on a JBoss AS
7, Wildfly 8 and Wildfly 10 server in a shared process engine scenario. For the entire
procedure, refer to the [update guide][update-guide]. If not
already done, make sure to download the [Camunda BPM 7.9 JBoss distribution](http://camunda.org/release/camunda-bpm/jboss/7.9/), [Camunda BPM 7.9 Wildfly 8](http://camunda.org/release/camunda-bpm/wildfly8/7.9/)
or [Camunda BPM 7.9 Wildfly 10 distribution](http://camunda.org/release/camunda-bpm/wildfly10/7.9/). In the following instructions
`$APP_SERVER` should be replaced with either `jboss` or `wildfly`, depending on
the used application server.

The update procedure takes the following steps:

1. Update the Camunda BPM Modules
2. Update Optional Camunda BPM Modules
3. Update Camunda Web Applications

Whenever the instructions are to *replace* a module, make sure to delete the previous version of the module first to avoid orphan jars.

# 1. Update the Camunda BPM Modules

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`:

* `org/camunda/bpm/camunda-engine`
* `org/camunda/bpm/$APP_SERVER/camunda-$APP_SERVER-subsystem`
* `org/camunda/bpm/model/camunda-bpmn-model`
* `org/camunda/bpm/model/camunda-cmmn-model`
* `org/camunda/bpm/model/camunda-dmn-model`
* `org/camunda/bpm/model/camunda-xml-model`
* `org/camunda/bpm/dmn/camunda-engine-dmn`
* `org/camunda/bpm/dmn/camunda-engine-feel-api`
* `org/camunda/bpm/dmn/camunda-engine-feel-juel`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-typed-values`
* `org/camunda/commons/camunda-commons-utils`

# 2. Update Optional Camunda BPM Modules

In addition to the core modules, there may be optional artifacts in `$APP_SERVER_HOME/modules/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting.
If you use any of these extensions, the following update steps apply:

## LDAP Integration

Replace the following module from the folder `$APP_SERVER_HOME/modules/` with its new version from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/identity/camunda-identity-ldap`

## Camunda Connect

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/connect/camunda-connect-core`
* `org/camunda/connect/camunda-connect-http`
* `org/camunda/connect/camunda-connect-soap-http`
* `org/camunda/bpm/camunda-engine-plugin-connect`

## Camunda Spin

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`

Additionally, also replace the following dependent modules:

* `com/fasterxml/jackson/core/jackson-annotations`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`

{{< note title="Stick to older Jackson version" class="info" >}}
Starting from v. 7.9, Camunda BPM is delivered with Spin 1.5.1 version, which in its turn relies on Jackson of v. 2.9.5 (compared to v.2.6.3 used before).

In case you need to stick to older Jackson version (2.6.3):

1. do not replace Jackson modules listed above.
2. Fix the Jackson version in module `org/camunda/spin/camunda-spin-dataformat-json-jackson/main/module.xml` to be 2.6.3.

Scenarios, where you could consider using the earlier Jackson version are listed [here]({{< relref "update/minor/78-to-79/_index.md#jackson-version-update" >}}).
{{< /note >}}

## Groovy Scripting

Replace the following module from the folder `$APP_SERVER_HOME/modules/` with its new version from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/codehaus/groovy/groovy-all`


# 3. Update Camunda Web Applications

## Choose the right REST API Artifact
From now on there exist separate REST API artifacts (**W**eb **A**pplication **Ar**chives) for **Wildfly** as well as **JBoss AS 7**.
Therefore the artifact with the right classifier needs to be chosen:

- Wildfly requires the classifier: **wildfly**
- JBoss AS 7 requires the classifier: **jbossas7**

Please bear this in mind ...

- on downloading the REST API from our [Maven Nexus Server][engine-rest]
- on using the REST API dependency within your custom `pom.xml`

The Maven coordinates need to be changed accordingly:

```xml
...
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-rest</artifactId>
  <version>$PLATFORM_VERSION</version>
  <classifier>$CLASSIFIER</classifier> <!-- HEADS-UP! THIS LINE IS NEW -->
  <type>war</type>
</dependency>
...
```

## Update REST API

The following steps are required to update the Camunda REST API on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][engine-rest]. Alternatively, switch to the private repository for
   the enterprise version (credentials from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-$CLASSIFIER.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.

## Update Cockpit, Tasklist, and Admin

The following steps are required to update the Camunda web applications Cockpit, Tasklist, and Admin on a JBoss/Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][webapp-jboss].
   Alternatively, switch to the private repository for the enterprise version (credentials from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss.war`.
3. Deploy the web application archive to your JBoss/Wildfly instance.


[update-guide]: {{< relref "update/minor/78-to-79/_index.md" >}}
[engine-rest]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
[webapp-jboss]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/
[jackson-update]: {{< relref "update/minor/78-to-79/_index.md#jackson-version-update" >}}
