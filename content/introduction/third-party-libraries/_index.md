---

title: 'Third-Party Libraries'
weight: 70

menu:
  main:
    identifier: "user-guide-introduction-third-party-libraries"
    parent: "user-guide-introduction"

---

This section covers third-party libraries and their use in Camunda. It provides the license book that lists the third-party dependencies that Camunda distributes along with its code.

For legal reference and any other license-related aspects please refer to [Licences]({{< ref "/introduction/licenses.md" >}}).


# Web Applications (Cockpit, Tasklist, Admin)

## XLTS for AngularJS
Starting with versions 7.18.0-alpha2, 7.17.2, 7.16.9, 7.15.15 and up to including 7.20.8, 7.21.5, 7.22.0, and 7.23.0-alpha1 the Camunda web applications used a set of third-party libraries provided by XLTS.dev

You can find our rationale for using long-term support libraries in [our blog post on ensuring the long-term maintenance of Camunda 7](https://camunda.com/blog/2022/02/ensuring-continuous-support-of-angularjs-in-camunda-platform-7-17/).

## Bootstrap NES and AngularJS NES by HeroDevs, Inc.
Starting with versions 7.20.9, 7.21.6, 7.22.1, and 7.23.0-alpha2 the Camunda web applications use a set of third-party libraries provided by HeroDevs, Inc.:

*  *AngularJS* (technical names: `angular`, `angular-animate`, `angular-cookies`, `angular-loader`, `angular-mocks`, `angular-resource`, `angular-route`, `angular-sanitize`, `angular-touch`)
*  *angular-ui-bootstrap*
*  *angular-translate*
*  *angular-moment*
*  *Bootstrap*

Where AngularJS, angular-ui-bootstrap, angular-translate, angular-moment, and Bootstrap were licensed entirely under the MIT license, Bootstrap NES and AngularJS NES by HeroDevs, Inc. licenses additional parts under the HeroDevs NES License. By downloading and using Camunda with Bootstrap NES and AngularJS NES by HeroDevs, Inc., you agree to the terms of the HeroDevs NES License. You can find the HeroDevs NES License terms in our [License Book]({{< ref "/introduction/third-party-libraries/camunda-bpm-platform-license-book.md" >}}).
