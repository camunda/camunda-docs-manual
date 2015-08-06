---

title: "Install the Eclipse Plugin"
weight: 30

menu:
  main:
    name: "Eclipse Plugin"
    identifier: "installation-guide-modeler"
    parent: "installation-guide"

---

This page explains how to install the Camunda Modeler is a BPMN 2.0 modeling plugin for the Eclipse IDE. This document will guide you through the installation process step by step and gives you information about download pages, requirements and troubleshooting.

# Installation

## Requirements

* We recommend to use Eclipse Indigo. The edition (32bit/64bit) must match your Java edition.
* Please note that you cannot install the Activiti Designer and the camunda Modeler in the same Eclipse. It will cause both designers to not work properly.
* If you are using the fox-designer, please uninstall the fox-designer plugin before using the __camunda Modeler__. You can uninstall already installed plugins in the following menu: `Help` -> `Install New Software...` -> `What is already installed?`.


## Download

<section class="row">
  <div class="col-sm-5">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Get Prepackaged Modeler</h3>
      </div>
      <div class="panel-body">
        <p>
          You can download a prepackaged <strong>camunda Modeler</strong> (Windows only).
        </p><br /><br />
        <p>
          <a class="btn btn-primary btn-lg" href="http://camunda.org/release/camunda-modeler/kepler/camunda-modeler-kepler-latest.zip">
            <i class="glyphicon glyphicon-download-alt glyphicon-white"></i> Download
          </a>
        </p><br /><br />
        <p>
          This distribution includes <strong>camunda Modeler</strong> installed inside eclipse Kepler (32bit, Windows).
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-5">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Install as Plugin</h3>
      </div>
      <div class="panel-body">
        <p>
          Find <strong>camunda Modeler</strong> on the following update sites:
          <br /><strong>Kepler</strong><br />
          <a href="http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/">
            http://camunda.org/release/camunda-modeler/update-sites/kepler/latest/site/
          </a>
          <br /><br /><strong>Indigo & Juno</strong><br />
          <a href="http://camunda.org/release/camunda-modeler/update-sites/latest/site/">
            http://camunda.org/release/camunda-modeler/update-sites/latest/site/
          </a>
        </p>
        <p>
          Follow the Instructions below to install <strong>camunda Modeler</strong> as a plugin in your own Eclipse distribution.
        </p>
      </div>
    </div>
  </div>
</section>

## Step by Step Installation

### Step 1 - Add the update site

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_01.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Add the update site URL (see above) as an Eclipse Repository.
    </p>
  </div>
</div>


### Step 2 - Select item

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_02.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      The item <strong>camunda Modeler</strong> appears. Select it and click <em>Next</em>.
    </p>
  </div>
</div>


### Step 3 - Installation details

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_03.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Wait for the installation details. Click <em>Next</em>.
    </p>
  </div>
</div>


### Step 4 - User Agreement

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_04.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Before you can download the plugin you will be prompted to accept the User Agreement. Click <em>Next</em>.
    </p>
  </div>
</div>


### Step 5 - Installation in progress

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_05.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      The installation progress window appears. Wait.
    </p>
  </div>
</div>


### Step 6 - Security warning

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_06.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      You will get a security warning message during the installation. Click <em>OK</em>.
    </p>
  </div>
</div>


### Step 7 - Restart

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/modeler_plugin_07.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      After the installation has finished you will be prompted to restart your Eclipse. Click <em>Restart Now</em>. After the restart the camunda modeler is ready to use.
    </p>
  </div>
</div>

# Troubleshooting

## NoClassDefFoundError: graphiti

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/exception-graphiti.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
  	<p>
    	If you experience NoClassDefFoundErrors like the one shown here, graphiti was not properly installed. Graphiti is a framework used by the <strong>camunda Modeler</strong>. This rarely happens, however it can occur if you had another plug-in installed using  a different version of graphiti before the camunda Modeler (one common example would be the Activiti Designer).
    </p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/install-graphiti.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
		<p>
			If this happens you have two options:
			<ul>
	      <li>Start with a <em>fresh</em> Eclipse.</li>
	      <li>Install graphiti manually as shown in the left screenshot (please note that the version might change, currently use the latest 0.8.x version or check which version is referenced in the <strong>camunda Modeler</strong> update site).</li>
      </ul>
    </p>
  </div>
</div>

## Unhandled loop exception

If the Modeler behaves strangely and you are getting exceptions like [this](http://stackoverflow.com/questions/84147/org-eclipse-swt-swterror-item-not-added), please try the following:

* Clean up your Eclipse.
* Start your Eclipse with command line option `-clean` once.
* Depending on your models, you might want to give Eclipse more resources. You may do so by appending the following lines in the eclipse.ini file residing next to your Eclipse executable.
```
-Xms768m
-Xmx1024m
```

If these options already exist, remove them first.


