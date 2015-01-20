---

title: 'Querying XML'
category: 'Handling XML'

keyword: 'spin api xml'

---

The XML datatype supports querying with the XPath 1.0 query language.

## Querying an element

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinXmlTreeElement child = XML(xml).xPath("/root/child").element();
```

## Querying an element list

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinList<SpinXmlTreeElement> childs = XML(xml).xPath("/root/child/a").elementList();
```

## Querying an attribute

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinXmlTreeAttribute attribute = XML(xml).xPath("/root/child/@id").attribute();
```

## Querying an attribute list

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

SpinList<SpinXmlTreeAttribute> attributes = XML(xml).xPath("/root/child/a/@id").attributeList();
```

## Querying a String

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

String value = XML(xml).xPath("string(/root/child/@id)").string();
```

## Querying a Number

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

Double count = XML(xml).xPath("count(/root/child/a)").number();
```

## Querying a Boolean

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root><child id=\"child\"><a id=\"a\"/><a id=\"b\"/></child></root>";

Boolean exists = XML(xml).xPath("boolean(/root/child)").bool();
```

## Querying with namespaces

To use namespaces in spin with xml you can choose one of the following methods or combine all 3 of them.

### 1. Using auto detection

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root xmlns:t=\"http://camunda.org\"><t:child id=\"child\"><a id=\"a\"/></t:child></root>";

SpinXmlTreeElement child = XML(xml).xPath("/root/foo:child")
                                   .detectNamespaces();
                                   .element();
```

### 2. Using a single prefix - URI pair

```java
import static org.camunda.spin.Spin.XML;

String xml = "<root xmlns:t=\"http://camunda.org\"><t:child id=\"child\"><a id=\"a\"/></t:child></root>";

SpinXmlTreeElement child = XML(xml).xPath("/root/t:child")
                                   .ns("t", "http://camunda.org");
                                   .element();
```

### 3. Using a map of prefix - URI pairs

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

<div class="alert alert-info">
  If you are using `xmlns="<URI>"` in your xml file, spin uses `DEFAULT` as prefix for the namespace.<br />
  E.g.: ```<root xmlns="http://camunda.org"></root>``` -- prefix: DEFAULT, namespace: http://camunda.org so you need
  to use `XML(xml).xPath("/DEFAULT:root")` to fetch the correct element.
</dv>