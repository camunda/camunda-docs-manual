---

title: "Oracle WebLogic"
weight: 60

menu:
  main:
    identifier: "installation-guide-full-wls"
    parent: "installation-guide-full"

---

This document describes the installation of Camunda BPM and its components on an Oracle WebLogic Application Server.

<div class="alert alert-info">
  We support the Camunda BPM platform for Oracle WebLogic Application Server on

  <ul>
    <li>Oracle WebLogic Application Server v 12c</li>
  </ul>

  For older Versions of Oracle WebLogic, we only support the Camunda BPM engine.
</div>

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">Camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

There are different options for installing the Full Distribution:

{{< sub-menu-list >}}

## Manual Installation

If you want to add the Full Distribution to an existing Oracle WebLogic installation, you need to perform the installation steps manually.

[Install the Full Distribution for Oracle WebLogic manually]({{< relref "installation/full/wls/manual.md" >}}).

## Configuration

After you have completed either of the above installation procedures, you can perform a number of optional configuration steps.

[Configure the Full Distribution for Oracle WebLogic]({{< relref "installation/full/wls/configuration.md" >}}).