---

title: 'Use Element Templates to Extend the Modeler'
weight: 28

menu:
  main:
    name: "Element Templates"
    identifier: "camunda-modeler-element-templates"
    parent: "camunda-modeler"
    pre: "Extend the modeler with custom elements."

---

{{< note class="info" title="Where to use element templates" >}}
Element templates are currently available in BPMN diagrams.
{{< /note >}}


# Overview

Element templates are a way to extend the [Camunda Modeler](https://camunda.org/bpmn/tool/) with domain specific diagram elements such as service and user tasks.

{{< img src="img/overview.png" title="Custom fields in the Camunda Modeler" >}}

If applicable, element templates can be assigned to a diagram element via the properties panel.
Once selected, they configure the diagram element with pre-defined values for BPMN properties, input/output mappings as well as extension properties.

As seen in the _Mail Task_ example above the modeler allows properties of custom elements to be edited, too.


## Learn More

Refer to the following resources to learn more about element templates:

* [Element Template documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/element-templates)
