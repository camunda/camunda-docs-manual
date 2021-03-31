---

title: 'Building Forms in Camunda Modeler'
weight: 10

menu:
  main:
    name: "Forms"
    identifier: "camunda-modeler-forms"
    parent: "modeler"
    pre: "How to build Camunda Forms using the Camunda Modeler."

---

{{< note class="info" title="Support for Camunda Forms" >}}
The Camunda Forms feature was added with the 4.7.0 release of the Camunda Modeler. They can be used within BPMN diagrams running on Camunda Platform version 7.15.0 or later.

Please note that the initial release of Camunda Forms only includes a first minimal feature set, which will be expanded with upcoming versions.
{{< /note >}}


# Overview

The Camunda Forms feature allows you to easily design and configure forms. Once configured, they can be [connected to a BPMN 2.0 element]({{< ref "/user-guide/task-forms/_index.md#camunda-forms" >}}) so to implement a task form in your application.

# Quickstart

## Create new Form

<!-- TODO: Add Screenshot of the Modeler create-form.png -->

To start building a form, in the **File** menu click **Create new Camunda Form**.

## Build your From

<!-- TODO: Add Screenshot of the Modeler build-form.png -->

Now you can start to build your Camunda Form. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the canvas.

<!-- TODO: Add Screenshot of the Modeler form-properties-panel.png -->

In the properties panel on the right hand side, you can view and edit attributes that apply to the currently selected form element. Please refer to the [Camunda Forms Reference]({{< ref "/reference/forms/camunda-forms/_index.md#configuration" >}}) to explore all configuration options for form elements.

## Save your Form

<!-- TODO: Add Screenshot of the Modeler save-form.png -->

To save your state of work, click the **Save Camunda Form as...** button in the top-level menu. Then select a location on your file system to store the diagram in the JSON format.

## Use your Form to implement a task form in your application

You can connect your Camunda Form to a BPMN 2.0 element and deploy it together with the BPMN diagram to the Camunda Platform, so to implement a task form in your application. Pleaser refer to the [User Task Forms guide]({{< ref "/user-guide/task-forms/_index.md#camunda-forms" >}}) to learn more.
