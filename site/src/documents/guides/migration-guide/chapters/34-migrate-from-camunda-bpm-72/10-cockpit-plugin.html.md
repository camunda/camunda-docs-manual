---

title: 'Migrating a Cockpit Plugin'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

Migrating a Cockpit Plugin from Camunda BPM 7.2 to 7.3 consists of the following steps:

Client side:

* [Replacing ngDefine with requireJS](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-replacing-ngdefine-with-requirejs)
* [Reviewing usage of angular-ui](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-reviewing-usage-of-angular-ui)
* [Reviewing usage of bootstrap](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-reviewing-usage-of-bootstrap)

Server side:

* [Using Jackson 2 instead of Jackson 1](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin-using-jackson-2-instead-of-jackson-1)

### Replacing ngDefine with requireJS

As of version 7.3, the use of [ngDefine][ng-define] in Cockpit and Admin Plugins is deprecated. You are encouraged to use [requireJS][requirejs] instead. For information about the use of requireJS in plugins, see the [How to develop a Cockpit Plugin][howto-cockpit-plugin] Tutorial or the migration information below.

ngDefine remains part of the Cockpit and Admin app for backwards compatability, but may be removed in the future. ngDefine is not part of the Tasklist app. Tasklist plugins must be written using requireJS.


#### Replace ngDefine with define call

With ngDefine, you could create an angular module with its dependencies using the ngDefine call:

```javascript
ngDefine('cockpit.plugin.myPlugin', [
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  'module:some.other.angularModule:./someOtherModule.js'
], function(ngModule, $, angular) {
  // ...
});
```

From 7.3 onwards, you have to load dependencies using a define call and create and return the angular module in the callback:

```javascript
define([
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  './someOtherModule.js'
], function($, angular) {

  var ngModule = angular.module('cockpit.plugin.myPlugin', ['some.other.angularModule']);

  // ...

  return ngModule;
});
```


### Reviewing usage of angular-ui

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, the [angular-ui][angular-ui] which is __not supported anymore__ has been, partially, replaced by [angular-bootstrap][angular-bootstrap].

Custom Cockpit plugins might have use directives or filters provided by [angular-ui][angular-ui] and therefore need to be reviewed.

#### Hints

Typically, you can skip this if you do not have custom plugins, otherwise you might want to have a look at the templates of your custom plugins (because it is where filters and directives are expected to be used).

Directives which are __not available anymore__:

- `ui-animate`
- `ui-calendar`
- `ui-codemirror`
- `ui-currency`
- `ui-date`
- `ui-event`
- `ui-if`
- `ui-jq`
- `ui-keypress`
- `ui-map`
- `ui-mask`
- `ui-reset`
- `ui-route`
- `ui-scrollfix`
- `ui-select2`
- `ui-showhide`
- `ui-sortable`
- `ui-tinymce`
- `ui-validate`

Filters which are __not availabe anymore__:

- `format`
- `highlight`
- `inflector`
- `unique`

### Reviewing usage of bootstrap

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, [bootstrap](http://getbootstrap.com/) has been upgraded from version 3.1.1 to 3.3.1. You have to make sure that your plugin works with this [new version of bootstrap][bootstrap-changenotes].

### Using Jackson 2 instead of Jackson 1

Beginning with 7.3, the REST API as well as Cockpit, Tasklist, and Admin use Jackson 2 instead of Jackson 1 for object mapping to and from JSON. Plugins explicitly using Jackson need to be migrated. In general, this consists of replacing the Jackson 1 packages `org.codehaus.jackson` with Jackson 2 packages `com.fasterxml.jackson`. Depending on the Jackson features used, further Jackson-specific migration may be required.

#### Jackson 2 JAX-RS polymorphic response

The Jackson 2 JAX-RS provider changes serialization of polymorphic types. Assume, your plugin's REST resource has a JAX-RS GET method with return type `List<A>`. `A` is an interface class with two implementing classes, `B` and `C`. With Jackson 2, the response JSON only contains properties defined in `A`. If your REST resource should dynamically include the properties of objects dependent on their actual class, consider adding the annotations `com.fasterxml.jackson.annotation.JsonSubTypes` and `com.fasterxml.jackson.annotation.JsonTypeInfo` to the superclass. See the [Jackson Javadocs][jackson-jsontypeinfo] for details.

[ng-define]: http://nikku.github.io/requirejs-angular-define
[requirejs]: http://requirejs.org
[howto-cockpit-plugin]: ref:/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin
[admin]: https://github.com/camunda/camunda-admin-ui
[cockpit]: https://github.com/camunda/camunda-cockpit-ui
[angular-ui]: https://github.com/angular-ui/angular-ui-OLDREPO
[angular-bootstrap]: https://github.com/angular-ui/bootstrap
[bootstrap]: http://getbootstrap.com/
[bootstrap-changenotes]: https://github.com/twbs/bootstrap/releases/tag/v3.3.1
[jackson-jsontypeinfo]: https://fasterxml.github.io/jackson-annotations/javadoc/2.4/com/fasterxml/jackson/annotation/JsonTypeInfo.html
