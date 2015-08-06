---

title: 'Get started with Camunda and BPMN 2.0'
weight: 10

menu:
  main:
    name: "BPMN 2.0"
    identifier: "get-started-pa"
    parent: "get-started"

---

This tutorial guides you through setting up camunda BPM and developing your first process application. You will learn to  

<dl class="dl-horizontal">
  <dt>
    <a href="ref:#tutorial-download-and-installation">Install</a>
  </dt>
  <dd>
     the camunda BPM platform and camunda Modeler on your machine. In this tutorial we use the Apache Tomcat based distribution.
  </dd>
  <dt>
    <a href="ref:#tutorial-set-up-your-project">Set up</a>
  </dt>
  <dd>
    an Apache Maven-based process application inside eclipse and deploy it to the camunda BPM platform.
  </dd>
  <dt>
    <a href="ref:#tutorial-model-a-process">Model</a>
  </dt>
  <dd>
    We cover the basics of handling the camunda modeler for eclipse and you will learn how to model and configure a fully executable process.
  </dd>
  <dt>
    <a href="ref:#tutorial-add-task-forms">Create Task Forms</a>
  </dt>
  <dd>
    We will explore the simplest possible kind of task forms available in camunda BPM. This will give you a jump start for bootstrapping simple processes.
  </dd>
  <dt>
    <a href="ref:#tutorial-add-a-service-task">Add Java Services</a>
  </dt>
  <dd>
    You will learn how to add a Java class to your process application and reference it from a BPMN Service Task in the process.
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

## Install camunda BPM platform

