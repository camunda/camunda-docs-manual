---

title: "Update an Oracle WebLogic Installation from 7.1 to 7.2"

menu:
  main:
    name: "WebLogic"
    identifier: "migration-guide-71-weblogic"
    parent: "migration-guide-71"

---

The following steps describe how to upgrade the Camunda artifacts on an Oracle WebLogic application server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [Camunda BPM 7.2 Oracle WebLogic distribution](https://app.camunda.com/nexus/content/groups/internal/org/camunda/bpm/weblogic/camunda-bpm-weblogic/).

The upgrade procedure takes the following steps:

1. Uninstall the Camunda libraries and archives
2. Add the new Camunda libraries
3. Install optional Camunda dependencies
4. Configure process engines
5. Install the Camunda archive
6. Install the Camunda BPM web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

{{< note title="Changing Platform Configuration" class="info" >}}
Depending on your chosen feature set for Camunda BPM, some of the (optional) migration steps may require to change the configuration of the BPM platform. The Camunda enterprise archive (EAR) contains a default platform configuration. If you want to change this configuration, you can replace it as described in the 
[deployment descriptor reference]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}).
{{< /note >}}

# 1. Uninstall the Camunda Applications and Archives

First, uninstall the Camunda web applications, namely the Camunda REST API (artifact name like `camunda-engine-rest`) and the Camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the camunda EAR. Its name should be `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`. Then, uninstall the Camunda job executor adapter, called `camunda-oracle-weblogic-$PLATFORM_VERSION.rar`.

# 2. Replace the Camunda Libraries

After shutting down the server, replace the following libraries in `$WLS_DOMAIN_HOME/lib` with their equivalents from `$WLS_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `mybatis-$MYBATIS_VERSION.jar`

If present, also replace the following optional artifact:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

Add the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`:

* `camunda-cmmn-model-$PLATFORM_VERSION.jar`

# 3. Install Optional Camunda Dependencies

There are artifacts for Camunda Connect, Camunda Spin, the Freemarker template language and Groovy scripting that may optionally be added to the shared library folder. Since all these artifacts add new functionality, the following steps are not required for migration.

**Note:** The default Camunda configuration file contained by the Camunda EAR automatically activates the newly introduced, optional Camunda dependencies, Camunda Spin and Connect. If you do not use a custom BPM platform configuration as described [here][configuration-location] and do not intend to do so, you *must* install the Camunda Spin and Connect core libraries to the shared libraries folder.

{{< note title="Not Using Connect/Spin" class="info" >}}
If you do not want to use Camunda Connect or Camunda Spin, you cannot use the default BPM platform configuration that is contained in the Camunda EAR. In this case, make sure to change the configuration location as described [here][configuration-location]. As a starting point, you can copy the default configuration from `$WAS_DISTRIBUTION/modules/camunda-ibm-was-ear-$PLATFORM_VERSION.ear/camunda-ibm-was-service-$PLATFORM_VERSION.jar/META-INF/bpm-platform.xml` and remove the `<plugin>` entries for the classes `ConnectProcessEnginePlugin` and `SpinProcessEnginePlugin`.
{{< /note >}}

## Camunda Connect

If Camunda Connect is intended to be used, copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

If you use a custom BPM platform configuration file, Camunda Connect functionality has to be activated for a process engine by registering a process engine plugin (note that if you use the default configuration, this step is not necessary):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
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

## Camunda Spin

If Camunda Spin is intended to be used, copy the following library from `$WLS_DISTRIBUTION/modules/lib` to the folder `$WLS_DOMAIN_HOME/lib`:

* `camunda-spin-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

If you use a custom BPM platform configuration file, Camunda Spin functionality has to be activated for a process engine by registering a process engine plugin (note that if you use the default configuration, this step is not necessary):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
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

</bpm-platform>
```

## Groovy Scripting

If Groovy is to be used as a scripting language, add the following artifacts to the folder `$WLS_DOMAIN_HOME/lib`:

* `groovy-all-$GROOVY_VERSION.jar`

## Freemarker Integration

If the Camunda integration for Freemarker is intended to be used, add the following artifacts to the folder `$WLS_DOMAIN_HOME/lib`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`


# 4. Configure Process Engines

## Script Variable Storing

As of 7.2, the default behavior of script variables has changed. Script variables are set in e.g. a BPMN Script Task that uses a language such as JavaScript or Groovy. In previous versions, the process engine automatically stored all script variables as process variables. Starting with 7.2, this behavior has changed and the process engine does not automatically store script variables any longer. You can re-enable the legacy behavior by setting the boolean property `autoStoreScriptVariables` to `true` for any process engine in the `bpm-platform.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
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


# 5. Install the Camunda Archive

Install the Camunda EAR, i.e., the file `$WLS_DISTRIBUTION/modules/camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear`.

As of version 7.2, the Camunda job executor resource adapter (RAR) that you uninstalled in step 1 is part of the Camunda EAR and therefore does not need to be installed separately.


# 6. Install the Camunda Web Applications

## Camunda REST API

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` to your Oracle WebLogic instance.

## Camunda Cockpit, Tasklist, and Admin

Deploy the web application `$WLS_DISTRIBUTION/webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war` to your Oracle WebLogic instance.

{{< note title="LDAP Entity Caching" class="info" >}}
With 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the [REST Api Documentation]({{< relref "reference/rest/overview/hal.md" >}}) for details.
{{< /note >}}

[configuration-location]: {{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}
[migration-guide]: {{< relref "update/minor/71-to-72/index.md" >}}
