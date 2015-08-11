---

title: 'Get started with Camunda and CMMN 1.0'
weight: 20

menu:
  main:
    name: "CMMN 1.0"
    identifier: "get-started-cmmn"
    parent: "get-started"
    pre: "Get started developing a Case Application containing a CMMN 1.0 case. Learn how to specify tasks, milestones and sentries. Deploy the application to the Apache Tomcat application server."

---

This tutorial guides you through setting up Camunda BPM and developing your first application with a CMMN case. You will learn to

<dl class="dl-horizontal">
  <dt>
    <a href="ref:#tutorial-download-and-installation">Install</a>
  </dt>
  <dd>
     the Camunda BPM platform on your machine. In this tutorial we use the Apache Tomcat based distribution.
  </dd>
  <dt>
    <a href="ref:#tutorial-set-up-your-project">Set up</a>
  </dt>
  <dd>
    an Apache Maven based process application inside eclipse and deploy it to the Camunda BPM platform.
  </dd>
  <dt>
    <a href="ref:#tutorial-create-a-cmmn-case">Create a Case</a>
  </dt>
  <dd>
    We will create and configure a fully executable CMMN case in XML.
  </dd>
  <dt>
    <a href="ref:#tutorial-create-a-cmmn-case-modelcreate-add-human-tasks">Create Human Tasks</a>
  </dt>
  <dd>
    We will add human tasks to the CMMN case and use the Camunda Tasklist to complete the tasks.
  </dd>
  <dt>
    <a href="#tutorial-add-a-milestone">Event-driven Actions</a>
  </dt>
  <dd>
     You will learn how to activate and cancel tasks in CMMN, based on events.
  </dd>
</dl>

<div class="alert alert-info">
  <p><strong>Modeling CMMN cases</strong></p>
  <p>CMMN is a young standard for which there are not many modeling tools yet. Currently, Camunda does not offer a modeling tool. We have had good experiences with the <a href="http://www.cmmnwebmodeler.com/">Trisotech CMMN modeler</a> that offers a free 30 day trial. You can use it to graphically model along the steps we perform in this tutorial. However, this tutorial does not teach you how to use that modeler.</p>
</div>

# Download and Installation

<div class="alert alert-info">
  <p>
    <strong>Before you start</strong><br>
    Make sure you have the following set of tools installed:
  </p>
  <ul>
    <li>Java JDK 1.6+</li>
    <li>Apache Maven (optional, if not installed you can use embedded Maven inside eclipse.)</li>
    <li>A modern web browser (recent Firefox, Chrome, or Internet Explorer 9+ will work fine)</li>
  </ul>
</div>

## Install Camunda BPM platform

