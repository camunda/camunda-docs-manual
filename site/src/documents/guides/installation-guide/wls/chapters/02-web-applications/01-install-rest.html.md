---

title: 'Install the REST API web application'
shortTitle: 'Install the REST API'
category: 'Web Applications'

---

The camunda REST API WAR file resides under <code>webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war</code> in the WLS distribution archive.

In the following we explain how to install the WAR file using the WebLogic Server Administration Console:

1.  Open the WebLogic Server Administration Console.
2.  Navigate to the **Domain Structure / YOUR_DOMAIN / Deployments** page.
3.  Click the **Install** Button
4.  The first page of the Wizard opens. Using the File Browser, select the <code>camunda-engine-rest-VERSION-wls.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select **"Install this deployment as an application"** on the next page.
7.  Continue to the next page.
8. 	Define a context root for the REST API. We propose to use **/engine-rest** as suggested by default.
9.  Click **Finish** Button to complete the installation.

After completing the wizard, REST API should be successfully installed on the application server.
In some situations, you also have to start the web application manually from the **Domain Structure / YOUR_DOMAIN / Deployments** page.