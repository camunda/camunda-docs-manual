---
title: 'Add Send Rejection Email Service Task'
category: 'Tutorial'
---

If the user disapproves the pizza order an email is sent to inform the customer. This will be simulated by a simple log output.

###Extend Order Business Logic EJB

The EJB is extended with a method which logs an informative message for the rejection of the order.

<div class="app-source" data-source-code="OrderBusinessLogic3" annotate="code-annotations"></div>

###Configure the Service Task in the Process

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

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-8"}) %>
