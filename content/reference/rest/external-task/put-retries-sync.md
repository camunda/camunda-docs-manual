---

title: 'Set Retries For Multiple External Tasks'
weight: 100

menu:
  main:
    name: "Set Retries Sync"
    identifier: "rest-api-external-task-put-retries-sync"
    parent: "rest-api-external-task"
    pre: "PUT `/external-task/retries-sync`"

---


Sets the number of retries left to execute external tasks by id synchronously. If retries are set to 0, an incident is created.
To set retries for multiple external tasks asynchronously, use the [Set Retries For Multiple External Tasks Async (Batch)]({{< relref "reference/rest/external-task/post-retries-async.md" >}}) method.


# Method

PUT `/external-task/retries-sync`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>retries</td>
    <td>The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created and the task cannot be fetched anymore unless the retries are increased again.</td>
  </tr>
  <tr>
    <td>externalTaskIds</td>
    <td>The ids of the external tasks to set the number of retries for.</td>
  </tr>
  <tr>
    <td>externalTaskQuery</td>
    <td>Query for the external tasks to set the number of retries for.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
 <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      If neither externalTaskIds nor externalTaskQuery are present or externalTaskIds contains null value or the number of retries is negative, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>

# Example

## Request

PUT `/external-task/retries-sync`

Request Body:

    {
      "retries": 123
      "externalTaskIds": [
        "anExternalTask",
        "anotherExternalTask"
      ]
    }

## Response

Status 204. No content.
