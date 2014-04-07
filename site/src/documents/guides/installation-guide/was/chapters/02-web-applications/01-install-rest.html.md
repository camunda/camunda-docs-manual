---

title: 'Install the REST API web application'
shortTitle: 'Install the REST API'
category: 'Web Applications'

---

The camunda REST API WAR file resides under <code>webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war</code> in the WAS distribution archive.

In the following we explain how to install the WAR file using the WebSphere enterprise application Wizard provided inside the WebSphere Integrated Solutions Console:

1.  Open the WebSphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere** enterprise applications Page.
3.  Click the **Install** Button
4.  The first page of the Wizard opens. Using the File Browser, select the <code>camunda-engine-rest-VERSION-was.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually, no changes are required.
8.  Step 2. Usually, no changes are required.
9.  Step 3. Usually, no changes are required.
10. Step 4. Define a context root for the REST API. We propose to use **/engine-rest**
11. Step 5. Usually, no changes are required.

After completing the wizard, REST API should be successfully installed on the application server. Don't forget to save your changes to the master configuration.
In some situations, you also have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** Page.