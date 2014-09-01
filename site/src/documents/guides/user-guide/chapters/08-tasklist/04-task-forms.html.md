---

title: 'Task Forms'
category: 'Tasklist'

---

The Tasklist can work with different types of forms. To implement a Task Form in your application you have to connect the form resource with the BPMN 2.0 element in your process diagram. Suitable BPMN 2.0 elements for calling Tasks Forms are the [Start Event](ref:/api-references/bpmn20/#events-start-events) and the [User Task](ref:/api-references/bpmn20/#tasks-user-task). 

## Embedded Task Forms

To add an embedded Task Form to your application simply create an HTML file and attach it to a [User Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start Event](ref:/api-references/bpmn20/#events-start-events) in your process model. 
Add a folder `src/main/webapp/forms` to your project folder and create a FORM_NAME.html file containing the relevant content for your form. The following example shows a simple form with two input fields:

```html
<form class="form-horizontal">
  <div class="control-group">
    <label class="control-label">Customer ID</label>
    <div class="controls">
      <input form-field type="string" name="customerId"></input>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label">Amount</label>
    <div class="controls">
      <input form-field type="number" name="amount"></input>
    </div>
  </div>
</form>
```

To configure the form in your process open the process in your Eclipse IDE with the <a href="http://www.camunda.org/design/modeler.html">camunda Modeler</a> and select the desired [User Task](ref:/api-references/bpmn20/#tasks-user-task) or [Start Event](ref:/api-references/bpmn20/#events-start-events). Open the properties view and enter `embedded:app:forms/FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="embedded:app:forms/FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">                
```

## External Task Forms

If you want to call a Task Form that is not part of your application you can add a reference to the desired form. The Referenced Task Form will be configured similar to the Embedded Task Form. Open the properties view and enter `FORM_NAME.html` as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="FORM_NAME.html"
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

## Generic Task Forms

The generic form will be used whenever you have not added a dedicated form for a [User Task](ref:/api-references/bpmn20/#tasks-user-task) or a [Start Event](ref:/api-references/bpmn20/#events-start-events).

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-tasklist/tasklist-generic-form.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    Hit the <button class="btn btn-xs"><i class="glyphicon glyphicon-plus"></i> </button> button to add a variable that will be passed to the process instance upon task completion. State a variable name and select the type and enter the desired value. Enter as much variables as you need. 
    After hitting the <code>Complete Task</code> button the process instance contains the entered values. Generic Task Forms can be very helpful during the development stage, so you do not need to implement all Task Forms before you can run a workflow. For debugging and testing this concept has many benefits as well.
  </div>  
</div>
