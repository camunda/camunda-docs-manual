---

title: 'Overview'
category: 'Task Forms'

---

There are different types of forms which are primarily used in the Tasklist. To implement a Task
Form in your application you have to connect the form resource with the BPMN 2.0 element in your
process diagram. Suitable BPMN 2.0 elements for calling Tasks Forms are the [Start
Event](ref:/api-references/bpmn20/#events-start-events) and the [User
Task](ref:/api-references/bpmn20/#tasks-user-task).

Out of the box, the camunda Tasklist supports four different kinds of task forms:

* [Embedded Task Forms](ref:#task-forms-embedded-task-forms): HTML-based task forms displayed
  embedded inside the tasklist.
* [Generated Task Forms](ref:#task-forms-generated-task-forms): Like embedded task forms but
  generated from XML Metadata inside BPMN 2.0 XML.
* [External Task Forms](ref:#task-forms-external-task-forms): The user is directed to another
  application to complete the task.
* [Generic Task Forms](ref:#task-forms-generic-task-forms): If no task form exists, a generic form
  is displayed for editing the process variables.

<div class="alert alert-info" role="alert">
  <strong>This section applies to forms in camunda Tasklist:</strong> When embedding the process
  engine into a custom application, you can integrate the process engine with any form technology such
  as <a href="ref:/real-life/how-to/#user-interface-jsf-task-forms">Java Server Faces</a>, Java Swing
  and Java FX, Rest-based Javascript web applications and many more.
</div>

