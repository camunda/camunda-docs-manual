---

title: 'Case Definition View'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-cmmn-definition"
    parent: "user-guide-cockpit-cmmn"
    pre: "Gain an aggregated overview over all instances of a deployed case definition"

---

{{< img src="../../img/cmmn/case-definition-view.png" title="Case Definition View" >}}

On the case definition view, you can find a diagram of the deployed case definition. Use the mouse to navigate through the diagram. By turning the mouse wheel you can zoom in and out. Hold the left mouse button to pan the diagram in the desired direction.

Furthermore, the case definition view provides you with information about the definition and the status of a case. On the left side you can easily survey the versions of the case and how many instances of the versions are active. The version of the case definition can be changed in the dropdown menu. The diagram is then updated accordingly. Clicking on the deployment ID will take you to the [deployment view][deployment-view].

Below the case diagram you find a listing of all instances for this definition. Besides information about creation time, close time, business key and state, you can select an instance by ID and go down to the [case instance view][case-instance-view]. You can also search for case instances which fulfill certain search criteria. To do so, click in the search box and select the parameters to search for. You can also begin typing to find the required parameter faster. Depending on the selected property, you have to specify the value of the property. Some properties also allow operators other than equal, e.g., `like`, which allows searching for case instances where the entered value is a substring of the property value. To search for case variables, you also have to enter the variable name you want to search for. To search for a variable of type string, which has a numeric, boolean or null value, you have to wrap the value in single quotes (e.g., `'93288'` or `'NULL'`).

[case-definition-view]: {{< ref "/webapps/cockpit/cmmn/case-definition-view.md" >}}
[case-instance-view]: {{< ref "/webapps/cockpit/cmmn/case-instance-view.md" >}}
[deployment-view]: {{< ref "/webapps/cockpit/deployment-view.md" >}}
