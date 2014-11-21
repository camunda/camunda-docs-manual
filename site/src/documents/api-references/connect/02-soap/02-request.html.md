---

title: 'SOAP request'
shortTitle: 'Request'
category: 'SOAP'

keyword: 'connect api soap'

---

## Creating a request

The SOAP HTTP connector can be used to create a new request, set a URL, content type
and payload.

```java
connector.createRequest()
  .url("http://camunda.org/soap")
  .soapAction("doIt")
  .contentType("application/soap+xml")
  .payload(soap_envelope)
  .execute();
```

## Adding HTTP headers to a request

To add own headers to the HTTP request the method `header` is
available.

```java
connector.createRequest()
  .url("http://camunda.org/soap")
  .soapAction("doIt")
  .contentType("application/soap+xml")
  .header("Accept", "application/xml")
  .payload(soap_envelope)
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
