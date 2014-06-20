---

category: 'License Keys'
title: 'License Check'

---

Special enterprise features (enterprise plugins) in cockpit require a license key. The license mechanism has no impact on the engine or other runtime components. The license will be provided as a string by the camunda Support team. The following chapter explains how to activate a license. 

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/license-keys/license-prompt.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
      <p>Whenever you see the following message (screenshot on the left) you have to enter a valid license key for the camunda BPM platform. By selecting the link you will be forwarded to the license activation screen.</p>
      <p>In a clustered scenario, where multiple engines on multiple nodes access a single database, the license only needs to be activated once. When activated, a license is valid until the expiration date or until you have deleted your database. The license key is valid for an unlimited amount of engines.</p>
      <p> In a multi tenancy scenario, the license check will be performed for each engine with an own database. Thus, you will be prompted to enter the license key separately for each engine.</p>
  </div>  
</div>





