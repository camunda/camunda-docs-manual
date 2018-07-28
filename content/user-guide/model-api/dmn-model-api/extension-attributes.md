---

title: 'Extension Attributes'
weight: 60

menu:
  main:
    identifier: "user-guide-dmn-model-api-extension-attributes"
    parent: "user-guide-dmn-model-api"

---


[Custom extensions]({{< ref "/reference/dmn11/custom-extensions/_index.md" >}}) are a standardized way to extend the DMN model.
The [Camunda extension attrributes]({{< ref "/reference/dmn11/custom-extensions/camunda-attributes.md" >}}) are fully implemented in the DMN model API.

Every DMN `Decision` element can have the attributes `historyTimeToLive` and `versionTag`.
To access the extension attributes, you have to call the `Decision#getCamundaHistoryTimeToLiveString()` and
`Decision#getVersionTag()` methods.

```java
String historyTimeToLive = decision.getCamundaHistoryTimeToLiveString();
String versionTag = decision.getVersionTag();
```
To set attributes, use `Decision#setCamundaHistoryTimeToLiveString()` and `Decision#setVersionTag()`
```java
decision.setCamundaHistoryTimeToLiveString("1000");
decision.setVersionTag("1.0.0");
```

Every `Input` element can have an `inputVariable` attribute.
This attribute specifies the variable name which can be used to access the result of the input expression in an input entry expression.
It can be set and fetched similarly, calling `Input#setCamundaInputVariable()` and `Input#getCamundaInputVariable()`:

```java
input.setCamundaInputVariable("camundaInput");
String camundaInput = input.getCamundaInputVariable();
```
