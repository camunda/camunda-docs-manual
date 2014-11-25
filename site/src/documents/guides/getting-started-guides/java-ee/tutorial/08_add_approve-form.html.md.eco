---
title: 'Add Approve Order Task Form'
category: 'Tutorial'
---

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

###Add a CDI Bean to the Process Application

To update the persisted entity we use a named CDI Bean `ApproveOrderController`. To gather the persisted order entity, we get the order id from the process variables of the `businessProcess`. With the id we can load the order entity trough the order business logic. After the order has been updated, the detached entity state is merged by the order business logic.

<div class="app-source" data-source-code="ApproveOrderController" annotate="code-annotations"></div>

###Extend Order Business Logic

The order business logic is extended to provide a method to load an order entity from the database by order id, to merge a detached order entity and to complete the task form. For that, the task form is injected, which is provided by the camunda CDI artifact.

Please note that the merging of the detached order entity and the completion of the task form are intentionally placed in one method. This ensures that both operations are executed in a single transaction. An error during that transaction will rollback both changes.

<div class="app-source" data-source-code="OrderBusinessLogic2" annotate="code-annotations"></div>

###Add a Task Form

Go back to eclipse and add a file named `approveorder.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="approveorder.xhtml" annotate="code-annotations"></div>

The JSF view displays the order properties and provides a checkbox to approve the order on submit. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startTaskForm()` method which extracts the task id from the URL and starts a conversation for the task form.

When the user approves or disapproves the order, it is directly set on the cached order entity.

On form submit, the `approveOrderController.submitForm()` method calls the EJB `mergeOrderAndCompleteTask` method with the cached order entity. The EJB will merge the updated order entity if necessary and completes the task form.

###Configure the Task Form in the Process

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

###Configure the Conditional Sequence Flows in the Process

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

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-6"}) %>
