---

title: "Create Filter"
weight: 40

menu:
  main:
    identifier: "rest-api-filter-04-post-create"
    parent: "rest-api-filter"

---


Create a new filter.


Method
------

POST `/filter/create`


Parameters
----------

#### Request Body

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
      (see <a href="#task-get-tasks-post">Task</a>).
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


Result
------

A JSON object corresponding to the Filter interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the filter.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>String</td>
    <td>The resource type of the filter, e.g., <code>Task</code>.</td>
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
    <td>The save query of the filter as JSON object.</td>
  </tr>
  <tr>
    <td>properties</td>
    <td>Object</td>
    <td>The properties of the filter as JSON object.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>
      Filter was invalid. See <a href="ref:#overview-introduction">Introduction</a> for the error
      response format.
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to create a new filter.
      See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


Example
-------

#### Request

POST `/filter/create`

Request body:

```json
{
  "resourceType": "Task",
  "name": "Accounting Tasks",
  "owner": "jonny1",
  "query": {
    "candidateGroup": "accounting"
  },
  "properties": {
    "color": "#3e4d2f",
    "description": "Tasks assigned to group accounting",
    "priority": 5
  }
}
```

#### Response

Status 200.

```json
{
  "id": "aFilterId",
  "resourceType": "Task",
  "name": "Accounting Tasks",
  "owner": "jonny1",
  "query": {
    "candidateGroup": "accounting"
  },
  "properties": {
    "color": "#3e4d2f",
    "description": "Tasks assigned to group accounting",
    "priority": 5
  }
}
```
