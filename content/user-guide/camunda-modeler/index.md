---

title: 'Eclipse Modeler Plugin'
weight: 150

menu:
  main:
    name: "Camunda Modeler"
    identifier: "user-guide-eclipse-plugin"
    parent: "user-guide"

---

The Camunda Modeler is an open source BPMN 2.0 modeling plugin for Eclipse which focuses on seamless modeling of process and collaboration diagrams. The Camunda Modeler supports the complete BPMN 2.0 standard.

{{< img src="img/modeler-overview.png" title="Camunda Modeler" >}}


# Setup the IDE

After you have [installed the Camunda Modeler]({{< relref "installation/eclipse-plugin.md" >}}) in Eclipse you can start to setup your environment. The modeler IDE is split into the following three parts:


## Project Explorer

{{< img src="img/modeler-project-explorer.png" title="Modeler" >}}

This view provides a hierarchical view of the resources in your workspace. Projects and files are displayed here. To open the Project Explorer click *Window / Show View / Other... / General / Project Explorer*. In the Project Explorer you can add, delete and rename files. Furthermore you can copy files from or to the explorer.


## Properties Panel

{{< img src="img/modeler-properties-panel.png" title="Modeler" >}}

The Properties Panel allows you to maintain BPMN and Camunda BPM vendor extensions in your diagrams. To open this view click *Window / Show View / Other... / General / Properties*.


## Diagram Canvas

{{< img src="img/modeler-diagram-canvas.png" title="Modeler" >}}

To open the diagram canvas right-click on a *.bpmn file in the Project Explorer and select *Open With / Bpmn2 Diagram Editor*. On the right hand side of the screen, the Palette offers you all BPMN 2.0 elements grouped into different sections. You can add elements to your diagram by dragging and dropping them onto the Diagram Canvas.


# Create a Process Model

## Create a Project

{{< img src="img/modeler-new-project.png" title="New Model" >}}

Before you can create a BPMN file you need a project. You can create projects by right-clicking in the project explorer and selecting *New / Project* or in the menu *File / New / Project ...*. Only a *General / Project* is suitable for using BPMN 2.0 files. For process application development select a Java Project.


## Add a BPMN 2.0 Diagram

{{< img src="img/modeler-new-diagram.png" title="Modeler" >}}

To add a new BPMN 2.0 file, select *File / New / Other / BPMN / BPMN 2.0 Diagram*. You can choose a location for the new file. Please note that this input is mandatory.


## Start Modeling

{{< img src="img/modeler-start-modeling.png" title="Modeler" >}}

Now you can start to create a BPMN 2.0 model. Add the desired elements from the palette on the right hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you hover over an element in the diagram. The type of an element can easily be changed by the morph function in the context menu.

In the properties panel you see and edit information about the element specific attributes, grouped into different tabs. Select the desired element and start to edit the properties.


# Extend the Modeler with Custom Tasks

You can extend the modeler to ship reusable custom tasks through custom task providers.

{{< img src="img/custom-servicetask.png" title="Modeler" >}}

The following functionality is exposed to custom task providers and thus usable when implementing custom tasks:

* Add extension to properties panel
* Create task from palette
* Add custom actions to task
* Change color and icon


Head over to the custom task tutorial to learn more about [how to provide custom tasks]({{< relref "examples/tutorials/custom-task.md" >}}).
You may also check out the [advanced custom task example](https://github.com/camunda/camunda-consulting/tree/master/snippets/modeler/custom-task-advanced) that showcases most of the options.
