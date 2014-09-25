---

title: 'Install camunda Cockpit and Tasklist'
category: 'Web Applications'

---


The web application archive that contains camunda Cockpit and Tasklist resides under <code>webapps/camunda-was-$PLATFORM_VERSION.war</code> in the WAS distribution archive.

In this section we explain how to install the WAR file using the Websphere enterprise application Wizard provided by the Websphere Integrated Solutions Console:

1.  Open the Websphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3.  Click the **Install** Button
4.  The first page of the Wizard opens. Using the File Browser, select the <code>camunda-was-VERSION.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually no changes are required.
8.  Step 2. Usually no changes are required.
9.  Step 3. Usually no changes are required.
10. Step 4. Define a context root for the applications. We propose to use **/camunda**
11. Step 5. Usually no changes are required.

After completing the wizard, the applications should be successfully installed on the application server. Don't forget to save your changes to the master configuration.
In some situations, you also have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** page.

You can check if everything went well by accessing Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.