---

title: 'bpm-platform.xml'
weight: 10

menu:
  main:
    identifier: "descriptor-ref-bpm-platform"
    parent: "descriptor-ref"

---

The `bpm-platform.xml` file is part of the camunda BPM platform distribution and can be used for configuration of process engines and the job executor.

It is used to configure the camunda BPM platform in the following distributions:

*   [Apache Tomcat](ref:/guides/installation-guide/tomcat/#bpm-platform)
*   [Glassfish Application Server](ref:/guides/installation-guide/glassfish/#bpm-platform)
*   [IBM WebSphere Application Server](ref:/guides/installation-guide/was/#bpm-platform)
*   [Oracle WebLogic Application Server](ref:/guides/installation-guide/wls/#bpm-platform)

<div class="alert alert-warning">
  <p>
    <strong>JBoss Application Server 7 / Wildfly 8</strong>
  </p>
  <p>The <code>bpm-platform.xml</code> file is not used in the camunda BPM distribution for JBoss Application Server 7 / Wildfly 8. There, the configuration is added to the central application server configuration file (<code>standalone.xml</code> or <code>domain.xml</code>). The XML schema is the same (i.e. the same elements and properties can be used). See the <a href="ref:/guides/user-guide/#runtime-container-integration-the-camunda-jboss-subsystem">The camunda JBoss Subsystem</a> section of the <a href="ref:/guides/user-guide/">User Guide</a> for more details.
  </p>
</div>


## Xml Schema Namespace

The namespace for the `bpm-platform.xml` file is `http://www.camunda.org/schema/1.0/BpmPlatform`. The XSD file can be found in the `camunda-engine.jar` file.


## Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">

  <job-executor>
    <job-acquisition name="default" />
  </job-executor>

  <process-engine name="default">
    <job-acquisition>default</job-acquisition>
    <configuration>org.camunda.bpm.engine.impl.cfg.JtaProcessEngineConfiguration</configuration>
    <datasource>jdbc/ProcessEngine</datasource>

    <properties>
      <property name="history">full</property>
      <property name="databaseSchemaUpdate">true</property>
      <property name="transactionManagerJndiName">java:appserver/TransactionManager</property>
      <property name="authorizationEnabled">true</property>
    </properties>

  </process-engine>

</bpm-platform>
```

## Syntax Reference

<table class="table table-striped">
  <tr>
    <th>Tag name </th>
    <th>Parent tag name</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>&lt;bpm-platform&gt;</code></td>
    <td>None.</td>
    <td>true</td>
    <td>Root element of the bpm-platform.xml file.</td>
  </tr>
  <tr>
    <td><code>&lt;job-executor&gt;</code></td>
    <td><code>&lt;bpm-platform&gt;</code></td>
    <td>true</td>
    <td>See <a href="ref:#tags-job-executor-configuration">job-executor Reference</a></td>
  </tr>
  <tr>
    <td><code>&lt;process-engine&gt;</code></td>
    <td><code>&lt;bpm-platform&gt;</code></td>
    <td>false</td>
    <td>See <a href="ref:#tags-process-engine-configuration">process-engine Reference</a></td>
  </tr>
</table>


## Configure location of the bpm-platform.xml file

You can configure the location of the `bpm-platform.xml`, so the file can be stored externally to allow an easy upgrade path of camunda-bpm-platform.ear. This negates the work of unpacking / repackaging the ear when you need to change the configuration.  

This feature is available for:  

*   [Apache Tomcat](ref:/guides/installation-guide/tomcat/#bpm-platform)
*   [Glassfish Application Server](ref:/guides/installation-guide/glassfish/#bpm-platform)
*   [IBM WebSphere Application Server](ref:/guides/installation-guide/was/#bpm-platform)
*   [Oracle WebLogic Application Server](ref:/guides/installation-guide/wls/#bpm-platform)

It is not available for the JBoss AS 7 / Wildfly 8 subsystem implementation, because the subsystem implementation uses the JBoss specific `standalone.xml` to configure the platform.

To specify the location you have to provide an absolute path or an http/https url pointing to the `bpm-platform.xml` file, e.g '/home/camunda/.camunda/bpm-platform.xml' or 'http://camunda.org/bpm-platform.xml'.

During startup of the camunda-bpm-platform, it tries to discover the location of the `bpm-platform.xml` file from the following sources in the listed order:

1. JNDI entry is available at `java:/comp/env/bpm-platform-xml`
2. Environment variable `BPM_PLATFORM_XML` is set
3. System property `bpm.platform.xml` is set, e.g when starting the server JVM it is appended as `-Dbpm.platform.xml` on the command line
4. `META-INF/bpm-platform.xml` exists on the classpath
5. (For Tomcat only): checks if there is a `bpm-platform.xml` inside the folder specified by `${CATALINA_BASE} || ${CATALINA_HOME} + /conf/`

The discovery stops when one of the above mentioned sources is found or, in case none is found, it falls back to the `bpm-platform.xml` on the classpath, respectively `${CATALINA_BASE} || ${CATALINA_HOME} + /conf/` for Tomcat. We ship a default `bpm-platform.xml` file inside the camunda-bpm-platform.ear, except when you use the Tomcat or JBoss version of the platform.


## Using system properties

In order to externalize environment specific parts of the configuration, it is possible to reference system properties using Ant-style expressions (i.e. `${PROPERTY_KEY}`). Expression resolution is supported within the `property` elements only. System properties may be set via command line (`-D`option) or in an implementation specific manner (Apache Tomcat's `catalina.properties` for example).
Complex operations are not supported, but you may combine more than one expression in a single `property` element (e.g. `${ldap.host}:${ldap.port}`).

Example:
```xml
<!-- ... -->
<plugin>
  <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
  <properties>
    <property name="administratorUserName">${camunda.administratorUserName}</property>
  </properties>
</plugin>
<!-- ... -->
```
