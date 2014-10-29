---

title: 'Install the camunda BPM platform jobexecutor resource adapter'
shortTitle: 'Install the jobexecutor resource adapter'
category: 'BPM Platform'

---


In this section, we explain how the camunda-oracle-weblogic-rar module can be installed using the WebLogic Server Administration Console.

The installation process is composed of three steps:

1. Install the <code>camunda-oracle-weblogic-rar-$PLATFORM_VERSION.rar</code> RAR file.
2. Configure the deployment order.
3. Configure the RAR-scoped JCA Work Manager to your needs.


## Installing the RAR file

First, the <code>camunda-oracle-weblogic-rar-$PLATFORM_VERSION.rar</code> RAR file must be installed:

1. Open the WebLogic Server Administration Console.
2. Navigate to the **"Domain structure / YOUR_DOMAIN / Deployments"** page.
3. Select the **"Install"** button.
4. Using the File Browser, select the <code>camunda-oracle-weblogic-rar-$PLATFORM_VERSION.rar</code> from the modules folder of the camunda BPM platform for Oracle Weblogic Application Server distribution and continue to the **"Next"** page.
5. Select **"Install this deployment as an application"** and continue to the **"Next"** page.
6. Fill in a name for the resource adapter deployment, we propose <code>camunda-oracle-weblogic-rar</code>.
7. Continue to the **"Next"** page.
8. Select **"Yes, take me to the deployment's configuration screen"** and click the **"Finish"** button to complete the installation.


## Configure the deployment order

1. In the deployment's configuration screen, change the value of the **"Deployment Order"** from **"100"** to **"80"**, so the Resource Adapter starts before the usual deployments.
2. Click **"Save"** to persist the change.  


Example: Deployment order set to **"80"**.

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-rar-deploymentorder.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-rar-deploymentorder.png" alt=""/>
</a>  


## Configure the JCA Work Manager

1. In the deployment's configuration screen, select the **"Configuration"** tab.
2. Now select the newly available **"Workload"** tab.
3. Here, you should see a preconfigured JCA Work Manager named **"wm/camunda-bpm-workmanager"**. Click on it.
4. For **"Minimum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-min-threads"** option. Per default, we configure 2 threads as a minimum. **At least 2 threads are required**, but you can increase them when you think you do a lot of asynchronous work.
5. For **"Maximum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-max-threads"** option. Per default, we configure 5 threads, but you can increase them when you think you do a lot of asynchronous work.
6. For **"Stuck Thread Action"**, select **"Ignore stuck threads"**, because we have a long running daemon thread which acquires the jobs to execute. This forces WebLogic to skip the Stuck Thread Warning which would otherwise appear in the server log every ten minutes.
7. For **"Capacity Constraint"**, select the preconfigured **"camunda-bpm-workmanager-capacity"** option. Per default, we configure a queue size of 10 for the workmanager, but you can always tune it accordingly to your needs.
8. Click **"Save"** to persist your changes.  


Workload tab of camunda-oracle-weblogic-rar deployment:

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-workload.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-workload.png" alt=""/>
</a>  



Finished configuration of the JCA Work Manager used by the resource adapter.

<a href="ref:asset:/guides/installation-guide/wls/assets/img/configuration-work-manager.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/wls/assets/img/configuration-work-manager.png" alt=""/>
</a>  


This completes the installation of the resource adapter.