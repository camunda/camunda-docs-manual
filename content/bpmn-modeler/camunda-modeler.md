---

title: 'Camunda BPMN Modeler'
weight: 20

menu:
  main:
    name: "Camunda Modeler"
    identifier: "camunda-modeler"
    parent: "bpmn-modeler"

---

This is a concise step-by-step guide to get you started with modeling BPMN diagrams and DMN decision tables. Make sure to [install the Camunda Modeler]({{< relref "installation/camunda-modeler.md" >}}) first.

# Create a Process Model

## Create new BPMN 2.0 Diagram

{{< img src="img/create-process-1.png" title="New BPMN Diagram" >}}

In order to start modeling, create a new BPMN 2.0 diagram by selecting *File / New File / BPMN Diagram* in the top-level menu.

## Start Modeling

{{< img src="img/create-process-2.png" title="Start Modeling" >}}

Now you can start to create a BPMN 2.0 model. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place.

## BPMN 2.0 Properties for Execution

{{< img src="img/create-process-3.png" title="Save BPMN Diagram" >}}

In the properties panel on the right hand side, you can view and edit attributes that apply to the currently selected element.

{{< img src="img/create-process-4.png" title="Save BPMN Diagram" >}}

The panel can be hidden and restored by clicking the tab on its left border.

## Save a Diagram

{{< img src="img/create-process-5.png" title="Save BPMN Diagram" >}}

In order to save your state of work, click *File / Save File As...* in the top-level menu. You can then select a location on your file system to store the diagram in the BPMN 2.0 XML format. In the future, you can load that file again by clicking *File / Open File...*.

# Create a Decision Table

## Create new DMN 1.1. Decision Table

{{< img src="img/create-decision-table-1.png" title="New BPMN Diagram" >}}

In order to start with a new table, create a new DMN 1.1 table by selecting *File / New File / DMN Table* in the top-level menu.

## Start Editing

{{< img src="img/create-decision-table-2.png" title="New BPMN Diagram" >}}

Now you can start to edit the DMN decision table.

{{< img src="img/create-decision-table-3.png" title="Add Elements" >}}

Add Input, Output and Rule elements by clicking the plus signs. Edit a table cell by clicking on it. Alternatively, the tabulator key can be used to walk through the table cells.

## Save a Decision Table

{{< img src="img/create-decision-table-4.png" title="New BPMN Diagram" >}}

In order to save your work, , click *File / Save File As...* in the top-level menu. You can then select a location on your file system to store the diagram in the DMN 1.1 XML format. In the future, you can load that file again by clicking *File / Open File...*.

# Tabbed Modeling

{{< img src="img/model-tabs-1.png" title="Model Tabs" >}}

It is possible to edit multiple models at the same time by using model tabs. Every new or loaded model is displayed as a tab in the tab bar at the top of the screen. By clicking on a tab, you can view the respective model.
