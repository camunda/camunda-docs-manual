---

title: "Update a Tomcat Installation from 7.1 to 7.2"

menu:
  main:
    name: "Tomcat"
    identifier: "migration-guide-71-tomcat"
    parent: "migration-guide-71"

---

The following steps describe how to update the Camunda artifacts on a Tomcat server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.2 Tomcat distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tomcat/camunda-bpm-tomcat/).

The update procedure takes the following steps:

1. Update the Camunda BPM core libraries
2. Update and configure optional Camunda BPM libraries (*optional*)
3. Configure process engines
4. Update Camunda web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.


# 1. Update the Camunda BPM Core Libraries

Replace the following libraries in the folder `$TOMCAT_HOME/lib/` with their new versions from the folder `$TOMCAT_DISTRIBUTION/lib/`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `mybatis-$MYBATIS_VERSION.jar`

If present, also replace the following optional artifact:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

Add the following libraries from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-cmmn-model-$PLATFORM_VERSION.jar`

If present, remove the following artifacts:

* `camunda-engine-cdi-$PLATFORM_VERSION.jar`
* `camunda-engine-rest-$PLATFORM_VERSION-classes.jar`
* `camunda-engine-spring-$PLATFORM_VERSION.jar`

**Note:** The libraries `camunda-engine-spring-$PLATFORM_VERSION.jar` and `camunda-engine-spring-$PLATFORM_VERSION.jar` should be part of application deployments and therefore not in the global library folder. Make sure your process applications bundle these libraries when you remove them from the global folder.


# 2. Update and Configure Optional Camunda BPM Libraries

In addition, there are artifacts for Camunda Connect, Camunda Spin, the Freemarker template language and Groovy scripting that may optionally be added to the folder `$TOMCAT_HOME/lib/`. Since all these artifacts add new functionality, the following steps are not required for migration.

## Camunda Connect

If Camunda Connect is intended to be used, add the following artifacts:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... >
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>

</bpm-platform>
```

#### Camunda Spin

If Camunda Spin is intended to be used, add the following artifacts:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$PLATFORM_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... >
  ...
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>
  ...
</bpm-platform>
```

## Groovy Scripting

If Groovy is to be used as a scripting language, add the following artifacts:

* `groovy-all-$GROOVY_VERSION.jar`

## Freemarker Integration

If the Camunda integration for Freemarker is intended to be used, add the following artifacts:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`


# 3. Configure Process Engines

## Script Variable Storing

As of 7.2, the default behavior of script variables has changed. Script variables are set in e.g. a BPMN Script Task that uses a language such as JavaScript or Groovy. In previous versions, the process engine automatically stored all script variables as process variables. Starting with 7.2, this behavior has changed and the process engine does not automatically store script variables any longer. You can re-enable the legacy behavior by setting the boolean property `autoStoreScriptVariables` to `true` for any process engine in the `bpm-platform.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... >
  ...
  <process-engine name="default">
    ...
    <properties>
      ... existing properties ...
      <property name="autoStoreScriptVariables">true</property>
    </properties>
    ...
  </process-engine>
  ...
</bpm-platform>
```

As an alternative, process application developers can migrate script code by replacing all implicit declarations of process variables in their scripts with an explicit call to `execution.setVariable('varName', 'value')`.

## 4. Update Camunda Web Applications

#### Update Camunda REST API

The following steps are required to update the camunda REST API on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
3. Deploy the web application archive to your Tomcat instance.

#### Update Camunda Cockpit, Tasklist, and Admin

The following steps are required to update the camunda web applications Cockpit, Tasklist, and Admin on a Tomcat instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-tomcat/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your Tomcat instance.

{{< note title="LDAP Entity Caching" class="info" >}}
With 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[configuration-location]: {{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[migration-guide]: {{< relref "update/minor/71-to-72/_index.md" >}}
