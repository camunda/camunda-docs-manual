---

title: 'SOAP Connector'
weight: 20

menu:
  main:
    identifier: "connect-ref-soap-connector"
    parent: "connect-ref"

---

In Camunda Connect a `Connectors` class exists which automatically detects
every connector in the classpath. It can be used to get the SOAP connector
instance by connector ID.

```java
SoapHttpConnector soap = Connectors.getConnector(SoapHttpConnector.ID);
```

The SOAP connector extends the Camunda Connect HTTP connector. Which uses
the Apache HTTP client in the default implementation. To configure the
client please see the corresponding section in the [HTTP connector docs]({{< relref "reference/connect/http-connector.md" >}}).

# Request

## Creating a Request

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

## Adding HTTP Headers to a Request

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

## Using the Generic API

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

# Response

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

## Using the Generic API

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
