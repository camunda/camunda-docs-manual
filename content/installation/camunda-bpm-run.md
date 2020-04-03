---

title: "Install Camunda BPM Run"
weight: 05

menu:
  main:
    name: "Camunda BPM Run"
    identifier: "installation-camunda-bpm-run"
    parent: "installation-guide"
    pre: "Install Camunda BPM Run, an easy to configure full distribution of the Camunda BPM platform. No Java knowledge necessary."
---

This page describes the steps to execute Camunda BPM Run.

# Requirements
Please make sure that you have the Java Runtime Environment 8+ installed.

You can verify this by using your terminal, shell, or command line:

```sh
java -version
```
If you need to install Java Runtime Environment, you can [find the download from Oracle here](https://www.oracle.com/java/technologies/javase-downloads.html).

# Installation Procedure
1. Download the pre-packed distribution from [here](https://downloads.camunda.cloud/release/camunda-bpm/run/) or from [here](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/run/) if you are an enterprise customer.
1. Unpack the distro to a directory.
1. Configure the distro as described in the [user guide]({{< ref "/user-guide/camunda-bpm-run.md" >}}).
1. Start Camunda BPM Run by executing the start script (start.bat for Windows, start.sh for Linux/Mac).
1. Access the Camunda webapps (Cockpit, Tasklist, Admin) via http://localhost:8080.
1. Access the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}) via http://localhost:8080/rest (e.g. http://localhost:8080/rest/engine).