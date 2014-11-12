---

title: 'Install the camunda BPM platform Application'
category: 'BPM Platform'

---


In this section, we explain how the camunda-ibm-websphere-ear module can be installed using the WebShere Integrated Solutions Console.

1.  Navigate to the Enterprise Applications page using the navigation path **Applications** / **Application Types** / **WebSphere enterprise applications**.
2.  Click the **"Install"** Button.
3.  Select the <code>camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear</code> file from the modules folder of the camunda BPM platform for IBM WebSphere Application Server distribution. Click Next.
4.  Select the **"Fast Path"** install option.
5.  In **Step 1**, enter an application-name, eg. **"camunda-bpm-platform"**, customize other settings and click **"Next"**.
6.  Continue through **Steps 2-4**, customize to your liking and finish the installation in **Step 4** by clicking **"Finish"**.
7.  Save the configuration.
8.  (optional) [Configure location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file)
9.  Start the camunda-bpm-platform application. If this initially fails, try to restart the server. Also make sure the EAR does correctly reference the previously created 'Camunda' shared library.
    If it doesn't, make sure you have correctly created the shared library as 'Camunda' or assign the 'Camunda' shared library manually after the EAR installation.