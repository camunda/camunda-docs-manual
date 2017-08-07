---

title: 'Create a Model'
weight: 20

menu:
  main:
    identifier: "user-guide-dmn-model-api-create-a-model"
    parent: "user-guide-dmn-model-api"

---


To create a new DMN model from scratch, you have to create an empty DMN model instance with the following method:

```java
DmnModelInstance modelInstance = Dmn.createEmptyModel();
```

The next step is to create a DMN definitions element. Set the target namespace on it and add it
to the newly created empty model instance.

```java
 Definitions definitions = modelInstance.newInstance(Definitions.class);
 definitions.setNamespace("http://camunda.org/schema/1.0/dmn");
 definitions.setName("definitions");
 definitions.setId("definitions");
 modelInstance.setDefinitions(definitions);
```

Usually you want to add a decision to your model. This follows
the same 3 steps as the creation of the DMN definitions element:

1. Create a new instance of the DMN element
2. Set attributes and child elements of the element instance
3. Add the newly created element instance to the corresponding parent element

```java
Decision decision = modelInstance.newInstance(Decision.class);
decision.setId("testGenerated");
decision.setName("generationtest");
definitions.addChildElement(decision);
```

To simplify this repeating procedure, you can use a helper method like this one.

```java
protected <T extends DmnModelElementInstance> T createElement(DmnModelElementInstance parentElement, String id, Class<T> elementClass) {
  T element = modelInstance.newInstance(elementClass);
  element.setAttributeValue("id", id, true);
  parentElement.addChildElement(element);
  return element;
}
```

Validate the model against the DMN 1.1 specification and convert it to
an XML string or save it to a file or stream.

```java
// validate the model
Dmn.validateModel(modelInstance);

// convert to string
String xmlString = Dmn.convertToString(modelInstance);

// write to output stream
OutputStream outputStream = new OutputStream(...);
Dmn.writeModelToStream(outputStream, modelInstance);

// write to file
File file = new File(...);
Dmn.writeModelToFile(file, modelInstance);
```
