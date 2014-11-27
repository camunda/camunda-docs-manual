---

title: 'Configuring the pre-packaged distribution'
category: 'Installation'

---

The distribution comes with a preconfigured H2 database used by Cycle.

The H2 JDBC driver is located at `camunda-cycle-distro-$CYCLE_VERSION.zip/server/apache-tomcat-VERSION/lib/h2-VERSION.jar`.

### Exchange the database

To exchange the preconfigured H2 database with your own, e.g. Oracle, you have to do the following:

1.  Copy your JDBC database driver JAR file to `$TOMCAT_HOME/lib`.
2.  Open `$TOMCAT_HOME/webapps/cycle/META-INF/context.xml` and edit the properties of the `jdbc/CycleDS` datasource definition.
