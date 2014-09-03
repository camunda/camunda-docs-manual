---

title: 'Install camunda Cycle'
category: 'Web Applications'

---


The distro already ships camunda Cycle. It may be accessed on the context path `/cycle`. [Here](ref:#web-applications-install-camunda-cycle-configuring-the-pre-packaged-distribution) you can see how to configure the distro.</br>

<div class="alert alert-warning">
  <p><strong>Note</strong></p>
  <p>We do not recommend to install camunda Cycle together with the other platform components (webapps, engine, REST API) on the same runtime environment. Such a combined installation is not supported.</p>
</div>


## Create the database schema for camunda Cycle

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you first have to create a database schema for camunda Cycle.
The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

```
camunda-bpm-jboss-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql
```

respectively for Wildfly

```
camunda-bpm-wildfly-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for camunda Cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from our <a href = "https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts">server</a>.
  Choose the correct version named <code>$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war</code>.
</div>


## Configuring the pre-packaged distribution

The distribution comes with a preconfigured H2 database used by Cycle.

The H2 JDBC driver is located at

```
camunda-bpm-jboss-$PLATFORM_VERSION.zip/server/jboss-as-VERSION/modules/com/h2database/h2
```

respectively for Wildfly

```
camunda-bpm-wildfly-$PLATFORM_VERSION.zip/server/wildfly-VERSION/modules/com/h2database/h2
```

There is a preconfigured datasource named `java:jboss/datasources/CycleDS`.

### Exchange the database

To exchange the preconfigured H2 database with your own, e.g. Oracle, you have to do the following:

1. Deploy your database driver. (Check the <a href = http://jbossas.jboss.org/docs/>JBoss Application Server Manual</a> for guidance).
2. Define a datasource named `java:jboss/datasources/CycleDS` for your database. (Remove the existing H2 datasource).


## Install camunda Cycle on vanilla JBoss AS / Wildfly

You can download the camunda Cycle web application from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-jboss/).
Or switch to the private repository for the enterprise version (User and password from license required).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-jboss-$PLATFORM_VERSION.war`.

### Create a datasource

First, you must define a datasource in JBoss AS / Wildfly. Here we assume that you are familiar with the procedure.
If in doubt, check the appropriate sections in the manual of your application server.

Cycle expects a datasource named `java:jboss/datasources/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the Cycle web application file.

### Install the web application

1.  Copy the Cycle war file to `$JBOSS_HOME/standalone/deployments`.
    Optionally, you may change the context path to which Cycle will be deployed (default is `/cycle`).
    Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2.  Startup JBoss AS / Wildfly.
3.  Access camunda Cycle on the context you configured. If Cycle is installed correctly, a screen should appear that allows you to create an initial user.
    The initial user has administrator privileges and can be used to create more users once you have logged in.


## Configuring Cycle

### Configuring email

**Note**: This step is optional and can be skipped if you do not require Cycle to send a welcome email to newly created users.

In order to use the Cycle email service, you have to configure a mail session in the application server and reference it in the Cycle configuration.

For this you have to configure a new mail session in JBoss AS / Wildfly. In the default configuration, JBoss AS / Wildfly defines a mail session at `java:jboss/mail/Default`.

```xml
<subsystem xmlns="urn:jboss:domain:mail:1.0">
  <mail-session jndi-name="java:jboss/mail/Default">
    <smtp-server outbound-socket-binding-ref="mail-smtp"/>
  </mail-session>
</subsystem>
```

By default, Cycle will try to lookup this mail session.
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

### Configuring Connector Password Encryption

Connector passwords are encrypted before they are stored in the Cycle database using the PBEWithMD5AndDES algorithm implementation.
<div class="alert alert-info">
  <strong>Encryption key</strong>
  <br/>
  Cycle uses a default key to encrypt passwords (contained in the source code and hence not really secure).
  If you want to improve security you can exchange the encryption password by creating a file <code>$USER_HOME/cycle.password</code> containing a self chosen plain ASCII password.
</div>
