---

title: "Execute Filter Count (POST)"
weight: 120

menu:
  main:
    name: "Execute Count (POST)"
    identifier: "rest-api-filter-12-post-execute-count"
    parent: "rest-api-filter"
    pre: "POST `/filter/{id}/count`"

---

Executes the saved query of the filter and returns the count. This method is slightly more
powerful then the [GET query]({{< relref "reference/rest/filter/get-execute-count.md" >}}) because it allows to extend
the saved query of the filter.

{{< note title="Security Consideration" class="warning" >}}
  The request body of this method takes a JSON-serialized query. Some query types (e.g., task queries) allow to specify EL expressions in their parameters and may therefore be abused for remote code execution. See the section on <a href="{{< relref "user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}


# Method

POST `/filter/{id}/count`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the filter to execute.</td>
  </tr>
</table>

## Request Body

A JSON object which corresponds to the type of the saved query of the filter, i.e., if the
resource type of the filter is `Task` the body should form a valid task query corresponding to
the [Task]({{< relref "reference/rest/task/get-query.md" >}}) resource.

# Result

A JSON object with a single count property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of filters that fulfill the query criteria.</td>
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
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The extending query was invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a>
      for the error response format.
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to read this filter.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `filter/aTaskFilterId/singleResult`

Request Body:

<div class="alert alert-warning" role="alert">
  <strong>Note:</strong> The examples show a task filter. So the request body corresponds
  to a task query. For other resource types the request body will differ.
</div>

```json
{
  "assignee": "jonny1",
  "taskDefinitionKey": "aTaskKey"
}
```

## Response

Status 200.

```json
{
  "count": 1
}
```
