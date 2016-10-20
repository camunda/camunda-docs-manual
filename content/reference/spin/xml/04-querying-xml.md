---

title: 'Querying XML'
weight: 40

menu:
  main:
    identifier: "spin-ref-xml-querying"
    parent: "spin-ref-xml"

---

The XML datatype supports querying with the XPath 1.0 query language.


# Querying an Element

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinXmlTreeElement child = XML(xml).xPath("/root/child").element();
```


# Querying an Element List

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinList<SpinXmlTreeElement> childs = XML(xml).xPath("/root/child/a").elementList();
```


# Querying an Attribute

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinXmlTreeAttribute attribute = XML(xml).xPath("/root/child/@id").attribute();
```


# Querying an Attribute List

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinList<SpinXmlTreeAttribute> attributes = XML(xml).xPath("/root/child/a/@id").attributeList();
```


# Querying a String

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

String value = XML(xml).xPath("string(/root/child/@id)").string();
```


# Querying a Number

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

Double count = XML(xml).xPath("count(/root/child/a)").number();
```


# Querying a Boolean

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

Boolean exists = XML(xml).xPath("boolean(/root/child)").bool();
```


# Querying with Namespaces

To use namespaces in spin with xml you can choose one of the following methods or combine both of them.


## 1. Using a Single Prefix - URI Pair

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root xmlns:t=\"http://camunda.org\"><t:child id=\"child\"><a id=\"a\"/></t:child></root>";

SpinXmlTreeElement child = XML(xml).xPath("/root/t:child")
                                   .ns("t", "http://camunda.org");
                                   .element();
```

## 2. Using a Map of Prefix - URI Pairs

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root xmlns:t=\"http://camunda.org\"><t:child id=\"child\"><a id=\"a\"/></t:child></root>";

Map<String, String> namespaceMap = new HashMap<String, String>();
namespaceMap.put("t", "http://camunda.org");
namespaceMap.put("s", "http://camunda.com");

SpinXmlTreeElement child = XML(xml).xPath("/root/t:child")
                                   .ns(namespaceMap);
                                   .element();
```

{{< note class="info" >}}
  If you are using `xmlns="<URI>"` in your xml file, spin uses `DEFAULT` as prefix for the namespace.<br />
  E.g.: ```<root xmlns="http://camunda.org"></root>``` -- prefix: DEFAULT, namespace: http://camunda.org so you need
  to use `XML(xml).xPath("/DEFAULT:root")` to fetch the correct element.
{{< /note >}}