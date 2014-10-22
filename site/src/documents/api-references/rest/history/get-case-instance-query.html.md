---

title: 'Get Case Instances'
category: 'History'

keywords: 'historic get query list'

---


Query for historic case instances that fulfill the given parameters.  The size of the result set can
be retrieved by using the [get historic case instances count](ref:#history-get-case-instances-count)
method.


Method
------

GET `/history/case-instance`


Parameters
----------

#### Query Parameters

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
    <td>Filter by case instance ids. Must be a comma-separated list of case instance ids.</td>
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
    <td>Exclude instances that belong to a set of case definitions. Must be a comma-separated list of case definition keys.</td>
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
    <td>active</td>
    <td>Only include active case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Only include completed case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Only include terminated case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>failed</td>
    <td>Only include failed case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>closed</td>
    <td>Only include closed case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>notClosed</td>
    <td>Only include not closed case instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>instanceId</code>, <code>definitionId</code>, <code>businessKey</code>, <code>createTime</code>, <code>closeTime</code>, <code>duration</code>.
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


Result
------

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
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the instance was created. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>closeTime</td>
    <td>String</td>
    <td>The time the instance was closed. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
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
-------

#### Request

GET `/history/case-instance?closedAfter=2013-01-01T00:00:00&closedBefore=2013-04-01T23:59:59`

#### Response

```json
[
  {
    "id": "aCaseInstId",
    "businessKey": "aKey",
    "caseDefinitionId": "aCaseDefId",
    "createTime": "2013-03-23T13:42:43",
    "closeTime": "2013-03-23T13:42:45",
    "durationInMillis": 2000,
    "createUserId": "aStartUserId",
    "superCaseInstanceId": "aSuperCaseInstanceId"
  }
]
```
