---

title: 'Install the Camunda BPM platform modules'
weight: 60

menu:
  main:
    identifier: "installation-guide-full-websphere-install-modules"
    parent: "installation-guide-full-websphere"

---

The Camunda BPM platform distribution for IBM WebSphere Application Server includes one module in the modules folder:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

The camunda-ibm-websphere-ear is a Java EE application enterprise archive (EAR) providing the Camunda BPM platform services. It contains an embedded rar module.
This camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the jobexecutor service to the Camunda BPM platform.

The EAR must be installed to your IBM WebSphere Application Server.