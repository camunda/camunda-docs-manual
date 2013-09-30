---

title: 'NoClassDefFoundError: graphiti'
category: 'Troubleshooting'

---

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/modeler/exception-graphiti.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
  	<p>
    	If you experience NoClassDefFoundErrors like the one shown here, graphiti was not properly installed. Graphiti is a framework used by the <strong>camunda Modeler</strong>. This rarely happens when you had some other plug-ins using different versions of graphiti installed before the camunda modeler (one common example would be the Activiti Designer).
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
