---

title: 'Install the REST API web application'
shortTitle: 'Install the REST API'
category: 'Web Applications'

---

The camunda REST API WAR file resides under `webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` in the WLS distribution archive.

In this section we explain how to install the WAR file using the WebLogic Server Administration Console:

1.  Open the WebLogic Server Administration Console.
2.  Navigate to the **Domain Structure / YOUR_DOMAIN / Deployments** page.
3.  Click the **Install** button. The first page of the wizard opens.
4.  Using the File Browser, select the `camunda-engine-rest-$PLATFORM_VERSION-wls.war` file from the distribution and upload it.
5.  Continue to the **Next** page.
6.  Select **Install this deployment as an application** and continue to the **Next** page.
7.  Adapt the optional settings to your needs and click the **Finish** button to complete the installation.

After completing the wizard, the REST API should be successfully installed on the application server.
The context root for the REST API is **/engine-rest** by default.
In some situations, you also have to start the web application manually from the **Domain Structure / YOUR_DOMAIN / Deployments** page.