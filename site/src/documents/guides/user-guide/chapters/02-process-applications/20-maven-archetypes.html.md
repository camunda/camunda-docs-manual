---

title: 'Maven Project Templates (Archetypes)'
category: 'Process Applications'

---

We provide several project templates for Maven, which are also called Archetypes.
They enable a quickstart for developing process applications using the camunda-BPM-platform.

## Usage in Eclipse IDE

### Summary
1. Add archetype catalog (**Preferences -> Maven -> Archetypes -> Add Remote Catalog**):

    **https://app.camunda.com/nexus/content/repositories/camunda-bpm/**
2. Create Maven project from archetype (**File -> New -> Project... -> Maven -> Maven Project**)

### Detailed Instructions
1. Go to **Preferences -> Maven -> Archetypes -> Add Remote Catalog**
<center><img class="img-responsive" title="Eclipse Preferences: Maven Archetypes" src="ref:asset:/guides/user-guide/assets/img/eclipse-00-preferences-maven-archetypes.png"/></center>
2. Enter the following URL and description, click on **Verify...** to test the connection and if that worked on **OK** to save the catalog.

    Catalog File: **https://app.camunda.com/nexus/content/repositories/camunda-bpm/**

    Description: **camunda BPM platform**
<center><img class="img-responsive" title="Eclipse Preferences: Add Maven Archetype Catalog" src="ref:asset:/guides/user-guide/assets/img/eclipse-01-add-remote-archetype-catalog.png"/></center>

Now you should be able to use the archetypes when creating a new Maven project in Eclipse:

1. Go to **File -> New -> Project...** and select **Maven -> Maven Project**
<center><img class="img-responsive" title="Eclipse: Create new Maven project" src="ref:asset:/guides/user-guide/assets/img/eclipse-02-create-maven-project.png"/></center>
2. Select a location for the project or just keep the default setting.
<center><img class="img-responsive" title="Eclipse: Select Maven project location" src="ref:asset:/guides/user-guide/assets/img/eclipse-03-select-maven-project-location.png"/></center>
3. Select the archetype from the catalog that you created before.
<center><img class="img-responsive" title="Eclipse: Select Maven archetype from catalog" src="ref:asset:/guides/user-guide/assets/img/eclipse-04-select-archetype-from-catalog.png"/></center>
4. Specify Maven coordinates and camunda version and finish the project creation.
<center><img class="img-responsive" title="Eclipse: Specify Maven coordinates and camunda version" src="ref:asset:/guides/user-guide/assets/img/eclipse-05-specify-maven-coordinates-and-camunda-version.png"/></center>
  
The resulting project should look like this:

<center><img class="img-responsive" title="Generated Maven Project in Eclispe" src="ref:asset:/guides/user-guide/assets/img/eclipse-06-generated-maven-project.png"/></center>

### Troubleshooting

Sometimes, the creation of the very first Maven project fails in Eclipse. If that happens to you, just try it again. Most of the times the second try works. If the problem persists, <a href="http://www.camunda.org/community/forum.html">contact us</a>.

## Usage on Commandline

### Interactive

Run the following command in a terminal to generate a project. Maven will allow you to select an archetype and ask you for all parameters needed to configure it:

<pre class="console">
mvn archetype:generate -Dfilter=org.camunda.bpm.archetype: -DarchetypeCatalog=https://app.camunda.com/nexus/content/repositories/camunda-bpm
</pre>

### Full Automation

The following command completely automates the project generation an can be used in shellscipts or Ant builds:
<pre class="console">
mvn archetype:generate \
  -DinteractiveMode=false \
  -DarchetypeRepository=https://app.camunda.com/nexus/content/repositories/camunda-bpm \
  -DarchetypeGroupId=org.camunda.bpm.archetype \
  -DarchetypeArtifactId=camunda-archetype-ejb-war \
  -DarchetypeVersion=7.0.0 \
  -DgroupId=org.example.camunda.bpm \
  -DartifactId=camunda-bpm-ejb-project \
  -Dversion=0.0.1-SNAPSHOT \
  -Dpackage=org.example.camunda.bpm.ejb
</pre>

## Source Code and Customization

You can also customize the project templates for your own technology stack. Just <a href="https://github.com/camunda/camunda-archetypes">fork them on GitHub</a>!
