---

title: "Get Historic Activity Statistics"
weight: 140

menu:
  main:
    identifier: "rest-api-history-get-historic-activity-statistics"
    parent: "rest-api-history"

---


Retrieves historic statistics of a given process definition grouped by activities.
These statistics include the number of running activity instances, optionally the number of canceled activity instances, finished activity instances and also optionally the number of activity instances, which completed a scope (i.e., in BPMN 2.0 manner: a scope is completed by an activity instance when the activity instance consumed a token but did not emit a new token).<br/>
__Note:__ This only includes historic data.


Method
--------------

GET `/history/process-definition/{id}/statistics`


Parameters
--------------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition.</td>
  </tr>
</table>

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Whether to include the number of canceled activity instances in the result or not. Valid values are <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Whether to include the number of finished activity instances in the result or not. Valid values are <code>true</code> or <code>false</code>.</td>
  <tr>
    <td>completeScope</td>
    <td>Whether to include the number of activity instances which completed a scope in the result or not. Valid values are <code>true</code> or <code>false</code>.</td>
  </tr>
  <td>sortBy</td>
    <td>Sort the results by a given criterion. A valid value is <code>activityId</code>. Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


Result
--------------

A JSON array containing statistics results per activity.
Each object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the activity the results are aggregated for.</td>
  </tr>
  <tr>
    <td>instances</td>
    <td>Number</td>
    <td>The total number of all running instances of the activity.</td>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Number</td>
    <td>The total number of all canceled instances of the activity. <strong>Note:</strong> Will be <code>0</code> (not <code>null</code>), if canceled activity instances were excluded.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Number</td>
    <td>The total number of all finished instances of the activity. <strong>Note:</strong> Will be <code>0</code> (not <code>null</code>), if finished activity instances were excluded.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Number</td>
    <td>The total number of all instances which completed a scope of the activity. <strong>Note:</strong> Will be <code>0</code> (not <code>null</code>), if activity instances which completed a scope were excluded.</td>
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


Examples
--------

#### Request with query parameter `canceled=true`

GET `history/process-definition/aProcessDefinitionId/statistics?canceled=true`

#### Response

    [
      {
        "id": "anActivity",
        "instances": 123,
        "canceled": 50,
        "finished": 0,
        "completeScope": 0
      },
      {
        "id":"anotherActivity",
        "instances": 200,
        "canceled": 150,
        "finished": 0,
        "completeScope": 0
      }
    ]

#### Request with query parameter `finished=true`

GET `history/process-definition/aProcessDefinitionId/statistics?finished=true`

#### Response

    [
      {
        "id": "anActivity",
        "instances": 123,
        "canceled": 0,
        "finished": 20,
        "completeScope": 0
      },
      {
        "id":"anotherActivity",
        "instances": 200,
        "canceled": 0,
        "finished": 30,
        "completeScope": 0
      }
    ]

#### Request with query parameter `completeScope=true`

GET `history/process-definition/aProcessDefinitionId/statistics?completeScope=true`

#### Response

    [
      {
        "id": "anActivity",
        "instances": 123,
        "canceled": 0,
        "finished": 0,
        "completeScope": 20
      },
      {
        "id":"anotherActivity",
        "instances": 200,
        "canceled": 0,
        "finished": 0,
        "completeScope": 1
      }
    ]
