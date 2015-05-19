---

title: 'Upgrade your Server'
category: 'General migration hints for Camunda BPM'

---

Depending on the scenario in which the Camunda BPM platform is deployed, you have to adjust the upgrade process.
Please note that the following procedure may differ for cluster scenarios.
As an enterprise customer, you can contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

When upgrading a shared or embedded engine, at least the following steps have to be done.

### Shared Engine

* Shut down your application server.
* Exchange Camunda BPM libraries, tools and web applications (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide](ref:/guides/installation-guide/) for your server.
* Restart your application server.

### Embedded Engine

* Upgrade the Camunda-related dependencies in your WAR / EAR artifact.
* Rebuild and redeploy it.