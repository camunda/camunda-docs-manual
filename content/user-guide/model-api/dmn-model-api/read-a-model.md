---

title: 'Read a Model'
weight: 10

menu:
  main:
    identifier: "user-guide-dmn-model-api-read-a-model"
    parent: "user-guide-dmn-model-api"

---


If you already created a DMN model and want to process it through the DMN model API, you can import it with the
following methods.

```java
// read a model from a file
File file = new File("PATH/TO/MODEL.dmn");
DmnModelInstance modelInstance = Dmn.readModelFromFile(file);

// read a model from a stream
InputStream stream = [...]
DmnModelInstance modelInstance = Dmn.readModelFromStream(stream);
```

After you imported your model you can search for elements by their id or by the type of element.

```java
// find element instance by ID
DecisionTable decisionTable = modelInstance.getModelElementById("decisionTable1");

// find all elements of the type DecisionTable
ModelElementType decisionTableType = modelInstance.getModel()
  .getType(DecisionTable.class);
Collection<ModelElementInstance> decisionTableInstances = 
  modelInstance.getModelElementsByType(decisionTableType);
```

For every element instance you can now read and edit the attribute values. You can do this by either using the provided
helper methods or the generic XML model API. If you added custom attributes to the DMN elements, you can
always access them with the generic XML model API.

```java
DecisionTable decisionTable = modelInstance.getModelElementById("decisionTable1");

// read attributes by helper methods
String outputLabel = decisionTable.getOutputLabel();
Collection<Input> inputs = decisionTable.getInputs();

// edit attributes by helper methods
decisionTable.setOutputLabel("new-label");

// read attributes by generic XML model API (with optional namespace)
String custom1 = decisionTable.getAttributeValue("custom-attribute");
String custom2 = decisionTable.getAttributeValueNs("custom-attribute-2", 
  "http://camunda.org/custom");

// edit attributes by generic XML model API (with optional namespace)
decisionTable.setAttributeValue("custom-attribute", "new value");
decisionTable.setAttributeValueNs("custom-attribute", 
  "http://camunda.org/custom", "new value");
```

You can also access the child elements of an element or references to other elements. For example, 
a decision has a required decision which it depends on. 
A required decision is represented by a requiredDecision element inside an informationRequirement XML element.

Consider the following simple DMN model:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" 
             id="dish" name="Dish" namespace="test-drd-2">

  <decision id="dish-decision" name="Dish Decision">
    <informationRequirement>
      <requiredDecision href="#season" />
    </informationRequirement>
    <decisionTable id="dishDecisionTable">
      <input id="seasonInput" label="Season">
        <inputExpression id="seasonInputExpresion" typeRef="string">
          <text>season</text>
        </inputExpression>
      </input>
      <output id="output" label="Dish" name="desiredDish" typeRef="string"/>
      <rule id="dishRule1">
        <inputEntry id="dishInputEntry1">
          <text><![CDATA["Spring"]]></text>
        </inputEntry>
        <outputEntry id="dishOutputEntry1">
          <text><![CDATA["Salad"]]></text>
        </outputEntry>
      </rule>
      ...
    </decisionTable>
  </decision>

  <decision id="season" name="Season decision">
    <decisionTable id="seasonDecisionTable">
      <input id="temperatureInput" label="Weather in Celsius">
        <inputExpression id="temperatureInputExpression" typeRef="integer">
          <text>temperature</text>
        </inputExpression>
      </input>
      <output id="seasonOutput" label="season" name="season" typeRef="string" />
      <rule id="seasonRule1">
        <inputEntry id="seasonInputEntry1">
          <text><![CDATA[<10]]></text>
        </inputEntry>
        <outputEntry id="seasonOutputEntry1">
          <text><![CDATA["Winter"]]></text>
        </outputEntry>
      </rule>
      ...
    </decisionTable>
  </decision>

</definitions>
```

You can now use the DMN model API to get the input elements of the required decisions.

```java
// read dmn model from file
File file = new File("PATH/TO/MODEL.dmn");
DmnModelInstance modelInstance = Dmn.readModelFromFile(file);

// find the main decision by ID
Decision decision = modelInstance.getModelElementById("dish-decision");

// get the information requirements
Collection<InformationRequirement> informationRequirements =
  decision.getInformationRequirements();

// get the input of the required decisions
for (InformationRequirement informationRequirement : informationRequirements) {
  Decision requiredDecision = informationRequirement.getRequiredDecision();
  DecisionTable decisionTable =
    requiredDecision.getUniqueChildElementByType(DecisionTable.class);
  Collection<Input> inputs = decisionTable.getInputs();
  ...
}
```
