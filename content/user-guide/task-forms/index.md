---

title: 'User Task Forms'
weight: 100

menu:
  main:
    identifier: "user-guide-forms"
    parent: "user-guide"

---


There are different types of forms which are primarily used in Tasklist. To implement a task form in your application, you have to connect the form resource with the BPMN 2.0 element in your process diagram. Suitable BPMN 2.0 elements for calling tasks forms are the [StartEvent][start-event] and the [UserTask][user-tasks].

Out of the box, Camunda Tasklist supports four different kinds of task forms:

* [Embedded Task Forms]({{< relref "#embedded-task-forms" >}}): HTML-based task forms, displayed
  embedded within Tasklist.
* [Generated Task Forms]({{< relref "#generated-task-forms" >}}): Like embedded task forms, but
  generated from XML metadata within the BPMN 2.0 XML.
* [External Task Forms]({{< relref "#external-task-forms" >}}): The user is directed to another
  application to complete the task.
* [Generic Task Forms]({{< relref "#generic-task-forms" >}}): If no task form exists, a generic form
  is displayed to edit the process variables.

{{< note title="This section applies to forms in Camunda Tasklist" class="info" >}}
  When embedding the process engine into a custom application, you can integrate the process engine with any form technology such
  as [JavaServer Faces][jsf-task-forms], Java Swing, 
  JavaFX, REST-based JavaScript web applications and many more.
{{< /note >}}


# Embedded Task Forms

Embedded task forms are HTML and JavaScript forms which can be displayed directly within Tasklist. We provide more information about the creation of embedded forms in our [Embedded Task Forms Reference]({{< relref "reference/embedded-forms/index.md" >}}).

To add an embedded form to your application, simply create an HTML file and refer to it from a [UserTask][user-tasks] or a [StartEvent][start-event] in your process model. For example, you can create a FORM_NAME.html file containing the relevant content for your form, e.g., a simple form with two input fields:

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
           cam-variable-type="Double"
           class="form-control" />
  </div>
</form>
```

The file containing the form can be referenced in two ways:

* *app:*: Add the file to your development project in a folder `src/main/webapp/forms`. The HTML file will be packaged into your deployment artifact (typically a WAR archive). During runtime it will be loaded from there.
* *deployment:*: The file is part of your deployment (e.g., [by adding it to your process archive]({{< relref "reference/deployment-descriptors/tags/process-archive.md" >}})), which means that it is stored in the Camunda database. It can then be loaded from there. Note that this allows versioning of your form alongside the process model.

To configure the form in your process, open the process with the [Camunda Modeler](http://camunda.org/bpmn/tool/) and select the desired [UserTask][user-tasks] or [StartEvent][start-event]. Open the properties panel and enter `embedded:app:forms/FORM_NAME.html` (or `embedded:deployment:forms/FORM_NAME.html`) as Form Key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="embedded:app:forms/FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```


# Generated Task Forms

The Camunda process engine supports generating HTML task forms based on Form Data Metadata provided in the BPMN 2.0 XML. Form Data Metadata is a set of BPMN 2.0 vendor extensions provided by Camunda, allowing you to define form fields directly in the BPMN 2.0 XML:

```xml
<userTask id="usertask" name="Task">
  <extensionElements>
    <camunda:formData>
        <camunda:formField
            id="firstname" label="Firstname" type="string">
            <camunda:validation>
               <camunda:constraint name="maxlength" config="25" />
               <camunda:constraint name="required" />
            </camunda:validation>
        </camunda:formField>
        <camunda:formField
            id="lastname" label="Lastname" type="string">
            <camunda:validation>
               <camunda:constraint name="maxlength" config="25" />
               <camunda:constraint name="required" />
            </camunda:validation>
        </camunda:formField>
        <camunda:formField
            id="dateOfBirth" label="Date of Birth" type="date" />
    </camunda:formData>
  </extensionElements>
</userTask>
```

