---

title: 'Read a Model'
weight: 10

menu:
  main:
    identifier: "user-guide-bpmn-model-api-reading-a-model"
    parent: "user-guide-bpmn-model-api"

---


If you already created a BPMN model and want to process it by the BPMN model API you can import it with the
following methods.

```java
// read a model from a file
File file = new File("PATH/TO/MODEL.bpmn");
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(file);

// read a model from a stream
InputStream stream = [...]
BpmnModelInstance modelInstance = Bpmn.readModelFromStream(stream);
```

After you imported your model you can search for elements by their id or by the type of elements.

```java
// find element instance by ID
StartEvent start = (StartEvent) modelInstance.getModelElementById("start");

// find all elements of the type task
ModelElementType taskType = modelInstance.getModel().getType(Task.class);
Collection<ModelElementInstance> taskInstances = modelInstance.getModelElementsByType(taskType);
```

For every element instance you can now read and edit the attribute values. You can do this by either using the provided
helper methods or the generic XML model API. If you added custom attributes to the BPMN elements you can
always access them with the generic XML model API.

```java
StartEvent start = (StartEvent) modelInstance.getModelElementById("start");

// read attributes by helper methods
String id = start.getId();
String name = start.getName();

// edit attributes by helper methods
start.setId("new-id");
start.setName("new name");

// read attributes by generic XML model API (with optional namespace)
String custom1 = start.getAttributeValue("custom-attribute");
String custom2 = start.getAttributeValueNs("custom-attribute-2", "http://camunda.org/custom");

// edit attributes by generic XML model API (with optional namespace)
start.setAttributeValue("custom-attribute", "new value");
start.setAttributeValueNs("custom-attribute", "http://camunda.org/custom", "new value");
```

You can also access the child elements of an element or references to other elements. For example a sequence flow
references a source and a target element while a flow node (like start event, tasks etc.) has child elements
for incoming and outgoing sequence flows.

For example the following BPMN model was created by the BPMN model API as an example for a simple process.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<definitions targetNamespace="http://camunda.org/examples" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <process id="process-with-one-task">
    <startEvent id="start">
      <outgoing>start-task1</outgoing>
    </startEvent>
    <userTask id="task1">
      <incoming>start-task1</incoming>
      <outgoing>task1-end</outgoing>
    </userTask>
    <endEvent id="end">
      <incoming>task1-end</incoming>
    </endEvent>
    <sequenceFlow id="start-task1" sourceRef="start" targetRef="task1"/>
    <sequenceFlow id="task1-end" sourceRef="task1" targetRef="end"/>
  </process>
</definitions>
```

You can now use the BPMN model API to get the source and target flow node of the sequence flow with the ID *start-task1*.

```java
// read bpmn model from file
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(new File("/PATH/TO/MODEL.bpmn"));

// find sequence flow by id
SequenceFlow sequenceFlow = (SequenceFlow) modelInstance.getModelElementById("start-task1");

// get the source and target element
FlowNode source = sequenceFlow.getSource();
FlowNode target = sequenceFlow.getTarget();

// get all outgoing sequence flows of the source
Collection<SequenceFlow> outgoing = source.getOutgoing();
assert(outgoing.contains(sequenceFlow));
```

With these references you can easily create helper methods for different use cases. For example if you want to
find the following flow nodes of an task or a gateway you can use a helper method like the following.

```java
public Collection<FlowNode> getFlowingFlowNodes(FlowNode node) {
  Collection<FlowNode> followingFlowNodes = new ArrayList<FlowNode>();
  for (SequenceFlow sequenceFlow : node.getOutgoing()) {
    followingFlowNodes.add(sequenceFlow.getTarget());
  }
  return followingFlowNodes;
}
```
