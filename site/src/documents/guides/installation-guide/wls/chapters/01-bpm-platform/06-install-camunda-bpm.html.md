---

title: 'Install the camunda BPM platform Application'
category: 'BPM Platform'

---


In this section, we explain how the camunda-oracle-weblogic-ear module can be installed using the WebLogic Server Administration Console.

The installation process is composed of two steps:

1. Install the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> EAR file.
2. Configure the deployment order of <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> EAR file.


## Installing the EAR file

First, the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> RAR file must be installed:

1. Open the WebLogic Server Administration Console.
2. Navigate to the **"Domain structure / YOUR_DOMAIN / Deployments"** page.
3. Select the **"Install"** button.
4. Using the File Browser, select the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> from the modules folder of the camunda BPM platform for Oracle Weblogic Application Server distribution and continue to the **"Next"** page.
5. Select **"Install this deployment as an application"** and continue to the **"Next"** page.
6. Fill in <code>camunda-bpm-platform</code> as name for the enterprise application deployment. This setting is **mandatory** and MUST NOT be changed.
    
  <a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-name.png" target="_blank">
    <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-name.png" alt=""/>
  </a>

7. Continue to the **"Next"** page.
8. Select **"Yes, take me to the deployment's configuration screen"** and click the **"Finish"** button to complete the installation.
9. (optional) [Configure location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file)

## Configure the deployment order

1. In the deployment's configuration screen, change the value of the **"Deployment Order"** from **"100"** to **"90"**, so the Enterprise Application starts after the Resource Adapter but before the process application deployments.
2. Click **"Save"** to persist the change.
3. Start the camunda-bpm-platform application if it is not already. If this fails initially, try to restart the server. The resource adapter references are not always resolved properly. It will be fine after a restart.



Example: Deployment order set to **"90"**.

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-deploymentorder.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-deploymentorder.png" alt=""/>
</a>  



Completed installation of camunda bpm platform EAR and RAR in WebLogic Server

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-finished.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-finished.png" alt=""/>
</a>  