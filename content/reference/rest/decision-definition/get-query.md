---

title: "Get Decision Definitions"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-decision-definition-get-query"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition`"

---


Query for decision definitions that fulfill given parameters. Parameters may be
the properties of decision definitions, such as the name, key or version.  The
size of the result set can be retrieved by using the [GET query count]({{<
relref "reference/rest/decision-definition/get-query-count.md" >}}).


# Method

GET `/decision-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>Filter by decision definition id.</td>
  </tr>
  <tr>
    <td>decisionDefinitionIdIn</td>
    <td>Filter by decision definition ids.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by decision definition name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by decision definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>Filter by decision definition key, i.e. the id in the DMN 1.0 XML. Exact match.</td>
  </tr>
  <tr>
    <td>keyLike</td>
    <td>Filter by decision definition keys that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter by decision definition category. Exact match.</td>
  </tr>
  <tr>
    <td>categoryLike</td>
    <td>Filter by decision definition categories that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Filter by decision definition version.</td>
  </tr>
  <tr>
    <td>latestVersion</td>
    <td>Only include those decision definitions that are latest versions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>Filter by the name of the decision definition resource. Exact match.</td>
  </tr>
  <tr>
    <td>resourceNameLike</td>
    <td>Filter by names of those decision definition resources that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>Filter by the id of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionKey</td>
    <td>Filter by the key of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>withoutDecisionRequirementsDefinition</td>
    <td>Only include decision definitions which belongs to no decision requirements definition. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A decision definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include decision definitions which belongs to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeDecisionDefinitionsWithoutTenantId</td>
    <td>Include decision definitions which belongs to no tenant. Can be used in combination with <code>tenantIdIn</code>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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

A JSON array of decision definition objects.
Each decision definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the decision definition, i.e. the id of the DMN 1.0 XML decision definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the decision definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the decision definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the decision definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the decision definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>String</td>
    <td>The id of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionKey</td>
    <td>String</td>
    <td>The key of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision definition.</td>
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

GET `/decision-definition?key=dish-decision&sortBy=category&sortOrder=asc`

## Response

```json
[
  {
    "id": "dish-decision:1:c633e8a8-41b7-11e6-b0ef-00aa004d0001",
    "key": "dish-decision",
    "category": "http://camunda.org/schema/1.0/dmn",
    "name": "Dish Decision",
    "version": 1,
    "resource": "drd-dish-decision.dmn",
    "deploymentId": "c627175e-41b7-11e6-b0ef-00aa004d0001",
    "decisionRequirementsDefinitionId":"dish:1:c633c195-41b7-11e6-b0ef-00aa004d0001",
    "decisionRequirementsDefinitionKey":"dish",
    "tenantId": null
  }
]
```
