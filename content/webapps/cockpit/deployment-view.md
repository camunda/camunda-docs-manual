---

title: 'Deployment View'
weight: 15

menu:
  main:
    identifier: "user-guide-cockpit-deployment-view"
    parent: "user-guide-cockpit"

---

{{< img src="../img/cockpit-deployments-page.png" title="Cockpit Deployment View" >}}

The deployment view of Cockpit shows an overview of all deployments, their resources and the content of these resources. It allows the deletion of existing deployments as well as redeployment of old resources. The content of resources within deployments can be displayed. It is also possible to download single resources from this view.

# Search

Use the search field at the top of the list of deployments to find specific deployments. Similar to the search on the [cockpit dashboard]({{< relref "webapps/cockpit/dashboard.md#search" >}}) and the [tasklist]({{< relref "webapps/tasklist/dashboard.md#search-for-tasks" >}}) it is possible to search deployments using an array of available criteria.

Valid search criteria are unique ID, name (which does not need to be unique across all deployments), time of deployment and source. The deployment source can be provided when a deployment is created. A deployment that is created by the application during startup will have this property set to `process application`. If a deployment is made directly in Cockpit (for example using the [dmn live editing]({{< relref "webapps/cockpit/deployment-view.md#dmn-live-editing" >}}) feature), the property will be set to `cockpit`, and so on. You can also search for deployments that have no deployment source set using the `Source undefined` criterium.

Independently of the search, ordering for the deployment list can be set using the sorting parameter above the search field. It is possible to order by ID, Name and deployment time. Clicking on the arrow on the right side of the sorting criterium changes the ordering (ascending and descending).

# Delete

To delete a deployment, hover over the deployment to show the deletion icon {{< glyphicon name="trash" >}}. Before deleting the deployment you can specify whether to also delete instances of resources in this deployment (e.g. running or historic process instances).

# Redeploy

You can redeploy an old deployment to increase the version of all definitions contained in the deployment and therefore overwriting any changes that happened to the definition since the original deployment. To do so, click on de redeploy icon {{< glyphicon name="open" >}} that appears when hovering over a deployment. All contained resources in this deployment will then be redeployed. For every contained process, case, or decision definition a new version will be created. This new version will be then the latest version of all definitions with the same key.

You can also redeploy only a single resource within the deployment: Navigate to the resource and click the {{< glyphicon name="open" text=" Redeploy">}} button to redeploy only this single resource. This is only possible for resources which contain definitions.

# Definition Resources

For resources that contain definitions (bpmn, dmn and cmmn files), a preview of the diagram or the table is displayed on the right side of the page as well as the version number of the definitions contained in this resource. On the bottom of the page, there is a list of definitions with a link to the respective definition pages. The enterprise version also includes the possibility to [edit DMN tables directly on the page]({{< relref "webapps/cockpit/dmn-live-editing.md" >}}).

# DMN Live Editing

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../img/cockpit-edit-dmn-dialog.png" title="Cockpit Edit DMN Dialog" >}}

DMN tables can be changed directly in Cockpit. Clicking on the {{< glyphicon name="pencil" text=" Edit">}} button will open a dialog which contains an editable version of the DMN table. This button is only available for DMN resources. The edit dialog can also be opened by clicking on the {{< glyphicon name="pencil">}} icon on the DMN definition page.

Gray cells on the table display technical details like variable names and types. Changing this data might lead to incompatability with existing definitions, especially if the decision table is integrated in a bpmn process.

You can download the changed table with the {{< glyphicon name="save" text=" Download changed version">}} button. The downloaded file contains all changes you made to the table, but does not deploy it. The download feature is not available in Internet Explorer.

You can use a local dmn file from your computer to overwrite the table. Clicking on the `Choose File` button opens a dialog where you can select a dmn file. The file ending must be `.dmn` or `.dmn11.xml`. After selecting the file, the table gets replaced. You can then perform additional changes to the table before deploying it. Using a local dmn file is not possible in Internet Explorer 9.

By clicking `Proceed`, a new dialog opens containing the changed table. The changes should be carefully reviewed as confirming the change and clicking `Deploy` will immediately create a new deployment containing the new dmn file as resource. All process and case definitions which use the latest version of the decision definition will then use the new version.

The new deployment will have the name provided in the confirmation dialog and will also have the string `cockpit` set as deployment source.
