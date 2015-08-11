---
title: 'Get started with the BPMN 2.0 Roundtrip and Camunda Cycle'
weight: 50

menu:
  main:
    name: "BPMN 2.0 Roundtrip"
    identifier: "get-started-cycle"
    parent: "get-started"
    pre: "Get started with Camunda cycle and the BPMN 2.0 roundtrip. Learn how to keep process models in sync."
---

{{< img src="../img/cycle/cycle-idea.png" >}}

With camunda Cycle you can create a roundtrip between a BPMN 2.0 modeler and your Development Repository (SVN, Local File, etc.).

That way, you can use a sophisticated BPMN Design Environment that is especially suitable to your Business Users (Business Analysts, Subject Matter Experts etc.), while keeping the process models created in those tools in sync with the ones that are executed by the camunda process engine.

# Setup

You can download Cycle from the [Download Area](http://camunda.org/download/cycle/). After starting the server, a webpage where you have to create an initial user should open automatically. You can also open http://localhost:8180/cycle and create a new user.
Since your process models will be stored in certain repositories, you should set up the respective connectors. In the upper right menu, navigate to "Connectors". Hit the "New"-Button, and follow the steps below depending on what kind of connector you want to set up.

## File Connector

{{< img src="../img/cycle/file.png" >}}

Here is a typical configuration to set up a connector to your local File System. The variable "${user.home}" in this example points to the directory of your user in your Operating System, so if your user is "horst" and you are a Windows-User, this would mean "C:\Users\horst". You can also choose an absolute path like "C:\MyFolder".

Hit "Test" to check if Cycle can find the folder you specified.

## Subversion (SVN) Connector

{{< img src="../img/cycle/svn.png" >}}

When connecting to a Subversion repository, you must specify the URL (including subfolders, if you want to directly point to a certain folder in the Subversion repository). If user credentials are mandatory, you can provide them either globally or individually for each Cycle user. In this example, we assume that every Cycle user will use the same credentials when using this connector, which is why we provide them in this dialog.

Hit "Test" to check if Cycle can connect to the SVN repository with the credentials you provided.

# Creating a Roundtrip

{{< img src="../img/cycle/create.png" >}}

In the left box "My Roundtrips", hit "Create" to create a new Roundtrip. Pick a name and hit "OK". In our example, we assume that a new Roundtrip named "invoice" has been created.

We will now add a process model from our BPMN modeler to the roundtrip and create the process model we want to execute out of it. Currently, the roundtrip works best with the Signavio Process Editor, so this is why we describe it in the next section. Further below you can find a general description for other BPMN tools.

# Roundtrip with Signavio

{{< img src="../img/cycle/signavio.png" >}}

The guys from Signavio have created a web-based BPMN modeler. If you don't know it yet, you should <a href="http://www.signavio.com/camunda">take a look at it</a>. It's extremely intuitive to use (so it's perfectly suitable for Business users) and offers several helpful collaboration features, including a sophisticated API, which is why Cycle currently works best with Signavio.

### Forward: From Signavio to camunda Modeler

#### Step 1: Set up Signavio Connector

{{< img src="../img/cycle/signavio-connector.png" >}}

To access your process models stored in Signavio you must set up a Signavio Connector.

In our example we use Signavio's SaaS edition and provide the credentials globally, meaning that every Cycle user will use the same credentials when using this connector. If you are behind a proxy, you could configure that here as well.

Hit "Test" to check if Cycle can access your Signavio account.

#### Step 2: Add process model from Signavio

{{< img src="../img/cycle/signavio-choose-model.png" >}}

In the left box of your roundtrip click on "Add process Model", pick a name and choose "Signavio SaaS" from the connectors dropdown menu. Cycle now connects with Signavio, so after a short time you can navigate through the tree to select your process model.

After you hit "Add", Cycle will save a link to the process model you selected and offers you a preview image in the left box of your roundtrip. It also says that the process model has not been synchronized yet, which is true.

#### Step 3: Create BPMN file for execution

{{< img src="../img/cycle/cycle-create-executable.png" >}}

Hit "Create" and choose the location you want the BPMN 2.0 XML File to be stored to. In our example, we want to store it on our local file system, in a workspace we use with our Eclipse IDE. After hitting "Create", Cycle will connect to Signavio, request the BPMN 2.0 XML and save it to the location you specified.

**Heads up!** If your process model is a collaboration diagram, Cycle will check which pools are flagged as "executable". Only those pools will actually be regarded for the executable process model, so you don't have to bother with huge diagrams describing manual flows while you are only really interested in the technical flows that will be executed by the process engine. We call this feature "Pool Extraction".

#### Step 4: Edit BPMN File

{{< img src="../img/cycle/signavio-created.png" >}}

Cycle now shows you that your roundtrip consists of the BPMN diagram stored in Signavio (left side) and the BPMN 2.0 File stored in your file repository (right side). You can also see that the two process models are currently in sync, and the date and time since the last sync has been made.

You can now either check out the BPMN 2.0 - XML from your Subversion or open it directly in your local drive. In both cases, you can now edit it inside your Eclipse IDE by using the <a href="http://camunda.org/bpmn/tool/">camunda Modeler</a>.

### Reverse: From camunda Modeler to Signavio

#### Step 1: Deciding to sync back in Signavio

{{< img src="../img/cycle/cycle-edited.png" >}}

Assuming that you have edited the BPMN 2.0 XML with the [camunda Modeler]({{< relref "installation/eclipse-plugin.md" >}}), e.g. because you enriched it with execution attributes, added objects or removed some, you should bring those changes back into Signavio: First, your Business Analyst probably wants to know about the changes and approve them, and second, if you want to change the BPMN diagram in Signavio, you should synchronize it with the file you have changed in the camunda Modeler first, so that the next forward engineering sync from Signavio to the camunda Modeler does not overwrite all the changes you have made.

When you have Edited the BPMN 2.0 XML with the camunda Modeler, Cycle will you tell you that the two process models are not in sync any more.

#### Step 2: Sync back

{{< img src="../img/cycle/cycle-synchback.png" >}}

Click on the lower "Sync"-Button to actually re-import the BPMN 2.0 XML you have edited into Signavio. As Signavio supports versioning, this will lead to a new version of the BPMN diagram that is stored there. You can also edit the commit message that Cycle will write when pushing that new version into Signavio.

**Heads up!** If the BPMN diagram in Signavio is a collaboration diagram (i.e. if it consists of multiple pools), Cycle will only overwrite the executable process engine pool.

#### Step 3: Compare Revisions

{{< img src="../img/cycle/signavio-revision.png" >}}

You can use the "compare revisions"-Feature in Signavio the check the changes.

# Roundtrip with other tools

If you want to use another BPMN 2.0 modeler, that modeler **must** comply with the following requirements:

* Complete support of the BPMN 2.0 notation
* Export/Serialization of Process Diagrams in valid BPMN 2.0 XML

These are the minimum requirements for Forward Engineering. If you want to use the same modeler for a complete roundtrip, it **must** also allow:

* Import/Deserialization of BPMN 2.0 XML into Process Diagrams
* Import and Storage of BPMN 2.0 execution attributes
* Import and Storage of additional execution attributes (according to the <a href="http://www.omg.org/spec/BPMN/2.0/">BPMN 2.0 Specification</a>, you are allowed to extend the BPMN 2.0 XML with additional attributes, which camunda BPM does to simplify process application development)

These are the minimum requirements for Roundtrip Engineering. If your modeler complies with them, you can use it on a simple file base, meaning that you would just use the File or Subversion Connector in camunda Cycle to add the BPMN 2.0 Files exported from your modeler to the roundtrip. This is of course less convenient than what we have just described using Signavio. Unfortunately, none of the other BPMN 2.0 tools we know currently offer an API that Cycle could connect with (if you are a Tool Vendor, please see <a href="#vendorSect">this section</a>).

Here is an overview of BPMN 2.0 modelers we know, and the requirements they comply with (information given without any warranty):

<table class="table table-responsive table-striped table-hover">
  <tr>
    <th>Product</th>
    <th>Version</th>
    <th>License</th>
    <th class="center">BPMN 2.0</th>
    <th class="center">Export</th>
    <th class="center">Import **incl. Attributes <br/>(see above)**</th>
    <th class="center">API</th><th>Cycle ready?</th>
  </tr>
  <tr>
    <td><a href="http://www.softwareag.com/de/products/az/aris/default.asp">ARIS</a></td>
    <td></td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"></td>
    <td></td>
    <td></td>
    <td class="center">no</td>
  </tr>
  <tr>
    <td><a href="http://www.bizagi.com/en/products/bizagi-process-modeler/">BizAgi Process Modeler</a></td>
    <td>2.0</td>
    <td>freeware</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"></td>
    <td></td>
    <td></td>
    <td class="center">no</td>
  </tr>
  <tr>
    <td><a href="http://www.boc-group.com/de/produkte/adonis/">BOC Adonis</a></td>
    <td>5.0</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td></td>
    <td class="center">only forward</td>
  </tr>
  <tr>
    <td><a href="http://www.businessprocessincubator.com/bpmn-2-0-modeler-for-visio.html">BPMN 2.0 modeler for Visio</a></td>
    <td>3.0</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td></td>
    <td class="center">only forward</td>
  </tr>
  <tr>
    <td><a href="http://www.visual-paradigm.com/product/bpva/">Business Process Visual Architect</a></td>
    <td>3.0</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td></td>
    <td class="center">only forward</td>
  </tr>
  <tr>
    <td><a href="http://www.sparxsystems.com.au/">Enterprise Architect</a></td>
    <td>10</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td class="center">only forward</td>
  </tr>
  <tr>
    <td><a href="http://www.ibo.de/software/ibo-prometheus-prozessmanagement-software/62.html">ibo Prometheus</a></td>
    <td>3.2</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center">yes</td>
  </tr>
  <tr>
    <td><a href="http://www.igrafx.de/">iGrafx</a></td>
    <td>2015</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td></td>
    <td class="center">no</td>
  </tr>
  <tr>
    <td><a href="http://www.signavio.com/">Signavio Process Editor</a></td>
    <td>7</td>
    <td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center">yes</td>
  </tr>
  <tr>
    <td><a href="http://sourceforge.net/projects/bpmn/">Yaoqiang</a></td>
    <td>2.0</td><td>open source</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td></td>
    <td class="center">yes</td>
  </tr>
  <tr>
    <td><a href="http://www.businessprocessincubator.com/">Trisotech Business Process Incubator</a></td>
    <td>2.0</td><td>commercial</td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center"><i class="glyphicon glyphicon-ok"></i></td>
    <td class="center">yes</td>
  </tr>
</table>

If this overview is in any way incorrect or outdated, please <a href="mailto:community@camunda.org">let us know</a>!

# Additional Information

## Information for Tool Vendors

If you are a BPMN tool vendor and would like your tool to integrate (better) with camunda Cycle, you can build your own connector and plug it into cycle. Here you can find more information about building [cycle connectors](https://github.com/camunda/camunda-cycle-connectors).

## User Guide for Cycle

Please find additional information about cycle in the [user guide]({{< relref "user-guide/cycle/index.md" >}}).
