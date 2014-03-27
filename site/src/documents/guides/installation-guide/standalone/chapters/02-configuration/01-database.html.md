---

title: 'Database Configuration'
category: 'Configuration'

---

camunda standalone webapp is initially configured using a file-based `h2` database
and an Apache Commons DBCP datasource. The `h2` database is only useful for demo purposes.
If you want to use the standalone webapp in production we recommend
using a different database.

In order to configure another database edit the file named
`WEB-INF/applicationContext.xml` inside the
`camunda-webapp-SERVER-standalone-VERSION.war`. Edit the following
section with configuration values appropriate for your database.

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy">
  <property name="targetDataSource">
    <bean class="org.apache.commons.dbcp.BasicDataSource">
      <property name="driverClassName" value="org.h2.Driver" />
      <property name="url" value="jdbc:h2:./camunda-h2-dbs/process-engine;MVCC=TRUE;TRACE_LEVEL_FILE=0;DB_CLOSE_ON_EXIT=FALSE" />
      <property name="username" value="sa" />
      <property name="password" value="" />
    </bean>
  </property>
</bean>
```

<div class="alert alert-warning">
  If you configure a different database do not forget to add the corresponding database driver to the classpath of the web application.
</div>

As an alternative you can also configure a datasource inside your application server and look it up from
the web application.
