---

title: 'Get External Task Topic Names'
weight: 80

menu:
  main:
    name: "Get External Task Topic Names"
    identifier: "rest-api-external-task-get-topic-names"
    parent: "rest-api-external-task"
    pre: "GET `/external-task/topic-names`"

---

Queries for distinct topic names of external tasks that fulfill given parameters.
Query can be restricted to only tasks with retries left, tasks that are locked, or tasks that are unlocked.
The parameters withLockedTasks and withUnlockedTasks are exclusive. Setting them both to true will return an empty list.
Providing no parameters will return a list of all distinct topic names with external tasks.

# Method

GET `/external-task/topic-names`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>withLockedTasks</td>
    <td>Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired).
        Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>withUnlockedTasks</td>
    <td>Only include external tasks that are currently not locked (i.e., they have no lock or it has expired).
        Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>withRetriesLeft</td>
    <td>Only include external tasks that have a positive (&gt; 0) number of retries (or <code>null</code>).
    Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
</table>

# Result

A JSON array of external task topic names.

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
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/external-task/topic-names?withLockedTasks`

## Response

Status 200.

```json
[
  "topic-a",
  "topic-b",
  "topic-c"
]
```
