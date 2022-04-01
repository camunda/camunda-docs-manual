---

title: "Assert Examples"
weight: 100
layout: "single"

menu:
  main:
    identifier: "assert-examples"
    parent: "user-guide-testing"

---

# Assertions

## Instance: isActive

Assert that a process instance is currently 'active', so neither suspended nor ended:

```java
assertThat(processInstance).isActive();
```

## Instance: isEnded

Assert that a process instance is already ended:

```java
assertThat(processInstance).isEnded();
```


## Instance: isNotEnded

Assert that a process instance is not ended:

```java
assertThat(processInstance).isNotEnded();
```


## Instance: isStarted

Assert that a process instance is started:

```java
assertThat(processInstance).isStarted();
```


## Instance: isSuspended

Assert that a process instance is suspended:

```java
assertThat(processInstance).isSuspended();
```


## Instance: hasPassed

Assert that a process instance has passed a specified activity:

```java
assertThat(processInstance).hasPassed("edit");
```

Assert that a process instance has passed several specified activities:

```java
assertThat(processInstance).hasPassed("edit", "correct");
```


## Instance: hasPassedInOrder

Assert that a process instance has passed several specified activities 
exactly in the given order:

```java
assertThat(processInstance).hasPassedInOrder("edit", "review", "correct");
```

You can even assert that a specific activity has been passed several times:

```java
assertThat(processInstance).hasPassedInOrder("edit", "review", "correct", "review", "correct", "review", "publish");
```

It doesn't matter whether other activities have been passed in between those
specified activities. Everything that matters is that the order is correct.
So in the example just given, this more minimalistic assertion would also pass:

```java
assertThat(processInstance).hasPassedInOrder("edit", "review", "publish");
```


## Instance: hasNotPassed

Assert that a process instance has not passed a specified activity:

```java
assertThat(processInstance).hasNotPassed("edit");
```

Assert that a process instance has not passed any of several specified activities:

```java
assertThat(processInstance).hasNotPassed("edit", "correct");
```


## Instance: hasVariables

Assert that a process instance holds at least one process variable:

```java
assertThat(processInstance).hasVariables();
```

Assert that a process instance holds - aside potential other variables - one or more specified process variables:

```java
assertThat(processInstance)
  .hasVariables("approved")
  .hasVariables("jobAnnouncementId", "approved");
```


## Instance: hasNoVariables

Assert that a process instance holds no process variables at all:

```java
assertThat(processInstance).hasNoVariables();
```


## Instance: hasProcessDefinitionKey

Assert that a process instance is based on a specific process definition:

```java
assertThat(processInstance).hasProcessDefinitionKey("myProcessDefinitionKey");
```


## Instance: hasBusinessKey

Assert that a process instance has a specific business key:

```java
assertThat(processInstance).hasBusinessKey("myBusinessKey");
```


## Instance: isWaitingAt

Assert that a process instance is currently waiting at a specified activity Id:

```java
assertThat(processInstance).isWaitingAt("edit");
```

Assert that a process instance is currently waiting at several specified activity Ids:

```java
assertThat(processInstance).isWaitingAt("edit", "correct");
```


## Instance: isNotWaitingAt

Assert that a process instance is currently NOT waiting at a specified activity Id:

```java
assertThat(processInstance).isNotWaitingAt("edit");
```

Assert that a process instance is currently NOT waiting at several specified activity Ids:

```java
assertThat(processInstance).isNotWaitingAt("edit", "correct");
```


## Instance: isWaitingAtExactly

Assert that a process instance is currently waiting at exactly one specified activity Id:

```java
assertThat(processInstance).isWaitingAtExactly("edit");
```

Assert that a process instance is currently waiting at exactly the several specified activity Ids:

```java
assertThat(processInstance).isWaitingAtExactly("edit", "correct");
```


## Instance: isWaitingFor

Assert that a process instance is currently waiting for a specified message:

```java
assertThat(processInstance).isWaitingFor("myMessage");
```

Assert that a process instance is currently waiting for several specified messages:

```java
assertThat(processInstance).isWaitingFor("myMessage", "yourMessage");
```


## Instance: isNotWaitingFor

Assert that a process instance is currently NOT waiting for a specified message:

```java
assertThat(processInstance).isNotWaitingFor("myMessage");
```

Assert that a process instance is currently NOT waiting for any of several specified messages:

```java
assertThat(processInstance).isNotWaitingFor("myMessage", "yourMessage");
```


## Definition: hasActiveInstances

Assert that a process definition currently has exactly the expected number of 'active' 
(so neither ended nor suspended) instances:

```java
assertThat(processDefinition).hasActiveInstances("1");
```


## Job: hasActivityId

Assert that a job is based on an activity definition with a specific id:

```java
assertThat(job).hasActivityId("ServiceTask_1");
```
 

