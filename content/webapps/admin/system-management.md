---

title: 'System Management'
weight: 40

menu:
  main:
    identifier: "user-guide-admin-system-management"
    parent: "user-guide-admin"

---


{{< img src="../img/admin-system-management.png" title="System Management" >}}

The System Settings menu gives you some general information about the process engine and allows you to access the *Execution Metrics* and, provided that you are using the Enterprise Edition of the Camunda BPM platform, you can insert your *License Key*

{{< note title="Accessing the System Settings menu" class="info" >}}
The System Settings menu is only usable by users which are granted with *All* permission for authorizations.
{{< /note >}}

# Execution Metrics

{{< img src="../img/admin-execution-metrics.png" title="Execution Metrics" >}}

The Execution Metrics menu in Admin displays an approximate number of *Flow Nodes Instances (FNI)* and *Executed Decision Elements (EDE)* that have been processed by the engine within a specified time range.


# Camunda License Key

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

Some features (enterprise plugins) require a license key. The license will be provided as a string by the Camunda support team. The license mechanism has no impact on the engine or other runtime components. The following section explains how to activate a license.

Whenever you see one of the following messages, a valid license key must be entered.

{{< img src="../img/admin-license-prompt.png" title="License Prompt for Admins" >}}
{{< img src="../img/admin-license-prompt-noAdmin.png" title="License Prompt for Non-Admins" >}}

If you have administrator authorizations, insert your company's license key for the Camunda BPM platform and view some License Key details such as the Company Id and the validity of the license key. The Admin system setting menu offers the possibility to enter additional licenses, for instance when your existing license is expiring and you want to enter a new license key.

If you do not have administrator authorizations, please contact your administrator so that they can enter the license.

In case you are running Camunda BPM locally, you can use this URL to enter the license key:
http://localhost:8080/camunda/app/admin/default/#/system?section=system-settings-license

{{< img src="../img/admin-license-key.png" title="License Key" >}}

The license key can be set via the Java API by calling:
```
managementService.setLicenseKey(String licenseKey);
```
The managementService also offers methods to get and delete the license key from the database.
The license key is stored in the `ACT_GE_BYTEARRAY` table. A reference to the license entry can be found in the `ACT_GE_PROPERTY` table (`camunda-license-key-id`).

Another possibility is to put the file with the license key in path: `${user.home}/.camunda/license.txt`. It will be automatically loaded to the database table unless it already contains some license key.

In a clustered scenario, where multiple engines on multiple nodes access a single database, the license only needs to be activated once. When activated, a license is valid until the expiration date or until you have deleted your database. The license key is valid for an unlimited amount of engines.

In a multi tenancy scenario, the license check will be performed for each engine with an own database. Thus, you will be prompted to enter the license key separately for each engine.
