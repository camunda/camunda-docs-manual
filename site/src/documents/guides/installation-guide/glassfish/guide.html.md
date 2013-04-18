
camunda BPM Installation Guide (Glassfish)
======================================

This document will guide you through the installation of camunda BPM and its components on a <a href="http://glassfish.java.net/">Glassfish 3.1 application server</a>.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> Throughout this guide we will use a number of variables to denote common path names and constants.
  <code>$GLASSFISH_HOME</code> points to the glassfish application server main directory (typically <code>glassfish3/glassfish</code> when extracted from a glassfish distribution).
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to or have installed, e.g. <code>7.0.0</code>.
</div>


<a id="platform"></a>Installing the pre-built distro
----------------------------------------------------

How to...


<a id="vanilla"></a>Installing the platform on a vanilla Glassfish
--------------------------------------------------------------

How to...


<a id="rest"></a>Installing the REST API web application
--------------------------------------------------------

To install the REST API, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla Glassfish](#vanilla).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a Glassfish instance:

1. Download the REST API web application archive from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`). 
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
4. Startup the Glassfish Application Server.
5. Access the REST API on the context path you configured. 
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform, 
   if you deployed the application in the context `/engine-rest`. For more information on how to use the REST API


<a id="cycle"></a>Installing camunda cycle
------------------------------------------
**Note**: The distro already ships camunda cycle. It may be accessed on the context path `/cycle`. See [here](#configure_prepackaged_cycle), how to configure the distro.

### Create the database schema for camunda cycle ###

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you first have to create a database schema for camunda cycle.
The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:
    
    camunda-bpm-glassfish-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for camunda cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/).
  Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war`.
</div>

### <a id="configure_prepackaged_cycle"></a>Configuring the pre-packaged distribution ###
The distribution comes with a preconfigured H2 database used by cycle.

The H2 JDBC driver is located at `camunda-bpm-glassfish-$PLATFORM_VERSION.zip/server/glassfish3/glassfish/lib/h2-VERSION.jar`.

When you open the Glassfish administration console (by default http://localhost:4848), you can find under
`Resources -> JDBC -> JDBC Connection Pools` the preconfigured H2CyclePool connection pool
and under `Resources -> JDBC -> JDBC Resources` the corresponding JDBC Resource named `jdbc/CycleDS`.

#### Exchange the database ####
To exchange the preconfigured H2 database with your own, e.g. Oracle, you have to do the following:

1. Copy your JDBC database driver JAR file to either `$GLASSFISH_HOME/glassfish/lib` or when you want to integrate the JDBC driver into a GlassFish Server domain,
   copy it into the `$GLASSFISH_HOME/glassfish/domains/DOMAIN_DIR/lib` directory, then restart the server.
2. Open the Glassfish administration console (default is http://localhost:4848).
3. Go to `Resources -> JDBC -> JDBC Connection Pools` and click on **New**.
4. On the next page, under *General Settings*, enter a *Pool Name*, which identifies the *Connection Pool*, in our case it is *OracleCyclePool*.
   Also choose the appropriate *Resource Type*, e.g. `javax.sql.XADatasource` because we want an XA Datasource in this example.
   A *Database Driver Vendor* has to be specified for your driver, e.g. Oracle in our case. Click on **Next**.
5. In the next step when your database driver is unknown to Glassfish, you need to enter a *Datasource Classname* or a *Driver Classname*,
   otherwise it is prefilled. The *Pool Settings and Transaction* options can be left untouched.
6. On the bottom of the page, you will find an *Additional Properties* table.
   Here you can enter properties for your database driver like your user and password credentials, database url and so on.
7. Click **Save** to store the changes.
8. To test if your db connection configuration is correct, go to `Resources -> JDBC -> JDBC Connection Pools -> Your Connection Pool` and click the **Ping** button at the top.
   If no error is shown, proceed to step 9, otherwise consult your Glassfish / database manual.
9. Now we have to change the preconfigured connection pool to our newly created one for the JDBC Resource. To do so, go to `Resources -> JDBC -> JDBC Resources -> jdbc/CycleDS`
   and edit the *Pool Name* from `H2CyclePool` to our new connection pool, `OracleCyclePool`.
10. **Save** the changes.
11. Congratulations! Now cycle should connect to your database.
   
### Install camunda cycle on vanilla Glassfish ###
You can download the camunda cycle web application from [our sever](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-glssfish/).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-glassfish-$PLATFORM_VERSION.war`.

#### Create a datasource ####
First, you must define a datasource in Glassfish Application Server. We assume here that you are familiar with the procedure.
If in doubt, check the appropriate sections in the manual of your application server.

Cycle expects a datasource named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the cycle web application file.

#### Modify default-web.xml ####
<div class="alert alert-info">
    In order for cycle to work, you **MUST** modify the file `$GLASSFISH_HOME/glassfish/domain/domain1/config/default-web.xml`,
    otherwise you will get a BASIC AUTH window popping up, when you try to log into cycle.
</div>

Open the `default-web.xml` and comment out / remove the following lines at the end of the file.
    
    <login-config>
      <auth-method>BASIC</auth-method>
    </login-config>
    

#### Install the web application ####
1. Optionally, you may change the context path to which cycle will be deployed (default is `/cycle`). 
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Startup Glassfish.
3. Open the Glassfish Administration Console.
4. Navigate to *Applications* and click **Deploy**.
5. On the next page, under *Location*, select the appropriate option and browse your files and select the `camunda-cycle-glassfish-$PLATFORM_VERSION.war` file.
6. Leave the other settings unchanged and click **Ok**. Optionally, you can also change the context root for cycle here. We propose to use `/cycle`.
7. Access camunda cycle on the context you configured. If cycle is installed correctly, a screen should appear that allows you to create an initial user. 
   The initial user has administrator privileges and can be used to create more users once you have logged in.
   
### Configuring cycle ###
#### Configuring email ####
**Note**: This step is optional and can be skipped if you do not require cycle to send a welcome email to newly created users.

In order to use the cycle email service, you have to configure a mail session in the application server and reference it in the cycle configuration.

For this you have to configure a new mail session in Glassfish Application Server.

1. Start the Glassfish Administration Console.
2. Go to `Resources -> JavaMail Sessions` and click **New**.
3. Now enter a JNDI name for the Mail Session, e.g. `mail/Session` and fill the mandatory fields for your mail server configuration. Later, the JNDI name will be referenced in cycle's configuration.
   For a complete overview of the mail session properties, like encryption protocols etc, consult the Glassfish manual.
   Under *Additional Properties*, add these properties if your mail server requires password authentication
          mail.smtp.port:port-number
          mail.smtp.auth true
          mail.smtp.password: myMailServerPassword

The name of the mail session looked up by cycle can be changed by editing the following file in the cycle web application:

    WEB-INF/classes/spring/configuration.xml
    
The file defines a Spring Bean named `cycleConfiguration`. On this spring bean, set the JNDI name of the Mail Session to a custom name:

    <bean id="cycleConfiguration" class="org.camunda.bpm.cycle.configuration.CycleConfiguration">
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
To install camunda cockpit, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla Glassfish](#vanilla).

**Note**: The distro already ships camunda cockpit. It may be accessed on the context path `/cockpit`.

The following steps are required to deploy camunda cockpit on a Glassfish instance:

1. Download the cockpit web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cockpit/camunda-cockpit/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-cockpit-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which cockpit will be deployed (default is `/cockpit`). 
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`. 
3. Startup Glassfish Application Server.
4. Access camunda cockpit on the context you configured.

<a id="tasklist"></a>Installing camunda tasklist
-----------------------------------------------
To install camunda tasklist, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla Glassfish](#vanilla).

**Note**: The distro already ships camunda tasklist. It may be accessed on the context path `/tasklist`.

The following steps are required to deploy camunda tasklist on a Glassfish instance:

1. Download the tasklist web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tasklist/camunda-tasklist-glassfish/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-tasklist-glassfish-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the tasklist will be deployed (default is `/tasklist`). 
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
4. Startup the Glassfish Application Server.
5. Access camunda tasklist on the context you configured.
