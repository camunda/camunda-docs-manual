---

title: 'Start Process Instance'
weight: 110

menu:
  main:
    name: "Start Instance"
    identifier: "rest-api-process-definition-start-process-instance"
    parent: "rest-api-process-definition"
    pre: "POST `/process-definition/{id}/start`
          </br>
          POST `/process-definition/key/{key}/start`
          </br>
          POST `/process-definition/key/{key}/tenant-id/{tenant-id}/start`"

---


Instantiates a given process definition. Process variables and business key may be supplied in the request body.


# Method

POST `/process-definition/{id}/start`

POST `/process-definition/key/{key}/start` (starts the latest version of process definition which belongs to no tenant)

POST `/process-definition/key/{key}/tenant-id/{tenant-id}/start` (starts the latest version of process definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definition belongs to.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties: (at least an empty object `{}`)

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing the variables the process is to be initialized with. Each key corresponds to a variable name and each value to a variable value. A variable value is a JSON object with the following properties:
    {{< rest-var-request >}}
  </tr>
  <tr>
    <td>businessKey</td>
    <td>The business key the process instance is to be initialized with.
	The business key uniquely identifies the process instance in the context of the given process definition.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>The case instance id the process instance is to be initialized with.</td>
  </tr>
  <tr>
    <td>startInstructions</td>
    <td>
        <b>Optional</b>. A JSON array of instructions that specify which activities to start the process instance at. If this property is omitted, the process instance starts at its default blank start event.
      <p>
        The instructions are executed in the order they are in. An instruction may have the following properties:
      </p>
      <table>
        <tr>
          <td>type</td>
          <td><b>Mandatory.</b> One of the following values: <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>startBeforeActivity</code> instruction requests to start execution before entering a given activity. A <code>startAfterActivity</code> instruction requests to start at the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
        </tr>
        <tr>
          <td>activityId</td>
          <td><b>Can be used with instructions of types <code>startBeforeActivity</code> and <code>startAfterActivity</code>.</b> Specifies the activity the instruction targets.</td>
        </tr>
        <tr>
          <td>transitionId</td>
          <td><b>Can be used with instructions of types <code>startTransition</code></b>. Specifies the sequence flow to start.</td>
        </tr>
        <tr>
          <td>variables</td>
          <td><p><b>Can be used with instructions of type <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>startTransition</code>.</b> A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.</p>
          {{< rest-var-request local="Indicates whether the variable should be a local variable or not. If set to <code>true</code>, the variable becomes a local variable of the execution entering the target activity." >}}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>
      Skip execution listener invocation for activities that are started or ended as part of this request.
      <p><b>Note:</b> This option is currently only respected when start instructions are submitted via the <code>startInstructions</code> property.</p>
    </td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>
      Skip execution of <a href="{{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started or ended as part of this request.
      <p><b>Note:</b> This option is currently only respected when start instructions are submitted via the <code>startInstructions</code> property.</p>
    </td>
  </tr>
</table>


# Result

A JSON object representing the newly created process instance.
Properties are:

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
    <td>definitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The case instance id of the process instance.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process instance.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the instance is still running or not.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the instance is suspended or not.</td>
  </tr>
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A JSON array containing links to interact with the instance.</td>
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
	<td>The instance could not be created due to an invalid variable value, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
	<td>The instance could not be created due to a non existing process definition key. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The instance could not be created successfully. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

### Starting a process instance at its default initial activity:

## Request

POST `/process-definition/aProcessDefinitionId/start`

POST `/process-definition/key/aProcessDefinitionKey/start`

Request body:

    {"variables":
        {"aVariable" : {"value" : "aStringValue", "type": "String"},
         "anotherVariable" : {"value" : true, "type": "Boolean"}},
	 "businessKey" : "myBusinessKey"
	}

## Response

    {"links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":"myBusinessKey",
    "tenantId":null,
    "ended":false,
    "suspended":false}

### Starting a process instance at two specific activities:

## Request

POST `/process-definition/aProcessDefinitionId/start`

POST `/process-definition/key/aProcessDefinitionKey/start`

Request Body:

    {"variables":
        {"aProcessVariable" : {"value" : "aStringValue", "type": "String"}},
	  "businessKey" : "myBusinessKey",
    "skipCustomListeners" : true,
    "startInstructions" :
      [
      {
        "type": "startBeforeActivity",
        "activityId": "activityId",
        "variables":
          {"var": {
            "value": "aVariableValue",
            "local": false,
            "type": "String"}
          }
      },
      {
        "type": "startAfterActivity",
        "activityId": "anotherActivityId",
        "variables":
          {"varLocal": {
            "value": "anotherVariableValue",
            "local": true,
            "type": "String"}
          }
      }]
	  }

## Response

    {"links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":"myBusinessKey",
    "tenantId":null,
    "ended":false,
    "suspended":false}
