---

title: "Post Deployment"
weight: 40

menu:
  main:
    name: "Create"
    identifier: "rest-api-deployment-post-deployment"
    parent: "rest-api-deployment"
    pre: "POST `/deployment/create`"

---

Create a deployment.

{{< note title="Security Consideration" class="warning" >}}
  Deployments can contain custom code in form of scripts or EL expressions to customize process behavior. This may be abused for remote execution of arbitrary code. See the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}

# Method

POST `/deployment/create`


# Parameters

## Request Body

A multipart form submit with the following parts:

<table class="table table-striped">
  <tr>
    <th>Form Part Name</th>
    <th>Content Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deployment-name</td>
    <td>text/plain</td>
    <td>The name for the deployment to be created.</td>
  </tr>
  <tr>
    <td>enable-duplicate-filtering</td>
    <td>text/plain</td>
    <td>
      A flag indicating whether the process engine should perform duplicate checking for the deployment or not. This allows you to check if a deployment with the same name and the same resouces already exists and if true, not create a new deployment but instead return the existing deployment. The default value is <code>false</code>.
    </td>
  </tr>
  <tr>
    <td>deploy-changed-only</td>
    <td>text/plain</td>
    <td>
      A flag indicating whether the process engine should perform duplicate checking on a per-resource basis. If set to <code>true</code>, only those resources that have actually changed are deployed. Checks are made against resources included previous deployments of the same name and only against the latest versions of those resources. If set to <code>true</code>, the option <code>enable-duplicate-filtering</code> is overridden and set to <code>true</code>.
    </td>
  </tr>
  <tr>
    <td>deployment-source</td>
    <td>text/plain</td>
    <td>
      The source for the deployment to be created.
    </td>
  </tr>
  <tr>
    <td>*</td>
    <td>application/octet-stream</td>
    <td>The binary data to create the deployment resource. It is possible to have more than one form part with different form part names for the binary data to create a deployment.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `Deployment` interface in the engine.
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
    <td>deploymentTime</td>
    <td>String</td>
    <td>The time when the deployment was created.</td>
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
</table>


# Example

## Request

Post data for a new deployment:

POST `/deployment/create`

```
--28319d96a8c54b529aa9159ad75edef9
Content-Disposition: form-data; name="deployment-name"

aName
--28319d96a8c54b529aa9159ad75edef9
Content-Disposition: form-data; name="enable-duplicate-filtering"

true
--28319d96a8c54b529aa9159ad75edef9
Content-Disposition: form-data; name="deployment-source"

process application
--28319d96a8c54b529aa9159ad75edef9
Content-Disposition: form-data; name="data"; filename="test.bpmn"

<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions ...>
  <!-- BPMN 2.0 XML omitted -->
</bpmn2:definitions>
--28319d96a8c54b529aa9159ad75edef9--
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
  "source": "process application",
  "deploymentTime": "2013-01-23T13:59:43"
}
```
