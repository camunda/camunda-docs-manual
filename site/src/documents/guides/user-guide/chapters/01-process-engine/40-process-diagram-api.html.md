---

title: 'Process Diagram Visualization'
category: 'Process Engine'

---

A BPMN process diagram is a formidable place to visualize information around your process. You have two options to do this:

 * **BPMN JavaScript libraries** for rendering BPMN 2.0 process models directly in the browser
 * Java **Process Diagram API** using deployed PNG images

We generally recommend the JavaScript libraries, but using the Process Diagram API can be considered if

 * You use browsers not capable of JavaScript rendering (see [Supported Environments](ref:#introduction-supported-environments))
 * You want to use the exact visualization of your business modeler to improve Business IT Alignment

## BPMN JavaScript libraries

We provide BPMN JavaScript libraries which can render BPMN 2.0 process models in your browser.

Go to [camunda-bpmn.js](https://github.com/camunda/camunda-bpmn.js) for libraries and documentation.

<img src="ref:asset:/assets/img/implementation-java/process-diagram-bpmn-js.png" class="img-responsive">




## Process Diagram API

When using the Process Diagram API you can deploy a PNG image together with your BPMN 2.0 Process Model. Then you have an API to query the image and normalized coordinates for the process model. With this information you can easily visualize anything on the process model. The following image shows an example using a BPMN 2.0 model from Adonis (see <a href="ref:/guides/getting-started-guides/roundtrip-with-cycle/#roundtrip-roundtrip-with-other-tools">Roundtrip with other BPMN 2.0 Modelers</a>):

<img src="ref:asset:/assets/img/implementation-java/process-diagram-api-adonis.png" class="img-responsive">


Our [Invoice Showcase](https://github.com/camunda/camunda-consulting/tree/master/showcases/invoice-en) is a process application that also uses the Process Diagram API showing details of the current process instance to end users working on user tasks.

### Preconditions

In order to use the Process Diagram API you need to deploy a process diagram together with your process. You can use:

 * PNG or
 * JPEG format.

The deployment can be done by any deployment mechanism camunda BPM offers. For instance if you use WAR deployment, you just need to place the image right next to the BPMN 2.0 XML file of your process (meaning in the same folder). The camunda Modeler automatically creates an image and saves it to the right path each time you save it. It is important that both files have the same name, e.g.,

    camunda-invoice.bpmn and
    camunda-invoice.png.

Maven will add them to the built artifact and the platform will take care of deploying it to the process engine. The deployer (only) looks for files with the extensions *.png or *.jpg to identify process diagrams.

The BPMN 2.0 XML file of your process must contain Diagram Interchange data. This is a special section containing positions and dimensions of the elements in the process diagram. Any modeling tool that conforms to BPMN 2.0 should be able to export this as part of its regular BPMN 2.0 XML export. Here is an example of what it looks like:

    ...
    <bpmndi:BPMNDiagram id="sid-02bd9186-9a09-4ef7-b17d-95bc9385c7ab">
      <bpmndi:BPMNPlane id="sid-2cd25826-e553-4573-ad62-be3d38904386" bpmnElement="invoice-process">
        <bpmndi:BPMNShape id="Process_Engine_1_gui" bpmnElement="Process_Engine_1" isHorizontal="true">
          <omgdc:Bounds height="488.0" width="1126.0" x="0.0" y="0.0"/>
        </bpmndi:BPMNShape>
        ...
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
    ...

### Getting the Process Diagram

If you have deployed a process diagram into the engine, you can retrieve it using the method `getProcessDiagram()` of the [RepositoryService](/api-references/javadoc/?org/camunda/bpm/engine/RepositoryService.html), which takes a process definition id as an argument and returns an `InputStream` with the content of the process diagram image.

In a Web application you can for example write a Servlet to provide process diagrams (this code is taken from the Invoice Showcase, see [ProcessDiagramServlet.java](https://github.com/camunda/camunda-consulting/blob/master/showcases/invoice-en/src/main/java/org/camunda/bpm/demo/invoice/ui/servlet/ProcessDiagramServlet.java)):

    @WebServlet(value = "/processDiagram", loadOnStartup = 1)
    public class ProcessDiagramServlet extends HttpServlet {

      @Inject
      private RepositoryService repositoryService;

      @Override
      protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String processDefinitionId = request.getParameter("processDefinitionId");
        InputStream processDiagram = repositoryService.getProcessDiagram(processDefinitionId);
        response.setContentType("image/png");
        response.getOutputStream().write(IOUtils.toByteArray(processDiagram));
      }
    }

### Getting Coordinates of Process Diagram Elements

The method `getProcessDiagramLayout()` of the [RepositoryService](/api-references/javadoc/?org/camunda/bpm/engine/RepositoryService.html) takes a process definition id as an argument and returns a [DiagramLayout](/api-references/javadoc/?org/camunda/bpm/engine/repository/DiagramLayout.html) object. This object provides `x` and `y` coordinates as well as `width` and `height` for all elements of the process diagram.

    DiagramLayout processDiagramLayout = repositoryService.getProcessDiagramLayout(processInstance.getProcessDefinitionId());
    List<DiagramNode> nodes = processDiagramLayout.getNodes();
    for (DiagramNode node : nodes) {
      String id     = node.getId();
      Double x      = node.getX();
      Double y      = node.getY();
      Double width  = node.getWidth();
      Double height = node.getHeight();
      // TODO: do some thing with the coordinates
    }

These coordinates are given as pixels relative to the upper left corner of the image returned by `getProcessDiagram()`, i.e., you can take them directly and draw or render something on top the image. Be creative!

<div class="alert alert-info">
  <p>
    <strong>Hint:</strong> If you have problems with the positions not fitting precisely, try to add a pool around your process.
  </p>
</div>

### Creating an Overlay on top of a Process Diagram

To give you some inspiration of what you can do with the Process Diagram API, we'll take another look at the code of the [Invoice Showcase](https://github.com/camunda/camunda-consulting/tree/master/showcases/invoice-en) . It uses JSF, HTML and CSS to highlight the current activity of a given process instance.

A CDI bean looks up the currently active activities in the [RuntimeService](/api-references/javadoc/?org/camunda/bpm/engine/RuntimeService.html) and gets position and dimension of these activities using `DiagramLayout.getNode()` (see [ProcessDiagramController.java](https://github.com/camunda/camunda-consulting/blob/master/showcases/invoice-en/src/main/java/org/camunda/bpm/demo/invoice/ui/diagram/ProcessDiagramController.java)):

    @Named
    public class ProcessDiagramController {
      ...
      public List<DiagramNode> getActiveActivityBoundsOfLatestProcessInstance() {
        ArrayList<DiagramNode> list = new ArrayList<DiagramNode>();
        ProcessInstance processInstance = getCurrentProcessInstance();
        if (processInstance != null) {
          DiagramLayout processDiagramLayout = repositoryService.getProcessDiagramLayout(processInstance.getProcessDefinitionId());
          List<String> activeActivityIds = runtimeService.getActiveActivityIds(processInstance.getId());
          for (String activeActivityId : activeActivityIds) {
            list.add(processDiagramLayout.getNode(activeActivityId));
          }
        }
        return list;
      }

This bean is then invoked by a JSF page which displays the process diagram from the Servlet shown above and places tokens on top of it (see [taskTemplate.xhtml](https://github.com/camunda/camunda-consulting/blob/master/showcases/invoice-en/src/main/webapp/WEB-INF/templates/template.xhtml)).

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-java/process-diagram-api-token.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
  <pre><code>&lt;div style="position: relative"&gt;
 &lt;img src="processDiagram?processDefinitionId=#{task.processDefinitionId}" /&gt;

 &lt;ui:repeat
  value="#{processDiagramController.getActiveActivityBoundsOfLatestProcessInstance()}"
  var="bounds"&gt;
  &lt;img src="token.png" style="
    position: absolute;
    left: #{bounds.x + bounds.width - 25}px;
    top: #{bounds.y - 15}px;
    z-index: 1;"/&gt;
  &lt;/ui:repeat&gt;
&lt;/div&gt;</code></pre>
  </div>
</div>


However, you can also draw a rectangle around a node.

<img src="ref:asset:/assets/img/implementation-java/process-diagram-api-rectangle.png" class="img-responsive">


    <div style="position: relative">
        <p:graphicImage
            value="processDiagram?processDefinitionId=#{task.processDefinitionId}" />
        <ui:repeat
            value="#{processDiagramController.getActiveActivityBoundsOfLatestProcessInstance()}"
            var="bounds">
            <div style="
              position: absolute;
              left: #{bounds.x - 1}px;
              top: #{bounds.y - 1}px;
              width: #{bounds.width - 2}px;
              height: #{bounds.height - 2}px;
              border: 2px solid rgb(181, 21, 43);
              border-radius: 5px; -moz-border-radius: 5px;"></div>
        </ui:repeat>
    </div>
