---

title: 'Install Process Applications'
category: 'BPM Platform'

---


After installing a Process Application (PA) in your IBM WebSphere Application Server, which **does not** include the Camunda BPM dependencies,
you must assign the previously created **"Camunda"** shared library with the Process Application deployment.
This should only be necessary when you use the **"shared"** engine deployment approach and not the **"embedded"** process engine one (aka self-contained Process Application).