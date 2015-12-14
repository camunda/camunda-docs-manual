---

title: 'Cycle'
weight: 140

menu:
  main:
    identifier: "user-guide-cycle"
    parent: "webapps"
    pre: "Web application for integrating third party BPMN 2.0 modeling tools"
---


{{< note title="Version Information" class="warning" >}}
  With Camunda BPM 7.2.0 we have migrated Camunda Cycle into a standalone project. We did this to reduce the tight coupling between Camunda Cycle and the Camunda BPM platform. This eases our development efforts for Cycle and allows others to increase participation.
  Find more information in the [Cycle Installation Guide]({{< relref "installation/cycle.md" >}}).
{{< /note >}}

With Cycle you can synchronize the BPMN diagrams in your business analyst's BPMN tool with the technically executable BPMN 2.0 XML files your developers edit with their modeler (e.g. in Eclipse). Depending on your tool we can realize forward- and a reverse engineering, while you can store your BPMN 2.0 XML files in different repositories (e.g. SVN, file system or FTP servers).

{{< img src="img/cycle-start-page-view.png" title="Cycle Dashboard" >}}

Although business and IT use different BPMN tools, the process models stay in sync: with Camunda Cycle you can synchronize BPMN diagrams in the tool chain any time, for forward engineering as well as reverse engineering. By connecting and continuously synchronizing the process models in both environments, we keep business and IT aligned. This is what we call a full working BPM roundtrip.

The typical use cases are:

* Synchronize a BPMN 2.0 diagram with an executable diagram (Forward Engineering)
* Update the executable diagram and synchronize the changes with the origin BPMN 2.0 diagram (Reverse Engineering)
* Create executable diagrams out of the BPMN 2.0 diagram (Forward Engineering)

Cycle is a standalone application and must be downloaded separately from the Camunda BPM distribution.
After the installation of cycle it is ready to use by opening http://localhost:8180/cycle. At the first start up you will be prompted to create an admin user.
If you are new to Cycle have a look at our Hands-On [Cycle Tutorial](/get-started/cycle/).


# Connector Configuration

To connect Cycle to a suitable repository you can set up one of the following connectors:

* [Signavio Connector]({{< relref "#signavio-connector" >}})
* [Subversion Connector]({{< relref "#subversion-connector" >}})
* [File System Connector]({{< relref "#file-system-connector" >}})

Cycle also ships with a GitHub connector. In addition, more BPMN 2.0 tool vendors contribute their connectors as community extensions:

