---

title: 'Dashboard'
weight: 5

menu:
  main:
    identifier: "user-guide-cockpit-cmmn-dashboard"
    parent: "user-guide-cockpit-cmmn"
    pre: "Entry point for CMMN Cases monitoring."
    name: "Dashboard"

---
{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda Platform, it is not available in the community edition.
{{< /enterprise >}}

The CMMN Cases dashboard of Cockpit is the entry point for case monitoring. It comes with a pre-installed plugin, which lets you see deployed case definitions. Additional [plugins]({{< ref "/webapps/cockpit/extend/plugins.md" >}}) can be added to the cases dashboard.


# Search

{{< img src="../../img/cmmn/case-dashboard-search.png" title="Case Instance Search" >}}

At the top of the dashboard, you can search for case instances which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g., `like`, which allows searching for case instances where the entered value is a substring of the property value. To search for case variables, you also have to enter the variable name you want to search for. 
To search for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g., `'93288'` or `'NULL'`).

To add additional columns to the details of the search results, click on the 'Add column' button and select the desired details in the drop down menu that appears.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

{{< note title="Heads-up!" class="info" >}}
  The case instance search operates on the history endpoint of the engine. In case the requested historic data is not persisted to the database, then the search does not deliver the desired results.
{{< /note >}}

# Deployed Cases

{{< img src="../../img/cmmn/case-dashboard-deployed.png" title="Deployed Case Definitions" >}}

This plugin provides you with a list of deployed case definitions. You can click on the name of a case to go to the [case definition view][case-definition-view] and access more details, like the CMMN Case or the executed [case instance view][case-instance-view].

[case-definition-view]: {{< ref "/webapps/cockpit/cmmn/case-definition-view.md" >}}
[case-instance-view]: {{< ref "/webapps/cockpit/cmmn/case-instance-view.md" >}}
