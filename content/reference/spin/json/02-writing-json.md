---

title: 'Writing JSON'
weight: 20

menu:
  main:
    identifier: "spin-ref-json-writing"
    parent: "spin-ref-json"

---

The JSON datatype supports writing JSON to Strings or Writers.


# Writing to a String:

```java
import static org.camunda.spin.Spin.JSON;

SpinJsonNode jsonNode = JSON("{\"customer\": \"Kermit\"}");

String json = jsonNode.toString();
```


# Writing to a Writer

```java
import static org.camunda.spin.Spin.JSON;

SpinJsonNode jsonNode = JSON("{\"customer\": \"Kermit\"}");

StringWriter writer = jsonNode.writeToWriter(new StringWriter());
```
