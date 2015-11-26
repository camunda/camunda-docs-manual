---

title: 'Modeling BPMN with the Eclipse Plugin'
weight: 30


menu:
  main:
    name: "Modeling BPMN"
    identifier: "eclipse-plugin-modeling"
    parent: "eclipse-plugin"
    pre: "Learn how to model BPMN processes with the eclipse plugin"

---

# Finding your way around the Eclipse Plugin

## Project Explorer

{{< img src="../img/modeler-project-explorer.png" title="Modeler" >}}

This view provides a hierarchical view of the resources in your workspace. Projects and files are displayed here. To open the Project Explorer click *Window / Show View / Other... / General / Project Explorer*. In the Project Explorer you can add, delete and rename files. Furthermore you can copy files from or to the explorer.

## Properties Panel

{{< img src="../img/modeler-properties-panel.png" title="Modeler" >}}

The Properties Panel allows you to maintain BPMN and Camunda BPM vendor extensions in your diagrams. To open this view click *Window / Show View / Other... / General / Properties*.


## Diagram Canvas

{{< img src="../img/modeler-diagram-canvas.png" title="Modeler" >}}

To open the diagram canvas right-click on a *.bpmn file in the Project Explorer and select *Open With / Bpmn2 Diagram Editor*. On the right hand side of the screen, the Palette offers you all BPMN 2.0 elements grouped into different sections. You can add elements to your diagram by dragging and dropping them onto the Diagram Canvas.


# Create a Process Model

## Create a Project

{{< img src="../img/modeler-new-project.png" title="New Model" >}}

Before you can create a BPMN file you need a project. You can create projects by right-clicking in the project explorer and selecting *New / Project* or in the menu *File / New / Project ...*. Only a *General / Project* is suitable for using BPMN 2.0 files. For process application development select a Java Project.


## Add a BPMN 2.0 Diagram

{{< img src="../img/modeler-new-diagram.png" title="Modeler" >}}

To add a new BPMN 2.0 file, select *File / New / Other / BPMN / BPMN 2.0 Diagram*. You can choose a location for the new file. Please note that this input is mandatory.


## Start Modeling

{{< img src="../img/modeler-start-modeling.png" title="Modeler" >}}

Now you can start to create a BPMN 2.0 model. Add the desired elements from the palette on the right hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you hover over an element in the diagram. The type of an element can easily be changed by the morph function in the context menu.

In the properties panel you see and edit information about the element specific attributes, grouped into different tabs. Select the desired element and start to edit the properties.