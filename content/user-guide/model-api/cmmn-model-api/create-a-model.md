---

title: 'Create a Model'
weight: 20

menu:
  main:
    identifier: "user-guide-cmmn-model-api-creating-a-model"
    parent: "user-guide-cmmn-model-api"

---


To create a new CMMN model from scratch you have to create an empty CMMN model instance with the following method:

```java
CmmnModelInstance modelInstance = Cmmn.createEmptyModel();
```

The next step is to create a CMMN definitions element. Set the target namespace on it and add it
to the newly created empty model instance.

```java
Definitions definitions = modelInstance.newInstance(Definitions.class);
definitions.setTargetNamespace("http://camunda.org/examples");
modelInstance.setDefinitions(definitions);
```

Usually you want to add a case to your model. This follows
the same 3 steps as the creation of the CMMN definitions element:

1. create a new instance of the CMMN element
2. set attributes and child elements of the element instance
3. add the newly created element instance to the corresponding parent element

```java
Case caseElement = modelInstance.newInstance(Case.class);
caseElement.setId("a-case");
definitions.addChildElement(caseElement);
```

To simplify this repeating procedure you can use a helper method like this one.

```java
protected <T extends CmmnModelElementInstance> T createElement(CmmnModelElementInstance parentElement, String id, Class<T> elementClass) {
  T element = modelInstance.newInstance(elementClass);
  element.setAttributeValue("id", id, true);
  parentElement.addChildElement(element);
  return element;
}
```

Validate the model against the CMMN 1.1 specification and convert it to
a XML string or save it to a file or stream.

```java
// validate the model
Cmmn.validateModel(modelInstance);

// convert to string
String xmlString = Cmmn.convertToString(modelInstance);

// write to output stream
OutputStream outputStream = new OutputStream(...);
Cmmn.writeModelToStream(outputStream, modelInstance);

// write to file
File file = new File(...);
Cmmn.writeModelToFile(file, modelInstance);
```
