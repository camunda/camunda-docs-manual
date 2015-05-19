---

title: 'Migrate the Server'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

## Wildfly 8.1.0 to 8.2.0

### Upgrade the Wildfly

Camunda BPM 7.3 ships with a new version of the Wildfly, namely, 8.2.0.Final.

See the [Wildfly 8.2.0.Final release notes](http://wildfly.org/news/2014/11/20/WildFly82-Final-Released/) for any relevant changes compared to 8.1.0.Final.

The preferred upgrade steps are:

* copy all your custom modules / subsystems to the new jboss server directory
* re-add all your custom modifications from the existing `$CAMUNDA_HOME/standalone/configuration/standalone.xml` to the new one located in the new jboss server directory.
* copy all deployed datasources to the new jboss server directory
* undeploy all process applications and copy them to the new jboss server directory for redeployment


## Tomcat 7.0.50 to 7.0.62

### Upgrade the Tomcat servlet container

Camunda BPM 7.3 ships with a new version of the Tomcat servlet container, namely, 7.0.62.

See the [Tomcat migration guide](https://tomcat.apache.org/migration-7.html#Upgrading_7.0.x) if you have to change any of your custom settings.

The preferred upgrade steps for Camunda BPM are:

* copy all your custom libraries from `<TOMCAT_HOME>/lib` to the new Tomcat's server `lib` - directory.
* re-add all your custom modifications from `server.xml`/`bpm-platform.xml` to the new ones located in the new Tomcat server directory.
* undeploy all process applications and copy them to the new Tomcat server directory for redeployment.
