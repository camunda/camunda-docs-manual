Get Activity Instance Statistics
==================

Retrieves runtime statistics of a given process definition grouped by activities.
These statistics include the number of running activity instances and optionally the number of failed jobs.<br/>
__Note:__ This does not include historic data.


Method
--------------  

GET `/process-definition/{id}/statistics`


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
    <td>failedJobs</td>
    <td>Whether to include the number of failed jobs in the result or not. Valid values are `true` or `false`.</td>
  </tr>
</table>


Result
--------------  

A json array containing statistics results per activity.
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
    <td>The total number of running instances of this activity.</td>
  </tr>
  <tr>
    <td>failedJobs</td>
    <td>Number</td>
    <td>The total number of failed jobs for the running instances.<br/>
    __Note:__ Will be `0` (not `null`), if failed jobs were excluded.</td>
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
</table>


Example
--------------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId/statistics?failedJobs=true`

#### Response

    [{"id":"anActivity",
     "instances":123,
     "failedJobs":42
     },
     {"id":"anotherActivity",
     "instances":124,
     "failedJobs":43}]
