---

title: 'Migrate the Server'
category: 'Migrate from Camunda BPM 7.0 to 7.1'

---

## JBoss AS 7.1.3 to 7.2.0

### Upgrade the JBoss application server

Camunda BPM 7.1 ships with a new version of the JBoss AS 7, namely, 7.2.0.
The preferred upgrade steps are:

* copy all your custom modules / subsystems to the new JBoss server directory
* re-add all your custom modifications from the existing `$CAMUNDA_HOME/standalone/configuration/standalone.xml` to the new one located in the new JBoss server directory.
* copy all deployed datasources to the new JBoss server directory
* undeploy all process applications and copy them to the new JBoss server directory for redeployment
