---
title: 'Install camunda Cockpit and Tasklist'
weight: 50

menu:
  main:
    identifier: "installation-guide-full-glassfish-webapp"
    parent: "installation-guide-full-glassfish"

---

To install camunda Cockpit and Tasklist, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro](ref:#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla Glassfish](ref:#bpm-platform-install-the-platform-on-a-vanilla-glassfish).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a Glassfish instance:

1. Download the camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-glassfish/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-glassfish-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
3. Startup the Glassfish Application Server.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.
