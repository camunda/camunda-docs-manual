---
title: 'You made it!'
category: 'Tutorial'
shortTitle: 'Done!'
---

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
