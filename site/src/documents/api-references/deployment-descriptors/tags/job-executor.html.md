---

title: 'Job Executor Configuration'
category: 'Tags'

---

The job executor tag is used to configure the job executor and can be placed in the [bpm-platform.xml](ref:#descriptors-bpm-platformxml) file.

## Example

The following example shows a job executor XML snippet:

```xml
<job-executor>
  <job-acquisition name="default">
    <properties>
      <property name="maxJobsPerAcquisition">5</property>
      <property name="waitTimeInMillis">8000</property>
      <property name="lockTimeInMillis">400000</property>
    </properties>
  </job-acquisition>
  <properties>
    <!-- Note: the following properties only take effect in a Tomcat environment -->
    <property name="queueSize">3</property>
    <property name="corePoolSize">5</property>
    <property name="maxPoolSize">10</property>
    <property name="keepAliveTime">0</property>
  </properties>
</job-executor>
```


## Syntax Reference

<table class="table table-striped">
  <tr>
    <th>Tag name </th>
    <th>Parent tag name</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>&lt;job-executor&gt;</code></td>
    <td><code>&lt;bpm-platform&gt;</code></td>
    <td>true</td>
    <td>
      <p>
        Container element for the configuration of a job executor.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;job-acquisition&gt;</code></td>
    <td><code>&lt;job-executor&gt;</code></td>
    <td>true</td>
    <td>
      <p>
        Specifies a job acquisition thread.
      </p>
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: allows you to define the name of the job acquisition thread.</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;job-executor-class&gt;</code></td>
    <td><code>&lt;job-acquisition&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Specifies the fully qualified classname of the job executor.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
      <p>
        <strong>Example:</strong>
        <code>&lt;job-executor-class&gt;org.camunda.bpm.example.MyJobExecutor&lt;/job-executor-class&gt;</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;properties&gt;</code></td>
    <td><code>&lt;job-acquisition&gt;</code> or <code>&lt;job-executor&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Container element for providing a set of thread configuration properties.
      </p>
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;property&gt;</code></td>
    <td><code>&lt;properties&gt;</code></td>
    <td>false</td>
    <td>
      <p>
        Set value for job acquisition configuration property.
      </p>
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: The name of the property.</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        The value of the property to be set.
      </p>
    </td>
  </tr>
</table>

## Job-Executor Configuration Properties

The following is a list with the available job acquisition thread configuration properties, along with some explanations. The properties can be used in the `<property name="foo">bar</property>` tag, where `foo` is the name of the property and `bar` is the value of the property.

<div class="alert alert-warning">
  <p>
    <strong>Limitation:</strong>
  </p>
  <p>
    This properties only take effect in a Tomcat environment.
  </p>
</div>

<table class="table table-striped">
  <tr>
    <th>Property name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>queueSize</code></td>
    <td>Integer</td>
    <td>
      <p>Sets the size of the queue which is used for holding tasks to be executed.</p>
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>corePoolSize</code></td>
    <td>Integer</td>
    <td>
      <p>Sets the size of the core pool in the thread pool. This number of threads will always be present and wait to execute tasks.</p>
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>maxPoolSize</code></td>
    <td>Integer</td>
    <td>
      <p>Sets the maximum number of threads that can be present in the thread pool.</p>
      <p><strong>Default Value:</strong> 10</p>
    </td>
  </tr>
  <tr>
    <td><code>keepAliveTime</code></td>
    <td>Long</td>
    <td>
      <p>Specify the time in milliseconds threads will be kept alive when there are no tasks present before threads are terminated until the core pool size is reached.</p>
      <p><strong>Default Value:</strong> 0</p>
    </td>
  </tr>
</table>


## Job-Acquisition Configuration Properties

The following is a list with the available job acquisition thread configuration properties, along with some explanations. The properties can be used in the `<property name="foo">bar</property>` tag, where `foo` is the name of the property and `bar` is the value of the property.

<table class="table table-striped">
  <tr>
    <th>Property name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>maxJobsPerAcquisition</code></td>
    <td>Integer</td>
    <td>
      <p>Sets the maximal number of jobs to be acquired at once.</p>
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>waitTimeInMillis</code></td>
    <td>Integer</td>
    <td>
      <p>Specify the wait time of the job acquisition thread in milliseconds. This value can be used to define how often the job acquisition thread should poll the database for jobs.</p>
      <p><strong>Default Value:</strong> 5000</p>
    </td>
  </tr>
  <tr>
    <td><code>lockTimeInMillis</code></td>
    <td>Integer</td>
    <td>
      <p>Specify the lock time of an acquired job in milliseconds.</p>
      <p><strong>Default Value:</strong> 300000</p>
    </td>
  </tr>

</table>
