---

title: 'Camunda Forms Reference'
weight: 60
layout: "single"

menu:
  main:
    name: "Camunda Forms"
    identifier: "camunda-forms-ref"
    parent: "forms-ref"
    pre: "Forms created with the Camunda Modeler embeddable in Tasklist"
---


{{< note class="info" title="Support for Camunda Forms" >}}
The Camunda Forms feature was added with the 7.15.0 release of Camunda Platform and the 4.7.0 release of the Camunda Modeler.

Please note that the initial release of Camunda Forms only includes a first minimal feature set, which will be expanded with upcoming versions.
{{< /note >}}


Camunda Forms allow you to easily design and configure forms and then embed them in the Camunda Tasklist.
* Camunda Forms are created in the Camunda Modeler. You can find out how in the [Camunda Modeler documentation]({{< ref "/modeler/forms.md" >}}).
* Camunda Forms can easily be embedded in the Camunda Tasklist. You can find out how in the [User Task Forms guide]({{< ref "/user-guide/task-forms/_index.md#camunda-forms" >}}).
* Camunda Forms are powered by the open source [bpmn-io form-js library](https://github.com/bpmn-io/form-js). Visit the [open source repository](https://github.com/bpmn-io/form-js) to find out how to render a form using plain JavaScript in a custom application (note that this also requires you to to fetch the form from the respective BPMN 2.0 element and provide data as needed to the form).


# Configuration

Use the [Camunda Modeler]({{< ref "/modeler/forms.md" >}}) to configure your Camunda Form. The following form elements are currently supported.

## Text Field

A text field allowing the user to read and edit textual data.

{{< img src="img/form-text-field.png" title="Form Text Field Symbol" >}}

A text field can be configured using the following configuration properties:

* **Field Label**: Label displayed on top of the text field.
* **Field Description**: Description provided below the text field.
* **Key**: Identifier used to map data to the text field (1) during initial loading of the form, and (2) during submission of the form. When a form is [referenced by a User Task]({{< ref "/user-guide/task-forms/_index.md#camunda-forms" >}}) and viewed in the [Camunda Tasklist]({{< ref "/webapps/tasklist/_index.md" >}}), the key will be used to refer to a [Process Variable]({{< ref "/user-guide/process-engine/variables.md" >}}). This means that the value of the Process Variable will be used to populate the text field initially and that the value of the text field will be saved in the Process Variable during submission of the form.
* **Validation**: Given that one of the following properties is set, the form will only submit when the respective condition is fulfilled. Otherwise a validation error will be displayed.
  * **Required**: Text field must contain a value.
  * **Minimum Length**: Text field must have at least x characters.
  * **Maximum Length**: Text field must not have more than x characters.
  * **Regular Expression Pattern**: Text field value must match the provided Regular Expression pattern.



## Button

A button allowing the user to submit or reset the form.

{{< img src="img/form-button.png" title="Form Text Field Symbol" >}}

A button can be configured using the following configuration properties:

* **Field Label**: Label to be displayed on top of the button.
* **Action**: The button can either trigger a **Submit** or a **Reset** action.
  * **Submit**: Submit the form (given there are no validation errors).
  * **Reset**: Reset the form, all user inputs will be lost.
