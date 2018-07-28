---

title: 'Update history time to live'
weight: 145

menu:
  main:
    name: "Update history time to live"
    identifier: "rest-api-process-definition-update-history-time-to-live"
    parent: "rest-api-process-definition"
    pre: "PUT `/process-definition/{id}/history-time-to-live`
          </br>
          PUT `/process-definition/key/{key}/history-time-to-live`
          </br>
          PUT `/process-definition/key/{key}/tenant-id/{tenant-id}/history-time-to-live`"

---

Updates history time to live for process definition. The field is used within [History cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}}).

# Method

PUT `/process-definition/{id}/history-time-to-live`

PUT `/process-definition/key/{key}/history-time-to-live` (updates the latest version of the process definition which belongs to no tenant)

PUT `/process-definition/key/{key}/tenant-id/{tenant-id}/history-time-to-live` (updates the latest version of the process definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to change history time to live.</td>
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
    <td>New value for historyTimeToLive field of process definition. Can be null. Can not be negative.</td>
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
    <td>Process definition with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/process-definition/aProcessDefinitionId/history-time-to-live`
```json
    {
      "historyTimeToLive" : 5
    }
```

## Response

Status 204. No content.
