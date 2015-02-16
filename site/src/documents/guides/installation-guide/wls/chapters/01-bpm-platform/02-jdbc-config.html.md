---

title: 'JDBC / Datasource Configuration'
category: 'BPM Platform'

---


The camunda BPM platform uses one or multiple process engines. Use the Oracle WebLogic Server Administration Console for the configuration of the datasources.
The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) configured in the bpm-platform.xml.


## Default JNDI Name

The default JNDI name is <code>jdbc/ProcessEngine</code>

The following screenshot shows the mandatory configuration of a datasource for camunda bpm: 

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-datasource-jndi.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-datasource-jndi.png" alt=""/>
</a>

In this section we explain how to add a datasource using the Oracle WebLogic Server Administration Console:

1.  Open the Oracle WebLogic Server Administration Console.
2.  Navigate to the **"Domain Structure / YOUR_DOMAIN / Services / Data Sources"** page.
3.  Click the **"New"** Button and select **"Generic Data Source"**.
4.  On the next page, enter a name for the datasource.
5.  Enter the required JNDI Name **"jdbc/ProcessEngine"**, which is **mandatory** for the camunda BPM platform.
6.  Continue to the next pages and fill in your database credentials.
7.  When you finished the creation of the datasource, click the **"Finish"** Button to complete the installation.
8.  Check the box in front of your datasource and test if it works.

Note that you can configure multiple datasources used by different process engine instances. See the <a href="ref:/guides/user-guide/">User Guide</a> for details.