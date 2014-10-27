---

title: 'Get Case Instances Count (POST)'
category: 'History'

keywords: 'historic post query list'

---


Query for the number of historic case instances that fulfill the given parameters.
This method takes the same message body as the [POST query](ref:#history-get-case-instances-post)
and therefore it is slightly more powerful than the [GET query count](ref:#history-get-case-instances-count).


Method
------

POST `/history/case-instance/count`


Parameters
----------

#### Request Body

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
    <td>Filter by case instance ids. Must be a json array of case instance ids.</td>
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
    <td>Exclude instances that belong to a set of case definitions. Must be a json array of case definition keys.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/history/case-instance/count`

Request body:

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

#### Response

```json
{
  "count": 1
}
```
