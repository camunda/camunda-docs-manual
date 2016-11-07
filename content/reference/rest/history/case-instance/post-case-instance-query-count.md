---

title: "Get Historic Case Instance Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-history-post-case-instance-query-count"
    parent: "rest-api-history-case-instance"
    pre: "POST `/history/case-instance/count`"

---


Queries for the number of historic case instances that fulfill the given parameters.
This method takes the same message body as the [Get Historic Case Instances (POST)]({{< relref "reference/rest/history/case-instance/post-case-instance-query.md" >}}) method and therefore it is slightly more powerful than the [Get Historic Case Instance Count]({{< relref "reference/rest/history/case-instance/get-case-instance-query-count.md" >}}) method.


# Method

POST `/history/case-instance/count`


# Parameters

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
    <td>Restrict to instances that were created before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to instances that were created after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>closedBefore</td>
    <td>Restrict to instances that were closed before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>closedAfter</td>
    <td>Restrict to instances that were closed after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
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
    <td>Only include historic case instances which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>The number of matching historic case instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/case-instance/count`

Request Body:

```json
{
  "caseInstanceIds": [
    "aCaseInstId",
    "anotherId"
  ],
  "closedAfter": "2013-01-01T00:00:00",
  "closedBefore": "2013-04-01T23:59:59"
}
```

## Response

```json
{
  "count": 1
}
```
