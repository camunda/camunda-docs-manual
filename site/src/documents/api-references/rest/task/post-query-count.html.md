---

title: 'Get Tasks Count (POST)'
category: 'Task'

---


Get the number of tasks that fulfill the given filter.
Corresponds to the size of the result set of the [get tasks (POST)](#task-get-tasks-post) method and takes the same parameters.

  
Method
------

POST `/task/count`


Parameters
----------
  
#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Restrict to tasks that belong to process instances with the given id.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKey</td>
    <td>Restrict to tasks that belong to process instances with the given business key.</td>
  </tr>
  
  <tr>
    <td>processDefinitionId</td>
    <td>Restrict to tasks that belong to a process definition with the given id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Restrict to tasks that belong to a process definition with the given key.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Restrict to tasks that belong to a process definition with the given name.</td>
  </tr>
  
  <tr>
    <td>executionId</td>
    <td>Restrict to tasks that belong to an execution with the given id.</td>
  </tr>
  
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include tasks which belongs to one of the passed activity instance ids.</td>
  </tr> 
  
  <tr>
    <td>assignee</td>
    <td>Restrict to tasks that the given user is assigned to.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>Restrict to tasks that the given user owns.</td>
  </tr>
  <tr>
    <td>candidateGroup</td>
    <td>Only include tasks that are offered to the given group.</td>
  </tr>
  <tr>
    <td>candidateUser</td>
    <td>Only include tasks that are offered to the given user.</td>
  </tr>
  <tr>
    <td>involvedUser</td>
    <td>Only include tasks that the given user is involved in.
    A user is involved in a task if there exists an identity link between task and user (e.g. the user is the assignee).</td>
  </tr>
  <tr>
    <td>unassigned</td>
    <td>If set to `true`, restricts the query to all tasks that are unassigned.</td>
  </tr>
  
  <tr>
    <td>taskDefinitionKey</td>
    <td>Restrict to tasks that have the given key.</td>
  </tr>
  <tr>
    <td>taskDefinitionKeyLike</td>
    <td>Restrict to tasks that have a key that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Restrict to tasks that have the given name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Restrict to tasks that have a name with the given parameter value as substring.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>Restrict to tasks that have the given description.</td>
  </tr>
  <tr>
    <td>descriptionLike</td>
    <td>Restrict to tasks that have a description that has the parameter value as a substring.</td>
  </tr>
  
  <tr>
    <td>priority</td>
    <td>Restrict to tasks that have the given priority.</td>
  </tr>
  <tr>
    <td>maxPriority</td>
    <td>Restrict to tasks that have a lower or equal priority.</td>
  </tr>
  <tr>
    <td>minPriority</td>
    <td>Restrict to tasks that have a higher or equal priority.</td>
  </tr>
  
  <tr>
    <td>due</td>
    <td>Restrict to tasks that are due on the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>dueAfter</td>
    <td>Restrict to tasks that are due after the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>dueBefore</td>
    <td>Restrict to tasks that are due before the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>created</td>
    <td>Restrict to tasks that were created on the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to tasks that were created after the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>createdBefore</td>
    <td>Restrict to tasks that were created before the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>Restrict to tasks that are in the given delegation state. Valid values are `PENDING` and `RESOLVED`.</td>
  </tr>
  <tr>
    <td>candidateGroups</td>
    <td>Restrict to tasks that are offered to any of the given candidate groups. Takes a json array of group names, so for example `["developers", "support", "sales"]`.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active tasks. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended tasks. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>taskVariables</td>
    <td>A json array to only include tasks that have variables with certain values. <br/>
    
    The array consists of json objects with three properties `name`, `operator` and `value`.
    `name` is the variable name, `op` is the comparison operator to be used and `value` the variable value.<br/>
    `value` may be of type `String`, `Number` or `Boolean`.<br/>
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A json array to only include tasks that belong to a process instance with variables with certain values.<br/>
    The array consists of json objects with three properties `name`, `operator` and `value`.
    `name` is the variable name, `op` is the comparison operator to be used and `value` the variable value.<br/>
    `value` may be of type `String`, `Number` or `Boolean`.<br/>
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    </td>
  </tr>
</table>


Result
------

A json object with a single count property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of tasks that fulfill the query criteria.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy`
    or if an invalid operator for variable comparison is used. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------
  
#### Request

POST `/task/count`

Request body:

    {"taskVariables":
        [{"name": "varName",
        "value": "varValue",
        "operator": "eq"
        },
        {"name": "anotherVarName",
        "value": 30,
        "operator": "neq"}],
    "priority":10}
  
#### Response

    {"count":1}