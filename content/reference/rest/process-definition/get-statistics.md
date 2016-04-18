---

title: 'Get Process Instance Statistics'
weight: 80

menu:
  main:
    identifier: "rest-api-process-definition-get-process-instance-statistics"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/statistics`"

---

Retrieves runtime statistics of the process engine grouped by process definitions.
These statistics include the number of running process instances, optionally the number of failed jobs and also optionally the number of incidents either grouped by incident types or for a specific incident type.<br/>
__Note:__ This does not include historic data.


# Method

GET `/process-definition/statistics`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>failedJobs</td>
    <td>Whether to include the number of failed jobs in the result or not. Valid values are <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>incidents</td>
    <td>Valid values for this property are <code>true</code> or <code>false</code>. If this property has been set to <code>true</code> the result will include the corresponding number of incidents for each occurred incident type. If it is set to <code>false</code>, the incidents will not be included in the result. Cannot be used in combination with <code>incidentsForType</code>.</td>
  </tr>
  <tr>
    <td>incidentsForType</td>
    <td>If this property has been set with any incident type (i.e. a string value) the result will only include the number of incidents for the assigned incident type. Cannot be used in combination with <code>incidents</code>.</td>
  </tr>
</table>

# Result

A JSON array containing statistics results per process definition.
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
    <strong>Note:</strong> Will be <code>0</code> (not <code>null</code>), if failed jobs were excluded.</td>
  </tr>
  <tr>
    <td>definition</td>
    <td>Object</td>
    <td>The process definition with the properties as described in the <a href="{{< relref "reference/rest/process-definition/get.md" >}}">get single definition</a> method.</td>
  </tr>
  <tr>
    <td>incidents</td>
    <td>Array</td>
    <td>Each item in the resulting array is an object which contains the following properties:
        <ul>
          <li>incidentType: The type of the incident the number of incidents is aggregated for.</li>
          <li>incidentCount: The total number of incidents for the corresponding incident type.</li>
        </ul>
        <strong>Note:</strong> Will be an empty array, if <code>incidents</code> or <code>incidentsForType</code> were excluded. Furthermore, the array will be also empty if no incidents were found.
    </td>
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
    <td>If both query parameters <code>incidents</code> and <code>incidentsForType</code> were set. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Examples

## Request with Query Parameter `failedJobs=true`

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?failedJobs=true`

## Response

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
        "suspended":false,
        "tenantId":null,
        "versionTag":"1.0.0"},
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
        "suspended":false,
        "tenantId":null,
        "versionTag":null},
      "incidents:" []
    }]

## Request with Query Parameter `incidents=true`

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?incidents=true`

## Response

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
        "suspended":false,
        "tenantId":null,
        "versionTag":"1.0.0"},
      "incidents":
      [
        {"incidentType":"failedJob", "incidentCount": 42 },
        {"incidentType":"anIncident", "incidentCount": 20 }
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
        "suspended":false,
        "tenantId":null,
        "versionTag":null},
      "incidents":
      [
        { "incidentType":"failedJob", "incidentCount": 43 },
        { "incidentType":"anIncident", "incidentCount": 22 }
        { "incidentType":"anotherIncident", "incidentCount": 15 }
      ]
    }]

## Request with Query Parameter `incidentsForType=anIncident`

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/statistics?incidentsForType=anIncident`

## Response

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
        "suspended":false,
        "tenantId":null,
        "semanticVersion":"1.0.0"},
      "incidents":
      [
        {"incidentType":"anIncident", "incidentCount": 20 }
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
        "suspended":false,
        "tenantId":null,
        "versionTag":null},
      "incidents": []
    }]
