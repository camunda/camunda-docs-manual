---

title: 'Creating a model'
category: 'BPMN model API'

---

To create a new BPMN model from scratch you have to create a empty BPMN model instance with the following method.

```java
BpmnModelInstance modelInstance = Bpmn.createEmptyModel();
```

The next step is to create a BPMN definitions element, set the target namespace on it and add it
to the newly created empty model instance as the document root element.

```java
Definitions definitions = modelInstance.newInstance(Definitions.class);
definitions.setTargetNamespace("http://camunda.org/examples");
modelInstance.setDocumentElement(definitions);
```

After that you usually want to add a process to your model. This also follows
the 3 steps as the creation of the BPMN definitions element:

1. create a new instance of the BPMN element
2. set attributes and  child elements of the element instance
3. add the newly created element instance to the corresponding parent element

```java
Process process = modelInstance.newInstance(Process.class);
process.setId("process");
definitions.addChildElement(process);
```

To simplify this repeating procedure you can use a helper method like this one.

```java
protected <T extends BpmnModelElementInstance> T createElement(BpmnModelElementInstance parentElement, String id, Class<T> elementClass) {
  T element = modelInstance.newInstance(elementClass);
  element.setAttributeValue("id", id, true);
  parentElement.addChildElement(element);
  return element;
}
```

After you created the elements of your process like start event, tasks, gateways and end event you have to connect
the elements by sequence flows. This follows again the 3 steps of element creation and can be simplified by the
following helper method.

```java
public SequenceFlow createSequenceFlow(Process process, FlowNode from, FlowNode to) {
  String identifier = from.getId() + "-" + to.getId();
  SequenceFlow sequenceFlow = createElement(process, identifier, SequenceFlow.class);
  process.addChildElement(sequenceFlow);
  sequenceFlow.setSource(from);
  from.getOutgoing().add(sequenceFlow);
  sequenceFlow.setTarget(to);
  to.getIncoming().add(sequenceFlow);
  return sequenceFlow;
}
```

After you created your process you can validate the model against the BPMN 2.0 specification and convert it to
a XML string or save it to a file or stream.

```java
// validate the model
Bpmn.validateModel(modelInstance);

// convert to string
String xmlString = Bpmn.convertToString(modelInstance);

// write to output stream
OutputStream outputStream = new OutputStream(...);
Bpmn.writeModelToStream(outputStream, modelInstance);

// write to file
File file = new File(...);
Bpmn.writeModelToFile(file, modelInstance);
```

### Example 1: Create a simple process with one user task

With the basic helper methods from above it is very easy and straightforward to create simple processes. First create a
process with a start event, user task and a end event.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/bpmn-model-api-simple-process.png" /></center>

The following code creates this process using the helper methods from above (without the DI elements).

```java
// create an empty model
BpmnModelInstance modelInstance = Bpmn.createEmptyModel();
Definitions definitions = modelInstance.newInstance(Definitions.class);
definitions.setTargetNamespace("http://camunda.org/examples");
modelInstance.setDocumentElement(definitions);

// create the process
Process process = createElement(definitions, "process-with-one-task", Process.class);

// create start event, user task and end event
StartEvent startEvent = createElement(process, "start", StartEvent.class);
UserTask task1 = createElement(process, "task1", UserTask.class);
task1.setName("User Task");
EndEvent endEvent = createElement(process, "end", EndEvent.class);

// create the connections between the elements
createSequenceFlow(process, startEvent, task1);
createSequenceFlow(process, task1, endEvent);

// validate and write model to file
Bpmn.validateModel(modelInstance);
File file = File.createTempFile("bpmn-model-api-", ".bpmn");
Bpmn.writeModelToFile(file, modelInstance);
```

### Example 2: Create a simple process with two parallel tasks

Even complexer processes can be create with few lines of code with the standard BPMN model API.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/bpmn-model-api-parallel-gateway.png" /></center>

```java
// create an empty model
BpmnModelInstance modelInstance = Bpmn.createEmptyModel();
Definitions definitions = modelInstance.newInstance(Definitions.class);
definitions.setTargetNamespace("http://camunda.org/examples");
modelInstance.setDocumentElement(definitions);

// create elements
StartEvent startEvent = createElement(process, "start", StartEvent.class);
ParallelGateway fork = createElement(process, "fork", ParallelGateway.class);
ServiceTask task1 = createElement(process, "task1", ServiceTask.class);
task1.setName("Service Task");
UserTask task2 = createElement(process, "task2", UserTask.class);
task2.setName("User Task");
ParallelGateway join = createElement(process, "join", ParallelGateway.class);
EndEvent endEvent = createElement(process, "end", EndEvent.class);

// create flows
createSequenceFlow(process, startEvent, fork);
createSequenceFlow(process, fork, task1);
createSequenceFlow(process, fork, task2);
createSequenceFlow(process, task1, join);
createSequenceFlow(process, task2, join);
createSequenceFlow(process, join, endEvent);

// validate and write model to file
Bpmn.validateModel(modelInstance);
File file = File.createTempFile("bpmn-model-api-", ".bpmn");
Bpmn.writeModelToFile(file, modelInstance);
```
