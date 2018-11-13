---

title: "Get Deployments"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-deployment-get-query"
    parent: "rest-api-deployment"
    pre: "GET `/deployment`"

---


Queries for deployments that fulfill given parameters. Parameters may be the
properties of deployments, such as the id or name or a range of the deployment time.
The size of the result set
can be retrieved by using the [Get Deployment count]({{< ref "/reference/rest/deployment/get-query-count.md" >}}) method.


# Method

GET `/deployment`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by deployment id.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by the deployment name. Exact match.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by the deployment name that the parameter is a substring of. The parameter can include the wildcard <code>%</code> to express like-strategy such as: starts with (<code>%</code>name), ends with (name<code>%</code>) or contains (<code>%</code>name<code>%</code>).</td>
  </tr>
  <tr>
    <td>source</td>
    <td>Filter by the deployment source.</td>
  </tr>
  <tr>
    <td>withoutSource</td>
    <td>Filter by the deployment source whereby source is equal to <code>null</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include deployments which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeDeploymentsWithoutTenantId</td>
    <td>Include deployments which belong to no tenant. Can be used in combination with <code>tenantIdIn</code>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>after</td>
    <td>Restricts to all deployments after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>before</td>
    <td>Restricts to all deployments before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>id</code>, <code>name</code>, <code>deploymentTime</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


# Result


A JSON array of deployment objects. Each deployment object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
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
    <td>Date</td>
    <td>The date and time of the deployment.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example


## Request

GET `/deployment?name=deploymentName`

## Response

```json
[
  {
    "id": "someId",
    "name": "deploymentName",
    "source": "process application",
    "tenantId": null,
    "deploymentTime": "2013-04-23T13:42:43"
  }
]
```
