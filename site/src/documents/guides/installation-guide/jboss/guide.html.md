camunda BPM Installation Guide (JBoss)
======================================

This document will guide you through the installation of camunda BPM and its components on a <a href="http://www.jboss.org/jbossas">JBoss Application Server 7</a>.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> Throughout this guide we will use a number of variables to denote common path names and constants.
  <code>$JBOSS_HOME</code> points to the jboss application server main directory.
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to or have installed, e.g. <code>7.0.0</code>.
</div>

<a id="platform"></a>Installing the pre-built distro
----------------------------------------------------
How to...

<a id="vanilla"></a>Installing the platform on a vanilla JBoss
--------------------------------------------------------------
How to...

<a id="rest"></a>Installing the REST API web application
--------------------------------------------------------
To install the REST API, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a JBoss instance:

1. Download the REST API web application archive from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS.
5. Access the REST API on the context path you configured. 
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform, 
   if you deployed the application in the context `/engine-rest`.

<a id="cycle"></a>Installing camunda cycle
------------------------------------------
How to...

<a id="cockpit"></a>Installing camunda cockpit
----------------------------------------------
To install camunda cockpit, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships camunda cockpit. It may be accessed on the context path `/cockpit`.

The following steps are required to deploy camunda cockpit on a JBoss instance:

1. Download the cockpit web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/cockpit/camunda-cockpit/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-cockpit-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which cockpit will be deployed (default is `/cockpit`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$JBOSS_HOME/standalone/deployments`. 
3. Startup JBoss AS.
4. Access camunda cockpit on the context you configured.

<a id="tasklist"></a>Installing camunda tasklist
-----------------------------------------------
To install camunda tasklist, a JBoss installation with the `org.camunda.bpm.camunda-engine` module is required.
See above, how to [install the pre-built distro](#platform) or [install the platform on a vanilla JBoss](#vanilla).

**Note**: The distro already ships camunda tasklist. It may be accessed on the context path `/tasklist`.

The following steps are required to deploy camunda tasklist on a JBoss instance:

1. Download the tasklist web application from [our server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/tasklist/camunda-tasklist-jboss/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-tasklist-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the tasklist will be deployed (default is `/tasklist`). 
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup the JBoss AS.
5. Access camunda tasklist on the context you configured.