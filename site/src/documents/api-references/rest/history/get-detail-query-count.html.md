---

title: 'Get Historic Details Count'
category: 'History'

keywords: 'historic get query list'

---

Query for the number of historic details that fulfill the given parameters. 
Takes the same parameters as the [get historic details](ref:#history-get-historic-details) method.


Method
------

GET `/history/detail/count`


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by execution id.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>Filter by activity instance id.</td>
  </tr>
  <tr>
    <td>variableInstanceId</td>
    <td>Filter by variable instance id.</td>
  </tr>
  <tr>
    <td>formFields</td>
    <td>Only include <strong>HistoricFormFields</strong>. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>variableUpdates</td>
    <td>Only include <strong>HistoricVariableUpdates</strong>. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>excludeTaskDetails</td>
    <td>Excludes all task-related <strong>HistoricDetails</strong>, so only items which have no task id set will be selected. When this parameter is used together with <code>taskId</code>, this call is ignored and task details are <strong>not</strong> excluded. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
</table>


Result
------

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
    <td>The number of matching historic details.</td>
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
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/detail/count?variableName=my_variable`
  
#### Response

    {"count": 3}
