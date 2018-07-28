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

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

You can use the open tasks dashboard to see how the open tasks are distributed by individual factors.
Refer to the [Cockpit Plugins]({{< ref "/webapps/cockpit/extend/plugins.md" >}}) section for information about
adding a custom open task dashboard plugin.

{{< img src="../img/task-dashboard.png" title="Open Task Dashboard" >}}

## Open Tasks

### Assignments by type

In this category you can see how many open tasks exist. There is also an overview which shows how the open tasks are distributed.

### Assignment by group

This category provides you an overview which shows how all open tasks which are assigned to a group are distributed between the individual groups.

## Search Tasks
{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not
  available in the community edition.
{{< /enterprise >}}

This search provides you with the possibility to search for all tasks. To use the search you can either use one of the
predefined searches or create your own search parameters.

For a predefined search you need to click the number of one of the summary items from 'assignment by type' or
'assignment by group'.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

You can use the links in the results to jump to the corresponding process instances. If the task isn't finished yet, the link
directs you to the runtime data of the process instance. If the task is finished, you can use the link to move to the
historic view of the process instance.