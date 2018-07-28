---

title: 'Extension Elements'
weight: 60

menu:
  main:
    identifier: "user-guide-bpmn-model-api-extension-elements"
    parent: "user-guide-bpmn-model-api"

---


[Custom extension elements]({{< ref "/reference/bpmn20/custom-extensions/_index.md" >}}) are a standardized way to extend the BPMN model.
The [Camunda extension elements]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md" >}}) are fully implemented in the BPMN model API, but unknown extension elements can also easily be accessed and added.

Every BPMN `BaseElement` can have a child element of the type `extensionElements`.
This element can contain all sorts of extension elements. To access the
extension elements you have to call the `getExtensionElements()` method and,
if no such child element exists, you must create one first.

```java
StartEvent startEvent = modelInstance.newInstance(StartEvent.class);
ExtensionElements extensionElements = startEvent.getExtensionElements();
if (extensionElements == null) {
  extensionElements = modelInstance.newInstance(ExtensionElements.class);
  startEvent.setExtensionElements(extensionElements);
}
Collection<ModelElementInstance> elements = extensionElements.getElements();
```

After that you can add or remove extension elements to the collection.

```java
CamundaFormData formData = modelInstance.newInstance(CamundaFormData.class);
extensionElements.getElements().add(formData);
extensionElements.getElements().remove(formData);
```

You can also access a query-like interface to filter the extension elements.

```java
extensionElements.getElementsQuery().count();
extensionElements.getElementsQuery().list();
extensionElements.getElementsQuery().singleResult();
extensionElements.getElementsQuery().filterByType(CamundaFormData.class).singleResult();
```

Additionally, there are some shortcuts to add new extension elements. You can use
the `namespaceUri` and the `elementName` to add your own extension elements. Or
you can use the `class` of a known extension element type, e.g., the camunda
extension elements. The extension element is added to the BPMN element and returned
so that you can set attributes or add child elements.

```java
ModelElementInstance element = extensionElements.addExtensionElement("http://example.com/bpmn", "myExtensionElement");
CamundaExecutionListener listener = extensionElements.addExtensionElement(CamundaExecutionListener.class);
```

Another helper method exists for the fluent builder API which allows you to add prior defined extension elements.

```java
CamundaExecutionListener camundaExecutionListener = modelInstance.newInstance(CamundaExecutionListener.class);
camundaExecutionListener.setCamundaClass("org.camunda.bpm.MyJavaDelegte");
startEvent.builder()
  .addExtensionElement(camundaExecutionListener);
```
