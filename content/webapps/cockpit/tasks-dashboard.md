---

title: 'Open Tasks Dashboard'
weight: 70

menu:
  main:
    name: "Open Tasks Dashboard"
    identifier: "user-guide-cockpit-open-task-dashboard"
    parent: "user-guide-cockpit"
    pre: "Display open tasks."

---

You can use the open task dashboard to see how the open tasks are distributed to individual factors.
Refer to the [Cockpit Plugins]({{< relref "webapps/cockpit/extend/plugins.md" >}}) section for adding a custom open task 
dashboard plugin.

{{< img src="../img/task-dashboard.png" title="Open Task Dashboard" >}}

## Open Tasks

### Assignments by type

In this category you can see how many open tasks exist. There is also an overview how the amount of open tasks is distributed.

### Assignment by group

This category provides you an overview how all open tasks, which are assigned to a group, are distributed between the individual groups.

## Search Tasks
{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not 
  available in the community edition.
{{< /enterprise >}}

The search provides you with the possibility to search for all tasks. To use the search you can either use one of the 
predefined searchs or create your own search parameters.

For a predefined search you need to click the number of one of the summary items from 'assignment by type' or 
'assignment by group'.

You can use the links in the result to jump to the corresponding process instance. If the task isn't finished yet, the link
directs you to the runtime data of the process instance. When the task is finished you can use the link to move to the
historic data of the process instance.