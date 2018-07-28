---

title: "Get External Task Log Error Details"
weight: 40

menu:
  main:
    name: "Get Error Details"
    identifier: "rest-api-history-get-external-task-log-error-details"
    parent: "rest-api-history-external-task-log"
    pre: "GET `/history/external-task-log/{id}`"

---


Retrieves the corresponding error details of the passed historic external task log by id.


# Method

GET `/history/external-task-log/{id}/error-details`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic external task log to get the error details for.</td>
  </tr>
</table>

# Result

The result is the corresponding error details as plain text.


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
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>text/plain</td>
    <td>Historic external task log with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `history/external-task-log/someId/error-details`

## Response

    java.lang.RuntimeException: A exception message!
      at org.camunda.bpm.pa.service.FailingDelegate.execute(FailingDelegate.java:10)
      at org.camunda.bpm.engine.impl.delegate.JavaDelegateInvocation.invoke(JavaDelegateInvocation.java:34)
      at org.camunda.bpm.engine.impl.delegate.DelegateInvocation.proceed(DelegateInvocation.java:37)
      ...
