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


# Execution Metrics

{{< img src="../img/admin-execution-metrics.png" title="Execution Metrics" >}}

The Execution Metrics menu in Admin displays an approximate number of *Flow Nodes Instances (FNI)* and *Executed Decision Elements (EDE)* that have been processed by the engine within a specified time range.


# Camunda License Key

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

Some features (enterprise plugins) require a license key. The license will be provided as a string by the Camunda support team. The license mechanism has no impact on the engine or other runtime components. The following section explains how to activate a license.

Whenever you see the following message, you have to enter a valid license key.

{{< img src="../img/admin-license-prompt.png" title="License Prompt" >}}

Insert your company's license key for the Camunda BPM platform and view some License Key details such as the Company Id and the validity of the license key.  The Admin system setting menu offers the possibility to enter additional licenses, for instance when your existing license is expiring and you want to enter a new license key.

{{< img src="../img/admin-license-key.png" title="License Key" >}}

The license key is stored in the database table `ACT_GE_PROPERTY` as *camunda-license-key*. Instead of using the UI input you can also directly place your license key into your database.

In a clustered scenario, where multiple engines on multiple nodes access a single database, the license only needs to be activated once. When activated, a license is valid until the expiration date or until you have deleted your database. The license key is valid for an unlimited amount of engines.

In a multi tenancy scenario, the license check will be performed for each engine with an own database. Thus, you will be prompted to enter the license key separately for each engine.
