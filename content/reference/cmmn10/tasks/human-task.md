---

title: 'Human Task'
weight: 10

menu:
  main:
    identifier: "cmmn-ref-tasks-human"
    parent: "cmmn-ref-tasks"
    pre: "Work being done by a human user."

---


A *human task* is used to model work that needs to be done by a human actor.

{{< cmmn-symbol type="human-task" >}}

A human task is defined in XML as follows:

```xml
<humanTask id="theHumanTask" name="A Human Task" />
```

A human task in state `ENABLED` can be started manually using the `CaseService` as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the human task becomes `ACTIVE`, a new task is created in the task list of the user(s) or group(s) assigned to that task.

If the work associated with the human task is done, it is possible to complete the human task manually using the `CaseService` as follows:

```java
caseService.completeCaseExecution("aCaseExecutionId");
```

This completes the created task as well.

Instead of using the `CaseService` it is also possible to use the `TaskService` to complete a human task:

```java
taskService.complete("aTaskId");
```

# Properties

In that case the associated human task is completed as well.

## Description

A human task can have a description. In fact, any CMMN 1.0 element can have a description. A description is defined by adding the `description` attribute.

```xml
<humanTask id="theTask" name="Schedule meeting" description="Schedule an engineering meeting for next week with the new hire" />
```

The description text can be retrieved from the task in the standard Java way:

```java
task.getDescription();
```

## Due Date

Each task has a field indicating the due date of that task. The Query API can be used to query for tasks that are due on, before or after a certain date.

There is an extension attribute that allows to specify an expression in a task definition to set the initial due date of a task when it is created. The expression should always resolve to a `java.util.Date`, `java.util.String` ([ISO8601](http://en.wikipedia.org/wiki/ISO_8601) formatted) or `null`. When using ISO8601 formatted Strings, you may either specify an exact point in time or a time period relative to the time the task is created.

```xml
<humanTask id="theTask" name="Important task" camunda:dueDate="${dateVariable}"/>
```

The due date of a task can also be altered using the task service or in task listeners using the passed delegate task.

## Follow Up Date

Each task has a field indicating the follow up date of that task. The Query API can be used to query for tasks that need to be followed up on, before or after a certain date.

There is an extension attribute that allows you to specify an expression in a task definition to set the initial follow up date of a task when it is created. The expression should always resolve to a `java.util.Date`, `java.util.String` ([ISO8601](http://en.wikipedia.org/wiki/ISO_8601) formatted) or `null`. When using ISO8601 formatted Strings, you may either specify an exact point in time or a time period relative to the time the task is created.

```xml
<humanTask id="theTask" name="Important task" camunda:followUpDate="${dateVariable}"/>
```

# User Assignment

A human task can be directly assigned to a user. This is done by using the attribute `performerRef` on a human task element. The defined `performerRef` attribute references an existing role. Such a role definition needs a name that defines the user.

```xml
<case ... >
  ...
  <humanTask id="theTask" name='important task' perfomerRef="aCaseRole" />
  <caseRoles id="aCaseRole" name="kermit" />

</case>
```

Only one user can be assigned to the task as a performer. This user is called the assignee. Tasks that have an assignee are not visible in the task lists of other users and can only be found in the personal task list of the assignee.

Tasks directly assigned to users can be retrieved through the task service as follows:

```java
List<Task> tasks = taskService.createTaskQuery().taskAssignee("kermit").list();
```

## User Assignment using custom extensions

When strictly following the CMMN standard, user and group assignments can be quite cumbersome for use cases where the assignment is more complicated. To avoid these complexities, custom extensions on the human task element can be set.

* `assignee` attribute: this custom extension allows direct assignment of a human task to a given user.

  ```xml
  <humanTask id="theTask" name="my task" camunda:assignee="kermit" />
  ```

  This is exactly the same as using a <code>perfomerRef</code> construct as defined [above]({{< relref "reference/cmmn10/tasks/human-task.md" >}}-user-assignment).
* `candidateUsers` attribute: this custom extension makes a user a candidate for a task.

  ```xml
  <humanTask id="theTask" name="my task" camunda:candidateUsers="kermit, gonzo" />
  ```

* `candidateGroups` attribute: this custom extension allows makes a group a candidate for a task.

  ```xml
  <humanTask id="theTask" name="my task" camunda:candidateGroups="management, accountancy" />
  ```

* `candidateUsers` and `candidateGroups` can both be defined for the same human task.

Note: Although the Camunda engine provides an identity management component, which is exposed through the `IdentityService`, it does not check whether a provided user is known by the identity component. This allows integration of the engine with existing identity management solutions when it is embedded into an application.

When using Spring or CDI it is possible to use the custom assignment attributes as described in the section above and delegate to a bean with an expression that listens to task create events. In the following example, the assignee will be set by calling the <code>findManagerOfEmployee()</code> on the <code>ldapService</code> Spring/CDI bean. The <code>emp</code> parameter is a variable of the case instance.

```xml
<humanTask id="task" name="My Task" camunda:assignee="${ldapService.findManagerForEmployee(emp)}"/>
```

It works in a similar way for candidate users and groups:

```xml
<humanTask id="task" name="My Task" camunda:candidateUsers="${ldapService.findAllSales()}"/>
```

Note that this only works if the return type of the invoked methods is String or Collection<String> (for candidate users and groups):

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

# Forms

It is possible to provide information to render a human task form by using the `camunda:formKey`
attribute:

```xml
<humanTask id="someTask" camunda:formKey="someForm.html">
  ...
</humanTask>
```

The form key is a symbolic value which can be set in the CMMN XML file by using the extension
attribute `formKey` and retrieved at runtime using the process engine API.

If the user task form is displayed inside the Camunda Tasklist, the format of the formKey must follow
special rules. [See the corresponding section in the user guide for details]({{< relref "user-guide/task-forms/index.md" >}}).

In custom applications, the value of the form key can be chosen freely. In a custom application the
value of the form key attribute can be interpreted freely. Based on the specific UI technology used,
it can reference the name of an HTML file, a JSF / Facelets template, a Vaadin / GWT view, ...

## Retrieving the form key using the form service.

```java
String formKey = formService.getTaskFormData(someTaskId).getFormKey();
```

## Retrieving the form using the task service

When performing a task query, it is possible to retrieve the form key as well. This is most useful
if the form keys need to be retrieved for a complete list of tasks:

```java
List<Task> tasks = TaskService.createTaskQuery()
  .assignee("jonny")
  .initializeFormKeys() // must be invoked
  .list();

for(Task task : tasks) {
  String formKey = task.getFormKey();
}
```

Note that it is required to call the `.initializeFormKeys()` method on the `TaskQuery` object to
make sure the form keys are initialized.

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#assignee" >}}">camunda:assignee</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#candidategroups" >}}">camunda:candidateGroups</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#candidateusers" >}}">camunda:candidateUsers</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#duedate" >}}">camunda:dueDate</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#formkey" >}}">camunda:formKey</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-attributes.md#priority" >}}">camunda:priority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#in" >}}">camunda:in</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#out" >}}">camunda:out</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#caseexecutionlistener" >}}">camunda:caseExecutionListener</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#tasklistener" >}}">camunda:taskListener</a>,
      <a href="{{< relref "reference/cmmn10/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The attribute <code>camunda:assignee</code> cannot be used simultaneously with the <code>perfomerRef</code>
      attribute on a human task element.
    </td>
  </tr>
</table>
