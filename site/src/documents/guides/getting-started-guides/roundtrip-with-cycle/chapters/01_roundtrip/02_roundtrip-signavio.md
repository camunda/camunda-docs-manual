---
title: 'Roundtrip with Signavio'
category: 'Roundtrip'
---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="signavio" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/signavio.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      The guys from Signavio have created a web-based BPMN modeler. If you don't know it yet, you should <a href="http://www.signavio.com/camunda">take a look at it</a>. It's extremely intuitive to use (so it's perfectly suitable for Business users) and offers several helpful collaboration features, including a sophisticated API, which is why Cycle currently works best with Signavio.
    </p>
  </div>
</div>

###Forward: From Signavio to camunda Modeler

####Step 1: Set up Signavio Connector

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="signavio-connector" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/signavio-connector.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      To access your process models stored in Signavio you must set up a Signavio Connector.
    </p>
    <p>
      In our example we use Signavio's SaaS edition and provide the credentials globally, meaning that every Cycle user will use the same credentials when using this connector. If you are behind a proxy, you could configure that here as well.
    </p>
    <p>
      Hit "Test" to check if Cycle can access your Signavio account.
    </p>
  </div>
</div>

####Step 2: Add process model from Signavio

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="signavio-choose-model" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/signavio-choose-model.png"/>
  </div>
  <div class="col-md-9">
    <p>
      In the left box of your roundtrip click on "Add process Model", pick a name and choose "Signavio SaaS" from the connectors dropdown menu. Cycle now connects with Signavio, so after a short time you can navigate through the tree to select your process model.
    </p>
    <p>
      After you hit "Add", Cycle will save a link to the process model you selected and offers you a preview image in the left box of your roundtrip. It also says that the process model has not been synchronized yet, which is true.
    </p>
  </div>
</div>

####Step 3: Create BPMN file for execution

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="cycle-create-executable" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/cycle-create-executable.png"/>
  </div>
  <div class="col-md-9">
    <p>
      Hit "Create" and choose the location you want the BPMN 2.0 XML File to be stored to. In our example, we want to store it on our local file system, in a workspace we use with our Eclipse IDE. After hitting "Create", Cycle will connect to Signavio, request the BPMN 2.0 XML and save it to the location you specified.
    </p>
    <p>
      <b>Heads up!</b> If your process model is a collaboration diagram, Cycle will check which pools are flagged as "executable". Only those pools will actually be regarded for the executable process model, so you don't have to bother with huge diagrams describing manual flows while you are only really interested in the technical flows that will be executed by the process engine. We call this feature "Pool Extraction".
    </p>
  </div>
</div>

####Step 4: Edit BPMN File

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="cycle-signavio-created" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/signavio-created.png" />
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Cycle now shows you that your roundtrip consists of the BPMN diagram stored in Signavio (left side) and the BPMN 2.0 File stored in your file repository (right side). You can also see that the two process models are currently in sync, and the date and time since the last sync has been made.
    </p>
    <p>
      You can now either check out the BPMN 2.0 - XML from your Subversion or open it directly in your local drive. In both cases, you can now edit it inside your Eclipse IDE by using the <a href="http://camunda.org/bpmn/tool/">camunda Modeler</a>.
    </p>
  </div>
</div>

###Reverse: From camunda Modeler to Signavio

####Step 1: Deciding to sync back in Signavio

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="cycle-edited" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/cycle-edited.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Assuming that you have edited the BPMN 2.0 XML with the <a href="ref:/guides/installation-guide/camunda-modeler/">camunda Modeler</a>, e.g. because you enriched it with execution attributes, added objects or removed some, you should bring those changes back into Signavio: First, your Business Analyst probably wants to know about the changes and approve them, and second, if you want to change the BPMN diagram in Signavio, you should synchronize it with the file you have changed in the camunda Modeler first, so that the next forward engineering sync from Signavio to the camunda Modeler does not overwrite all the changes you have made.
    </p>
    <p>
      When you have Edited the BPMN 2.0 XML with the camunda Modeler, Cycle will you tell you that the two process models are not in sync any more.
    </p>
  </div>
</div>

####Step 2: Sync back

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="cycle-synchback" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/cycle-synchback.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      Click on the lower "Sync"-Button to actually re-import the BPMN 2.0 XML you have edited into Signavio. As Signavio supports versioning, this will lead to a new version of the BPMN diagram that is stored there. You can also edit the commit message that Cycle will write when pushing that new version into Signavio.
    </p>
    <p>
      <b>Heads up!</b> If the BPMN diagram in Signavio is a collaboration diagram (i.e. if it consists of multiple pools), Cycle will only overwrite the executable process engine pool.
    </p>
  </div>
</div>

####Step 3: Compare Revisions

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img id="signavio-revision" data-img-thumb src="ref:asset:/assets/img/getting-started/cycle/signavio-revision.png"/>
  </div>
  <div class="col-xs-9 col-sm-9 col-md-9">
    <p>
      You can use the "compare revisions"-Feature in Signavio the check the changes.
    </p>
  </div>
</div>
