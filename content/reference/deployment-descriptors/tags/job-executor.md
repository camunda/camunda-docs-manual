---

title: 'Job Executor Configuration'
weight: 30

menu:
  main:
    name: "<job-executor />"
    identifier: "descriptor-ref-job-executor"
    parent: "descriptor-ref-tags"
    pre: "Configure the Job Executor"

---

The job executor tag is used to configure the job executor and can be placed in the [bpm-platform.xml]({{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}) file.


# Example

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


# Syntax Reference

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
        Container element for the configuration of a job executor.
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
        Specifies a job acquisition thread.
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: Defines the name of the job acquisition thread.</li>
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
        Specifies the fully qualified classname of the job executor.
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
        Container element for providing a set of thread configuration properties.
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
        Set value for job acquisition configuration property.
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


# Job-Executor Configuration Properties

The following is a list with the available job acquisition thread configuration properties, along with some explanations. The properties can be used in the `<property name="foo">bar</property>` tag, where `foo` is the name of the property and `bar` is the value of the property.

{{< note title="Limitation:" class="warning" >}}
These properties only take effect in a Tomcat environment.
{{< /note >}}

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
      Sets the size of the queue which is used for holding tasks to be executed.
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>corePoolSize</code></td>
    <td>Integer</td>
    <td>
      Sets the size of the core pool in the thread pool. This number of threads will always be present and wait to execute tasks.
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>maxPoolSize</code></td>
    <td>Integer</td>
    <td>
      Sets the maximum number of threads that can be present in the thread pool.
      <p><strong>Default Value:</strong> 10</p>
    </td>
  </tr>
  <tr>
    <td><code>keepAliveTime</code></td>
    <td>Long</td>
    <td>
      Specify the time in milliseconds threads will be kept alive when there are no tasks present before threads are terminated until the core pool size is reached.
      <p><strong>Default Value:</strong> 0</p>
    </td>
  </tr>
</table>


# Job-Acquisition Configuration Properties

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
      Sets the maximal number of jobs to be acquired at once.
      <p><strong>Default Value:</strong> 3</p>
    </td>
  </tr>
  <tr>
    <td><code>lockTimeInMillis</code></td>
    <td>Integer</td>
    <td>
      Specifies the time in milliseconds an acquired job is locked for execution. During that time, no other job executor can acquire the job.
      <p><strong>Default Value:</strong> 300000</p>
    </td>
  </tr>
  <tr>
    <td><code>waitTimeInMillis</code></td>
    <td>Integer</td>
    <td>
      Specifies the wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition. If this is repeatedly the case, the wait time is increased exponentially by the factor <code>waitIncreaseFactor</code>. The wait time is capped by <code>maxWait</code>.
      <p><strong>Default Value:</strong> 5000</p>
    </td>
  </tr>
  <tr>
    <td><code>maxWait</code></td>
    <td>Long</td>
    <td>
      Specifies the maximum wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition.
      <p><strong>Default Value:</strong> 60000</p>
    </td>
  </tr>
  <tr>
    <td><code>backoffTimeInMillis</code></td>
    <td>Integer</td>
    <td>
      Specifies the wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked. This condition indicates that there are other job acquisition threads acquiring jobs in parallel. If this is repeatedly the case, the backoff time is increased exponentially by the factor <code>waitIncreaseFactor</code>. The time is capped by <code>maxBackoff</code>. With every increase in backoff time, the number of jobs acquired increases by <code>waitIncreaseFactor</code> as well.
      <p><strong>Default Value:</strong> 0</p>
    </td>
  </tr>
  <tr>
    <td><code>maxBackoff</code></td>
    <td>Long</td>
    <td>
      Specifies the maximum wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked.
      <p><strong>Default Value:</strong> 0</p>
    </td>
  </tr>
  <tr>
    <td><code>backoffDecreaseThreshold</code></td>
    <td>Integer</td>
    <td>
      Specifies the number of successful job acquisition cycles without a job locking failure before the backoff time is decreased again. In that case, the backoff time is reduced by <code>waitIncreaseFactor</code>.
      <p><strong>Default Value:</strong> 100</p>
    </td>
  </tr>
  <tr>
    <td><code>waitIncreaseFactor</code></td>
    <td>Float</td>
    <td>
      Specifies the factor by which wait and backoff time are increased in case their activation conditions are repeatedly met.
      <p><strong>Default Value:</strong> 2</p>
    </td>
  </tr>

</table>
