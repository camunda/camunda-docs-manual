---

title: "Install Camunda Platform Run"
weight: 05

menu:
  main:
    name: "Camunda Platform Run"
    identifier: "installation-camunda-bpm-run"
    parent: "installation-guide"
    pre: "Install Camunda Platform Run, an easy to configure full distribution of the Camunda Platform. No Java knowledge necessary."
---

This page describes the steps to execute Camunda Platform Run.

# Requirements
Please make sure that you have the Java Runtime Environment 8+ installed.

You can verify this by using your terminal, shell, or command line:

```sh
java -version
```
If you need to install Java Runtime Environment, you can [find the download from Oracle here](https://www.oracle.com/java/technologies/javase-downloads.html).

# Installation Procedure
1. Download the pre-packed distribution of the [community edition here] (https://downloads.camunda.cloud/release/camunda-bpm/run/) or the [enterprise edition here](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/run/).
1. Unpack the distro to a directory.
1. Configure the distro as described in the [User Guide]({{< ref "/user-guide/camunda-bpm-run.md" >}}).
1. Start Camunda Platform Run by executing the start script (start.bat for Windows, start.sh for Linux/Mac).
1. Access the Camunda webapps (Cockpit, Tasklist, Admin) via http://localhost:8080/camunda/app/.
1. Access the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}) via http://localhost:8080/engine-rest (e.g. http://localhost:8080/engine-rest/engine).
