---

title: 'HTTP request'
shortTitle: 'Request'
category: 'HTTP'

keyword: 'connect api http'

---

## Create a simple HTTP request

The HTTP connector can be used to create a new request, set a HTTP method, URL,
content type and payload.

A simple GET request:

```java
http.createRequest()
  .get()
  .url("http://camunda.org")
  .execute();
```

A POST request with a content type and payload set:

```java
http.createRequest()
  .post()
  .url("http://camunda.org")
  .contentType("text/plain")
  .payload("Hello World!")
  .execute();
```

The HTTP methods PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE
are also available.


## Adding HTTP headers to a request

To add own headers to the HTTP request the method `header` is
available.

```java
HttpResponse response = http.createRequest()
  .get()
  .header("Accept", "application/json")
  .url("http://camunda.org")
  .execute();
```

## Using the generic API

Besides the configuration methods also a generic API exists to
set parameters of a request. The following parameters are
available:

<table class="table table-striped">
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>method</td>
    <td>Sets the HTTP method of the request</td>
  </tr>
  <tr>
    <td>url</td>
    <td>Sets the URL of the request</td>
  </tr>
  <tr>
    <td>headers</td>
    <td>Contains a map of the configured HTTP headers of the request</td>
  </tr>
  <tr>
    <td>payload</td>
    <td>Sets the payload of the request</td>
  </tr>
</table>

This can be used as follows:

```java
HttpRequest request = http.createRequest();
request.setRequestParameter("method", "GET");
request.setRequestParameter("url", "http://camunda.org");
request.setRequestParameter("payload", "hello world!");
```
