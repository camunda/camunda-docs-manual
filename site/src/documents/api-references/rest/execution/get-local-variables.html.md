Get Local Execution Variables
=============================

Retrieves all variables of a given execution.


Method
------

GET `/execution/{id}/localVariables`


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
    <td>The id of the execution to retrieve the variables for.</td>
  </tr>
</table>


Result
------

A json object with a single `variables` property, which holds a json object of variables key-value pairs.
Each key is a variable name and each value a variable value object that has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>Object serialization uses <a href="http://jackson.codehaus.org">Jackson's</a> POJO/bean property introspection feature.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The simple class name of the variable object.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>Execution with given id does not exist. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
Example
-------

#### Request

GET `/execution/anExecutionId/localVariables`
  
#### Response

    {"variables":
      {"anExecutionVariableKey":
        {"value":
            {"property1":"aPropertyValue",
            "property2":true},
        "type":"ExampleVariableObject"}}
    }