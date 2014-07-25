---

title: 'Get Process Instances (POST)'
category: 'History'

keywords: 'historic post query list'

---


Query for historic process instances that fulfill the given parameters. 
This method is slightly more powerful than the [GET query](ref:#history-get-process-instances) because it allows filtering by multiple process variables of types `String`, `Number` or `Boolean`.


Method
------

POST `/history/process-instance`


Parameters
----------  
  
#### Query Parameters

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


#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>Filter by process instance ids. Must be a comma-separated list of process instance ids.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKey</td>
    <td>Filter by process instance business key.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyLike</td>
    <td>Filter by process instance business key that the parameter is a substring of.</td>
  </tr>  
  <tr>
    <td>superProcessInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyNotIn</td>
    <td>Exclude instances that belong to a set of process definitions. Must be a comma-separated list of process definition keys.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Filter by the name of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionNameLike</td>
    <td>Filter by process definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished process instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished process instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>startedBy</td>
    <td>Only include process instances that were started by the given user.</td>
  </tr>
  <tr>
    <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
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
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>instanceId</code>, <code>definitionId</code>, <code>businessKey</code>, <code>startTime</code>, <code>endTime</code>, <code>duration</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


Result
------

A JSON array of historic process instance objects.
Each historic process instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>String</td>
    <td>The id of the parent process instance, if it exists.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>String</td>
    <td>The time the instance was started. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>startUserId</td>
    <td>String</td>
    <td>The id of the user who started the process instance.</td>
  </tr>
  <tr>
    <td>startActivityId</td>
    <td>String</td>
    <td>The id of the initial activity that was executed (e.g. a start event).</td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>String</td>
    <td>The provided delete reason in case the process instance was canceled during execution.</td>
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

POST `/history/process-instance`
  
Request body:

    {"variables": 
        [{"name": "myVariable",
         "operator": "eq",
         "value": "camunda"
        },
        {"name": "mySecondVariable",
         "operator": "neq",
         "value": 124}],
    "finishedAfter":"2013-01-01T00:00:00",
    "finishedAfter":"2013-04-01T23:59:59"}
  
#### Response

    [{"id": "aProcInstId",
    "businessKey": "aKey",
    "processDefinitionId": "aProcDefId",
    "startTime": "2013-03-23T13:42:43",
    "endTime": "2013-03-23T13:42:45",
    "durationInMillis": 2000,
    "startUserId": "aStartUserId",
    "startActivityId": "aStartActivityId",
    "deleteReason": "aDeleteReason",
    "superProcessInstanceId": "aSuperProcessInstanceId"}]
