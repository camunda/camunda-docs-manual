---

title: 'Install camunda Cockpit and Tasklist'
category: 'Web Applications'

---

To install camunda Cockpit and Tasklist, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla JBoss](#bpm-platform-install-on-a-vanilla-jboss).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a JBoss instance:

1. Download the camunda web application that contains both applications from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which application will be deployed (default is `/camunda`).
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
3. Startup JBoss AS.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.