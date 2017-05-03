---

title: 'Update time to live'
weight: 70

menu:
  main:
    name: "Update time to live"
    identifier: "rest-api-decision-definition-update-time-to-live"
    parent: "rest-api-decision-definition"
    pre: "PUT `/decision-definition/{id}/history-time-to-live`"

---

Updates history time to live for decision definition with given id. The field is used within [History cleanup]({{< relref "user-guide/process-engine/history-cleanup.md">}}).

# Method

PUT `/decision-definition/{id}/history-time-to-live`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision definition to change history time to live.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>New value for historyTimeToLive field of decision definition. Can be null.</td>
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
    <td>Returned if some of the request parameters are invalid.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Decision definition with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/decision-definition/aDecisionDefinitionId/history-time-to-live`
```json 
    {
      "historyTimeToLive" : 5
    }
```

## Response

Status 204. No content.
