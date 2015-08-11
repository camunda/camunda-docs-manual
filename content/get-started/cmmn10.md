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
    Install
  </dt>
  <dd>
     the Camunda BPM platform on your machine. In this tutorial we use the Apache Tomcat based distribution.
  </dd>
  <dt>
    Set up
  </dt>
  <dd>
    an Apache Maven based process application inside eclipse and deploy it to the Camunda BPM platform.
  </dd>
  <dt>
    Create a Case
  </dt>
  <dd>
    We will create and configure a fully executable CMMN case in XML.
  </dd>
  <dt>
    Create Human Tasks
  </dt>
  <dd>
    We will add human tasks to the CMMN case and use the Camunda Tasklist to complete the tasks.
  </dd>
  <dt>
    Event-driven Actions
  </dt>
  <dd>
     You will learn how to activate and cancel tasks in CMMN, based on events.
  </dd>
</dl>

**A note on modeling CMMN**:
CMMN is a young standard for which there are not many modeling tools yet. Currently, Camunda does not offer a modeling tool. We have had good experiences with the <a href="http://www.cmmnwebmodeler.com/">Trisotech CMMN modeler</a> that offers a free 30 day trial. You can use it to graphically model along the steps we perform in this tutorial. However, this tutorial does not teach you how to use that modeler.

{{< get-code repo="camunda-get-started-cmmn" >}}

# Download and Installation

{{< note title="Before you start" class="info" >}}

Make sure you have the following set of tools installed:

* Java JDK 1.6+,
* Apache Maven (optional, if not installed you can use embedded Maven inside eclipse.)
* A modern web browser (recent Firefox, Chrome, or Internet Explorer 9+ will work fine)

{{< /note >}}

