---

title: 'Get Executions Count'
category: 'Execution'

keywords: 'get query list'

---


Query for the number of executions that fulfill given parameters.
Takes the same parameters as the [get executions](ref:#execution-get-executions) method.


Method
------

GET `/execution/count`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by the business key of the process instances the executions belong to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the id of the process instance the execution belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity the execution currently executes.</td>
  </tr>
  <tr>
    <td>signalEventSubscriptionName</td>
    <td>Select only those executions that expect a signal of the given name.</td>
  </tr>
  <tr>
    <td>messageEventSubscriptionName</td>
    <td>Select only those executions that expect a message of the given name.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Only include executions that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>op</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equals; <code>lt</code> - lower than; <code>lteq</code> - lower than or equals;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>Only include executions that belong to a process instance with variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>op</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
</table>


Result
------

A json object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching executions.</td>
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

GET `/execution/count?variables=myVariable_eq_camunda`

#### Response

    {"count": 1}