---

title: 'Overview'
category: 'Introduction'

---


Migrating an existing application from Activiti 5.x (or Camunda fox 6.x - see below) is straightforward.
This page describes the necessary steps.

**Getting Help:** If you have any trouble, ask for assistance in the [Forum](http://camunda.org/community/forum.html).

The changes in short are:

*   Maven **Dependencies**, e.g., `activiti.jar` changed to `camunda-engine.jar`.
*   **Package Names** changed from `org.activiti` to `org.camunda.bpm` for all modules (including engine, CDI and spring).
*   The **configuration file** changed from `activiti.cfg.xml` to `camunda.cfg.xml`.
*   Several (internal) classes are renamed - see the lists below.

There are some things which have not changed yet:

*   Database schema and table names. Note that we based our fork on Activiti 5.11 and the tables existent in that version.
*   The `camunda:` [Custom Extensions](ref:/api-references/bpmn20/#custom-extensions-bpmn-20-custom-extensions) are kept.
    A Camunda BPM namespace will be introduced soon but backwards compatibility will be ensured.