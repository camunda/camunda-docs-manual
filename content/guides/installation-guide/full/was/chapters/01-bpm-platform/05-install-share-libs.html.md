---

title: 'Install the Camunda BPM platform shared libraries'
shortTitle: 'Install shared libraries'
category: 'BPM Platform'

---


The shared libraries include the Camunda engine and some utility JARs. The shared libraries must be visible to both the Camunda BPM platform as well as all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- joda-time-XX.jar
           |-- ...
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

Copy the shared libraries into a folder, where it can be referenced from your IBM WebSphere Server installation.
Next, go to **Environment / Shared libraries**, choose the correct scope in which your EAR and applications will run and define a **new** shared library.
Name it ```Camunda```. This name is **mandatory**, except when you modify the ```deployment.xml``` which is located inside the Camunda BPM platform EAR accordingly.
Enter as classpath the path where you have copied the Camunda shared libraries, e.g., ```/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/camunda-shared-libs```. Enable
the **Use an isolated class loader for this shared library** checkbox. Restart the IBM WebSphere Server after this operation.
