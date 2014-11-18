---

title: 'Connector Configuration'
category: 'Cycle'

---

To connect Cycle to a suitable repository you can set up one of the following connectors: 

* [Signavio Connector](ref:#cycle-connector-configuration-signavio-connector) 
* [Subversion Connector](ref:#cycle-connector-configuration-subversion-connector)
* [File System Connector](ref:#cycle-connector-configuration-file-system-connector)

Furthermore you get information about how to configure [User Credentials](ref:#cycle-connector-configuration-user-credentials) for your connector.

## Signavio Connector

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-add-signavio-connector.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      For directly accessing your process models stored in Signavio, you must set up a Signavio Connector. The picture to the left shows a connector setup for Signavio's SaaS edition with globally provided <a href="ref:#cycle-connector-configuration-user-credentials">credentials</a>, meaning that every Cycle user connects to the repository with the same credentials. If you are behind a proxy, you could configure that here as well.
    </p>
    <p>
      Hit <code>Test</code> to check if Cycle can find the folder you specified.
    </p>
  </div>
</div>

## Subversion Connector

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-add-svn-connector.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Use the subversion plugin to connect to a subversion repository like SVN or GitHub. You must specify the URL (including subfolders, if you want to directly point to a certain folder in the subversion repository). If <a href="ref:#cycle-connector-configuration-user-credentials">user credentials</a> are mandatory, you can provide them either globally or individually for each Cycle user. In the picture to the left you see a connector setup for a GitHub repository. The user credentials are provided globally. 
    </p>
    <p>
      Hit <code>Test</code> to check if Cycle can find the folder you specified.
    </p>
  </div>  
</div>

## File System Connector

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-add-file-system-connector.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      Use the File System Connector to use models stored on your local system. Select the File System Connector as connector plugin. The variable <code>${user.home}</code> points to the directory of your OS user account. You can also choose an absolute path like <code>C:\MyFolder</code>. 
    </p>
    <p>
      Hit <code>Test</code> to check if Cycle can find the folder you specified.
    </p>
  </div>    
</div>

## User Credentials

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-globally-credentials.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    If your repository requires a login you can choose between credentials provided by user or globally provided ones. Globally provided credentials can be set directly in the connector setup menu and are valid for every cycle user.
  </div>     
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/cycle/cycle-user-credentials.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      To set up credentials provided by the user you need to enter the <code>My Profile</code> menu and select <code>add credentials</code> for your connector.
    </p>
    <p>
      Hit <code>Test</code> to check if the credentials are valid. 
    </p>
  </div>    
</div>