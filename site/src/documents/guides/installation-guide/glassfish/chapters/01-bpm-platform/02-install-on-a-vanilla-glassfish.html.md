---

title: 'Install the platform on a vanilla GlassFish'
shortTitle: 'Install on a vanilla GlassFish'
category: 'BPM Platform'

---

This section will describe how you can install the camunda BPM platform on a vanilla [Glassfish 3.1](http://glassfish.java.net/), if you are not able to use the pre-packaged Glassfish distribution. Regardless, we recommend that you [download a Glassfish 3.1 distribution](http://camunda.org/download/) to use the required modules.

### <a id="database-camunda-bpm-platform"></a>Create the database schema for the camunda BPM platform

If you do not want to use the H2 database, you first have to create a database schema for the camunda BPM platform. The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts are reside in the `sql/create` folder:

`$GLASSFISH_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$GLASSFISH_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

<!--The next sections describe how to configure the Glassfish and to install the camunda BPM platfrom on Glassfish. If you prefer you can do the following [configurations via Glassfish Administration Console](ref:#configuring-admin-console) and [skip](ref:#configuring-admin-console) the next sections.-->

### <a id="configuring-jdbc"></a>Configuring JDBC Connection Pool and JDBC Resource

The JDBC Connection Pool and the JDBC Resource can be configured by editing the file `domain.xml` inside the folder `$GLASSFISH_HOME/glassfish/domains/<domain>/config/`.

This could look like the following example for an H2 database:

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

In case another database than H2 is used (i.e. DB2, MySQL etc.), you have to adjust the `datasource-classname` and the `res-type` attributes with the corresponding database classes and set the database specific properties (such as the url, etc.) inside the JDBC Connection Pool. Furthermore, you have to add the corresponding JDBC driver to `$GLASSFISH_HOME/glassfish/lib/`. For example, you can add the H2 JDBC driver which is located at `$GLASSFISH_DISTRIBUTION/server/glassfish3/glassfish/lib/h2-VERSION.jar` to run with the H2 database.

### <a id="configuring-thread-pool"></a>Configuring a Thread Pool for the Job Executor

To do so, you have to edit the file `$GLASSFISH_HOME/glassfish/domains/<domain>/config/domain.xml` and add the following elements to the `resources` section.

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

To configure a thread pool for the job executor you have to add it to the corresponding `config` elements of `domain.xml`.

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

### Installing the camunda BPM platform

The following steps are required to deploy the camunda BPM platform on a Glassfish instance:

1. Merge the shared libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` into the `GLASSFISH_HOME/glassfish/lib` directory (i.e. copy the content into the Glassfish library directory).
2. Copy the job executor resource adapter `$GLASSFISH_DISTRIBUTION/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`. The job executor resource adapter has to be deployed first because the artifact `camunda-glassfish-ear-$PLATFORM_VERSION.ear` depends on it and cannot be deployed successfully without the resource adapter. If you try to deploy both components with the auto-deploy feature in one step you should be aware that the deployment order is not defined in this case. Due to this, we propose to startup the Glassfish application server to initially deploy the job executor resource adapter. After a successful startup, shutdown the Glassfish application server.
3. Copy the artifact `$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`.
4. (optional) [Configure the location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file)
5. Startup the Glassfish application server.
6. After a successful startup, the camunda BPM platform is installed.

As next step you can, for example, install the [REST API](ref:#web-applications-install-the-rest-api-web-application) on Glassfish.