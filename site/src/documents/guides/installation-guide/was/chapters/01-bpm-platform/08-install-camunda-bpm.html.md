---

title: 'Install the camunda BPM platform Application'
category: 'BPM Platform'

---


In this section, we explain how the camunda-ibm-websphere-ear module can be installed using the WebShere Integrated Solutions Console.

1.  Navigate to the Enterprise Applications page using the navigation path **Applications** / **Application Types** / **WebSphere enterprise applications**.
2.  Click the **"Install"** Button.
3.  Select the <code>camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear</code> file from the modules folder of the camunda BPM platform for IBM WebShpere Application Server distribution. Click Next.
4.  Select the **"Detailed"** Path.
5.  In **Step 1**
    Under application-name, type **"camunda-bpm-platform"**. This setting is **mandatory**.

    <div class="alert alert-info">
      <p><strong>Manadatory Application Name</strong></p>
      The camunda BPM platform application <strong>MUST</strong> be installed with the application name <strong>"camunda-bpm-platform"</strong>.
    </div>
6.  Perform **Steps 2-4** according to your requirements.
7.  In **Step 5**,
    *   Under **"Listener Bindings"** select the radio button **"Activation Specification"**.
    *   Under **"Target Resource JNDI Name"**, provide the configured activation name for the jobexecutor (see Section "Defining an Activation Specification" above). The default is "eis/PlatformJobExecutorActivation".
    *   Destination and authentication must be left blank.

    <a href="ref:asset:/guides/installation-guide/was/assets/img/activation.png" target="_blank">
      <img class="tile" src="ref:asset:/guides/installation-guide/was/assets/img/activation.png" alt=""/>
    </a>
8.  In **Step 6-8**,
    *   Do not override the default JNDI Names
9.  In **Step 9**,
    *   Set the Target Resource JNDI Name to the name of the managed connection factory provided for the jobexecutor (see Section "Defining a Managed Connection Factory" above). The default setting is **"eis/JcaExecutorServiceConnectionFactory"**.
    
    <a href="ref:asset:/guides/installation-guide/was/assets/img/connection-factory.png" target="_blank">
      <img class="tile" src="ref:asset:/guides/installation-guide/was/assets/img/connection-factory.png" alt=""/>
    </a>
    
10. In **Steps 10-12**, go with the default settings.
11. Click **"Finish"**.
12. Save the configuration.
13. (optional) [Configure location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file)
14. Start the camunda-bpm-platform application. If this fails initially, try to restart the server. The resource adapter references are not always resolved properly. It will be fine after a restart.