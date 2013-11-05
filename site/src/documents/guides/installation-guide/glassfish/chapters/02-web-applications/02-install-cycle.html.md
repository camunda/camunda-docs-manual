---

title: 'Install camunda Cycle'
category: 'Web Applications'

---

**Note**: The distro already ships camunda Cycle. It may be accessed on the context path `/cycle`. See [here](ref:#web-applications-install-camunda-cycle-configuring-the-pre-packaged-distribution), how to configure the distro.</br>We do not recommend to install camunda Cycle together with the other platform components (webapps, engine, REST Api) on the same runtime environment. Such a combined installation is not supported.


## Create the database schema for camunda Cycle

Unless you are using the pre-packaged distribution and do not want to exchange the packaged H2 database, you first have to create a database schema for camunda Cycle.
The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

```
camunda-bpm-glassfish-$PLATFORM_VERSION.zip/sql/create/*_cycle_$PLATFORM_VERSION.sql
```

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

We recommend to create a separate database or database schema for camunda Cycle.

<div class="alert alert-info">
  If you have not got the distro at hand, you can also download a file that packages these
  scripts from <a href="https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-sql-scripts/">our server</a>.
  Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-sql-scripts-$PLATFORM_VERSION.war`.
</div>


## Configuring the pre-packaged distribution

The distribution comes with a preconfigured H2 database used by Cycle.

The H2 JDBC driver is located at `camunda-bpm-glassfish-$PLATFORM_VERSION.zip/server/glassfish3/glassfish/lib/h2-VERSION.jar`.

When you open the Glassfish administration console (by default http://localhost:4848), you can find under
`Resources -> JDBC -> JDBC Connection Pools` the preconfigured H2CyclePool connection pool
and under `Resources -> JDBC -> JDBC Resources` the corresponding JDBC Resource named `jdbc/CycleDS`.

### Exchange the datasource

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
11. Congratulations! Now Cycle should connect to your database.


## Install camunda Cycle on vanilla GlassFish

You can download the camunda Cycle web application from [our sever](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-glassfish/).
Choose the correct version named `$PLATFORM_VERSION/camunda-cycle-glassfish-$PLATFORM_VERSION.war`.

### Create a datasource

First, you must define a datasource in Glassfish Application Server. We assume here that you are familiar with the procedure.
If in doubt, check the appropriate sections in the manual of your application server.

Cycle expects a datasource named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the Cycle web application file.

### Modify default-web.xml

<div class="alert alert-info">
    In order for Cycle to work, you **MUST** modify the file `$GLASSFISH_HOME/glassfish/domains/domain1/config/default-web.xml`,
    otherwise you will get a BASIC AUTH window popping up, when you try to log into Cycle.
</div>

Open the `default-web.xml` and comment out / remove the following lines at the end of the file.

```xml
<login-config>
  <auth-method>BASIC</auth-method>
</login-config>
```

### Install the web application

1. Optionally, you may change the context path to which Cycle will be deployed (default is `/cycle`).
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Startup Glassfish.
3. Open the Glassfish Administration Console.
4. Navigate to *Applications* and click **Deploy**.
5. On the next page, under *Location*, select the appropriate option and browse your files and select the `camunda-cycle-glassfish-$PLATFORM_VERSION.war` file.
   ([show image](assets/img/deploy_app.png))
6. Leave the other settings unchanged and click **Ok**. Optionally, you can also change the context root for Cycle here. We propose to use `/cycle`.
7. Access camunda Cycle on the context you configured. If Cycle is installed correctly, a screen should appear that allows you to create an initial user.
   The initial user has administrator privileges and can be used to create more users once you have logged in.

### Configuring Cycle ###
#### Configuring email ####

**Note**: This step is optional and can be skipped if you do not require Cycle to send a welcome email to newly created users.

In order to use the Cycle email service, you have to configure a mail session in the application server and reference it in the Cycle configuration.

For this you have to configure a new mail session in Glassfish Application Server.

1.  Start the Glassfish Administration Console.
2.  Go to `Resources -> JavaMail Sessions` and click **New**.
3.  Now enter a JNDI name for the Mail Session, e.g. `mail/Session` and fill the mandatory fields for your mail server configuration. Later, the JNDI name will be referenced in Cycle's configuration.
    For a complete overview of the mail session properties, like encryption protocols etc, consult the Glassfish manual.
    Under *Additional Properties*, add these properties if your mail server requires password authentication

    ```
    mail.smtp.port:port-number
    mail.smtp.auth true
    mail.smtp.password: myMailServerPassword
    ```

The name of the mail session looked up by Cycle can be changed by editing the following file in the Cycle web application:

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
  If you want to improve security you can exchange the encryption password by creating a file `$USER_HOME/cycle.password`
  containing a self chosen plain ASCII password.
</div>