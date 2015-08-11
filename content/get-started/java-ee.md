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
    Install
  </dt>
  <dd>
    the camunda BPM platform on your machine. In this tutorial we use the JBoss based distribution.
  </dd>
  <dt>
    Set up
  </dt>
  <dd>
    an Apache Maven-based process application inside eclipse and deploy it to the camunda BPM platform.
  </dd>
  <dt>
    Create Task Forms
  </dt>
  <dd>
    We will explore how to use JSF forms in camunda BPM.
  </dd>
  <dt>
    JPA
  </dt>
  <dd>
    You will learn how use JPA to persist entities and use them during the process.
  </dd>
  <dt>
    EJB
  </dt>
  <dd>
    You will learn how use EJBs to encapsulate your JPA transactions.
  </dd>
</dl>

# Download and Installation

{{< note title="Before you start" class="info" >}}
Make sure you have the following set of tools installed:

* Java JDK 1.6+
* Apache Maven (optional, if not installed you can use embedded Maven inside eclipse.)
* A modern Web browser (recent Firefox, Chrome, or Internet Explorer 9+ will work fine)

{{< /note >}}

## Install Camunda BPM platform

First, download a distribution of the camunda BPM platform. You can choose from different application servers. In this tutorial, we will use the JBoss AS 7 based distribution. Download it [here](http://camunda.org/download/).

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory
`$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the camunda BPM platform, execute the script named
`start-camunda.bat` for Windows users, respectively `start-camunda.sh` for Unix users.

This script will start the application server and open a welcome screen in your Web browser.
If the page does not open, go to http://localhost:8080/camunda-welcome/index.html.

{{< note title="Getting Help" class="info" >}}
If you have trouble setting up the camunda BPM platform, you can ask for assistance in the [Forum](http://camunda.org/community/forum.html).
{{< /note >}}

## Install Camunda Modeler

Follow the instructions in the [camunda Modeler]({{< relref "installation/eclipse-plugin.md" >}}) section.

{{< get-code repo="camunda-get-started-javaee" >}}


# Set up your project

Now you are ready to set up your Java EE process application project in eclipse. Setting up a process application project consists of 6 steps:

1. Create a new Maven Project in Eclipse
2. Add the Maven dependencies
3. Add a WEB-INF/beans.xml deployment descriptor
4. Add a WEB-INF/faces-config.xml deployment descriptor
5. Add a META-INF/persistence.xml deployment descriptor
6. Add a META-INF/processes.xml deployment descriptor

In the following sections, we go through this process step by step.

## Create a new Maven Project in Eclipse

{{< img src="../img/javaee/maven-project-settings.png" >}}

In eclipse, go to `File / New / Other ...`. This opens the *New Project Wizard*. In the *New Project Wizard* select `Maven / Maven Project`. Click Next.

On the first page of the *New Maven Project Wizard* select &quot;*Create a simple project (skip archetype selection)*&quot;. Click Next.

On the second page (see screenshot), configure the Maven coordinates for the project.

As we are setting up a WAR Project, make sure to select `Packaging: war`.

When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the *Project Explorer* view.

## Add Maven Dependencies
  
The next step consists of setting up the Maven dependencies for your new process application. Add the following dependencies to the `pom.xml` file of your project:

```xml
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
```

As dependencies you need the camunda engine and camunda engine CDI package. The CDI package provide you with beans to easily interact with the process engine and the ability to resolve CDI beans from inside the BPMN process XML.

We also use the camunda EJB client to interact with the process engine, which provides a default implementation of the `EjbProcessApplication`. This dependency is not necessary if you want to implement your own `EjbProcessApplication`.

The JBoss JavaEE spec dependency helps us to develop the application. It is only necessary during development so the `scope` is set to provided. The JBoss AS already contains this interfaces.

Now you can perform the first build. Select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`
  
{{< get-tag repo="camunda-get-started-javaee" tag="Step-1" >}}

## Add a WEB-INF/beans.xml deployment descriptor
  
After we have all of our maven dependencies configured, we can add our first deployment descriptor. The `WEB-INF/beans.xml` is used to configure a CDI application. It's presence is always mandatory but it can be empty, as it is in our case. For further information, please see [this explanation](http://www.cdi-spec.org/faq/).

This file needs to be added to the `src/main/webapp/WEB-INF` folder of the Maven project.

## Add a WEB-INF/faces-config.xml deployment descriptor
  
The next step is to configure the JSF component. This is done by adding the `WEB-INF/faces-config.xml` to your project. We use the default configuration, so you only have to add the file without any additional configuration.
  
This file needs to be added to the `src/main/webapp/WEB-INF` folder of the Maven project.
  
```xml
<?xml version="1.0" encoding='UTF-8'?>
<faces-config version="2.0" xmlns="http://java.sun.com/xml/ns/javaee"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
         http://java.sun.com/xml/ns/javaee/web-facesconfig_2_0.xsd">

</faces-config>
```

## Add a META-INF/persistence.xml deployment descriptor
  
To configure JPA, we add the `META-INF/persistence.xml` file. We use the same data source as the process engine which is configured inside the `standalone.xml` of the JBoss distribution.

Additionally, we configure the H2 database to drop the database schema on redeployment and to log SQL queries. This configuration is useful during development.
  
This file needs to be added to the `src/main/resources/META-INF` folder of the Maven project.

```xml
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
```

## Add a META-INF/processes.xml deployment descriptor
  
The last step for setting up the process application is adding the `META-INF/processes.xml` deployment descriptor file. This file allows us to provide a declarative configuration of the deployment(s) that this process application makes to the process engine.
  
This file needs to be added to the `src/main/resources/META-INF` folder of the Maven project.
  
```xml
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
```

At this point you have successfully set up the process application you can start modeling your process.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-2" >}}

# Model a Process

In this section we model our sample process with the camunda Modeler.

## Create a new BPMN 2.0 Diagram

{{< img src="../img/developing-process-applications/eclipse-new-bpmn-diagram.png" >}}

In the eclipse *Package Explorer* select the `src/main/resources` folder. Right-click and select `New &gt; Other ...`. Go to the folder `Other` and select *BPMN 2.0 Diagram*. Click Next.

On the second page, you must specify the file name of the process. Insert *pizza-order.bpmn*. Click Finish.

## Create the Sample Pizza Order Process

{{< img src="../img/javaee/pizza-order-process.png" >}}

The sample process models a pizza order approval. In the first service task, the order should be persisted to our database. The next step is the approval of the order by a user. Based on his decision, the pizza will be prepared or a rejection email is sent.

Since we are modeling an executable process, we should give it an ID, a name and set the `isExecutable` property to `true`. Open the properties view and click on a free spot of the modeling canvas. This displays the properties of the process itself.

## Configure Placeholder Expressions

{{< img src="../img/javaee/pizza-order-expression-true.png" >}}

{{< img src="../img/javaee/pizza-order-process-conditional-expression.png" >}}

Additionally, you have to configure some placeholder expressions for the service tasks and the conditional sequence flows. Otherwise, you wouldn't be able to deploy this process on the process engine. Please set the `Expression` property of both service tasks to `${true}`. Also set the `Condition` property of the sequence flows after the exclusive gateway to `${true}`, respectively `${false}`.

When you are done, save your changes.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-3" >}}

# Deploy the Process Application

To deploy the process application select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`. This will generate a WAR file named `pizza-order.war` in the `target/` folder of your Maven project.

If the `pizza-order.war` file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.

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

{{< img src="../img/javaee/start-form.png" >}}

As a next step, we want to add an actual JSF start form.

## Add a Start Form

Go back to eclipse and add a file named `placeorder.xhtml` to the `src/main/webapp` folder. Add the following content:

```html
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
        
          <label for="pizza">Pizza</label>
          <h:selectOneMenu id="pizza" value="#{processVariables['pizza']}">
              <f:selectItem itemValue="Margarita" itemLabel="Margarita"/>
              <f:selectItem itemValue="Salami" itemLabel="Salami"/>
              <f:selectItem itemValue="Tonno" itemLabel="Tonno"/>
              <f:selectItem itemValue="Prosciutto" itemLabel="Prosciutto"/>
          </h:selectOneMenu>
        
        
          <label for="customer">Customer</label>
          <!-- create process variables using the processVariables map. -->
          <h:inputText id="customer" value="#{processVariables['customer']}" required="true" />
        
        
          <label for="address">Address</label>
          <!-- create process variables using the processVariables map. -->
          <h:inputText id="address" value="#{processVariables['address']}" required="true" />
        
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
```

The JSF view creates a simple input form for a customer name, address and a pizza selection. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startProcessInstanceByKeyForm()` method which extracts the process definition key from the URL and starts a conversation for the start form.

The user input inside the form fields are saved as a map of process variables inside the conversation.

When the form is submitted, the `camundaTaskForm.completeProcessInstanceForm()` method starts a new process instance by the process definition key which was determined by the `startProcessInstanceByKeyForm()` method. Additionally, the process variables set by the user are passed to the process instance.

## Configure the Start Form in the Process

{{< img src="../img/javaee/pizza-order-process-start-form.png" >}}

Open the process with the modeler plugin. Click on the start event. In the properties view, set the `Form Key` property to `app:placeorder.jsf`. This means that we want to use an external JSF form and that the form is loaded from the application.

When you are done, save all resources, perform a Maven build and redeploy the process application.

{{< note title="Hint" class="info" >}}
It is best practice to perform a `clean install` build to make sure all resources are replaced with their newest version.
{{< /note >}}

If you open the Tasklist and start a new process instance for the pizza order process, the JSF form is displayed.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-4" >}}

# Add EJB Service Task

After the process has been started with the new order as process variables, we want to persist the order to the database and only save the newly generated order id as process variable.

## Add an Entity Bean to the Process Application

To persist the entity with JPA, we add an entity bean to our process application. The entity class has to be annotated with `@Entity` and needs an `@Id` field. We also add a `@Version` field to the entity bean. This enables optimistic locking and ensures integrity during merges.

```java
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
```

## Add an EJB to the Process Application

The next step is to add a stateless EJB to the process application which is called by the process. In this EJB we inject the entity manager. It is used to manage our persistent objects during the session.

In the method `persistOrder`, a new instance of the order entity is created and the order instance will be initialized with the values which are currently saved as process variables. After the newly created instance is flushed to the database, its order id is set and the other process variables are no longer needed, so we remove the order properties and only add the order id as a process variable.

```java
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
```

## Configure the EJB in the Process

{{< img src="../img/javaee/pizza-order-process-service-task-expression.png" >}}

Use the properties view of the Persist Service Task in the process (see screenshot). You need to enter `${orderBusinessLogic.persistOrder(execution)}` as the `Expression` property. This will call the `persistOrder` method of the named EJB with the current execution as parameter.

Build, deploy and execute the process. After completing the *Persist Order* step, check the logfile of the JBoss AS server. It will show an insert for the new order entity:

<pre class="console">
11:36:11,659 INFO  [stdout] (http-/127.0.0.1:8080-1) Hibernate: insert into OrderEntity (address, approved, customer, pizza, version, id) values (?, ?, ?, ?, ?, ?)
</pre>

{{< get-tag repo="camunda-get-started-javaee" tag="Step-5" >}}

# Add JSF Task Form

{{< img src="../img/javaee/approve-order.png" >}}

After the order has been persisted, a user can approve the order. For that, a task form is needed to display the order information.

## Add a CDI Controller Bean

To update the persisted entity we use a named CDI Bean `ApproveOrderController`. To gather the persisted order entity, we get the order id from the process variables of the `businessProcess`. With the id we can load the order entity trough the order business logic. After the order has been updated, the detached entity state is merged by the order business logic.

```java
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
```

## Extend Order Business Logic

The order business logic is extended to provide a method to load an order entity from the database by order id, to merge a detached order entity and to complete the task form. For that, the task form is injected, which is provided by the camunda CDI artifact.

Please note that the merging of the detached order entity and the completion of the task form are intentionally placed in one method. This ensures that both operations are executed in a single transaction. An error during that transaction will rollback both changes.

```java
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
```

## Create the JSF Form Task Form

Go back to eclipse and add a file named `approveorder.xhtml` to the `src/main/webapp` folder. Add the following content:

```html
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
  Customer: #{approveOrderController.orderEntity.customer}
  Address: #{approveOrderController.orderEntity.address}
  Pizza: #{approveOrderController.orderEntity.pizza}
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
```

The JSF view displays the order properties and provides a checkbox to approve the order on submit. Additionally, an event listener is configured which is triggered before the view is rendered. It will call the `camundaTaskForm.startTaskForm()` method which extracts the task id from the URL and starts a conversation for the task form.

When the user approves or disapproves the order, it is directly set on the cached order entity.

On form submit, the `approveOrderController.submitForm()` method calls the EJB `mergeOrderAndCompleteTask` method with the cached order entity. The EJB will merge the updated order entity if necessary and completes the task form.

## Configure the Task Form in the Process

{{< img src="../img/javaee/pizza-order-process-task-form.png" >}}

Open the process with the modeler plugin. Click on the approve order user task. In the properties view, set the `Form Key` property to `app:approveorder.jsf`. This means that we want to use an external JSF form and that the form is loaded from the `app` location.

# Configure the Conditional Sequence Flows in the Process

{{< img src="../img/javaee/pizza-order-yes.png" >}}

{{< img src="../img/javaee/pizza-order-no.png" >}}

Open the process with the modeler plugin. In the properties view, set the `Condition` property of the conditional sequence flows after the exclusive gateway to `${orderBusinessLogic.getOrder(orderId).approved}` respectively `${not orderBusinessLogic.getOrder(orderId).approved}`.

When you are done, save all resources, perform a Maven build and redeploy the process application. You can now approve the pizza order from the tasklist.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-6" >}}

# Complete the Process

## Add Prepare Pizza Task Form

{{< img src="../img/javaee/prepare-pizza.png" >}}

If the user approves the pizza order the pizza has to be prepared. So we add a user task form in which the user can confirm that preparation of the pizza has been completed.

Go back to eclipse and add a file named `preparepizza.xhtml` to the `src/main/webapp` folder. Add the following content:

```html
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
```

A new conversation is started again before the view is rendered and the task is completed after the form has been submitted. The form only contains a single button.

{{< img src="../img/javaee/pizza-order-prepare-pizza.png" >}}

Open the process with the modeler plugin. Click on the prepare pizza user task. In the properties view, set the `Form Key` property to `app:preparepizza.jsf`.

When you are done, save all resources, perform a Maven build and redeploy the process application.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-7" >}}

## Add Send Rejection Email Service Task

If the user disapproves the pizza order an email is sent to inform the customer. This will be simulated by a simple log output.

The EJB is extended with a method which logs an informative message for the rejection of the order.

```html
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
```

{{< img src="../img/javaee/pizza-order-process-send-rejection-email.png" >}}

Open the process with the modeler plugin. Click on the reject email service task. In the properties view, set the `Expression` property to `${orderBusinessLogic.rejectOrder(execution)}`.

When you are done, save all resources, perform a Maven build and redeploy the process application.

{{< get-tag repo="camunda-get-started-javaee" tag="Step-8" >}}

# Done

Congratulations, you have now successfully deployed your Java EE Process Application!

Where to go from here?

* [Learn more about BPMN](http://camunda.org/bpmn/tutorial.html)
* [BPMN 2.0 Implementation Reference]({{< relref "reference/bpmn20/index.md" >}})


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
      "isScanForProcessDefinitions": "If set to true, the WAR file is automatically scanned for process definitions. All files ending in `.bpmn20.xml` or `.bpm` are automatically picked up."
      }
    }
  </script>

