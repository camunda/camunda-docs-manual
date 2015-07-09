---
title: 'Deploy the Process Application'
category: 'Tutorial'
---

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

### Check with camunda Cockpit

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

### Start a process instance

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

### Authorize user john for process definitions

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

### Work on the task

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