* [Cycle Ibo Prometheus Connector](https://github.com/camunda/ibo-prometheus-cycle-connector)
* [Cycle Trisotech Connector](https://github.com/camunda/trisotech-cycle-connector)

Furthermore you get information about how to configure [User Credentials]({{< relref "#user-credentials" >}}) for your connector.


## Signavio Connector

{{< img src="img/cycle-add-signavio-connector.png" title="Cycle" >}}

For directly accessing your process models stored in Signavio, you must set up a Signavio Connector. The picture to the left shows a connector setup for Signavio's SaaS edition with globally provided [user credentials]({{< relref "#user-credentials" >}}), meaning that every Cycle user connects to the repository with the same credentials. If you are behind a proxy, you could configure that here as well.

Hit *Test* to check if Cycle can find the folder you specified.


## Subversion Connector

{{< img src="img/cycle-add-svn-connector.png" title="Cycle" >}}

Use the subversion plugin to connect to a subversion repository like SVN. You must specify the URL (including subfolders, if you want to directly point to a certain folder in the subversion repository). If [user credentials]({{< relref "#user-credentials" >}}) are mandatory, you can provide them either globally or individually for each Cycle user. In the picture to the left you see a connector setup for a GitHub repository. The user credentials are provided globally.

Hit *Test* to check if Cycle can find the folder you specified.


## File System Connector

{{< img src="img/cycle-add-file-system-connector.png" title="Cycle" >}}

Use the File System Connector to use models stored on your local system. Select the File System Connector as connector plugin. The variable `${user.home}` points to the directory of your OS user account. You can also choose an absolute path like `C:\MyFolder`.

Hit *Test* to check if Cycle can find the folder you specified.


## User Credentials

{{< img src="img/cycle-globally-credentials.png" title="Cycle" >}}

If your repository requires a login you can choose between credentials provided by user or globally provided ones. Globally provided credentials can be set directly in the connector setup menu and are valid for every cycle user.

{{< img src="img/cycle-user-credentials.png" title="Cycle" >}}

To set up credentials provided by the user you need to enter the *My Profile* menu and select *add credentials* for your connector.

Hit *Test* to check if the credentials are valid.


# BPMN 2.0 Roundtrip

When we are talking about a Roundtrip we are talking about the synchronization of BPMN 2.0 diagrams between the business perspective and the technical perspective. This synchronization is based on the standard BPMN 2.0 XML format. As on the technical side only executable processes matter, Cycle provides the functionality to extract these processes out of models from the business side where manual processes (not executable) can be modeled as well. This extraction mechanism is what we call [Pool Extraction]({{< relref "#pool-extraction" >}}). With Cycle, you can do this synchronization in both directions.


## Step 1: Setup the Connector

{{< img src="img/cycle-signavio-connector.png" title="Cycle" >}}

Set up a suitable connector for your repository as described in the section [Connector Configuration]({{< relref "#connector-configuration" >}}). In this walkthrough we use a Signavio Connector with user provided credentials.

Hit *Test* to check if Cycle can access your Signavio account.


## Step 2: Add Process Model From the Repository

{{< img src="img/signavio-choose-model.png" title="Cycle" >}}

In the left box of your roundtrip, click on *Add Process Model*, pick a name for your modeling tool and choose the Signavio connector from the connector's dropdown. Cycle now connects with Signavio, so after a short time you can navigate through the chosen repository to select your process model.
After you hit *Add*, Cycle will save a link to the process model you selected and offer you a preview image in the left box of your roundtrip.It also says that the process model has not yet been synchronized, which is true. Changes on the diagram in Signavio will be updated automatically by Cycle.


## Step 3: Create BPMN file for Execution

{{< img src="img/cycle-create-executable.png" title="Cycle" >}}

Hit *Create* and choose the location you want the BPMN 2.0 XML file to be stored to. In our example, we want to store it on our local file system, in a workspace we use with our Eclipse IDE. After hitting *Create*, Cycle will connect to Signavio, request the BPMN 2.0 XML and save it to the location you specified. Please note that no diagram picture will be displayed until an image file of the diagram is stored in the folder. Cycle indicates that both models are in "in sync" now.
**Heads up!** If your process model is a collaboration diagram, Cycle will do a [Pool Extraction]({{< relref "#pool-extraction" >}}) which means that only pools that are executable will be regarded.


## Step 4: Edit BPMN File

{{< img src="img/signavio-created.png" title="Cycle" >}}

Now Cycle shows you that your roundtrip consists of the BPMN diagram stored in Signavio (left side) and the BPMN 2.0 file stored in your file repository (right side). You can also see that the two process models are currently in sync, and the date and time since the last sync has been made.
You can now either check out the BPMN 2.0 - XML from your subversion or open it directly on your local drive. In both cases, you can now edit it inside your Eclipse IDE using the [Camunda Modeler](http://camunda.org/bpmn/tool/).


## Step 5: Reverse Engineering

{{< img src="img/cycle-reverse.png" title="Cycle" >}}

After you have worked on the executable process model the models are out of sync, indicated by the red label "change since last sync" on the side where the change happened.
You can now hit the sync button in the corresponding direction (in our case from right to left). Afterwards you will be prompted to confirm the synchronization with the option to add a commit message.
Now both models are synchronized again, indicated by green labels "in sync" on both sites.

{{< note title="BPMN 2.0 Support" class="warning" >}}
  The BPMN 2.0 modeling tool must support the complete BPMN 2.0 standard and must be able to export/serialize process diagrams in valid BPMN 2.0 XML files. For more detailed information about requirements and suitable tools check the section "roundtrip with other tools" in our [Cycle Tutorial](/get-started/cycle.md/).
{{< /note >}}


## Pool Extraction

During a roundtrip from a business perspective to a technical process diagram Cycle checks which pools are flagged as "executable". Only those pools will actually be synchronized for the executable process model, so you don't have to bother with huge diagrams describing manual flows. We call this feature "Pool Extraction".
When you synchronize the executable diagram again with the origin diagram the "non-executable" pools will be merged back into the diagram. No information gets lost.

The following example shows a relevant xml tag:

```xml
<process id="sid-8E90631B-169F-4CD8-9C6B-1F31121D0702" name="MyPool" isExecutable="true">
```

## Engine Attributes

An executable process model usually contains engine specific attributes in the BPMN 2.0 XML. So we have to make sure that these attributes are not lost during a roundtrip with an other tool. The BPMN 2.0 Standard explicitly defines an extension mechanism for these attributes in the XML. That means that a proper BPMN 2.0 import and export functionality must maintain the engine attributes, even if they are added as an engine extension.

The Camunda BPM Process Engine uses multitude attributes for configuration purposes which can be set up in the [Camunda Modeler](http://camunda.org/bpmn/tool/). Cycle retains these attributes during the roundtrip. Here is an example:

The xml export from Signavio modeler contains no engine attributes:

```xml
<serviceTask completionQuantity="1" id="sid-01234"
                   implementation="webService"
                   isForCompensation="false"
                   name="MyService"
                   startQuantity="1"/>
```

 After the update with Camunda Modeler, class and failedJobRetryTimeCycle were added as Camunda specific engine attributes:

```xml
<definitions ... xmlns:camunda="http://activiti.org/bpmn" xmlns:fox="http://www.camunda.com/fox">
  ...
  <serviceTask id="sid-01234" camunda:class="java.lang.Object"
               camunda:asyncBefore="true"
               name="MyService"
               implementation="webService">
    <extensionElements>
      <fox:failedJobRetryTimeCycle>R3/PT10M</fox:failedJobRetryTimeCycle>
    </extensionElements>
    <incoming>sid-3DED1BA0-77FC-4768-AA3E-0B60A81850EA</incoming>
    <outgoing>sid-E6D3AB73-386C-4260-82B9-CB740B82001F</outgoing>
  </serviceTask>
  ...
</definitions>
```

After synchronization back to Signavio the original Signavio-information like completionQuantity, isForCompensation and startQuantity were merged back:

```xml
<definitions ... xmlns:camunda="http://activiti.org/bpmn" xmlns:fox="http://www.camunda.com/fox">
  ...
  <serviceTask camunda:asyncBefore="true" camunda:class="java.lang.Object"
              completionQuantity="1"
              id="sid-01234"
              isForCompensation="false"
              name="MyService"
              startQuantity="1">
     <extensionElements>
        <fox:failedJobRetryTimeCycle>R3/PT10M</fox:failedJobRetryTimeCycle>
     </extensionElements>
     <incoming>sid-3DED1BA0-77FC-4768-AA3E-0B60A81850EA</incoming>
     <outgoing>sid-E6D3AB73-386C-4260-82B9-CB740B82001F</outgoing>
  </serviceTask>
  ...
</definitions>
```
