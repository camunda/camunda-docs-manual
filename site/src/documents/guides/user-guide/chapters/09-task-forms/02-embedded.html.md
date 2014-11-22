---

title: 'Embedded Task Forms'
category: 'Task Forms'

---

<div class="alert alert-info" role="alert">
  For information about the creation of an embedded task form read the <a
  href="ref:/api-references/embedded-forms/#overview">Embedded Forms Reference</a>.
</div>

Embedded taskforms are HTML and Javascript forms which can be displayed directly inside the
tasklist.

To add an embedded Task Form to your application simply create an HTML file and attach it to a [User
Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start
Event](ref:/api-references/bpmn20/#events-start-events) in your process model.  Add a folder
`src/main/webapp/forms` to your project folder and create a FORM_NAME.html file containing the
relevant content for your form. The following example shows a simple form with two input fields:

```html
<form role="form" name="form">
  <div class="form-group">
    <label for="customerId-field">Customer ID</label>
    <input required
           cam-variable-name="customerId"
           cam-variable-type="String"
           class="form-control" />
  </div>
  <div class="form-group">
    <label for="amount-field">Amount</label>
    <input cam-variable-name="amount"
           cam-variable-type="Float"
           class="form-control" />
  </div>
</form>
```

To configure the form in your process, open the process in your Eclipse IDE with the <a
href="http://camunda.org/bpmn/tool/">camunda Modeler</a> and select the desired [User
Task](ref:/api-references/bpmn20/#tasks-user-task) or [Start
Event](ref:/api-references/bpmn20/#events-start-events). Open the properties view and enter
`embedded:app:forms/FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="embedded:app:forms/FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```


