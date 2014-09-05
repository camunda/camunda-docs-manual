---

title: 'Templating'
category: 'Process Engine'

---

camunda BPM supports template engines which are implemented as script engines compatible with
JSR-223. Currently there are implementations for the [FreeMarker][freemarker] and [Apache
Velocity][velocity] template engines in the [camunda-template-engines][camunda-template-engines]
project.

If the template engine library is in the classpath, you can use templates everywhere in the BPMN
process where you can [use scripts][use-scripts], for example as a script task or inputOutput mapping.
The FreeMarker template engine is part of the camunda BPM distribution. If you want to use Velocity
you have to add it manually to the classpath of your process engine.

Inside the template, all process variables of the BPMN element scope are available. The
template can also be loaded from an external resource as described in the [script source
section][script-source].

The following example shows a FreeMarker template, of which the result is saved in the process variable
`text`.

```xml
<scriptTask id="templateScript" scriptFormat="freemarker" camunda:resultVariable="text">
  <script>
    Dear ${customer},

    thank you for working with camunda BPM ${version}.

    Greetings,
    camunda Developers
  </script>
</scriptTask>
```

In an inputOutput mapping it can be very useful to use an external template to generate the
payload of a `camunda:connector`.

```xml
<bpmn2:serviceTask id="soapTask" name="Send SOAP request">
  <bpmn2:extensionElements>
    <camunda:connector>
      <camunda:connectorId>soap-http-connector</camunda:connectorId>
      <camunda:inputOutput>

        <camunda:inputParameter name="soapEnvelope">
          <camunda:script scriptFormat="freemarker" resource="soapEnvelope.ftl" />
        </camunda:inputParameter>

        <!-- ... remaining connector config omitted -->

      </camunda:inputOutput>
    </camunda:connector>
  </bpmn2:extensionElements>
</bpmn2:serviceTask>
```


[freemarker]: http://freemarker.org/
[velocity]: http://velocity.apache.org/
[camunda-template-engines]: https://github.com/camunda/camunda-template-engines-jsr223
[use-scripts]: ref:#process-engine-scripting
[script-source]: ref:#process-engine-scripting-script-source
