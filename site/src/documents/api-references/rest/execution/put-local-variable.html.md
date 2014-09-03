---

title: 'Put Local Execution Variable'
category: 'Execution'

keywords: 'put'

---


Sets a variable in the context of a given execution. Update does not propagate upwards in the execution hierarchy.


Method
------

PUT `/execution/{id}/localVariables/{varId}`


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
    <td>The id of the execution to set the variable for.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>value</td>
    <td>The value of the variable to set. For custom text-based variable types, this may contain the serialized value.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>
      <p><i>Optional</i></p>
      <p>The simple class name of the variable value. Has to be compatible with the supplied variable type.</p>
    </td>
  </tr>
  <tr>
    <td>variableType</td>
    <td>The type of the variable to set. Valid values are the variable types that are available to the engine.
    </td>
    <!-- TODO: reference variable type docs here for default types -->
  </tr>
  <tr>
    <td>serializationConfig</td>
    <td>A json object containing meta-data that is required by the variable type when setting a serialized value. Required properties depend on the variable type. Primitive variable types do not require meta-data.</td>
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
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>      
</table>

  
Examples
--------

#### (1) Request

PUT `/execution/anExecutionId/localVariables/aVarName`

```json  
{"value" : "someValue", "type": "String"}
```

#### Response
    
Status 204. No content.


#### (2) Request
    
Set a custom class object from its JSON representation (requires to use the `SpinSerialization` variable type in the engine):

PUT `/execution/anExecutionId/localVariables/aVarName`

```json
{
  "value" : "{\"aKey\": \"aValue\"}", 
  "variableType": "SpinSerialization",
  "serializationConfig": {"dataFormatId": "application/json; implementation=tree", "rootType": "my.custom.Class"}
}
```
     
#### Response
    
Status 204. No content.