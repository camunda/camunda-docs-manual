---

title: "Get Job Log Exception Stacktrace"
weight: 190

menu:
  main:
    name: "Get Stacktrace"
    identifier: "rest-api-history-get-job-log-stacktrace"
    parent: "rest-api-history-job-log"
    pre: "GET `/history/job-log/{id}`"

---


Retrieves the corresponding exception stacktrace to the passed historic job log id.


# Method

GET `/history/job-log/{id}/stacktrace`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic job log to get the exception stacktrace for.</td>
  </tr>
</table>

# Result

The result is the corresponding stacktrace as a plain text.


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
    <td>404</td>
    <td>application/json</td>
    <td>Historic job log with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `history/job-log/someId/stacktrace`

## Response

    java.lang.RuntimeException: A exception message!
      at org.camunda.bpm.pa.service.FailingDelegate.execute(FailingDelegate.java:10)
      at org.camunda.bpm.engine.impl.delegate.JavaDelegateInvocation.invoke(JavaDelegateInvocation.java:34)
      at org.camunda.bpm.engine.impl.delegate.DelegateInvocation.proceed(DelegateInvocation.java:37)
      ...
