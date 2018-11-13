---

title: "Get Decision Definitions Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-decision-definition-get-query-count"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition/count`"

---


Request the number of decision definitions that fulfill the query criteria.
Takes the same filtering parameters as the [GET query]({{< ref "/reference/rest/decision-definition/get-query.md" >}}).


# Method

GET `/decision-definition/count`


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
</table>


# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching decision definitions.</td>
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
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-definition/count?key=myDecisionKey&version=2`

## Response

```json
{
  "count": 1
}
```
