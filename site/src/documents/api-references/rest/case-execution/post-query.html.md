---

title: 'Get Case Executions (POST)'
category: 'Case Execution'

keywords: 'post query list'

---


Query for case executions that fulfill given parameters through a json object.
This method is slightly more powerful than the [GET query](ref:#case-execution-get-case-executions), because it allows
to filter by multiple case variables of types `String`, `Number` or `Boolean`.


Method
------

POST `/case-execution`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>  

#### Request Body

<p>
  A json object with the following properties:
</p>
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by a case execution id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by a case instance id.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by the business key of the case instances the case executions belong to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the case executions run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the case executions run on.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity the case execution currently executes.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Only include enabled case executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json array to only include case instances that have variables with certain values. <br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equals; <code>lt</code> - lower than; <code>lteq</code> - lower than or equals;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>caseInstanceVariables</td>
    <td>A json array to only include case executions that belong to a case instance with variables with certain values.<br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equals; <code>lt</code> - lower than; <code>lteq</code> - lower than or equals;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>caseExecutionId</code>, <code>caseDefinitionKey</code> and <code>caseDefinitionId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


Result
------

A json array of case execution objects.
Each case execution object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case execution.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance this case execution belongs to.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is active.
    </td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is enabled.
    </td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>
    or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/case-execution`

Request body:

    {
      "variables": 
        [
          {
            "name" : "myVariable",
            "operator" : "eq",
            "value" : "camunda"
          },
          {
            "name" : "mySecondVariable",
            "operator" : "neq",
            "value" : 124
          }
        ],
      "caseDefinitionId" : "aCaseDefinitionId"
    }

#### Response

    [
      {
        "links" : [],
        "id"               : "aCaseExecutionId",
        "caseInstanceId"   : "aCaseInstId",
        "active"           : true,
        "enabled"          : true
      }
    ]
