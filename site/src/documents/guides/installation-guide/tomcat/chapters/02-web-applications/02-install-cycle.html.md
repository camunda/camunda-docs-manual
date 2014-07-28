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
camunda-bpm-tomcat-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for camunda Cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from our <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/">server</a>.
  Choose the correct version named <code>$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war</code>.
</div>


## Configuring the pre-packaged distribution

The distribution comes with a preconfigured H2 database used by Cycle.

The H2 JDBC driver is located at `camunda-bpm-tomcat-$PLATFORM_VERSION.zip/server/apache-tomcat-VERSION/lib/h2-VERSION.jar`.

### Exchange the database

To exchange the preconfigured H2 database with your own, e.g. Oracle, you have to do the following:

1.  Copy your JDBC database driver JAR file to `$CATALINA_HOME/lib`.
2.  Open `$CATALINA_HOME/webapps/cycle/META-INF/context.xml` and edit the properties of the `jdbc/CycleDS` datasource definition.


## Install camunda Cycle on vanilla Tomcat 7

You can download the camunda Cycle web application from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-tomcat/).
Or switch to the private repository for the enterprise version (User and password from license required).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-tomcat-$PLATFORM_VERSION.war`.

### Create a datasource

The Cycle datasource is configured in the Cycle web application in the file `META-INF/context.xml`. It should be named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the Cycle web application file.

In order to use the `org.apache.tomcat.jdbc.pool.DataSourceFactory`, you need to add the driver of the database you use to the `$CATALINA_HOME/lib` folder.
For example, if you plan to use the H2 database, you would have to add the h2-VERSION.jar.

<div class="alert alert-info">
  <strong>Tomcat 6.x</strong>
  <br/>
  On Tomcat 6, you will also have to add the tomcat-jdbc.jar, which ships with Tomcat 7 and the pre-packaged camunda BPM distribution, to
  <code>$CATALINA_HOME/lib</code>.
</div>

### Install the web application

1.  Copy the Cycle war file to `$CATALINA_HOME/webapps`.
    Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/cycle`.
2.  Startup Tomcat.
3.  Access camunda Cycle on the context you configured. If Cycle is installed correctly, a screen should appear that allows you to create an initial user.
    The initial user has administrator privileges and can be used to create more users once you have logged in.


## Configuring Cycle

### Configuring email

**Note**: This step is optional and can be skipped if you do not require Cycle to send a welcome email to newly created users.

<div class="alert alert-info">
  You need to install the java mail library when NOT using the prepackaged distribution.
  Download version 1.4.x manually from <a href=http://mvnrepository.com/artifact/javax.mail/mail>http://mvnrepository.com/artifact/javax.mail/mail</a> and copy it into your <code>$CATALINA_HOME/lib</code> folder.
</div>

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

### Configuring Connector Password Encryption

Connector passwords are encrypted before they are stored in the Cycle database using the PBEWithMD5AndDES algorithm implementation.

<div class="alert alert-info">
  <strong>Encryption key</strong>
  <br/>
  Cycle uses a default key to encrypt passwords (contained in the source code and hence not really secure).
  If you want to improve security you can exchange the encryption password by creating a file <code>$USER_HOME/cycle.password</code>
  containing a self chosen plain ASCII password.
</div>
