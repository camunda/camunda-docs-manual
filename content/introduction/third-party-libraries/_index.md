---

title: 'Third-Party Libraries'
weight: 70

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries"
    parent: "user-guide-introduction"

---

This section covers third party libraries and their use in Camunda. It provides license books (see sub pages) that list the third-party dependencies that Camunda distributes along with its code. Our license books include the library name, version, copyright notices, and licenses under which we use the library. By downloading and using Camunda 7, you agree to adhere to these licenses.

For selected third-party libraries that we consider especially noteworthy, this page describes their license terms and use in the Camunda 7 artifacts.

For legal reference and any other license-related aspects please refer to [Licences]({{< ref "/introduction/licenses.md" >}}).


# Web Applications (Cockpit, Tasklist, Admin)

## XLTS for AngularJS

Starting with versions 7.18.0-alpha2, 7.17.2, 7.16.9, 7.15.15, the Camunda web applications use a set of third-party libraries referred to as *XLTS for AngularJS* (technical names: `angular`, `angular-animate`, `angular-cookies`, `angular-loader`, `angular-mocks`, `angular-resource`, `angular-route`, `angular-sanitize`, `angular-touch`). XLTS for AngularJS follows a proprietary license called *EULA for the downstream recipient of XLTS for AngularJS* (short *XLTS for AngularJS – EULA*) that you can find [here](https://xlts.dev/angularjs/downstream-eula).

This license imposes restrictions around distributing and reverse-engineering XLTS for AngularJS independently of Camunda artifacts. The license does otherwise not restrict how you can use and distribute the Camunda artifacts that include XLTS for AngularJS. You can find our rationale for using this library in [our blog post on ensuring the long-term maintenance of Camunda 7](https://camunda.com/blog/2022/02/ensuring-continuous-support-of-angularjs-in-camunda-platform-7-17/).

