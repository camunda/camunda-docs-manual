---

title: 'Third-Party Libraries'
weight: 70

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries"
    parent: "user-guide-introduction"

---

This section covers third party libraries and their use in Camunda. For each component of Camunda the third party libraries are listed. For each library, it is explained whether the library is a _required dependency_ or an _optional dependency_.

Required dependencies are libraries Camunda depends on to provide core functionality. In the list below marked as {{< RD >}}.

Optional dependencies are libraries Camunda can be integrated with. In the list below marked as {{< OD >}}.

# Process Engine

The process engine depends on the following third-party libraries:

* [MyBatis mapping framework](http://mybatis.github.io/mybatis-3/) {{< RD >}}, [(Apache License 2.0)][apache] for object-relational mapping.
* [Joda Time](http://www.joda.org/joda-time/) {{< RD >}}, [(Apache License 2.0)][apache] for parsing date formats.
* [Java Uuid Generator (JUG)](http://wiki.fasterxml.com/JugHome), {{< OD >}}, [(Apache License 2.0)][apache] Id Generator. See documentation on Id-Generators.

Additionally, the process engine can be integrated with:

* [Apache Commons Email](http://commons.apache.org/proper/commons-email/) {{< OD >}}, [(Apache License 2.0)][apache] for mail task support.
* [Spring Framework Spring-Beans][spring] {{< OD >}}, [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-Core][spring] {{< OD >}}, [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Spring Framework Spring-ASM][spring] {{< OD >}}, [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml][spring-xml].
* [Groovy](http://groovy.codehaus.org/) {{< OD >}}, [(Apache License 2.0)][apache] for groovy script task support.
* [Jython](http://www.jython.org) {{< OD >}}, [(Python License)][python] for Python script task support.
* [JRuby](http://jruby.org/) {{< OD >}}, [(Ruby License or GPL)][jruby] for Ruby script task support.
* [Freemarker](http://freemarker.org/) {{< OD >}}, [(Apache License 2.0)][apache] for freemarker template engine support.
* [Apache Velocity](http://velocity.apache.org/) {{< OD >}}, [(Apache License 2.0)][apache] for apache velocity template engine support.
* [SAXON](http://saxon.sourceforge.net/) {{< OD >}}, [(Mozilla Public License 1.0)][mpl] for XSLT and XQuery template engine support.


# REST API

The REST API depends on the following third-party libraries:

* [Jackson JAX-RS](http://wiki.fasterxml.com/JacksonHome) {{< RD >}}, [(Apache License 2.0)][apache] provider for JSON content type
* [Apache Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/) {{< RD >}}, [(Apache License 2.0)][apache]

Additionally, when using Apache Tomcat:

* [RESTEasy](http://www.jboss.org/resteasy) {{< RD >}}, [(Apache License 2.0)][apache]


# Spring Support

The Spring support can be integrated with the following third-party libraries:

* [Apache Commons DBCP](http://commons.apache.org/proper/commons-dbcp/) {{< OD >}}, [(Apache License 2.0)][apache]
* [Apache Commons Lang](http://commons.apache.org/proper/commons-lang/) {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-Beans][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-Core][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-ASM][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-Context][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-JDBC][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-ORM][spring] {{< OD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-TX][spring] {{< OD >}}, [(Apache License 2.0)][apache]

# Camunda Spin

Camunda Spin depends on the following third-party libraries:

* [Jackson Json](http://wiki.fasterxml.com/JacksonHome) {{< RD >}}, [(Apache License 2.0)][apache] for Json Dataformat Support

Additionally, Camunda Spin can be integrated with the following libraries:

* [Jayway Json Path](http://code.google.com/p/json-path/) {{< OD >}} [(Apache License 2.0)][apache] for Json Path Support

# Camunda Connect

Camunda Connect depends on the following third-party libraries:

* [Apache Http Components](http://wiki.fasterxml.com/JacksonHome) {{< RD >}}, [(Apache License 2.0)][apache] for REST and SOAP support.

# Camunda Wepapp

The Camunda Webapp (Cockpit, Tasklist, Admin) inculdes the following third-party libraries:

* [AngularJS](http://angularjs.org/) {{< RD >}}, [(MIT)][mit]
* [AngularUI](http://angular-ui.github.io/) {{< RD >}}, [(MIT)][mit]
* [bpmn-js](http://bpmn.io) {{< RD >}}, [(Custom license)](https://raw.githubusercontent.com/bpmn-io/bower-bpmn-js/v0.5.1/LICENSE)
* [domReady](https://github.com/requirejs/domReady) {{< RD >}}, [(MIT or new BSD)](https://raw.githubusercontent.com/requirejs/domReady/master/LICENSE)
* [heatmap.js](https://github.com/pa7/heatmap.js) {{< RD >}}, [(MIT)][mit]
* [Placeholder.js](https://github.com/jamesallardice/Placeholders.js) {{< RD >}}, [(MIT)][mit]
* [jQuery](http://jquery.com/) {{< RD >}}, [(MIT)][mit]
* [jQuery UI](https://jqueryui.com/) {{< RD >}}, [(MIT)][mit]
* [RequireJS](http://requirejs.org/) {{< RD >}}, [(MIT)][mit]
* [Snap.svg](http://snapsvg.io/) {{< RD >}}, [(Apache License 2.0)][apache]
* [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) {{< RD >}}, [(Apache License 2.0)][apache]

Most of those libraries are used in the [Camunda commons UI](http://camunda.github.io/camunda-commons-ui/) library which is aimed to ease the development of browser based user interfaces.

# Camunda Javascript SDK

The Camunda Javascript SDK (including the Forms SDK) integrates with the following third-party libraries:

* [Super Agent](https://github.com/visionmedia/superagent) {{< RD >}}, [(MIT)][mit]
* [jQuery](http://jquery.com/) {{< RD >}}, [(MIT)][mit]
* [AngularJS](http://angularjs.org/) {{< RD >}}, [(MIT)][mit]
* [AngularUI](http://angular-ui.github.io/) {{< RD >}}, [(MIT)][mit]

# Camunda Cycle Web Application

The Camunda Cycle web application includes the following third-party libraries:

Javascript dependencies:

* [AngularJS](http://angularjs.org/) {{< RD >}}, [(MIT)][mit]
* [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) {{< RD >}}, [(Apache License 2.0)][apache]
* [Dojo](http://dojotoolkit.org/) {{< RD >}}, [(Academic Free License 2.1)][dojo]

Java dependencies:

* [Hibernate](http://hibernate.org/) {{< RD >}}, [(GNU Lesser General Public License)][lgpl]
* [Apache Commons Codec](http://commons.apache.org/proper/commons-codec/) {{< RD >}}, [(Apache License 2.0)][apache]
* [NekoHTML](http://nekohtml.sourceforge.net/) {{< RD >}}, [(Apache License 2.0)][apache]
* [SAXON](http://saxon.sourceforge.net/) {{< RD >}}, [(Mozilla Public License 1.0)][mpl]
* [Apache Commons Virtual File System](https://commons.apache.org/proper/commons-vfs/) {{< RD >}}, [(Apache License 2.0)][apache]
* [AspectJ runtime](http://eclipse.org/aspectj/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [AspectJ weaver](http://eclipse.org/aspectj/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Jasypt](http://www.jasypt.org/) {{< RD >}}, [(Apache License 2.0)][apache]
* [SLF4J JCL](http://www.slf4j.org/legacy.html) {{< RD >}}, [(MIT)][mit]
* [Spring Framework Spring-AOP][spring] {{< RD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-ORM][spring] {{< RD >}}, [(Apache License 2.0)][apache]
* [Spring Framework Spring-Web][spring] {{< RD >}}, [(Apache License 2.0)][apache]
* [Thymeleaf](http://www.thymeleaf.org/) {{< RD >}}, [(Apache License 2.0)][apache]
* [Thymeleaf-Spring3](http://www.thymeleaf.org/) {{< RD >}}, [(Apache License 2.0)][apache]
* [Tigris SVN Client Adapter](http://subclipse.tigris.org/svnClientAdapter.html) {{< RD >}}, [(Apache License 2.0)][apache]
* [SVNKit](http://svnkit.com/) {{< RD >}}, [(TMate Open Source License)][tmate]
* [SVNKit JavaHL](http://svnkit.com/) {{< RD >}}, [(TMate Open Source License)][tmate]
* [Gettext Commons](https://code.google.com/p/gettext-commons/) {{< RD >}}, [(Apache License 2.0)][apache]

# Camunda Modeler Eclipse Plugin

The Camunda Modeler Eclipse Plugin depends on the following third-party libraries:

* [Eclipse Modeling Framework Project (EMF)](https://www.eclipse.org/modeling/emf/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse OSGi][eclipse] {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse Graphiti](https://www.eclipse.org/graphiti) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse Graphical Editing Framework (GEF)](http://www.eclipse.org/gef/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse XSD][eclipse] {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse UI][eclipse] {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse Core](http://www.eclipse.org/eclipse/platform-core/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse Java development tools (JDT)](http://www.eclipse.org/jdt/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse JFace](http://wiki.eclipse.org/JFace) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse BPMN2](http://www.eclipse.org/modeling/mdt/?project=bpmn2) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse WST](https://www.eclipse.org/webtools/wst/main.php) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Apache Xerces](http://xerces.apache.org/) {{< RD >}}, [(Eclipse Public License 1.0)][epl]
* [Eclipse WST SSE UI](http://www.eclipse.org/webtools/wst/components/sse/overview.html) {{< RD >}}, [(Eclipse Public License 1.0)][epl]


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
