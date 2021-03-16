---

title: 'Editing DMN in Camunda Modeler'
weight: 20

menu:
  main:
    name: "DMN"
    identifier: "camunda-modeler-dmn"
    parent: "modeler"
    pre: "How to model executable DMN 1.3 decision diagrams (DRD) and tables."

---

# Quickstart

## Create new DMN Decision Requirement Diagram

{{< img src="img/create-dmn.png" title="New DMN Diagram" >}}

To start modeling, create a new DMN 1.3 diagram by selecting *Create diagram > Create new DMN diagram (Camunda DMN Engine)* in the top-level menu.

## Start Modeling

{{< img src="img/main.png" title="Start Modeling" >}}

Now you can start to create a DMN 1.3 model. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place. Use the properties panel on the right hand side to change the name or id of the DMN diagram.

## Demo

{{< img src="img/demo.gif" title="Demo" >}}

The demo above shows how to model a decision table. After creating a decision and morphing it to a decision table, you can start editing the table by clicking the overlay on the upper left corner of the decision. Using the overview in the decision table view you can jump between decision tables.

## Save a Diagram

{{< img src="img/save.png" title="Save DMN Diagram" >}}

To save your state of work, click *Save diagram as...* in the top-level menu. Then select a location on your file system to store the diagram in the DMN 1.3 XML format. You can load that file again by clicking *Open diagram..*.

## DMN Coverage

The Camunda Modeler covers the following elements:

- Decision (Tables and Literal Expressions)
- Input Data
- Knowledge Source
- Business Knowledge Model

## Decision Tables

{{< img src="img/decision-table.png" title="Decision Table" >}}

By clicking the blue icon on a Decision Table, you can open the Decision Table view and can start to edit it. Add Input, Output and Rule elements by clicking the plus signs. Edit a table cell by clicking on it. Alternatively, the tabulator and enter keys can be used to walk through the table cells.

Delete a rule or a column, copy or insert a new rule by right clicking in the cell:

{{< img src="img/dmn-modeler-right-click.png" title="Delete or copy rules" >}}

Adjust the details of an input or output column (e.g., name, expression, type) by double clicking in the header row:

{{< img src="img/dmn-modeler-double-click.png" title="Change input or output column" >}}

You can jump between Decision Tables or Literal Expressions in your Decision Requirement Diagram by opening and using the `Overview` on the left-hand side:

{{< img src="img/dmn-modeler-toggle-overview.png" title="Jump between decision tables" >}}

## Literal Expressions

{{< img src="img/literal-expression.png" title="New DMN Literal Expression" >}}

You can also edit Literal Expressions. Just as with Decision Tables, in the Decision Requirement Diagram view, click the blue icon to *drill-down* into the Literal Expression view and start editing.
