---

title: "Get Case Executions"
weight: 10

menu:
  main:
    identifier: "rest-api-case-execution-get-query"
    parent: "rest-api-case-execution"

---


Query for case executions that fulfill given parameters.
Parameters may be static as well as dynamic runtime properties of case executions.
The size of the result set can be retrieved by using the [get case executions count](ref:#case-execution-get-case-executions-count) method.


Method
------

GET `/case-execution`


Parameters
----------

#### Query Parameters

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
    <td>required</td>
    <td>Only include required case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Only include enabled case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Only include disabled case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Only include case executions that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>caseInstanceVariables</td>
    <td>Only include case executions that belong to a case instance with variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
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
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


Result
------

A JSON array of case execution objects.
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
    <td>parentId</td>
    <td>String</td>
    <td>The id of the parent of this case execution belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>String</td>
    <td>The name of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>String</td>
    <td>The type of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityDescription</td>
    <td>String</td>
    <td>The description of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is required or not.
    </td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is active or not.
    </td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is enabled or not.
    </td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is disabled or not.
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>,
    or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/case-execution?variables=myVariable_eq_camunda,mySecondVariable_neq_aBadValue`

#### Response

    [
      {
        "links"            : [],
        "id"               : "aCaseExecutionId",
        "caseInstanceId"   : "aCaseInstId",
        "required"         : false,
        "active"           : true,
        "enabled"          : false,
        "disabled"         : false
      }
    ]
