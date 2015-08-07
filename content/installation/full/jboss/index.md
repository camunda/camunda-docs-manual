---

title: "Install the Full Distribution for JBoss/Wildfly"
weight: 20

menu:
  main:
    name: "JBoss/Wildfly"
    identifier: "installation-guide-full-jboss"
    parent: "installation-guide-full"

---

This document describes the installation of the [Full Distribution]({{< relref "user-guide/introduction/downloading-camunda.md#full-distribution" >}}) for [JBoss Application Server 7/JBoss EAP 6](http://www.jboss.org/products/eap) or [Wildfly 8 Application Server](http://www.wildfly.org).

There are different options for installing the Full Distribution:

## Install the Pre-Packaged Distribution

Installing the pre-packaged distribution is the easiest way to get started. The pre-packaged distribution provides a Tomcat Application Server itself with all the Camunda librarires and web applications pre-installed and pre-configured.

[Install the pre-packaged distribution]({{< relref "installation/full/tomcat/pre-packaged.md" >}}).

## Manual Installation

If you want to add the Full Distribution to an existing tomcat installation, you need to perform the installation steps manually.

[Install the Full Distribution for Tomcat manually]({{< relref "installation/full/tomcat/manual.md" >}}).

## Configuration

After you have completed either of the above installation procedures, you can perform a number of optional configuration steps.

[Configure the Full Distribution for Tomcat]({{< relref "installation/full/tomcat/configuration.md" >}}).