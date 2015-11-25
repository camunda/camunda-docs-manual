---

title: 'Camunda BPMN Modeler Eclipse Plugin'
weight: 70


menu:
  main:
    name: "Deprecated: Eclipse Plugin"
    identifier: "eclipse-plugin"
    parent: "modeler"
    pre: "We recommend to use the Camunda Modeler over the Eclipse Plugin."

---

{{< note title="This Tool is Deprecated" class="info" >}}
  As of Camunda BPM 7.4, a completely [new Camunda Modeler]({{< relref "modeler/camunda-modeler.md" >}}) is available. This modeler is a desktop application and we recommend to use it over the Eclipse plugin.
{{< /note >}}

# Installation

This section guides you through the installation process step by step and gives you information about download pages, requirements and troubleshooting.

## Requirements

* We recommend to use Eclipse Indigo. The edition (32bit/64bit) must match your Java edition.
* Please note that you cannot install the Activiti Designer and the Camunda Modeler in the same Eclipse. It will cause both designers to not work properly.
* If you are using the fox-designer, please uninstall the fox-designer plugin before using the **Camunda Modeler**. You can uninstall already installed plugins in the following menu: `Help` -> `Install New Software...` -> `What is already installed?`.


## Download

<section class="row">
  <div class="col-sm-5">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Get Prepackaged Modeler</h3>
      </div>
      <div class="panel-body">
        <p>
          You can download a prepackaged <strong>Camunda Modeler</strong> (Windows only).
        </p><br /><br />
        <p>
          <a class="btn btn-primary btn-lg" href="http://camunda.org/release/camunda-modeler/kepler/camunda-modeler-kepler-latest.zip">
            <i class="glyphicon glyphicon-download-alt glyphicon-white"></i> Download
          </a>
        </p><br /><br />
        <p>
          This distribution includes the <strong>Camunda Modeler</strong> installed inside eclipse Kepler (32bit, Windows).
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-5">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Install as Plugin</h3>
      </div>
      <div class="panel-body">
        <p>
          Find <strong>Camunda Modeler</strong> on the following update sites:
          <br /><strong>Kepler</strong><br />
          <a href="http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/">
            http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/
          </a>
          <br /><br /><strong>Indigo & Juno</strong><br />
          <a href="http://camunda.org/release/camunda-modeler/update-sites/latest/site/">
            http://camunda.org/release/camunda-modeler/update-sites/latest/site/
          </a>
        </p>
        <p>
          Follow the Instructions below to install the <strong>Camunda Modeler</strong> as a plugin in your own Eclipse distribution.
        </p>
      </div>
    </div>
  </div>
</section>


## Step by Step Installation

### Add the Update Site

{{< img src="img/installation-1.png" title="Update Site" >}}

Add the update site URL (see above) as an Eclipse Repository.


### Select an Item

{{< img src="img/installation-2.png" title="Item" >}}

The item **Camunda Modeler** appears. Select it and click *Next*.


### Installation Details

{{< img src="img/installation-3.png" title="Installation Details" >}}

Wait for the installation details. Click *Next*.


### User Agreement

{{< img src="img/installation-4.png" title="USer Agreement" >}}

Before you can download the plugin you will be prompted to accept the User Agreement. Click *Next*.


### Installation in Progress

{{< img src="img/installation-5.png" title="Installation in Progress" >}}

The installation progress window appears. Wait.


### Security Warning

{{< img src="img/installation-6.png" title="Security Warning" >}}

You will get a security warning message during the installation. Click *OK*.


### Restart

{{< img src="img/installation-7.png" title="Restart" >}}

After the installation has finished you will be prompted to restart your Eclipse. Click *Restart Now*. After the restart the Camunda Modeler is ready to use.


# Troubleshooting

## NoClassDefFoundError: graphiti

{{< img src="img/modeler-exception-graphiti.png" title="Item" >}}

If you experience NoClassDefFoundErrors like the one shown here, graphiti was not properly installed. Graphiti is a framework used by the **Camunda Modeler**. This rarely happens, however it can occur if you had another plug-in installed using  a different version of graphiti before the Camunda Modeler (one common example would be the Activiti Designer).

{{< img src="img/modeler-exception-graphiti.png" title="Item" >}}

If this happens you have two options:

1.  Restart with a fresh Eclipse.
2.  Install graphiti manually as shown in the left screenshot (please note that the version might change, currently use the latest 0.8.x version or check which version is referenced in the **Camunda Modeler** update site).


## Unhandled loop exception

If the Modeler behaves strangely and you are getting exceptions like [this](http://stackoverflow.com/questions/84147/org-eclipse-swt-swterror-item-not-added), please try the following:

* Clean up your Eclipse.
* Start your Eclipse with command line option `-clean` once.
* Depending on your models, you might want to give Eclipse more resources. You may do so by appending the following lines in the eclipse.ini file residing next to your Eclipse executable.

```
-Xms768m
-Xmx1024m
```

If these options already exist, remove them first.

# Setup the IDE

After installation you can start to setup your environment. The modeler IDE is split into the following three parts:


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
