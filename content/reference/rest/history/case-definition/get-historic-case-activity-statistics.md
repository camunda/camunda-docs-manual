---

title: "Get Historic Case Activity Statistics"
weight: 10

menu:
  main:
    identifier: "rest-api-history-get-historic-case-activity-statistics"
    parent: "rest-api-history-case-definition"
    pre: "GET `/history/case-definition/{id}/statistics`"

---


Retrieves historic statistics of a given case definition grouped by activities.
These statistics include the number of active, available, completed, disabled, enabled and completed case activity instances.<br/>

__Note:__ This only includes historic data.



# Method

GET `/history/case-definition/{id}/statistics`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case definition.</td>
  </tr>
</table>


# Result

A JSON array containing statistics results per activity.
Each object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the activity the results are aggregated for.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Number</td>
    <td>The total number of all active instances of the activity.</td>
  </tr>
  <tr>
    <td>available</td>
    <td>Number</td>
    <td>The total number of all available instances of the activity.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Number</td>
    <td>The total number of all completed instances of the activity.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Number</td>
    <td>The total number of all disabled instances of the activity.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Number</td>
    <td>The total number of all enabled instances of the activity.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Number</td>
    <td>The total number of all terminated instances of the activity.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Examples

## Request

GET `history/case-definition/aCaseDefinitionId/statistics`

## Response

    [
      {
        "id": "anActivity",
        "active": 123,
        "available": 0,
        "completed": 50,
        "disabled": 0,
        "enabled": 0,
        "terminated": 60
      },
      {
        "id":"anotherActivity",
        "active": 11,
        "available": 60,
        "completed": 5,
        "disabled": 0,
        "enabled": 55,
        "terminated": 5
      }
    ]
