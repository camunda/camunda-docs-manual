---

title: "Delete Filter"
weight: 60

menu:
  main:
    name: "Delete"
    identifier: "rest-api-filter-06-delete"
    parent: "rest-api-filter"
    pre: "DELETE `/filter/{id}`"

---


Deletes a filter by id.


# Method

DELETE `/filter/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the filter to be deleted.</td>
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
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to delete this filter.
      See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter cannot be found. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for
      the error response format.
    </td>
  </tr>
</table>


# Example

## Request

DELETE `/filter/aFilterId`

## Response

Status 204. No content.
