---

title: 'Get Definitions Count'
category: 'Process Definition'

keywords: 'get query list'

---


Request the number of process definitions that fulfill the query criteria. Takes the same filtering parameters as the
[GET query](#process-definition-get-definitions).


Method
--------------  

GET `/process-definition/count`


Parameters
--------------  


#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by process definition name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by process definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>Filter by process definition key, i.e. the id in the BPMN 2.0 XML. Exact match.</td>
  </tr>
  <tr>
    <td>keyLike</td>
    <td>Filter by process definition keys that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter by process definition category. Exact match.</td>
  </tr>
  <tr>
    <td>categoryLike</td>
    <td>Filter by process definition categories that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Filter by process definition version.</td>
  </tr>
  <tr>
    <td>latestVersion</td>
    <td>Only include those process definitions that are latest versions. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>resourceName</td>
    <td>Filter by the name of the process definition resource. Exact match.</td>
  </tr>
  <tr>
    <td>resourceNameLike</td>
    <td>Filter by names of those process definition resources that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>startableBy</td>
    <td>Filter by a user name who is allowed to start the process.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active process definitions. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended process definitions. Values may be `true` or `false`.</td>
  </tr>
</table>


Result
--------------  

A json object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching process definitions.</td>
  </tr>
</table>


Response codes
--------------  

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
    <td>Returned of some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy`. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/count?keyLike=Key&version=47`

#### Response

    {"count": 1}
