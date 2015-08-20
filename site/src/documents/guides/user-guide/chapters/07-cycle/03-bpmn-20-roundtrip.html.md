---

title: 'BPMN 2.0 Roundtrip'
category: 'Cycle'

---

When we are talking about Roundtrip we are talking about the synchronization of BPMN 2.0 diagrams between the business perspective and the technical perspective. This synchronization is based on the standard BPMN 2.0 XML format. As on the technical site only executable processes matter Cycle provides the functionality to extract these processes out of models from the business side where manual processes (not executable) can be modeled as well. This extraction mechanism is what we call [Pool Extraction](ref:#cycle-bpmn-20-roundtrip-pool-extraction). With Cycle, you can do this synchronization in both directions. 

## Step 1: Setup the Connector

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-signavio-connector.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Setup a suitable connector for your repository as described in the section <a href="ref:#cycle-connector-configuration">Connector Configuration</a>.
      In this walkthrough we use a Signavio Connector with user provided credentials.</p>
    <p> Hit <code>Test</code> to check if Cycle can access your Signavio account.</p>
  </div>
</div>

## Step 2: Add process model from the repository

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/signavio-choose-model.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
     <p>In the left box of your roundtrip, click on <code>Add Process Model</code>, pick a name for your modeling tool and choose the Signavio connector from the connector's dropdown. Cycle now connects with Signavio, so after a short time you can navigate through the chosen repository to select your process model.</p>
     <p>After you hit <code>Add</code>, Cycle will save a link to the process model you selected, and offer you a preview image in the left box of your roundtrip. It also says that the process model has not yet been synchronized, which is true. Changes on the diagram in Signavio will be updated automatically by Cycle.</p>
  </div>
</div>

## Step 3: Create BPMN file for execution

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-create-executable.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Hit <code>Create</code> and choose the location you want the BPMN 2.0 XML file to be stored to. In our example, we want to store it on our local file system, in a workspace we use with our Eclipse IDE. After hitting <code>Create</code>, Cycle will connect to Signavio, request the BPMN 2.0 XML and save it to the location you specified. Please note that no diagram picture will be displayed until an image file of the diagram is stored in the folder. Cycle indicates that both models are in "in synch" now.</p>
    <p><b>Heads up!</b> If your process model is a collaboration diagram, Cycle will do a <a href="ref:#cycle-bpmn-20-roundtrip-pool-extraction">Pool Extraction</a> which means that only pools will be regarded that are executable.</p>
  </div>
</div>

## Step 4: Edit BPMN File

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/signavio-created.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Now Cycle shows you that your roundtrip consists of the BPMN diagram stored in Signavio (left side) and the BPMN 2.0 File stored in your file repository (right side). You can also see that the two process models are currently in synch, and the date and time since the last synch has been made.</p>
    <p>You can now either check out the BPMN 2.0 - XML from your subversion or open it directly in your local drive. In both cases, you can now edit inside your Eclipse IDE it using <a href="http://www.camunda.org/design/modeler.html">camunda Modeler</a>.</p>      
  </div>
</div>

## Step 5: Reverse Engineering

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-reverse.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>After you have worked on the executable process model the models are out of synch, indicated by the red label "change since last sync" on the site where the change happened.</p>
    <p>You can now hit the sync button in the corresponding direction (in our case from right to left). Afterwards you will be prompt to confirm the synchronization with the possibility to add a commit message.</p>
    <p>Now both models are synchronized again, indicated by green labels "in sync" on both sites.</p> 
  </div>
</div>

<div class="alert alert-warning">
  <strong>Please note!</strong> The BPMN 2.0 modeling tool must support the complete BPMN 2.0 standard and must be able to export/serialize process diagrams in valid BPMN 2.0 XML files. For more detailed information about requirements and suitable tools check the section &quot;Roundtrip with other Tools&quot; in our <a href="http://camunda.org/bpmn/cycle-tutorial.html">Cycle Tutorial</a>.
</div>

## Pool Extraction

During a roundtrip from business perspective to a technical process diagram Cycle checks which pools are flagged as "executable". Only those pools will actually be synchronized for the executable process model, so you don't have to bother with huge diagrams describing manual flows. We call this feature "Pool Extraction". 
When you synchronize the executable diagram again with the origin diagram the "non-executable" pools will be merged back into the diagram. No information gets lost. 

The following example shows relevant xml tag:

```
<process id="sid-8E90631B-169F-4CD8-9C6B-1F31121D0702" name="MyPool" isExecutable="true">
```

## Engine Attributes

An executable process model usually contains engine specific attributes in the BPMN 2.0 XML. So we have to make sure, that these attributes are not lost during a roundtrip with an other tool. The BPMN 2.0 Standard explicitly defines an extension mechanism for these attributes in the XML. That means that a proper BPMN 2.0 import and export functionality must keep the engine attributes, even if they are added as an engine extension. 

The camunda BPM Process Engine uses multitude attributes for configuration purposes which can be set up in the <a href="http://www.camunda.org/design/modeler.html">camunda Modeler</a>. Cycle retains these attributes during the roundtrip. Here is an example:

The xml export from Signavio modeler contains no engine attributes:

```xml
<serviceTask completionQuantity="1" id="sid-01234"
                   implementation="webService"
                   isForCompensation="false"
                   name="MyService"
                   startQuantity="1"/>
```

 After update with camunda modeler class and failedJobRetryTimeCycle were added as camunda specific engine attributes:

```xml
<serviceTask id="sid-01234" camunda:class="java.lang.Object"
             camunda:async="true"
             name="MyService" 
             implementation="webService">
  <extensionElements>
    <camunda:failedJobRetryTimeCycle>R3/PT10M</camunda:failedJobRetryTimeCycle>
  </extensionElements>
  <incoming>sid-3DED1BA0-77FC-4768-AA3E-0B60A81850EA</incoming>
  <outgoing>sid-E6D3AB73-386C-4260-82B9-CB740B82001F</outgoing>
</serviceTask>
```             

After synchronization back to Signavio the original Signavio-information like completionQuantity, isForCompensation and startQuantity were merged back:

```xml
<serviceTask camunda:async="true" camunda:class="java.lang.Object"
            completionQuantity="1" 
            id="sid-01234" 
            isForCompensation="false" 
            name="MyService" 
            startQuantity="1">
   <extensionElements>
      <camunda:failedJobRetryTimeCycle xmlns:camunda="http://activiti.org/bpmn">R3/PT10M</camunda:failedJobRetryTimeCycle>
   </extensionElements>
   <incoming>sid-3DED1BA0-77FC-4768-AA3E-0B60A81850EA</incoming>
   <outgoing>sid-E6D3AB73-386C-4260-82B9-CB740B82001F</outgoing>
</serviceTask>
```
