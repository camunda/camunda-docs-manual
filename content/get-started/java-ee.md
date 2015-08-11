---

title: 'Get Started with Camunda and Java EE 6'
weight: 40

menu:
  main:
    name: "Java EE 6"
    identifier: "get-started-java-ee"
    parent: "get-started"
    pre: "Get started with developing Process Applications with Camunda BPM and Java EE. Learn how to use JSF, CDI, EJBs and JPA in your process application."

---

This tutorial guides you through setting up camunda BPM and developing your first process application with Java EE 6.
You will learn to

<dl class="dl-horizontal">
  <dt>
    <a href = "ref:#tutorial-download-and-installation-install-the-camunda-bpm-platform">Install</a>
  </dt>
  <dd>
    the camunda BPM platform on your machine. In this tutorial we use the JBoss based distribution.
  </dd>
  <dt>
    <a href ="ref:#tutorial-set-up-your-project">Set up</a>
  </dt>
  <dd>
    an Apache Maven-based process application inside eclipse and deploy it to the camunda BPM platform.
  </dd>
  <dt>
    <a href ="ref:#tutorial-add-pizza-order-form">Create Task Forms</a>
  </dt>
  <dd>
    We will explore how to use JSF forms in camunda BPM.
  </dd>
  <dt>
    <a href = "ref:#tutorial-add-persist-service-task">JPA</a>
  </dt>
  <dd>
    You will learn how use JPA to persist entities and use them during the process.
  </dd>
  <dt>
    <a href ="ref:#tutorial-add-send-rejection-email-service-task">EJB</a>
  </dt>
  <dd>
    You will learn how use EJBs to encapsulate your JPA transactions.
  </dd>
</dl>

# Download and Installation

<div class="alert alert-info">
  <p>
    <strong>Before you start</strong><br>
    Make sure you have the following set of tools installed:
  </p>
  <ul>
    <li>Java JDK 1.6+</li>
    <li>Apache Maven (optional, if not installed you can use embedded Maven inside eclipse.)</li>
    <li>A modern Web browser (recent Firefox, Chrome, or Internet Explorer 9+ will work fine)</li>
  </ul>
</div>

## Install Camunda BPM platform

