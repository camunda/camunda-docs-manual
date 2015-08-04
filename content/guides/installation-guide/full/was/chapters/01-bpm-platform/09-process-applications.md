---

title: 'Install Process Application'
weight: 90

menu:
  main:
    identifier: "installation-guide-full-websphere-install-process-application"
    parent: "installation-guide-full-websphere"

---

After installing a Process Application (PA) in your IBM WebSphere Application Server, which **does not** include the Camunda BPM dependencies,
you must assign the previously created **"Camunda"** shared library with the Process Application deployment.
This should only be necessary when you use the **"shared"** engine deployment approach and not the **"embedded"** process engine one (aka self-contained Process Application).