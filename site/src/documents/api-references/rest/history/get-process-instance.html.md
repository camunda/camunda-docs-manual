---

title: 'Get Single Process Instance'
category: 'History'

keywords: 'get'

---


Retrieves a single historic process instance according to the `HistoricProcessInstance` interface in the engine.


Method
------

GET `/history/process-instance/{id}`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic process instance to be retrieved.</td>
  </tr>
</table>


Result
------

A JSON object corresponding to the `HistoricProcessInstance` interface in the engine.
Its properties are as follows:
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
    <td>404</td>
    <td>application/json</td>
    <td>Historic process instance with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/history/process-instance/aProcInstId`

#### Response

    {
      "id": "aProcInstId",
      "businessKey": "aKey",
      "processDefinitionId": "aProcDefId",
      "startTime": "2013-03-23T13:42:43",
      "endTime": "2013-03-23T13:42:45",
      "durationInMillis": 2000,
      "startUserId": "aStartUserId",
      "startActivityId": "aStartActivityId",
      "deleteReason": "aDeleteReason",
      "superProcessInstanceId": "aSuperProcessInstanceId"
    }
