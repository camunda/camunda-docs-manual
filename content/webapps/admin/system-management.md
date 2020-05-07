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

The Execution Metrics menu in Admin displays an approximate number of *Root Process Instances (RPI)*,
*Flow Nodes Instances (FNI)*, *Executed Decision Instances (EDI)* and *Executed Decision Elements (EDE)* that have been
processed by the engine within a specified time range.


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

## License keys in camunda-spring-boot-starter
Spring Boot applications can provide license keys in two additional ways:

* provide a URL to a license file via [spring property]({{< ref "/user-guide/spring-boot-integration/configuration.md#license-file" >}})
* provide the license key in a file called `camunda-license.txt` which is on the classpath of the application

**Note:** The application must use the **`camunda-bpm-spring-boot-starter-webapp-ee`** module for these two properties to be available.
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
</dependency>
```

## License compatibility
There are two different types of licenses for Camunda BPM. While the original format is only valid for Camunda BPM, the second format can be valid for multiple Camunda products (like Camunda BPM, Cawemo or Optimize). Such unified licenses are supported from the versions listed below onwards. Since 7.12.0 all versions (including major/minor releases) support unified license keys.

<table class="table table-striped">
  <tr>
    <th>Camunda Engine version</th>
    <th>Spring Boot Starter version</th>
  </tr>
  <tr>
    <td>7.9.19+</td>
    <td>3.0.8+</td>
  </tr>
  <tr>
    <td>7.10.13+</td>
    <td>3.1.8+<br>3.2.9+</td>
  </tr>
  <tr>
    <td>7.11.7+</td>
    <td>3.3.6+</td>
  </tr>
  <tr>
    <td>7.12.x</td>
    <td>3.4.x</td>
  </tr>
  <tr>
    <td>7.13.0+</td>
    <td>7.13.0+</td>
  </tr>
</table>