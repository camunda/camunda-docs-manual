---

title: 'Third-Party Libraries'
weight: 70

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries"
    parent: "user-guide-introduction"

---

In the following section all third-party libraries are listed on which components of the
Camunda platform depend.


# Process Engine

The process engine depends on the following third-party libraries:

* [MyBatis mapping framework](http://mybatis.github.io/mybatis-3/) [(Apache License 2.0)][apache] for object-relational mapping.
* [Joda Time](http://www.joda.org/joda-time/) [(Apache License 2.0)][apache] for parsing date formats.
* [Java Uuid Generator (JUG)](http://wiki.fasterxml.com/JugHome) [(Apache License 2.0)][apache] Id Generator. See documentation on Id-Generators.

Additional **optional** dependencies:

* [Apache Commons Email](http://commons.apache.org/proper/commons-email/) [(Apache License 2.0)][apache] for mail task support.
* [Spring Framework Spring-Beans][spring] [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-Core][spring] [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-ASM][spring] [(Apache License 3.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Groovy](http://groovy.codehaus.org/) [(Apache License 2.0)][apache] for groovy script task support.
* [Jython](http://www.jython.org) [(Python License)][python] for Python script task support.
* [JRuby](http://jruby.org/) [(Ruby License or GPL)][jruby] for Ruby script task support.


# REST API

The REST API depends on the following third-party libraries:

* [Jackson JAX-RS provider for JSON content type](http://jackson.codehaus.org/) [(Apache License 2.0)][apache]
* [Apache Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/) [(Apache License 2.0)][apache]

Additional **optional** dependencies:

* [RESTEasy](http://www.jboss.org/resteasy) [(Apache License 2.0)][apache] on Apache Tomcat only.


# Spring Support

The Spring support depends on the following third-party libraries:

* [Apache Commons DBCP](http://commons.apache.org/proper/commons-dbcp/) [(Apache License 2.0)][apache]
* [Apache Commons Lang](http://commons.apache.org/proper/commons-lang/) [(Apache License 2.0)][apache]
* [Spring Framework Spring-Beans][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-Core][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-ASM][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-Context][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-JDBC][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-ORM][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-TX][spring] [(Apache License 2.0)][apache]


# Camunda Wepapp

The Camunda Webapp (Cockpit, Tasklist, Admin) depends on the following third-party libraries:

* [AngularJS](http://angularjs.org/) [(MIT)][mit]
* [AngularUI](http://angular-ui.github.io/) [(MIT)][mit]
* [bpmn-js](http://bpmn.io) [(Custom license)](https://raw.githubusercontent.com/bpmn-io/bower-bpmn-js/v0.5.1/LICENSE)
* [domReady](https://github.com/requirejs/domReady) [(MIT or new BSD)](https://raw.githubusercontent.com/requirejs/domReady/master/LICENSE)
* [Placeholder.js](https://github.com/jamesallardice/Placeholders.js) [(MIT)][mit]
* [jQuery](http://jquery.com/) [(MIT)][mit]
* [jQuery UI](https://jqueryui.com/) [(MIT)][mit]
* [RequireJS](http://requirejs.org/) [(MIT)][mit]
* [Snap.svg](http://snapsvg.io/) [(Apache License 2.0)][apache]
* [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) [(Apache License 2.0)][apache]

Most of those libraries are used in the [Camunda commons UI](http://camunda.github.io/camunda-commons-ui/) library which is aimed to ease the development of browser based user interfaces.


# Camunda Cycle

Cycle depends on the following third-party libraries:

Javascript dependencies:

* [AngularJS](http://angularjs.org/) [(MIT)][mit]
* [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) [(Apache License 2.0)][apache]
* [Dojo](http://dojotoolkit.org/) [(Academic Free License 2.1)][dojo]

Java dependencies:

* [Hibernate](http://hibernate.org/) [(GNU Lesser General Public License)][lgpl]
* [Apache Commons Codec](http://commons.apache.org/proper/commons-codec/) [(Apache License 2.0)][apache]
* [NekoHTML](http://nekohtml.sourceforge.net/) [(Apache License 2.0)][apache]
* [SAXON](http://saxon.sourceforge.net/) [(Mozilla Public License 1.0)][mpl]
* [Apache Commons Virtual File System](https://commons.apache.org/proper/commons-vfs/) [(Apache License 2.0)][apache]
* [AspectJ runtime](http://eclipse.org/aspectj/) [(Eclipse Public License 1.0)][epl]
* [AspectJ weaver](http://eclipse.org/aspectj/) [(Eclipse Public License 1.0)][epl]
* [Jasypt](http://www.jasypt.org/) [(Apache License 2.0)][apache]
* [SLF4J JCL](http://www.slf4j.org/legacy.html) [(MIT)][mit]
* [Spring Framework Spring-AOP][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-ORM][spring] [(Apache License 2.0)][apache]
* [Spring Framework Spring-Web][spring] [(Apache License 2.0)][apache]
* [Thymeleaf](http://www.thymeleaf.org/) [(Apache License 2.0)][apache]
* [Thymeleaf-Spring3](http://www.thymeleaf.org/) [(Apache License 2.0)][apache]
* [Tigris SVN Client Adapter](http://subclipse.tigris.org/svnClientAdapter.html) [(Apache License 2.0)][apache]
* [SVNKit](http://svnkit.com/) [(TMate Open Source License)][tmate]
* [SVNKit JavaHL](http://svnkit.com/) [(TMate Open Source License)][tmate]
* [Gettext Commons](https://code.google.com/p/gettext-commons/) [(Apache License 2.0)][apache]


# Camunda Modeler

The Camunda Modeler depends on the following third-party libraries:

* [Eclipse Modeling Framework Project (EMF)](https://www.eclipse.org/modeling/emf/) [(Eclipse Public License 1.0)][epl]
* [Eclipse OSGi][eclipse] [(Eclipse Public License 1.0)][epl]
* [Eclipse Graphiti](https://www.eclipse.org/graphiti) [(Eclipse Public License 1.0)][epl]
* [Eclipse Graphical Editing Framework (GEF)](http://www.eclipse.org/gef/) [(Eclipse Public License 1.0)][epl]
* [Eclipse XSD][eclipse] [(Eclipse Public License 1.0)][epl]
* [Eclipse UI][eclipse] [(Eclipse Public License 1.0)][epl]
* [Eclipse Core](http://www.eclipse.org/eclipse/platform-core/) [(Eclipse Public License 1.0)][epl]
* [Eclipse Java development tools (JDT)](http://www.eclipse.org/jdt/) [(Eclipse Public License 1.0)][epl]
* [Eclipse JFace](http://wiki.eclipse.org/JFace) [(Eclipse Public License 1.0)][epl]
* [Eclipse BPMN2](http://www.eclipse.org/modeling/mdt/?project=bpmn2) [(Eclipse Public License 1.0)][epl]
* [Eclipse WST](https://www.eclipse.org/webtools/wst/main.php) [(Eclipse Public License 1.0)][epl]
* [Apache Xerces](http://xerces.apache.org/) [(Eclipse Public License 1.0)][epl]
* [Eclipse WST SSE UI](http://www.eclipse.org/webtools/wst/components/sse/overview.html) [(Eclipse Public License 1.0)][epl]


[apache]: http://www.apache.org/licenses/LICENSE-2.0.html
[dojo]: https://github.com/dojo/dojo/blob/1.9/LICENSE#L43-L195
[eclipse]: https://www.eclipse.org
[epl]: http://www.eclipse.org/legal/epl-v10.html
[jruby]: https://github.com/jruby/jruby/blob/master/LICENSE.RUBY
[lgpl]: http://www.gnu.org/licenses/lgpl-3.0.de.html
[mit]: http://opensource.org/licenses/MIT
[mpl]: https://www.mozilla.org/MPL/1.0/
[mpl2]: https://www.mozilla.org/MPL/2.0/
[spring]: http://projects.spring.io/spring-framework/
[spring-xml]: {{< relref "user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-using-spring-xml" >}}
[python]: http://www.jython.org/license.html
[tmate]: http://svnkit.com/license.html
