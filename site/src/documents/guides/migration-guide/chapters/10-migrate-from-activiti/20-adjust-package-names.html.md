---

title: 'Adjust package names'
category: 'Migrate from Activiti'

---


Just do an **Organize Imports** in your IDE, that should do the trick as API class names have not changed.
Your IDE should figure out the rest for you.
For Eclipse this can be done by clicking on the project and hit `Ctrl-Shift-O`.

<div class="panel-group" >
  <div class="panel panel-default" id="accClassloading">
    <div class="panel-heading">
      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accClassloading" href="#accClassloadingCollapsed">
        <i class="glyphicon glyphicon-question-sign"></i>
        Which Activiti class names have changed?
      </a>
    </div>
    <div id="accClassloadingCollapsed" class="panel-collapse collapse">
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>component</th>
              <th>Activiti class name</th>
              <th>camunda class name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>engine</td>
              <td>ActivitiException</td>
              <td>ProcessEngineException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiClassLoadingException</td>
              <td>ClassLoadingException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiOptimisticLockingException</td>
              <td>OptimisticLockingException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiTaskAlreadyClaimedException</td>
              <td>TaskAlreadyClaimedException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiWrongDbException</td>
              <td>WrongDbException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitRule</td>
              <td>ProcessEngineRule</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiTestCase</td>
              <td>ProcessEngineTestCase</td>
            </tr>
            <tr>
              <td></td>
              <td>PluggableActivitiTestCase</td>
              <td>PluggableProcessEngineTestCase</td>
            </tr>
            <tr>
              <td></td>
              <td>AbstractActivitiTestCase</td>
              <td>AbstractProcessEngineTestCase</td>
            </tr>
            <tr>
              <td></td>
              <td>ResourceActivitiTestCase</td>
              <td>ResourceProcessEngineTestCase</td>
            </tr>
            <tr>
              <td>spring</td>
              <td>ActivitiComponent</td>
              <td>ProcessEngineComponent</td>
            </tr>
            <tr>
              <td></td>
              <td>SpringActivitiTestCase</td>
              <td>SpringProcessEngineTestCase</td>
            </tr>
            <tr>
              <td>cdi</td>
              <td>ActivitiCdiException</td>
              <td>ProcessEngineCdiException</td>
            </tr>
            <tr>
              <td></td>
              <td>ActivitiExtension</td>
              <td>ProcessEngineExtension</td>
            </tr>
            <tr>
              <td></td>
              <td>CdiActivitiTestCase</td>
              <td>CdiProcessEngineTestCase</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

That's it - your application should run again.
