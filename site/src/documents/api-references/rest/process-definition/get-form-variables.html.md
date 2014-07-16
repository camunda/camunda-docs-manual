---

title: 'Get Start Form Variables'
category: 'Process Definition'

keywords: 'get'

---

Retrieves the start form variables for a process definition. The start form variables take into
account form data specified on the start event. If form fields are defined, the variable types and
default values of the form fields are taken into account.

Method
--------------  

GET `/process-definition/{id}/form-variables`

GET `/process-definition/key/{key}/form-variables` (returns the form variables for the latest 
process definition by key).


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
    <td>The id of the process definition to retrieve the variables for.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition to retrieve the variable for. Will select the latest
version of the process definition by key.</td>
  </tr>
</table>

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableNames</td>
    <td>A comma-separated list of variable names. Allows restricting the list of requested 
        variables to the variable names in the list. It is best practice restricting the list of 
        variables to the variables actually required by the form in order to minimize fetching of
        data. If the query parameter is ommitted all variables are fetched. If the query parameter
        contains unexisting variable names, the variable names are ignored.</td>
  </tr>
</table>

Result
--------------  

A json object containing a property for each variable returned. The key is the variable name, the
value is a json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the variable instance.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the variable instance.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The simple class name of the variable instance.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>Object serialization uses <a href="http://jackson.codehaus.org">Jackson's</a> POJO/bean property introspection feature.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance that this variable instance belongs to.</td>
  </tr>  
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td></td>
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
    <td>application/xhtml+xml</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

GET `/process-definition/anId/form-variables`

GET `/process-definition/anId/form-variables?variableNames=a,b,c`

GET `/process-definition/key/aKey/form-variables`

#### Response

```json
{
  "amount": {
      "id": "someId",
      "name": "amount",
      "type": "integer",
      "value": 5,
      "processInstanceId": null,
      "executionId": null,
      "taskId": null,
      "activityInstanceId": null,
      "errorMessage": null,
      "caseExecutionId": null,
      "caseInstanceId": null
  },
  "firstName": {
      "id": "anotherId",
      "name": "firstName",
      "type": "String",
      "value": "Jonny",
      "processInstanceId": null,
      "executionId": null,
      "taskId": null,
      "activityInstanceId": null,
      "errorMessage": null,
      "caseExecutionId": null,
      "caseInstanceId": null
  }

}
```
