---

title: 'Get Definitions'
weight: 50

menu:
  main:
    name: "Get List"
    identifier: "rest-api-process-definition-get-definitions"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition`"

---


Queries for process definitions that fulfill given parameters. Parameters may be the properties of process definitions, such as the name, key or version.
The size of the result set can be retrieved by using the [Get Definition Count]({{< relref "reference/rest/process-definition/get-query-count.md" >}}) method.


# Method

GET `/process-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionIdIn</td>
    <td>Filter by process definition ids.</td>
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
    <td>Filter by process definition key, i.e., the id in the BPMN 2.0 XML. Exact match.</td>
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
    <td>Only include those process definitions that are latest versions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>Only include active process definitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended process definitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>incidentId</td>
    <td>Filter by the incident id.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>Filter by the incident type. See the <a href="{{< relref "user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
  </tr>
  <tr>
    <td>incidentMessage</td>
    <td>Filter by the incident message. Exact match.</td>
  </tr>
  <tr>
    <td>incidentMessageLike</td>
    <td>Filter by the incident message that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A process definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include process definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeProcessDefinitionsWithoutTenantId</td>
    <td>Include process definitions which belong to no tenant. Can be used in combination with <code>tenantIdIn</code>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>versionTag</td>
    <td>Filter by the version tag.</td>
  </tr>
  <tr>
    <td>versionTagLike</td>
    <td>Filter by the version tag that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>category</code>, <code>key</code>, <code>id</code>, <code>name</code>, <code>version</code>, <code>deploymentId</code>, <code>tenantId</code> and <code>versionTag</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.
    <strong>Note:</strong> Sorting by versionTag is string based. The version will not be interpreted. As an example, the sorting could return v0.1.0, v0.10.0, v0.2.0.</td>
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

A JSON array of process definition objects.
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
    <td>The key of the process definition, i.e., the id of the BPMN 2.0 XML process definition.</td>
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
    <td>The deployment id of the process definition.</td>
  </tr>
  <tr>
    <td>diagram</td>
    <td>String</td>
    <td>The file name of the process definition diagram, if it exists.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the definition is suspended or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process definition.</td>
  </tr>
  <tr>
    <td>versionTag</td>
    <td>String</td>
    <td>The version tag of the process or <i>null</i> when no version tag is set</td>
  </tr>
  <tr>
      <td>historyTimeToLive</td>
      <td>Number</td>
      <td>History time to live value of the process definition. Is used within <a href="{{< relref "user-guide/process-engine/history-cleanup.md">}}">History cleanup</a>.</td>
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

GET `/process-definition?keyLike=invoice&sortBy=version&sortOrder=asc`

## Response

```json
  [
    {
      "id": "invoice:1:c3a63aaa-2046-11e7-8f94-34f39ab71d4e",
      "key": "invoice",
      "category": "http://www.omg.org/spec/BPMN/20100524/MODEL",
      "description": null,
      "name": "Invoice Receipt",
      "version": 1,
      "resource": "invoice.v1.bpmn",
      "deploymentId": "c398cd26-2046-11e7-8f94-34f39ab71d4e",
      "diagram": null,
      "suspended": false,
      "tenantId": null,
      "versionTag": null,
      "historyTimeToLive": 5
    },
    {
      "id": "invoice:2:c3e1bd16-2046-11e7-8f94-34f39ab71d4e",
      "key": "invoice",
      "category": "http://www.omg.org/spec/BPMN/20100524/MODEL",
      "description": null,
      "name": "Invoice Receipt",
      "version": 2,
      "resource": "invoice.v2.bpmn",
      "deploymentId": "c3d82020-2046-11e7-8f94-34f39ab71d4e",
      "diagram": null,
      "suspended": false,
      "tenantId": null,
      "versionTag": null,
      "historyTimeToLive": null
    }
  ]
```

