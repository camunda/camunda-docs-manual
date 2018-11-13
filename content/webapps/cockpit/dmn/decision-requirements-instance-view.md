---

title: 'Decision Requirements Definition Instance View'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-drd-instance"
    parent: "user-guide-cockpit-dmn"
    pre: "Gain an aggregated overview over all instances of a deployed decision requirement definition"

---

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-decision-requirements-definition-instance-view.png" title="Decision Requirements Definition View" >}}

On the decision requirements definition instance view, you can find a diagram of the deployed decision requirements definition.
Use the mouse to navigate through the diagram. By turning the mouse wheel you can zoom in and out.
Hold the left mouse button to pan the diagram in the desired direction.
By clicking on a decision definition on the diagram you can filter instances in the table below by the selected definition. 
You can also select multiple decision definition while holding the control key.

When a decision definition is either a decision table or a literal expression, a
green icon is displayed in the top left corner of the decision definition element on the diagram.
By clicking on it, you can navigate to the [decision definition view]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}}).

Furthermore, the decision requirements definition instance view provides you with information about
the instance. On the left side you can easily survey the versions of the definition requirements definition.
The version of the decision requirements definition can be changed in the dropdown menu. The diagram is then updated accordingly.
Clicking on the definition ID will take you to the [decision requirements definition view]({{< ref "/webapps/cockpit/dmn/decision-requirements-definition-view.md" >}}).
Clicking on the deployment ID will take you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}).

{{< img src="../../img/cockpit-decision-definition-requirement-decision-instance-instances-tab.png" title="Decision Instances Tab" >}}

In the below diagram, you can see a listing of all decision instances for this decision requirements definition instance. 
If the decision instance was executed in the context of a process, you can also find 
the process definition as well as the process instance ID that executed that specific 
decision instance. Clicking on the links takes you to the respective pages.
The same principle also applies to case definitions and case instances.
Clicking on the ID of the decision instance takes you to the [decision instance view]({{< ref "/webapps/cockpit/dmn/decision-instance-view.md" >}}).
Clicking on the decision definition takes you to the [decision definition view]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}})