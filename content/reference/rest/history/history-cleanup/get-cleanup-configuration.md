---

title: "Get History Cleanup Configuration"
weight: 40

menu:
  main:
    name: "Get History Cleanup Configuration"
    identifier: "rest-api-history-cleanup-configuration"
    parent: "rest-api-history-cleanup"
    pre: "GET `/history/cleanup/configuration`"

---

Retrieves history cleanup batch window configuration (See [History cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}})).


# Method

GET `/history/cleanup/configuration`


# Parameters

## Query Parameters

Not used

## Request Body

Not used

# Result

A JSON object representing batch window datetimes with timezone.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>batchWindowStartTime</td>
    <td>Date</td>
    <td>Start time of the current or next batch window</td>
  </tr>
  <tr>
    <td>batchWindowEndTime</td>
    <td>Date</td>
    <td>End time of the current or next batch window</td>
  </tr>
</table>

# Response Codes

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
</table>

# Example

## Request

GET `/history/cleanup/configuration`

## Response

```json
{
    "batchWindowStartTime":"2017-09-11T23:59:00.000+0200",
    "batchWindowEndTime":"2017-09-12T02:00:00.000+0200"
}
```
