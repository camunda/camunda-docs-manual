---

title: 'Get External Task Error Details'
weight: 80

menu:
  main:
    name: "Get Error Details"
    identifier: "rest-api-external-task-get-error-details"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/errorDetails`"

---


Retrieves the error details in the context of a running external task by id.

# Method

POST `/external-task/{id}/errorDetails`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task for which the error details should be retrieved.</td>
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
    <td>200</td>
    <td>text/plain</td>
    <td>Request successful. In case the external task has error details.</td>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful. In case the external task has no error details.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>An external task with the given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/external-task/anId/errorDetails`

## Response

```shell script
org.apache.ibatis.jdbc.RuntimeSqlException: org.apache.ibatis.jdbc.RuntimeSqlException: test cause
  at org.camunda.bpm.engine.test.api.externaltask.ExternalTaskServiceTest.testHandleFailureWithErrorDetails(ExternalTaskServiceTest.java:1424)
  at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
  at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
  at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
```