First, download a distribution of the camunda BPM platform. You can choose from different distributions for various application servers. In this tutorial, we will use the Apache Tomcat 7 based distribution. Download it [here](http://camunda.org/download).

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory `$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the camunda BPM platform, execute the script named `start-camunda.bat` (for Windows users), respectively `start-camunda.sh` (for Unix users).

This script will start the application server and open a welcome screen in your Web browser. If the page does not open, go to [http://localhost:8080/camunda-welcome/index.html](http://localhost:8080/camunda-welcome/index.html).

<div class="alert alert-info">
  <strong>Getting Help:</strong>
  If you have trouble setting up the camunda BPM platform, you can ask for assistance in the <a href="http://camunda.org/community/forum.html">Process Application Development Forum</a>.
</div>

## Install the camunda Modeler

Follow the instructions in the [camunda Modeler](ref:/guides/installation-guide/camunda-modeler/) section.

<%- @partial('get-code.html.eco', @, {repo: "camunda-get-started"}) %>


# Set up your project'

Now you are ready to set up your first process application project in eclipse. Setting up a process application project consists of 4 steps:  

1. [Create a new Maven Project in Eclipse](#set-up/eclipse)
2. [Add the camunda dependencies](#set-up/maven)
3. [Add a `@ProcessApplication` class](#set-up/process-application)
4. [Add a META-INF/processes.xml deployment descriptor](#set-up/processes.xml)

In the following sections, we go through this process step by step.

<section id="set-up/eclipse">
  <h3>Create a new Maven Project in Eclipse</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-new-project.png"/>
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
        Since we are setting up a WAR Project, make sure to select <code>Packaging: war</code>.
      </p>
      <p>
        When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the <em>Project Explorer</em> View.
      </p>
    </div>
  </div>
</section>

<section id="set-up/maven">
  <h3>Add camunda Maven Dependencies</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        The next step consists of setting up the Maven dependencies for your new process application. Add the following dependencies to the <code>pom.xml</code> file of your project:
      </p>
      <div class="app-source" data-source-code="pom.xml" annotate="code-annotations" ></div>
      <p>
        Now you can perform the first build. Select the <code>pom.xml</code> in the Package Explorer, perform a right-click and select <code>Run As / Maven Install</code>
      </p>
      <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-1"}) %>
    </div>
  </div>
</section>

<section id="set-up/process-application">
  <h3>Add a Process Application Class</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        Next, you need to create a package, e.g. <code>org.camunda.bpm.getstarted.loanapproval</code> and add a Process Application class to it. The Process Application class constitutes the interface between your application and the process engine.
      </p>
      <div class="app-source" data-source-code="LoanApprovalApplication" annotate="code-annotations" ></div>
    </div>
  </div>
  <div class="panel-group" id="accSimple">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accSimple" href="#collapseOne">
          <i class="glyphicon glyphicon-question-sign"></i>
          What about EJB Containers?
        </a>
      </div>
      <div id="collapseOne" class="panel-collapse collapse">
        <div class="panel-body">
          <p>In an EJB Container, use an EJB Process Application:</p>
          <div class="app-source" data-source-code="LoanApprovalEjbApplication" annotate="code-annotations" ></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="set-up/processes.xml">
  <h3>Add a META-INF/processes.xml deployment descriptor</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        The last step to set up the process application is to add the <code>META-INF/processes.xml</code> deployment descriptor file. This file allows us to provide a declarative configuration of the deployment(s) this process application makes to the process engine.
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
              <p>
                You can leave the META-INF/processes.xml file empty. In that case, default values are used. See the <a href="ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor-empty-processesxml">Empty Processes.xml</a> section of the <a href="ref:/guides/user-guide/">User Guide</a> for more information
              </p>
            </div>
          </div>
        </div>
      </div>
      <br>
      <p>
        At this point you have successfully set up the process application and you can start modeling the first process.
      </p>
    </div>
  </div>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-2"}) %>
</section>

# Model a Process

In this section you learn how to create your first BPMN 2.0 process with the camunda Modeler.

<section id="model/create">
  <h3>Create a new BPMN 2.0 diagram</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-new-bpmn-diagram.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In the eclipse <em>Package Explorer</em> select the <code>src/main/resources</code> folder. Right-click and select <code>New &gt; Other ...</code>. Go to the folder <code>BPMN</code> and select <em>BPMN 2.0 Diagram</em>. Click Next.
      </p>
      <p>
        On the second page, you must specify the file name of the process. Insert <em>loan-approval.bpmn</em>. Click Finish.
      </p>
    </div>
  </div>
  <h3>Start with a Simple Process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Start by modeling a simple process. From the Palette on the right hand side of the canvas, drag a <em>Start Event</em> onto the canvas.
      </p>
      <p>
        Double-click on the Start Event. A text box opens. Type <em>&quot;Loan Request Received&quot;</em>.
      </p>
      <p class="alert alert-info">
        When editing Labels, you can add line breaks by hitting <code>Shift + Enter</code>.
      </p>
      <p>
        Add a User Task to the process. Name it &quot;<em>Approve Loan</em>&quot;. Add an End Event named &quot;<em>Loan Request Approved</em>&quot;.
      </p>
    </div>
  </div>
  <h3>Configure a User Task</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process-property.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Next, Open the properties view. If the properties view is not visible, select it from the menu: <code>Window / Show View / Other ...</code> This opens a dialog. From the dialog select <code>Properties</code>.
      </p>
      <p>
        Select the User Task on the canvas. This updates the selection in the Properties View. Scroll to the Property named <code>Assignee</code>. Type <em>&quot;john&quot;</em>.
      </p>
      <p>
        When you are done, save your changes.
      </p>
    </div>
  </div>
  <h3>Configure an executable Process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process-config.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Since we are modeling an executable process, we should give it an ID and set the <code>isExecutable</code> property to <code>true</code>. Open the properties view and click on a free spot of the modeling canvas. This displays the properties of the process itself.
      </p>
      <ol>
        <li>
          First, configure an ID for the process. Type &quot;approve-loan&quot; in the property field <em>Process Id</em>. The property ID is used by the process engine as identifier for the executable process and it is best practice to set it to a human-readable name.
        </li>
        <li>
          Second, configure the Name of the process. Type &quot;Loan Approval&quot; in the property field <em>Name</em>.
        </li>
        <li>
          Finally, check the box of the <em>Is Executable</em> property. If you do not check this box, the process definition is ignored by the process engine.
        </li>
      </ol>
      <p>
        When you are done, save your changes.
      </p>
    </div>
  </div>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-3"}) %>
</section>


# Deploy the Process Application

<div class="row">
  <div class="col-md-12">
    <p>
      A Process Application is an ordinary Java Web Application and is deployed in exactly the same way.
    </p>
    <p>
      Select the <code>pom.xml</code> in the Package Explorer, perform a right-click and select <code>Run As / Maven Install</code>. This will generate a WAR file named <code>loan-approval-0.0.1-SNAPSHOT.war</code> In the <code>target/</code> folder of your Maven project.
    </p>
    <p class="alert alert-info">
      If the <code>loan-approval-0.0.1-SNAPSHOT.war</code> file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.
    </p>
    <h3>Deploy to Apache Tomcat</h3>
    <p>
      In order to deploy the process application, copy-paste the <code>loan-approval-0.0.1-SNAPSHOT.war</code> from your Maven project to the <code>$CAMUNDA_HOME/server/apache-tomcat/webapps</code> folder.
    </p>
    <p>
      Check the log file of the Apache Tomcat server. If you see the following log message, the deployment was successful:
    </p>
    <pre class="console">
org.camunda.bpm.application.impl.ServletProcessApplicationDeployer onStartup
INFORMATION: Detected @ProcessApplication class org.camunda.bpm.getstarted.loanapproval.LoanApprovalApplication
org.camunda.bpm.container.impl.deployment.ParseProcessesXmlStep parseProcessesXmlFiles
INFORMATION: Found process application file at .../webapps/loan-approval-0.1.0-SNAPSHOT/WEB-INF/classes/META-INF/processes.xml
org.camunda.bpm.container.impl.deployment.DeployProcessArchiveStep logDeploymentSummary
INFORMATION: Deployment summary for process archive 'loan-approval':

        loan-approval.bpmn

org.camunda.bpm.engine.impl.application.ProcessApplicationManager logRegistration
INFORMATION: ProcessApplication 'Loan Approval App' registered for DB deployments [4ab4d156-7543-11e4-86ad-28d2448a9975]. Will execute process definitions

        approve-loan[version: 1, id: approve-loan:1:4abf58a8-7543-11e4-86ad-28d2448a9975]
Deployment does not provide any case definitions.
org.camunda.bpm.container.impl.RuntimeContainerDelegateImpl deployProcessApplication
INFORMATION: Process Application Loan Approval App successfully deployed.
    </pre>
  </div>
</div>

## Check with camunda Cockpit

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/cockpit-loan-approval.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Now use Cockpit to check if the process is successfully deployed. Go to <a href="http://localhost:8080/camunda/app/cockpit" target="_blank">http://localhost:8080/camunda/app/cockpit</a>. Log in with demo / demo. Your process <em>Loan Approval</em> is visible on the start screen.
    </p>
  </div>
</div>

## Start a process instance

Next, go to camunda Tasklist (<a href="http://localhost:8080/camunda/app/tasklist" target="_blank">http://localhost:8080/camunda/app/tasklist</a>). Click on the <button class="btn btn-default btn-xs"><i class="glyphicon glyphicon-list-alt"></i> Start process</button> button to start a process instance. This opens a dialog where you can select <em>Loan Approval</em> from the list. Now you can set variables for the process instance using a generic form.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/start-form-generic.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      The generic form can be used whenever you have not added a dedicated form for a User Task or a Start Event. Click on the <button class="btn btn-default btn-xs">Add a variable</button> button to get a new row. Fill in the form as shown in the screenshot. When you are done, click <button class="btn btn-default btn-xs">Start</button>.
    </p>
    <p>
      If you now go back to <a href="http://localhost:8080/camunda/app/cockpit" target="_blank">camunda Cockpit</a>, you see the newly created process instance that is waiting in the User Task.
    </p>
  </div>
</div>

## Authorize user john for process definitions

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/create-process-definition-authorization.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      To allow the user <em>john</em> to see the process definition <em>Loan Approval</em> you have to go to camunda Admin (<a href="http://localhost:8080/camunda/app/admin/default/#/authorization?resource=6" target="_blank">http://localhost:8080/camunda/app/admin/default/#/authorization?resource=6</a>). Next, click on the button <button class="btn btn-default btn-xs">Create New</button> to add a new authorization on the resource <em>process definition</em>. Now you can give the user <em>john</em> all permissions on process definition <em>approve-loan</em>. When you are done, submit the new authorization.
    </p>
    <p>
      For further details about authorizations and how to manage them please read the following sections in the user guide: <a href="ref:/guides/user-guide/#process-engine-authorization-service" target="_blank">Authorization Service</a> and <a href="ref:/guides/user-guide/#admin-authorization-management-authorizations" target="_blank">Authorizations</a>
    </p>
  </div>
</div>

## Work on the task

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/diagram.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Log out of the Admin. Go to Tasklist (<a href="http://localhost:8080/camunda/app/tasklist" target="_blank">http://localhost:8080/camunda/app/tasklist</a>) and log back in with the user credentials "john / john". Now you see the <em>Approve Loan</em> task in your Tasklist. Select the task and click on the <code>Diagram</code> tab. This displays the process diagram highlighting the User Task that is waiting for you to work on it.
    </p>
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/task-form-generic.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      To work on the task, select the <code>Form</code> tab. Again, there is no task form associated with the process. Click on <button class="btn btn-default btn-xs">Load Variables</button>. This displays the variables you have put in in the first step.
    </p>
  </div>
</div>

# Add Task Forms

In the next step, we want to add an actual Task Form.

###Add a Start Form

Go back to eclipse and add a folder named `src/main/webapp/forms`. Inside this folder, add a file named `request-loan.html`. Add the following content:

<div class="app-source" data-source-code="RequestLoan.html" annotate="code-annotations"></div>

###Configure the Start Form in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-configure-start-form.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Open the process with the modeler plugin. Click on the start event. In the properties view, insert <code>embedded:app:forms/request-loan.html</code> into the <code>Form Key</code> property field. This means that we want to use an <code>embedded</code> form inside the Tasklist and that the form is loaded from the <code>app</code>lication.
    </p>
  </div>
</div>

###Add a Task Form

The Task Form can be added and configured the same way. Add a file named <code>approve-loan.html</code> to the <code>src/main/webapp/forms</code> directory and add the following content:

<div class="app-source" data-source-code="ReviewLoan.html" annotate="code-annotations"></div><br>

After that, open the process with the modeler plugin again. Click on the user task. In the properties view, insert <code>embedded:app:forms/approve-loan.html</code> into the <code>Form Key</code> property field.

When you are done, save all resources, perform a Maven build and redeploy the process application.

<p class="alert alert-info">
  <i class="glyphicon glyphicon-info-sign"></i> <strong>Maven:</strong> It is best practice to perform a <code>clean install</code> build to make sure all resources are replaced with their newest version.
</p>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/start-form-embedded.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    Now you can open the Tasklist and start a new process instance for the loan approval process. You will notice that the custom form is displayed.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/task-form-embedded.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    After starting a new process instance a new task <code>Approve Loan</code> is assigned to john. To work on the task, select the task inside the list of tasks and you will also notice that the custom form is displayed.
  </div>
</div>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-4"}) %>

# Add a Service Task

In the last section of this tutorial we add some code to the process.

## Add a Service Task to the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-add-service-task.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Use the camunda modeler plugin in eclipse to add a service task after the user task. The service task can be dropped on a sequence flow (see screenshot).
    </p>
  </div>
</div>

## Add a JavaDelegate Implementation

Now we need to add the actual service task implementation. Add a class named `ProcessRequestDelegate` implementing the `JavaDelegate` interface:

<div class="app-source" data-source-code="ProcessRequestDelegate" annotate="code-annotations"></div>

## Configure the Class in the Process

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-configure-service.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Use the properties view to reference the Service Task in the process (see screenshot). You need to provide the fully qualified classname of your class in the <code>class</code> property field.
    </p>
    <p>
      Build, deploy and execute the process. After completing the <em>Approve Application</em> step, check the logfile of the Apache Tomcat server:
    </p>
    <pre class="console">
org.camunda.bpm.getstarted.loanapproval.ProcessRequestDelegate execute
INFORMATION: Processing request by 'AC-343422'...
    </pre>
    <div class="panel-group" id="accClassloading">
      <div class="panel panel-default">
        <div class="panel-heading">
          <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accClassloading" href="#accClassloadingCollapsed">
            <i class="glyphicon glyphicon-thumbs-up"></i>
            Classloading in camunda BPM
          </a>
        </div>
        <div id="accClassloadingCollapsed" class="panel-collapse collapse">
          <div class="panel-body">
            <p>
              The process engine resolves the ProcessRequestDelegate class from the process application classloader. This allows you to
            </p>
            <ul>
              <li>
                have a different classloader for each Process Application,
              </li>
              <li>
                bundle libraries inside your application,
              </li>
              <li>
                (re-)deploy the application at runtime (without stopping / restarting the process engine).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-5"}) %>

# Done!

<div class="row">
  <div class="col-md-12">
    <p>
      Congratulations, you have now successfully deployed your first Process Application!
    </p>
    <h3>Where to go from here?</h3>
    <ul>
      <li>
        <a href="http://camunda.org/bpmn/tutorial.html">Learn more about BPMN</a>
      </li>
      <li>
        <a href="ref:/api-references/bpmn20/">Explore the BPMN 2.0 Implementation Reference</a>
      </li>
      <li>
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://docs.camunda.org/latest/guides/getting-started-guides/"
           data-text="Whohoo! I just developed my first #BPMN Process Application." data-size="large" data-hashtags="camunda">Tweet</a>
      </li>
    </ul>
  </div>
</div>

<div class="bootstrap-code">
<script type="text/xml" id="pom.xml">
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.camunda.bpm.getstarted</groupId>
  <artifactId>loan-approval</artifactId>
  <version>0.1.0-SNAPSHOT</version>
  <packaging>war</packaging>

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
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine</artifactId>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.0.1</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>

  <build>
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
package org.camunda.bpm.getstarted.loanapproval;

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

<script type="text/xml" id="processes.xml">
<?xml version="1.0" encoding="UTF-8" ?>

<process-application
    xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
</script>

<script type="text/xml" id="RequestLoan.html">
<form name="requestLoan">
  <div class="form-group">
    <label for="customerId">Customer ID</label>
    <input class="form-control" cam-variable-type="String" cam-variable-name="customerId" name="customerId"/>
  </div>
  <div class="form-group">
    <label for="amount">Amount</label>
    <input class="form-control" cam-variable-type="Double" cam-variable-name="amount" name ="amount"/>
  </div>
</form>
</script>

<script type="text/xml" id="ReviewLoan.html">
<form name="approveLoan">
  <div class="form-group">
    <label for="customerId">Customer ID</label>
    <input class="form-control" cam-variable-type="String" cam-variable-name="customerId" name="customerId" readonly="true"/>
  </div>
  <div class="form-group">
    <label for="amount">Amount</label>
    <input class="form-control" cam-variable-type="Double" cam-variable-name="amount" name ="amount"/>
  </div>
</form>
</script>

<script type="text/xml" id="ProcessRequestDelegate">

public class ProcessRequestDelegate implements JavaDelegate {

  private final static Logger LOGGER = Logger.getLogger("LOAN-REQUESTS");

  public void execute(DelegateExecution execution) throws Exception {
    LOGGER.info("Processing request by '"+execution.getVariable("customerId")+"'...");
  }

}
</script>

<script type="text/ng-template" id="code-annotations">
{
"pom.xml":
  { "war": "Process Applications are most commonly packaged as Java Web Application Archives (WAR files). Other deployment options are available. On the Java EE 6 platform, you can use plain JAR or advanced EAR deployments as well." ,
  "camunda-engine": "The process engine is the component responsible for picking up your BPMN 2.0 processes and executing them.",
  "provided": "The process engine can be either <ul><li>provided by the servlet container or</li><li>embedded inside your process application.</li></ul> Here we use a shared process engine that is provided by the servlet container.",
  "javax.servlet-api": "The servlet API is required for compilation",
  "false" : "With Servlet 3.0 we do not need a web.xml file. Maven needs to catch up.",
  "camunda-bpm-nexus" : "camunda nexus providing the Maven artifacts."

  },
  "LoanApprovalApplication":
  { "@ProcessApplication": "The @ProcessApplication annotation makes sure the process application is discovered and deployed by the servlet container integration."
  },
  "LoanApprovalEjbApplication":
  {
  "ConcurrencyManagement": "The process engine uses this bean to perform callbacks inside this application. Make sure the container does not synchronize access to this process application.",
  "TransactionAttribute": "Make sure the application participates in transactions but does not manadate own transactions."
  },
  "processes.xml":
  {
  "loan-approval": "The name of the process engine deployment to be constructed.",
  "default": "The name of the process engine we want to use (you can start multiple process engines).",
  "isDeleteUponUndeploy": "Controls if the process engine deployment should be removed when the process application is undeployed. If set to true, all process instances are deleted in the database when the WAR file is removed from the server.",
  "isScanForProcessDefinitions": "If set to true, the WAR file is automatically scanned for process definitions. All files ending in <code>.bpmn20.xml</code> or <code>.bpm</code> are automatically picked up."
  },
  "RequestLoan.html":
  {
  "cam-variable-type": "Allows specification of the type of the process variable.",
  "cam-variable-name": "Allows specification of the name of the process variable."
  },
  "ReviewLoan.html":
  {
  "readonly": "AngularJS directive allowing you to make the variable read-only."
  },
  "ProcessRequestDelegate":
  {
  "JavaDelegate": "Interface provided by the Process Engine. Useful for writing Service Implementation Delegates.",
  "DelegateExecution":"Object representing the currently active process execution. Provides access to process variables."
  }
}
</script>
</div>


