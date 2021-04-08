---

title: 'Extensions'
weight: 50

menu:
  main:
    identifier: "user-guide-introduction-extensions"
    parent: "user-guide-introduction"

---


Camunda Platform is developed by Camunda as an open source project in collaboration with the community. The "core project" (namely "Camunda Platform") is the basis for the Camunda Platform product which is provided by Camunda as a commercial offering. The commercial [Camunda Platform product](http://camunda.com/bpm/features/) contains additional (non-open source) features and is provided to Camunda Platform customers with service offerings such as enterprise support and [bug fix releases](/enterprise/download).


# Community Extensions

Camunda supports the community in its effort to build additional community extensions under the Camunda Platform umbrella. Such community extensions are maintained by the community and are not part of the commercial Camunda Platform product. 

{{< note title="Camunda Support" class="warning" >}}
  Camunda does not support community extensions as part of its commercial services to enterprise subscription customers
{{< /note >}}

The [Camunda Community Hub](https://github.com/camunda-community-hub) is a GitHub Organization that serves as the home of Camunda open source community-contributed extensions. You can migrate an extension you've built to the Hub, search for existing extensions, or get started with open source by helping community extension maintainers with open issue or pull request triage.

## List of Community Extensions

The following is an incomplete list of community extensions:

<!-- list below is sorted in alphabetical order -->
<!-- keep consistent on all branches 7.4+ -->
<!-- keep consistent with list in index.html -->

* [Apache Camel Integration](https://github.com/camunda/camunda-bpm-camel)
* [Custom Batch](https://github.com/camunda/camunda-bpm-custom-batch)
* [DMN Scala Extension](https://github.com/camunda/dmn-scala)
* [Elastic Search Extension](https://github.com/camunda/camunda-bpm-elasticsearch)
* [Email Connectors](https://github.com/camunda/camunda-bpm-mail)
* [Excamad](https://github.com/KotskinKotskin/camunda-excamad)
* [Grails Plugin](https://github.com/plexiti/camunda-grails-plugin)
* [GraphQL API](https://github.com/camunda/camunda-graphql)
* [Keycloak Identity Provider Plugin](https://github.com/camunda/camunda-bpm-identity-keycloak)
* [Micronaut Camunda Integration](https://github.com/NovatecConsulting/micronaut-camunda-bpm)
* [Migration API](https://github.com/camunda/camunda-bpm-migration)
* [Mockito Testing Library](https://github.com/camunda/camunda-bpm-mockito)
* [Needle Testing Library](https://github.com/camunda/camunda-bpm-needle)
* [OSGi Integration](https://github.com/camunda/camunda-bpm-platform-osgi)
* [PHP SDK](http://camunda.github.io/camunda-bpm-php-sdk/)
* [Process Test Coverage](https://github.com/camunda/camunda-process-test-coverage)
* [Reactor Event Bus](https://github.com/camunda/camunda-bpm-reactor)
* [REST Client Spring Boot](https://github.com/camunda/camunda-rest-client-spring-boot/)
* [Scenario Testing Library](https://github.com/camunda/camunda-bpm-assert-scenario/)
* [Single Sign On for JBoss](https://github.com/camunda/camunda-sso-jboss)
* [Wildfly Swarm](https://github.com/camunda/camunda-bpm-wildfly-swarm)

## Building a Community Extension

Do you have a great idea around open source BPM you want to share with the world? Awesome! Camunda will support you in building your own community extension. Have a look at our [contribution guidelines](http://camunda.org/community/contribute.html) to find out how to propose a community project, or contribute code to the core Camunda codebase. 

You can also visit the Camunda Community Hub [community repository](https://github.com/camunda-community-hub/community) to learn more about migrating your community extension into the community hub, benefits to joining the Camunda Community Hub Organization, contributing to an extension, and much more.

The Camunda Community Hub enables developers to have a centralized home for their Camunda community extensions, and aids new contributors to open source software in discovering new projects to work on.

# Enterprise Extensions

{{< enterprise >}}
  Please note that these extensions are only included in the enterprise edition of the Camunda Platform, it is not available in the community edition.
{{< /enterprise >}}

## XSLT Extension

The XSLT extension depends on the following third-party libraries:

* [SAXON](http://saxon.sourceforge.net/) [(Mozilla Public License 2.0)](https://www.mozilla.org/MPL/2.0/)