## Job: hasDeploymentId

Assert that a job has a specific deployment id:

```java
assertThat(job).hasDeploymentId(deploymentId);
```
 

## Job: hasDueDate

Assert that a job is due at a specific date:

```java
assertThat(job).hasDueDate(dueDate);
```


## Job: hasId

Assert a specific internal id for the job:

```java
assertThat(job).hasId(id);
```


## Job: hasRetries

Assert that a job has a specific number of retries left:

```java
assertThat(job).hasRetries(3);
```


## Task: isAssignedTo

Assert that a specified user is assigned to a task:

```java
assertThat(task).isAssignedTo("kermit");
```


## Task: isNotAssigned

Assert that a task is currently not assigned to any user:

```java
assertThat(task).isNotAssigned();
```


## Task: hasCandidateGroup

Assert that a task is is currently waiting to be assigned 
to a user of the specified candidate group.

```java
assertThat(task).hasCandidateGroup("human-resources-department");
```

Note that (in line with Camunda's interpretation of the term 
'candidate') **assigned** tasks will not pass this assertion. 
However, the next assertion discussed here, would pass:                      
                      

## Task: hasCandidateGroupAssociated

Assert the expectation that a task is currently associated to the 
specified candidate group - no matter whether it is already assigned to a 
specific user or not.

```java
assertThat(task).hasCandidateGroupAssociated("human-resources-department");
```


## Task: hasCandidateUser

Assert that a task is currently waiting to be assigned to a specified candidate user:

```java
assertThat(task).hasCandidateUser("kermit");
```

Note that (in line with Camunda's interpretation of the term 
'candidate') **assigned** tasks will not pass this assertion. 
However, the next assertion discussed here, would pass:                      


## Task: hasCandidateUserAssociated

Assert the expectation that a task is currently associated to the 
specified candidate user - no matter whether it is already assigned to a 
specific user or not.

```java
assertThat(task).hasCandidateUserAssociated("kermit");
```


## Task: hasDefinitionKey

Assert that a task has the specified definition key (aka the id attribute of the <code>&lt;userTask id="review-and-approve" .../&gt;</code> element in the process definition BPMN 2.0 XML file):

```java
assertThat(task).hasDefinitionKey("review-and-approve");
```


## Task: hasDescription

Assert that the task has the specified free text description:

```java
assertThat(task).hasDescription("Please review and approve the result document.");
```


## Task: hasDueDate

Assert that a task is due at a specified date:

```java
assertThat(task).hasDueDate(expectedDueDate);
```


## Task: hasFormKey

Assert that a task is associated to a specified form (key):

```java
assertThat(task).hasFormKey("myForm.html");
```


## Task: hasId

Assert that a task has the specified internal id:

```java
assertThat(task).hasId("1");
```


## Task: hasName

Assert that the task has the specified name:

```java
assertThat(task).hasName("Review and approve");
```


## External Task: hasActivityId

Assert that the external task has the specified activity id:

```java
assertThat(externalTask).hasActivityId("review-and-approve");
```


## External Task: hasTopicName

Assert that the external task has the specified topic name:

```java
assertThat(externalTask).hasTopicName("Review and approve");
```


# Helpers


## Finding tasks, events and gateways by name
You can map the name of a task, event or a gateway to it's ID by the means of a static helper method:

```java
findId("My verbose task name");
```


## Claiming tasks

You can directly claim a task by means of a static helper method:

```java
claim(task, "fozzie"); 
```


## Unclaiming tasks

You can directly unclaim a task by means of a static helper method:

```java
unclaim(task); 
```


## Completing tasks

You can directly complete a task by means of a static helper method:

```java
complete(task);
```


## Completing tasks and passing process variables

You can directly construct a map of process variables by passing a sequence 
of key/value pairs to the static helper method "withVariables":

```java
Map<String, Object> variables = withVariables("documentId", 5, "approved", true); 
```

You can therefore e.g. write

```java
complete(task, withVariables("documentId", 5, "approved", true)); 
```


## Completing external tasks

You can directly complete an external task by means of a static helper method:

```java
complete(externalTask);
```


## Completing external tasks and passing process variables

You can directly construct a map of process variables by passing a sequence 
of key/value pairs to the static helper method "withVariables":

```java
Map<String, Object> variables = withVariables("documentId", 5, "approved", true); 
```

You can therefore e.g. write

```java
complete(externalTask, withVariables("documentId", 5, "approved", true)); 
```


## Executing jobs

You can directly execute a job by means of a static helper method:

```java
execute(job());
```


## Creating queries

You can directly create queries by means of a static helper methods:

```java
TaskQuery taskQuery = taskQuery();
JobQuery jobQuery = jobQuery();
ProcessInstanceQuery processInstanceQuery = processInstanceQuery();
ExecutionQuery executionQuery = executionQuery();
```