First, download a distribution of the Camunda BPM platform. You can choose from different distributions for various application servers. In this tutorial, we will use the Apache Tomcat 7 based distribution. Download it [here](http://camunda.org/download). Make sure you choose a version >= 7.2.0.

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory `$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the Camunda BPM platform, execute the script named `start-camunda.bat` (for Windows users), respectively `start-camunda.sh` (for Unix users).

This script will start the application server and open a welcome screen in your web browser. If the page does not open, go to [http://localhost:8080/camunda-welcome/index.html](http://localhost:8080/camunda-welcome/index.html).

{{< note title="Get Help!" class="info" >}}
If you have trouble setting up the Camunda BPM platform, you can ask for assistance in the [Camunda Users Forum](http://camunda.org/community/forum.html).
{{< /note >}}

# Set up your project

Now you are ready to set up your first process application project in eclipse. Setting up a process application project consists of 4 steps:

1. Create a new Maven Project in Eclipse
2. Add the Camunda dependencies
3. Add a `@ProcessApplication` class
4. Add a META-INF/processes.xml deployment descriptor

In the following sections, we go through this process step by step.

{{< note title="Terminology - Process vs. Case" class="info" >}}
CMMN is a modeling language for *cases*, whereas BPMN is a language for <i>processes</i>. This tutorial is about cases. However, due to Camunda's BPMN-focused heritage, the Java project contains classes and files with names like `ProcessApplication` and `processes.xml`. These are in fact generally applicable and can be used with both processes as well as cases.
{{< /note >}}

## Create a new Maven Project in Eclipse

In eclipse, go to `File / New / Other ...`. This opens the *New Project Wizard*. In the *New Project Wizard* select `Maven / Maven Project`. Click Next.

{{< img src="../img/cmmn10/eclipse-new-project.png" >}}
      
On the first page of the *New Maven Project Wizard* select "*Create a simple project (skip archetype selection)*". Click Next.
      
On the second page (see screenshot), configure the Maven coordinates for the project.
      
Since we are setting up a WAR Project, make sure to select `Packaging: war`.
      
When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the *Project Explorer* view.
      
## Add Camunda Maven Dependencies
  
The next step consists of setting up the Maven dependencies for your new process application. Add the following dependencies to the `pom.xml` file of your project:

```xml
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
```
      
Now you can perform the first build. Select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`
      
{{< get-tag repo="camunda-get-started-cmmn" tag="Step-1" >}}

## Add a Process Application Class
  
Next, you need to create a package, e.g., `org.camunda.bpm.getstarted.loanapproval`, and add a Process Application class to it. The Process Application class constitutes the interface between your application and the process engine.
      
```java
package org.camunda.bpm.getstarted.cmmn.loanapproval;

import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.impl.ServletProcessApplication;

@ProcessApplication("Loan Approval App CMMN")
public class LoanApprovalApplication extends ServletProcessApplication {
  // empty implementation
}
```

## Add a META-INF/processes.xml deployment descriptor
  
The last step to set up the process application is to add the `META-INF/processes.xml` deployment descriptor file. This file allows us to provide a declarative configuration of the deployment(s) this process application makes to the process engine.
      
This file needs to be added to the `src/main/resources/META-INF` folder of the Maven project.
      
```xml
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
```

At this point you have successfully set up the process application and you can start creating your first CMMN case.

{{< get-tag repo="camunda-get-started-cmmn" tag="Step-2" >}}

# Create a CMMN Case

In this section you learn how to create your first CMMN 1.0 case in XML. Don't worry, the XML is not going to be complex.

## Create an empty CMMN 1.0 file
  
In the eclipse *Package Explorer* select the `src/main/resources` folder. Right-click and select `New &gt; Other ...`. Select *File*. Click Next.

{{< img src="../img/cmmn10/eclipse-new-file.png" >}}
    
On the second page, you must specify the file name of the case. Insert `loan-approval.cmmn10.xml`. Click Finish.
      
## Set Up the Case Plan Model

{{< img src="../img/cmmn10/cmmn-1.png" >}}

Open the newly created file and copy-paste the following contents into it:

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61" targetNamespace="http://cmmn.org" xmlns:cmmn="http://www.omg.org/spec/CMMN/20131201/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/cmmn">
  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false" name="Loan Application" id="CasePlanModel">

    </cmmn:casePlanModel>
  </cmmn:case>
</cmmn:definitions>
```

This snippet declares a *case plan model*, the essential part of any CMMN case definition.

# Add Human Tasks

{{< img src="../img/cmmn10/cmmn-2.png" >}}

As the first part of the loan application case, the loan application should be reviewed for any formal errors. We therefore add a *human task* to the case. Tasks are always specified by two parts: A *plan item* and a *plan item definition*. While the plan item definition is a blue print for the task's behavior, the plan item represents the actual task instantiation. Update your CMMN definition as follows (insert the highlighted parts at the appropriate positions or simply replace the entire content):

```xml
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
```

In addition, the customer's creditworthiness has to be assessed. We add another user task:

```xml
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
```

Note how there is no direct relation between the two plan items. There is no sequence flow connecting the two tasks as in BPMN. In CMMN, this expresses that the tasks can be executed concurrently.
  
To learn more about human tasks, consider checking the [Human Task section]({{< relref "reference/cmmn10/tasks/human-task.md" >}}) of our CMMN implementation guide.
  
{{< get-tag repo="camunda-get-started-cmmn" tag="Step-3" >}}

# Deploy the Process Application

In this step, we make our first deployment to a Camunda instance.

## Configure Case Instantiation
    
In order to directly create a case instance after deployment, add the following method to your `LoanApprovalApplication` class:

```java
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
```

## Build the Process Application
    
A Process Application is an ordinary Java Web Application and is deployed in exactly the same way.

Select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`. This will generate a WAR file named `loan-approval-cmmn-0.1.0-SNAPSHOT.war` In the `target/` folder of your Maven project.

{{< note title="Hint" class="info" >}}    
If the `loan-approval-cmmn-0.1.0-SNAPSHOT.war` file is not visible after having performed the Maven build, you need to refresh the project (F5) in eclipse.
{{< /note >}}
    
## Deploy to Apache Tomcat
    
In order to deploy the process application, copy-paste the `loan-approval-cmmn-0.1.0-SNAPSHOT.war` from your Maven project to the `$CAMUNDA_HOME/server/apache-tomcat/webapps` folder.
    
Check the log file of the Apache Tomcat server. If you see the following log message, the deployment was successful:
    
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

## Check with Camunda Tasklist

Now use Camunda Tasklist to check if the case was instantiated. Go to Camunda Tasklist (<a href="http://localhost:8080/camunda/app/tasklist" target="_blank">http://localhost:8080/camunda/app/tasklist</a>).

{{< img src="../img/cmmn10/tasklist-overview.png" >}}

Log in with demo / demo. After you have logged in, click on the filter *My Tasks*. There should be two tasks listed with names *Check Application* and *Provide Customer Rating*. Select the task *Check Application*.

{{< img src="../img/cmmn10/tasklist-check-application.png" >}}

The Tasklist displays a generic form that can be used whenever you have not added a dedicated form for a Human Task. You can use it to add variables to the case. For now, we leave it empty. Just click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.
    
    
Do the same with the task *Provide Customer Rating*. Both tasks have now completed and there is no more work to be done in this case instance.
    
{{< get-tag repo="camunda-get-started-cmmn" tag="Step-4" >}}

# Add a Milestone

{{< img src="../img/cmmn10/cmmn-3.png" >}}

In the next step, we are going to add a *milestone*. In CMMN, a milestone expresses that a certain intermediate goal in the case has been reached.

Go back to eclipse and the CMMN model file. Insert the following XML:

```xml
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
```

The above does not only add a milestone but also a *sentry*. Sentries are used to capture conditions within a case and can trigger other events to occur. Here we have expressed that the milestone *Approved* is reached when both tasks have successfully completed, and if the application was sufficient and the customer received a good rating for creditworthiness.

Milestones are not visualized in the Camunda web applications. In order to see that the milestone occurs we add a *CaseExecutionListener*. Create a new Java class in the project:

```java
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
```

To register the listener with the milestone, update the milestone in `loan-approval.cmmn10.xml` as follows:

```xml
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
```

When you are done, save all resources, perform a Maven build and redeploy the process application.

{{< note title="Hint" class="info" >}}
It is best practice to perform a `clean install` build to make sure all resources are replaced with their newest version.
{{< /note >}}

Now you can open the Tasklist and access the `demo` user's tasks. First click on the task *Check Application*. Click on `Add a variable`. In the field `Name`, enter `applicationSufficient`. For `Type`, select `Boolean`. Make sure to tick the check box that now appeared.

{{< img src="../img/cmmn10/tasklist-check-application-variable.png" >}}

Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.

{{< img src="../img/cmmn10/tasklist-provide-rating-variable.png" >}}

Next, complete the task `Provide Customer Rating`. Again, click on `Add a variable` and name the variable `rating`. Set the type to `Integer` and the value to `4`. Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.

Now open the Tomcat console. You have completed the tasks and set the variables accordingly so that the milestone has occurred. On the console, you should see the following log entries:

<pre class="console">
org.camunda.bpm.getstarted.cmmn.loanapproval.LifecycleListener notify
INFORMATION: Plan Item 'PI_Milestone_1' labeled 'Approved' has performed transition: occur
</pre>

Our lifecycle listener has been notified, showing that the milestone has actually occurred.

To learn more about milestones, consider checking the [Milestone section]({{< relref "reference/cmmn10/milestone.md" >}}) in our CMMN implementation guide.

{{< get-tag repo="camunda-get-started-cmmn" tag="Step-5" >}}

# Add an Exit Criterion

When a loan application is not sufficient, for example because it has formal errors, there is no need to provide a customer rating any longer. We can express this in CMMN by adding a sentry.

{{< img src="../img/cmmn10/cmmn-complete.png" >}}

In the CMMN XML file, add the following sentry definition and register it for the *Provide Customer Rating* human task:

```xml
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
```

Again, rebuild and redeploy the project.

{{< img src="../img/cmmn10/tasklist-check-application-variable-unchecked.png" >}}

Go to Tasklist and access the `demo` user's tasks. As before, check the task *Check Application*. In order to trigger the sentry, add the variable `applicationSufficient` of type `Boolean`, but this time make sure to leave the check box unchecked. Click <button class="btn btn-xs btn-primary" type="submit">Complete</button>.

You will notice that the task *Provide Customer Rating* has disappeared from the Tasklist. That is because the sentry has been triggered and the task's exit criterion has been fulfilled. Also, you can check the Tomcat console. This time, there is no log entry for the milestone.

To learn more about sentries, consider checking the [Sentry section]({{< relref "reference/cmmn10/sentry.md" >}}) in our CMMN implementation guide.

{{< get-tag repo="camunda-get-started-cmmn" tag="Step-6" >}}

# Done!

Congratulations, you have now successfully deployed your first CMMN Application with Camunda!
    
Where to go from here?

* [Learn more about CMMN and how it can be implemented with Camunda BPM]({{< relref "reference/cmmn10/index.md" >}})


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
  "isScanForProcessDefinitions": "If set to true, the WAR file is automatically scanned for process definitions. All files ending in `.cmmn10.xml` or `.cmmn` are automatically picked up."
  },

  "LoanApprovalApplication.postDeploy":
  {
  "@PostDeploy": "This method is called directly after the process application is deployed."
  },
  "loan-application-01.cmmn10.xml":
  {
  "loan_application" : "This identifier is the *key* of the case definition."
  },
  "loan-application-02.cmmn10.xml":
  {
  "planItem": "Plan items represent instances of tasks at runtime. In contrast, the `humanTask` element serves as a static blueprint.",
  "manualActivationRule" : "In contrast to BPMN, CMMN tasks must be manually activated before they become active. This rule specifies that the tasks should be automatically activated, thereby simplifying our tutorial."
  },
  "loan-application-04.cmmn10.xml":
  {
  "entryCriteriaRefs": "The entry criterion expresses a precondition that must hold before the milestone can be started. It references a sentry.",
  "sentry": "Sentries capture events that happen within a case and can be used to trigger or terminate tasks and other plan items. This sentry *occurs* when the two human tasks are completed and when the `applicationSufficient` variable is `true` and the `rating` variable has a value greater than 3."
  },
  "loan-application-05.cmmn10.xml":
  {
  "event": "The listener is only called when the state transition *occur* takes place. If you remove this attribute, the listener is called for every state transition of the milestone."
  },
  "loan-application-06.cmmn10.xml":
  {
  "exitCriteriaRefs": "When the exit criterion is fulfilled, this plan item gets terminated."
  }
}
</script>

