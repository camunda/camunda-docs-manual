---

title: 'HTTP connector'
shortTitle: 'Connector'
category: 'HTTP'

keyword: 'connect api http'

---

In camudna Connect a `Connectors` class exists which automatically detects
every connector in the classpath. It can be used to get the HTTP connector
instance by connector ID.

```java
HttpConnector http = Connectors.getConnector(HttpConnector.ID);
```

## Configure Apache HTTP client

camunda Connect HTTP client uses the Apache HTTP client with its default configuration. If
you want to configure another connection manager or similar the easiest way is to register
a new connector configurator.

```java
package org.camunda.connect.example;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.camunda.connect.httpclient.impl.AbstractHttpConnector;
import org.camunda.connect.spi.ConnectorConfigurator;

public class HttpConnectorConfigurator implements ConnectorConfigurator<HttpConnector> {

  public Class<HttpConnector> getConnectorClass() {
    return HttpConnector.class;
  }

  public void configure(HttpConnector connector) {
    CloseableHttpClient client = HttpClients.custom()
      .setMaxConnPerRoute(10)
      .setMaxConnTotal(200)
      .build();
    ((AbstractHttpConnector) connector).setHttpClient(client);
  }

}
```

To enable auto detection of your new configurator please add a file called
`org.camunda.bpm.connect.spi.ConnectorConfigurator` to your
`resources/META-INF/services` directory with class name as content. For more
information see the [extending Connect] section.

```
org.camunda.connect.example.HttpConnectorConfigurator
```


[extending Connect]: ref:#extending-connect
