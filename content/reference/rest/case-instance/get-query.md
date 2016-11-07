---

title: "Get Case Instances"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-case-instance-get-query"
    parent: "rest-api-case-instance"
    pre: "GET `/case-instance`"

---


Queries for case instances that fulfill given parameters.
Parameters may be static as well as dynamic runtime properties of case instances.
The size of the result set can be retrieved by using the [Get Case Instance Count]({{< relref "reference/rest/case-instance/get-query-count.md" >}}) method.


# Method

GET `/case-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by a case instance id.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by case instance business key.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the case instances run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the case instances run on.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>superProcessInstance</td>
    <td>Restrict query to all case instances that are sub case instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>subProcessInstance</td>
    <td>Restrict query to all case instances that have the given process instance as a sub process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>superCaseInstance</td>
    <td>Restrict query to all case instances that are sub case instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>subCaseInstance</td>
    <td>Restrict query to all case instances that have the given case instance as a sub case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Only include completed case instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A case instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include case instances which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Only include case instances that have variables with certain values.
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
    <code>caseInstanceId</code>, <code>casedefinitionKey</code>, <code>caseDefinitionId</code> and <code>tenantId</code>.
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


# Result

A JSON array of case instance objects.
Each case instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is active or not.
    </td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is completed or not.
    </td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the case instance.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/case-instance?variables=myVariable_eq_camunda,mySecondVariable_neq_aBadValue`

## Response

    [
      {
        "links"            : [],
        "id"               : "anId",
        "caseDefinitionId" : "aCaseDefId",
        "businessKey"      : "aKey",
        "active"           : true,
        "completed"        : false,
        "tenantId"         : null
      }
    ]