Form metadata can be graphically edited using the [Camunda Modeler](http://camunda.org/bpmn/tool/).

This form would look like this in Tasklist:

{{< img src="img/generated-forms-example.png" title="Generated Form" >}}

As you can see, the `<camunda:formData ... />` element is provided as a child element of the BPMN `<extensionElements>` element. Form metadata consists of multiple form fields which represent individual input fields where a user has to provide some value or selection.


## Form Fields

A form field can have the following attributes:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Attribute</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td><td>Unique id of the form field, corresponding to the name of the process variable to which the value of the form field is added when the form is submitted.</td>
    </tr>
    <tr>
      <td>label</td><td>The label to be displayed next to the form field.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>The data type of the form field. The following types are supported out of the box:
        <ul>
          <code>
          <li>string</li>
          <li>long</li>
          <li>date</li>
          <li>boolean</li>
          <li>enum</li>
          </code>
        </ul>
      </td>
    </tr>
    <tr>
      <td>defaultValue</td><td>Value to be used as a default (pre-selection) for the field.</td>
    </tr>
  </tbody>
</table>


## Form Field Validation

Validation can be used for specifying frontend and backend validation of form fields. Camunda BPM provides a set of built-in form field validators and an extension point for plugging in custom validators.

Validation can be configured for each form field in the BPMN 2.0 XML:

```xml
<camunda:formField
    id="firstname" name="Firstname" type="string">
    <camunda:validation>
       <camunda:constraint name="maxlength" config="25" />
       <camunda:constraint name="required" />
    </camunda:validation>
</camunda:formField>
```

As you can see, you can provide a list of validation constraints for each form field.

The following built-in validators are supported out of the box:

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Validator</th><th>Explanation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>required</td>
      <td>
        <p>Applicable to all types. Validates that a value is provided for the form field. Rejects 'null' values and empty strings.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;required&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>minlength</td>
      <td>
        <p>Applicable to <code>string</code> fields. Validates the minimum length of text content. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;minlength&quot; config=&quot;4&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>maxlength</td>
      <td>
        <p>Applicable to <code>string</code> fields. Validates the maximum length of text content. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;maxlength&quot; config=&quot;25&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>min</td>
      <td>
        <p>Applicable to numeric fields. Validates the minimum value of a number. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;min&quot; config=&quot;1000&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>max</td>
      <td>
        <p>Applicable to numeric fields. Validates the maximum value of a number. Accepts 'null' values.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;max&quot; config=&quot;10000&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
    <tr>
      <td>readonly</td>
      <td>
        <p>Applicable to all types. Makes sure no input is submitted for the given form field.</p>
        <p>
          <code>
            &lt;camunda:constraint name=&quot;readonly&quot; /&gt;
          </code>
        </p>
      </td>
    </tr>
  </tbody>
</table>

Camunda BPM supports custom validators. Custom validators are referenced using their fully qualified classname or an expression. Expressions can be used for resolving Spring or CDI @Named beans:

```xml
<camunda:formField
    id="firstname" name="Firstname" type="string">
    <camunda:validation>
       <camunda:constraint name="validator" config="com.asdf.MyCustomValidator" />
       <camunda:constraint name="validator" config="${validatorBean}" />
    </camunda:validation>
</camunda:formField>
```
A custom validator implements the `org.camunda.bpm.engine.impl.form.validator.FormFieldValidator` interface:

```java
public class CustomValidator implements FormFieldValidator {

  public boolean validate(Object submittedValue, FormFieldValidatorContext validatorContext) {

    // ... do some custom validation of the submittedValue

    // get access to the current execution
    DelegateExecution e = validatorContext.getExecution();

    // get access to all form fields submitted in the form submit
    Map<String,Object> completeSubmit = validatorContext.getSubmittedValues();

  }

}
```

If the process definition is deployed as part of a ProcessApplication deployment, the validator instance is resolved using the process application classloader and / or the process application Spring Application Context / CDI Bean Manager, in case of an expression.


# External Task Forms

If you want to call a task form that is not part of your application, you can add a reference to the desired form. The referenced task form will be configured in a way similar to the embedded task form. Open the properties view and enter `FORM_NAME.html` as form key. The relevant XML tag looks like this:

```xml
<userTask id="theTask" camunda:formKey="app:FORM_NAME.html"
          camunda:candidateUsers="John, Mary"
          name="my Task">
```

Tasklist creates the URL by the pattern:

```xml
"../.." + contextPath (of process application) + "/" + "app" + formKey (from BPMN 2.0 XML) + "processDefinitionKey=" + processDefinitionKey + "&callbackUrl=" + callbackUrl;
```

When you have completed the task, the call back URL will be called.

{{< note title="How To" class="info" >}}
  [How to add JSF Forms to your process application]({{< relref "examples/tutorials/jsf-task-forms.md" >}})
{{< /note >}}


# Generic Task Forms

The generic form will be used whenever you have not added a dedicated form for a [UserTask][user-tasks] or a [StartEvent][start-event].

{{< img src="img/tasklist-generic-form.png" title="Generic Start Form" >}}


Hit the *Add a variable* button to add a variable that will be passed to the process instance upon task completion. State a variable name, select the type and enter the desired value. Enter as many variables as you need.
After hitting the *Complete* button, the process instance contains the entered values. Generic task forms can be very helpful during the development stage, so you do not need to implement all task forms before you can run a workflow. For debugging and testing this concept has many benefits as well.

You can also retrieve already existing variables of the process instance by clicking the *Load Variables* button.


[user-tasks]: {{< relref "reference/bpmn20/tasks/user-task.md" >}}
[start-event]: {{< relref "reference/bpmn20/events/start-events.md" >}}
[jsf-task-forms]: {{< relref "examples/tutorials/jsf-task-forms.md" >}}
