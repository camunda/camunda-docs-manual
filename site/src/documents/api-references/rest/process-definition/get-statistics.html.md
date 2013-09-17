---

title: 'Get Process Instance Statistics'
category: 'Process Definition'

keywords: 'get runtime'

---


Retrieves runtime statistics of the process engine grouped by process definitions.
These statistics include the number of running process instances, optionally the number of failed jobs and also optionally the number of incidents either grouped by incident types or for a specific incident type.<br/>
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
  <tr>
    <td>incidents</td>
    <td>Valid values for this property are `true` or `false`. If this property has been set to `true` the result will include for each occurred incident type the corresponding number of incidents. In the case of `false` the incidents will not be included in the result.</td>
  </tr>
  <tr>
    <td>incidentsForType</td>
    <td>If this property has been set with any incident type (i.e. a string value) the result will only include the number of incidents for the assigned incident type.</td>
  </tr>  
</table>

__Note:__ The query parameters `incidents` and `incidentsForType` are exclusive. It is not possible to send a request with both query parameters. In that case the response will be a bad request.

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
    <strong>Note:</strong> Will be `0` (not `null`), if failed jobs were excluded.</td>
  </tr>
  <tr>
    <td>definition</td>
    <td>Object</td>
    <td>The process definition with the properties as described in the [get single definition](#process-definition-get-single-definition) method.</td>
  </tr>
  <tr>
    <td>incidents</td>
    <td>Array</td>
    <td>Each item in the resulting array is an object which contains the following properties:
        <ul>
          <li>incidentType: The type of the incident the number of incidents is aggregated for.</li>
          <li>incidentCount: The total number of incidents for the corresponding incident type.</li>
        </ul>
        <strong>Note:</strong> Will be an empty array, if `incidents` or `incidentsForType` were excluded. Furthermore, the array will be also empty, if no incidents were found.
    </td>
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
    <td>If both query parameters `incidents` and `incidentsForType` were set. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
</table>


Examples
--------

#### Request with query parameter `failedJobs=true`

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
        "suspended":false},
      "incidents:" []
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
        "suspended":false},
      "incidents:" []        
    }]

#### Request with query parameter `incidents=true`

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?incidents=true`

#### Response

    [{"id":"aProcessDefinitionId",
      "instances":123,
      "failedJobs":0,
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
        "suspended":false},
      "incidents":
      [
        {"incidentType":"failedJob", "incidentCount": 42 },
        {"incidentType":"aIncident", "incidentCount": 20 }        
      ]        
     },
     {"id":"aProcessDefinitionId:2",
      "instances":124,
      "failedJobs":0,
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
        "suspended":false},
      "incidents":
      [
        { "incidentType":"failedJob", "incidentCount": 43 },
        { "incidentType":"aIncident", "incidentCount": 22 }
        { "incidentType":"anotherIncident", "incidentCount": 15 }
      ]        
    }]

#### Request with query parameter `incidentsForType=aIncident`

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?incidentsForType=aIncident`

#### Response

    [{"id":"aProcessDefinitionId",
      "instances":123,
      "failedJobs":0,
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
        "suspended":false},
      "incidents":
      [
        {"incidentType":"aIncident", "incidentCount": 20 }        
      ]        
     },
     {"id":"aProcessDefinitionId:2",
      "instances":124,
      "failedJobs":0,
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
        "suspended":false},
      "incidents": []        
    }]
