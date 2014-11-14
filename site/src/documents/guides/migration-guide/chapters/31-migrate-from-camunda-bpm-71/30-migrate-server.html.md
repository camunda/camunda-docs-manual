---

title: 'Migrate the Server'
category: 'Migrate from camunda bpm 7.1 to 7.2'

---

## IBM WebSphere Application Server 8.x

### Upgrade the IBM WebSphere Application Server

camunda BPM 7.2 ships a new installation approach for the camunda BPM platform. See [installing camunda BPM platform on IBM WebSphere Application Server](ref:/guides/installation-guide/was/).
The recommended upgrade steps are:

* Stop all process applications.
* Stop and delete the 7.1 camunda BPM platform EAR, RAR and webapps.
* Delete the J2E connection factory and activation specification created for camunda BPM 7.1.
* Stop the server.
* Delete all camunda BPM related libraries from the `$WAS_HOME/lib/ext` directory. `$WAS_HOME` is usually located at `/opt/IBM/WebSphere/AppServer`.
* Create a new directory into which you copy the new camunda BPM 7.2 shared libraries. (Will be referenced by a Shared library we define in WebSphere later)
* JDBC Drivers, DataSource and WorkManager settings stay the same.
* Start the server.
* Create a shared library like described [here](ref:/guides/installation-guide/was/#bpm-platform-install-the-camunda-bpm-platform-shared-libraries). Name it 'Camunda'.
* Install the camunda BPM 7.2 platform EAR. The RAR is now embedded into the EAR, so you do not have to install it separately. During the installation, the EAR will try to reference the previously
created 'Camunda' shared library.
* Install the camunda BPM 7.2 web applications (camunda webapp and engine-rest). Associate the installed web applications with the 'Camunda' shared library. Otherwise there will be missing resources during runtime. Start the web applications afterwards.
* For each previously deployed process application: associate the 'Camunda' shared library with them. Otherwise they will fail to start because required resources are missing.

