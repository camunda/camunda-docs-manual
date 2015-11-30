---

title: 'Installing the Eclipse Plugin'
weight: 20


menu:
  main:
    name: "Installation"
    identifier: "eclipse-plugin-installation"
    parent: "eclipse-plugin"
    pre: "Install the eclipse plugin into the IDE"

---

This section guides you through the installation process step by step and gives you information about download pages, requirements and troubleshooting.

# Prerequisites

* We recommend to use Eclipse Indigo. The edition (32bit/64bit) must match your Java edition.
* Please note that you cannot install the Activiti Designer and the Camunda Modler in the same Eclipse. It will cause both designers to not work properly.
* If you are using the fox-designer, please uninstall the fox-designer plugin before using the **Camunda Modeler**. You can uninstall already installed plugins in the following menu: `Help` -> `Install New Software...` -> `What is already installed?`.


# Download & Update Sites

You can either install the Eclipse plugin into your existing IDE using the Camunda Update Sites or download a pre-packaged distribution which has the plugin already installed:

* Install using an update site: read content on this page below.
* [Download pre-packaged distribution](https://camunda.org/release/camunda-eclipse-plugin/prepackaged/kepler/). (Eclipse Kepler, Windows 32bit only).


# Step by Step Installation

## Add the Update Site

{{< img src="../img/installation-1.png" title="Update Site" >}}

Add the update site URL as an Eclipse Repository.

The [Update Site URLs can be found here]({{< relref "update-sites.md" >}}).


## Select an Item

{{< img src="../img/installation-2.png" title="Item" >}}

The item **Camunda Modeler** appears. Select it and click *Next*.


## Installation Details

{{< img src="../img/installation-3.png" title="Installation Details" >}}

Wait for the installation details. Click *Next*.


## User Agreement

{{< img src="../img/installation-4.png" title="USer Agreement" >}}

Before you can download the plugin you will be prompted to accept the User Agreement. Click *Next*.


## Installation in Progress

{{< img src="../img/installation-5.png" title="Installation in Progress" >}}

The installation progress window appears. Wait.


## Security Warning

{{< img src="../img/installation-6.png" title="Security Warning" >}}

You will get a security warning message during the installation. Click *OK*.


## Restart

{{< img src="../img/installation-7.png" title="Restart" >}}

After the installation has finished you will be prompted to restart your Eclipse. Click *Restart Now*. After the restart the Camunda Modeler is ready to use.


# Troubleshooting

## NoClassDefFoundError: graphiti

{{< img src="../img/modeler-exception-graphiti.png" title="Item" >}}

If you experience NoClassDefFoundErrors like the one shown here, graphiti was not properly installed. Graphiti is a framework used by the **Camunda Modeler**. This rarely happens, however it can occur if you had another plug-in installed using a different version of graphiti before the Camunda Modeler (one common example would be the Activiti Designer).

{{< img src="../img/modeler-exception-graphiti.png" title="Item" >}}

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