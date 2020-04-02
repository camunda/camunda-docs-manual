---

title: "Get Historic Case Instances (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-case-instance-query"
    parent: "rest-api-history-case-instance"
    pre: "POST `/history/case-instance`"

---


Queries for historic case instances that fulfill the given parameters.


# Method

POST `/history/case-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseInstanceIds</td>
    <td>Filter by case instance ids. Must be a JSON array of case instance ids.</td>
  </tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the instances run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the instances run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionKeyNotIn</td>
    <td>Exclude instances that belong to a set of case definitions. Must be a JSON array of case definition keys.</td>
  </tr>
  <tr>
    <td>caseDefinitionName</td>
    <td>Filter by the name of the case definition the instances run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionNameLike</td>
    <td>Filter by case definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>caseInstanceBusinessKey</td>
    <td>Filter by case instance business key.</td>
  </tr>
  <tr>
    <td>caseInstanceBusinessKeyLike</td>
    <td>Filter by case instance business key that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>caseActivityIdIn</td>
    <td>Filter by a list of case activity ids. A historic case instance must have historic case activity instances in at least one of the given case activity ids.</td>
  </tr>
  <tr>
    <td>createdBefore</td>
    <td>Restrict to instances that were created before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to instances that were created after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>closedBefore</td>
    <td>Restrict to instances that were closed before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>closedAfter</td>
    <td>Restrict to instances that were closed after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>createdBy</td>
    <td>Only include case instances that were created by the given user.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>Restrict query to all case instances that are sub case instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>subCaseInstanceId</td>
    <td>Restrict query to one case instance that has a sub case instance with the given id.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>Restrict query to all case instances that are sub case instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>subProcessInstanceId</td>
    <td>Restrict query to one case instance that has a sub process instance with the given id.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a list of tenant ids. A case instance must have one of the given tenant ids. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic case instances which belongs to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Only include completed case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Only include terminated case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>closed</td>
    <td>Only include closed case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>notClosed</td>
    <td>Only include not closed case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON array to only include process instances that have/had variables with certain values. <br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match all variable names provided in <code>variables</code> case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match all variable values provided in <code>variables</code> case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>instanceId</code>, <code>definitionId</code>, <code>businessKey</code>, <code>createTime</code>, <code>closeTime</code>, <code>duration</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

# Result

A JSON array of historic case instance objects.
Each historic case instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case instance.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionName</td>
    <td>String</td>
    <td>The name of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>String</td>
    <td>The key of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the instance was created. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>closeTime</td>
    <td>String</td>
    <td>The time the instance was closed. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>createUserId</td>
    <td>String</td>
    <td>The id of the user who created the case instance.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>String</td>
    <td>The id of the parent process instance, if it exists.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the case instance.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>If true, this case instance is active.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>If true, this case instance is completed.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Boolean</td>
    <td>If true, this case instance is terminated.</td>
  </tr>
  <tr>
    <td>closed</td>
    <td>Boolean</td>
    <td>If true, this case instance is closed.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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

POST `/history/case-instance`

Request Body:

```json
{
  "caseInstanceIds": [
    "aCaseInstId",
    "anotherId"
  ],
  "closedAfter": "2013-01-01T00:00:00.000+0200",
  "closedBefore": "2013-04-01T23:59:59.000+0200",
  "sorting":
    [{"sortBy": "businessKey",
    "sortOrder": "asc"
    },
    {"sortBy": "createTime",
    "sortOrder": "desc"
    }]
}
```

## Response

```json
[
  {
    "id": "aCaseInstId",
    "businessKey": "aKey",
    "caseDefinitionId": "aCaseDefId",
    "createTime": "2013-03-23T13:42:43.000+0200",
    "closeTime": "2013-03-23T13:42:45.000+0200",
    "durationInMillis": 2000,
    "createUserId": "aCreateUserId",
    "superCaseInstanceId": "aSuperCaseInstanceId",
    "superProcessInstanceId": null,
    "tenantId": null,
    "active": true,
    "completed": false,
    "terminated": false,
    "closed": false
  }
]
```
