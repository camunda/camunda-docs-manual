---

title: 'Complete Case Instance'
category: 'Case Instance'

keywords: 'post'

---

Performs a transition from <code>ACTIVE</code> state to <code>COMPLETED</code> state. In releation to the state transition it is possible to update or delete case instance variables (deletes precede updates).


Method
------

POST `/case-instance/{id}/complete`


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
    <td>The id of the case instance to complete.</td>
  </tr>
</table>
  

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json object containing variable key-value pairs. Each key is a variable name and each value a json variable value object.
    A variable value object has the property <code>value</code>, which is the value to create or update, and <code>type</code>, which represents the type of the value. Valid types are String, Integer, Short, Long, Double and Date.</td>
  </tr>
  <tr>
    <td>deletions</td>
    <td>An array containg json objects. Each json object has a property <code>name</code> which is the name of the variable to delete.</td>
  </tr>
</table>


Result
------

This method returns no content.


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
    <!-- At the moment it is not possible to distinguish between case execution not found, transition not allowed etc. Because it is always thrown a ProcessEngineException. -->
    <td>The case instance could not be found or the state transition is not allowed to be performed. For example when the case instance is already completed. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
</table>

Example
-------

#### Request

POST `/case-instance/aCaseInstanceId/complete`

Request body:

    {
      "variables": 
        {
          "aVariable" : { "value" : "aStringValue", "type": "String" },
          "anotherVariable" : { "value" : true, "type": "Boolean" }
        },
      "deletions":
         [
            { "name" : "aVariableToDelete" },
            { "name" : "anotherVariableToDelete" }
          ]
    }

#### Response

Status 204. No content.
