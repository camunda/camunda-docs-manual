---
title: 'Set up your project'
category: 'Tutorial'
---

Now you are ready to set up your Java EE process application project in eclipse. Setting up a process application project consists of 6 steps:

1. [Create a new Maven Project in Eclipse](#set-up/eclipse)
2. [Add the Maven dependencies](#set-up/maven)
3. [Add a WEB-INF/beans.xml deployment descriptor](#set-up/beans.xml)
4. [Add a WEB-INF/faces-config.xml deployment descriptor](#set-up/faces-config.xml)
5. [Add a META-INF/persistence.xml deployment descriptor](#set-up/persistence.xml)
6. [Add a META-INF/processes.xml deployment descriptor](#set-up/processes.xml)

In the following sections, we go through this process step by step.

<section id="set-up/eclipse">
  <h3>Create a new Maven Project in Eclipse</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/maven-project-settings.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In eclipse, go to <code>File / New / Other ...</code>. This opens the <em>New Project Wizard</em>. In the <em>New Project Wizard</em> select <code>Maven / Maven Project</code>. Click Next.
      </p>
      <p>
        On the first page of the <em>New Maven Project Wizard</em> select &quot;<em>Create a simple project (skip archetype selection)</em>&quot;. Click Next.
      </p>
      <p>
        On the second page (see screenshot), configure the Maven coordinates for the project.
      </p>
      <p class="alert alert-warning">
        As we are setting up a WAR Project, make sure to select <code>Packaging: war</code>.
      </p>
      <p>
        When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the <em>Project Explorer</em> view.
      </p>
    </div>
  </div>
</section>

<section id="set-up/maven">
  <h3>Add Maven Dependencies</h3>
  <p>
    The next step consists of setting up the Maven dependencies for your new process application. Add the following dependencies to the <code>pom.xml</code> file of your project:
  </p>
  <div class="app-source" data-source-code="pom.xml" annotate="code-annotations" ></div>
  <p>
    As dependencies you need the camunda engine and camunda engine CDI package. The CDI package provide you with beans to easily interact with the process engine and the ability to resolve CDI beans from inside the BPMN process XML.
  </p>
  <p>
    We also use the camunda EJB client to interact with the process engine, which provides a default implementation of the <code>EjbProcessApplication</code>. This dependency is not necessary if you want to implement your own <code>EjbProcessApplication</code>.
  </p>
  <p>
    The JBoss JavaEE spec dependency helps us to develop the application. It is only necessary during development so the <code>scope</code> is set to provided. The JBoss AS already contains this interfaces.
  </p>
  <p>
    Now you can perform the first build. Select the <code>pom.xml</code> in the Package Explorer, perform a right-click and select <code>Run As / Maven Install</code>
  </p>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-1"}) %>
</section>

<section id="set-up/beans.xml">
  <h3>Add a WEB-INF/beans.xml deployment descriptor</h3>
  <p>
    After we have all of our maven dependencies configured, we can add our first deployment descriptor. The <code>WEB-INF/beans.xml</code> is used to configure a CDI application. It's presence is always mandatory but it can be empty, as it is in our case. For further information, please see <a href="http://www.cdi-spec.org/faq/">this explanation</a>.
  </p>
  <p class="alert alert-info">
    This file needs to be added to the <code>src/main/webapp/WEB-INF</code> folder of the Maven project.
  </p>
</section>

<section id="set-up/faces-config.xml">
  <h3>Add a WEB-INF/faces-config.xml deployment descriptor</h3>
  <p>
    The next step is to configure the JSF component. This is done by adding the <code>WEB-INF/faces-config.xml</code> to your project. We use the default configuration, so you only have to add the file without any additional configuration.
  </p>
  <p class="alert alert-info">
    This file needs to be added to the <code>src/main/webapp/WEB-INF</code> folder of the Maven project.
  </p>
  <div class="app-source" data-source-code="faces-config.xml" annotate="code-annotations" ></div>
</section>

<section id="set-up/persistence.xml">
  <h3>Add a META-INF/persistence.xml deployment descriptor</h3>
  <p>
    To configure JPA, we add the <code>META-INF/persistence.xml</code> file. We use the same data source as the process engine which is configured inside the <code>standalone.xml</code> of the JBoss distribution.
  </p>
  <p>
    Additionally, we configure the H2 database to drop the database schema on redeployment and to log SQL queries. This configuration is useful during development.
  </p>
  <p class="alert alert-info">
    This file needs to be added to the <code>src/main/resources/META-INF</code> folder of the Maven project.
  </p>
  <div class="app-source" data-source-code="persistence.xml" annotate="code-annotations" ></div>
</section>

<section id="set-up/processes.xml">
  <h3>Add a META-INF/processes.xml deployment descriptor</h3>
  <p>
    The last step for setting up the process application is adding the <code>META-INF/processes.xml</code> deployment descriptor file. This file allows us to provide a declarative configuration of the deployment(s) that this process application makes to the process engine.
  </p>
  <p class="alert alert-info">
    This file needs to be added to the <code>src/main/resources/META-INF</code> folder of the Maven project.
  </p>
  <div class="app-source" data-source-code="processes.xml" annotate="code-annotations" ></div>
  <div class="panel-group" id="accProcessesXml">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accProcessesXml" href="#accProcessesXmlCollapsed">
          <i class="glyphicon glyphicon-thumbs-up"></i>
          Empty META-INF/processes.xml
        </a>
      </div>
      <div id="accProcessesXmlCollapsed" class="panel-collapse collapse">
        <div class="panel-body">
          <p>You can leave the META-INF/processes.xml file empty. In that case, default values are used.</p>
        </div>
      </div>
    </div>
  </div>

  <p>
    At this point you have successfully set up the process application you can start modeling your process.
  </p>

  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-2"}) %>
</section>
