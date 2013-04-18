camunda BPM Installation Guide (JBoss)
======================================

This document will guide you through the installation of camunda BPM and its components on a <a href="http://www.jboss.org/jbossas">JBoss Application Server 7</a>.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> Throughout this guide we will use a number of variables to denote common path names and constants.
  <code>$JBOSS_HOME</code> points to the jboss application server main directory.
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to or have installed, e.g. <code>7.0.0</code>.
</div>

<a id="platform"></a>Installing the pre-built distro
----------------------------------------------------
How to...

<a id="vanilla"></a>Installing the platform on a vanilla JBoss
--------------------------------------------------------------
How to...

<a id="rest"></a>Installing the REST API web application
--------------------------------------------------------
To install the REST API, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a JBoss instance:

1. Download the REST API web application archive from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS.
5. Access the REST API on the context path you configured. 
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform, 
   if you deployed the application in the context `/engine-rest`.

<a id="cycle"></a>Installing camunda cycle
------------------------------------------
**Note**: The distro already ships camunda cycle. It may be accessed on the context path `/cycle`. See [here](#configure_prepackaged_cycle), how to configure the distro.

### Create the database schema for camunda cycle ###

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you first have to create a database schema for camunda cycle.
The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:
    
    camunda-bpm-jboss-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for fox cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/).
  Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war`.
</div>

### <a id="configure_prepackaged_cycle"></a>Configuring the pre-packaged distribution ###
The distribution comes with a preconfigured H2 database used by cycle.

The H2 JDBC driver is located at `camunda-bpm-jboss-$PLATFORM_VERSION.zip/server/jboss-as-VERSION/modules/com/h2database/h2`.

There is a pre-configured datasource named `java:jboss/datasources/CycleDS`.

#### Exchange the database ####
To exchange the preconfigured H2 database with your own, e.g. Oracle, you have to do the following:

1. Deploy your database driver. (Check the JBoss Application Server Manual for Guidance).
2. Define a datasource named `java:jboss/datasources/CycleDS` for your database. (Remove the existing h2 datasource).

### Install camunda cycle on vanilla JBoss AS 7 ###
You can download the camunda cycle web application from [our sever](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-jboss/).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-jboss-$PLATFORM_VERSION.war`.

#### Create a datasource ####
First, you must define a datasource in JBoss Application Server. We assume here that you are familiar with the procedure.
If in doubt, check the appropriate sections in the manual of your application server.

Cycle expects a datasource named `java:jboss/datasources/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the cycle web application file.

#### Install the web application ####
1. Copy the cycle war file to `$JBOSS_HOME/standalone/deployments`.
   Optionally, you may change the context path to which cycle will be deployed (default is `/cycle`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2. Startup JBoss AS.
3. Access camunda cycle on the context you configured. If cycle is installed correctly, a screen should appear that allows you to create an initial user. 
   The initial user has administrator privileges and can be used to create more users once you have logged in.
   
### Configuring cycle ###
#### Configuring email ####
**Note**: This step is optional and can be skipped if you do not require cycle to send a welcome email to newly created users.

In order to use the cycle email service, you have to configure a mail session in the application server and reference it in the cycle configuration.

For this you have to configure a new mail session in JBoss Application Server. In the default configuration, JBoss AS 7 defines a mail session at `java:jboss/mail/Default`.

    <subsystem xmlns="urn:jboss:domain:mail:1.0">
        <mail-session jndi-name="java:jboss/mail/Default">
            <smtp-server outbound-socket-binding-ref="mail-smtp"/>
        </mail-session>
    </subsystem>

By default, cycle will try to lookup this mail session.
The name of the mail session to look up can be changed by editing the following file in the cycle web application:

    WEB-INF/classes/spring/configuration.xml
    
The file defines a Spring Bean named `cycleConfiguration`. On this spring bean, set the JNDI name of the Mail Session to a custom name:

    <bean id="cycleConfiguration" class="com.camunda.fox.cycle.configuration.CycleConfiguration">
	  [...]   
	  <!-- cycle email service configuration -->
	  <property name="emailFrom" value="cycle@localhost" />
	  <property name="mailSessionName" value="my/mail/Session" />
	  [...]        
    </bean>
    
#### Configuring Connector Password Encryption ####
Connector passwords are encrypted before they are stored in the cycle database using the PBEWithMD5AndDES algorithm implementation.
<div class="alert alert-info">
  <strong>Encryption key</strong>
  <br/>
  Cycle uses a default key to encrypt passwords (contained in the source code and hence not really secure).
  If you want to improve security you can exchange the encryption password by creating a file `$USER_HOME/cycle.password`
  containing a self chosen plain ASCII password.
</div>

<a id="cockpit"></a>Installing camunda cockpit
----------------------------------------------
To install camunda cockpit, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships camunda cockpit. It may be accessed on the context path `/cockpit`.

The following steps are required to deploy camunda cockpit on a JBoss instance:

1. Download the cockpit web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cockpit/camunda-cockpit/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-cockpit-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which cockpit will be deployed (default is `/cockpit`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$JBOSS_HOME/standalone/deployments`. 
3. Startup JBoss AS.
4. Access camunda cockpit on the context you configured.

<a id="tasklist"></a>Installing camunda tasklist
-----------------------------------------------
To install camunda tasklist, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships camunda tasklist. It may be accessed on the context path `/tasklist`.

The following steps are required to deploy camunda tasklist on a JBoss instance:

1. Download the tasklist web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tasklist/camunda-tasklist-jboss/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-tasklist-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the tasklist will be deployed (default is `/tasklist`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup the JBoss AS.
5. Access camunda tasklist on the context you configured.