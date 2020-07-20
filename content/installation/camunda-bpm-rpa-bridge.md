---

title: "Get Started with the Camunda RPA Bridge"
weight: 50

menu:
  main:
    name: "Camunda BPM RPA Bridge"
    identifier: "installation-camunda-bpm-rpa-bridge"
    parent: "installation-guide"
    pre: ""
---

This page describes the steps to orchestrate and execute RPA bots from Camunda BPM using the Camunda BPM RPA Bridge.

{{< enterprise >}}
  Please note that the RPA bridge is only available as enterprise edition.
{{< /enterprise >}}

# Requirements

## Java
Please make sure that you have the Java Runtime Environment 8+ installed.

You can verify this by using your terminal, shell, or command line:

```sh
java -version
```
If you need to install a Java Runtime Environment, you can [find the download from Oracle here](https://www.oracle.com/java/technologies/javase-downloads.html).

## Camunda BPM
You will need a running Camunda BPM Enterprise Edition with Camunda 7.14 or later. You can find all downloadable distros [here](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/).

## Cawemo and Camunda Modeler
The easiest way to create a BPMN model that connects to an RPA bot is by using Cawemo to create a worker catalog that you can apply to your process model using the Camunda Modeler. Make sure to use Cawemo 1.4 (or later) and Camunda Modeler 4.2 (or later).

# Installation Procedure
1. Download the Camunda RPA Bridge distro from [here](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/rpa/camunda-bpm-rpa-bridge).
1. Extract the downloaded archive
1. Configure the bridge with the shipped `application.yml` file (see the [user guide]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#camunda-bpm-rpa-bridge-configuration" >}}) for a full list of configuration options).
1. Start the Bridge by executing the jar file: `java -jar camunda-bpm-rpa-bridge.jar`
1. Create and deploy a model that includes an RPA service task (see the [user guide]({{< ref "/user-guide/camunda-bpm-rpa-bridge.md#set-up-an-rpa-task" >}}) for more information)

The bridge will now forward RPA tasks to the UiPath Orchestrator and publish the result back to Camunda. You can observe the process via Cockpit.
