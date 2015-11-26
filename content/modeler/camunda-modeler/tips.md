---

title: 'Tips and Tricks'
weight: 30

menu:
  main:
    name: "Tips and Tricks"
    identifier: "camunda-modeler-tips"
    parent: "camunda-modeler"
    pre: "A collection of tips and tricks that make using the modeler most convenient."

---

# Tabbed Modeling

{{< img src="img/model-tabs-1.png" title="Model Tabs" >}}

It is possible to edit multiple models at the same time by using model tabs. Every new or loaded model is displayed as a tab in the tab bar at the top of the screen. By clicking on a tab, you can view the respective model.

# Eclipse Project Synchronization

If you use [Eclipse](https://eclipse.org/) to develop process applications, your models are typically part of an Eclipse project. With default settings, editing and saving a model in the Camunda Modeler requires manual refreshing of the project content in Eclipse. Eclipse can be configured to automatically refresh project content whenever a file changes by selecting *Window / Preferences* in the top level menu and navigate to *General / Workspace* in the preferences window. Tick the box *Refresh using native hooks or polling*.

{{< img src="img/eclipse-refresh.png" title="Model Tabs" >}}
