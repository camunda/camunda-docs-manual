---

title: 'Migrate your Process Application'
category: 'Migrate from camunda bpm 7.1 to 7.2'

---

## Process Applications on IBM WebSphere Application Server

camunda BPM 7.2 ships a new installation approach for the camunda BPM platform. See [installing camunda BPM platform on IBM WebSphere Application Server](ref:/guides/installation-guide/was/).
This affects the process applications as well, because the camunda BPM libraries which are available with 7.1 on the classpath are gone.
They are now available through a shared library the server administrator has to create during the installation of camunda BPM 7.2.

The recommended upgrade steps for the process applications are:

* Stop all process applications.
* (optional) Create a shared library like described [here](ref:/guides/installation-guide/was/#bpm-platform-install-the-camunda-bpm-platform-shared-libraries). Name it 'Camunda'. Delete all camunda BPM 7.1 related libraries from the `$WAS_HOME/lib/ext` directory. `$WAS_HOME` is usually located at `/opt/IBM/WebSphere/AppServer`.
Create a new directory into which you copy the new camunda BPM 7.2 shared libraries. Restart the server afterwards.
* For each previously deployed process application: associate the 'Camunda' shared library with them. Otherwise they will fail to start because required resources are missing.
* Start the process applications.
