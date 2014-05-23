---

title: 'Third-Party Libraries'
category: 'Introduction'

---

In the following section all third-party libraries are listed on which components of the
camunda platform depend.

## Process Engine

The process engine depends on the following third-party libraries:

- [MyBatis mapping framework](http://mybatis.github.io/mybatis-3/) [(Apache License 2.0)][apache] for object-relational mapping.
- [Joda Time](http://www.joda.org/joda-time/) [(Apache License 2.0)][apache] for parsing date formats.
- [Java Uuid Generator (JUG)](http://wiki.fasterxml.com/JugHome) [(Apache License 2.0)][apache] Id Generator. See documentation on Id-Generators.

Additional __optional__ dependencies:

- [Apache Commons Email](http://commons.apache.org/proper/commons-email/) [(Apache License 2.0)][apache] for mail task support.
- [Spring Framework Spring-Beans](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml](ref:#process-engine-process-engine-bootstrapping-configure-process-engine-using-spring-xml).
- [Spring Framework Spring-Core](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache] for configuration using [camunda.cfg.xml](ref:#process-engine-process-engine-bootstrapping-configure-process-engine-using-spring-xml).
- [Spring Framework Spring-ASM](http://projects.spring.io/spring-framework/) [(Apache License 3.0)][apache] for configuration using [camunda.cfg.xml](ref:#process-engine-process-engine-bootstrapping-configure-process-engine-using-spring-xml).
- [Groovy](http://groovy.codehaus.org/) [(Apache License 2.0)][apache] for groovy script task support.
- [Jython](http://www.jython.org) [(Python License)][python] for Python script task support.
- [JRuby](http://jruby.org/) [(Ruby License or GPL)][jruby] for Ruby script task support.

## REST API

The REST API depends on the following third-party libraries:

- [Jackson JAX-RS provider for JSON content type](http://jackson.codehaus.org/) [(Apache License 2.0)][apache]
- [Apache Commons FileUpload](http://commons.apache.org/proper/commons-fileupload/) [(Apache License 2.0)][apache]

Additional __optional__ dependencies:

- [RESTEasy](http://www.jboss.org/resteasy) [(Apache License 2.0)][apache] on Apache Tomcat only.


## Spring Support

The Spring support depends on the following third-party libraries:

- [Apache Commons DBCP](http://commons.apache.org/proper/commons-dbcp/) [(Apache License 2.0)][apache]
- [Apache Commons Lang](http://commons.apache.org/proper/commons-lang/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-Beans](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-Core](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-ASM](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-Context](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-JDBC](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-ORM](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-TX](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]

## camunda Wepapp

The camunda Webapp (Cockpit, Tasklist, Admin) depends on the following third-party libraries:

- [AngularJS](http://angularjs.org/) [(MIT)][mit]
- [AngularUI](http://angular-ui.github.io/) [(MIT)][mit]
- [Better DOM](http://chemerisuk.github.io/better-dom/) [(MIT)][mit]
- [Better Placeholder Polyfill](https://github.com/chemerisuk/better-placeholder-polyfill) [(MIT)][mit]
- [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) [(Apache License 2.0)][apache]
- [Bootstrap Slider](http://www.eyecon.ro/bootstrap-slider) [(Apache License 2.0)][apache]
- [Dojo](http://dojotoolkit.org/) [(Academic Free License 2.1)][dojo]
- [jQuery](http://jquery.com/) [(MIT)][mit]
- [jQuery Mousewheel](https://github.com/brandonaaron/jquery-mousewheel) [(MIT)][mit]
- [jQuery Overscroll Fixed](https://github.com/azoff/overscroll) [(MIT)][mit]
- [jQuery UI](https://jqueryui.com/) [(MIT)][mit]
- [RequireJS](http://requirejs.org/) [(MIT)][mit]

## camunda Cycle

Cycle depends on the following third-party libraries:

Javascript dependencies:
- [AngularJS](http://angularjs.org/) [(MIT)][mit]
- [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) [(Apache License 2.0)][apache]
- [Dojo](http://dojotoolkit.org/) [(Academic Free License 2.1)][dojo]

Java dependencies:
- [Apache Commons Codec](http://commons.apache.org/proper/commons-codec/) [(Apache License 2.0)][apache]
- [NekoHTML](http://nekohtml.sourceforge.net/) [(Apache License 2.0)][apache]
- [SAXON](http://saxon.sourceforge.net/) [(Mozilla Public License 1.0)][mpl]
- [Apache Commons Virtual File System](https://commons.apache.org/proper/commons-vfs/) [(Apache License 2.0)][apache]
- [AspectJ runtime](http://eclipse.org/aspectj/) [(Eclipse Public License 1.0)][epl]
- [AspectJ weaver](http://eclipse.org/aspectj/) [(Eclipse Public License 1.0)][epl]
- [Jasypt](http://www.jasypt.org/) [(Apache License 2.0)][apache]
- [SLF4J JCL](http://www.slf4j.org/legacy.html) [(MIT)][mit]
- [Spring Framework Spring-AOP](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-ORM](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Spring Framework Spring-Web](http://projects.spring.io/spring-framework/) [(Apache License 2.0)][apache]
- [Thymeleaf](http://www.thymeleaf.org/) [(Apache License 2.0)][apache]
- [Thymeleaf-Spring3](http://www.thymeleaf.org/) [(Apache License 2.0)][apache]
- [Tigris SVN Client Adapter](http://subclipse.tigris.org/svnClientAdapter.html) [(Apache License 2.0)][apache]
- [SVNKit](http://svnkit.com/) [(TMate Open Source License)][tmate]
- [SVNKit JavaHL](http://svnkit.com/) [(TMate Open Source License)][tmate]
- [Gettext Commons](https://code.google.com/p/gettext-commons/) [(Apache License 2.0)][apache]

## camunda Modeler

The camunda Modeler depends on the following third-party libraries:

- [Eclipse Modeling Framework Project (EMF)](https://www.eclipse.org/modeling/emf/) [(Eclipse Public License 1.0)][epl]
- [Eclipse OSGi](https://www.eclipse.org) [(Eclipse Public License 1.0)][epl]
- [Eclipse Graphiti](https://www.eclipse.org/graphiti) [(Eclipse Public License 1.0)][epl]
- [Eclipse Graphical Editing Framework (GEF)](http://www.eclipse.org/gef/) [(Eclipse Public License 1.0)][epl]
- [Eclipse XSD](https://www.eclipse.org) [(Eclipse Public License 1.0)][epl]
- [Eclipse UI](https://www.eclipse.org) [(Eclipse Public License 1.0)][epl]
- [Eclipse Core](http://www.eclipse.org/eclipse/platform-core/) [(Eclipse Public License 1.0)][epl]
- [Eclipse Java development tools (JDT)](http://www.eclipse.org/jdt/) [(Eclipse Public License 1.0)][epl]
- [Eclipse JFace](http://wiki.eclipse.org/JFace) [(Eclipse Public License 1.0)][epl]
- [Eclipse BPMN2](http://www.eclipse.org/modeling/mdt/?project=bpmn2) [(Eclipse Public License 1.0)][epl]
- [Eclipse WST](https://www.eclipse.org/webtools/wst/main.php) [(Eclipse Public License 1.0)][epl]
- [Apache Xerces](http://xerces.apache.org/) [(Eclipse Public License 1.0)][epl]
- [Eclipse WST SSE UI](http://www.eclipse.org/webtools/wst/components/sse/overview.html) [(Eclipse Public License 1.0)][epl]

[apache]: http://www.apache.org/licenses/LICENSE-2.0.html
[mit]: http://opensource.org/licenses/MIT
[dojo]: https://github.com/dojo/dojo/blob/1.9/LICENSE#L43-L195
[mpl]: https://www.mozilla.org/MPL/1.0/
[epl]: http://www.eclipse.org/legal/epl-v10.html
[tmate]: http://svnkit.com/license.html
[python]: http://www.jython.org/license.html
[jruby]: https://github.com/jruby/jruby/blob/master/LICENSE.RUBY

