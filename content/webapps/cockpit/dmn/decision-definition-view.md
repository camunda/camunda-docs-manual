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

On the decision definition view, you can find a table of the deployed decision definition. You can change the version of the decision definition in the dropdown menu on the left side. The table is then updated accordingly. You can also navigate to the deployment of the selected version that contains the decision definition. Clicking the `navigate to deployment` button will take you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}).

Below the decision table you find a listing of all instances for this definition. If the decision instance was executed in the context of a process, you can also find the process definition as well as the process instance id that executed that specific decision instance. Clicking on the links takes you to the respective pages. Clicking on the id of the decision instance takes you to the [decision instance view]({{< ref "/webapps/cockpit/dmn/decision-instance-view.md" >}}).

In the enterprise edition of the Camunda BPM platform, you can change the content of the table by clicking on the edit button {{< glyphicon name="pencil">}} to the right of the table. This takes you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}) and opens an [edit dialog]({{< ref "/webapps/cockpit/dmn/live-editing.md" >}}).
