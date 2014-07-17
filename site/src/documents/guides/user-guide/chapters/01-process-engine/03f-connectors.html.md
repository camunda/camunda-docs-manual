---

title: 'Connectors'
category: 'Process Engine'

---

With the optional dependency [camunda-connect][github], the process engine supports simple
connectors. Currently only a SOAP connector implementation exists, but more are planned.

To use a connector you have to add the camunda extension element [connector][]. The connector is
configured by a unique [connectorId][] which specifies the used connector implementation.
Additionally, an [input/output mapping][iomapping] is used to configure the connector. The required
input parameters and the available output parameters depend upon the connector implementation.
Additional input parameters can also be provided to be used inside the connector.

As an example, an shortened configuration of the camunda SOAP connector implementation is shown. A
complete [example][] can be found in the [camunda examples repository][examples] on GitHub.

```xml
<serviceTask id="soapRequest" name="Simple SOAP Request">
  <extensionElements>
    <camunda:connector>
      <camunda:connectorId>soap-http-connector</camunda:connectorId>
      <camunda:inputOutput>
        <camunda:inputParameter name="endpointUrl">
          http://example.com/webservice
        </camunda:inputParameter>
        <camunda:inputParameter name="soapEnvelope">
          <![CDATA[
            <soap:Envelope ...>
              ... // the request envelope
            </soap:Envelope>
          ]]>
        </camunda:inputParameter>
        <camunda:outputParameter name="result">
          <![CDATA[
            ... // process response body
          ]]>
        </camunda:outputParameter>
      </camunda:inputOutput>
    </camunda:connector>
  </extensionElements>
</serviceTask>
```


[github]: https://github.com/camunda/camunda-connect
[connector]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundaconnector
[connectorId]: ref:/api-references/bpmn20/#custom-extensions-camunda-extension-elements-camundaconnectorid
[iomapping]: ref:#process-engine-inputoutput-variable-mapping
[example]: https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service
[examples]: https://github.com/camunda/camunda-bpm-examples