---

title: 'Dashboard'
weight: 5

menu:
  main:
    identifier: "user-guide-cockpit-dmn-dashboard"
    parent: "user-guide-cockpit-dmn"
    pre: "Entry point for decision monitoring."
    name: "Dashboard"

---

The decisions dashboard of Cockpit is the entry point for decision monitoring. It comes with a pre-installed plugin, which lets you see deployed decision definitions. Additional [plugins]({{< relref "webapps/cockpit/extend/plugins.md" >}}) can be added to the decisions dashboard.


# Deployed Decisions

{{< img src="../../img/cockpit-decision-definition-list.png" title="Deployed Decision Definitions" >}}

This plugin provides you with a list of deployed decision definitions. You can click on the name of a decision to go to the [decision definition view][decision-definition-view] and access more details, like the DMN table or executed [decision instances view][decision-instance-view].

[decision-definition-view]: {{< relref "webapps/cockpit/dmn/decision-definition-view.md" >}}
[decision-instance-view]: {{< relref "webapps/cockpit/dmn/decision-instance-view.md" >}}
