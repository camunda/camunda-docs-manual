---

title: 'User Task'
category: 'Tasks'

keywords: 'user task due date assignment custom extensions'

---

A `user task` is used to model work that needs to be done by a human actor. When the process execution arrives at such a user task, a new task is created in the task list of the user(s) or group(s) assigned to that task.

<div data-bpmn-symbol="usertask" data-bpmn-symbol-name="User Task"></div>

A user task is defined in XML as follows. The id attribute is required, the name attribute is optional.

```xml
<userTask id="theTask" name="Important task" />                   
```
                                  
## Description

A user task can have also a description. In fact any BPMN 2.0 element can have a description. A description is defined by adding the documentation element.

```xml
<userTask id="theTask" name="Schedule meeting" >
  <documentation>
      Schedule an engineering meeting for next week with the new hire.
  </documentation>
```

The description text can be retrieved from the task in the standard Java way:

```java
task.getDescription();
```

## Due Date

Each task has a field, indicating the due date of that task. The Query API can be used to query for tasks that are due on, before or after a certain date.

There is an activity extension which allows you to specify an expression in your task-definition to set the initial due date of a task when it is created. The expression should always resolve to a java.util.Date, java.util.String ([ISO8601](http://en.wikipedia.org/wiki/ISO_8601) formatted) or null. When using ISO8601 formatted Strings, you may either specify an exact point in time or a time period relative to the time the task is created. For example, you could use a date that was entered in a previous form in the process or calculated in a previous Service Task.

```xml
<userTask id="theTask" name="Important task" camunda:dueDate="${dateVariable}"/>
```

The due date of a task can also be altered using the TaskService or in TaskListeners using the passed DelegateTask.

## User Assignment

A user task can be directly assigned to a user. This is done by defining a humanPerformer sub element. Such a humanPerformer definition needs a resourceAssignmentExpression that actually defines the user. Currently, only formalExpressions are supported.

```xml
<process ... >
  ...  
  <userTask id='theTask' name='important task' >
    <humanPerformer>
      <resourceAssignmentExpression>
        <formalExpression>kermit</formalExpression>
      </resourceAssignmentExpression>
    </humanPerformer>
  </userTask>
```

Only one user can be assigned as human performer to the task. In the engine terminology, this user is called the assignee. Tasks that have an assignee are not visible in the task lists of other people and can be found in the so-called personal task list of the assignee instead.

Tasks directly assigned to users can be retrieved through the TaskService as follows:

```java
List<Task> tasks = taskService.createTaskQuery().taskAssignee("kermit").list();
```

Tasks can also be put in the so-called candidate task list of people. In that case, the potentialOwner construct must be used. The usage is similar to the humanPerformer construct. Do note that it is required to define for each element in the formal expression to specify if it is a user or a group (the engine cannot guess this).

```xml
<process ... >
  ...
  <userTask id='theTask' name='important task' >
    <potentialOwner>
      <resourceAssignmentExpression>
        <formalExpression>user(kermit), group(management)</formalExpression>
      </resourceAssignmentExpression>
    </potentialOwner>
  </userTask>
```

Tasks defines with the potential owner construct, can be retrieved as follows (or a similar TaskQuery usage as for the tasks with an assignee):

```java
List<Task> tasks = taskService.createTaskQuery().taskCandidateUser("kermit");
```

This will retrieve all tasks where kermit is a candidate user, i.e. the formal expression contains user(kermit). This will also retrieve all tasks that are assigned to a group where kermit is a member of (e.g. group(management), if kermit is a member of that group and the identity component is used). The groups of a user are resolved at runtime and these can be managed through the IdentityService.

If no specifics are given whether the given text string is a user or group, the engine defaults to group. So the following two alternatives are the same:

```xml
<formalExpression>accountancy</formalExpression>
<formalExpression>group(accountancy)</formalExpression>
```
## User Assignment using custom extensions

It is clear that user and group assignments are quite cumbersome for use cases where the assignment is not complex. To avoid these complexities, custom extensions on the user task are possible.

* assignee attribute: this custom extension allows to directly assign a user task to a given user.

  ```xml
  <userTask id="theTask" name="my task" camunda:assignee="kermit" />
  ```

  This is exactly the same as using a humanPerformer construct as defined above.
* candidateUsers attribute: this custom extension allows to make a user a candidate for a task.

  ```xml
  <userTask id="theTask" name="my task" camunda:candidateUsers="kermit, gonzo" />
  ```

  This is exactly the same as using a potentialOwner construct as defined above. Note that it is not required to use the user(kermit) declaration as is the case with the potential owner construct, since the attribute can only be used for users.
* candidateGroups attribute: this custom extension allows to make a group a candidate for a task.

  ```xml
  <userTask id="theTask" name="my task" camunda:candidateGroups="management, accountancy" />
  ```
  This is exactly the same as using a potentialOwner construct as defined above. Note that it is not required to use the group(management) declaration as is the case with the potential owner construct, since the attribute can only be used for groups.
  
* candidateUsers and candidateGroups can both be defined on the same user task.

Note: Although the camunda engine provides an identity management component, which is exposed through the IdentityService, no check is done whether a provided user is known by the identity component. This allows to integrate the engine with existing identity management solutions when it is embedded into an application.

In case the previous approaches are not sufficient, it is possible to delegate to custom assignment logic using a task listener on the create event:

```xml
<userTask id="task1" name="My task" >
  <extensionElements>
    <camunda:taskListener event="create" class="org.camunda.bpm.MyAssignmentHandler" />
  </extensionElements>
</userTask>
```
The DelegateTask that is passed to the TaskListener implementation, allows to set the assignee and candidate-users/groups:

```java
public class MyAssignmentHandler implements TaskListener {
  public void notify(DelegateTask delegateTask) {
    // Execute custom identity lookups here    
    // and then for example call following methods:
    delegateTask.setAssignee("kermit");
    delegateTask.addCandidateUser("fozzie");
    delegateTask.addCandidateGroup("management");
    ...
  } 
}    
```

When using Spring or CDI it is possible to use the custom assignment attributes as described in the section above, and delegate to a bean using a task listener with an expression that listens to task create events. In the following example, the assignee will be set by calling the findManagerOfEmployee on the ldapService Spring/CDI bean. The emp parameter that is passed, is a process variable>.

```xml
<userTask id="task" name="My Task" camunda:assignee="${ldapService.findManagerForEmployee(emp)}"/>
```

This also works similar for candidate users and groups:

```xml
<userTask id="task" name="My Task" camunda:candidateUsers="${ldapService.findAllSales()}"/>
```

Note that this will only work if the return type of the invoked methods is String or Collection<String> (for candidate users and groups):

```java
public class FakeLdapService {
  
  public String findManagerForEmployee(String employee) {
    return "Kermit The Frog";
  }
  
  public List<String> findAllSales() {
    return Arrays.asList("kermit", "gonzo", "fozzie");
  }
}
```
