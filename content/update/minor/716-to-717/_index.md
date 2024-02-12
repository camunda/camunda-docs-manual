---

title: "Update from 7.16 to 7.17"
weight: 7
layout: "single"

menu:
  main:
    name: "7.16 to 7.17"
    identifier: "migration-guide-717"
    parent: "migration-guide-minor"
    pre: "Update from `7.16.x` to `7.17.0`."

---

This document guides you through the update from Camunda `7.16.x` to `7.17.0` and covers the following use cases:

1. For administrators and developers: [Database updates](#database-updates)
1. For administrators and developers: [Full distribution update](#full-distribution)
1. For administrators: [Standalone web application](#standalone-web-application)
1. For administrators and developers: [Task Worker Metrics](#task-worker-metrics)
1. For administrators and operation engineers: [New System Permissions](#system-permissions)
1. For developers: [Spin configuration options](#spin-configuration-options)
1. For developers: [Extended Camunda Run CORS configuration properties](#extended-camunda-run-cors-configuration-properties)
1. For administrators and developers: [Improved Camunda Run library support](#improved-camunda-run-library-support)
1. For administrators and developers: [Changed Camunda Run start script behavior](#changed-camunda-run-start-script-behavior)
1. For developers: [Disabled remote access to H2 console](#disabled-remote-access-to-h2-console)
1. For administrators and developers: [H2 version update](#h2-version-update)
1. For developers: [Official support for JUnit 5 community extension](#official-support-for-junit-5-community-extension)
1. For developers: [Changes to Camunda 7 Assert](#changes-to-camunda-platform-assert)

This guide covers mandatory migration steps as well as optional considerations for the initial configuration of new 
functionality included in Camunda 7.17.

# Database updates

Every Camunda installation requires a database schema update. Check our [database schema update guide]({{< ref "/installation/database-schema.md#update" >}}) 
for further instructions.

# Full distribution

This section is applicable if you installed the 
[Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) 
with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server.
2. Migrate custom process applications.

Before starting, ensure you have downloaded the Camunda 7.17 distribution for the application server 
you use. This contains the SQL scripts and libraries required for the update. This guide assumes you have unpacked the 
distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda libraries and applications

Choose the application server you are working with from the following list:

* [JBoss EAP 6 or Wildfly / JBoss EAP 7]({{< ref "/update/minor/716-to-717/jboss.md" >}})
* [Apache Tomcat]({{< ref "/update/minor/716-to-717/tomcat.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/716-to-717/wls.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/716-to-717/was.md" >}})

## Custom process applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you 
have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`

There are no new mandatory dependencies for process applications.

# Standalone web application

If you use a standalone web application, replace the current `.war` artifact by its new version. 
Take the following steps to complete the update:

1. Undeploy the current version of the standalone web application.
2. Update the database to the new schema as described in the [database update](#database-updates) section.
3. Configure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section.
4. Deploy the new and configured standalone web application to the server.

# Task worker metrics

Starting from version 7.17, the task worker metrics are displayed by default.
If this causes slow page loading, you can turn it off in the [admin webapp configuration]({{< ref "/webapps/admin/configuration.md#task-worker-metrics" >}}).

# System permissions

Camunda 7.17 introduces a new set of permissions which grant operation engineers access to system properties and data without the need for administrator privileges.

For more details, including a full list of features and their required permissions, visit our [authorization documentation page]({{< ref "/user-guide/process-engine/authorization-service.md#system-permissions" >}}).

# Spin configuration options

Version 7.17 features new configuration properties for the Spin `DomXmlDataFormat` module. The `DomXmlDataFormat`
configuration properties provide options to toggle **External XML Entity (XXE)** processing, as well as secure processing
for the Spin XML parser.

By default, we disabled XXE processing and enabled secure processing of XML documents to protect the Spin XML
parser against [XXE attacks](https://en.wikipedia.org/wiki/XML_external_entity_attack) and
[Billion laughs attacks](https://en.wikipedia.org/wiki/Billion_laughs_attack).

You can restore the old behavior by passing the appropriate [configuration properties to the Spin process engine plugin][spin-config].

[spin-config]: {{< ref "/user-guide/data-formats/configuring-spin-integration.md#configuration-properties-of-the-spin-plugin" >}}

# Extended Camunda Run CORS configuration properties

Version 7.17 of the Camunda Run distribution brings new [CORS configuration properties][cors-properties]. There are no
changes in the existing CORS behavior. The new CORS configuration properties rather allow you to set additional parameters on the CORS filter like 
credentials support.

[cors-properties]: {{< ref "/user-guide/camunda-bpm-run.md#cross-origin-resource-sharing" >}}

# Improved Camunda Run library support

## Improved LDAP support

Previous versions of the Camunda Run distribution already supported the Camunda LDAP identity service plugin. With this
version, we made it easier to configure and use Camunda Run with the LDAP plugin with the following additions:

The [Administrator Authorization plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}) 
is now available within Camunda Run by default. With the Administrator Authorization plugin, you can configure which 
LDAP user group gains administrative access to configure additional authorizations.

The Administrator Authorization plugin configuration properties are integrated with Camunda Run. You can find them
in the [LDAP Adminstrator Authorization section]({{< ref "/user-guide/camunda-bpm-run.md#ldap-administrator-authorization" >}})
of the Camunda Run documentation. You can also find a template LDAP configuration in the Camunda Run `production.yml`.

## Groovy scripting engine included

The Camunda Run distribution now ships with the Groovy scripting engine as well, in the form of the 
`groovy-all-2.4.13.jar` located in the `{RUN_HOME}/configuration/userlib/` directory. Users that utilize Groovy scripts
in their BPMN processes don't need to provide a Groovy binary when upgrading to a new Camunda Run version 
anymore.

Users that don't use Groovy can just remove the `groovy-all-2.4.13.jar` archive from the 
`{RUN_HOME}/configuration/userlib/` directory.

## Camunda Connect plugin included

With Camunda Run 7.17.0, the Camunda Connect process engine plugin is available in Camunda Run just like with any 
other Camunda distro. Users that use connectors in their BPMN processes don't need to provide any additional binary
when upgrading to a new Camunda Run version anymore.

# Changed Camunda Run start script behavior

Camunda Run starts with the [provided `start.sh` or `start.bat` scripts]({{< ref "/user-guide/camunda-bpm-run.md#starting-with-camunda-platform-run" >}}).
When you execute one of these scripts, Camunda Run starts and outputs logs to the command line.

With version 7.17, we made a small change to the behavior of these start scripts. If you don't provide any additional
arguments to the start script, it will start Camunda Run as a detached process. You can then use the new `shutdown.sh`
or `shutdown.bat` script to stop Camunda Run.

If you want to have the old start script behavior, pass the desired [start script arguments]({{< ref "/user-guide/camunda-bpm-run.md#start-script-arguments" >}})
directly to the script.

# Disabled remote access to H2 console

The Camunda 7.17.0 release deactivates remote access to the H2 console application in the Tomcat and Wildfly distributions. The H2 application accepts only localhost connections moving forward.

To restore remote access, add the following initialization parameter to the `org.h2.server.web.WebServlet` servlet defined in the `web.xml` file of the h2 web application:

```
<init-param>
  <param-name>webAllowOthers</param-name>
  <param-value>true</param-value>
</init-param>
```

You can find the `web.xml` in the following paths:

* Tomcat distribution: `server/apache-tomcat-${TOMCAT_VERSION}/webapps/h2/WEB-INF`
* Wildfly distribution: `server/wildfly-${WILDFLY_VERSION}/standalone/deployments/camunda-h2-webapp-${CAMUNDA_VERSION}.war/WEB-INF`
* Docker container Tomcat: `/camunda/webapps/h2/WEB-INF`
* Docker container Wildfly: `/camunda/standalone/deployments/camunda-h2-webapp-${CAMUNDA_VERSION}.war/WEB-INF`

Please note that we strongly discourage enabling remote access because it creates a security risk.

# H2 version update

Camunda 7.17.0 supports H2 version 2.0 and drops support for H2 version 1.4. Note that these two H2 releases are not compatible with each other, which means:

* The H2 library in version 2.0 cannot work with persisted databases created by H2 version 1.4.
* Camunda 7.17 cannot work with H2 1.4.
* Camunda 7 versions 7.16 and lower cannot work with H2 2.0.

When using Camunda with a file-persisted H2 database, this implies:

* The H2 database must be migrated from version 1.4 to 2.0.
* It is not possible to perform a [rolling update]({{< ref "/update/rolling-update.md" >}}) from Camunda 7.16 to 7.17.

To migrate from 7.16 to 7.17, and from H2 1.4 to 2.0, follow these steps:

1. Shut down Camunda 7.16.
1. Export the file-persisted H2 database by running the following SQL command: `SCRIPT TO '<path>' CHARSET 'UTF-8'` where you substitute `<path>` with a path to a file on your system (for example, by using the [H2 web console](https://www.h2database.com/html/tutorial.html#tutorial_starting_h2_console) of H2 version 1.4)
1. Delete the H2 database file.
1. Create a new H2 database file with H2 2.0 and re-import the data with the following SQL command: `RUNSCRIPT FROM '<path>' CHARSET 'UTF-8'` (for example, by using the [H2 web console](https://www.h2database.com/html/tutorial.html#tutorial_starting_h2_console) of H2 version 2.0).
1. Migrate the Camunda application and start Camunda 7.17.

In addition, with this release the process engine no longer supports the `jdbcStatementTimeout` configuration setting for H2 databases.

Also see the [migration instructions provided by the h2 project](https://h2database.com/html/migration-to-v2.html).

# Official support for JUnit 5 community extension

Camunda took over the development of a JUnit 5 extension which was maintained by the community in the [Camunda Community Hub](https://github.com/camunda-community-hub). The source code is is now located in the [Camunda 7 repository](https://github.com/camunda/camunda-bpm-platform/tree/master/test-utils/junit5-extension).
The extension allows users to access the process engine and its API in JUnit 5 tests. Documentation on how to use the extension was migrated to the [Testing documentation]({{< ref "/user-guide/testing/_index.md#junit-5" >}}) in the Camunda 7 docs.

## Versioning of the JUnit 5 extension

From now on the JUnit 5 extension will be released together with Camunda 7. This also means they will share the same version (e.g. 7.17.0, 7.17.1, etc.).

## JUnit 5 Maven coordinates

When migrating to the new version of the JUnit 5 extension, make sure to update the maven coordinates of the dependency.
The group id changed from `<groupId>org.camunda.bpm.extension</groupId>` to `<groupId>org.camunda.bpm</groupId>` and the versioning schema is now tied to Camunda 7. The first release of the new JUnit 5 extension will have the version `7.17.0`.

```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-bpm-junit5</artifactId>
      <version>7.17.0</version>
      <scope>test</scope>
    </dependency>
```

# Changes to Camunda 7 Assert

The source code of [Camunda 7 Assert]({{< ref "/user-guide/testing#camunda-assertions" >}}) has moved from its [previous location](https://github.com/camunda/camunda-bpm-assert) into the [Camunda 7 repository](https://github.com/camunda/camunda-bpm-platform/tree/master/test-utils/assert).

Moving the project has several implications:

* Camunda 7 Assert version is now tied to the Camunda 7 release.
* The Maven group id for Camunda 7 Assert [changed](#camunda-platform-assert-maven-coordinates).
* Camunda 7 Assert uses AssertJ under the hood. The version of AssertJ is tied to the version that the latest version of Spring Boot currently supported by Camunda 7 uses.
Find details on supported AssertJ versions in the version [compatibility table]({{< ref "/user-guide/testing/_index.md#assertions-version-compatibility" >}}) in the testing documentation.

## Versioning of Camunda 7 Assert

From now on Camunda 7 Assert will be released together with Camunda 7. This also means they will share the same version (e.g. 7.17.0, 7.17.1, etc.).

## Camunda 7 Assert Maven coordinates

When updating to the `7.17.0` (or higher) releases of Assert, make sure to update the Maven coordinates of the dependency.
The group id changed from `<groupId>org.camunda.bpm.assert</groupId>` to `<groupId>org.camunda.bpm</groupId>`. Here is the Maven dependency for Assert in version 7.17.0:

```xml
  <dependency>
    <groupId>org.camunda.bpm</groupId>
    <artifactId>camunda-bpm-assert</artifactId>
    <version>7.17.0</version>
    <scope>test</scope>
  </dependency>
```