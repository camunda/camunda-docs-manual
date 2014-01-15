---

title: 'Install camunda Cockpit and Tasklist'
category: 'Web Applications'

---


The web application archive that contains camunda Cockpit and Tasklist resides under <code>webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war</code> in the WLS distribution archive.

In the following we explain how to install the WAR file using the WebLogic Server Administration Console:

1.  Open the WebLogic Server Administration Console.
2.  Navigate to the **Domain Structure / YOUR_DOMAIN / Deployments** page.
3.  Click the **Install** Button
4.  The first page of the Wizard opens. Using the File Browser, select the <code>camunda-webapp-ee-wls-$PLATFORM_VERSION.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select **"Install this deployment as an application"** on the next page.
7.  Continue to the next page.
8. 	Define a context root for the applications. We propose to use **/camunda** as suggested by default.
9.  Click **Finish** Button to complete the installation.

After completing the wizard, REST API should be successfully installed on the application server.
In some situations, you also have to start the web application manually from the **Domain Structure / YOUR_DOMAIN / Deployments** page.

You can check whether everything went well by accessing Cockpit, Tasklist and Admin via `/camunda/app/cockpit`, `/camunda/app/tasklist` and `/camunda/app/admin` or under the context path you configured.