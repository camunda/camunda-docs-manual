---

title: 'Configure a WorkManager to be used by the camunda platform jobexecutor'
shortTitle: 'Configure a WorkManager'
category: 'BPM Platform'

---


This section explains how you can use the WebShere Integrated Solutions Console for configuring a work manager to be used by the camunda BPM platform jobexecutor. It is recommended to check the [manual of the application server for additional details](http://www-01.ibm.com/software/webservers/appserv/was/library/).

Select the appropriate server under **Resources** / **Asynchronous Beans** / **Work Managers** and open the configuration page. Example: <code>server1</code>
Create a new work manager using the Button **New...**.
Configure the new Work Manager. The following is a selection of sensible default values:


## General Properties

<table class="table">
  <tbody>
  <tr>
    <th>Property</th>
    <th>Default Value</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td >Name</td>
    <td >camunda-platform-jobexecutor-WM</td>
    <td >The name of the Work Manager. You can choose a different name if you reference
      it when installing the camunda platform jobexecutor resource adapter (see below).
    </td>
  </tr>
  <tr>
    <td >JNDI name</td>
    <td>
      <div>
        <p>wm/camunda-bpm-workmanager</p>
      </div>
    </td>
    <td>
      <p>Default JNDI name for WorkManager.</p>
      <p><strong>This setting value is mandatory.</strong></p>
    </td>
  </tr>
  <tr>
    <td >Description</td>
    <td >"The work manager used by the camunda platform job executor"</td>
    <td >Describes the work manager. Any value can be used.</td>
  </tr>
  <tr>
    <td >Work Request Queue Size</td>
    <td >5</td>
    <td ><span>Specifies the size of the work request queue. The work request queue is a buffer that holds scheduled work objects and may be a value of 1 or greater. The thread pool pulls work from this queue. If you do not specify a value or the value is 0, the queue size is managed automatically. Large values can consume significant system resources.</span>
    </td>
  </tr>
  <tr>
    <td ><span>Work request queue full action</span></td>
    <td ><span>Fail</span></td>
    <td ><span>Specifies the action that is taken when the thread pool is exhausted, and the work request queue is full. This action starts when you submit non-daemon work to the work manager. The default value is block but should be changed to "<strong>Fail</strong>".</span>
    </td>
  </tr>
  </tbody>
</table>


## Thread Pool Properties

<table class="table">
  <tbody>
  <tr>
    <th>Property</th>
    <th>Default Value</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>Number of alarm threads</td>
    <td>2</td>
    <td>Specifies the desired maximum number of threads that are used for alarms. The default value is 2.</td>
  </tr>
  <tr>
    <td>Maximum number of threads</td>
    <td>4</td>
    <td>Specifies the maximum number of threads that are available in this work manager used by the jobexecutor. Should be greater than "Minimum Size".</td>
  </tr>
  <tr>
    <td>Minimum number of threads</td>
    <td>2</td>
    <td>Specifies the minimum number of threads that are available in this work manager. Should not be below "2" since one thread is blocked by the job acquisition. If you configure multiple job acquisitions, the Minimal Size should not be below Nr. of Acquisitions + 1.</td>
  </tr>
  <tr>
    <td>Thread Priority</td>
    <td>5</td>
    <td>Specifies the priority of the threads that are available in this work manager.</td>
  </tr>
  <tr>
    <td>Growable</td>
    <td>False</td>
    <td>Specifies whether the number of threads in this work manager can be increased automatically when maximum number of threads is reached.The default value is true, but should be changed to "False"</td>
  </tr>
  </tbody>
</table>

The following screenshot shows an example configuration of the work manager and its thread pool properties.

<a href="ref:asset:/guides/installation-guide/was/assets/img/work-manager.png" target="_blank">
  <img class="tile" src="ref:asset:/guides/installation-guide/was/assets/img/work-manager.png" alt=""/>
</a>