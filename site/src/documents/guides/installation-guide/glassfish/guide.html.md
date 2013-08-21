
camunda BPM Installation Guide (Glassfish)
======================================

This document will guide you through the installation of camunda BPM and its components on a <a href="http://glassfish.java.net/">Glassfish 3.1 application server</a>.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> Throughout this guide we will use a number of variables to denote common path names and constants.
  <code>$GLASSFISH_HOME</code> points to the glassfish application server main directory (typically <code>glassfish3/glassfish</code> when extracted from a glassfish distribution).
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to or have installed, e.g. <code>7.0.0</code>. <code>$GLASSFISH_DISTRIBUTION</code> represents the downloaded pre-packaged camunda BPM distribution for Glassfish, e.g. <code>camunda-bpm-glassfish-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-glassfish-$PLATFORM_VERSION.tar.gz</code>.
</div>


<a id="platform"></a>Installing the pre-built distro
----------------------------------------------------

1. Download the pre-packaged distribution from http://www.camunda.org/download/camunda-bpm/glassfish/VERSION/zip/.
   Replace VERSION with the current camunda BPM version.
2. Unpack the distro to a directory.
3. Adjust the datasource according to your needs (see below).
4. Startup the server by running `camunda-welcome.bat` or using the `$GLASSFISH_HOME/glassfish/config/startserv.{bat/sh}` script.

<a id="vanilla"></a>Installing the platform on a vanilla Glassfish
--------------------------------------------------------------

