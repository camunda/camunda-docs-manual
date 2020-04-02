---

title: 'Read a Model'
weight: 10

menu:
  main:
    identifier: "user-guide-cmmn-model-api-reading-a-model"
    parent: "user-guide-cmmn-model-api"

---


If you already created a CMMN model and want to process it through the CMMN model API, you can import it with the
following methods.

```java
// read a model from a file
File file = new File("PATH/TO/MODEL.cmmn");
CmmnModelInstance modelInstance = Cmmn.readModelFromFile(file);

// read a model from a stream
InputStream stream = [...]
CmmnModelInstance modelInstance = Cmmn.readModelFromStream(stream);
```

After you imported your model you can search for elements by their id or by the type of element.

```java
// find element instance by ID
HumanTask humanTask = (HumanTask) modelInstance.getModelElementById("HumanTask_1");

// find all elements of the type HumanTask
ModelElementType humanTaskType = modelInstance.getModel().getType(HumanTask.class);
Collection<ModelElementInstance> humanTaskInstances = modelInstance.getModelElementsByType(humanTaskType);
```

For every element instance you can now read and edit the attribute values. You can do this by either using the provided
helper methods or the generic XML model API. If you added custom attributes to the CMMN elements, you can
always access them with the generic XML model API.

```java
HumanTask humanTask = (HumanTask) modelInstance.getModelElementById("HumanTask_1");

// read attributes by helper methods
String id = humanTask.getId();
String name = humanTask.getName();

// edit attributes by helper methods
humanTask.setId("new-id");
humanTask.setName("new name");

// read attributes by generic XML model API (with optional namespace)
String custom1 = humanTask.getAttributeValue("custom-attribute");
String custom2 = humanTask.getAttributeValueNs("custom-attribute-2", "http://camunda.org/custom");

// edit attributes by generic XML model API (with optional namespace)
humanTask.setAttributeValue("custom-attribute", "new value");
humanTask.setAttributeValueNs("custom-attribute", "http://camunda.org/custom", "new value");
```

You can also access the child elements of an element or references to other elements. For example, a plan item
references a definition element (like human task, process task, etc.) while the referenced definition element contains
default control.

Consider the following simple CMMN model:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<definitions targetNamespace="http://camunda.org/examples"
             xmlns="http://www.omg.org/spec/CMMN/20151109/MODEL">
  <case id="case-with-one-task">
    <casePlanModel id="CasePlanModel_1">
      <planItem id="PI_HumanTask_1" definitionRef="HumanTask_1" name="A Task" />
      <humanTask id="HumanTask_1">
        <defaultControl>
          <manualActivationRule>
            <condition>${false}</condition>
          </manualActivationRule>
        </defaultControl>
      </humanTask>
    </casePlanModel>
  </case>
</definitions>
```

You can now use the CMMN model API to get the definition of the plan item with the ID *PI_HumanTask_1*.

```java
// read cmmn model from file
File file = new File("PATH/TO/MODEL.cmmn");
CmmnModelInstance modelInstance = Cmmn.readModelFromFile(file);

// find plan item by id
PlanItem planItem = (PlanItem) modelInstance.getModelElementById("PI_HumanTask_1");

// get the definition element
PlanItemDefinition definition = planItem.getDefinition();

// get the default control
DefaultControl defaultControl = definition.getDefaultControl();
ManualActivationRule rule = defaultControl.getManualActivationRule();
```
