---

title: 'Decision Views'
weight: 75

menu:
  main:
    identifier: "user-guide-cockpit-decision-views"
    parent: "user-guide-cockpit"

---

The decision view pages provide you with information about decision definitions as well as executed decision instances. You can find a listing of all deployed decision definitions at the [Cockpit dashboard]({{< relref "webapps/cockpit/dashboard.md#deployed-decisions" >}}). Clicking on the name of a decision definition on the dashboard takes you to the decision definition view.

All data that is displayed about decision definitions and decision instances is based on historic data. Unlike for process definitions and process instances, there is no runtime data, as decisions are executed almost instantly.

# Definition

{{< img src="../img/cockpit-decision-definition-view.png" title="Decision Definition View" >}}

On the decision definition view page, you can find a table of the deployed decision definition. You can change the version of the decision definition by the dropdown menu on the left hand side. The table is updated accordingly. You can also navigate to the deployment of the selected version that contains the decision definition. Clicking the `navigate to deployment` button will take you to the [deployments view]({{< relref "webapps/cockpit/deployment-view.md" >}}).

Below the decision table you find a listing of all instances for this definition. If the decision instance was executed in the context of a process, you can also find the process definition as well as the process instance id that executed that specific decision instance. Clicking on the links takes you to the appropriate pages. Clicking on the id of the decision instance takes you to the [decision instance view](<< relref "webapps/cockpit/decision-views.md#instance" >).

In the enterprise edition of the Camunda BPM platform, you can change the content of the table by clicking on the edit button {{< glyphicon name="pencil">}} to the right of the table. This takes you to the [deployments view]({{< relref "webapps/cockpit/deployment-view.md" >}}) and opens an [edit dialog]({{< relref "webapps/cockpit/deployment-view.md#dmn-live-editing" >}}).

# Instance

{{< img src="../img/cockpit-decision-instance-view.png" title="Decision Instance View" >}}

On the decision instance page you find the table of the decision that was executed as well as the values for the input variables and the decision result.

The input and output values for this decision instance are shown directly on the table in the corresponding cells as well as in the Input and Output tab below the table. Complex variables like Objects, Files and Bytes are not displayed on the table. You have to use the Input and Output tabs to access the values of these variables.

Rules that have matched during the execution of the decision table are highlighted.
