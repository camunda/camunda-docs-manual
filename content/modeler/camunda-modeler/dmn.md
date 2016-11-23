---

title: 'Editing DMN in Camunda Modeler'
weight: 20

menu:
  main:
    name: "DMN"
    identifier: "camunda-modeler-dmn"
    parent: "camunda-modeler"
    pre: "How to model executable DMN 1.1 decision diagrams (DRD) and tables."

---

# Quickstart

## Create new DMN 1.1 Decision Requirement Diagram

{{< img src="img/create-dmn.png" title="New DMN Diagram" >}}

To start modeling, create a new DMN 1.1 diagram by selecting *File / New File / DMN Diagram* in the top-level menu.

## Start Modeling

{{< img src="img/main.png" title="Start Modeling" >}}

Now you can start to create a DMN 1.1 model. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place.

## Demo

{{< img src="img/demo.gif" title="Demo" >}}

The demo above shows how to model a decision table. After creating a decision and morphing it to a decision table, you can start editing the table by clicking the overlay on the upper left corner of the decision.

## Save a Diagram

{{< img src="img/save.png" title="Save DMN Diagram" >}}

To save your state of work, click *File / Save File As...* in the top-level menu. Then select a location on your file system to store the diagram in the DMN 1.1 XML format. You can load that file again by clicking *File / Open File...*.

## DMN 1.1 Coverage

The Camunda Modeler covers the following elements:

- Decision (Tables and Literal Expressions)
- Input Data
- Knowledge Source
- Business Knowledge Model

## Decision Tables

{{< img src="img/decision-table.png" title="Decision Table" >}}

Now you can start to edit the DMN decision table.

{{< img src="img/decision-editing.png" title="Add Elements" >}}

Add Input, Output and Rule elements by clicking the plus signs. Edit a table cell by clicking on it. Alternatively, the tabulator key can be used to walk through the table cells.

You can start modeling a Decision Requirement Diagram by clicking the `Show DRD` button, without losing the progress made on the decision table.

## Literal Expressions

{{< img src="img/literal-expression.png" title="New DMN Literal Expression" >}}

You can also edit Literal Expressions. It uses the same *drill down* approach as Decision Tables.
