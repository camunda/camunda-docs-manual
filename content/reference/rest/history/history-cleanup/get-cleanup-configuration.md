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
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>batchWindowStartTime</td>
    <td>Date</td>
    <td>Start time of the current or next batch window. By <a href="{{<ref "/reference/rest/overview/date-format.md" >}}">default</a>,
        the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
        <code>2013-01-23T14:42:45.000+0200</code>.
    </td>
  </tr>
  <tr>
    <td>batchWindowEndTime</td>
    <td>Date</td>
    <td>End time of the current or next batch window. By <a href="{{<ref "/reference/rest/overview/date-format.md" >}}">default</a>,
        the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
        <code>2013-01-23T14:42:45.000+0200</code>.
    </td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>
      Indicates whether the engine node participates in history cleanup or not.<br>
      The default is <code>true</code>. Participation can be disabled via <a href="{{<ref "/reference/deployment-descriptors/tags/process-engine.md#history-cleanup-enabled" >}}">Process Engine Configuration</a>.<br>
      For more details, see <a href="{{<ref "/user-guide/process-engine/history.md#cleanup-execution-participation-per-node" >}}">Cleanup Execution Participation per Node</a>.
    </td>
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
    "batchWindowEndTime":"2017-09-12T02:00:00.000+0200",
    "enabled":"true"
}
```
