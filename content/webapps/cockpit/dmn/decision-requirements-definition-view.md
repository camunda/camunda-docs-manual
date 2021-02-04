---

title: 'Decision Requirements Definition View'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-drd-definition"
    parent: "user-guide-cockpit-dmn"
    pre: "Gain an aggregated overview over all instances of a deployed decision requirement definition"

---

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda Platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/cockpit-decision-requirements-definition-view.png" title="Decision Requirements Definition View" >}}

On the decision requirements definition view, you can find a diagram of the deployed decision requirements definition.
Use the mouse to navigate through the diagram. By turning the mouse wheel you can zoom in and out.
Hold the left mouse button to pan the diagram in the desired direction.
By clicking on a decision definition on the diagram you can filter instances in the table below by the selected definition. 
You can also select multiple decision definitions while holding the control key.

When a decision definition is either a decision table or a literal expression, a
green icon is displayed in the top left corner of the decision definition element on diagram.
By clicking on it, you can navigate to the [decision definition view]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}}).

Furthermore, the decision requirements definition view provides you with information about
the definition. On the left side you can easily survey the versions of the definition requirements definition.
The version of the decision requirements definition can be changed in the dropdown menu. The diagram is then updated accordingly.
Clicking on the deployment ID will take you to the [deployment view]({{< ref "/webapps/cockpit/deployment-view.md" >}}).

Below the diagram you find the decision instances tab and the decision requirements definition instances tab.

You can maximize the table view or the detailed information panel by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button, respectively the <button class="btn btn-xs"><i class="glyphicon glyphicon-menu-up"></i></button> button, at the bottom left of the table view.

{{< img src="../../img/cockpit-decision-definition-requirement-decision-instances-tab.png" title="Decision Instances Tab" >}}

In the decision instances tab, you can find a listing of all decision instances for this definition. You can also search for decision instances which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. You have to specify the value of the selected property to perform the search and you can combine multiple search pills to narrow down the search results.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

If the decision instance was executed in the context of a process, you can also find 
the process definition as well as the process instance ID that executed that specific 
decision instance. 

Clicking on the links takes you to the respective pages.
The same principle also applies to case definitions and case instances.
Clicking on the ID of the decision instance takes you to the [decision instance view]({{< ref "/webapps/cockpit/dmn/decision-instance-view.md" >}}).
Clicking on the decision definition takes you to the [decision definition view]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}})

{{< img src="../../img/cockpit-decision-definition-requirement-decision-drd-tab.png" title="Decision Requirements Definition Instances Tab" >}}

In the decision requirements definition instances tab, you can find a listing of all instances of the current decision requirements definition. You can also search for decision instances which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. You have to specify the value of the selected property to perform the search and you can combine multiple search pills to narrow down the search results.

Furthermore, you can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

If the instance was executed in the context of a process, you can also find 
the process definition as well as the process instance ID that executed that specific 
decision instance.

Clicking on the links takes you to the respective pages.
The same principle also applies to case definitions and case instances.
Clicking on the ID of the instance takes you to the [decision requirements definition instance view]({{< ref "/webapps/cockpit/dmn/decision-requirements-instance-view.md" >}}).
Clicking on the decision definition takes you to the [decision definition view]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}})