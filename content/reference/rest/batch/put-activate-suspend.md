---

title: "Activate/Suspend Single Batch"
weight: 40

menu:
  main:
    name: "Activate/Suspend"
    identifier: "rest-api-batch-activate-suspend"
    parent: "rest-api-batch"
    pre: "PUT `/batch/{id}/suspended`"

---


Activate or suspend a batch.

# Method

PUT `/batch/{id}/suspended`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the batch to activate or suspend.</td>
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
    <td>suspended</td>
    <td>
      A <code>Boolean</code> value which indicates whether to activate or
      suspend the batch. When the value is set to <code>true</code>, the batch
      will be suspended and when the value is set to <code>false</code>, the
      batch will be activated.
    </td>
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
    <td>
      Returned if the batch cannot be suspended or activated.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">
      Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

PUT `/batch/aBatch/suspended`

```json
{
  "suspended" : true,
}
```

## Response

Status 204. No content.
