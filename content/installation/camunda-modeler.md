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

## Matching Camunda Process Engine Version

For executing BPMN Diagrams created using Camunda Modeler, Process Engine version 7.4.0, 7.3.3, 7.2.6 and above is required.

Note that you do not need to install the Process Engine if you do not want to execute the BPMN Models.

# Download

Get the latest release from the [Camunda Modeler download page](https://camunda.com/download/modeler/).

Find older versions of the modeler in our [release archive](https://camunda.org/download/modeler/).

# Install

Unpack the modeler into a location of your choice.

# Run the Application

Run the application via the executable `Camunda Modeler.exe` (Windows), `Camunda Modeler.app` (Mac) or `camunda-modeler` (Linux).

# Wire File Associations

On Windows and Linux you must carry out additional steps to register the modeler as the default editor for BPMN, CMMN and DMN files.

### Windows

To make the modeler the default editor for `.bpmn`, `.cmmn` and `.dmn` files execute `support/register_fileassoc.bat`.

### Linux

To create a [desktop file](https://specifications.freedesktop.org/desktop-entry-spec/latest/) and make the modeler the default editor for `.bpmn`, `.cmmn` and `.dmn` files execute `support/xdg_register.sh`.