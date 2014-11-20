---

title: 'Install the camunda BPM platform Application'
category: 'BPM Platform'

---


In this section, we explain how the camunda-oracle-weblogic-ear module can be installed using the WebLogic Server Administration Console.

The installation process is composed of two steps:

1. Install the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> EAR file.
2. Configure the deployment order of <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> EAR file.


## Installing the EAR file

First the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> RAR file must be installed:

1. Open the WebLogic Server Administration Console.
2. Navigate to the **"Domain structure / YOUR_DOMAIN / Deployments"** page.
3. Select the **"Install"** button.
4. Using the File Browser, select the <code>camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear</code> from the modules folder of the camunda BPM platform for Oracle Weblogic Application Server distribution and continue to the **"Next"** page.
5. Select **"Install this deployment as an application"** and continue to the **"Next"** page.
6. Fill in <code>camunda-bpm-platform</code> as name for the enterprise application deployment. This setting is **mandatory** and **MUST NOT** be changed.
    
  <a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-name.png" target="_blank">
    <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-name.png" alt=""/>
  </a>

7. Continue to the **"Next"** page.
8. Select **"Yes, take me to the deployment's configuration screen"** and click the **"Finish"** button to complete the installation.
9. (optional) [Configure location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file)


## Configure the deployment order

1. In the deployment's configuration screen, change the value of the **"Deployment Order"** from **"100"** to **"90"**, so the Enterprise Application starts before process application deployments.
2. Click **"Save"** to persist the change.

Example: Deployment order set to **"90"**.

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-deploymentorder.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-ear-deploymentorder.png" alt=""/>
</a>


## Configure the JCA Work Manager

1. In the EAR's deployment configuration screen under modules, select the `camunda-oracle-weblogic-rar.rar` entry. Click on the **"Configuration"** tab on the following page.
2. Now select the **"Workload"** tab.
3. Here, you see a preconfigured JCA Work Manager named **"wm/camunda-bpm-workmanager"**. Click on it.
4. For **"Minimum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-min-threads"** option. Per default, we configure 2 threads as a minimum. **At least 2 threads are required**, but you can increase them when you think you do a lot of asynchronous work.
5. For **"Maximum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-max-threads"** option. Per default, we configure 5 threads, but you can increase them when you think you do a lot of asynchronous work.
6. For **"Stuck Thread Action"**, select **"Ignore stuck threads"**, because we have a long running daemon thread which acquires the jobs to execute. This forces WebLogic to skip the Stuck Thread Warning which would otherwise appear in the server log every ten minutes.
7. For **"Capacity Constraint"**, select the preconfigured **"camunda-bpm-workmanager-capacity"** option. Per default, we configure a queue size of 10 for the workmanager, but you can always tune it accordingly to your needs.
8. Click **"Save"** to persist your changes.


<p>Now you can start the camunda-bpm-platform application if it is not already running. If this initially fails, try to restart the server.</p>


Example: Finished configuration of the JCA Work Manager used by the resource adapter.

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-work-manager.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-work-manager.png" alt=""/>
</a>
