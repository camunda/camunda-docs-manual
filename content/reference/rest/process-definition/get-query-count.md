---

title: 'Get Definition Count'
weight: 40

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-process-definition-get-definitions-count"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/count`"

---


Requests the number of process definitions that fulfill the query criteria. Takes the same filtering parameters as the
[Get Definitions]({{< ref "/reference/rest/process-definition/get-query.md" >}}) method.


# Method

GET `/process-definition/count`


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
    <td>keysIn</td>
    <td>Filter by process definition keys.</td>
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
    <td>Filter by the incident type. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
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
    <td>withoutVersionTag</td>
    <td>Only include process definitions without a <code>versionTag</code></td>
  </tr>
  <tr>
    <td>startableInTasklist</td>
    <td>Filter by process definitions which are startable in Tasklist.</td>
  </tr>
  <tr>
    <td>startablePermissionCheck</td>
    <td>Filter by process definitions which the user is allowed to start in Tasklist. If the user doesn't have these permissions the result will be empty list.<br/>
    The permissions are:<br/>
        * CREATE permission for all Process instances<br/>
        * CREATE_INSTANCE and READ permission on Process definition level<br/>
    </td>
  </tr>
  <tr>
    <td>notStartableInTasklist</td>
    <td>Filter by process definitions which are not startable in Tasklist.</td>
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
    <td>The number of matching process definitions.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/count?keyLike=Key&version=47`

## Response

    {"count": 1}
