---

title: 'Install the camunda BPM platform modules'
category: 'BPM Platform'

---


The camunda BPM platform distribution for IBM WebSphere Application Server includes one module in the modules folder:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

The camunda-ibm-websphere-ear is a Java EE application enterprise archive (EAR) providing the camunda BPM platform services. It contains an embedded rar module.
This camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the jobexecutor service to the camunda BPM platform.

The EAR must be installed to your IBM WebSphere Application Server.