---

title: 'What is Cycle?'
category: 'Cycle'

---

<div class="alert alert-warning">
  <p><strong>Note</strong></p>
  <p>We are sorry, but currently we migrate camunda Cycle into a standalone project. We do this to lessen the tight coupling between camunda Cycle and the camunda bpm platform. This will ease our development efforts for cycle and allows others to increase their participation.
  When you are looking for an installation guide please see <a href="http://docs.camunda.org/7.1/guides/installation-guide/tomcat/#web-applications-install-camunda-cycle">here</a> for the 7.1 one. Stay put for an update here, through our newsletter or our <a href="http://blog.camunda.org/">blog</a>.</p>
</div>

With Cycle you can synchronize the BPMN diagrams in your business analyst's BPMN tool with the technically executable BPMN 2.0 XML files your developers edit with their modeler (e.g. in Eclipse). Depending on your tool we can realize forward- and a reverse engineering, while you can store your BPMN 2.0 XML files in different repositories (e.g. SVN, file system or FTP servers).

<center><img src="ref:asset:/assets/img/cycle/cycle-start-page-view.png" class="img-responsive"/></center>

Although business and IT use different BPMN tools, the process models stay in sync: with camunda Cycle you can synchronize BPMN diagrams in the tool chain any time, for forward engineering as well as reverse engineering. By connecting and continuously synchronizing the process models in both environments, we keep business and IT aligned. This is what we call a full working BPM roundtrip.

The typical use cases are:

* Synchronize a BPMN 2.0 diagram with an executable diagram (Forward Engineering)
* Update the executable diagram and synchronize the changes with the origin BPMN 2.0 diagram (Reverse Engineering)
* Create executable diagrams out of the BPMN 2.0 diagram (Forward Engineering)

Cycle is a standalone application and must be downloaded separately from the camunda BPM distribution.
After the installation of cycle it is ready to use by opening http://localhost:8080/cycle. At the first start up you will be prompted to create an admin user.
If you are new to Cycle have a look at our Hands-On [Cycle Tutorial](ref:/guides/getting-started-guides/roundtrip-with-cycle/).
