---

title: 'Download'
weight: 10

menu:
  main:
    identifier: "user-guide-introduction-downloading-camunda"
    parent: "user-guide-introduction"

---


# Prerequisites

Before downloading Camunda, make sure you have a JRE (Java Runtime Environment), or better, a JDK
(Java Development Kit) installed. We recommend using Java 8 unless your container/application
server does not support Java 8 (like JBoss Application Server 7).

[Download JDK 8][get-jdk]


# Download the Runtime

Camunda is a flexible framework which can be used in different contexts. See [Architecture Overview]
({{< relref "introduction/architecture.md" >}}) for more details. Based on how you want
to use Camunda, you can choose a different distribution.


## Community vs. Enterprise Edition

Camunda provides separate runtime downloads for community users and enterprise subscription
customers:

* [Community download page][community-download-page]
* [Enterprise download page][enterprise-download-page]

It is also possible to run Camunda BPM with [Docker][run-with-docker].


## Full Distribution

Download the full distribution if you want to use a [shared process engine][shared-engine] or if you
want to get to know Camunda quickly, without any additional setup or installation steps required.

The full distribution bundles

* Process Engine configured as [shared process engine][shared-engine],
* Runtime Web Applications (Tasklist, Cockpit, Admin),
* Rest Api,
* Container / Application Server itself.

{{< note title="Server/Container" class="info" >}}
  If you download the full distribution for an open source application
  server/container, the container itself is included. For example, if you download the tomcat
  distribution, tomcat itself is included and the Camunda binaries (process engine and
  webapplications) are pre-installed into the container. This is not true for the the Oracle WebLogic
  and IBM WebSphere downloads. These downloads do not include the application servers themselves.
{{< /note >}}

See the [Installation Guide][installation-guide-full] for additional details.


## Standalone Web Application Distribution

Download the standalone web application distribution if you want to use Cockpit, Tasklist, Admin
applications as a **self-contained WAR file** with an [embedded process engine][embedded-engine].

The standalone web application distribution bundles

* Process engine configured as [embedded process engine][embedded-engine],
* Runtime Web Applications (Tasklist, Cockpit, Admin),
* Rest Api,

The standalone web application can be deployed to any of the supported application servers.

The process engine configuration is based on the Spring Framework. If you want to change the
database configuration, edit the `WEB_INF/applicationContext.xml` file inside the WAR file.

See the [Installation Guide][installation-guide-standalone] for additional details.


# Download Camunda Modeler

Camunda Modeler is a modeling Tool for BPMN 2.0 and DMN 1.1. Camunda Modeler can be downloaded
from the [community download page][community-download-page].


# Download Camunda Cycle

Camunda Cycle is a tool for BPMN 2.0 interchange and Roundtrip. Camunda Cycle can be downloaded from
the [community download page][community-download-page].


[get-jdk]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[community-download-page]: https://camunda.org/release/camunda-bpm/
[enterprise-download-page]: /enterprise/download
[shared-engine]: {{< relref "introduction/architecture.md#shared-container-managed-process-engine" >}}
[embedded-engine]: {{< relref "introduction/architecture.md#embedded-process-engine" >}}
[installation-guide-standalone]: {{< relref "installation/standalone-webapplication.md" >}}
[installation-guide-full]: {{< relref "installation/index.md" >}}
[run-with-docker]: {{< relref "installation/docker.md" >}}