You can therefore e.g. write

```java
assertThat(processInstance).task(taskQuery().taskAssignee("fozzie")).hasCandidateGroup("human-resources-department");
```


## Accessing engine and engine API services

You can directly access the engine and API services by means of static helper methods:

```java
ProcessEngine engine = processEngine();

AuthorizationService authorizationService = authorizationService();
FormService formService = formService();
HistoryService historyService = historyService();
IdentityService identityService = identityService();
ManagementService managementService = managementService();
RepositoryService repositoryService = repositoryService();
RuntimeService runtimeService = runtimeService();
TaskService taskService = taskService();
```


## Making assertions on the only task of an instance
 
You can retrieve a "chained" task assert inspecting the one and only 
one task currently available in the context of a process instance...

```java
assertThat(processInstance).task();
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).task().isNotAssigned();
```


## Making assertions on a specific task of an instance

You can retrieve a "chained" task assert inspecting a very specific task currently 
available in the context of a process instance...

```java
assertThat(processInstance).task("edit");
```

or

```java
assertThat(processInstance).task(taskQuery().taskAssignee("fozzie"));
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).task("edit").isAssignedTo("fozzie");
```


## Making assertions on the only external task of an instance
 
You can retrieve a "chained" external task assert inspecting the one and only 
one external task currently available in the context of a process instance...

```java
assertThat(processInstance).externalTask();
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).externalTask().hasTopicName("editing");
```


## Making assertions on a specific external task of an instance

You can retrieve a "chained" external task assert inspecting a very specific external task currently 
available in the context of a process instance...

```java
assertThat(processInstance).externalTask("edit");
```

or

```java
assertThat(processInstance).externalTask(externalTaskQuery().activityId("edit"));
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).externalTask("edit").hasTopicName("editing");
```


## Making assertions on the only job of an instance
 
You can retrieve a "chained" job assert inspecting the one and only 
one job currently available in the context of a process instance...

```java
assertThat(processInstance).job();
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).job().hasRetries(0);
```


## Making assertions on a specific job of an instance

You can retrieve a "chained" job assert inspecting a very specific job currently 
available in the context of a process instance...

```java
assertThat(processInstance).job("ServiceTask_1");
```
or

```java
assertThat(processInstance).job(jobQuery().executionId(executionId));
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).job("ServiceTask_1").hasRetries(0);
```


## Making assertions on the only called process of a super process instance
 
You can retrieve a "chained" process instance assert inspecting the one and only 
called process instance currently available in the context of a super process instance...

```java
assertThat(processInstance).calledProcessInstance();
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).calledProcessInstance().hasProcessDefinitionKey("mySubProcessDefinitionKey");
```


## Making assertions on a specific called process instance of a super process instance

You can retrieve a "chained" process instance assert inspecting a very specific called process instance currently 
available in the context of a super process instance, either by means of a processDefinitionKey...

```java
assertThat(processInstance).calledProcessInstance("mySubProcessDefinitionKey");
```
or even by means of a more sophisticated processInstanceQuery

```java
assertThat(processInstance).calledProcessInstance(processInstanceQuery().processDefinitionKey("mySubProcessDefinitionKey"));
```

... in order to directly make assertions on it, e.g. 

```java
assertThat(processInstance).calledProcessInstance("mySubProcessDefinitionKey").isNotNull();
```


## Making assertions on the process variables map of an instance

You can retrieve a "chained" process variables map assert inspecting all the process variables 
available in the context of a process instance...

```java
assertThat(processInstance).variables();
```

... in order to directly make assertions on them, e.g. 

```java
assertThat(processInstance).variables()
  .hasSize(2).containsEntry("approved", true);
```

You may want to compare that with the other possibility to assert whether a process instance 
[hasVariables]({{< relref "#instance-hasvariables" >}}) (without leaving your current ProcessInstanceAssert). 


## Accessing tasks in the context of a process instance under test

You can directly access tasks in the context of the last asserted process 
instance by means of static helper methods:

```java
assertThat(processInstance).isNotNull();
...
Task onlyTaskOflastAssertedProcessInstance = task();
Task someTaskOflastAssertedProcessInstance = task("review-and-approve");
Task sameTaskOflastAssertedProcessInstance = task(taskQuery().taskDefinitionKey("review-and-approve"));
```
  
You can therefore e.g. write ...

```java
assertThat(processInstance).task().hasDefinitionKey("review-and-approve");
complete(task(), withVariables("documentId", 5, "approved", true)); 
```

Furthermore you can directly access tasks in the context of a *specified* process 
instance by means of static helper methods:

```java
Task onlyTaskOfProcessInstance = task(processInstance);
Task someTaskOfProcessInstance = task("review-and-approve", processInstance);
Task sameTaskOfProcessInstance = task(taskQuery().taskDefinitionKey("review-and-approve"), processInstance);
```
  
