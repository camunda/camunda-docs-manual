---

title: 'Dashboard'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-dashboard"
    parent: "user-guide-cockpit"
    pre: "Entry Point to Cockpit, provides overview and search"

---


The dashboard of Cockpit is your entry point for process monitoring. It comes with pre-installed plugins, which let you see deployed process and decision defintions. Additional [plugins]({{< relref "webapps/cockpit/extend/plugins.md" >}}) can be added to the dashboard.


# Deployed Processes

{{< img src="../img/cockpit-process-definition-state.png" title="Deployed Processes" >}}

With this plugin you can easily observe the state of a processes definition. Green and red dots signalize running and [failed jobs][failed-jobs]. At this observing level a red dot signifies that there is at least one process instance or a sub process instance which has an unresolved incident. You can localize the problem by using the [Process Definition View][process-definition-view].


{{< img src="../img/cockpit-deployed-processes.png" title="Rendered Process Preview" >}}

You can also switch to the preview tab which includes the rendered process model of each deployed process. Additionally, you get information about how many instances of the process are currently running and about the process state. Green and red dots signalize running and [failed jobs][failed-jobs]. Click on the model to go to the [Process Definition View][process-definition-view].


[process-definition-view]: {{< relref "webapps/cockpit/bpmn/process-definition-view.md" >}}
[failed-jobs]: {{< relref "webapps/cockpit/bpmn/failed-jobs.md" >}}


# Deployed Decisions

{{< img src="../img/cockpit-decision-definition-list.png" title="Deployed Decision Definitions" >}}

This plugin provides you with a list of deployed decision definitions. You can click on the name of a decision to go to the decision definition view page and access more details about it, like the dmn table or executed decision instances.


# Multi Tenancy

{{< img src="../img/cockpit-multi-engine.png" title="Multiple Engines" >}}

If you are working with more than one engine you can select the desired engine via a dropdown selection. Cockpit provides all information of the selected engine.


# Search

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../img/cockpit-search.png" title="cockpit Search" >}}

At the top of the dashboard page, you can search for process instances and incidents which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g., 'like', which allows to search for process instances where the entered value is a substring of the property value. If you are searching for process variables, you also have to enter the variable name you want to search for.

If you are searching for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g., `'93288'` or `'NULL'`).

You can always either search for process instances or for incidents. When you add a parameter for an incident search, you can not add a second parameter which would search for a process instance and vice versa.
