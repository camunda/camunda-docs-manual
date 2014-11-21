---

title: 'Custom Connector'
category: 'Extending Connect'

keyword: 'connect api extending'

---

A connector is an implementation of the interface
`org.camunda.connect.spi.Connector`. An implementation of this interface can be
registered by implementing the SPI `org.camunda.connect.spi.ConnectorProvider`.
Connect uses the Java platform's service loader mechanism to lookup provider
implementations at runtime.

In order to provide a custom connector, you have to

* Provide a custom implementation of `org.camunda.connect.spi.Connector`
* Provide a custom implementation of `org.camunda.connect.spi.ConnectorProvider`
* Add the provider's fully qualified classname to a file named `META-INF/services/org.camunda.connect.spi.ConnectorProvider`
* Ensure that the artifact containing the provider is reachable from Connect's classloader

If you now call `org.camunda.connect.Connectors.getAvailableConnectors()`, then
the custom connector is returned along with the built-in connectors.
Furthermore, `org.camunda.connect.Connectors.getConnector(String connectorId)`
can be used to explicity retrieve the connector by a specific provider.
