---

title: 'SOAP connector'
shortTitle: 'Connector'
category: 'SOAP'

keyword: 'connect api soap'

---

In camunda Connect a `Connectors` class exists which automatically detects
every connector in the classpath. It can be used to get the SOAP connector
instance by connector ID.

```java
SoapHttpConnector soap = Connectors.getConnector(SoapHttpConnector.ID);
```

The SOAP connector extends the camunda Connect HTTP connector. Which uses
the Apache HTTP client in the default implementation. To configure the
client please see the corresponding section in the [HTTP connector docs][].



[HTTP connector docs]: ref:#http-http-connector
