---

title: "Redeploy Deployment"
weight: 45

menu:
  main:
    name: "Redeploy"
    identifier: "rest-api-deployment-post-redeploy-deployment"
    parent: "rest-api-deployment"
    pre: "POST `/deployment/{id}/redeploy`"

---

Re-deploys an existing deployment.

The deployment resources to re-deploy can be restricted by using the properties `resourceIds` or `resourceNames`. If no deployment resources to re-deploy are passed then all existing resources of the given deployment are re-deployed.

{{< note title="Security Consideration" class="warning" >}}
  Deployments can contain custom code in form of scripts or EL expressions to customize process behavior. This may be abused for remote execution of arbitrary code. See the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}

# Method

POST `/deployment/{id}/redeploy`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the deployment to re-deploy.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>resourceIds</td>
    <td>A list of deployment resource ids to re-deploy.</td>
  </tr>
  <tr>
    <td>resourceNames</td>
    <td>A list of deployment resource names to re-deploy.</td>
  </tr>
  <tr>
    <td>source</td>
    <td>Sets the source of the deployment.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the `DeploymentWithDefinitions` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>links</td>
    <td>List</td>
    <td>Link to the newly created deployment with <code>method</code>, <code>href</code> and <code>rel</code>.</td>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the deployment.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the deployment.</td>
  </tr>
  <tr>
    <td>source</td>
    <td>String</td>
    <td>The source of the deployment.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the deployment.</td>
  </tr>
  <tr>
    <td>deploymentTime</td>
    <td>String</td>
    <td>The time when the deployment was created.</td>
  </tr>
  <tr>
    <td>deployedProcessDefinitions</td>
    <td>Object</td>
    <td>A JSON Object containing a property for each of the process definitions, which are successfully deployed with that deployment.
        The key is the process definition id, the value is a JSON Object corresponding to the process definition, which is defined
        in the <a href="{{< ref "/reference/rest/process-definition/get.md">}}">Process Definition resource</a>.
    </td>
  </tr>
  <tr>
    <td>deployedCaseDefinitions</td>
    <td>Object</td>
    <td>A JSON Object containing a property for each of the case definitions, which are successfully deployed with that deployment.
        The key is the case definition id, the value is a JSON Object corresponding to the case definition, which is defined
        in the <a href="{{< ref "/reference/rest/case-definition/get.md">}}">Case Definition resource</a>.
    </td>
  </tr>
  <tr>
    <td>deployedDecisionDefinitions</td>
    <td>Object</td>
    <td>A JSON Object containing a property for each of the decision definitions, which are successfully deployed with that deployment.
        The key is the decision definition id, the value is a JSON Object corresponding to the decision definition, which is defined
        in the <a href="{{< ref "/reference/rest/decision-definition/get.md">}}">Decision Definition resource</a>.
    </td>
  </tr>
  <tr>
    <td>deployedDecisionRequirementsDefinitions</td>
    <td>Object</td>
    <td>A JSON Object containing a property for each of the decision requirements definitions, which are successfully deployed with that deployment.
        The key is the decision requirements definition id, the value is a JSON Object corresponding to the decision requirements definition, which is defined
        in the <a href="{{< ref "/reference/rest/decision-requirements-definition/get.md">}}">Decision Requirements Definition resource</a>.
    </td>
  </tr>
</table>


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Deployment or a deployment resource for the given deployment does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/deployment/anDeploymentId/redeploy`

Request Body:

```json
{
  "resourceIds": [ "aResourceId" ],
  "resourceNames": [ "aResourceName" ],
  "source" : "cockpit"
}
```

## Response

Status 200.

```json
{
    "links": [
        {
            "method": "GET",
            "href": "http://localhost:38080/rest-test/deployment/aDeploymentId",
            "rel": "self"
        }
    ],
    "id": "aDeploymentId",
    "name": "aName",
    "source": "cockpit",
    "deploymentTime": "2015-10-13T13:59:43.000+0200",
    "tenantId": null,
    "deployedProcessDefinitions": {
        "aProcDefId": {
            "id": "aProcDefId",
            "key": "aKey",
            "category": "aCategory",
            "description": "aDescription",
            "name": "aName",
            "version": 42,
            "resource": "aResourceName",
            "deploymentId": "aDeploymentId",
            "diagram": "aResourceName.png",
            "suspended": true,
            "tenantId": null,
            "versionTag": null
        }
    },
    "deployedCaseDefinitions": null,
    "deployedDecisionDefinitions": null,
    "deployedDecisionRequirementsDefinitions": null
}
```
