---

title: 'Install the Pre-Packaged Distribution'
weight: 10

menu:
  main:
    name: "Pre-Packaged Distribution"
    identifier: "installation-guide-full-tomcat-install-pre-built"
    parent: "installation-guide-full-tomcat"
    pre: "Download and install Apache Tomcat with the Full Distribution pre-deployed and pre-configured."

---

# Installation Procedure

1.  Download the pre-packaged distribution from https://downloads.camunda.cloud/release/camunda-bpm/tomcat/.
2.  Unpack the distro to a directory.
3.  Adjust the datasource according to your needs (see [Manual Installation]({{<ref "/installation/full/tomcat/manual.md" >}})).
4.  Startup the server by running `camunda-welcome.bat` or by using the `$TOMCAT_HOME/bin/startup.{bat/sh}` script.
