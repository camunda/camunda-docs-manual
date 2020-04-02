---

title: "Get Exception Stacktrace"
weight: 100

menu:
  main:
    name: "Get Stacktrace"
    identifier: "rest-api-job-get-exception-stacktrace"
    parent: "rest-api-job"
    pre: "GET `/job/{id}/stacktrace`"

---


Retrieves the exception stacktrace corresponding to the passed job id.

# Method

GET `/job/{id}/stacktrace`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the job to get the exception stacktrace for.</td>
  </tr>
</table>


# Result

The result is the corresponding stacktrace as plain text.


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
    <td>application/json</td>
    <td>Job with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/job/aJobId/stacktrace`

## Response

    java.lang.RuntimeException: A exception message!
      at org.camunda.bpm.pa.service.FailingDelegate.execute(FailingDelegate.java:10)
      at org.camunda.bpm.engine.impl.delegate.JavaDelegateInvocation.invoke(JavaDelegateInvocation.java:34)
      at org.camunda.bpm.engine.impl.delegate.DelegateInvocation.proceed(DelegateInvocation.java:37)
      ...
