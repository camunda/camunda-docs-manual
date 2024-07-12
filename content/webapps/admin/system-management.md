---

title: 'System Management'
weight: 40

menu:
  main:
    identifier: "user-guide-admin-system-management"
    parent: "user-guide-admin"

---


{{< img src="../img/admin-system-management.png" title="System Management" >}}

The System Settings menu gives you general information about the process engine. It enables users with system permissions to access certain system information, including diagnostics, metrics, and license key. Provided that you are using the Enterprise Edition of Camunda 7, you can also insert your *License Key*.

{{< note title="Accessing the System Settings menu" class="info" >}}
The System Settings menu is only usable by users which are granted with *All* permission for authorizations.
{{< /note >}}

# Diagnostics

{{< img src="../img/admin-diagnostics.png" title="Diagnostics" >}}

The **Diagnostics** menu allows you to view and copy diagnostics data about your environment or distribution of Camunda. The main purpose of the **Diagnostics** menu is to increase transparency by giving you easy access to important system diagnostics information. In the event of an issue, this should also improve problem diagnosis by enabling you to quickly understand and share the Camunda environment you are running.

# Execution Metrics

{{< img src="../img/admin-execution-metrics.png" title="Execution Metrics" >}}

The Execution Metrics menu in Admin displays an approximate number of *Flow Nodes Instances (FNI)*,
*Executed Decision Elements (EDE)*, *Process Instances (PI)* and *Decision
Instances (DI)* processed by the engine and *Task Users (TU)* that were assigned to a
user task by the selected contract start date.

The page displays the rolling last 12 months metrics in a chart and table.
Legacy metrics (FNI, EDE) are hidden by default, but can be displayed by selecting the **Display legacy metrics** checkbox.
Underneath, it displays all the available annual usage metrics.

Annual metrics together with the diagnostics data can be copied to the clipboard by clicking on
the <button class="btn btn-xs"><i class="glyphicon glyphicon-copy"></i></button> button.
The copied format consists of two parts as seen below in the example.
The top part contains the actual metrics that enterprise customers need to share with Camunda before renewal.
The second part contains the diagnostics data which provides useful information that helps Camunda to improve support but customers can opt out of sharing it.
This part has been truncated in the example.

```
21/02/2024 up to today
- PI: 1,705,434
- DI: 1,709,410
- TU: 3
- FNI: 1,722,414
- EDE: 1,716,683

{
  "installation": "bf32d0f5-43c6-4be4-b45e-de0ef1a48117",
  "product": {
    "name": "Camunda BPM Runtime",
    "version": "{{< minor-version >}}.0",
    "edition": "community",
    ...
  }
}
```

# Camunda License Key

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of Camunda 7, it is not 
  available in the community edition.
{{< /enterprise >}}

Some features of the Camunda Webapps (e.g. enterprise plugins) require a license key. To read more about the Camunda
license key, please see the [dedicated section]({{< ref "/user-guide/license-use.md" >}}) of the docs. The following 
section explains how to activate a license through the Camunda Admin Webapp UI.

Whenever you see one of the following messages, a valid license key must be entered.

{{< img src="../img/admin-license-prompt.png" title="License Prompt for Admins" >}}
{{< img src="../img/admin-license-prompt-noAdmin.png" title="License Prompt for Non-Admins" >}}

If you have administrator authorizations, insert your company's license key for Camunda 7 and view 
some License Key details such as the Company Id and the validity of the license key. The Admin system setting menu 
offers the possibility to enter additional licenses, for instance when your existing license is expiring and you want 
to enter a new license key.

If you do not have administrator authorizations, please contact your administrator so that they can enter the license.

In case you are running Camunda 7 locally, you can use this URL to enter the license key:
http://localhost:8080/camunda/app/admin/default/#/system?section=system-settings-license

{{< img src="../img/admin-license-key.png" title="License Key" >}}
