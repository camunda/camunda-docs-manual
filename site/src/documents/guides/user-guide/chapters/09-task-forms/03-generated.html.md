---

title: 'Generated Task Forms'
category: 'Task Forms'

---

The Camunda process engine supports generating HTML Task Forms based on Form Data Metadata provided in BPMN 2.0 XML. Form Data Metadata is a set of BPMN 2.0 vendor extensions provided by Camunda, allowing you to define form fields directly in BPMN 2.0 XML:

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

<p class="alert alert-info">
  <strong>Camunda Modeler:</strong> Form metadata can be graphically edited using the <a href="http://camunda.org/bpmn/tool/">Camunda Modeler</a>.
</p>

This form would look like this in the Camunda Tasklist:

<center>
  <img class="img-responsive" src="ref:asset:/assets/img/user-guide/generated-forms-example.png" />
</center>
<br/>

As you can see, the `<camunda:formData ... />` element is provided as a child element of the BPMN `<extensionElements>` element. Form metadata consists of multiple form fields which represent individual input fields where a user has to provide some value or selection.

### Form Fields

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
          <li>string</li>
          <li>long</li>
          <li>date</li>
          <li>boolean</li>
          <li>enum</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>defaultValue</td><td>Value to be used as a default (pre-selection) for the field.</td>
    </tr>
  </tbody>
</table>

### Form Field Validation

Validation can be used for specifying frontend and backend validation of form fields. Camunda BPM provides a set of built-in form field validators and an extension point for plugging in custom validators.

Validation can be configured for each form field in BPMN 2.0 XML:

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
        <p>Applicable to string fields. Validates minlength of text content. Accepts 'null' values.</p>
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
        <p>Applicable to string fields. Validates maxlength of text content. Accepts 'null' values.</p>
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
        <p>Applicable to numeric fields. Validates the min value of a number. Accepts 'null' values.</p>
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
        <p>Applicable to numeric fields. Validates the max value of a number. Accepts 'null' values.</p>
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
        <p>Applicable to all type. Makes sure no input is submitted for given form field.</p>
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

If the process definition is deployed as part of a ProcessApplication deployment, the validator instance is resolved using the process application classloader and / or the process application Spring Application Context / CDI Bean Manager in case of an expression.
