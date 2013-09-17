---

title: 'Install camunda Cockpit and Tasklist'
category: 'Web Applications'

---

To install camunda Cockpit and Tasklist, a Tomcat installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla Tomcat](#bpm-platform-install-on-a-vanilla-tomcat).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a JBoss instance:

1. Download the camunda web application that contains both applications from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-tomcat/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
2. Copy the war file to `$CATALINA_HOME/webapps/camunda.war`.
   Optionally you may name it differently or extract it to a folder to deploy it to a different context path.
3. Startup Tomcat.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.