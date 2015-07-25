---

title: 'Install the REST API web application'
shortTitle: 'Install the REST API'
category: 'Web Applications'

---

The Camunda REST API WAR file resides under <code>webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war</code> in the IBM WebSphere Application Server distribution archive.

In this section we explain how to install the WAR file using the IBM WebSphere enterprise application wizard provided within the WebSphere Integrated Solutions Console:

1.  Open the WebSphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3.  Click the **Install** Button
4.  The first page of the wizard opens. Using the file browser, select the <code>camunda-engine-rest-VERSION-was.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually no changes are required.
8.  Step 2. Usually no changes are required.
9.  Step 3. Usually no changes are required.
10. Step 4. Define a context root for the REST API. We propose to use **/engine-rest**
11. Step 5. Usually no changes are required.

After completing the wizard, REST API should be successfully installed on the application server. Don't forget to save your changes to the master configuration. 

The final step is to reference the shared libraries. To do so, follow these steps:

1. Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
2. Click on the name of the application (e.g., camunda-engine-rest-7_2_0-ee-was_war).
3. Click on **Shared library references**.
4. Click on the checkbox next to the application name and click on the **Reference shared libraries** button.
5. Select the shared library **Camunda**.
6. Confirm selection by clicking on **OK**.

In some situations, you have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** page.