This section will describe how you can install the camunda BPM platform on a [vanilla Glassfish 3.1](http://glassfish.java.net/), if you are not able to use the pre-packaged Glassfish distribution. Regardless we recommand you to [download a Glassfish 3.1 distribution](http://camunda.org/download/) to use the required modules.

### <a id="database-camunda-bpm-platform"></a>Create the database schema for camunda BPM platform

If you do not want to use the H2 database, you first have to create a database schema for camunda BPM platform. The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts are reside in the `sql/create` folder:

`$GLASSFISH_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$GLASSFISH_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

<!--The next sections describe how to configure the Glassfish and to install the camunda BPM platfrom on Glassfish. If you prefer you can do the following [configurations via Glassfish Administration Console](#configuring-admin-console) and [skip](#configuring-admin-console) the next sections.-->

### <a id="configuring-jdbc"></a>Configuring JDBC Connection Pool and JDBC Resource

The JDBC Connection Pool and the JDBC Resource can be configured by editing the file `domain.xml` inside the folder `$GLASSFISH_HOME/glassfish/domains/<domain>/config/`.

The following example shows the configuration based on a H2 database.

    <domain>
      ...
      <resources>
        ...
        <jdbc-resource pool-name="ProcessEnginePool"
                       jndi-name="jdbc/ProcessEngine"
                       enabled="true">
        </jdbc-resource>

        <jdbc-connection-pool is-isolation-level-guaranteed="false"
                              datasource-classname="org.h2.jdbcx.JdbcDataSource"
                              res-type="javax.sql.DataSource"
                              non-transactional-connections="true"
                              name="ProcessEnginePool">
          <property name="Url"
                    value="jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE">
          </property>
          <property name="User" value="sa"></property>
          <property name="Password" value="sa"></property>
        </jdbc-connection-pool>
      </resources>

      <servers>
        <server>
          ...
          <resource-ref ref="jdbc/ProcessEngine"></resource-ref>
        </server>
      </servers>
    </domain>

In case of using another database (i.e. DB2, MySQL etc.) than H2 you have to adjust the `datasource-classname` and the `res-type` attributes with the corresponding database classes and set the database specific properties (like the url etc.) inside the JDBC Connection Pool. Furthermore you have to add the corresponding JDBC driver at `$GLASSFISH_HOME/glassfish/lib/`. For example you can add the H2 JDBC driver which is located at `$GLASSFISH_DISTRIBUTION/server/glassfish3/glassfish/lib/h2-VERSION.jar` to run with the H2 database.

### <a id="configuring-thread-pool"></a>Configuring Thread Pool for Job Executor

Therefore you have to edit the file `$GLASSFISH_HOME/glassfish/domains/<domain>/config/domain.xml` and add the following elements to `resources` section.

    <domain>
      ...
      <resources>
        ...
        <resource-adapter-config
          enabled="true"
          resource-adapter-name="camunda-jobexecutor-rar"
          thread-pool-ids="platform-jobexecutor-tp" >
        </resource-adapter-config>

        <connector-connection-pool
            enabled="true"
            name="platformJobExecutorPool"
            resource-adapter-name="camunda-jobexecutor-rar"
            connection-definition-name=
                "org.camunda.bpm.container.impl.threading.jca.outbound.JcaExecutorServiceConnectionFactory"
            transaction-support="NoTransaction" />

        <connector-resource
            enabled="true"
            pool-name="platformJobExecutorPool"
            jndi-name="eis/JcaExecutorServiceConnectionFactory" />
      </resources>

      <servers>
        <server>
          ...
          <resource-ref ref="eis/JcaExecutorServiceConnectionFactory"></resource-ref>
        </server>
      </servers>
    </domain>

To configure a thread pool for the job executor you have to add it in the corresponding `config` elements of `domain.xml`.

    <domain>
      ...
      <configs>
        ...
        <config name="server-config">
          ...
          <thread-pools>
            ...
            <thread-pool max-thread-pool-size="6"
                         name="platform-jobexecutor-tp"
                         min-thread-pool-size="3"
                         max-queue-size="10">
            </thread-pool>
          </thread-pools>
        </config>
      </configs>
    </domain>

### <a id="deploy"></a>Installing camunda BPM platform

The following steps are required to deploy the camunda BPM platform on a Glassfish instance:

1. Merge the shared libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` into `GLASSFISH_HOME/glassfish/lib` directory (i.e. copy the content into the Glassfish library directory).
2. Copy the jobexecutor resource adapter `$GLASSFISH_DISTRIBUTION/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`. The jobexecutor recource adapter has to be deployed first because the artifact `camunda-glassfish-ear-$PLATFORM_VERSION.ear` depends on it and cannot deployed succesfully without the resource adapter. If you try to deploy both compoments with the auto-deploy feature in one step you should be aware that the deployment order is not defined in this case. Due to this we propose to startup the Glassfish to deploy initially the jobexecutor resource adapter. After a successful startup shutdown the Glassfish.
3. Copy the artifact `$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`.
4. Startup the Glassfish.
5. After a successful startup the camunda BPM platform is installed.

As next step you can install for example the [REST API](#rest) on Glassfish.


<!--### <a id="configuring-admin-console"></a>Configuration via Administration Console

The Glassfish Administration Console is by default available under <a href="http://localhost:4848">http://localhost:4848</a>.-->


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
  scripts from <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/">our server</a>.
  Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war`.
</div>

### <a id="configure_prepackaged_cycle"></a>Configuring the pre-packaged distribution ###
The distribution comes with a preconfigured H2 database used by cycle.

The H2 JDBC driver is located at `camunda-bpm-glassfish-$PLATFORM_VERSION.zip/server/glassfish3/glassfish/lib/h2-VERSION.jar`.

When you open the Glassfish administration console (by default http://localhost:4848), you can find under
`Resources -> JDBC -> JDBC Connection Pools` the preconfigured H2CyclePool connection pool
and under `Resources -> JDBC -> JDBC Resources` the corresponding JDBC Resource named `jdbc/CycleDS`.

#### Exchange the datasource ####
To exchange the preconfigured H2 datasource with your own, e.g. Oracle, you have to do the following:

1. Copy your JDBC database driver JAR file to either `$GLASSFISH_HOME/glassfish/lib` or when you want to integrate the JDBC driver into a GlassFish Server domain,
   copy it into the `$GLASSFISH_HOME/glassfish/domains/DOMAIN_DIR/lib` directory, then restart the server.
2. Open the Glassfish administration console (default is http://localhost:4848).
3. Go to `Resources -> JDBC -> JDBC Connection Pools` and click on **New**. ([show image](assets/img/jdbc_connection_pools.png))
4. On the next page, under *General Settings*, enter a *Pool Name*, which identifies the *Connection Pool*, in our case it is *OracleCyclePool*.
   Also choose the appropriate *Resource Type*, e.g. `javax.sql.XADatasource` because we want an XA Datasource in this example.
   A *Database Driver Vendor* has to be specified for your driver, e.g. Oracle in our case. Click on **Next**. ([show image](assets/img/jdbc_new_pool_step_1.png))
5. In the next step when your database driver is unknown to Glassfish, you need to enter a *Datasource Classname* or a *Driver Classname*,
   otherwise it is prefilled. The *Pool Settings and Transaction* options can be left untouched. ([show image](assets/img/jdbc_new_pool_step_2_1.png))
6. On the bottom of the page, you will find an *Additional Properties* table.
   Here you can enter properties for your database driver like your user and password credentials, database url and so on. ([show image](assets/img/jdbc_new_pool_step_2_2.png))
7. Click **Save** to store the changes.
8. To test if your db connection configuration is correct, go to `Resources -> JDBC -> JDBC Connection Pools -> Your Connection Pool` and click the **Ping** button at the top.
   If no error is shown, proceed to step 9, otherwise consult your Glassfish / database manual.
9. Now we have to change the preconfigured connection pool to our newly created one for the JDBC Resource. To do so, go to `Resources -> JDBC -> JDBC Resources -> jdbc/CycleDS`
   and edit the *Pool Name* from `H2CyclePool` to our new connection pool, `OracleCyclePool`. ([show image](assets/img/jdbc_edit_resource.png))
10. **Save** the changes.
11. Congratulations! Now cycle should connect to your database.

### Install camunda cycle on vanilla Glassfish ###
You can download the camunda cycle web application from [our sever](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-glassfish/).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-glassfish-$PLATFORM_VERSION.war`.

#### Create a datasource ####
First, you must define a datasource in Glassfish Application Server. We assume here that you are familiar with the procedure.
If in doubt, check the appropriate sections in the manual of your application server.

Cycle expects a datasource named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the cycle web application file.

#### Modify default-web.xml ####
<div class="alert alert-info">
    In order for cycle to work, you **MUST** modify the file `$GLASSFISH_HOME/glassfish/domains/domain1/config/default-web.xml`,
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
   ([show image](assets/img/deploy_app.png))
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

<a id="camunda"></a>Installing camunda cockpit and tasklist
-----------------------------------------------------------
To install camunda cockpit and tasklist, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla Glassfish](#vanilla).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a Glassfish instance:

1. Download the camunda web application that contains both applications from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-glassfish/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-glassfish-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
3. Startup Glassfish Application Server.
4. Access cockpit and tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.


<a id="ldap"></a>Configuring LDAP for camunda cockpit and tasklist
------------------------------------------------------------------

In order to setup LDAP for the glassfish distribution, you have to perform the following steps:

<strong>1. Add Ldap Library</strong>

Make sure the `camunda-identity-ldap-$PLATFORM_VERSION.jar` is present in the
`GLASSFISH_HOME/glassfish/lib` folder.

<strong>2. Adjust Process Engine Configuration</strong>
Edit the file `bpm-platform.xml` located inside the folder `$GLASSFISH_HOME/glassfish/domains/domain1/applications/camunda-bpm-platform/camunda-glassfish-service-VERSION.jar/META-INF` and add the [Ldap Identity Provider Plugin](/guides/user-guide/#!/#bpmplatform/engine/identity/ldap) and the [Administrator Authorization Plugin](/guides/user-guide/#!/#bpmplatform/engine/authorization/plugin).

    <?xml version="1.0" encoding="UTF-8"?>
    <bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">
      ...
      <process-engine name="default"> ...
        <properties>...</properties>
        <plugins>
          <plugin>
            <class>org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin</class>
            <properties>

              <property name="serverUrl">ldap://localhost:4334/</property>
              <property name="managerDn">uid=jonny,ou=office-berlin,o=camunda,c=org</property>
              <property name="managerPassword">s3cr3t</property>

              <property name="baseDn">o=camunda,c=org</property>

              <property name="userSearchBase"></property>
              <property name="userSearchFilter">(objectclass=person)</property>

              <property name="userIdAttribute">uid</property>
              <property name="userFirstnameAttribute">cn</property>
              <property name="userLastnameAttribute">sn</property>
              <property name="userEmailAttribute">mail</property>
              <property name="userPasswordAttribute">userpassword</property>

              <property name="groupSearchBase"></property>
              <property name="groupSearchFilter">(objectclass=groupOfNames)</property>
              <property name="groupIdAttribute">ou</property>
              <property name="groupNameAttribute">cn</property>

              <property name="groupMemberAttribute">member</property>

            </properties>
          </plugin>
          <plugin>
            <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
            <properties>
              <property name="administratorUserName">admin</property>
            </properties>
          </plugin>
        </plugins>
      </process-engine>
    </bpm-platform>

The `administratorUserName` property should contain the user id of the Ldap user you want to grant administrator authorizations to. You can then use this user to log into the webapplication and grant authorizations to additional users.

See userguide for complete documentation on the [Ldap Identity Provider Plugin](/guides/user-guide/#!/#bpmplatform/engine/identity/ldap) and the [Administrator Authorization Plugin](/guides/user-guide/#!/#bpmplatform/engine/authorization/plugin).
