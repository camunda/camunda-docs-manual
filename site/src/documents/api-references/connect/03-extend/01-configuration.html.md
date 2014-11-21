---

title: 'Configuring Connectors'
category: 'Extending Connect'

keyword: 'connect api extending'

---

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

In order to provide a custom configurator, you have to

* Provide a custom implementation of `org.camunda.connect.spi.ConnectorConfigurator`
* Add the configurator's fully qualified classname to a file named `META-INF/services/org.camunda.connect.spi.ConnectorConfigurator`
* Ensure that the artifact containing the configurator is reachable from Connect's classloader
