---

title: 'HTTP response'
shortTitle: 'Response'
category: 'HTTP'

keyword: 'connect api http'

---

A response contains the status code, response headers and body.

```java
Integer statusCode = response.getStatusCode();
String contentTypeHeader = response.getHeader("Content-Type");
String body = response.getResponse();
```

After the response was processed it should be closed.

```java
response.close()
```

## Using the generic API

Besides the response methods a generic API is provided
to gather the response parameters. The following parameters
are available:

<table class="table table-striped">
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td>Contains the status code of the response</td>
  </tr>
  <tr>
    <td>headers</td>
    <td>Contains a map with the HTTP headers of the response</td>
  </tr>
  <tr>
    <td>response</td>
    <td>Contains the response body</td>
  </tr>
</table>

This can be used as follows:

```java
response.getResponseParameter("statusCode");
response.getResponseParameter("headers");
response.getResponseParameter("response");
```
