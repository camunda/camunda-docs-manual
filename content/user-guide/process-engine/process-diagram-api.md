---

title: 'Process Diagram Visualization'
weight: 250

menu:
  main:
    identifier: "user-guide-process-engine-pd-api"
    parent: "user-guide-process-engine"

---


A BPMN process diagram is a formidable place to visualize information around your process. We recommend using JavaScript libraries to display process diagrams and enrich them with additional information.

In our web applications [Cockpit]({{< relref "webapps/cockpit/index.md" >}}) and [Tasklist]({{< relref "webapps/tasklist/index.md" >}}), we use [bpmn.io](http://bpmn.io/), a toolkit for rendering BPMN 2.0 process models directly in the browser. It allows to add additional information to the diagram and includes ways for user interaction. Although bpmn.io is still under development, its API is rather stable.

The previous Javascript BPMN renderer can still be found at [camunda-bpmn.js](https://github.com/camunda/camunda-bpmn.js), but it is not actively developed anymore.

{{< img src="../img/process-diagram-bpmn-js.png" title="Process Diagram Rendering" >}}


# bpmn.io Diagram Renderer

In order to render a process diagram, you need to retrieve the diagram XML via the {{< javadocref page="index.html?org/camunda/bpm/engine/RepositoryService.html" text="Java-" >}} or [REST]({{< relref "reference/rest/process-definition/get-xml.md" >}}) API. The following example shows how to render the process xml using bpmn.io. For more documentation regarding the annotation of the diagram and user interaction, please refer to the [bpmn.io](https://github.com/bpmn-io/bpmn-js) page.

```javascript
var BpmnViewer = require('bpmn-js');

var xml = getBpmnXml(); // get the process xml via REST
var viewer = new BpmnViewer({ container: 'body' });

viewer.importXML(xml, function(err) {

  if (err) {
    console.log('error rendering', err);
  } else {
    console.log('rendered');
  }
});
```

Alternatively, you can use the [bpmn-viewer widget](http://camunda.github.io/camunda-commons-ui/cam-widget-bpmn-viewer.html) from the Camunda commons UI.
