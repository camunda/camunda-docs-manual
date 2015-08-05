---
title: 'Add Prepare Pizza Task Form'
category: 'Tutorial'
---

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

###Add a User Task Form

Go back to eclipse and add a file named `preparepizza.xhtml` to the `src/main/webapp` folder. Add the following content:

<div class="app-source" data-source-code="preparepizza.xhtml" annotate="code-annotations"></div>

A new conversation is started again before the view is rendered and the task is completed after the form has been submitted. The form only contains a single button.

###Configure the User Task Form in the Process

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

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-7"}) %>
