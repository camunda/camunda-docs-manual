---

title: "Install the Camunda Modeler Eclipse Plugin"
weight: 30

menu:
  main:
    name: "Modeler Eclipse Plugin"
    identifier: "installation-guide-modeler"
    parent: "installation-guide"

---


This page explains how to install the Camunda Modeler is a BPMN 2.0 modeling plugin for the Eclipse IDE. This document will guide you through the installation process step by step and gives you information about download pages, requirements and troubleshooting.


# Installation

## Requirements

* We recommend to use Eclipse Indigo. The edition (32bit/64bit) must match your Java edition.
* Please note that you cannot install the Activiti Designer and the camunda Modeler in the same Eclipse. It will cause both designers to not work properly.
* If you are using the fox-designer, please uninstall the fox-designer plugin before using the __camunda Modeler__. You can uninstall already installed plugins in the following menu: `Help` -> `Install New Software...` -> `What is already installed?`.


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

{{< img src="modeler_plugin_01.png" title="Update Site" >}}

Add the update site URL (see above) as an Eclipse Repository.


### Select an Item

{{< img src="modeler_plugin_02.png" title="Item" >}}

The item **Camunda Modeler** appears. Select it and click *Next*.


### Installation Details

{{< img src="modeler_plugin_03.png" title="Installation Details" >}}

Wait for the installation details. Click *Next*.


### User Agreement

{{< img src="modeler_plugin_04.png" title="USer Agreement" >}}

Before you can download the plugin you will be prompted to accept the User Agreement. Click *Next*.


### Installation in Progress

{{< img src="modeler_plugin_05.png" title="Installation in Progress" >}}

The installation progress window appears. Wait.


### Security Warning

{{< img src="modeler_plugin_06.png" title="Security Warning" >}}

You will get a security warning message during the installation. Click *OK*.


### Restart

{{< img src="modeler_plugin_07.png" title="Restart" >}}

After the installation has finished you will be prompted to restart your Eclipse. Click *Restart Now*. After the restart the Camunda Modeler is ready to use.


# Troubleshooting

## NoClassDefFoundError: graphiti

{{< img src="modeler-exception-graphiti.png" title="Item" >}}

If you experience NoClassDefFoundErrors like the one shown here, graphiti was not properly installed. Graphiti is a framework used by the **Camunda Modeler**. This rarely happens, however it can occur if you had another plug-in installed using  a different version of graphiti before the camunda Modeler (one common example would be the Activiti Designer).

{{< img src="modeler-exception-graphiti.png" title="Item" >}}

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
