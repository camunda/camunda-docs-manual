---

title: "Install Camunda Cycle"
weight: 40

menu:
  main:
    name: "Cycle"
    identifier: "installation-guide-cycle"
    parent: "installation-guide"
    pre: "Install the Cycle Webapplication supporting the BPMN 2.0 Roundtrip."

---


This document describes the installation procedure for Camunda Cycle. You can download a prepackaged distribution which includes Camunda Cycle and a Tomcat server. For information on how to configure the prepackaged distribution, refer to the section on [Configure the Pre-packaged Distribution]({{< relref "#configure-the-pre-packaged-distribution" >}}). You can also install Camunda Cycle on a vanilla Tomcat server. This procedure is explained in the section [Install Camunda Cycle on a Vanilla Tomcat 7]({{< relref "#install-camunda-cycle-on-a-vanilla-tomcat-7" >}}).

This installation guide also details how to configure the Cycle installation, including the setup of the email service, password encryption and the installation of custom connectors.

{{< note title="Installation Environment" class="warning" >}}
  We do not recommend to install Camunda Cycle together with the other platform components (webapps, engine, REST API) on the same runtime environment. A combined installation of designtime and runtime components on a single environment is not supported.
{{< /note >}}


# Download

## Prepackaged Distribution

Download a [prepackaged distribution of Camunda Cycle](http://camunda.org/download/cycle/). This distribution includes Camunda Cycle deployed in an Apache Tomcat as well as the SQL scripts.
Enterprise subscription customers use the [enterprise download page](/enterprise/download/#camunda-cycle).

## Cycle Only

Download a Camunda Cycle from our [NEXUS repository](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-tomcat/). Choose the correct version named `$CYCLE_VERSION/camunda-cycle-tomcat-$CYCLE_VERSION.war`.


## Database Scripts

Download scripts to create the database schema from our [NEXUS repository](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/). Choose the correct version named `$CYCLE_VERSION/camunda-cycle-sql-scripts-$CYCLE_VERSION.jar`.


# Create the Database Schema

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you have to first create a database schema for Camunda Cycle.
The Camunda Cycle distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

```
camunda-cycle-distro-$CYCLE_VERSION.zip/sql/create/*_cycle.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool (e.g., SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for Camunda Cycle.

{{< note title="" class="info" >}}
  If you have not got the distro at hand, you can also download a file that packages these scripts from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/).
  Choose the correct version named `$CYCLE_VERSION/camunda-cycle-sql-scripts-$CYCLE_VERSION.jar`.
{{< /note >}}


# Install Camunda Cycle on a Vanilla Tomcat 7

You can download the Camunda Cycle web application from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-tomcat/).
Choose the correct version named `$CYCLE_VERSION/camunda-cycle-tomcat-$CYCLE_VERSION.war`.


## Create a Datasource

The Cycle datasource is configured in the Cycle web application in the file `META-INF/context.xml`. It should be named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the Cycle web application file.

In order to use the `org.apache.tomcat.jdbc.pool.DataSourceFactory`, you need to add the driver of the database you use to the `$TOMCAT_HOME/lib` folder.
For example, if you plan to use the H2 database, you would have to add the h2-VERSION.jar.

{{< note title="Tomcat 6.x" class="info" >}}
  On Tomcat 6, you will also have to add the tomcat-jdbc.jar, which comes with Tomcat 7 and the pre-packaged Camunda Cycle distribution, to `$TOMCAT_HOME/lib`.
{{< /note >}}


## Install the Web Application

1. Copy the Cycle war file to `$TOMCAT_HOME/webapps`.
    Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/cycle`.
2. Start Tomcat.
3. Access Camunda Cycle on the context you configured. If Cycle is installed correctly, a screen should appear that allows you to create an initial user.
    The initial user has administrator privileges and can be used to create more users once you have logged in.


# Configure the Pre-packaged Distribution

The distribution comes with a preconfigured H2 database used by Cycle.

The H2 JDBC driver is located at `camunda-cycle-distro-$CYCLE_VERSION.zip/server/apache-tomcat-VERSION/lib/h2-VERSION.jar`.

## Exchange the Database

To exchange the preconfigured H2 database with your own, e.g., Oracle, you have to do the following:

1. Copy your JDBC database driver JAR file to `$TOMCAT_HOME/lib`.
2. Open `$TOMCAT_HOME/webapps/cycle/META-INF/context.xml` and edit the properties of the `jdbc/CycleDS` datasource definition.


# Configuration

## Configure Email

**Note**: This step is optional and can be skipped if you do not require Cycle to send a welcome email to newly created users.

{{< note title="Java Mail Library" class="info" >}}
  You need to install the java mail library when NOT using the prepackaged distribution. Download version 1.4.x manually from [http://mvnrepository.com/artifact/javax.mail/mail](http://mvnrepository.com/artifact/javax.mail/mail) and copy it into your `$TOMCAT_HOME/lib` folder.
{{< /note >}}

In order to use the Cycle email service, you have to configure a mail session in the `META-INF/context.xml` file in the Cycle web application.

By default, Cycle looks up a mail session using the JNDI Name `mail/Session`.
The name of the mail session to look up can be changed by editing the following file in the Cycle web application:

```
WEB-INF/classes/spring/configuration.xml
```

The file defines a Spring Bean named `cycleConfiguration`. On this spring bean, set the JNDI name of the Mail Session to a custom name:

```xml
<bean id="cycleConfiguration" class="org.camunda.bpm.cycle.configuration.CycleConfiguration">
  <!-- ... -->
  <!-- Cycle email service configuration -->
  <property name="emailFrom" value="cycle@localhost" />
  <property name="mailSessionName" value="my/mail/Session" />
  <!-- ... -->
</bean>
```

## Configure Connector Password Encryption

Connector passwords are encrypted before they are stored in the Cycle database using the PBEWithMD5AndDES algorithm implementation.

{{< note title="Encryption Key" class="info" >}}
  Cycle uses a default key to encrypt passwords (contained in the source code and hence not really secure). If you want to improve security you can exchange the encryption password by creating a file `$USER_HOME/cycle.password` containing a self chosen plain ASCII password.
{{< /note >}}


## Add Connectors

You can add own Connectors in form of JAR files to your Camunda Cycle installation. Just follow these steps to add a new Connector.

1. Copy the JAR file which contains the Connector implementation to `$TOMCAT_HOME/webapps/cycle/WEB-INF/lib`.
2. Edit the `$TOMCAT_HOME/webapps/cycle/WEB-INF/classes/spring/connector-configurations.xml` file and include a variation of the following snippet:

```xml
<div class="app-source" data-source-code="connector-configurations.xml" annotate="code-annotations" ></div>
```

After adding the JAR file and updating the Connector configuration file, you can start the server. The added Connector appears in the Add Connector dialog and can be used to create roundtrips.

```xml
<div class="bootstrap-code">
  <script type="text/xml" id="connector-configurations.xml">
<bean name="svnConnectorDefinition" class="org.camunda.bpm.cycle.entity.ConnectorConfiguration">
  <property name="name" value="Subversion Connector"/>
  <property name="connectorClass" value="org.camunda.bpm.cycle.connector.svn.SvnConnector"/>
  <property name="properties">
    <map>
      <entry key="repositoryPath" value=""></entry>
    </map>
  </property>
</bean>
  </script>
  <script type="text/ng-template" id="code-annotations">
    {
    "connector-configurations.xml":
      { "svnConnectorDefinition": "The name of the bean handling the Connector. Choose one which represents the functionality of the Connector and is not taken yet." ,
      "Subversion Connector": "The name of the Connector as it appears in the Add Connector dialog.",
      "org.camunda.bpm.cycle.connector.svn.SvnConnector": "The qualified name of the class which contains the implementation of the Connector.",
      "entry" : "Properties which are needed by the Connector (e.g. service URL, proxy settings, etc.)"
      }
    }
  </script>
</div>
```

# Migration

## Migrate from 3.0 to 3.1

We updated the database schema of Camunda Cycle in the version 3.1.0. So please update your database schema using the migration scripts provided in the `sql/upgrade` folder of the Camunda Cycle distribution:

```
camunda-cycle-distro-$CYCLE_VERSION.zip/sql/upgrade/*_cycle_3.0_to_3.1.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool (e.g. SqlDeveloper for Oracle).

{{< note title="" class="info" >}}
  If you have not got the distro at hand, you can also download a file that packages these scripts from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/3.1.0/camunda-cycle-sql-scripts-3.1.0.jar).
{{< /note >}}
