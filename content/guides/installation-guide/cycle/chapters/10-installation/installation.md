---

title: 'Install Camunda Cycle on vanilla Tomcat 7'
weight: 30

menu:
  main:
    identifier: "installation-guide-cycle-install"
    parent: "installation-guide-cycle"

---

You can download the Camunda Cycle web application from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cycle/camunda-cycle-tomcat/).
Choose the correct version named `$CYCLE_VERSION/camunda-cycle-tomcat-$CYCLE_VERSION.war`.

### Create a datasource

The Cycle datasource is configured in the Cycle web application in the file `META-INF/context.xml`. It should be named `jdbc/CycleDS`.

In order to use a custom datasource name, you have to edit the file `WEB-INF/classes/META-INF/cycle-persistence.xml` in the Cycle web application file.

In order to use the `org.apache.tomcat.jdbc.pool.DataSourceFactory`, you need to add the driver of the database you use to the `$TOMCAT_HOME/lib` folder.
For example, if you plan to use the H2 database, you would have to add the h2-VERSION.jar.

<div class="alert alert-info">
  <strong>Tomcat 6.x</strong>
  <br/>
  On Tomcat 6, you will also have to add the tomcat-jdbc.jar, which ships with Tomcat 7 and the pre-packaged Camunda Cycle distribution, to
  <code>$TOMCAT_HOME/lib</code>.
</div>

### Install the web application

1.  Copy the Cycle war file to `$TOMCAT_HOME/webapps`.
    Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/cycle`.
2.  Startup Tomcat.
3.  Access Camunda Cycle on the context you configured. If Cycle is installed correctly, a screen should appear that allows you to create an initial user.
    The initial user has administrator privileges and can be used to create more users once you have logged in.
