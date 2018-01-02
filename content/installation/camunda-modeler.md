---

title: "Install the Camunda Modeler"
weight: 01  

menu:
  main:
    name: "Camunda Modeler"
    identifier: "installation-guide-modeler"
    parent: "installation-guide"
    pre: "Install the Camunda Modeler for BPMN 2.0, CMMN 1.1 and DMN 1.1."

---

This page explains how to install the Camunda Modeler for modeling BPMN 2.0 diagrams, CMMN 1.1 cases and DMN 1.1 decision tables.

# Requirements

## Operation Systems

* Windows 7 and later
* Mac OS X 10.8 and later
* Ubuntu 12.04 and later
* Fedora 21
* Debian 8

{{< meta-comment "this is based on our testing environment and the Electron documentation" >}}

{{< note title="Windows 10 64-bit" class="warning" >}}
  There are currently issues with using the 64-bit version of the modeler on Windows 10. We therefore recommend Windows 10 users to install the 32-bit version.
{{< /note >}}

## Matching Camunda Process Engine Version

For executing BPMN Diagrams created using Camunda Modeler, Process Engine version 7.4.0, 7.3.3, 7.2.6 and above is required.

Note that you do not need to install the Process Engine if you do not want to execute the BPMN Models.

# Download

The latest Camunda Modeler release can be downloaded on [camunda.org](https://camunda.org/download/modeler/).

# Instructions

After downloading unpack the modeler. It can then be started by running the executable named *camunda-modeler*.
