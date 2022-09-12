---

title: 'Get Registered Deployments'
weight: 90

menu:
  main:
    name: "Get Registered Deployments"
    identifier: "rest-api-deployment-get-registered"
    parent: "rest-api-deployment"
    pre: "GET `/deployment/registered`"

---


Retrieves list of registered deployment IDs.


# Method

GET `/deployment/registered`

# Result

A JSON array of strings containing the IDs of registered deployments for the application.

# Response codes

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

GET `/deployment/registered`

## Response

Status 200.

```json
[
  "deploymentId1",
  "deploymentId2",
  "deploymentId3"
]
```
