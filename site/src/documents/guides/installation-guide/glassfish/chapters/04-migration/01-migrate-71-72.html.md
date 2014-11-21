---

title: 'Migrate from camunda BPM 7.1 to camunda BPM 7.2'
shortTitle: 'Migrate from 7.1 to 7.2'
category: 'Migration'

---

The following steps describe how to upgrade the camunda artifacts in a Glassfish 3.1 application server in a shared process engine setting. For the entire migration procedure, refer to the [migration guide][migration-guide]. If not already done, make sure to download the [camunda BPM 7.2 Glassfish distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/glassfish/camunda-bpm-glassfish/).

The upgrade procedure takes the following steps:

1. Uninstall the camunda libraries and archives
2. Add the new camunda libraries
3. Install optional camunda dependencies
4. Configure process engines
5. Install the camunda archive
6. Install the camunda BPM web applications

In each of the following steps, the identifiers `$*_VERSION` refer to the current version and the new versions of the artifacts.

<div class="alert alert-info">
  <p><strong>Changing Platform Configuration</strong></p>
  <p>Depending on your chosen feature set for camunda BPM, some of the (optional) migration steps may require to change the configuration of the BPM platform. The camunda enterprise archive (EAR) contains a default platform configuration. If you want to change this configuration, you can replace it as described in the <a href="/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file">deployment descriptor reference</a>.</p>
</div>

## 1. Uninstall the Camunda Applications and Archives

First, uninstall the camunda web applications, namely the camunda REST API (artifact name like `camunda-engine-rest`) and the camunda applications Cockpit, Tasklist and Admin (artifact name like `camunda-webapp`).

Uninstall the camunda EAR. Its name should be `camunda-glassfish-ear-$PLATFORM_VERSION.ear`. Then, uninstall the camunda job executor adapter, called `camunda-jobexecutor-rar-$PLATFORM_VERSION.rar`.

## 2. Replace the Camunda Libraries

After shutting down the server, replace the following libraries in `$GLASSFISH_HOME/glassfish/lib` with their equivalents from `$GLASSFISH_DISTRIBUTION/modules/lib`:

* `camunda-engine-$PLATFORM_VERSION.jar`
* `camunda-bpmn-model-$PLATFORM_VERSION.jar`
* `camunda-xml-model-$PLATFORM_VERSION.jar`
* `mybatis-$MYBATIS_VERSION.jar`

If present, also replace the following optional artifact:

* `camunda-identity-ldap-$PLATFORM_VERSION.jar`

Add the following library from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib`:

* `camunda-cmmn-model-$PLATFORM_VERSION.jar`

## 3. Install Optional Camunda Dependencies

There are artifacts for camunda Connect, camunda Spin, the Freemarker template language and Groovy scripting that may optionally be added to the shared library folder. Since all these artifacts add new functionality, the following steps are not required for migration.

**Note:** The default camunda configuration file contained by the camunda EAR automatically activates the newly introduced, optional camunda dependencies, camunda Spin and Connect. If you do not use a custom BPM platform configuration as described [here][configuration-location] and do not intend to do so, you *must* install the camunda Spin and Connect core libraries to the shared libraries folder.

<div class="alert alert-info">
  <p><strong>Not Using Connect/Spin</strong></p>
  <p>If you do <b>not</b> want to use camunda Connect or camunda Spin, you cannot use the default BPM platform configuration that is contained in the camunda EAR. In this case, make sure to change the configuration location as described <a href="/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file">here</a>. As a starting point, you can copy the default configuration from <code>$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear/camunda-glassfish-service-$PLATFORM_VERSION.jar/META-INF/bpm-platform.xml</code> and remove the <code>&lt;plugin/&gt;</code> entries for the classes <code>ConnectProcessEnginePlugin</code> and <code>SpinProcessEnginePlugin</code>.</p>
</div>

#### Camunda Connect

If camunda Connect is intended to be used, copy the following library from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib`:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

If you use a custom BPM platform configuration file, camunda Connect functionality has to be activated for a process engine by registering a process engine plugin (note that if you use the default configuration, this step is not necessary):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
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

If camunda Spin is intended to be used, copy the following library from `$GLASSFISH_DISTRIBUTION/modules/lib` to the folder `$GLASSFISH_HOME/glassfish/lib`:

* `camunda-spin-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

If you use a custom BPM platform configuration file, camunda Spin functionality has to be activated for a process engine by registering a process engine plugin (note that if you use the default configuration, this step is not necessary):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
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

#### Groovy Scripting

If Groovy is to be used as a scripting language, add the following artifacts to the folder `$GLASSFISH_HOME/glassfish/lib`:

* `groovy-all-$GROOVY_VERSION.jar`

#### Freemarker Integration

If the camunda integration for Freemarker is intended to be used, add the following artifacts to the folder `$GLASSFISH_HOME/glassfish/lib`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

## 4. Configure Process Engines

#### Script Variable Storing

As of 7.2, the default behavior of script variables has changed. Script variables are set in e.g. a BPMN Script Task that uses a language such as JavaScript or Groovy. In previous versions, the process engine automatically stored all script variables as process variables. Starting with 7.2, this behavior has changed and the process engine does not automatically store script variables any longer. You can re-enable the legacy behavior by setting the boolean property `autoStoreScriptVariables` to `true` for any process engine in the `bpm-platform.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
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

## 5. Install the Camunda Archive

First, install the camunda job executor resource adapter, namely the file `$GLASSFISH_DISTRIBUTION/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar`. Then, install the camunda EAR, i.e. the file `$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear`.

## 6. Install the Camunda Web Applications

#### Camunda REST API

The following steps are required to upgrade the camunda REST API on a Glassfish instance:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Deploy the web application archive to your Glassfish instance.

#### Camunda Cockpit, Tasklist, and Admin

The following steps are required to upgrade the camunda web applications Cockpit, Tasklist, and Admin on a Glassfish instance:

1. Download the camunda web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-glassfish/). Or switch to the private repository for the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-glassfish-$PLATFORM_VERSION.war`.
2. Deploy the web application archive to your Glassfish instance.

<div class="alert alert-info">
  <p><strong>LDAP Entity Caching</strong></p>
  <p>With 7.2, it is possible to enable entity caching for Hypertext Application Language (HAL) requests that the camunda web applications make. This can be especially useful when you use camunda in combination with LDAP. To activate caching, the camunda webapp artifact has to be modified and the pre-built application cannot be used as is. See the <a href="">user guide</a> for details.</p>
</div>

[configuration-location]: ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file
[migration-guide]: ref:/guides/migration-guide/#migrate-from-camunda-bpm-71-to-72