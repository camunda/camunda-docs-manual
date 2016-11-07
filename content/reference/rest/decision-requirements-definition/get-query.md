---

title: "Get Decision Requirements Definitions"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-decision-requirements-definition-get-query"
    parent: "rest-api-decision-requirements-definition"
    pre: "GET `/decision-requirements-definition`"

---


Queries for decision requirements definitions that fulfill given parameters. Parameters may be
the properties of decision requirements definitions, such as the name, key or version.  The
size of the result set can be retrieved by using the [Get Decision Requirements Definition Count]({{<
relref "reference/rest/decision-requirements-definition/get-query-count.md" >}}) method.


# Method

GET `/decision-requirements-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>Filter by decision requirements definition id.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionIdIn</td>
    <td>Filter by decision requirements definition ids.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by decision requirements definition name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by decision requirements definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>Filter by decision requirements definition key, i.e., the id in the DMN 1.1 XML. Exact match.</td>
  </tr>
  <tr>
    <td>keyLike</td>
    <td>Filter by decision requirements definition keys that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter by decision requirements definition category. Exact match.</td>
  </tr>
  <tr>
    <td>categoryLike</td>
    <td>Filter by decision requirements definition categories that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Filter by decision requirements definition version.</td>
  </tr>
  <tr>
    <td>latestVersion</td>
    <td>Only include those decision requirements definitions that are latest versions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>Filter by the name of the decision requirements definition resource. Exact match.</td>
  </tr>
  <tr>
    <td>resourceNameLike</td>
    <td>Filter by names of those decision requirements definition resources that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A decision requirements definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include decision requirements definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeDecisionRequirementsDefinitionsWithoutTenantId</td>
    <td>Include decision requirements definitions which belong to no tenant. Can be used in combination with <code>tenantIdIn</code>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>category</code>, <code>key</code>, <code>id</code>, <code>name</code>, <code>version</code>, <code>deploymentId</code> and <code>tenantId</code>.
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

A JSON array of decision requirements definition objects.
Each decision requirements definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the decision requirements definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision requirements definition.</td>
  </tr>
</table>


## Response codes

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
    <td>
      Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-requirements-definition?key=dish&sortBy=version&sortOrder=asc`

## Response

```json
[
  {
    "id":"dish:1:c633c195-41b7-11e6-b0ef-00aa004d0001",
    "key":"dish",
    "category":"drd-test",
    "name":"Dish",
    "version":1,
    "resource":"dish.dmn",
    "deploymentId":"c627175e-41b7-11e6-b0ef-00aa004d0001",
    "tenantId": null
  }
]
```
