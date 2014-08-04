---

title: 'JSF Task Forms'
category: 'User Interface'

---

## Adding JSF Forms to your process application

If you add JSF forms as described below, you can easily use them as [external task forms](ref:/guides/user-guide/#tasklist-task-forms-external-task-forms).

A working example can be found in the [examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/usertask/task-form-external-jsf).

The BPMN process used for this example is shown in the image below:

<center>
  <img src="ref:asset:/assets/img/real-life/jsf-task-forms/task-form-process.png" class="img-responsive"/>
</center>

In this process model we added so called form keys to

 * the Start Event "invoice received". This is the form the user has to complete to start a new process instance.
 * the User Tasks. These are the forms the user has to complete when completing user tasks that are assigned to him.

This is how the forms are referenced in the BPMN 2.0 XML with the `camunda:formKey` attribute:

```xml
<startEvent id="start" name="invoice received"
    camunda:formKey="app:sample-start-form.jsf"/>

<userTask id="categorize-invoice" name="Categorize Invoice"
    camunda:formKey="app:sample-task-form-1.jsf" />

<userTask id="file-invoice" name="File Invoice"
    camunda:formKey="app:sample-task-form-2.jsf" />

<userTask id="acknowledge-categorization" name="Acknowledge Categorization"
    camunda:formKey="app:acknowledge-form.jsf" />
```

## Creating Simple User Task Forms

Create a JSF page in `src/main/webapp/WEB-INF` representing a form used for User Tasks. A very simple task form is shown below:

```xml
<!DOCTYPE HTML>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:ui="http://java.sun.com/jsf/facelets"
  xmlns:h="http://java.sun.com/jsf/html"
  xmlns:f="http://java.sun.com/jsf/core">

<f:view>
  <h:head>
    <f:metadata>
      <f:event type="preRenderView" listener="#{camundaTaskForm.startTaskForm()}" />
    </f:metadata>
    <title>Task Form: #{task.name}</title>
  </h:head>
  <h:body>
    <h1>#{task.name}</h1>
    <h:form id="someForm">
      <p>
        Here you would see the actual form to work on the task in a design
        normally either matching your task list or your business application
        (or both in the best case).
      </p>

      <h:commandButton id="complete" value="Task Completed"
          action="#{camundaTaskForm.completeTask()}" />
    </h:form>
  </h:body>
</f:view>
</html>
```

Note that you need `camunda-engine-cdi` in order to have the `camundaTaskForm` bean available.

## How does this work?

If the user clicks on "Start to work on task" (![start task button in tasklist][start-task]) in the tasklist, he will follow a link to this form, including the taskId and the callback URL (the URL to access the central tasklist) as GET-Parameters. Accessing this form will trigger the special CDI bean `camundaTaskForm` which

 *   starts a conversation,
 *   remembers the callback URL
 *   starts the User Task in the process engine, meaning the bean sets the start date and assigns the task to the CDI business process scope (see [CDI Integration](ref:/guides/user-guide/#cdi-and-java-ee-integration) for details).

For that, you just need to add this code block to the beginning of your JSF view:

```xml
<f:metadata>
  <f:event type="preRenderView" listener="#{camundaTaskForm.startTaskForm()}" />
</f:metadata>
```

Submit the form by calling the `camundaTaskForm` bean again, which:

*   Completes the task in the process engine, causing the current token to advance in the process
*   Ends the conversation
*   Triggers a redirect to the callback URL of the tasklist

```xml
<h:commandButton id="complete" value="task completed" action="#{camundaTaskForm.completeTask()}" />
```

Note that the command button doesn't have to be on the same form, you might have a whole wizard containing multiple forms in a row before having the `completeTask` button. This will work because of the conversation running in the background.

## Access process variables

In the forms you can access your own CDI beans as usual and also access the camunda CDI beans. This makes it easy to access process variables, e.g., via the `processVariables` CDI bean:

```xml
<h:form id="someForm">
  <p>Here you would see the actual form to work on the task in some design normally either matching you task list or your business application (or both in the best case).</p>
  <table>
    <tr>
      <td>
        Process variable <strong>x</strong> (given in in the start form):
      </td>
      <td>
        <h:outputText value="#{processVariables['x']}" />
      </td>
    </tr>
    <tr>
      <td>
        Process variable <strong>y</strong> (added in this task form):
      </td>
      <td>
        <h:inputText value="#{processVariables['y']}" />
      </td>
    </tr>
    <tr>
      <td></td>
      <td>
        <h:commandButton id="complete" value="Task Completed"
            action="#{camundaTaskForm.completeTask()}" />
      </td>
    </tr>
  </table>
</h:form>
```

This is rendered to a simple form:

<center>
  <img src="ref:asset:/assets/img/real-life/jsf-task-forms/variablesTaskFormExample.png" class="img-responsive"/>
</center>

The same mechanism can be used to start a new process instance:

```xml
<!DOCTYPE HTML>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:ui="http://java.sun.com/jsf/facelets"
  xmlns:h="http://java.sun.com/jsf/html"
  xmlns:f="http://java.sun.com/jsf/core">

<f:view>
  <f:metadata>
    <f:event type="preRenderView" listener="#{camundaTaskForm.startProcessInstanceByKeyForm()}" />
  </f:metadata>
  <h:head>
    <title>Start Process: #{camundaTaskForm.processDefinition.name}</title>
  </h:head>
  <h:body>
    <h1>#{camundaTaskForm.processDefinition.name}</h1>
    <p>Start a new process instance in version: #{camundaTaskForm.processDefinition.version}</p>
    <h:form id="someForm">
      <p>
        Here you see the actual form to start a new process instance, normally
        this would be in some design  either matching you task list or your business
        application (or both in the best case).
      </p>

      <table>
        <tr>
          <td>
            Process variable <strong>x</strong>:
          </td>
          <td>
            <h:inputText value="#{processVariables['x']}" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <h:commandButton id="start" value="Start Process Instance"
                action="#{camundaTaskForm.completeProcessInstanceForm()}" />
          </td>
        </tr>
      </table>
    </h:form>
  </h:body>
</f:view>
</html>
```

<center>
  <img src="ref:asset:/assets/img/real-life/jsf-task-forms/startFormExample.png" class="img-responsive"/>
</center>

If the user clicks on "Start a process instance" (![start process button][start-process]) in the tasklist and chooses the process your start form is assigned to, he will follow a link to this form, including the processDefinitionKey and the callback URL (the URL to access the central tasklist) as GET-Parameters. Accessing this form will trigger the special CDI bean `camundaTaskForm` which:

*   Starts a conversation
*   Remembers the callback URL to the centralized tasklist

You need to add this code block to the beginning of your JSF view:

```xml
<f:metadata>
  <f:event type="preRenderView" listener="#{camundaTaskForm.startProcessInstanceByIdForm()}" />
</f:metadata>
```

Submitting the start form now:

 * Starts the process instance in the process engine
 * Ends the conversation
 * Triggers a redirect to the callback URL of the tasklist

```xml
<h:commandButton id="start" value="Start Process Instance" action="#{camundaTaskForm.completeProcessInstanceForm()}" />
```

Note that the command button doesn't have to be on the same form, you might have a whole wizard containing multiple forms in a row before having the `completeProcessInstanceForm` button. This will work because of the conversation running in the background.

## Styling your task forms

We use [Twitter Bootstrap](http://getbootstrap.com/) in our tasklist - so best add this to your Process Application as well and you can easily polish your UI:

<center>
  <img src="ref:asset:/assets/img/real-life/jsf-task-forms/tasklist-forms-layouted-start.png" class="img-responsive"/>
</center>

To include CSS and Javascript libraries in your project you can add them to your maven project as dependencies.

```xml
<dependencies>

  <!-- ... -->

  <dependency>
    <groupId>org.webjars</groupId>
    <artifactId>bootstrap</artifactId>
    <version>3.1.1</version>
  </dependency>

</dependencies>
```

To use them, add tags like the following ones to your JSF page. If you have several forms, it may be helpful to create a template that you can refer to from your forms to avoid redundancies..

```xml
<h:head>
  <title>your title</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <!-- CSS Stylesheets -->
  <h:outputStylesheet library="webjars/bootstrap/3.1.1/css" name="bootstrap.css"/>
  <h:outputStylesheet library="css" name="style.css"/>

  <!-- Javascript Libraries -->
  <h:outputScript type="text/javascript" library="webjars/bootstrap/3.1.1/js" name="bootstrap.js" />
</h:head>
```

[start-task]: ref:asset:/assets/img/real-life/jsf-task-forms/start-task-button.png
[start-process]: ref:asset:/assets/img/real-life/jsf-task-forms/start-process-button.png
