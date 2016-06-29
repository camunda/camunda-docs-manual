---

title: 'Decision Definition'
weight: 40

menu:
  main:
    name: "Decision Definition"
    identifier: "dmn-ref-drd-decision-definition"
    parent: "dmn-ref-drd"
    pre: "Specify decision definition id and name"

---

The decision definition is specified with the `definitions` element. The decision definition has attributes `name`, `id` and `namespace` that specify the 
name, id and the category of the decision definition respectively. 

```xml
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd"
    id="dish"
    name="Dish"
    namespace="drd-dish">
  <!-- ... -->
</definitions>
```