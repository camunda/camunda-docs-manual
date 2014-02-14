---

title: 'Get Definitions'
category: 'Process Definition'

keywords: 'get query list'

---


Query for process definitions that fulfill given parameters. Parameters may be the properties of process definitions, such as the name, key or version.
The size of the result set can be retrieved by using the [GET query count](ref:#process-definition-get-definitions-count).


Method
--------------

GET `/process-definition`


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
    <td>ver</td>
    <td>Filter by process definition version.</td>
  </tr>
  <tr>
    <td>latest</td>
    <td>Only include those process definitions that are latest versions. Values may be <code>true</code> or <code>false</code>.</td>
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
    <td>Only include active process definitions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended process definitions. Values may be <code>true</code> or <code>false</code>.</td>
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
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>


Result
--------------  

A json array of process definition objects.
Each process definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the process definition, i.e. the id of the BPMN 2.0 XML process definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the process definition.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The description of the process definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the process definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the process definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>diagram</td>
    <td>String</td>
    <td>The file name of the process definition diagram, if exists.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the definition is suspended.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition?keyLike=Key&sortBy=category&sortOrder=asc`

#### Response

    [{"id":"aProcessDefinitionId",
    "key":"aKey",
    "category":"aCategory",
    "description":"aDescription",
    "name":"aName",
    "version":42,
    "resource":"aResourceName",
    "deploymentId":"aDeploymentId",
    "diagram":"aResourceName",
    "suspended":true}]
