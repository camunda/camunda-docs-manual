---

title: 'Install the platform on a vanilla Wildfly'
shortTitle: 'Install on a vanilla Wildfly'
category: 'BPM Platform'

---


1. Download the camunda Wildfly distro from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-bpm-wildfly-$PLATFORM_VERSION.zip` or `$PLATFORM_VERSION/camunda-bpm-wildfly-$PLATFORM_VERSION.tar.gz`.
2. Unpack the `modules` folder of the archive.
3. Merge all content into your $WILDFLY_HOME/modules/ directory.
4. Adjust your `$WILDFLY_HOME/standalone/configuration/standalone.xml` (or the Wildfly configuration applicable for your installation) as described below
5. Adjust the datasource to your needs (see below), by default it uses the built in H2 database
6. Startup the server


## Adjusting the standalone.xml

Here we describe the changes necessary in the `$WILDFLY_HOME/standalone/configuration/standalone.xml`. These are already done in the pre-packaged server.

Add the camunda subsystem as extension:

```xml
<server xmlns="urn:jboss:domain:2.1">
  <extensions>
    ...
    <extension module="org.camunda.bpm.wildfly.camunda-wildfly-subsystem"/>
```

Add the following elements in order to create a thread pool for the Job Executor:

```xml
<subsystem xmlns="urn:jboss:domain:threads:1.1">
  <bounded-queue-thread-pool name="job-executor-tp" allow-core-timeout="true">
    <core-threads count="3" />
    <queue-length count="3" />
    <max-threads count="10" />
    <keepalive-time time="10" unit="seconds" />
  </bounded-queue-thread-pool>
</subsystem>
```

The name of the thread pool is then referenced in the camunda bpm subsystem job executor configuration.
This also configures the default process engine.

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  <process-engines>
    <process-engine name="default" default="true">
      <datasource>java:jboss/datasources/ProcessEngine</datasource>
      <history-level>full</history-level>
      <properties>
        <property name="jobExecutorAcquisitionName">default</property>
        <property name="isAutoSchemaUpdate">true</property>
        <property name="authorizationEnabled">true</property>
      </properties>
    </process-engine>
  </process-engines>
  <job-executor>
    <thread-pool-name>job-executor-tp</thread-pool-name>
    <job-acquisitions>
      <job-acquisition name="default">
        <acquisition-strategy>SEQUENTIAL</acquisition-strategy>
        <properties>
          <property name="lockTimeInMillis">300000</property>
          <property name="waitTimeInMillis">5000</property>
          <property name="maxJobsPerAcquisition">3</property>
        </properties>
      </job-acquisition>
    </job-acquisitions>
  </job-executor>
</subsystem>
```


## Creating a datasource

You need to create a datasource named `java:jboss/datasources/ProcessEngine`.
The following datasource shows an example of using the built in H2 database for this, using a file within the `./` folder,
typically `bin`.

**Note**: If you start the script from a different location the database is stored there!

```xml
<datasource jta="true" enabled="true" use-java-context="true" use-ccm="true"
            jndi-name="java:jboss/datasources/ProcessEngine" 
            pool-name="ProcessEngine">
  <connection-url>jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</connection-url>
  <driver>h2</driver>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
</datasource>
```

<div class="alert alert-info">
  <strong>Cycle</strong><br/>
  Note that if you plan to use camunda Cycle, you need to configure an additional datasource. See the <a href="ref:#web-applications-install-camunda-cycle">Cycle section</a> for a guide.
</div>

Using H2 as a database is ideal for development purposes but is not recommended for usage in a productive environment.
These links point you to resources for other databases:

*   [How to configure an Oracle database](http://blog.foos-bar.com/2011/08/jboss-as-7-and-oracle-datasource.html)
*   [How to configure a MySQL database](http://javathreads.de/2011/09/jboss-as-7-mysql-datasource-konfigurieren/)
*   **Important**: For DB2, check [Installation Troubleshooting and FAQ](https://app.camunda.com/confluence/display/foxUserGuide/Installation+Troubleshooting+and+FAQ) for known issues


## Using an XA datasource

We **strongly recommend** to use an XA data-source in production environments.
Since you normally access other transactional resources from within your process, the risk of having inconsistencies is otherwise high.
For H2 it could be done with this configuration:

```xml
<xa-datasource jndi-name="java:jboss/datasource/ProcessEngine" pool-name="ProcessEngine" enabled="true" use-ccm="false">
  <xa-datasource-property name="URL">jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</xa-datasource-property>
  <driver>h2</driver>
  <xa-pool>
    <max-pool-size>10</max-pool-size>
    <is-same-rm-override>false</is-same-rm-override>
    <interleaving>false</interleaving>
    <pad-xid>false</pad-xid>
    <wrap-xa-resource>false</wrap-xa-resource>
  </xa-pool>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
  <validation>
    <validate-on-match>false</validate-on-match>
    <background-validation>false</background-validation>
    <background-validation-millis>0</background-validation-millis>
  </validation>
  <statement>
    <prepared-statement-cache-size>0</prepared-statement-cache-size>
    <share-prepared-statements>false</share-prepared-statements>
  </statement>
</xa-datasource>
```

For other databases, confer the following resources:

*   [Oracle XA datasource](http://docs.jboss.org/ironjacamar/userguide/1.0/en-US/html_single/#ex_datasources_oracle_xa)
*   [MySQL XA datasource](http://docs.jboss.org/ironjacamar/userguide/1.0/en-US/html_single/#ex_datasources_mysql_xa)
*   [DB2 XA datasource](http://docs.jboss.org/ironjacamar/userguide/1.0/en-US/html_single/#ex_datasources_db2_xa)