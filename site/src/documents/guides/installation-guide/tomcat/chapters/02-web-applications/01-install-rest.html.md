---

title: 'Install the REST API web application'
shortTitle: 'Install the REST API'
category: 'Web Applications'

---


To install the REST API, a Tomcat installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro](ref:#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla Tomcat](ref:#bpm-platform-install-the-platform-on-a-vanilla-tomcat).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a Tomcat instance:
1.  Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
    Or switch to the private repository for the enterprise version (User and password from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
2.  Copy the war file to `$TOMCAT_HOME/webapps`.
   Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/engine-rest`.
3.  Startup Tomcat.
4.  Access the REST API on the context you configured.
    For example, http://localhost:8080/engine-rest/engine should return the names of all engines of the platform, provided that you deployed the application in the context `/engine-rest`.