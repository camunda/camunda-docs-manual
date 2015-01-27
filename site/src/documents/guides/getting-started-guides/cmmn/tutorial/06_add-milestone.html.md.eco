---
title: 'Add a Milestone'
category: 'Tutorial'
---

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
