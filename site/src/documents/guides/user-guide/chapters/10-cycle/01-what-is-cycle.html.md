---

title: 'What is Cycle?'
category: 'Cycle'

---

<div class="alert alert-warning">
  <p><strong>Note</strong></p>
  <p>With Camunda BPM 7.2.0 we have migrated Camunda Cycle into a standalone project. We did this to reduce the tight coupling between Camunda Cycle and the Camunda BPM platform. This eases our development efforts for Cycle and allows others to increase participation.
  Here you can find the <a href="ref:/guides/installation-guide/camunda-cycle/">installation guide</a> for Camunda Cycle. </p>
</div> 

With Cycle you can synchronize the BPMN diagrams in your business analyst's BPMN tool with the technically executable BPMN 2.0 XML files your developers edit with their modeler (e.g. in Eclipse). Depending on your tool we can realize forward- and a reverse engineering, while you can store your BPMN 2.0 XML files in different repositories (e.g. SVN, file system or FTP servers).

<center><img src="ref:asset:/assets/img/cycle/cycle-start-page-view.png" class="img-responsive"/></center>

Although business and IT use different BPMN tools, the process models stay in sync: with camunda Cycle you can synchronize BPMN diagrams in the tool chain any time, for forward engineering as well as reverse engineering. By connecting and continuously synchronizing the process models in both environments, we keep business and IT aligned. This is what we call a full working BPM roundtrip.

The typical use cases are:

* Synchronize a BPMN 2.0 diagram with an executable diagram (Forward Engineering)
* Update the executable diagram and synchronize the changes with the origin BPMN 2.0 diagram (Reverse Engineering)
* Create executable diagrams out of the BPMN 2.0 diagram (Forward Engineering)

Cycle is a standalone application and must be downloaded separately from the camunda BPM distribution.
After the installation of cycle it is ready to use by opening http://localhost:8180/cycle. At the first start up you will be prompted to create an admin user.
If you are new to Cycle have a look at our Hands-On [Cycle Tutorial](/get-started/roundtrip-with-cycle/).
