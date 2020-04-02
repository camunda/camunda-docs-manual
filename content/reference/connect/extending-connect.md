---

title: 'Extending Connect'
weight: 30

menu:
  main:
    identifier: "connect-ref-configuration"
    parent: "connect-ref"

---

# Configuring Connectors

The connectors available to Connect may not always suit your needs. Sometimes,
it is necessary to provide configuration.

To configure a connector detected by Spin, the SPI
`org.camunda.connect.spi.ConnectorConfigurator` can be implemented.  A
configurator specifies which classes it can configure. Connect discovers a
configurator by employing Java's service loader mechanism and will then provide
it with all connectors that match the specified class (or are a subclass
thereof). The concrete configuration options depend on the actual connector.
For example, the HTTP based connector can modify the Apache HTTP client
that the connector uses.

To provide a custom configurator, you have to

* Provide a custom implementation of `org.camunda.connect.spi.ConnectorConfigurator`
* Add the configurator's fully qualified classname to a file named `META-INF/services/org.camunda.connect.spi.ConnectorConfigurator`
* Ensure that the artifact containing the configurator is reachable from Connect's classloader


# Custom Connector

A connector is an implementation of the interface
`org.camunda.connect.spi.Connector`. An implementation of this interface can be
registered by implementing the SPI `org.camunda.connect.spi.ConnectorProvider`.
Connect uses the Java platform's service loader mechanism to lookup provider
implementations at runtime.

To provide a custom connector, you have to

* Provide a custom implementation of `org.camunda.connect.spi.Connector`
* Provide a custom implementation of `org.camunda.connect.spi.ConnectorProvider`
* Add the provider's fully qualified classname to a file named `META-INF/services/org.camunda.connect.spi.ConnectorProvider`
* Ensure that the artifact containing the provider is reachable from Connect's classloader

If you now call `org.camunda.connect.Connectors.getAvailableConnectors()`, then
the custom connector is returned along with the built-in connectors.
Furthermore, `org.camunda.connect.Connectors.getConnector(String connectorId)`
can be used to explicity retrieve the connector by a specific provider.
