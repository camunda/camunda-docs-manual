---

title: 'Maven Project Templates (Archetypes)'
weight: 40

menu:
  main:
    identifier: "user-guide-process-application-archetypes"
    parent: "user-guide-process-applications"

---

We provide several project templates for Maven, which are also called Archetypes.
They enable a quickstart for developing process applications using the Camunda BPM platform.


# Overview of Available Maven Archetypes

The following archetypes are currently provided. They are distributed via our Maven repository: https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/

<table class="table table-bordered">
  <thead>
    <tr><th>Archetype</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/org/camunda/bpm/archetype/camunda-archetype-cockpit-plugin/">Camunda Cockpit Plugin</a></td>
      <td>Plugin for Camunda Cockpit, contains REST-Backend, MyBatis database query, HTML and JavaScript frontend, Ant build script for one-click deployment</td>
    </tr>
    <tr>
      <td><a href="https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/org/camunda/bpm/archetype/camunda-archetype-ejb-war/">Process Application (EJB, WAR)</a></td>
      <td>Process application that uses a shared Camunda BPM engine in a Java EE Container, e.g., JBoss Wildfly.
          Contains: Camunda EJB Client, Camunda CDI Integration, BPMN Process, Java Delegate as CDI bean, HTML5- & JSF-based start and task forms,
          configuration for JPA (Hibernate), JUnit Test with in-memory engine and visual process test coverage, Arquillian Test for JBoss AS7 & Wildfly, Maven Plugins or Ant build script for one-click deployment in Eclipse</td>
    </tr>
    <tr>
      <td><a href="https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/org/camunda/bpm/archetype/camunda-archetype-servlet-war/">Process Application (Servlet, WAR)</a></td>
      <td>Process application that uses a shared Camunda BPM engine in a Servlet Container, e.g., Apache Tomcat.
          Contains: Servlet process application, BPMN Process, Java Delegate, HTML5-based start and task forms,
          JUnit Test with in-memory engine, Maven Plugins or Ant build script for one-click deployment in Eclipse</td>
    </tr>
  </tbody>
</table>


# Usage in Eclipse IDE

## Summary

1. Add archetype catalog (**Preferences -> Maven -> Archetypes -> Add Remote Catalog**):
    **https://app.camunda.com/nexus/content/repositories/camunda-bpm/**
2. Create Maven project from archetype (**File -> New -> Project... -> Maven -> Maven Project**)


## Detailed Instructions

1. Go to **Preferences -> Maven -> Archetypes -> Add Remote Catalog**
{{< img src="../img/eclipse-00-preferences-maven-archetypes.png" title="Eclipse Preferences: Maven Archetypes" >}}
2. Enter the following URL and description, click on **Verify...** to test the connection and if that worked click on **OK** to save the catalog.

    Catalog File: **https://app.camunda.com/nexus/content/repositories/camunda-bpm/**

    Description: **camunda BPM platform**
{{< img src="../img/eclipse-01-add-remote-archetype-catalog.png" title="Eclipse Preferences: Add Maven Archetype Catalog" >}}

Now you should be able to use the archetypes when creating a new Maven project in Eclipse:

1. Go to **File -> New -> Project...** and select **Maven -> Maven Project**
{{< img src="../img/eclipse-02-create-maven-project.png" title="Create new Maven project" >}}
2. Select a location for the project or just keep the default setting.
{{< img src="../img/eclipse-03-select-maven-project-location.png" title="Eclipse: Select Maven project location" >}}
3. Select the archetype from the catalog that you created before.
{{< img src="../img/eclipse-04-select-archetype-from-catalog.png" title="Eclipse: Select Maven archetype from catalog" >}}
4. Specify Maven coordinates and Camunda version and finish the project creation.
{{< img src="../img/eclipse-05-specify-maven-coordinates-and-camunda-version.png" title="Eclipse: Specify Maven coordinates and Camunda version" >}}

The resulting project should look like this:

{{< img src="../img/eclipse-06-generated-maven-project.png" title="Generated Maven Project in Eclispe" >}}


## Troubleshooting

Sometimes the creation of the very first Maven project fails in Eclipse. If that happens to you, just try it again. Most of the times the second try works. If the problem persists, [contact us](https://forum.camunda.org/).

# Usage in IntelliJ IDEA

1. On the "Welcome to IntelliJ IDEA" screen, click on "Configure" and select "Plugins" in the dropdown
2. In the plugins dialog, click on "Browse repositories..."
3. Search for the plugin "Maven Archetype Catalogs" and click on "Install"
4. Restart IntelliJ IDEA
5. On the "Welcome to IntelliJ IDEA" screen, click on "Configure" and select "Preferences" in the dropdown
6. In the preferences window, navigate to: "Build, Execution, Deployment > Build Tools > Maven Archetype Catalogs"
7. Click the plus sign (+) on the right side of the settings dialog to add the archetype catalog `https://app.camunda.com/nexus/content/repositories/camunda-bpm/archetype-catalog.xml` to the list and click OK
8. To create a Maven project from an archetype, click on the "Welcome to IntelliJ IDEA" screen on "Create New Project"
9. In the new project dialog, click on the left side on "Maven", check "Create from archetype" and select any `org.camunda.bpm.archetype` entry

# Usage on Command Line

## Interactive

Run the following command in a terminal to generate a project. Maven will allow you to select an archetype and ask you for all parameters needed to configure it:

<pre class="console">
mvn archetype:generate -Dfilter=org.camunda.bpm.archetype: -DarchetypeRepository=https://app.camunda.com/nexus/content/repositories/camunda-bpm
</pre>


## Full Automation

The following command completely automates the project generation and can be used in shell scripts or Ant builds:
<pre class="console">
mvn archetype:generate \
  -DinteractiveMode=false \
  -DarchetypeRepository=https://app.camunda.com/nexus/content/repositories/camunda-bpm \
  -DarchetypeGroupId=org.camunda.bpm.archetype \
  -DarchetypeArtifactId=camunda-archetype-ejb-war \
  -DarchetypeVersion=7.10.0 \
  -DgroupId=org.example.camunda.bpm \
  -DartifactId=camunda-bpm-ejb-project \
  -Dversion=0.0.1-SNAPSHOT \
  -Dpackage=org.example.camunda.bpm.ejb
</pre>


# Source Code and Customization

You can also customize the project templates for your own technology stack. Just [fork them on GitHub](https://github.com/camunda/camunda-archetypes)!
