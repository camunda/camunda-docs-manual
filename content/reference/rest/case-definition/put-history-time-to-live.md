---

title: 'Update history time to live'
weight: 70

menu:
  main:
    name: "Update history time to live"
    identifier: "rest-api-case-definition-update-history-time-to-live"
    parent: "rest-api-case-definition"
    pre: "PUT `/case-definition/{id}/history-time-to-live`
          </br>
          PUT `/case-definition/key/{key}/history-time-to-live`
          </br>
          PUT `/case-definition/key/{key}/tenant-id/{tenant-id}/history-time-to-live`"

---

Updates history time to live for case definition with given id. The field is used within [History cleanup]({{< relref "user-guide/process-engine/history.md#history-cleanup">}}).

# Method

PUT `/case-definition/{id}/history-time-to-live`

PUT `/case-definition/key/{key}/history-time-to-live` (updates the latest version of the case definition which belongs to no tenant)

PUT `/case-definition/key/{key}/tenant-id/{tenant-id}/history-time-to-live` (updates the latest version of the case definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case definition to change history time to live.</td>
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
    <td>New value for historyTimeToLive field of case definition. Can be null.</td>
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
    <td>case definition with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/case-definition/aCaseDefinitionId/history-time-to-live`
```json
    {
      "historyTimeToLive" : 5
    }
```

## Response

Status 204. No content.
