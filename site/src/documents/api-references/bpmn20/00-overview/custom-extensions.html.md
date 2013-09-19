---

title: 'BPMN 2.0 Custom Extensions'
category: 'Overview'

---

The BPMN 2.0 standard is a good thing for all parties involved. End-users don't suffer from a vendor lock-in that comes by depending on a proprietary solution. Frameworks, and particularly open-source frameworks such as camunda BPM, can implement a solution that has the same (and often better implemented ;-)) features as those of a big vendor. Due to the BPMN 2.0 standard, the transition from one tool to the other works.

The downside of a standard however, is the fact that it is always the result of many discussions and compromises between different companies (and often visions). As a developer reading the BPMN 2.0 XML of a process definition, sometimes it feels like certain constructs or way to do things are too cumbersome. Since camunda BPM puts ease of development as a top-priority, we introduced own BPMN extensions. These extensions are new constructs or ways to simplify certain constructs, that are not in the BPMN 2.0 specification.

Although the BPMN 2.0 specification clearly states that it was made for custom extension, we make sure that:

* The prerequisite of such a custom extension is that there always must be a simple transformation to the standard way of doing things. So when you decide to use a custom extension, you don't have to be afraid that there is no way back.
* When using a custom extension, this is always clearly indicated by giving the new XML element, attribute, etc. the camunda: namespace prefix.
* The goal of these extensions is to eventually push them back into a next version of the BPMN specification, or at least trigger a discussion that can lead to a revision of that specific BPMN construct.

So whether you want to use a custom extension or not, is completely up to you. Several factors will influence this decision (graphical editor usage, company policy, etc.). We only provide them since we believe that some points in the standard can be done simpler or more efficient. Feel free to give us (positive and/or negative) feedback on our extensions, or to post new ideas for custom extensions. Who knows, some day your idea might pop up in the specification.


 