First, download a distribution of the Camunda BPM platform. You can choose from different distributions for various application servers. In this tutorial, we will use the Apache Tomcat 7 based distribution. Download it [here](http://camunda.org/download). Make sure you choose a version >= 7.2.0.

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory `$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the Camunda BPM platform, execute the script named `start-camunda.bat` (for Windows users), respectively `start-camunda.sh` (for Unix users).

This script will start the application server and open a welcome screen in your web browser. If the page does not open, go to [http://localhost:8080/camunda-welcome/index.html](http://localhost:8080/camunda-welcome/index.html).

<div class="alert alert-info">
  <strong>Getting Help:</strong>
  If you have trouble setting up the Camunda BPM platform, you can ask for assistance in the <a href="http://camunda.org/community/forum.html">Camunda Users Forum</a>.
</div>

<%- @partial('get-code.html.eco', @, {repo: "camunda-get-started-cmmn"}) %>

# Set up your project

Now you are ready to set up your first process application project in eclipse. Setting up a process application project consists of 4 steps:

1. [Create a new Maven Project in Eclipse](#set-up/eclipse)
2. [Add the Camunda dependencies](#set-up/maven)
3. [Add a `@ProcessApplication` class](#set-up/process-application)
4. [Add a META-INF/processes.xml deployment descriptor](#set-up/processes.xml)

In the following sections, we go through this process step by step.

<div class="alert alert-info">
  <p><strong>Terminology - Process vs. Case:</strong></p>
  <p>CMMN is a modeling language for <i>cases</i>, whereas BPMN is a language for <i>processes</i>. This tutorial is about cases. However, due to Camunda's BPMN-focused heritage, the Java project contains classes and files with names like <code>ProcessApplication</code> and <code>processes.xml</code>. These are in fact generally applicable and can be used with both processes as well as cases.</p>
</div>

<section id="set-up/eclipse">
  <h3>Create a new Maven Project in Eclipse</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/eclipse-new-project.png"/>
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
        When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the <em>Project Explorer</em> view.
      </p>
    </div>
  </div>
</section>

<section id="set-up/maven">
  <h3>Add Camunda Maven Dependencies</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        The next step consists of setting up the Maven dependencies for your new process application. Add the following dependencies to the <code>pom.xml</code> file of your project:
      </p>
      <div class="app-source" data-source-code="pom.xml" annotate="code-annotations" ></div>
      <p>
        Now you can perform the first build. Select the <code>pom.xml</code> in the Package Explorer, perform a right-click and select <code>Run As / Maven Install</code>
      </p>
      <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-1"}) %>
    </div>
  </div>
</section>

<section id="set-up/process-application">
  <h3>Add a Process Application Class</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        Next, you need to create a package, e.g., <code>org.camunda.bpm.getstarted.loanapproval</code>, and add a Process Application class to it. The Process Application class constitutes the interface between your application and the process engine.
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
        At this point you have successfully set up the process application and you can start creating your first CMMN case.
      </p>
    </div>
  </div>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-2"}) %>
</section>

# Create a CMMN Case

In this section you learn how to create your first CMMN 1.0 case in XML. Don't worry, the XML is not going to be complex.

<section id="model/create">
  <h3>Create an empty CMMN 1.0 file</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/eclipse-new-file.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In the eclipse <em>Package Explorer</em> select the <code>src/main/resources</code> folder. Right-click and select <code>New &gt; Other ...</code>. Select <em>File</em>. Click Next.
      </p>
      <p>
        On the second page, you must specify the file name of the case. Insert <code>loan-approval.cmmn10.xml</code>. Click Finish.
      </p>
    </div>
  </div>

  <h3>Set Up the Case Plan Model</h3>

  <div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3"></div>
    <div class="col-xs-4 col-sm-4 col-md-4">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-1.png"/>
    </div>
  </div>

  <p>
    Open the newly created file and copy-paste the following contents into it:
  </p>

  <div class="app-source" data-source-code="loan-application-01.cmmn10.xml" annotate="code-annotations"></div>

  <p>
    This snippet declares a <em>case plan model</em>, the essential part of any CMMN case definition.
  </p>

  <h3>Add Human Tasks</h3>

  <div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3"></div>
    <div class="col-xs-4 col-sm-4 col-md-4">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-2.png"/>
    </div>
  </div>
  <p>
    As the first part of the loan application case, the loan application should be reviewed for any formal errors. We therefore add a <em>human task</em> to the case. Tasks are always specified by two parts: A <em>plan item</em> and a <em>plan item definition</em>. While the plan item definition is a blue print for the task's behavior, the plan item represents the actual task instantiation. Update your CMMN definition as follows (insert the highlighted parts at the appropriate positions or simply replace the entire content):
  </p>

  <div class="app-source" data-source-code="loan-application-02.cmmn10.xml" annotate="code-annotations" highlight="4-16"></div>

  <p>
    In addition, the customer's creditworthiness has to be assessed. We add another user task:
  </p>

  <div class="app-source" data-source-code="loan-application-03.cmmn10.xml" annotate="code-annotations" highlight="6;18-26"></div>

  <p>
    Note how there is no direct relation between the two plan items. There is no sequence flow connecting the two tasks as in BPMN. In CMMN, this expresses that the tasks can be executed concurrently.
  </p>

  <p>
    To learn more about human tasks, consider checking the <a href="ref:/api-references/cmmn10/#tasks-human-task">Human Task section</a> of our CMMN implementation guide.
  </p>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-3"}) %>
</section>

# Deploy the Process Application

<div class="row">
  <div class="col-md-12">
    <p>
      In this step, we make our first deployment to a Camunda instance.
    </p>

    <h3>Configure Case Instantiation</h3>
    <p>
      In order to directly create a case instance after deployment, add the following method to your <code>LoanApprovalApplication</code> class:
    </p>

    <div class="app-source" data-source-code="LoanApprovalApplication.postDeploy" annotate="code-annotations" highlight="12-20"></div>

    <h3>Build the Process Application</h3>
    <p>
      A Process Application is an ordinary Java Web Application and is deployed in exactly the same way.
    </p>
    <p>
      Select the <code>pom.xml</code> in the Package Explorer, perform a right-click and select <code>Run As / Maven Install</code>. This will generate a WAR file named <code>loan-approval-cmmn-0.1.0-SNAPSHOT.war</code> In the <code>target/</code> folder of your Maven project.
    </p>
    <p class="alert alert-info">
      If the <code>loan-approval-cmmn-0.1.0-SNAPSHOT.war</code> file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.
    </p>
    <h3>Deploy to Apache Tomcat</h3>
    <p>
      In order to deploy the process application, copy-paste the <code>loan-approval-cmmn-0.1.0-SNAPSHOT.war</code> from your Maven project to the <code>$CAMUNDA_HOME/server/apache-tomcat/webapps</code> folder.
    </p>
    <p>
      Check the log file of the Apache Tomcat server. If you see the following log message, the deployment was successful:
    </p>
    <pre class="console">
org.camunda.bpm.application.impl.ServletProcessApplicationDeployer onStartup
INFORMATION: Detected @ProcessApplication class org.camunda.bpm.getstarted.cmmn.loanapproval.LoanApprovalApplication
org.camunda.bpm.container.impl.deployment.ParseProcessesXmlStep parseProcessesXmlFiles
INFORMATION: Found process application file at .../webapps/loan-approval-cmmn-0.1.0-SNAPSHOT/WEB-INF/classes/META-INF/processes.xml
org.camunda.bpm.container.impl.deployment.DeployProcessArchiveStep logDeploymentSummary
INFORMATION: Deployment summary for process archive 'loan-approval-cmmn':

        loanapplication.cmmn10.xml

org.camunda.bpm.engine.impl.application.ProcessApplicationManager logRegistration
INFORMATION: ProcessApplication 'Loan Approval CMMN' registered for DB deployments [8e894d4e-8071-11e4-9712-28d24461aeb0].
Deployment does not provide any process definitions.
Will execute case definitions

        loan_application[version: 1, id: loan_application:1:8ea0ccf0-8071-11e4-9712-28d24461aeb0]

org.camunda.bpm.container.impl.RuntimeContainerDelegateImpl deployProcessApplication
INFORMATION: Process Application Loan Approval CMMN successfully deployed.
    </pre>
  </div>
</div>

## Check with Camunda Tasklist

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/tasklist-overview.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Now use Camunda Tasklist to check if the case was instantiated. Go to Camunda Tasklist (<a href="http://localhost:8080/camunda/app/tasklist" target="_blank">http://localhost:8080/camunda/app/tasklist</a>). Log in with demo / demo. After you have logged in, click on the filter <em>My Tasks</em>. There should be two tasks listed with names <em>Check Application</em> and <em>Provide Customer Rating</em>. Select the task <em>Check Application</em>.
    </p>
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/tasklist-check-application.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      The Tasklist displays a generic form that can be used whenever you have not added a dedicated form for a Human Task. You can use it to add variables to the case. For now, we leave it empty. Just click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.
    </p>
    <p>
      Do the same with the task <em>Provide Customer Rating</em>. Both tasks have now completed and there is no more work to be done in this case instance.
    </p>
  </div>
</div>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-4"}) %>


# Add a Milestone

<p>
  In the next step, we are going to add a <em>milestone</em>. In CMMN, a milestone expresses that a certain intermediate goal in the case has been reached.
</p>

<div class="row">
  <div class="col-xs-3 col-sm-3 col-md-3"></div>
  <div class="col-xs-4 col-sm-4 col-md-4">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-3.png"/>
  </div>
</div>

<p>
  Go back to eclipse and the CMMN model file. Insert the following XML:
</p>

<div class="app-source" data-source-code="loan-application-04.cmmn10.xml" annotate="code-annotations" highlight="7-22;43"></div>

<p>
  The above does not only add a milestone but also a <em>sentry</em>. Sentries are used to capture conditions within a case and can trigger other events to occur. Here we have expressed that the milestone <em>Approved</em> is reached when both tasks have successfully completed, and if the application was sufficient and the customer received a good rating for creditworthiness.
</p>

<p>
  Milestones are not visualized in the Camunda web applications. In order to see that the milestone occurs we add a <em>CaseExecutionListener</em>. Create a new Java class in the project:
</p>

<div class="app-source" data-source-code="LifecycleListener" annotate="code-annotations"></div>

<p>
  To register the listener with the milestone, update the milestone in <code>loan-approval.cmmn10.xml</code> as follows:
</p>

<div class="app-source" data-source-code="loan-application-05.cmmn10.xml" annotate="code-annotations" highlight="43-47"></div>

<p>
  When you are done, save all resources, perform a Maven build and redeploy the process application.
</p>

<p class="alert alert-info">
  <i class="glyphicon glyphicon-info-sign"></i> <strong>Maven:</strong> It is best practice to perform a <code>clean install</code> build to make sure all resources are replaced with their newest version.
</p>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/tasklist-check-application-variable.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    Now you can open the Tasklist and access the <code>demo</code> user's tasks. First click on the task <em>Check Application</em>. Click on <code>Add a variable</code>. In the field <code>Name</code>, enter <code>applicationSufficient</code>. For <code>Type</code>, select <code>Boolean</code>. Make sure to tick the check box that now appeared. Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/tasklist-provide-rating-variable.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    Next, complete the task <code>Provide Customer Rating</code>. Again, click on <code>Add a variable</code> and name the variable <code>rating</code>. Set the type to <code>Integer</code> and the value to <code>4</code>. Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.
  </div>
</div>

<p>
  Now open the Tomcat console. You have completed the tasks and set the variables accordingly so that the milestone has occurred. On the console, you should see the following log entries:
</p>

<pre class="console">
org.camunda.bpm.getstarted.cmmn.loanapproval.LifecycleListener notify
INFORMATION: Plan Item 'PI_Milestone_1' labeled 'Approved' has performed transition: occur
</pre>

<p>
  Our lifecycle listener has been notified, showing that the milestone has actually occurred.
</p>

<p>
  To learn more about milestones, consider checking the <a href="ref:/api-references/cmmn10/#milestones-milestone">Milestone section</a> in our CMMN implementation guide.
</p>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-5"}) %>

# Add an Exit Criterion

<p>
  When a loan application is not sufficient, for example because it has formal errors, there is no need to provide a customer rating any longer. We can express this in CMMN by adding a sentry.
</p>

<h3>Add a Sentry and Exit Criterion</h3>

<div class="row">
  <div class="col-xs-3 col-sm-3 col-md-3"></div>
  <div class="col-xs-4 col-sm-4 col-md-4">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-complete.png"/>
  </div>
</div>

<p>
  In the CMMN XML file, add the following sentry definition and register it for the <em>Provide Customer Rating</em> human task:
</p>

<div class="app-source" data-source-code="loan-application-06.cmmn10.xml" annotate="code-annotations" highlight="6;23-32"></div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    Again, rebuild and redeploy the project.
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/tasklist-check-application-variable-unchecked.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    Go to Tasklist and access the <code>demo</code> user's tasks. As before, check the task <em>Check Application</em>. In order to trigger the sentry, add the variable <code>applicationSufficient</code> of type <code>Boolean</code>, but this time make sure to leave the check box unchecked. Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.
  </div>
</div>

<p>
  You will notice that the task <em>Provide Customer Rating</em> has disappeared from the Tasklist. That is because the sentry has been triggered and the task's exit criterion has been fulfilled. Also, you can check the Tomcat console. This time, there is no log entry for the milestone.
</p>

<p>
  To learn more about sentries, consider checking the <a href="ref:/api-references/cmmn10/#sentries-sentry">Sentry section</a> in our CMMN implementation guide.
</p>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-6"}) %>

# Done!

<div class="row">
  <div class="col-md-12">
    <p>
      Congratulations, you have now successfully deployed your first CMMN Application with Camunda!
    </p>
    <h3>Where to go from here?</h3>
    <ul>
      <li>
        <a href="http://docs.camunda.org/latest/api-references/cmmn10/">Learn more about CMMN and how it can be implemented with Camunda BPM</a>
      </li>
      <li>
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://docs.camunda.org/latest/guides/getting-started-guides/"
           data-text="Whohoo! I just developed my first #CMMN Application with @CamundaBPM." data-size="large" data-hashtags="camunda">Tweet</a>
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
  <artifactId>loan-approval-cmmn</artifactId>
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
package org.camunda.bpm.getstarted.cmmn.loanapproval;

import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;

@ProcessApplication("Loan Approval App CMMN")
public class LoanApprovalApplication extends ServletProcessApplication {
  // empty implementation
}
</script>

<script type="text/xml" id="LoanApprovalEjbApplication">
@ProcessApplication("Loan Approval App CMMN")
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

  <process-archive name="loan-approval-cmmn">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
</script>

<script type="text/xml" id="loan-application-01.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">

    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>

<script type="text/xml" id="loan-application-02.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>

      <!-- Plan Item Definitions -->
      <cmmn:humanTask isBlocking="true" name="Check Application" id="HumanTask_1" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>

<script type="text/xml" id="loan-application-03.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>
      <cmmn:planItem definitionRef="HumanTask_2" id="PI_HumanTask_2"/>

      <!-- Plan Item Definitions -->
      <cmmn:humanTask isBlocking="true" name="Check Application" id="HumanTask_1" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:humanTask isBlocking="true" name="Provide Customer Rating" id="HumanTask_2" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>

<script type="text/xml" id="loan-application-04.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>
      <cmmn:planItem definitionRef="HumanTask_2" id="PI_HumanTask_2"/>
      <cmmn:planItem definitionRef="Milestone_1" entryCriteriaRefs="Sentry_1" id="PI_Milestone_1"/>

      <!-- Sentries -->
      <cmmn:sentry id="Sentry_1">
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_1">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_2">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:ifPart>
          <cmmn:condition>
            <cmmn:body><![CDATA[${applicationSufficient && rating > 3}]]></cmmn:body>
          </cmmn:condition>
        </cmmn:ifPart>
      </cmmn:sentry>

      <!-- Plan Item Definitions -->
      <cmmn:humanTask isBlocking="true" name="Check Application" id="HumanTask_1" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:humanTask isBlocking="true" name="Provide Customer Rating" id="HumanTask_2" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:milestone name="Approved" id="Milestone_1"/>
    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>

<script type="text/xml" id="loan-application-05.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>
      <cmmn:planItem definitionRef="HumanTask_2" id="PI_HumanTask_2"/>
      <cmmn:planItem definitionRef="Milestone_1" entryCriteriaRefs="Sentry_1" id="PI_Milestone_1"/>

      <!-- Sentries -->
      <cmmn:sentry id="Sentry_1">
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_1">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_2">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:ifPart>
          <cmmn:condition>
            <cmmn:body><![CDATA[${applicationSufficient && rating > 3}]]></cmmn:body>
          </cmmn:condition>
        </cmmn:ifPart>
      </cmmn:sentry>

      <!-- Plan Item Definitions -->
      <cmmn:humanTask isBlocking="true" name="Check Application" id="HumanTask_1" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:humanTask isBlocking="true" name="Provide Customer Rating" id="HumanTask_2" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:milestone name="Approved" id="Milestone_1">
        <cmmn:extensionElements>
          <camunda:caseExecutionListener event="occur" class="org.camunda.bpm.getstarted.cmmn.loanapproval.LifecycleListener" />
        </cmmn:extensionElements>
      </cmmn:milestone>
    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>

<script type="text/xml" id="loan-application-06.cmmn10.xml">
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>
      <cmmn:planItem definitionRef="HumanTask_2" exitCriteriaRefs="Sentry_2" id="PI_HumanTask_2"/>
      <cmmn:planItem definitionRef="Milestone_1" entryCriteriaRefs="Sentry_1" id="PI_Milestone_1"/>

      <!-- Sentries -->
      <cmmn:sentry id="Sentry_1">
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_1">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_2">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:ifPart>
          <cmmn:condition>
            <cmmn:body><![CDATA[${applicationSufficient && rating > 3}]]></cmmn:body>
          </cmmn:condition>
        </cmmn:ifPart>
      </cmmn:sentry>
      <cmmn:sentry id="Sentry_2">
        <cmmn:planItemOnPart sourceRef="PI_HumanTask_1">
          <cmmn:standardEvent>complete</cmmn:standardEvent>
        </cmmn:planItemOnPart>
        <cmmn:ifPart>
          <cmmn:condition>
            <cmmn:body>${!applicationSufficient}</cmmn:body>
          </cmmn:condition>
        </cmmn:ifPart>
      </cmmn:sentry>

      <!-- Plan Item Definitions -->
      <cmmn:humanTask isBlocking="true" name="Check Application" id="HumanTask_1" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:humanTask isBlocking="true" name="Provide Customer Rating" id="HumanTask_2" camunda:assignee="demo">
        <cmmn:defaultControl>
          <cmmn:manualActivationRule>
            <cmmn:condition>
              <cmmn:body>${false}</cmmn:body>
            </cmmn:condition>
          </cmmn:manualActivationRule>
        </cmmn:defaultControl>
      </cmmn:humanTask>
      <cmmn:milestone name="Approved" id="Milestone_1">
        <cmmn:extensionElements>
          <camunda:caseExecutionListener event="occur" class="org.camunda.bpm.getstarted.cmmn.loanapproval.LifecycleListener" />
        </cmmn:extensionElements>
      </cmmn:milestone>
    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
</script>


<script type="text/xml" id="LoanApprovalApplication.postDeploy">
package org.camunda.bpm.getstarted.cmmn.loanapproval;

import org.camunda.bpm.application.PostDeploy;
import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;
import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.variable.Variables;

@ProcessApplication("Loan Approval App CMMN")
public class LoanApprovalApplication extends ServletProcessApplication {

  @PostDeploy
  public void startCaseInstance(ProcessEngine processEngine) {
    CaseService caseService = processEngine.getCaseService();
    caseService.createCaseInstanceByKey("loan_application",
        Variables.createVariables()
          .putValue("applicationSufficient", Variables.booleanValue(null))
          .putValue("rating", Variables.integerValue(null)));

  }
}
</script>

<script type="text/xml" id="LifecycleListener">
package org.camunda.bpm.getstarted.cmmn.loanapproval;

import java.util.logging.Logger;

import org.camunda.bpm.engine.delegate.CaseExecutionListener;
import org.camunda.bpm.engine.delegate.DelegateCaseExecution;

public class LifecycleListener implements CaseExecutionListener {

  private final static Logger LOGGER = Logger.getLogger("LOAN-REQUESTS-CMMN");

  public void notify(DelegateCaseExecution caseExecution) throws Exception {
    LOGGER.info("Plan Item '" + caseExecution.getActivityId() + "' labeled '"
        + caseExecution.getActivityName() + "' has performed transition: "
        + caseExecution.getEventName());
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
  "loan-approval-cmmn": "The name of the process engine deployment to be constructed.",
  "default": "The name of the process engine we want to use (you can start multiple process engines).",
  "isDeleteUponUndeploy": "Controls if the process engine deployment should be removed when the process application is undeployed. If set to true, all process instances are deleted in the database when the WAR file is removed from the server.",
  "isScanForProcessDefinitions": "If set to true, the WAR file is automatically scanned for process definitions. All files ending in <code>.cmmn10.xml</code> or <code>.cmmn</code> are automatically picked up."
  },

  "LoanApprovalApplication.postDeploy":
  {
  "@PostDeploy": "This method is called directly after the process application is deployed."
  },
  "loan-application-01.cmmn10.xml":
  {
  "loan_application" : "This identifier is the <em>key</em> of the case definition."
  },
  "loan-application-02.cmmn10.xml":
  {
  "planItem": "Plan items represent instances of tasks at runtime. In contrast, the <code>humanTask</code> element serves as a static blueprint.",
  "manualActivationRule" : "In contrast to BPMN, CMMN tasks must be manually activated before they become active. This rule specifies that the tasks should be automatically activated, thereby simplifying our tutorial."
  },
  "loan-application-04.cmmn10.xml":
  {
  "entryCriteriaRefs": "The entry criterion expresses a precondition that must hold before the milestone can be started. It references a sentry.",
  "sentry": "Sentries capture events that happen within a case and can be used to trigger or terminate tasks and other plan items. This sentry <em>occurs</em> when the two human tasks are completed and when the <code>applicationSufficient</code> variable is <code>true</code> and the <code>rating</code> variable has a value greater than 3."
  },
  "loan-application-05.cmmn10.xml":
  {
  "event": "The listener is only called when the state transition <em>occur</em> takes place. If you remove this attribute, the listener is called for every state transition of the milestone."
  },
  "loan-application-06.cmmn10.xml":
  {
  "exitCriteriaRefs": "When the exit criterion is fulfilled, this plan item gets terminated."
  }
}
</script>
</div>
