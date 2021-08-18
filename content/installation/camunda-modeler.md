---

title: "Install the Camunda Modeler"
weight: 01

menu:
  main:
    name: "Camunda Modeler"
    identifier: "installation-guide-modeler"
    parent: "installation-guide"
    pre: "Install the Camunda Modeler for BPMN 2.0, DMN 1.3 and Camunda Forms"

---

This page explains how to install the Camunda Modeler for modeling BPMN 2.0 diagrams, DMN 1.3 decision tables and Camunda Forms.

# Requirements

## Operation Systems

Officially supported on the following operating systems:

* Windows 7 / 10
* Mac OS X 10.11 and later
* Ubuntu LTS (latest)

Reported to work on these operating systems, too:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8

{{< meta-comment "this is based on our testing environment and the Electron documentation (https://electronjs.org/docs/tutorial/support)" >}}


## Matching Camunda Process Engine Version

For executing BPMN Diagrams created using Camunda Modeler, Process Engine version 7.4.0, 7.3.3, 7.2.6 and above is required.

For evaluating DMN 1.3 Decisions created using Camunda Modeler, Process Engine version 7.13.0, 7.12.4, 7.11.11, 7.10.17 and above is required.

For displaying Camunda Forms created using Camunda Modeler, Process Engine version 7.15.0 and above is required.

Note that you do not need to install the Process Engine if you do not want to execute the BPMN Diagrams or evaluate DMN Decisions.

# Download

Get the latest release from the [Camunda Modeler download page](https://camunda.com/download/modeler/).

Find older versions of the modeler in our [release archive](https://downloads.camunda.cloud/release/camunda-modeler/).

# Install

Unpack the modeler into a location of your choice.

# Run the Application

Run the application via the executable `Camunda Modeler.exe` (Windows), `Camunda Modeler.app` (Mac) or `camunda-modeler` (Linux).

# Wire File Associations

On Windows and Linux you must carry out additional steps to register the modeler as the default editor for BPMN, DMN and Camunda Form files.

### Windows

To make the modeler the default editor for `.bpmn`, `.dmn` and `.form` files execute `support/register_fileassoc.bat`.

### Linux

To create a [desktop file](https://specifications.freedesktop.org/desktop-entry-spec/latest/) and make the modeler the default editor for `.bpmn`, `.dmn` and `.form` files execute `support/xdg_register.sh`.
