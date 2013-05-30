How to develop a cockpit plugin
===============================

In this how to we will walk through the steps needed to develop a cockpit plugin. In the course we will develop a simple plugin that displays the number of process instances per deployed process definition on the dashboard page of cockpit.

The result will look similar to the screenshot shown below.

<img src="./cockpit-plugin.png" style=" margin-bottom: 30px; border: solid 1px #666;" alt="Cockpit architecture with plugins" title="Cockpit architecture with plugins" />


The nature of a cockpit plugin
------------------------------

A cockpit plugin is a maven jar project that is included in the cockpit webapplication as a library dependency. It provides a server-side and a client-side extension to cockpit.

The integration of a plugin into the overall cockpit architecture is depicted in the following figure.

![Cockpit architecture with plugins](architecture.png "Cockpit architecture with plugins")

On the server-side, it can extend cockpit with custom SQL queries and JAX-RS resource classes. Queries (defined via [MyBatis](http://www.mybatis.org/)) may be used to squeeze additional intel out of an engine database or to execute custom engine operations. JAX-RS resources on the other hand extend the cockpit API and expose data to the client-side part of the plugin.

On the client-side a plugin may include [AngularJS](http://angularjs.org/) modules to extend the cockpit webapplication. Via those modules a plugin provides custom views and services.


### File structure

The basic skeleton of a cockpit plugin looks as follows:

    cockpit-plugin/
    ├── src/
    |   ├── main/
    |   |   ├── java/
    |   |   |   └── org/my/plugin/
    |   |   |       ├── db/
    |   |   |       |   └── MyDto.java                                    (5)
    |   |   |       ├── resource/
    |   |   |       |   ├── MyPluginRootResource.java                     (3)
    |   |   |       |   └── ...                                           (4)
    |   |   |       └── MyPlugin.java                                     (1)
    |   |   └── resources/
    |   |       ├── META-INF/services/
    |   |       |   └── org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin  (2)
    |   |       └── org/my/plugin/
    |   |           ├── queries/
    |   |           |   └── sample.xml                                    (6)
    |   |           └── assets/app/                                       (7)
    |   |               └── app/
    |   |                   ├── plugin.js                                 (8)
    |   |                   ├── view.html
    |   |                   └── ...
    |   └── test/
    |       ├── java/
    |       |   └── org/my/plugin/
    |       |       └── MyPluginTest.java
    |       └── resources/
    |           └── activiti.cfg.xml
    └── pom.xml

As runtime relevant resources it defines

1. a plugin main class
2. a `META-INF/services` entry that publishes the plugin to cockpit
3. a plugin root [JAX-RS](https://jax-rs-spec.java.net/) resource that wires the server-side API
4. other resources that are part in the server-side API
5. data transfer objects used by the resources
6. mapping files that provide additional cockpit queries as [MyBatis](http://www.mybatis.org/) mappings
7. resource directory from which client-side plugin assets are served as static files
8. a main file that bootstraps the client-side plugin in a [AngularJS](http://angularjs.org/) / [RequireJS](http://requirejs.org) environment

The following sections will expand on the specific files and their purpose.


Server side
-----------

We will walk through the important aspects of developing the server-side parts of the plugin, creating a plugin jar, defining a custom query and exposing that query via a JAX-RS resource.


### Plugin archive

As a first step we create a maven jar project that represents our plugin library. Inside the projects `pom.xml` we must declare a dependency to the cockpit core with the maven coordinates `org.camunda.bpm.cockpit:camunda-cockpit-core`. The project contains all the infrastructure to create and test the server-side parts of a plugin.

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <groupId>org.camunda.bpm.cockpit.plugin</groupId>
      <artifactId>cockpit-sample-plugin</artifactId>
      <version>1.0-SNAPSHOT</version>
      <packaging>jar</packaging>

      <name>cockpit-sample-plugin</name>

      <dependencies>
        <dependency>
          <groupId>org.camunda.bpm.cockpit</groupId>
          <artifactId>camunda-cockpit-core</artifactId>
          <version>7.0.0-alpha4</version>
        </dependency>
        <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>4.11</version>
          <scope>test</scope>
        </dependency>
      </dependencies>
    </project>


### Plugin main class

The main entry point for a plugin is the service provide interface (SPI) `org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin`. Each plugin must provide an implementation of this class and register it via `META-INF/services`.

We will go ahead and create a implementation of that API called `SampleCockpitPlugin`.

    package org.camunda.bpm.cockpit.plugin.sample;

    import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;

    public class SamplePlugin extends AbstractCockpitPlugin {

      public static final String ID = "sample-plugin";

      public String getId() {
        return ID;
      }
    }

By inheriting from `org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin` we make sure that the plugin is initialized with reasonable defaults.

To register the plugin with cockpit, we must put its class name into a file called `org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin` that resides in the directory `META-INF/services`. That will publish the plugin via the Java [ServiceLoader facilities](http://docs.oracle.com/javase/6/docs/api/java/util/ServiceLoader.html).


#### Test case

We will go ahead and write a test case that makes sure the plugin gets properly discovered.
Before we do so, we need to add test dependencies to our project `pom.xml`.

    <dependencies>
      ...

      <!-- test dependencies -->
      <dependency>
        <groupId>org.camunda.bpm</groupId>
        <artifactId>camunda-engine</artifactId>
        <version>7.0.0-alpha4</version>
        <scope>test</scope>
      </dependency>
      <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>1.3.171</version>
        <scope>test</scope>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.11</version>
        <scope>test</scope>
      </dependency>
      ...

The class `org.camunda.bpm.cockpit.plugin.test.AbstractCockpitPluginTest` can work as a basis for cockpit plugin tests. It initializes the cockpit environment around each test and bootstraps a single process engine that is made available to cockpit and the plugin.

A first test may look as follows:

    package org.camunda.bpm.cockpit.plugin.sample;

    import org.camunda.bpm.cockpit.Cockpit;
    import org.camunda.bpm.cockpit.plugin.spi.CockpitPlugin;
    import org.camunda.bpm.cockpit.plugin.test.AbstractCockpitPluginTest;
    import org.junit.Assert;
    import org.junit.Test;

    public class SamplePluginsTest extends AbstractCockpitPluginTest {

      @Test
      public void testPluginDiscovery() {
        CockpitPlugin samplePlugin = Cockpit.getRuntimeDelegate().getPluginRegistry().getPlugin("sample-plugin");

        Assert.assertNotNull(samplePlugin);
      }
    }

In the test `#testPluginDiscovery` we use the internal cockpit API to check whether the plugin was recognized.

Before we can actually run the test, we need to create a `activiti.cfg.xml` to be present on the class path (usually under `src/test/resources`). That file configures the process engine to be bootstrapped.

We go ahead and create the file.

    <?xml version="1.0" encoding="UTF-8"?>

    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans   http://www.springframework.org/schema/beans/spring-beans.xsd">

      <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">

        <property name="jdbcUrl" value="jdbc:h2:mem:activiti;DB_CLOSE_DELAY=1000" />
        <property name="jdbcDriver" value="org.h2.Driver" />
        <property name="jdbcUsername" value="sa" />
        <property name="jdbcPassword" value="" />

        <!-- Database configurations -->
        <property name="databaseSchemaUpdate" value="true" />

        <!-- job executor configurations -->
        <property name="jobExecutorActivate" value="false" />

        <property name="history" value="full" />

      </bean>
    </beans>

### Custom query

The plugin mechanism allows us to provide additional SQL queries that may be run against the process engine database. Those queries must be defined via MyBatis mapping files.

To implement a custom query, we will create a file `sample.xml` in the directory `org/camunda/bpm/cockpit/plugin/sample/queries`:

    <?xml version="1.0" encoding="UTF-8" ?>

    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

    <mapper namespace="cockpit.sample">

      <resultMap id="processInstanceCountMap" type="org.camunda.bpm.cockpit.plugin.sample.db.ProcessInstanceCountDto">
        <result property="key" column="KEY_" jdbcType="VARCHAR" />
        <result property="instanceCount" column="INSTANCES_" jdbcType="INTEGER" />
      </resultMap>

      <select id="selectProcessInstanceCountsByProcessDefinition" resultMap="processInstanceCountMap">
        select d.KEY_, count(d.KEY_) INSTANCES_
          from ACT_RU_EXECUTION e JOIN ACT_RE_PROCDEF d ON e.PROC_DEF_ID_ = d.ID_
          group by d.KEY_
      </select>

    </mapper>

Note both the usage of a custom namespace (`cockpit.sample`) as well as the result mapping to the plugin provided class `org.camunda.bpm.cockpit.plugin.sample.db.ProcessInstanceCountDto`.

We need to define the class to which the result is mapped:

    package org.camunda.bpm.cockpit.plugin.sample.db;

    public class ProcessInstanceCountDto {

      private String key;

      private int instanceCount;

      public String getKey() {
        return key;
      }

      public void setKey(String key) {
        this.key = key;
      }

      public int getInstanceCount() {
        return instanceCount;
      }

      public void setInstanceCount(int instanceCount) {
        this.instanceCount = instanceCount;
      }
    }

Additionally we need to publish the mapping file by overriding the method `#getMappingFiles()` in our plugin class:

    public class SamplePlugin extends AbstractCockpitPlugin {

      // ...

      @Override
      public List<String> getMappingFiles() {
        return Arrays.asList("org/camunda/bpm/cockpit/plugin/sample/queries/sample.xml");
      }
    }


#### Test case

To test that the plugin defined query actually works, we extend our testcase. By using the cockpit provided service `QueryService` we can verify that the query can be executed:

    public class SamplePluginsTest extends AbstractCockpitPluginTest {

      // ...

      @Test
      public void testSampleQueryWorks() {

        QueryService queryService = getQueryService();

        List<ProcessInstanceCountDto> instanceCounts =
          queryService
            .executeQuery(
              "cockpit.sample.selectProcessInstanceCountsByProcessDefinition",
              new QueryParameters<ProcessInstanceCountDto>());

        Assert.assertEquals(0, instanceCounts.size());
      }
    }

Note that `#getQueryService()` is merely a shortcut the service that may also be accessed via cockpit's main entry point, the `org.camunda.bpm.cockpit.Cockpit` class.


### Defining and publishing plugin services

Plugins publish their services via APIs defined through JAX-RS resources.

First, we need to add the JAX-RS API to our projects `pom.xml`. That is best done by including the following dependency:

    <dependencies>
      ...

      <!-- provides jax-rs (among other APIs) -->
      <dependency>
        <groupId>org.jboss.spec</groupId>
        <artifactId>jboss-javaee-6.0</artifactId>
        <type>pom</type>
        <scope>provided</scope>
        <version>3.0.2.Final</version>
      </dependency>
      ...

A server-side plugin API consists of a root resource and a number of sub resources that are provided by the root resource. A root resource may inherit from `org.camunda.bpm.cockpit.plugin.resource.AbstractPluginRootResource` to receive some basic traits. It must publish itself on the path `plugin/$pluginName` via a `@Path` annotation.

A root resource for our plugin may look as follows:

    package org.camunda.bpm.cockpit.plugin.sample.resources;

    import javax.ws.rs.Path;
    import javax.ws.rs.PathParam;
    import org.camunda.bpm.cockpit.plugin.resource.AbstractPluginRootResource;
    import org.camunda.bpm.cockpit.plugin.sample.SamplePlugin;

    @Path("plugin/" + SamplePlugin.ID)
    public class SamplePluginRootResource extends AbstractPluginRootResource {

      public SamplePluginRootResource() {
        super(SamplePlugin.ID);
      }

      @Path("{engineName}/process-instance")
      public ProcessInstanceResource getProcessInstanceResource(@PathParam("engineName") String engineName) {
        return subResource(new ProcessInstanceResource(engineName), engineName);
      }
    }

Note that a sub resource gets initialized by the plugin when requests to `{engineName}/process-instance` are being made. That ensures that a cockpit service is multi-tenancy ready out of the box (i.e. capable to work with all process engines provided by the camunda BPM platform).

A sub-resource may extend `org.camunda.bpm.cockpit.plugin.resource.AbstractPluginResource` to get initialized with the correct process engine mappings. The resource shown below exposes our custom SQL query to the client when accessing the resource via `GET`.

    package org.camunda.bpm.cockpit.plugin.sample.resources;

    import java.util.List;
    import javax.ws.rs.GET;

    import org.camunda.bpm.cockpit.db.QueryParameters;
    import org.camunda.bpm.cockpit.plugin.resource.AbstractPluginResource;
    import org.camunda.bpm.cockpit.plugin.sample.db.ProcessInstanceCountDto;

    public class ProcessInstanceResource extends AbstractPluginResource {

      public ProcessInstanceResource(String engineName) {
        super(engineName);
      }

      @GET
      public List<ProcessInstanceCountDto> getProcessInstanceCounts() {

        return getQueryService()
            .executeQuery(
              "cockpit.sample.selectProcessInstanceCountsByProcessDefinition",
              new QueryParameters<ProcessInstanceCountDto>());
      }
    }

In order to include plugin resources into the cockpit application those resources must be published in the plugin main file by overriding `#getResourceClasses()`:

    import org.camunda.bpm.cockpit.plugin.sample.SamplePlugin;

    public class SamplePlugin extends AbstractCockpitPlugin {

      // ...

      @Override
      public Set<Class<?>> getResourceClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();

        classes.add(SamplePluginRootResource.class);

        return classes;
      }

      // ...
    }

Given the above setup the resource class extends the cockpit API with the following paths

    GET $cockpit_api_root/plugin/sample/$engine/process-instance


#### Test case

To test your JAX-RS resources you can instantiate them directly during a plugin test case. Alternatively you can write a real API test using [arquillian](http://arquillian.org/).
See [PluginApiTest](https://github.com/camunda/camunda-bpm-platform/blob/master/webapps/cockpit/cockpit-core/src/test/java/org/camunda/bpm/cockpit/test/plugin/resources/PluginApiTest.java) for an example.


### Summary

Server-side parts of the plugin? Done. We will now go ahead and write the client-side extension that exposes the functionality to the user.


Client side
-----------

<div class="alert alert-info">
  <strong>Note:</strong>
  This section gives only a short overview on the client-side plugin mechanism in cockpit. 
  Consider reading <a href="#how-client-side-plugins-work">how client-side plugins work</a> if you are interested in details.
</div>

The client-side part of a cockpit plugin consists of an extension to the cockpit webapp client application. It is served through the plugins server site extension as a static plugin asset.


### Static plugin assets

When using `AbstractPluginRootResource` as the plugin resources base class, serving static assets is already built in. The root resource accepts `GET` request under `/static` to serve plugin provided client-side resources. Per convention, these resources must reside in a `/assets` directory relative to the plugin main class.

So let's create a file `org/camunda/bpm/cockpit/plugin/assets/info.txt` in the `src/main/resources` directory of our project. We can give it the following content (optional):

    FOO BAR


#### Test case

To test that the assets are served, we can either [implement a test case](https://github.com/camunda/camunda-bpm-platform/blob/master/webapps/cockpit/cockpit-core/src/test/java/org/camunda/bpm/cockpit/test/plugin/resources/PluginApiTest.java) or test the matter manually after we integrated the plugin into the cockpit webapp.


### Integration into cockpit

Before integrating the plugin into cockpit, make sure you have built the plugin at least once using `mvn clean install` (or however your IDE calls it). Furthermore, make sure that you have the [camunda BPM platform](https://github.com/camunda/camunda-bpm-platform) checked out on your local file system.

To integrate the plugin, we need to add it to the dependencies of the cockpit web project (located in the `webapps/cockpit/cockpit-webapp`).

    <dependencies>
      ...
      <dependency>
        <groupId>org.camunda.bpm.cockpit.plugin</groupId>
        <artifactId>cockpit-sample-plugin</artifactId>
        <version>1.0-SNAPSHOT</version>
      </dependency>

Now run the cockpit application using `mvn clean tomcat:run -Pdev`. It will boot an embedded tomcat and make the webapplication available at [http://localhost:8080/cockpit](http://localhost:8080/cockpit).

You can navigate to [http://localhost:8080/cockpit/api/cockpit/plugin/sample-plugin/static/info.txt](http://localhost:8080/cockpit/api/cockpit/plugin/sample-plugin/static/info.txt) to assert that the client assets is correctly loaded.


### plugin.js main file

Each plugin must contain a file `app/plugin.js` in the plugins assets directory. That file bootstraps the client-side plugin and registers it with cockpit. To do so it must declare a [angular module](http://docs.angularjs.org/guide/module) named `cockpit.plugin.$plugin_id` using [ngDefine](https://github.com/Nikku/requirejs-angular-define). 

Without going in all the details here, our plugins `plugin.js` may look like this:

    ngDefine('cockpit.plugin.sample-plugin', function(module) {
      
      var DashboardController = function($scope, $http, Uri) {
      
        $http.get(Uri.appUri("plugin://sample-plugin/default/process-instance"))
          .success(function(data) {
            $scope.processInstanceCounts = data;
          });
      };
      
      DashboardController.$inject = ["$scope", "$http", "Uri"];
      
      var Configuration = function Configuration(ViewsProvider) {
      
        ViewsProvider.registerDefaultView('cockpit.dashboard', {
          id: 'process-definitions',
          label: 'Deployed Processes',
          url: 'plugin://sample-plugin/static/app/dashboard.html',
          controller: DashboardController,
      
          // make sure we have a higher priority than the default plugin
          priority: 12
        });
      };
      
      Configuration.$inject = ['ViewsProvider'];
      
      module.config(Configuration);
    });


The file defines the angular module `cockpit.plugin.sample-plugin` and registers a plugin with the cockpit plugin service (`ViewsProvider#registerDefaultView()`).


### HTML view

To complete the example, we need to define the HTML file `app/dashboard.html` as a plugin asset:

    <div>
      <h1>Process Instances per Definition</h1>
      <table class="table table-bordered table-hover table-condensed">
        <thead>
          <tr>
            <th>Key</th>
            <th>Instances</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="count in processInstanceCounts">
            <td>{{ count.key }}</td>
            <td>{{ count.instanceCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>

That file provides the actual view to the user.

When deploying the extended cockpit webapplication on the camunda BPM platform, we can see the plugin in action.


Summary
-------

You made it! In this how to we walked through all important steps required to build a cockpit plugin, from creating a plugin skeleton over defining server-side plugin parts up to implementing the client-side portions of the plugin.


Additional resources
--------------------

* [sample plugin sources](https://github.com/Nikku/cockpit-sample-plugin)


Appendix
========

How client-side plugins work <a name="#how-client-side-plugins-work"></a>
-----------------------------------------------------------------------

<div class="alert alert-info">
  <strong>Advanced Topic</strong>
  Some experience in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a> development as well as knowledge about <a href="http://angularjs.org/">AngularJS</a> and <a href="http://requirejs.org">RequireJS</a> is beneficial to understand this subsection.
</div>

The client-side plugin infrastructure provides extensions to the cockpit core application through views that expose data provided by a plugins' server-side API. We quickly expand on how the interaction between a plugin and the cockpit webapplication happeness.

A plugin is defined in a `app/plugin.js` file that gets served as static plugin asset:

    ngDefine('cockpit.plugin.myPlugin', [
      'jquery', 
      'angular', 
      'http://some-url/some-library.js',
      'module:some.other.angularModule:./someOtherModule.js'
    ], function(module, $, angular) {

      var ViewController = function($scope, Uri) {
        // perform logic

        // uris to plugin assets and apis may be resolved via Uri#appUri
        // by prefixing those apis with 'plugin://'
        var pluginServiceUrl = Uri.appUri('plugin://myPlugin/default/process-definition');

      };

      ViewController.$inject = ['$scope'];

      // publish the plugin to cockpit
      module.config(function(ViewsProvider) {

        ViewsProvider.registerDefaultView('cockpit.some-view', {
          id: 'some-view-special-plugin',
          label: 'Very Special Plugin',
          url: 'plugin://myPlugin/static/app/view.html',
          controller: ViewController
        });
      });
    });

As the file is loaded as a RequireJS module (read more about the mechanism [here](https://github.com/Nikku/requirejs-angular-define#how-it-works)), dependencies (in terms of other RequireJS modules) may be specified. 

The plugin must register itself with the `ViewsProvider` via a [module configuration hook](http://docs.angularjs.org/api/angular.Module). 

From within cockpit, views are included using the [view directive](https://github.com/camunda/camunda-bpm-platform/blob/master/webapps/cockpit/cockpit-webapp/src/main/webapp/app/plugin/view.js):

    <view provider="viewProvider" vars="viewProviderVars" />

The actual provider that defines the view as well as the published variables are defined by the responsible controller in the surrounding scope: 

    function SomeCockpitController($scope, Views) {
      $scope.viewProvider = Views.getProvider({ component: 'cockpit.some-view'});

      // variable 'foo' will be available in the view provider scope
      $scope.viewProviderVars = { read: [ 'foo' ]};
    }
