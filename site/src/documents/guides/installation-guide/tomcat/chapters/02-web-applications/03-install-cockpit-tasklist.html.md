---

title: 'Install camunda Cockpit and Tasklist'
category: 'Web Applications'

---

To install camunda Cockpit and Tasklist, a Tomcat installation with the `org.camunda.bpm.camunda-engine` module is required.

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.


   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
2. Copy the war file to `$TOMCAT_HOME/webapps/camunda.war`.
   Optionally you may name it differently or extract it to a folder to deploy it to a different context path.
3. Startup Tomcat.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.