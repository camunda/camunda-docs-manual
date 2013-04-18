Get Process Instance Statistics
===============================

Retrieves runtime statistics of the process engine grouped by process definitions.
These statistics include the number of running process instances and optionally the number of failed jobs.<br/>
__Note:__ This does not include historic data.


Method
------

GET `/process-definition/statistics`


Parameters
----------

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
------

A json array containing statistics results per process definition.
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
    <td>The id of the process definition the results are aggregated for.</td>
  </tr>
  <tr>
    <td>instances</td>
    <td>Number</td>
    <td>The total number of running process instances of this process definition.</td>
  </tr>
  <tr>
    <td>failedJobs</td>
    <td>Number</td>
    <td>The total number of failed jobs for the running instances.<br/>
    __Note:__ Will be `0` (not `null`), if failed jobs were excluded.</td>
  </tr>
  <tr>
    <td>definition</td>
    <td>Object</td>
    <td>The process definition with the properties as described in the <a href="#!/process-definition/get" doc-location-highlight>get single definition</a> method.</td>
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
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?failedJobs=true`

#### Response

    [{"id":"aProcessDefinitionId",
     "instances":123,
     "failedJobs":42,
     "definition":
        {"id":"aProcessDefinitionId",
        "key":"aKey",
        "category":null,
        "description":null,
        "name":"aName",
        "version":0,
        "resource":null,
        "deploymentId":null,
        "diagram":null,
        "suspended":false}
    },
    {"id":"aProcessDefinitionId:2",
    "instances":124,
    "failedJobs":43,
    "definition":
        {"id":"aProcessDefinitionId:2",
        "key":"aKey",
        "category":null,
        "description":null,
        "name":"aName",
        "version":0,
        "resource":null,
        "deploymentId":null,
        "diagram":null,
        "suspended":false}
    }]