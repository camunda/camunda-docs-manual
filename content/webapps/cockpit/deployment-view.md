---

title: 'Deployment View'
weight: 40

menu:
  main:
    name: "Deployments"
    identifier: "user-guide-cockpit-deployment-view"
    parent: "user-guide-cockpit"
    pre: "Inspect the process engine's repository, browsing deployments and resources"

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

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

You can redeploy an old deployment to increase the version of all definitions contained in the deployment and therefore overwriting any changes that happened to the definition since the original deployment. To do so, click on de redeploy icon {{< glyphicon name="open" >}} that appears when hovering over a deployment. All contained resources in this deployment will then be redeployed. For every contained process, case, or decision definition a new version will be created. This new version will be then the latest version of all definitions with the same key.

You can also redeploy only a single resource within the deployment: Navigate to the resource and click the {{< glyphicon name="open" text=" Redeploy">}} button to redeploy only this single resource. This is only possible for resources which contain definitions.

# Definition Resources

For resources that contain definitions (bpmn, dmn and cmmn files), a preview of the diagram or the table is displayed on the right side of the page as well as the version number of the definitions contained in this resource. On the bottom of the page, there is a list of definitions with a link to the respective definition pages. The enterprise version also includes the possibility to [edit DMN tables directly on the page]({{< relref "webapps/cockpit/deployment-view.md#dmn-live-editing" >}}).
