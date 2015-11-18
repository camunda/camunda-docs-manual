---

title: "Get Case Definitions"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-case-definition-get-query"
    parent: "rest-api-case-definition"
    pre: "GET `/case-definition`"

---


Query for case definitions that fulfill given parameters. Parameters may be the properties of case definitions, such as the name, key or version.
The size of the result set can be retrieved by using the [GET query count]({{< relref "reference/rest/case-definition/get-query-count.md" >}}).


# Method

GET `/case-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by case definition id.</td>
  </tr>
  <tr>
    <td>caseDefinitionIdIn</td>
    <td>Filter by case definition ids.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by case definition name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by case definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>Filter by case definition key, i.e. the id in the CMMN XML. Exact match.</td>
  </tr>
  <tr>
    <td>keyLike</td>
    <td>Filter by case definition keys that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter by case definition category. Exact match.</td>
  </tr>
  <tr>
    <td>categoryLike</td>
    <td>Filter by case definition categories that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Filter by case definition version.</td>
  </tr>
  <tr>
    <td>latestVersion</td>
    <td>Only include those case definitions that are latest versions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>Filter by the name of the case definition resource. Exact match.</td>
  </tr>
  <tr>
    <td>resourceNameLike</td>
    <td>Filter by names of those case definition resources that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>category</code>, <code>key</code>, <code>id</code>, <code>name</code>, <code>version</code> and <code>deploymentId</code>.
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

A JSON array of case definition objects.
Each case definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the case definition, i.e. the id of the CMMN XML case definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the case definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the case definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the case definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the case definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the case definition.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/case-definition?keyLike=Key&sortBy=category&sortOrder=asc`

## Response

    [
      {
        "id":"aCaseDefinitionId",
        "key":"aKey",
        "category":"aCategory",
        "name":"aName",
        "version":2,
        "resource":"aResourceName",
        "deploymentId":"aDeploymentId"
      }
    ]
