---

title: 'Install the camunda BPM platform jobexecutor resource adapter'
shortTitle: 'Install the jobexecutor resource adapter'
category: 'BPM Platform'

---


In this section, we explain how the camunda-ibm-websphere-rar module can be installed using the WebShere Integrated Solutions Console.

<div class="alert alert-info">
We assume all installation of the camunda-ibm-websphere-rar is done in the "Node" scope.
</div>

The installation process is composed of three steps:

1. Install and configure the <code>camunda-ibm-websphere-rar-$PLATFORM_VERSION.rar</code> RAR file.
2. Define a Managed Connection Factory for accessing the jobexecutor.
3. Define an Activation Policy for JobHandler MDBs.


## Installing and configuring the RAR file

First, the <code>camunda-ibm-websphere-rar-$PLATFORM_VERSION.rar</code> RAR file must be installed:

1. Navigate to the **Resource Adapters** page located under **Resources** / **Resource Adapters** / **Resource Adapters**.
2. Select as Scope **"Node"**.
3. Select the **Install RAR** button.
4. Select the <code>camunda-ibm-websphere-rar-$PLATFORM_VERSION.rar</code> from the modules folder of the camunda BPM platform for IBM WebShpere Application Server distribution. Click Next to go to the Properties page.
5. Fill in the properties form. As a name for the resource adapter, we propose <code>camunda-ibm-websphere-rar</code>.
6. Click on the new entry <code>camunda-ibm-websphere-rar</code>, if you choose the same name in the previous step.


## Defining a Managed Connection Factory

1. Select **"J2C Connection Factories"**.
2. Select **"New"**
3. Fill in the **"General Properties"** Form.
  * As the Name property, we propose **"camunda BPM platform jobexecutor CF"**.
  * As a JNDI Name we propose **"eis/JcaExecutorServiceConnectionFactory"**
  * No authentication is necessary.


## Defining an Activation Specification

1. Select **"J2C activation specifications"**.
2. Select **"New"**
3. Fill in the **"General Properties"** Form.
  * As the Name property, we propose **"camunda BPM platform jobexecutor SPEC"**.
  * As a JNDI Name we propose **"eis/PlatformJobExecutorActivation"**

Save your settings. This completes the installation of the resource adapter.

<div class="alert alert-info">
  There are several custom properties available for the resource adapter regarding the work manager. You can reach them by following the <strong>Custom Properties</strong> link on the configuration page of the resource adapter:

  <a href="ref:asset:/guides/installation-guide/was/assets/img/ra-properties.png" target="_blank">
    <img class="tile" src="ref:asset:/guides/installation-guide/was/assets/img/ra-properties.png" alt=""/>
  </a>
</div>