You can therefore e.g. write ...

```java
complete(task("review-and-approve", processInstance), withVariables("documentId", 5, "approved", true)); 
```


## Accessing external tasks in the context of a process instance under test

You can directly access external tasks in the context of the last asserted process 
instance by means of static helper methods:

```java
assertThat(processInstance).isNotNull();
...
ExternalTask onlyTaskOflastAssertedProcessInstance = externalTask();
ExternalTask someTaskOflastAssertedProcessInstance = externalTask("review-and-approve");
ExternalTask sameTaskOflastAssertedProcessInstance = externalTask(externalTaskQuery().activityId("review-and-approve"));
```
  
You can therefore e.g. write ...

```java
assertThat(processInstance).externalTask().hasActivityId("review-and-approve");
complete(externalTask(), withVariables("documentId", 5, "approved", true)); 
```

Furthermore you can directly access external tasks in the context of a *specified* process 
instance by means of static helper methods:

```java
ExternalTask onlyTaskOfProcessInstance = externalTask(processInstance);
ExternalTask someTaskOfProcessInstance = externalTask("review-and-approve", processInstance);
ExternalTask sameTaskOfProcessInstance = externalTask(externalTaskQuery().activityId("review-and-approve"), processInstance);
```
  
You can therefore e.g. write ...

```java
complete(externalTask("review-and-approve", processInstance), withVariables("documentId", 5, "approved", true)); 
```


## Accessing jobs in the context of a process instance under test

You can directly access jobs in the context of the last asserted process 
instance by means of static helper methods:

```java
assertThat(processInstance).isNotNull();
...
Job onlyJobOflastAssertedProcessInstance = job();
Job someJobOflastAssertedProcessInstance = job("publish");
Job someJobOflastAssertedProcessInstance = job(jobQuery().executionId(executionId));
```
  
You can therefore e.g. write ...

```java
assertThat(processInstance).job("publish").isNotNull();
execute(job("publish")); 
```

Furthermore you can directly access jobs in the context of a *specified* process 
instance by means of static helper methods:

```java
Task onlyJobOfProcessInstance = job(processInstance);
Task someJobOfProcessInstance = job("publish", processInstance);
Task sameJobOfProcessInstance = job(jobQuery().executable(), processInstance);
```
  
You can therefore e.g. write ...

```java
execute(job("publish", processInstance)); 
```


## Accessing called process instances in the context of a process instance under test

You can directly access called process instances in the context of the last asserted process 
instance by means of static helper methods:

```java
assertThat(processInstance).isNotNull();
...
ProcessInstance onlyCalledProcessInstanceOflastAssertedProcessInstance = calledProcessInstance();
ProcessInstance someCalledProcessInstanceOflastAssertedProcessInstance = calledProcessInstance("myCalledProcessDefinitionKey");
ProcessInstance someCalledProcessInstanceOflastAssertedProcessInstance = calledProcessInstance(processInstanceQuery().processDefinitionKey("myCalledProcessDefinitionKey"));
```
  
You can therefore e.g. write ...

```java
assertThat(processInstance).isNotNull();
ProcessInstance calledProcessInstance = calledProcessInstance(); 
```

Furthermore you can directly access jobs in the context of a *specified* super process 
instance by means of static helper methods:

```java
ProcessInstance onlyCalledProcessInstanceOfProcessInstance = calledProcessInstance(superProcessInstance);
ProcessInstance someCalledProcessInstanceOfProcessInstance = calledProcessInstance("myCalledProcessDefinitionKey", superProcessInstance);
ProcessInstance sameCalledProcessInstanceOfProcessInstance = calledProcessInstance(processInstanceQuery().processDefinitionKey("myCalledProcessDefinitionKey"), superProcessInstance);
```
  
You can therefore e.g. write ...

```java
ProcessInstance calledProcessInstance = calledProcessInstance("myCalledProcessDefinitionKey", superProcessInstance); 
```


## Accessing process definitions

You can directly access process definitions by means of static helper methods:

```java
ProcessDefinition processDefinitionOflastAssertedProcessInstance = processDefinition();
ProcessDefinition processDefinitionOfSpecifiedProcessInstance = processDefinition(processInstance);
ProcessDefinition processDefinitionOfSpecifiedProcessDefinitionKey = processDefinition("myProcessDefintionKey");
ProcessDefinition processDefinitionConformingToSpecifiedQuery = processDefinition(processDefinitionQuery().processDefinitionKey("myProcessDefintionKey");
```
  
In order to check, whether your last asserted process instance is the only currently running 
instance of its own process definition you can therefore e.g. write ...

```java
assertThat(processDefinition()).hasActiveInstances(1);
```