First, download a distribution of the camunda BPM platform. You can choose from different application servers. In this tutorial, we will use the JBoss AS 7 based distribution. Download it [here](http://camunda.org/download/).

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory
`$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the camunda BPM platform, execute the script named
`start-camunda.bat` for Windows users, respectively `start-camunda.sh` for Unix users.

This script will start the application server and open a welcome screen in your Web browser.
If the page does not open, go to http://localhost:8080/camunda-welcome/index.html.

<div class="alert alert-info">
  <strong>Getting Help:</strong><br>
  If you have trouble setting up the camunda BPM platform, you can ask for assistance in the
  <a href="http://camunda.org/community/forum.html">Forum</a>.
</div>

## Install Camunda Modeler

Follow the instructions in the [camunda Modeler](/guides/installation-guide/camunda-modeler/) section.

{{< get-code repo="camunda-get-started-javaee" >}}


# Set up your project

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
  {{< get-tag repo="camunda-get-started-javaee" tag="Step-1" >}}
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

  {{< get-tag repo="camunda-get-started-javaee" tag="Step-2" >}}
</section>

# Model a Process

In this section we model our sample process with the camunda Modeler.

<section id="model/create">
  <h3>Create a new BPMN 2.0 Diagram</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img id="eclipse-new-bpmn-diagram" data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-new-bpmn-diagram.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In the eclipse <em>Package Explorer</em> select the <code>src/main/resources</code> folder. Right-click and select <code>New &gt; Other ...</code>. Go to the folder <code>Other</code> and select <em>BPMN 2.0 Diagram</em>. Click Next.
      </p>
      <p>
        On the second page, you must specify the file name of the process. Insert <em>pizza-order.bpmn</em>. Click Finish.
      </p>
    </div>
  </div>
</section>

<section id="model/create">
  <h3>Create the Sample Pizza Order Process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img id="pizza-order-process" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        The sample process models a pizza order approval. In the first service task, the order should be persisted to our database. The next step is the approval of the order by a user. Based on his decision, the pizza will be prepared or a rejection email is sent.
      </p>
      <p>
        Since we are modeling an executable process, we should give it an ID, a name and set the <code>isExecutable</code> property to <code>true</code>. Open the properties view and click on a free spot of the modeling canvas. This displays the properties of the process itself.
      </p>
    </div>
  </div>

  <h3>Configure Placeholder Expressions</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img id="expression-placeholder" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-expression-true.png"/>
      <img id="conditional-placeholder" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process-conditional-expression.png" />
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Additionally, you have to configure some placeholder expressions for the service tasks and the conditional sequence flows. Otherwise, you wouldn't be able to deploy this process on the process engine. Please set the <code>Expression</code> property of both service tasks to <code>${true}</code>. Also set the <code>Condition</code> property of the sequence flows after the exclusive gateway to <code>${true}</code>, respectively <code>${false}</code>.
      </p>
      <p>
        When you are done, save your changes.
      </p>
    </div>
  </div>

  {{< get-tag repo="camunda-get-started-javaee" tag="Step-3" >}}
</section>

# Deploy the Process Application

To deploy the process application select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`. This will generate a WAR file named `pizza-order.war` in the `target/` folder of your Maven project.

<p class="alert alert-info">
  If the <code>pizza-order.war</code> file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.
</p>

## Deploy to JBoss AS

To deploy the process application, copy and paste the `pizza-order.war` from your Maven project `target` folder to the `$CAMUNDA_HOME/server/jboss-as-VERSION/standalone/deployments` folder.

Check the log file of the JBoss server. If you see a log message like the following one, the deployment was successful:

<pre class="console">
11:27:10,067 INFO  [org.camunda.bpm.container.impl.jboss.service.ProcessApplicationDeploymentService] (ServerService Thread Pool -- 16) Deployment summary for process archive 'pizza-order' of process application 'pizza-order':

    pizza-order.bpmn

11:27:10,070 INFO  [javax.enterprise.resource.webcontainer.jsf.config] (ServerService Thread Pool -- 9) Initializing Mojarra 2.1.18-jbossorg-1 20130205-1414 for context '/pizza-order'
11:27:10,071 INFO  [org.camunda.bpm.engine.impl.bpmn.deployer.BpmnDeployer] (ServerService Thread Pool -- 16) Processing resource pizza-order.bpmn
11:27:10,199 INFO  [org.camunda.bpm.engine.impl.application.ProcessApplicationManager] (ServerService Thread Pool -- 16) ProcessApplication 'pizza-order' registered for DB deployments [f74d80c1-ba48-11e3-9dd4-f0def1e59da8]. Will execute process definitions

    orderPizza[version: 1, id: orderPizza:1:f7609393-ba48-11e3-9dd4-f0def1e59da8]

11:27:10,310 INFO  [org.hibernate.validator.internal.util.Version] (ServerService Thread Pool -- 9) HV000001: Hibernate Validator 4.3.1.Final
11:27:10,532 INFO  [org.jboss.as.server] (DeploymentScanner-threads - 1) JBAS018559: Deployed "pizza-order.war" (runtime-name : "pizza-order.war")
</pre>

# Add Pizza Order Form

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="start-form" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/start-form.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      As a next step, we want to add an actual JSF start form.
    </p>
  </div>
</div>

## Add a Start Form

Go back to eclipse and add a file named `placeorder.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="placeorder.xhtml" annotate="code-annotations"></div>

The JSF view creates a simple input form for a customer name, address and a pizza selection. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startProcessInstanceByKeyForm()` method which extracts the process definition key from the URL and starts a conversation for the start form.

The user input inside the form fields are saved as a map of process variables inside the conversation.

When the form is submitted, the `camundaTaskForm.completeProcessInstanceForm()` method starts a new process instance by the process definition key which was determined by the `startProcessInstanceByKeyForm()` method. Additionally, the process variables set by the user are passed to the process instance.


## Configure the Start Form in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="pizza-order-start-form" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process-start-form.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. Click on the start event. In the properties view, set the <code>Form Key</code> property to <code>app:placeorder.jsf</code>. This means that we want to use an external JSF form and that the form is loaded from the <code>app</code>lication.
    </p>
    <p>
      When you are done, save all resources, perform a Maven build and redeploy the process application.
    </p>
    <p class="alert alert-info">
      <i class="glyphicon glyphicon-info-sign"></i> <strong>Maven:</strong> It is best practice to perform a <code>clean install</code> build to make sure all resources are replaced with their newest version.
    </p>
    <p>
      If you open the Tasklist and start a new process instance for the pizza order process, the JSF form is displayed.
    </p>
  </div>
</div>

{{< get-tag repo="camunda-get-started-javaee" tag="Step-4" >}}

# Add EJB Service Task

After the process has been started with the new order as process variables, we want to persist the order to the database and only save the newly generated order id as process variable.

## Add an Entity Bean to the Process Application

To persist the entity with JPA, we add an entity bean to our process application. The entity class has to be annotated with `@Entity` and needs an `@Id` field. We also add a `@Version` field to the entity bean. This enables optimistic locking and ensures integrity during merges.

<div class="app-source" data-source-code="OrderEntity" annotate="code-annotations"></div>

## Add an EJB to the Process Application

The next step is to add a stateless EJB to the process application which is called by the process. In this EJB we inject the entity manager. It is used to manage our persistent objects during the session.

In the method `persistOrder`, a new instance of the order entity is created and the order instance will be initialized with the values which are currently saved as process variables. After the newly created instance is flushed to the database, its order id is set and the other process variables are no longer needed, so we remove the order properties and only add the order id as a process variable.

<div class="app-source" data-source-code="OrderBusinessLogic" annotate="code-annotations"></div>

## Configure the EJB in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="eclipse-configure-service" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process-service-task-expression.png" />
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Use the properties view of the Persist Service Task in the process (see screenshot). You need to enter <code>${orderBusinessLogic.persistOrder(execution)}</code> as the <code>Expression</code> property. This will call the <code>persistOrder</code> method of the named EJB with the current execution as parameter.
    </p>
    <p>
      Build, deploy and execute the process. After completing the <em>Persist Order</em> step, check the logfile of the JBoss AS server. It will show an insert for the new order entity:
    </p>
    <pre class="console">
11:36:11,659 INFO  [stdout] (http-/127.0.0.1:8080-1) Hibernate: insert into OrderEntity (address, approved, customer, pizza, version, id) values (?, ?, ?, ?, ?, ?)
    </pre>
  </div>

  {{< get-tag repo="camunda-get-started-javaee" tag="Step-5" >}}
</div>

# Add JSF Task Form

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="task-form" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/approve-order.png"/>
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      After the order has been persisted, a user can approve the order. For that, a task form is needed to display the order information.
    </p>
  </div>
</div>

## Add a CDI Controller Bean

To update the persisted entity we use a named CDI Bean `ApproveOrderController`. To gather the persisted order entity, we get the order id from the process variables of the `businessProcess`. With the id we can load the order entity trough the order business logic. After the order has been updated, the detached entity state is merged by the order business logic.

<div class="app-source" data-source-code="ApproveOrderController" annotate="code-annotations"></div>

## Extend Order Business Logic

The order business logic is extended to provide a method to load an order entity from the database by order id, to merge a detached order entity and to complete the task form. For that, the task form is injected, which is provided by the camunda CDI artifact.

Please note that the merging of the detached order entity and the completion of the task form are intentionally placed in one method. This ensures that both operations are executed in a single transaction. An error during that transaction will rollback both changes.

<div class="app-source" data-source-code="OrderBusinessLogic2" annotate="code-annotations"></div>

## Create the JSF Form Task Form

Go back to eclipse and add a file named `approveorder.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="approveorder.xhtml" annotate="code-annotations"></div>

The JSF view displays the order properties and provides a checkbox to approve the order on submit. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startTaskForm()` method which extracts the task id from the URL and starts a conversation for the task form.

When the user approves or disapproves the order, it is directly set on the cached order entity.

On form submit, the `approveOrderController.submitForm()` method calls the EJB `mergeOrderAndCompleteTask` method with the cached order entity. The EJB will merge the updated order entity if necessary and completes the task form.

## Configure the Task Form in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="pizza-order-task-form" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process-task-form.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. Click on the approve order user task. In the properties view, set the <code>Form Key</code> property to <code>app:approveorder.jsf</code>. This means that we want to use an external JSF form and that the form is loaded from the <code>app</code> location.
    </p>
  </div>
</div>

# Configure the Conditional Sequence Flows in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="conditional-sequence-flow-yes" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-yes.png"/>
    <img id="conditional-sequence-flow-no" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-no.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. In the properties view, set the <code>Condition</code> property of the conditional sequence flows after the exclusive gateway to <code>${orderBusinessLogic.getOrder(orderId).approved}</code> respectively <code>${not orderBusinessLogic.getOrder(orderId).approved}</code>.
    </p>
    <p>
      When you are done, save all resources, perform a Maven build and redeploy the process application. You can now approve the pizza order from the tasklist.
    </p>
  </div>
</div>

{{< get-tag repo="camunda-get-started-javaee" tag="Step-6" >}}

# Complete the Process

## Add Prepare Pizza Task Form

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="prepare-pizza" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/prepare-pizza.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      If the user approves the pizza order the pizza has to be prepared. So we add a user task form in which the user can confirm that preparation of the pizza has been completed.
    </p>
  </div>
</div>

Go back to eclipse and add a file named `preparepizza.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="preparepizza.xhtml" annotate="code-annotations"></div>

A new conversation is started again before the view is rendered and the task is completed after the form has been submitted. The form only contains a single button.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="pizza-order-prepare-pizza" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-prepare-pizza.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. Click on the prepare pizza user task. In the properties view, set the <code>Form Key</code> property to <code>app:preparepizza.jsf</code>.
    </p>
    <p>
      When you are done, save all resources, perform a Maven build and redeploy the process application.
    </p>
  </div>
</div>

{{< get-tag repo="camunda-get-started-javaee" tag="Step-7" >}}

## Add Send Rejection Email Service Task

If the user disapproves the pizza order an email is sent to inform the customer. This will be simulated by a simple log output.

The EJB is extended with a method which logs an informative message for the rejection of the order.

<div class="app-source" data-source-code="OrderBusinessLogic3" annotate="code-annotations"></div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="reject-task" data-img-thumb src="ref:asset:/assets/img/getting-started/javaee/pizza-order-process-send-rejection-email.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. Click on the reject email service task. In the properties view, set the <code>Expression</code> property to <code>${orderBusinessLogic.rejectOrder(execution)}</code>.
    </p>
    <p>
      When you are done, save all resources, perform a Maven build and redeploy the process application.
    </p>
  </div>
</div>

{{< get-tag repo="camunda-get-started-javaee" tag="Step-8" >}}

# Done

<div class="row">
  <div class="col-md-12">
    <p>
      Congratulations, you have now successfully deployed your Java EE Process Application!
    </p>
    <h3>Where to go from here?</h3>
    <ul>
      <li>
        <a href="http://camunda.org/bpmn/tutorial.html">Learn more about BPMN</a>
      </li>
      <li>
        Explore the <a href="ref:/api-references/bpmn20/">BPMN 2.0 Implementation Reference</a>
      </li>
      <li>
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://docs.camunda.org/latest/guides/getting-started-guides/"
           data-text="Whohoo! I just developed a Jave EE #BPMN Process Application." data-size="large" data-hashtags="camunda">Tweet</a>
      </li>
    </ul>
  </div>
</div>

<div class="bootstrap-code">
  <script type="text/xml" id="pom.xml">
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <groupId>org.camunda.bpm.getstarted</groupId>
      <artifactId>pizza-order</artifactId>
      <version>0.1.0-SNAPSHOT</version>
      <packaging>war</packaging>

      <!-- import camunda BOM to ensure correct versions of camunda projects -->
      <dependencyManagement>
        <dependencies>
          <dependency>
            <groupId>org.camunda.bpm</groupId>
            <artifactId>camunda-bom</artifactId>
            <version>7.3.0</version>
            <scope>import</scope>
            <type>pom</type>
          </dependency>
        </dependencies>
      </dependencyManagement>

      <dependencies>

        <!-- camunda engine dependency -->
        <dependency>
          <groupId>org.camunda.bpm</groupId>
          <artifactId>camunda-engine</artifactId>
          <scope>provided</scope>
        </dependency>

        <!-- camunda cdi beans -->
        <dependency>
          <groupId>org.camunda.bpm</groupId>
          <artifactId>camunda-engine-cdi</artifactId>
        </dependency>

        <!-- provides a default EjbProcessApplication -->
        <dependency>
          <groupId>org.camunda.bpm.javaee</groupId>
          <artifactId>camunda-ejb-client</artifactId>
        </dependency>

        <!-- Java EE 6 Specification -->
        <dependency>
          <groupId>org.jboss.spec</groupId>
          <artifactId>jboss-javaee-web-6.0</artifactId>
          <version>3.0.2.Final</version>
          <type>pom</type>
          <scope>provided</scope>
          <exclusions>
            <exclusion>
              <artifactId>xalan</artifactId>
              <groupId>xalan</groupId>
            </exclusion>
          </exclusions>
        </dependency>

      </dependencies>

      <build>
        <finalName>pizza-order</finalName>
        <plugins>
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>2.3</version>
            <configuration>
              <failOnMissingWebXml>false</failOnMissingWebXml>
            </configuration>
          </plugin>
        </plugins>
      </build>

    </project>
  </script>

  <script type="text/xml" id="LoanApprovalApplication">
    package org.camunda.bpm.example.loanapproval;

    import org.camunda.bpm.application.ProcessApplication;
    import org.camunda.bpm.application.impl.ServletProcessApplication;

    @ProcessApplication("Loan Approval App")
    public class LoanApprovalApplication extends ServletProcessApplication {
      // empty implementation
    }
  </script>

  <script type="text/xml" id="LoanApprovalEjbApplication">
    @ProcessApplication("Loan Approval App")
    @Singleton
    @Startup
    @ConcurrencyManagement(ConcurrencyManagementType.BEAN)
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    @Local(ProcessApplicationInterface.class)
    public class LoanApprovalEjbApplication extends EjbProcessApplication {

      @PostConstruct
      public void start() {
        deploy();
      }

      @PreDestroy
      public void stop() {
        undeploy();
      }
    }
  </script>

  <script type="text/xml" id="faces-config.xml">
    <?xml version="1.0" encoding='UTF-8'?>
    <faces-config version="2.0" xmlns="http://java.sun.com/xml/ns/javaee"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
             http://java.sun.com/xml/ns/javaee/web-facesconfig_2_0.xsd">

    </faces-config>
  </script>

  <script type="text/xml" id="persistence.xml">
    <?xml version="1.0" encoding="UTF-8"?>
    <persistence version="2.0"
      xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="
            http://java.sun.com/xml/ns/persistence
            http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd">

      <persistence-unit name="primary">
        <jta-data-source>java:jboss/datasources/ProcessEngine</jta-data-source>
        <properties>
          <!-- Properties for Hibernate -->
          <property name="hibernate.hbm2ddl.auto" value="create-drop" />
          <property name="hibernate.show_sql" value="true" />
        </properties>
      </persistence-unit>

    </persistence>
  </script>

  <script type="text/xml" id="processes.xml">
    <process-application
      xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

      <process-archive name="pizza-order">
        <process-engine>default</process-engine>
        <properties>
          <property name="isDeleteUponUndeploy">true</property>
          <property name="isScanForProcessDefinitions">true</property>
        </properties>
      </process-archive>

    </process-application>
  </script>

  <script type="text/xml" id="placeorder.xhtml">
    <!DOCTYPE HTML>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:ui="http://java.sun.com/jsf/facelets"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:f="http://java.sun.com/jsf/core">

    <f:view>
      <f:metadata>
        <!-- Start a new process instance. The Process Definition Key is read internally from
             request parameters and cached in the CDI conversation scope.
        -->
        <f:event type="preRenderView" listener="#{camundaTaskForm.startProcessInstanceByKeyForm()}" />
      </f:metadata>
      <h:head>
        <title>Place Order</title>
      </h:head>
      <h:body>
        <h1>Select your pizza</h1>
        <h:form id="submitForm">
          <h:panelGrid columns="2">
            <p>
              <label for="pizza">Pizza</label>
              <h:selectOneMenu id="pizza" value="#{processVariables['pizza']}">
                  <f:selectItem itemValue="Margarita" itemLabel="Margarita"/>
                  <f:selectItem itemValue="Salami" itemLabel="Salami"/>
                  <f:selectItem itemValue="Tonno" itemLabel="Tonno"/>
                  <f:selectItem itemValue="Prosciutto" itemLabel="Prosciutto"/>
              </h:selectOneMenu>
            </p>
            <p>
              <label for="customer">Customer</label>
              <!-- create process variables using the processVariables map. -->
              <h:inputText id="customer" value="#{processVariables['customer']}" required="true" />
            </p>
            <p>
              <label for="address">Address</label>
              <!-- create process variables using the processVariables map. -->
              <h:inputText id="address" value="#{processVariables['address']}" required="true" />
            </p>
          </h:panelGrid>

          <!-- The button starts a new process instance. This ends the conversation and redirects us to the tasklist.

               NOTE: Syntax is different when working on user task forms, see file "approveLoanRequest.xhtml".
          -->
          <h:commandButton id="submit_button" value="Order Pizza" action="#{camundaTaskForm.completeProcessInstanceForm()}" />

          <h:messages style="color:red;margin:8px;" />
        </h:form>
      </h:body>
    </f:view>
    </html>
  </script>

  <script type="text/html" id="OrderEntity">
    package org.camunda.bpm.getstarted.pizza;

    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.Id;
    import javax.persistence.Version;
    import java.io.Serializable;

    @Entity
    public class OrderEntity implements Serializable {

      private static  final long serialVersionUID = 1L;

      @Id
      @GeneratedValue
      protected Long id;

      @Version
      protected long version;

      protected String customer;
      protected String address;
      protected String pizza;
      protected boolean approved;

      public Long getId() {
        return id;
      }

      public void setId(Long id) {
        this.id = id;
      }

      public long getVersion() {
        return version;
      }

      public void setVersion(long version) {
        this.version = version;
      }

      public String getCustomer() {
        return customer;
      }

      public void setCustomer(String customer) {
        this.customer = customer;
      }

      public String getAddress() {
        return address;
      }

      public void setAddress(String address) {
        this.address = address;
      }

      public String getPizza() {
        return pizza;
      }

      public void setPizza(String pizza) {
        this.pizza = pizza;
      }

      public boolean isApproved() {
        return approved;
      }

      public void setApproved(boolean approved) {
        this.approved = approved;
      }
    }
  </script>

  <script type="text/html" id="OrderBusinessLogic">
    package org.camunda.bpm.getstarted.pizza;

    import org.camunda.bpm.engine.delegate.DelegateExecution;

    import javax.ejb.Stateless;
    import javax.inject.Named;
    import javax.persistence.EntityManager;
    import javax.persistence.PersistenceContext;
    import java.util.Map;

    @Stateless
    @Named
    public class OrderBusinessLogic {

      // Inject the entity manager
      @PersistenceContext
      private EntityManager entityManager;

      public void persistOrder(DelegateExecution delegateExecution) {
        // Create new order instance
        OrderEntity orderEntity = new OrderEntity();

        // Get all process variables
        Map<String, Object> variables = delegateExecution.getVariables();

        // Set order attributes
        orderEntity.setCustomer((String) variables.get("customer"));
        orderEntity.setAddress((String) variables.get("address"));
        orderEntity.setPizza((String) variables.get("pizza"));

        /*
          Persist order instance and flush. After the flush the
          id of the order instance is set.
        */
        entityManager.persist(orderEntity);
        entityManager.flush();

        // Remove no longer needed process variables
        delegateExecution.removeVariables(variables.keySet());

        // Add newly created order id as process variable
        delegateExecution.setVariable("orderId", orderEntity.getId());
      }

    }
  </script>

  <script type="text/html" id="OrderBusinessLogic2">
    @Stateless
    @Named
    public class OrderBusinessLogic {

      // ...

      // Inject task form available through the camunda cdi artifact
      @Inject
      private TaskForm taskForm;

      public void persistOrder(DelegateExecution delegateExecution) {
        // ...
      }

      public OrderEntity getOrder(Long orderId) {
        // Load order entity from database
        return entityManager.find(OrderEntity.class, orderId);
      }

      /*
        Merge updated order entity and complete task form in one transaction. This ensures
        that both changes will rollback if an error occurs during transaction.
       */
      public void mergeOrderAndCompleteTask(OrderEntity orderEntity) {
        // Merge detached order entity with current persisted state
        entityManager.merge(orderEntity);
        try {
          // Complete user task from
          taskForm.completeTask();
        } catch (IOException e) {
          // Rollback both transactions on error
          throw new RuntimeException("Cannot complete task", e);
        }
      }

    }
  </script>

  <script type="text/html" id="ApproveOrderController">
    package org.camunda.bpm.getstarted.pizza;

    import org.camunda.bpm.engine.cdi.BusinessProcess;
    import org.camunda.bpm.engine.cdi.jsf.TaskForm;

    import javax.enterprise.context.ConversationScoped;
    import javax.inject.Inject;
    import javax.inject.Named;
    import javax.persistence.EntityManager;
    import javax.persistence.PersistenceContext;
    import java.io.IOException;
    import java.io.Serializable;

    @Named
    @ConversationScoped
    public class ApproveOrderController implements Serializable {

      private static  final long serialVersionUID = 1L;

      // Inject the BusinessProcess to access the process variables
      @Inject
      private BusinessProcess businessProcess;

      // Inject the EntityManager to access the persisted order
      @PersistenceContext
      private EntityManager entityManager;

      // Inject the OrderBusinessLogic to update the persisted order
      @Inject
      private OrderBusinessLogic orderBusinessLogic;

      // Caches the OrderEntity during the conversation
      private OrderEntity orderEntity;

      public OrderEntity getOrderEntity() {
        if (orderEntity == null) {
          // Load the order entity from the database if not already cached
          orderEntity = orderBusinessLogic.getOrder((Long) businessProcess.getVariable("orderId"));
        }
        return orderEntity;
      }

      public void submitForm() throws IOException {
        // Persist updated order entity and complete task form
        orderBusinessLogic.mergeOrderAndCompleteTask(orderEntity);
      }
    }
  </script>

  <script type="text/html" id="approveorder.xhtml">
    <!DOCTYPE HTML>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
    xmlns:ui="http://java.sun.com/jsf/facelets"
    xmlns:h="http://java.sun.com/jsf/html"
    xmlns:f="http://java.sun.com/jsf/core">

    <f:view>
    <f:metadata>
      <!-- Start working on a task. Task Id is read internally from
           request parameters and cached in the CDI conversation scope.
      -->

      <f:event type="preRenderView" listener="#{camundaTaskForm.startTaskForm()}" />
    </f:metadata>
    <h:head>
      <title>Approve Order</title>
    </h:head>
    <h:body>
      <h1>Order:</h1>
      <p>Customer: #{approveOrderController.orderEntity.customer}</p>
      <p>Address: #{approveOrderController.orderEntity.address}</p>
      <p>Pizza: #{approveOrderController.orderEntity.pizza}</p>
      <h:form id="submitForm">
        <h:outputLabel>Approve Order?</h:outputLabel>
        <h:selectBooleanCheckbox value="#{approveOrderController.orderEntity.approved}"/><br/>
        <h:commandButton id="submit_button" value="Approve Order" action="#{approveOrderController.submitForm()}" />
      </h:form>
    </h:body>
    </f:view>
    </html>
  </script>

  <script type="text/html" id="preparepizza.xhtml">
    <!DOCTYPE HTML>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:ui="http://java.sun.com/jsf/facelets"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:f="http://java.sun.com/jsf/core">

    <f:view>
      <f:metadata>
        <!-- Start working on a task. Task Id is read internally from
             request parameters and cached in the CDI conversation scope.
        -->

        <f:event type="preRenderView" listener="#{camundaTaskForm.startTaskForm()}" />
      </f:metadata>
      <h:head>
        <title>Prepare Pizza</title>
      </h:head>
      <h:body>
        <h1>Please prepare pizza</h1>
        <h:form id="submitForm">
          <h:commandButton id="submit_button" value="Done" action="#{camundaTaskForm.completeTask()}" />
        </h:form>
      </h:body>
    </f:view>
    </html>
  </script>

  <script type="text/html" id="OrderBusinessLogic3">
    @Stateless
    @Named
    public class OrderBusinessLogic {

      // ..

      private static Logger LOGGER = Logger.getLogger(OrderBusinessLogic.class.getName());

      public void persistOrder(DelegateExecution delegateExecution) {
        // ...
      }

      public OrderEntity getOrder(Long orderId) {
        // ...
      }

      public void mergeOrderAndCompleteTask(OrderEntity orderEntity) {
        // ...
      }

      public void rejectOrder(DelegateExecution delegateExecution) {
        OrderEntity order = getOrder((Long) delegateExecution.getVariable("orderId"));
        LOGGER.log(Level.INFO, "\n\n\nSending Email:\nDear {0}, your order {1} of a {2} pizza has been rejected.\n\n\n", new String[]{order.getCustomer(), String.valueOf(order.getId()), order.getPizza()});
      }

    }
  </script>

  <script type="text/ng-template" id="code-annotations">
    {
    "pom.xml":
      { "war": "Process Applications are most commonly packaged as Java Web Application Archives (WAR files). Other deployment options are available. On the Java EE 6 platform, you can use plain JAR or advanced EAR deployments as well." ,
      "camunda-engine": "The process engine is the component responsible for picking up your BPMN 2.0 processes and executing them.",
      "javax.servlet-api": "The servlet API is required for compilation",
      "false" : "With Servlet 3.0 we do not need a web.xml file. Maven needs to catch up.",
      "camunda-bpm-nexus" : "camunda nexus providing the Maven artifacts."

      },
      "processes.xml":
      {
      "loan-approval": "The name of the process engine deployment to be constructed.",
      "default": "The name of the process engine we want to use (you can start multiple process engines).",
      "isDeleteUponUndeploy": "Controls if the process engine deployment should be removed when the process application is undeployed. If set to true, all process instances are deleted in the database when the WAR file is removed from the server.",
      "isScanForProcessDefinitions": "If set to true, the WAR file is automatically scanned for process definitions. All files ending in <code>.bpmn20.xml</code> or <code>.bpm</code> are automatically picked up."
      }
    }
  </script>
</div>
