---

title: 'Migrate the Server'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

## Wildfly 8.1.0 to 8.2.0

### Upgrade the Wildfly

Camunda BPM 7.3 ships with a new version of the Wildfly, namely, 8.2.0.
The preferred upgrade steps are:

* copy all your custom modules / subsystems to the new jboss server directory
* re-add all your custom modifications from the existing `$CAMUNDA_HOME/standalone/configuration/standalone.xml` to the new one located in the new jboss server directory.
* copy all deployed datasources to the new jboss server directory
* undeploy all process applications and copy them to the new jboss server directory for redeployment
