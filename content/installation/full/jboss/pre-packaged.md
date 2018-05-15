---

title: 'Install the pre-packaged Distribution'
weight: 10

menu:
  main:
    name: "Pre-Packaged Distribution"
    identifier: "installation-guide-full-jboss-install-pre-built"
    parent: "installation-guide-full-jboss"
    pre: "Download and install Wildfly Application Server with the Full Distribution pre-deployed and pre-configured."

---
{{< note title="Java 8 compatibility" class="info" >}}
if you are using Java 8 please use Wildfly installation and not JBoss AS. In order to use JBoss AS you have to use Java 7 or Java 6.
{{< /note >}}

# Installation Procedure

1. Download the pre-packaged distribution for JBoss AS 7 from http://camunda.org/release/camunda-bpm/jboss/, for Wildfly 8 from http://camunda.org/release/camunda-bpm/wildfly8/, for Wildfly 10 from http://camunda.org/release/camunda-bpm/wildfly10/, or for Wildfly 11 from https://camunda.org/release/camunda-bpm/wildfly11/.
2. Unpack the distro to a directory.
3. Adjust the datasource according to your needs (see [Manual Installation]({{<relref "installation/full/jboss/manual.md" >}})).
4. Startup the server by running `camunda-welcome.bat` or by using the `$JBOSS_HOME/bin/standalone.{bat/sh}` script.


# Accessing the H2 console

In JBoss/Wildfly you can easily access the H2 console to inspect your local H2 database (used in demo/evaluation scenarios):

1.  Go to http://localhost:8080/h2/h2
2.  Login with the following data:
    *   jdbc:h2:./camunda-h2-dbs/process-engine
    *   User: sa
    *   Password: sa
