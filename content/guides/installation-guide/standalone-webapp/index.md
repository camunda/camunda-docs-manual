---

title: "Camunda Webapp Standalone Installation Guide"
weight: 20

menu:
  main:
    identifier: "installation-guide-standalone"
    parent: "installation-guide"

---


This document will guide you through the installation and configuration of the camunda standalone web application.
The camunda web application combines [cockpit][] and [tasklist][]. The web application is self-contained and includes
an [embedded process engine][], which is configured inside the application. The process engine is configured using the
Spring Framework and will automatically start when the application is deployed. The process engine must be configured
to connect to a database (see the [database configuration][] section). By default the process engine will use a built-in
identity service, which can be replaced with LDAP (see the [LDAP configuration][] section).

<div class="alert alert-danger">
  Since the camunda standalone web application uses an <a href="ref:/guides/user-guide/#introduction-architecture-overview-embedded-process-engine">embedded process engine</a>
  it must not be installed to an application server from a camunda distribution download. Application servers contained in camunda distributions already provide a
  <a href="ref:/guides/user-guide/#introduction-architecture-overview-shared-container-managed-process-engine">shared process engine</a>.
</div>


[cockpit]: ref:/guides/user-guide/#cockpit
[tasklist]: ref:/guides/user-guide/#tasklist
[embedded process engine]: ref:/guides/user-guide/#introduction-architecture-overview-embedded-process-engine
[database configuration]: ref:/guides/installation-guide/standalone/#configuration-database-configuration
[LDAP configuration]: ref:/guides/installation-guide/standalone/#configuration-ldap-configuration