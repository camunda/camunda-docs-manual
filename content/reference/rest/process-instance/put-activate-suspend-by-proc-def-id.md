---

title: 'Activate/Suspend Process Instance By Process Definition Id'
weight: 160

menu:
  main:
    name: "Activate/Suspend By Process Definition Id"
    identifier: "rest-api-process-instance-suspend-by-process-definition-id"
    parent: "rest-api-process-instance"
    pre: "PUT `/process-instance/suspended`"

---


Activates or suspends process instances with the given process definition id.

# Method

PUT `/process-instance/suspended`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>The process definition id of the process instances to activate or suspend.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend the process instances with the given process definition id. When the value is set to <code>true</code>, the process instances with the given process definition id will be suspended and when the value is set to <code>false</code>, the process instances with the given process definition id will be activated.</td>
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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>processDefinitionId</code> parameter is null. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/process-instance/suspended`

    {
      "processDefinitionId" : "aProcDefId",
      "suspended" : true
    }

## Response

Status 204. No content.
