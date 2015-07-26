---

title: "Execute Filter Count"
weight: 110

menu:
  main:
    identifier: "rest-api-filter-11-get-execute-count"
    parent: "rest-api-filter"

---

Executes the saved query of the filter and returns the count.

Method
------

GET `/filter/{id}/count`

Parameters
----------

#### Path Parameters

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

Result
------

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


Response codes
--------------

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
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to read this filter.
      See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


Example
-------

#### Request

GET `/filter/aTaskFilterId/count`

#### Response

Status 200.


```json
{
  "count": 2
}
```
