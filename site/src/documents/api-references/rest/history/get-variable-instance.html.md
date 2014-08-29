---

title: "Get Single Variable Instance"
category: 'History'

keywords: 'get'

---


Retrieves a single historic variable by id.


Method
------

GET `/history/variable-instance/{id}`


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
    <td>The id of the variable instance.</td>
  </tr>
</table>


Result
------

A user object with the following properties:

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
    <td>The type of the variable instance.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean</td>
    <td>The variable's value if it is a primitive value. 
    <code>null</code> for custom object types.</td>
    <!-- TODO: ref variable docs here -->
  </tr>
  <tr>
    <td>serializedValue</td>
    <td>Object</td>
    <td>A json object that contains the variable's serialized value.
    Always <code>null</code> unless the variable type stores custom  objects in a text-based format. If filled, contains a String field <code>value</code> with the variable's serialized value and a field <code>configuration</code> with a map of type-specific configuration values.</td>
    <!-- TODO: ref variable docs here -->
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id the process instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance in which the variable is valid.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>An error message in case a Java Serialized Object could not be de-serialized.</td>
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
    <td>Variable with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/history/variable-instance/someId`
  
#### Response

Status 200.

    {
      "id": "someId"
      "name": "amount",
      "type": "integer",
      "value": 5,
      "processInstanceId": "aProcessInstanceId",
      "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726",
      "errorMessage": null,
      "serializedValue": null
    }
