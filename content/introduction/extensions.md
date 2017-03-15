---

title: 'Extensions'
weight: 50

menu:
  main:
    identifier: "user-guide-introduction-extensions"
    parent: "user-guide-introduction"

---


Camunda BPM is developed by Camunda as an open source project in collaboration with the community. The "core project" (namely "Camunda BPM platform") is the basis for the Camunda BPM product which is provided by Camunda as a commercial offering. The commercial [Camunda BPM product](http://camunda.com/bpm/features/) contains additional (non-open source) features and is provided to Camunda BPM customers with service offerings such as enterprise support and [bug fix releases](/enterprise/download).


# Community Extensions

Camunda supports the community in its effort to build additional community extensions under the Camunda BPM umbrella. Such community extensions are maintained by the community and are not part of the commercial Camunda BPM product.

{{< note title="Camunda Support" class="warning" >}}
  Camunda does not support community extensions as part of its commercial services to enterprise subscription customers
{{< /note >}}


## List of Community Extensions

The following is a list of current (unsupported) community extensions:

<!-- list below is sorted in alphabetical order -->
<!-- keep consistent on all branches 7.4+ -->
<!-- keep consistent with list in index.html -->

* [Apache Camel Integration](https://github.com/camunda/camunda-bpm-camel)
* [AssertJ Testing Library](https://github.com/camunda/camunda-bpm-assert)
* [Camunda Cockpit Command-Line Client](https://github.com/zalando/camunda-cockpit-client)
* [Camunda Docker Images](https://github.com/camunda/docker-camunda-bpm-platform)
* [Cycle Ibo Prometheus Connector](https://github.com/camunda/ibo-prometheus-cycle-connector)
* [Cycle Trisotech Connector](https://github.com/camunda/trisotech-cycle-connector)
* [Elastic Search Extension](https://github.com/camunda/camunda-bpm-elasticsearch)
* [Email Connectors](https://github.com/camunda/camunda-bpm-mail)
* [Grails Plugin](https://github.com/plexiti/camunda-grails-plugin)
* [GraphQL API](https://github.com/camunda/camunda-graphql)
* [Mockito Testing Library](https://github.com/camunda/camunda-bpm-mockito)
* [Needle Testing Library](https://github.com/camunda/camunda-bpm-needle)
* [OSGi Integration](https://github.com/camunda/camunda-bpm-platform-osgi)
* [PHP SDK](http://camunda.github.io/camunda-bpm-php-sdk/)
* [Process Test Coverage](https://github.com/camunda/camunda-process-test-coverage)
* [Reactor Event Bus](https://github.com/camunda/camunda-bpm-reactor)
* [Single Sign On for JBoss](https://github.com/camunda/camunda-sso-jboss)
* [Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter)
* [Tasklist Translations](https://github.com/camunda/camunda-tasklist-translations)

## Building a Community Extension

Do you have a great idea around open source BPM you want to share with the world? Awesome! Camunda will support you in building your own community extension. Have a look at our [contribution guidelines](http://camunda.org/community/contribute.html) to find out how to propose a community project.


# Enterprise Extensions

## XSLT Extension

The XSLT extension depends on the following third-party libraries:

* [SAXON](http://saxon.sourceforge.net/) [(Mozilla Public License 2.0)](https://www.mozilla.org/MPL/2.0/)
