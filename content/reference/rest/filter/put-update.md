---

title: "Update Filter"
weight: 50

menu:
  main:
    name: "Update"
    identifier: "rest-api-filter-05-put-update"
    parent: "rest-api-filter"
    pre: "PUT `/filter/{id}`"

---


Update an existing filter.

{{< note title="Security Consideration" class="warning" >}}
  The `query` parameter of the request body takes a JSON-serialized query. Some query types (e.g., task queries) allow to specify EL expressions in their parameters and may therefore be abused for remote code execution. See the section on <a href="{{< relref "user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}

# Method

PUT `/filter/{id}`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>String</td>
    <td>The resource type of the filter, e.g., <code>Task</code></td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the filter.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The user id of the owner of the filter.</td>
  </tr>
  <tr>
    <td>query</td>
    <td>Object</td>
    <td>
      A JSON object which corresponds to the JSON body of a REST query. I.e., a filter which
      has the resourceType <code>Task</code> must contain a query which is a valid task query
      (see <a href="{{< relref "reference/rest/task/get-query.md" >}}">Task</a>).
    </td>
  </tr>
  <tr>
    <td>properties</td>
    <td>Object</td>
    <td>
      A JSON object containing various properties of the filter. The properties are user defined
      and no required properties exist. Properties can be used to save the priority or the
      description of a filter.
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
      Filter was invalid. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error
      response format.
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to update this filter.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter cannot be found. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for
      the error response format.
    </td>
  </tr>
</table>


# Example

## Request

PUT `/filter/aFilterID`

Request Body:

```json
{
  "resourceType": "Task",
  "name": "My Tasks",
  "owner": "jonny1",
  "query": {
    "assignee": "jonny1"
  },
  "properties": {
    "color": "#99CCFF",
    "description": "Tasks assigned to me",
    "priority": -10
  }
}
```

## Response

Status 204. No content.
