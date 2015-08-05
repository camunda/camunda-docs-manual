---
title: 'Add Pizza Order Form'
category: 'Tutorial'
---

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

###Add a Start Form

Go back to eclipse and add a file named `placeorder.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="placeorder.xhtml" annotate="code-annotations"></div>

The JSF view creates a simple input form for a customer name, address and a pizza selection. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startProcessInstanceByKeyForm()` method which extracts the process definition key from the URL and starts a conversation for the start form.

The user input inside the form fields are saved as a map of process variables inside the conversation.

When the form is submitted, the `camundaTaskForm.completeProcessInstanceForm()` method starts a new process instance by the process definition key which was determined by the `startProcessInstanceByKeyForm()` method. Additionally, the process variables set by the user are passed to the process instance.


###Configure the Start Form in the Process

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

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-4"}) %>
