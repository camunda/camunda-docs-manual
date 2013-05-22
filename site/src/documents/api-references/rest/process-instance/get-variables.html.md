Get Process Variables
=====================

Retrieves all variables of a given process instance.


Method
------

GET `/process-instance/{id}/variables`


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
    <td>The id of the process instance to retrieve the variables for.</td>
  </tr>
</table>


Result
------

A json object with a single `variables` property, which holds an array of variable objects.
Each variable object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the process variable.</td>
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
    <td>Process instance with given id does not exist. See the [Introduction](/api-references/rest/#!/overview/introduction) for the error response format.</td>
  </tr>
</table>

  
Example
-------

#### Request

GET `/process-instance/aProcessInstanceId/variables`
  
#### Response

    {"variables":
      [{"name":"aProcessVariableKey",
       "value":
        {"property1":"aPropertyValue",
        "property2":true},
       "type":"ExampleVariableObject"}]}