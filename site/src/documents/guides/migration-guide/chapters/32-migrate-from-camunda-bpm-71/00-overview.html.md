---

title: 'Overview'
category: 'Migrate from Camunda BPM 7.1 to 7.2'

---

The following guide covers these use cases:

1. For administrators and developers: Migrating a shared process engine setting
2. For administrators and developers: Migrating an embedded process engine setting
2. For developers: Migrating embedded task forms
3. For developers: Migrating a Cockpit plugin

This guide covers mandatory migration steps as well as optional steps that can be carried out to enable or disable new functionality included in Camunda BPM 7.2. The following concepts were introduced with Camunda BPM 7.2:

* **CMMN:** [Case Management Model And Notation][cmmn-ref] (CMMN) is a modelling standard similar to BPMN that focuses on human-centric processes. Camunda BPM 7.2 implements this standard and therefore extends the database schema during upgrade. If you do not plan to use CMMN, these tables will stay empty.
* **Spin/Connect:** Camunda [Spin][spin-ref] and [Connect][connect-ref] are optional Camunda extensions that ease the use of text-based data formats and connectivity in processes. Spin and Connect are separate modules that have to be explicitly added and configured in an existing installation. This guide shows you how to enable/disable the usage of Spin and Connect.
* **Freemarker:** This optional Camunda extension provides a [scripting engine for the templating language Freemarker][freemarker-ref] that allows to use Freemarker as scripts in process constructs.

Before migrating, decide whether you additionally want to enable Spin/Connect and Freemarker. Based on this decision, you may have to carry out additional migration steps.

[cmmn-ref]: ref:/api-references/cmmn10/
[connect-ref]: ref:/guides/user-guide/#process-engine-connectors
[spin-ref]: /guides/user-guide/#data-formats-xml-json-other
[freemarker-ref]: /guides/user-guide/#process-engine-templating