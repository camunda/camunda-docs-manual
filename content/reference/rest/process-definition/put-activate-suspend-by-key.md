---

title: 'Activate/Suspend Process Definitions By Key'
weight: 140

menu:
  main:
    name: "Activate/Suspend By Key"
    identifier: "rest-api-process-definition-activate-suspend-by-key"
    parent: "rest-api-process-definition"
    pre: "PUT `/process-definition/suspended`"

---


Activates or suspends process definitions with the given process definition key.

# Method

PUT `/process-definition/suspended`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>The key of the process definitions to activate or suspend.</td>
  </tr>  
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all process definitions with the given key. When the value is set to <code>true</code>, all process definitions with the given key will be suspended and when the value is set to <code>false</code>, all process definitions with the given key will be activated.</td>
  </tr>
  <tr>
    <td>includeProcessInstances</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all process instances of the process definitions with the given key. When the value is set to <code>true</code>, all process instances of the process definitions with the given key will be activated or suspended and when the value is set to <code>false</code>, the suspension state of all process instances of the process definitions with the given key will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which all process definitions with the given key will be activated or suspended. If null, the suspension state of all process definitions with the given key is updated immediately. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>  
</table>


# Result

This method returns no content.

  
# Response Codes

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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter doesn't have the expected format or if the <code>processDefinitionKey</code> parameter is null. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
# Example

## Request

PUT `/process-definition/suspended`
  
    {
      "processDefinitionKey" : "aProcessDefinitionKey",
      "suspended" : true,
      "includeProcessInstances" : true,
      "executionDate" : "2013-11-21T10:49:45"
    }
     
## Response
    
Status 204. No content.
