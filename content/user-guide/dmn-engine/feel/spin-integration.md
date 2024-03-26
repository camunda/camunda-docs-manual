---

title: 'FEEL Engine Spin Integration'
weight: 30

menu:
  main:
    name: "Spin Integration"
    identifier: "user-guide-dmn-engine-feel-spin"
    parent: "user-guide-dmn-engine-feel"
    pre: "Integrates Spin functionality into the FEEL Engine"

---

This page documents how Camunda Spin can be used together with the Scala FEEL Engine. Furthermore, 
it is shown how Spin data types are mapped to FEEL data types, as well as some rules when the 
former data structures are transformed into the latter.

## Where can the Spin integration be found

The Spin integration for the FEEL Engine is implemented into the 
[Spin Process Engine Plugin][spin plugin] since it is expected that the Process Engine should be 
capable of using Spin, if another component of Camunda 7 (here, the FEEL Engine) 
supports its usage. 

In the case of a standalone DMN Engine setup, the Spin Process Engine Plugin would need to be added 
as a dependency as well, and the DMN Engine will pick up the necessary classes to enable the Spin
FEEL Engine integration.

The Maven coordinates for the Spin Process Engine Plugin can be found below:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-plugin-spin</artifactId>
  <version>${camunda.version}</version>
</dependency>
```

## How does the Spin integration work

The Spin integration consists of a Spin "Data Types"-dedicated implementation of the FEEL Engine
`ValueMapper` interface. The `SpinValueMapper` implementation intercepts any objects of types:

* `SpinJsonNode`
* `SpinXmlElement`
 
An object of these types, passed as a variable to the FEEL Engine will be converted to the
appropriate FEEL data type. Below, you can find an example of how this can be done: 

```java
  // define a JSON variable
  SpinJsonNode json = Spin.JSON("{\"customer\": \"Kermit\", \"language\": \"en\"}");
  
  // create a variable map and store the JSON variable
  VariableMap variables = Variables.createVariables().putValue("jsonVariable", json);

  // evaluate a decision containing a FEEL expression that uses the JSON variable
  dmnEngine.evaluateDecision(decisionWithFEEL, variables);
```

## What is the FEEL data type mapping of JSON/XML variables

When converting JSON/XML variables to a FEEL data type, the provided JSON/XML structure will be
mapped to a `Context` FEEL type. The actual values contained in the data structure will be mapped
to the supported FEEL data types documented in the external FEEL documentation [here][type doc].

### Spin JSON

Variables of type `SpinJsonNode` are transformed into an equal context, meaning that no
transformation happens, it's basically the JSON structure. 

Spin JSON:

```json
{ 
  "name": "Kermit", 
  "address": 
  {
    "city": "Berlin", 
    "zip-code": 10961
  }
}
```

FEEL context:

```js
{ 
  name : "Kermit",
  address : 
  {
    city : "Berlin",
    zipCode : 10961
  }
}
```

### Spin XML

Variables of type `SpinXmlElement` are transformed into context applying the following rules:

* every XML element is a context entry
* every XML attribute is a context entry with prefix `@` under the element's entry
* multiple XML elements with the same are grouped in the context as list 
* the inner content of an XML element is set as context entry `$content`   
* if the element or the attribute has a namespace then the context entry has the prefix `<NAMESPACE>$`

Spin XML:

```xml
<customer name="Kermit">
  <address city="Berlin" zipCode="10961" />
</customer>
```

FEEL context:

```js
{ 
  customer : 
  {
    @name : "Kermit",
    address : 
    {
      @city : "Berlin",
      @zipCode : "10961"
    }
  }
}
```

 
[type doc]: https://camunda.github.io/feel-scala/1.11/feel-data-types
[spin plugin]: {{< ref "/user-guide/data-formats/configuring-spin-integration.md#camunda-engine-plugin-spin" >}}
