---

title: 'Upgrade your Server'
category: 'Patch Level Upgrade'

---

Depending on the scenario in which the camunda BPM platform is deployed you have to adjust the upgrade process. Please note that the following procedure my differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down your server
* Exchange camunda bpm libraries, tools and webapps (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide](ref:/guides/installation-guide/) for your server.
* Restart your server