---

title: 'External Task Forms'
category: 'Task Forms'

---

If you want to call a task form that is not part of your application you can add a reference to the desired form. The referenced task form will be configured in a way similar to the embedded task form. Open the properties view and enter `FORM_NAME.html` as form key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="app:FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```

The tasklist creates the URL by the pattern:

```xml
"../.." + contextPath (of process application) + "/" + "app" + formKey (from BPMN 2.0 XML) + "processDefinitionKey=" + processDefinitionKey + "&callbackUrl=" + callbackUrl;
```

When you have completed the task the call back URL will be called.

<div class="alert alert-info">
  <div class="row">
    <div class="col-md-1">
      <img src="ref:asset:/assets/img/welcome/real-life.png" height="50" />
    </div>
    <div class="col-md-8">
      <strong>How-To</strong>
      <p><a href="ref:/real-life/how-to/#user-interface-jsf-task-forms">How to add JSF Forms to your process application</a></p>
    </div>
  </div>
</div>
