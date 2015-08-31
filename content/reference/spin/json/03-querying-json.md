---

title: 'Querying JSON'
weight: 30

menu:
  main:
    identifier: "spin-ref-json-querying"
    parent: "spin-ref-json"

---

The JSON datatype supports querying with the [JSONPath](http://goessner.net/articles/JsonPath/) query language.


# Querying an Element

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

SpinJsonNode child = JSON(json).jsonPath("$.child[0]").element();
```


# Querying an Element List

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

SpinList<SpinJsonNode> childs = JSON(json).jsonPath("$.child").elementList();
```


# Querying a String

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

String value = JSON(json).jsonPath("$.child[0].name").stringValue();
```


# Querying a Number

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

Double count = JSON(json).jsonPath("$.number").numberValue();
```


# Querying a Boolean

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

Boolean exists = JSON(json).jsonPath("$.boolean").boolValue();
```


# Filtering a Query

Be aware that a filtering expression - the expression in the `()` - is not allowed to contain double quotes!

```java
import static org.camunda.spin.Spin.JSON;

String json = "{\"child\": [{\"id\": 1,\"name\": \"Lucy\",\"sex\": \"female\"},{\"id\": 2,\"name\": \"Tracy\",\"sex\": \"female\"}],\"number\": 1,\"boolean\": true}";

SpinList<SpinJsonNode> girls = JSON(json).jsonPath("$.child[?(@.sex == 'female')]").elementList();
```
