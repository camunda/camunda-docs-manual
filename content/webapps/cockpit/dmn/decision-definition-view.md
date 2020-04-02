---

title: 'Decision Definition View'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-dmn-definition"
    parent: "user-guide-cockpit-dmn"
    pre: "Gain an aggregated overview over all instances of a deployed decision definition"

---

{{< img src="../../img/cockpit-decision-definition-view.png" title="Decision Definition View" >}}

On the decision definition view, you can find a table or literal expression of the deployed decision definition. You can change the version of the decision definition in the dropdown menu on the left side. The table or literal expression is then updated accordingly. You can also navigate to the deployment of the selected version that contains the decision definition. Clicking the `navigate to deployment` button will take you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}). You can maximize the table view or the detailed information panel by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button, respectively the <button class="btn btn-xs"><i class="glyphicon glyphicon-menu-up"></i></button> button, at the bottom left of the table view.

Below the decision table you find a listing of all instances for this definition. You can also search for decision instances which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. You have to specify the value of the selected property to perform the search and you can combine multiple search pills to narrow down the search results.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

If the decision instance was executed in the context of a process, you can also find the process definition as well as the process instance id that executed that specific decision instance. Clicking on the links takes you to the respective pages. Clicking on the id of the decision instance takes you to the [decision instance view]({{< ref "/webapps/cockpit/dmn/decision-instance-view.md" >}}).

In the enterprise edition of the Camunda BPM platform, you can change the content of the table by clicking on the edit button {{< glyphicon name="pencil">}} to the right of the table. This takes you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}) and opens an [edit dialog]({{< ref "/webapps/cockpit/dmn/live-editing.md" >}}).
