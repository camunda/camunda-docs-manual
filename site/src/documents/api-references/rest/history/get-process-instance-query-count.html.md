---

title: 'Get Process Instances Count'
category: 'History'

keywords: 'historic get query list'

---


Query for the number of historic process instances that fulfill the given parameters.
Takes the same parameters as the [Get Activity Instances](ref:#history-get-activity-instances-historic) method.


Method
------

GET `/history/process-instance/count`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>Filter by process instance ids. Must be a comma-separated list of process instance ids.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKey</td>
    <td>Filter by process instance business key.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyLike</td>
    <td>Filter by process instance business key that the parameter is a substring of.</td>
  </tr> 
  <tr>
    <td>superProcessInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>subProcessInstanceId</td>
    <td>Restrict query to one process instance that has a sub process instance with the given id.</td>
  </tr>  
  <tr>
    <td>caseInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyNotIn</td>
    <td>Exclude instances that belong to a set of process definitions. Must be a comma-separated list of process definition keys.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Filter by the name of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionNameLike</td>
    <td>Filter by process definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished process instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished process instances. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>startedBy</td>
    <td>Only include process instances that were started by the given user.</td>
  </tr>
  <tr>
    <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Only include process instances that have/had variables with certain values.
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
</table>


Result
------

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching historic process instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/process-instance/count?variables=myVariable_eq_camunda`

#### Response

    {"count": 1}
