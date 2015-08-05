---
title: 'Add Persist Service Task'
category: 'Tutorial'
---

After the process has been started with the new order as process variables, we want to persist the order to the database and only save the newly generated order id as process variable.

###Add an Entity Bean to the Process Application

To persist the entity with JPA, we add an entity bean to our process application. The entity class has to be annotated with `@Entity` and needs an `@Id` field. We also add a `@Version` field to the entity bean. This enables optimistic locking and ensures integrity during merges.

<div class="app-source" data-source-code="OrderEntity" annotate="code-annotations"></div>

###Add an EJB to the Process Application

The next step is to add a stateless EJB to the process application which is called by the process. In this EJB we inject the entity manager. It is used to manage our persistent objects during the session.

In the method `persistOrder`, a new instance of the order entity is created and the order instance will be initialized with the values which are currently saved as process variables. After the newly created instance is flushed to the database, its order id is set and the other process variables are no longer needed, so we remove the order properties and only add the order id as a process variable.

<div class="app-source" data-source-code="OrderBusinessLogic" annotate="code-annotations"></div>

###Configure the EJB in the Process

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

  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-javaee", tag: "Step-5"}) %>
</div>
